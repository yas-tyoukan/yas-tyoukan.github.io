// *******************************************************************************************************
// # サイト共通スクリプト
// *******************************************************************************************************

(function(win, doc) {

	// UA判定とページ振り分け
	function locationUA() {
		var ua = navigator.userAgent;
		var activeURL = location.pathname.split("/")[1];
		
		if (activeURL == 'unsupported') {
			if (ua.search('MSIE [67]') == -1 &&
				ua.search('Android 2.[123]') == -1
			) {
				location.href = "/";
			}
		}
		else
		if (activeURL != 'unsupported') {
			if (
				ua.search('Android 2.[123]') != -1 ||
				ua.search('MSIE [67]') != -1
			) {
				location.href = "/unsupported/";
			}
		}
	}
	
	// 実行
	locationUA();

})(this, document);
