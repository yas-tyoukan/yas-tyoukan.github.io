// utils
(function() {
	/** SVGの名前空間 */
	var XLINKNS = 'http://www.w3.org/1999/xlink';
	/** SVGの名前空間 */
	var XMLNS = 'http://www.w3.org/2000/svg';

	/** ゲーム画面の縦横比(縦:横=2:3なら2/3) */
	var RATE = 2 / 3;
	/**
	 * 画面サイズの調整
	 *
	 * @param rate 縦横比
	 */
	function adjustScreen() {
		var rate = RATE;
		var screenHeight = innerHeight;
		var screenWidth = innerWidth;
		var width, height;
		if (screenHeight > screenWidth / rate) {
			width = screenWidth;
			height = screenWidth / rate;
		} else {
			width = screenHeight * rate;
			height = screenHeight;
		}
		pin.element.$container.css({
			width: width,
			height: height
		});
	}

	/**
	 * タグ名と属性値から要素を作成(必要なクラスを追加する)
	 *
	 * @private
	 * @param tagName
	 * @param data
	 * @returns 作成した要素
	 */
	function createSvgDrawingElement(tagName, data) {
		var elem = document.createElementNS(XMLNS, tagName);
		var $elem = $(elem);
		$elem.attr(data.attr);
		if (data.attrNS) {
			var attrNS = data.attrNS;
			for (var i = 0, l = attrNS.length; i < l; i++) {
				var attr = attrNS[i];
				elem.setAttributeNS(attr.ns, attr.name, attr.value);
			}
		}
		if (data.style) {
			$elem.css(data.style);
		}
		return $elem;
	}

	function refreshTweetContent(msg) {
		var $wrapper = $('.tweetBtnWrapper');
		$wrapper.empty();
		$wrapper
				.append('<a href="https://twitter.com/share" class="twitter-share-button" data-text="'
						+ msg
						+ '" data-count="vertical">ツイートする</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?"http":"https";if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}else{twttr.widgets.load();}}(document, "script", "twitter-wjs");</script>');
	}

	// globalに公開
	h5.u.obj.expose('pin', {
		consts: {
			RATE: RATE
		},
		utils: {
			adjustScreen: adjustScreen,
			createSvgDrawingElement: createSvgDrawingElement,
			refreshTweetContent: refreshTweetContent
		}
	});
})();

(function() {
	var DATA_STATE = 'state';
	var EVENT_STATE_CHANGE = 'stateChange';
	h5.core.expose({
		__name: 'h5.ui.container.StateBox',
		_currentState: null,
		__init: function() {
			// data-stateが指定されているもののうち、最初以外を隠す
			var $stateBoxes = this._getAllStateBoxes();
			this.setState($stateBoxes.data(DATA_STATE));
		},
		setState: function(state) {
			var preState = this._currentState;
			if (preState === state) {
				return;
			}
			var $target = this._getStateBoxByState(state);
			if (!$target.length) {
				this.log.warn('指定されたstateの要素はありません。{}', state);
				return;
			}
			var $stateBoxes = this.$find('>*[data-' + DATA_STATE + ']');
			$stateBoxes.css('display', 'none');
			$target.css('display', 'block');
			this._currentState = state;
			this.trigger(EVENT_STATE_CHANGE, [state, preState]);
		},
		getState: function() {
			return this._currentState;
		},
		getContentsSize: function() {
			var $current = this._getStateBoxByState(this._currentState);
			// TODO outerWidth/Heightかどうかはオプション？
			return {
				width: $current.outerWidth(),
				height: $current.outerHeight()
			};
		},
		_getAllStateBoxes: function() {
			return this.$find('>[data-' + DATA_STATE + ']');
		},
		_getStateBoxByState: function(state) {
			return this.$find('>[data-' + DATA_STATE + '="' + state + '"]');
		}
	});
})();

(function() {
	h5.core.expose({
		__name: 'pin.controller.MainController',
		load: function() {
			console.log(this.__name);
		}
	})
})();

