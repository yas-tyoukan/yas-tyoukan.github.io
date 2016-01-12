(function() {
	var controller = {
		__name: 'sample.sampleController',
		anim1Timer: null,
		anim2Timer: null,
		__ready: function(context) {
			this.startArrow1Animation();
			this.startArrow2Animation();
		},
		startArrow1Animation: function() {
			var $target = this.$find('.arrow1 .target');
			this.anim1Timer = setInterval(function() {
				var $last = $target.find('img:last');
				$last.remove();
				$target.prepend($last);
			}, 400);
		},
		startArrow2Animation: function() {
			var $target = this.$find('.arrow2 .target');
			var $img = $target.find('img');
			if ($img[0].complete) {
				loadDone();
			} else {
				$img.load(loadDone);
			}
			function loadDone() {
				var imgWidth = $img.width();
				var imgHeight = $img.height();
				$target.css({
					overflowX: 'hidden',
					width: imgWidth,
					height: imgHeight
				});
				$target.append($img.clone());
				$target.append($img.clone());
				var $imgs = $target.find('img');
				$imgs.each(function(i) {
					$(this).css('position', 'absolute');
					$(this).css('left', i * imgWidth);
				});
				this.anim2Timer = setInterval(function() {
					var left = parseInt($imgs.eq(0).css('left'));
					left++;
					if (left === imgWidth) {
						left = 0;
					}
					$imgs.each(function(i) {
						$(this).css('left', left);
						left += imgWidth;
					});
				}, 100);
			}
		}
	};

	h5.core.expose(controller);
})();