// *******************************************************************************************************
//
// # ソーシャルカウント取得
//
// *******************************************************************************************************

function get_count_fb(url, postid) {
	$.ajax({
		url:'https://graph.facebook.com/',
		dataType:'jsonp',
		data:{
			id:url
		},
		success:function(json){
			$('#' + postid).text( json.share.share_count || 0 );
		},
		error:function(){
			$('#' + postid).text('?');
		}
	});
}
function get_count_tw(url, postid) {
	$.ajax({
		url:'https://jsoon.digitiminimi.com/twitter/count.json',
		dataType:'jsonp',
		data:{
			url:url
		},
		success:function(json){
			$('#' + postid).text( json.count || 0 );
		},
		error:function(){
			$('#' + postid).text('?');
		}
	});
}
function get_count_ht(url, postid) {
	$.ajax({
		url:'https://api.b.st-hatena.com/entry.count?callback=?',
		dataType:'jsonp',
		data:{
			url:url
		},
		success:function(json){
			$('#' + postid).text( json || 0 );
		},
		error:function(){
			$('#' + postid).text('?');
		}
	});
}