(function() {
	/** 仮想幅 */
	var VW = 320;
	/** 仮想高さ */
	var VH = 480;
	/** 可動範囲 */
	var RANGE_LEFT = VW * 0.1;
	var RANGE_RIGHT = VW * 0.9;
	/** pinの長さ */
	var PIN_LENGTH = 100;
	/** pinの頭の半径 */
	var PIN_RADIUS = 15;
	/** 敵の半径 */
	var ENEMY_RADIUS = 10;
	/** pinの水平移動速度 */
	var PIN_VX = 1;
	/** pinの鉛直移動速度 */
	var PIN_VY = 0.02;
	/** leftキー */
	var KEY_LEFT = 37;
	/** righttキー */
	var KEY_RIGHT = 39;
	/** 敵機襲来頻度(フレーム数) */
	var ENEMY_FREQUENCY = 100;
	/** 敵機の速度 */
	var ENEMY_SPEED = 1;
	/** 敵機のサイズ */
	var ENEMY_SIZE = 30;

	/** 1秒当たりのフレーム数 */
	var FPS = 60;

	// -----------
	// cache
	// -----------
	var createSvgDrawingElement = pin.utils.createSvgDrawingElement;

	h5.core
			.expose({
				__name: 'pin.controller.GameController',
				_$board: null,
				_$svg: null,
				_$pinBody: null,
				_$pinHead: null,
				_enemiesData: null,
				_$enemies: null,
				_timer: null,
				_time: 0,
				_score: 0,
				_data: {},
				_isGameOver: false,
				_$controllLeft: null,
				_$controllRight: null,
				__init: function() {
					this._$board = this.$find('.board');
					this._$svg = this.$find('svg');
					this._$controllLeft = this.$find('.left-btn');
					this._$controllRight = this.$find('.right-btn');
					// svgの設定
					this._$svg.attr({
						height: VH,
						width: VW
					});
					// $.attrは属性名の大文字小文字を無視するのでネイティブで設定
					this._$svg[0].setAttribute('viewBox', '0 0 ' + VW + ' ' + VH);
				},

				// -----------------------------------
				// 操作ここから
				// -----------------------------------
				'{window} keydown': function(ctx) {
					var key = ctx.event.keyCode;
					if (key === KEY_LEFT) {
						// 左キー
						this._onLeftKey();
					} else if (key === KEY_RIGHT) {
						// 右キー
						this._onRightKey();
					}
				},
				'{this._$controllLeft} mousedown': function() {
					this._onLeftKey();
				},
				'{this._$controllLeft} touchstart': function() {
					this._onLeftKey();
				},
				'{this._$controllRight} mousedown': function() {
					this._onRightKey();
				},
				'{this._$controllRight} touchstart': function() {
					this._onRightKey();
				},
				_onLeftKey: function() {
					if (this._isGameOver) {
						return;
					}
					var data = this._data;
					data.lastInput = 'left';
					data.keyLeft = true;
					this._$controllLeft.addClass('clicked');
				},
				_onRightKey: function() {
					if (this._isGameOver) {
						return;
					}
					var data = this._data;
					data.lastInput = 'right';
					data.keyRight = true;
					this._$controllRight.addClass('clicked');
				},
				'{window} keyup': function(ctx) {
					// キーを上げた時に左右どちらかが押されていたらlastInputを更新
					if (this._isGameOver) {
						return;
					}
					var key = ctx.event.keyCode;
					if (key === KEY_LEFT) {
						// 左キー
						this._offLeftKey();
					} else if (key === KEY_RIGHT) {
						// 右キー
						this._offRightKey();
					}
				},
				'{this._$controllLeft} mouseup': function() {
					this._offLeftKey();
				},
				'{this._$controllLeft} touchend': function() {
					this._offLeftKey();
				},
				'{this._$controllRight} mouseup': function() {
					this._offRightKey();
				},
				'{this._$controllRight} touchend': function() {
					this._offRightKey();
				},
				_offLeftKey: function() {
					if (this._isGameOver) {
						return;
					}
					var data = this._data;
					data.keyLeft = false;
					data.lastInput = data.keyRight ? 'right' : null;
					this._$controllLeft.removeClass('clicked');
				},
				_offRightKey: function() {
					if (this._isGameOver) {
						return;
					}
					var data = this._data;
					data.keyRight = false;
					data.lastInput = data.keyLeft ? 'left' : null;
					this._$controllRight.removeClass('clicked');
				},
				// -----------------------------------
				// 操作ここまで
				// -----------------------------------

				'{.retry} click': function() {
					this.load();
				},
				load: function() {
					pin.utils.adjustScreen();
					this.startGame();
				},
				unload: function() {
				// TODO
				},
				startGame: function() {
					// 仮想サイズとの比率を設定
					var actualHeight = this._$board.innerHeight();
					var actualWidth = this._$board.innerWidth();
					var data = this._data;
					data.pinPosition = {
						bottomX: VW / 2,
						topX: 0
					};
					data.rate = actualHeight / VH;
					// 自機を描画
					if (!this._$pinBody) {

						this._$pinBody = createSvgDrawingElement('path', {
							attr: {
								'class': 'pin-body'
							}
						});
						this._$svg.append(this._$pinBody);
					}
					if (!this._$pinHead) {
						this._$pinHead = createSvgDrawingElement('circle', {
							attr: {
								r: PIN_RADIUS,
								'class': 'pin-head',
								cy: VH * 0.95 - PIN_LENGTH
							}
						});
						this._$svg.append(this._$pinHead);
					}
					this._refreshPinPosition();

					// 時間のリセット
					this._time = 0;
					// スコアのリセット
					this._score = 0;
					this._isGameOver = false;

					// 入力キーのリセット
					data.lastInput = null;
					data.leftKey = null;
					data.rightKey = null;

					// 敵機のリセット
					this._enemiesData = [];
					this._$enemies && this._$enemies.remove();
					this._$enemies = $();

					this._timer = setInterval(this.own(this._loop), 1000 / FPS);
				},
				endGame: function() {
					clearTimeout(this._timer);
					this._data = {};
				},
				_refreshPinPosition: function() {
					// 自機を描画
					var pinPosition = this._data.pinPosition;
					var topX = pinPosition.topX;
					var bottomX = pinPosition.bottomX;
					var topY = -Math.sqrt(PIN_LENGTH * PIN_LENGTH - topX * topX);
					var bottomY = VH * 0.95;
					var ret = true;
					if (isNaN(topY) || topY > -PIN_RADIUS) {
						// 地面に落ちたpinを描画
						topY = -PIN_RADIUS;
						topX = (topX > 0 ? 1 : -1)
								* Math.sqrt(PIN_LENGTH * PIN_LENGTH - topY * topY);
						var ret = false;
					}
					this._$pinBody.attr('d', h5.u.str.format('M {0} {1} l {2} {3}', bottomX,
							bottomY, topX, topY));
					this._$pinHead.attr({
						cx: bottomX + topX,
						cy: bottomY + topY
					});
					return ret;
				},
				_calcEnemy: function(x) {
					var datas = this._enemiesData;
					var time = this._time;
					// 位置の更新
					for (var i = 0, l = datas.length; i < l; i++) {
						var data = datas[i];
						// 5秒ごとに0.1加速
						data.y += ENEMY_SPEED + time / (FPS * 50);
					}
					var lastIndex = datas.length - 1;
					var $enemies = this._$enemies;
					$enemies.each(function(index, elem) {
						var data = datas[index];
						if (index === lastIndex && VH <= datas[lastIndex].y) {
							// 見えなくなったものは削除
							datas.pop();
							$(elem).remove();
							$enemies.splice(lastIndex - 1);
							return false;
						}
						elem.setAttribute('d', h5.u.str.format('M {0} {1} l 0 {2}', data.x, data.y,
								ENEMY_SIZE));

					});
					if (time % ENEMY_FREQUENCY === 0) {
						// 敵機作成
						var data = {
							x: x,
							y: -ENEMY_SIZE
						};
						var $enemy = createSvgDrawingElement('path', {
							attr: {
								'class': 'enemy',
								d: h5.u.str.format('M {0} {1} l 0 {2}', x, -ENEMY_SIZE, ENEMY_SIZE)
							}
						});
						this._$svg.append($enemy);
						this._$enemies = $enemies.add($enemy);
						datas.push(data);
					}
				},
				/**
				 * あたり判定
				 */
				_doCollision: function(headX, headY) {
					var datas = this._enemiesData;
					for (var i = 0, l = datas.length; i < l; i++) {
						var data = datas[i];
						// 距離で判定
						// 敵機の両端で計算
						var dy = headY - data.y;
						var dx = headX - data.x;
						if ((Math.sqrt(dy * dy + dx * dx) < PIN_RADIUS)
								|| (Math.sqrt((dy - ENEMY_SIZE) * (dy - ENEMY_SIZE) + dx * dx) < PIN_RADIUS)) {
							return true;
						}
					}
					return false;
				},
				_loop: function() {
					var data = this._data;
					var dir = data.lastInput;
					var pinPosition = data.pinPosition;
					// キー入力の分移動
					if (dir) {
						var d = PIN_VX * (dir === 'left' ? -1 : 1);
						if (RANGE_LEFT <= pinPosition.bottomX + d
								&& pinPosition.bottomX + d <= RANGE_RIGHT) {
							// 可動範囲なら移動
							pinPosition.bottomX += d;
							pinPosition.topX -= d;
						}
					} else if (pinPosition.topX === 0) {
						// キー入力がない場合かつpinが直立している場合はランダムでpinトップを移動
						pinPosition.topX = Math.random() > 0.5 ? 1 : -1;
					}

					// 重力の計算
					pinPosition.topX += pinPosition.topX * PIN_VY;

					// 計算を適用
					var ret = this._refreshPinPosition();
					// 地面に落ちたらゲームオーバー
					if (!ret) {
						this._gameOver();
						return;
					}

					// 敵の移動と生成
					var headX = pinPosition.bottomX + pinPosition.topX;
					this._calcEnemy(headX);

					// 敵との当たり判定
					var headY = VH
							* 0.95
							- Math.sqrt(PIN_LENGTH * PIN_LENGTH - pinPosition.topX
									* pinPosition.topX);
					if (this._doCollision(headX, headY)) {
						this._gameOver();
						return;
					}

					// スコア
					this._score++;
					// タイム
					this._time++;
				},
				_gameOver: function() {
					clearInterval(this._timer);
					this._timer = null;
					this._isGameOver = true;
					// ゲームオーバ画面表示
					$('.score').text(this._score);
					// tweet内容を設定
					var msg = '待ち針を{0}F(世紀末単位)生き延びさせました！';
					pin.utils.refreshTweetContent(h5.u.str.format(msg, this._score));

					this.trigger('overlay', 'gameover');
				}
			});
})();

