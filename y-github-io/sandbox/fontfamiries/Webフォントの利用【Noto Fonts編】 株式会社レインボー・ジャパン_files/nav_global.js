/**
 * nav_global.js
 * グロナビの追従と固定
 */

this.rjweb = this.rjweb || {};
(function($){

	var that = this;

	/**
	 * FIX FOOTER
	 */
	that.rjweb = {
		setFixFooter:{
			documentH:0,
			bindPosition:0,
			SET_POS_H:0,
			globalNavH:0,
			brH:0,
			deffHeight:0,
			refreshflg:false,

			/**
			 * 初期設定
			 */
			init:function(){
				var that = this;
				that.globalNav = $('#globalNav');
				if(that.globalNav.length > 0){

					that.windowObj = $(window);
					that.documentObj = $(document);

					//グロナビ高さ
					that.globalNavH = that.globalNav.height();

					//ブラウザの高さ
					that.brH = that.windowObj.height();

					//ドキュメントの高さ
					that.documentH = that.documentObj.height();

					//結合位置
					that.bindPosition = that.globalNav.offset().top;

					//結合位置 - ウィンドウ高さ
					that.deffHeight = that.bindPosition - that.brH;

					//グロナビ初期スタイル設定
					that.globalNav.css({'position': 'fixed', 'bottom': - that.globalNavH, 'left': 0});

				// ---------------------------------
				// 初期読み込み時
				// ---------------------------------
					setTimeout(
						function(){
							var y = that.windowObj.scrollTop();
							that.setFoot(y);
						},250
					);

				// ---------------------------------
				// スクロール時
				// ---------------------------------
					that.windowObj.scroll(function () {
						var y = $(this).scrollTop();
						that.setFoot(y);
					});

				// ---------------------------------
				// リサイズ時
				// ---------------------------------
					that.windowObj.resize(function(){
						var y = $(this).scrollTop();
						that.brH = that.windowObj.height();
						that.deffHeight = that.bindPosition - that.brH;
						that.setFoot(y);
					});
				}
			},

			/**
			 * 再設定関数
			 */
			refresh:function(){
				var that = this;
				var documentHresetting = that.documentObj.height();
				var hDef = documentHresetting - that.documentH;

				if(!that.refreshflg){
					that.refreshflg = true;
					that.deffHeight = that.deffHeight + hDef + that.globalNavH;
				}else{
					that.deffHeight = that.deffHeight + hDef;
				}

				that.documentH = documentHresetting;
				that.setFoot(that.windowObj.scrollTop());
			},

			/**
			 * 設定関数
			 */
			setFoot: function(y){
				var that = this;
				if(y >= that.deffHeight){
					that.globalNav.addClass('1').stop().css({'display':'block','position':'absolute','bottom':0});
				}else if(y >= that.SET_POS_H){
					that.globalNav.addClass('2-1').stop().css({'display':'block','position':'fixed'}).animate({'bottom':0},250);
				}
				
				var brH = that.windowObj.height();
				var checkpos = that.windowObj.scrollTop() + brH;
				if (checkpos >= that.documentObj.height()) {
					that.globalNav.stop().css({'display':'block','position':'absolute','bottom':0});
				}
			}
		}
	}
	
	/**
	 * ブログ開始までロールオーバー時はcoming soonにテキスト変更
	 */
	function changeBlogLabel() {
		var navBlog = $('.staffblog a');
		
		navBlog.on({
			click: function(e) {
				e.preventDefault();
			},
			mouseenter: function() {
				$(this).html('<span>Coming Soon</span>');
			},
			mouseleave: function() {
				$(this).html('ブログ');
			}
		});
	}

	/**
	 * 実行
	 */
	$(function() {
		var ua = navigator.userAgent;
		var activeURL = location.pathname.split("/")[1];
		
		if(
			ua.indexOf("Android") != -1
			|| ua.indexOf("iPhone") != -1
			|| ua.indexOf("iPad") != -1
		) {
			// pc以外はフッター上に固定
			$('.nav-global').css({
				'position': 'absolute',
				'bottom': 0
			});
		} else {
			// pcは追従
			if (activeURL == 'works') {
				// 制作実績
				setTimeout(function() {
					rjweb.setFixFooter.init();
				}, 1000);  // 0にすると追従しない
			} else {
				// その他
				setTimeout(function() {
					rjweb.setFixFooter.init();
				}, 0);  // 待機時間
			}
		}
		// changeBlogLabel();
	});

}) (jQuery);
