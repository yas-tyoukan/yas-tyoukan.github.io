$(function() {
	$('html').css('height', screen.height);
});
$(function() {
	var $tsumuContainer = $('.tsumu .main');
	var tsumuContainer = $tsumuContainer[0];
	var width = $tsumuContainer.width();
	var height = $tsumuContainer.height();
	// TODO iPhone5Sでwidht===heightになるようなstyleにする
	if (width < height) {
		height = width;
	} else if (height < width) {
		width = height;
	}

	var normalRadius = width / 14;
	var largeRadius = width / 10;

	// Matter module aliases
	var Engine = Matter.Engine;
	var World = Matter.World;
	var Body = Matter.Body;
	var Bodies = Matter.Bodies;
	var Constraint = Matter.Constraint;
	var Composites = Matter.Composites;
	var Common = Matter.Common;
	var Vertices = Matter.Vertices;
	var MouseConstraint = Matter.MouseConstraint;

	// create a Matter.js engine
	var engine = Engine.create(tsumuContainer, {
		render : {
			options : {
				wireframes : false,
				width : width,
				height : height
			}
		}
	});

	// add a mouse controlled constraint
	var mouseConstraint = MouseConstraint.create(engine);
	World.add(engine.world, mouseConstraint);

	// some settings
	var offset = 10;
	var wallOptions = {
		isStatic : true,
		render : {
		// visible: false
		}
	};

	World.add(engine.world, [
			Bodies.rectangle(0, 0, 10, 2 * height, wallOptions),
			Bodies.rectangle(width, 0, 10, 2 * height, wallOptions),
			Bodies.rectangle(width / 2, height, width, 10, wallOptions) ]);

	var defaults = [];
	for (var i = 0; i < 39; i++) {
		var offset = 50;
		var x = offset + Math.random() * (width - 2 * offset);
		var y = -10 - (i * 10);
		defaults.push(Bodies.circle(x, y, normalRadius));
	}
	World.add(engine.world, defaults);

	// run the engine
	Engine.run(engine);

	// 傾き
	window.addEventListener('deviceorientation', function(e) {
		var beta = e.beta; // X軸の傾き
		var gamma = e.gamma; // Y軸の傾き

		var tx = Math.sin(gamma / 180 * Math.PI);
		var ty = Math.sin(beta / 180 * Math.PI);
		engine.world.gravity = {
			x : tx,
			y : ty
		};

		$('.header').text('x:' + tx + '  y:' + ty);
	});
});