(function() {
	h5.core.expose({
		__name: 'pin.controller.GameOverController',
		load: function() {
			console.log(this.__name);
		}
	});
})();

(function() {
	h5.core.expose({
		__name: 'pin.controller.PageController',
		mainController: pin.controller.MainController,
		gameController: pin.controller.GameController,
		gameOverController: pin.controller.GameOverController,
		stateBoxController: h5.ui.container.StateBox,
		__meta: {
			mainController: {
				rootElement: '[data-state="main"]'
			},
			gameController: {
				rootElement: '[data-state="game"]'
			},
			gameOverController: {
				rootElement: '.gameover'
			}
		},
		_indicator: null,
		__init: function() {
			this._indicator = this.indicator({
				message: 'loading...'
			}).show();
		},
		__ready: function() {
			this._indicator && this._indicator.hide();
		},
		/**
		 * state遷移
		 */
		'.changeStateBtn click': function(ctx, $el) {
			this.trigger('setState', $el.data('state-link'));
		},
		'{rootElement} setState': function(ctx) {
			var state = ctx.evArg;
			this.$find('.overlay').addClass('hidden');
			this.stateBoxController.setState(state);
		},
		'{rootElement} overlay': function(ctx) {
			var overlay = ctx.evArg;
			this.$find('.' + overlay).removeClass('hidden');
		},
		/**
		 * stateの変更通知イベント
		 */
		'{rootElement} stateChange': function(ctx) {
			var states = ctx.evArg;
			var current = states[0];
			var pre = states[1];
			var preCtrl = this[pre + 'Controller'];
			var currentCtrl = this[current + 'Controller'];
			currentCtrl && currentCtrl.load && currentCtrl.load();
			preCtrl && preCtrl.unlaod && preCtrl.unlaod();
		}
	});
})();

$(function() {
	// global使用する要素を公開
	var $container = $('.container');
	h5.u.obj.expose('pin.element', {
		$container: $container
	});

	// 画面サイズ設定
	pin.utils.adjustScreen();

	// コントローラのバインド
	h5.core.controller($container, pin.controller.PageController);
});
