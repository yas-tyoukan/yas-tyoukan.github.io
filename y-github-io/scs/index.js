(function() {
	var controller = {
		__name: 'scs.controller.StampController',
		'[data-action="getPicture"] change': function(ctx, $el) {
			if (ctx.event.currentTarget.files.length === 0) {
				return;
			}
			var reader = new FileReader();
			reader.onload = this.own(function(ev) {
				this._addPreview(context, reader.result, $el, dfd);
			});

			reader.readAsDataURL(context.event.currentTarget.files[0]);
		},
		img2Canvas: function(img, canvas) {
			var w = canvas.width;
			var h = canvas.height;
			var sw = img.naturalWidth;
			var sh = img.naturalHeight;

			var ctx = canvas.getContext('2d');

			var srcAspectRatio = sh / sw;
			var canvasAspectRatio = h / w;

			var dx, dy, dw, dh;
			if (canvasAspectRatio >= srcAspectRatio) {
				// canvasの方が横に長い場合
				dw = w;
				dh = w * srcAspectRatio;
				dx = 0;
				dy = (h - dh) / 2;
			} else {
				// canvasの方が縦に長い場合
				dh = h;
				dw = h / srcAspectRatio;
				dx = (w - dw) / 2;
				dy = 0;
			}

			ctx.clearRect(0, 0, w, h);
			ctx.drawImage(img, 0, 0, sw, sh, dx, dy, dw, dh);
		}
	};
	h5.core.expose(controller);
})();