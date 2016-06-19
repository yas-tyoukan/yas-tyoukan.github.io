$(function() {
	var baseIkaring = 'https://splatoon.nintendo.net';
	var baseUrl = location.href.split('?')[0];
	if (!window.opener) {
		$('.how2use').css('display', 'block');
		var $jscode = $('.jscode');
		$jscode.val($jscode.val().replace(/#\{location\}/, baseUrl));
		return;
	}
	window.addEventListener('message', function receiveMessage(ev) {
		var rankData = JSON.parse(ev.data);
		var $weaponList = $('<div class="weaponList"></div>');
		$('.rank').append($weaponList);
		for(var i = 0, l = rankData.length; i < l; i++){
			var $img = $('<img>');
			$img.attr('src', rankData[i].i);
			$weaponList.append($img);
		}
	}, false);
	window.opener.postMessage('requestRankData', baseIkaring);
}); 