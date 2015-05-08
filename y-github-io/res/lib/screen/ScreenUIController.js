(function() {
	var ScreenController = {
		/**
		 * @memberOf h5.ui.ScreenController
		 */
		__name: 'h5.ui.ScreenController',

		/**
		 * @memberOf h5.ui.ScreenController
		 */
		_pageLoadLogic: h5.ui.PageLoadLogic,

		/**
		 * アニメーション中かどうか
		 *
		 * @memberOf h5.ui.ScreenController
		 */
		_isAnimation: false,

		/**
		 * スクロールラッパー要素
		 *
		 * @memberOf h5.ui.ScreenController
		 */
		_$scrollingBase: null,

		/**
		 * スクリーン幅
		 */
		_screenWidth: 0,

		/**
		 * ページ数
		 * <p>
		 * デフォルトではスライドされるたびに無限に要素を増やしていくが、ページ数が設定されている場合はその範囲で繰り返す。
		 * </p>
		 */
		numberOfPages: Infinity,

		/**
		 * @memberOf h5.ui.ScreenController
		 */
		__ready: function() {
			// screen内に配置されているDOMをコンテンツとして設定
			var $contents = this.$find('>*');
			$contents.css({
				position: 'absolute',
				margin: 0,
				paddiong: 0,
				top: 0,
				display: 'none',
				width: '100%'
			}).addClass('h5screenContent');

			// コンテンツが最低3ページ以上になるようにする
			if ($contents.length === 0) {
				throw new Error('コンテンツは最低1ページは必要です');
			}
			// ページ数が2以下の場合は3ページ以上になるよう繰り返す
			if ($contents.length < 3) {
				// コンテンツにインデックスを振って、どれがどのクローンかわかるようにする
				$contents.each(function(i) {
					$(this).attr('data-h5screenCloneIndex', '' + i);
				});
				while (this.$find('>*').length < 3) {
					$(this.rootElement).append($contents.clone().addClass('clone'));
				}
				$contents = this.$find('>*');
			}

			// ページ数を設定
			this.numberOfPages = $contents.length;
			// 先頭のコンテンツをカレントとして設定
			var $current = $contents.eq(0);
			$current.addClass('current').css('display', 'block');

			// スクロール用のDOMを作成
			this._$scrollingBase = $('<div class="scrollingBase"></div>').css({
				display: 'block',
				left: 0,
				margin: 0,
				padding: 0,
				position: 'relative',
				height: '100%'
			});
			this._$scrollingBase.append($contents);
			$(this.rootElement).append(this._$scrollingBase);

			// 準備ができたら表示
			$(this.rootElement).css('visibility', 'visible');
		},

		/**
		 * アニメーションをスタートする。
		 *
		 * @memberOf h5.ui.ScreenController
		 */
		startAnimation: function() {
			if (this._isAnimation) {
				return;
			}
			// スクリーン幅を取得
			var screenWidth = $(this.rootElement).innerWidth();
			var $current = this.$find('.h5screenContent.current');
			// 左右にコンテンツが無ければ追加
			var $left = $current.prev();
			if (!$left.length) {
				// コンテンツ数がページ数を超えていれば、左側の要素は右端から持ってくる
				$left = this.$find('.h5screenContent:last');
				this._$scrollingBase.prepend($left);
			}
			var $right = $current.next();
			if (!$right.length) {
				// コンテンツ数がページ数を超えていれば、右側の要素は左端から持ってくる
				$right = this.$find('.h5screenContent:first');
				this._$scrollingBase.append($right);
			}
			// コンテンツ幅を固定にする
			$current.add($left).add($right).css('width', screenWidth);
			// scrollingBaseの幅をスクロールバーが出ないように設定
			this._$scrollingBase.css('width', screenWidth * 2);
			$left.css({
				left: -screenWidth,
				display: 'block'
			});
			$right.css({
				left: screenWidth,
				display: 'block'
			});
			// scrollingBaseの高さと、overflow:visibleを設定。
			this._$scrollingBase.css({
				height: Math.max($left.height(), $current.height(), $right.height()),
				overflow: 'visible'
			});
			$(this.rootElement).css('overflow', 'hidden');
			this._isAnimation = true;
			$(this.rootElement).addClass('inOperation');
			this._animationDfd = h5.async.deferred();
		},
		/**
		 * アニメーションをストップする
		 *
		 * @memberOf h5.ui.ScreenController
		 */
		stopAnimation: function() {
			// ダミーを削除
			this.$find('.h5screenContent.dummy').remove();
			// カレント以外非表示
			this.$find('.h5screenContent:not(.current)').css('display', 'none');
			var $current = this.$find('.h5screenContent.current');
			// 幅の固定化を元に戻す
			this._$scrollingBase.css('width', '100%');
			$current.css('width', '100%');
			// scrollingBaseの位置と幅と高さ調整
			var left = parseInt(this._$scrollingBase.css('left'));
			this._$scrollingBase.css({
				left: 0,
				height: $current.height(),
				overflow: 'visible'
			});
			this._$scrollingBase.children().each(function() {
				$(this).css('left', parseInt($(this).css('left')) + left);
			});
			$(this.rootElement).css('overflow', 'visible');
			this._isAnimation = false;
			$(this.rootElement).removeClass('inOperation');
			this._animationDfd.resolve();
		},

		/**
		 * @memberOf h5.ui.ScreenController
		 * @param {Number} left 移動先の位置
		 * @param {String|Number} duration アニメーション速度
		 * @returns promise
		 */
		slide: function(left, duration) {
			var dfd = h5.async.deferred();
			this._$scrollingBase.animate({
				left: left
			}, duration, null, function() {
				dfd.resolve();
			});
			return dfd.promise();
		},

		/**
		 * @memberOf h5.ui.ScreenController
		 */
		track: function(d) {
			var leftOrTop = this._vertical ? 'top' : 'left';
			this._$scrollingBase.css(leftOrTop, parseInt(this._$scrollingBase.css(leftOrTop)) + d);
		},

		/**
		 * 右に1ページ移動
		 *
		 * @memberOf h5.ui.ScreenController
		 * @returns promise
		 */
		next: function() {
			return this._pageSlide('next');
		},

		/**
		 * 左に1ページ移動
		 *
		 * @memberOf h5.ui.ScreenController
		 * @returns promise
		 */
		prev: function() {
			return this._pageSlide('prev');
		},

		/**
		 * ページ移動
		 *
		 * @param {String} nextOrPrev 'next'または'prev'
		 * @returns promise
		 */
		_pageSlide: function(nextOrPrev) {
			if (this._isAnimation) {
				// アニメーション中ならスタックする
				var dfd = h5.async.deferred();
				this._animationDfd.done(this.own(function() {
					this._pageSlide(nextOrPrev).done(function() {
						dfd.resolve();
					});
				}));
				return dfd.promise();
			}
			// スクロールする量を、startAnimationする前に取得する(スクロールバーが表示される前)
			var scrollAmount = (nextOrPrev === 'prev' ? 1 : -1) * $(this.rootElement).innerWidth();
			this.startAnimation();
			return this.slide(scrollAmount).done(this.own(function() {
				// カレントの入れ替え
				var $current = this.$find('.h5screenContent.current').removeClass('current');
				$current[nextOrPrev]().addClass('current').removeClass('dummy');
				this.stopAnimation();
			}));
		},

		/**
		 * ページをロード
		 *
		 * @param {String} url
		 * @memberOf h5.ui.ScreenController
		 */
		load: function(url) {
			// ロード開始時のカレントを覚えておく
			var $current = this.$find('.h5screenContent.current');
			// ページのロード
			var promise = this._pageLoadLogic.load(url).done(
					this.own(function(data) {
						var $target = $current;
						// cloneしたものがあればそこにもロード結果を反映する
						var cloneIndex = $current.attr('data-h5screencloneindex');
						if (cloneIndex != null) {
							$target = $target.add($current.parent().find(
									'[data-h5screencloneindex="' + cloneIndex + '"]'));
						}
						$target.html(data).addClass('loaded');
						// scrollingBaseの位置と高さ調整
						var height = $target.outerHeight();
						this._$scrollingBase.css('height', height);
						setTimeout(this.own(function() {
							if (height !== $target.outerHeight()) {
								this._$scrollingBase.css('height', $target.outerHeight);
							}
						}), 5);
					}));
			this.indicator({
				target: $current,
				promises: promise
			}).show();
		},

		/**
		 * ページを追加
		 *
		 * @param {jQuery} $elm
		 * @returns {Promise}
		 * @memberOf h5.ui.ScreenController
		 */
		add: function($elm) {
			var dfd = h5.async.deferred();
			if (this._isAnimation) {
				// アニメーション中ならスタックする
				this._animationDfd.done(this.own(function() {
					this.add($elm).done(function() {
						dfd.resolve();
					}).fail(function() {
						dfd.reject();
					});
				}));
				return dfd.promise();
			}

			// カレントの後ろに追加する
			var $current = this.$find('.h5screenContent.current');
			// コンテンツ化
			this._translateContents($elm);
			$current.after($elm);

			// 循環しない場合で、最後の要素だった場合はクラスを入れ替える
			if (!this._circulation && $current.hasClass('h5screenLastContent')) {
				$current.removeClass('h5screenLastContent');
				$elm.addClass('h5screenLastContent');
			}
			return dfd.resolve().promise();
		},

		/**
		 * 指定されたページの箇所に移動
		 *
		 * @param {jQuery} $elm
		 * @memberOf h5.ui.ScreenController
		 */
		move: function($target) {
			if (this._isAnimation) {
				// アニメーション中ならスタックする
				var dfd = h5.async.deferred();
				this._animationDfd.done(this.own(function() {
					this.move($target).done(function() {
						dfd.resolve();
					}).fail(function() {
						dfd.reject();
					});
				}));
				return dfd.promise();
			}
			var dfd = h5.async.deferred();
			var $current = this.$find('.h5screenContent.current');
			if ($target[0] === $current[0]) {
				// 指定されたターゲットが現在のページなら何もしない
				return dfd.resolve().promise();
			}

			$target.css('display', 'block');
			$current.css('display', 'none');
			$target.css({
				top: 0,
				left: 0
			});
			// カレントの入れ替え
			$current.removeClass('current');
			$target.addClass('current').removeClass('dummy');
			return dfd.resolve().promise();
		},

		/**
		 * ページを削除
		 *
		 * @param {jQuery} $elm
		 * @memberOf h5.ui.ScreenController
		 */
		remove: function($elm) {
			var dfd = h5.async.deferred();
			if ($.inArray($elm[0], this.$find('.h5screenContent')) === -1) {
				var e = new Error('削除する要素はスクリーン内のコンテンツ要素を指定してください');
				throw e;
				return dfd.reject(e).promise();
			}
			if (this._isAnimation) {
				// アニメーション中ならスタックする
				this._animationDfd.done(this.own(function() {
					this.remove($elm).done(function() {
						dfd.resolve();
					}).fail(function() {
						dfd.reject();
					});
				}));
				return dfd.promise();
			}

			if (this.$find('.h5screenContent').length < 2) {
				// 1つしかない場合は削除でない
				return dfd.reject().promise();
			}

			var $current = this.$find('.h5screenContent.current');
			if ($elm[0] === $current[0]) {
				// カレントを削除するときは移動してから削除する
				var promise = null;
				if (!this._circulation && $current.hasClass('h5screenFirstContent')) {
					// 次のページへ移動
					promise = this.next().done(function() {
						$current.next().addClass('h5screenFirstContent');
					});
				} else {
					// 前のページへ移動
					promise = this.prev().done(function() {
						if ($current.hasClass('h5screenLastContent')) {
							$current.prev().addClass('h5screenLastContent');
						}
					});
				}
				// 移動してから削除
				promise.done(this.own(function() {
					// コントローラのdispose
					this._disposeContentsController($elm).done(function() {
						// 要素の削除
						$elm.remove();
						dfd.resolve();
					});
				}));
				return dfd.promise();
			}

			// カレント以外の要素が削除対象の場合
			if ($elm.hasClass('h5screenFirstContent')) {
				// クラスの入れかえ
				$elm.next().addClass('h5screenFirstContent');
			}
			if ($elm.hasClass('h5screenLastContent')) {
				// クラスの入れかえ
				$elm.prev().addClass('h5screenLastContent');
			}
			this._disposeContentsController($elm).done(function() {
				$elm.remove();
				dfd.resolve();
			});

			return dfd.promise();
		},

		/**
		 * @memberOf h5.ui.ScreenController
		 * @param $elm
		 * @returns promise
		 */
		_disposeContentsController: function($elm) {
			// 内部のコントローラを全てdisposeする
			// disposeでPromiseが返ってきたら、removeはdispose完了後にする。
			var controllers = h5.core.controllerManager.getControllers($elm, {
				deep: true
			});
			var promises = [];
			for (var i = 0, len = controllers.length; i < len; i++) {
				promises.push(controllers[i].dispose());
			}
			return h5.async.when(promises);
		}
	};
	h5.core.expose(ScreenController);
})();

