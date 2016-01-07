// data属性からコントローラをバインドする
$(function() {
	$('[data-controller]').each(function() {
		h5.core.controller(this, h5.u.obj.getByPath($(this).data('controller')));
	});
});