$(function(){
	// スクロールされた時に何かする対象となる要素を取得
	var $wrapper = $('.scroll-target-wrapper');
	// スクロールイベントの遅延判定を行うためのタイマーとそのdelay時間(ミリ秒)の設定
	// スクロールイベントの都度処理を実行するのではなく、delayTime分遅延させることで処理を軽くしている
	var timerForDelay;
	var delayTime = 50;

	/**
	 * スクロールされた時のイベントハンドラ
	 */
	function scrollHandler(){
		if(timerForDelay){
			// timerが設定されていればtimerをクリア
			// 次にセットするタイマーで処理を実行する
			clearTimeout(timerForDelay);
		}
		timerForDelay = setTimeout(function(){
			// scrollされている高さを取得
			var scrollHeight = $(window).scrollTop();
			// windowの高さを取得
			var windowHeight = window.innerHeight;
			$wrapper.each(function(){
				// スクロールされた時に何かをする要素
				var $this = $(this);
				// 要素のy座標位置(左上が0)
				var offsetTop = $this.offset().top;
				// 要素自体の高さ
				var elementHeight = $this.height();
				// 可視範囲に入っているかどうか
				// つまり、スクロールの高さ〜スクロールの高さ+ウィンドウ高さの範囲に、入っているかどうかを判定
				// 要素は少しでも見えていれば、可視と判定する。そのため、要素の高さも考慮して計算している
				if(scrollHeight <= (offsetTop + elementHeight) && offsetTop < (scrollHeight + windowHeight)){
					// 可視範囲に入っていれば、"in-view"クラスを追加
					$this.find('.scroll-target').addClass('in-view');
				} else {
					// 可視範囲に入っていないなら、"in-view"クラスを除去
					$this.find('.scroll-target').removeClass('in-view');
				}
			});
		}, delayTime);
	}
	$(window).scroll(scrollHandler);
});
