(function() {
	// 定数定義


	/**
	 * 迷路クラス
	 *
	 * @class
	 */
	function Maze(mazeData, rowNum, colNum) {
		this._data = mazeData;
	}
	Maze.prototype = {
		getMazeData: function() {
			return this._data;
		}
	};

	/**
	 * ルートクラス
	 *
	 * @class
	 */
	function Root(maze) {
		this._root = [];
		this._maze = maze
	}
	Root.prototype = {
		back: function() {},
		getNextRoot: function() {

		}
	};


	h5.u.obj.expose('app.maze', {
		Maze: Maze
	});
})();
(function() {
	var controller = {
		__name: 'app.maze.MazeLogic',
		_maze: null,
		_currentEditor: null,
		__construct: function() {
			// TODO デフォルト迷路の作成
			var mazeData = [['s', ' ', ' ', ' '], [' ', ' ', '#', ' '], [' ', ' ', 'g', ' ']];
			this._maze = new app.maze.Maze(mazeData, 3, 4);
		},
		getMaze: function() {
			return this._maze;
		},
		setMaze: function(maze) {
			this._maze = maze;
		},
		getShortestRoot: function() {

		},
		getShortestRoot: function() {

		}
	};
	h5.core.expose(controller);
})();

(function() {
	var controller = {
		__name: 'app.maze.CUIEditorController',
		_maze: null,
		__init: function() {
			this._$textArea = $('<textarea>');
			$(this.rootElement).append(this._$textArea);
		},
		__ready: function() {
			if (!this._maze) {
				return;
			}
			var mazeData = this._maze.getMazeData();
			var str = '';
			for (var i = 0, l = mazeData.length; i < l; i++) {
				str += mazeData[i].join('') + '\n';
			}
			this._$textArea.val(str);
		},
		createMaze: function() {

		},
		setMaze: function(maze) {
			this._maze = maze;
		},
		hide: function() {
			$(this.rootElement).addClass('hidden');
		},
		show: function() {
			$(this.rootElement).removeClass('hidden');
		}
	};
	h5.core.expose(controller);
})();
(function() {
	var controller = {
		__name: 'app.maze.GUIEditorController',
		_maze: null,
		__init: function() {
		},
		__ready: function() {
			if (!this._maze) {
				return;
			}
			var mazeData = this._maze.getMazeData();
		},
		createMaze: function() {

		},
		setMaze: function(maze) {
			this._maze = maze;
		},
		hide: function() {
			$(this.rootElement).addClass('hidden');
		},
		show: function() {
			$(this.rootElement).removeClass('hidden');
		}
	};
	h5.core.expose(controller);
})();

(function() {
	var controller = {
		__name: 'app.maze.PageController',
		mazeLogic: app.maze.MazeLogic,
		cuiEditorController: app.maze.CUIEditorController,
		guiEditorController: app.maze.GUIEditorController,
		__meta: {
			cuiEditorController: {
				rootElement: '.CUIEditor'
			},
			guiEditorController: {
				rootElement: '.GUIEditor'
			}
		},
		__ready: function() {
			var cuiEditor = this.cuiEditorController;
			var guiEditor = this.guiEditorController;
			var maze = this.mazeLogic.getMaze();
			guiEditor.hide();
			cuiEditor.show();
			cuiEditor.setMaze(maze);
			this._currentEditor = cuiEditor;
		},
		'.changeEditor click': function(ctx, $el) {
			var maze = this._currentEditor.createMaze();
			var targetEditor = this._currentEditor === this.cuiEditorController ? this.guiEditorController
					: this.cuiEditorController;
			targetEditor.setMaze(maze);
			this._currentEditor.hide();
			targetEditor.show();
			this._currentEditor = targetEditor;

		}
	};
	h5.core.expose(controller);
})();
