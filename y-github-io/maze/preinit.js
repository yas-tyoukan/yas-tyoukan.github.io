$(document).bind('h5preinit', function() {
	var aspect = {
		target: 'app.maze.MazeLogic',
		interceptors: h5.core.interceptor.lapInterceptor,
		pointCut: 'calc*'
	};
	h5.settings.aspects = aspect;
}); 