(function() {
	var ScreenUIController = {
		/**
		 * @memberOf h5.ui.ScreenUIController
		 */
		__name: 'h5.ui.ScreenUIController',

		/**
		 * 指でスライドするときの、スライド距離と移動距離のレート(移動距離/スライド距離)
		 *
		 * @memberOf h5.ui.ScreenUIController
		 */
		_slideRate: 1,

		/**
		 * @memberOf h5.ui.ScreenUIController
		 */
		_screenController: h5.ui.ScreenController,

		/**
		 * trackstart時のスクリーン幅を覚えておく
		 *
		 * @memberOf h5.ui.ScreenUIController
		 */
		_screenWidth: 0,

		/**
		 * @memberOf h5.ui.ScreenUIController
		 */
		__ready: function(context) {
			// コントローラのパラメータで渡されたナビゲーションコントローラをバインドします
			var navigationController = context.args.navigationController;
			this._navController = h5.core.controller(context.args.navigationRootElement
					|| this.rootElement, navigationController);
		},

		/**
		 * スクリーンがアニメーション中かどうかを返す
		 *
		 * @memberOf h5.ui.ScreenUIController
		 */
		isAnimation: function() {
			return this._screenController._isAnimation;
		},

		/**
		 * @memberOf h5.ui.ScreenUIController
		 */
		__meta: {
			_screenController: {
				rootElement: '.screen'
			}
		},

		/**
		 * @memberOf h5.ui.ScreenUIController
		 */
		'{rootElement} loadPage': function(context) {
			this._loadPage(context);
		},

		/**
		 * @memberOf h5.ui.ScreenUIController
		 * @param url
		 */
		_loadPage: function(context) {
			if (!context.evArg || !context.evArg.url || !context.evArg.force
					&& this.$find('.h5screenContent.current').hasClass('loaded')) {
				// url指定が無ければロードしない
				// forceオプション無しかつ、すでにコンテンツが読み込まれているなら何もしない
				// forceの指定があれば読み込み済みであろうと強制的に再ロードする
				return;
			}
			this._screenController.load(context.evArg.url);
		},

		/**
		 * @memberOf h5.ui.ScreenUIController
		 */
		'{rootElement} nextPage': function(context) {
			this._screenController.next().always(
					this.ownWithOrg(function(promise) {
						// ナビゲーションコントローラに通知
						var isResolved = promise.state() === 'resolved';
						if (this._navController && this._navController.nextCallback) {
							this._navController.nextCallback(
									this.$find('.h5screenContent.current'), isResolved);
						}
						if (isResolved) {
							this._loadPage(context);
						}
					}));
		},

		/**
		 * @memberOf h5.ui.ScreenUIController
		 */
		'{rootElement} prevPage': function(context) {
			this._screenController.prev().always(
					this.ownWithOrg(function(promise) {
						// ナビゲーションコントローラに通知
						var isResolved = promise.state() === 'resolved';
						if (this._navController && this._navController.prevCallback) {
							this._navController.prevCallback(
									this.$find('.h5screenContent.current'), isResolved);
						}
						if (isResolved) {
							this._loadPage(context);
						}
					}));
		},

		/**
		 * @memberOf h5.ui.ScreenUIController
		 */
		'{rootElement} movePage': function(context) {
			var $target = $(context.evArg.target);
			this._screenController.move($target);
			// ナビゲーションコントローラに通知
			if (this._navController && this._navController.moveCallback) {
				this._navController.moveCallback(this.$find('.h5screenContent.current'), true);
			}
			this._loadPage(context);
		},

		/**
		 * @memberOf h5.ui.ScreenUIController
		 */
		'{rootElement} screenTrackstart': function(context) {
			if (this._screenController._isAnimation) {
				return;
			}
			var trackSize = context.evArg.trackSize;
			this._screenWidth = this.$find('.screen').width();
			this._slideRate = this._screenWidth / trackSize;
			this._screenController.startAnimation();
		},

		/**
		 * @memberOf h5.ui.ScreenUIController
		 */
		'{rootElement} screenTrackmove': function(context) {
			this._screenController.track(context.evArg.dx * this._slideRate);
		},

		/**
		 * @memberOf h5.ui.ScreenUIController
		 */
		'{rootElement} screenTrackend': function(context) {
			var $current = this.$find('.h5screenContent.current');
			var $newCurrent = null;
			var page = context.evArg.page;
			var url = context.evArg.url;
			var slideDist;
			if (page === 'current') {
				$newCurrent = $current;
				slideDist = 0;
			} else {
				$newCurrent = $current[page]();
				$current.removeClass('current');
				$newCurrent.addClass('current');
				slideDist = (page === 'next' ? -1 : 1) * this._screenWidth;
			}
			this._screenController.slide(slideDist, 'fast').done(this.own(function() {
				this._screenController.stopAnimation();
				if (!$newCurrent.hasClass('loaded') || context.evArg.force) {
					this._screenController.load(url);
				}
			}));
		},

		/**
		 * @memberOf h5.ui.ScreenUIController
		 * @param context
		 */
		'{rootElement} addPage': function(context) {
			var $elm = context.evArg.element;
			this._screenController.add($elm).always(this.ownWithOrg(function(promise) {
				// ナビゲーションコントローラに通知
				var isResolved = promise.state() === 'resolved';
				if (this._navController && this._navController.addCallback) {
					this._navController.addCallback($elm, isResolved);
				}
			}));
		},

		/**
		 * @memberOf h5.ui.ScreenUIController
		 * @param context
		 */
		'{rootElement} removePage': function(context) {
			var $elm = context.evArg.element;
			this._screenController.remove($elm).always(
					this.ownWithOrg(function(promise) {
						// ナビゲーションコントローラに通知
						var isResolved = promise.state() === 'resolved';
						if (this._navController && this._navController.removeCallback) {
							this._navController.removeCallback(this
									.$find('.h5screenContent.current'), isResolved);
						}
					}));
		}
	};

	h5.core.expose(ScreenUIController);
})();