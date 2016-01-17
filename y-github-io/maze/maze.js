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
		getMazeData : function() {
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
		back : function() {
		},
		getNextRoot : function() {

		}
	};

	h5.u.obj.expose('app.maze', {
		Maze : Maze
	});
})();
(function() {
	var controller = {
		__name : 'app.maze.MazeLogic',
		_maze : null,
		_currentEditor : null,
		__construct : function() {
			// TODO デフォルト迷路の作成
			var mazeData = ['######', '#s   #', '#  # #', '#  g #', '######'];
			this._maze = new app.maze.Maze(mazeData, 3, 4);
		},
		getMaze : function() {
			return this._maze;
		},
		setMaze : function(maze) {
			this._maze = maze;
		},
		getShortestRoot : function() {

		},
		getShortestRoot : function() {

		}
	};
	h5.core.expose(controller);
})();

(function() {
	var dataToView = {
		' ' : '□',
		'#' : '■',
		's' : 's',
		'g' : 'g'
	};
	var controller = {
		__name : 'app.maze.ViewController',
		setMaze : function(maze) {
			var mazeData = maze.getMazeData();
			var $rootElement = $(this.rootElement);
			$rootElement.empty();
			for (var i = 0, l = mazeData.length; i < l; i++) {
				var row = mazeData[i];
				for (var j = 0, len = row.length; j < len; j++) {
					var d = row[j];
					$rootElement.append('<span class="square">' + dataToView[d] + '</span>');
				}
				$rootElement.append('<br>');
			}
		}
	};
	h5.core.expose(controller);
})();

(function() {
	var controller = {
		__name : 'app.maze.CUIEditorController',
		_maze : null,
		__init : function() {
			this._$textArea = this.$find('textarea');
		},
		createMaze : function() {
			var str = this._$textArea.val();
			var mazeData = [];
			var rows = str.split('\n');
			var rowNum = rows.length;
			var colNum = 0;
			for (var i = 0; i < rowNum; i++) {
				var r = rows[i];
				var l = r.length;
				mazeData.push(r);
				colNum = colNum < l ? l : colNum;
			}
			return new app.maze.Maze(mazeData, rowNum, colNum);
		},
		setMaze : function(maze) {
			this._maze = maze;
			var mazeData = this._maze.getMazeData();
			var str = '';
			for (var i = 0, l = mazeData.length; i < l; i++) {
				str += mazeData[i] + '\n';
			}
			this._$textArea.val(str);
		}
	};
	h5.core.expose(controller);
})();
(function() {
	var controller = {
		__name : 'app.maze.GUIEditorController',
		mazeViewController : app.maze.ViewController,
		__meta : {
			mazeViewController : {
				rootElement : null
			}
		},
		_maze : null,
		__init : function() {
			this.$mazeView = this.$find('.mazeView');
			this.__meta.mazeViewController.rootElement = this.$mazeView;
		},
		createMaze : function() {
			var mazeData = [];
			this.$mazeView.children().each(function() {

			});
			return new app.maze.Maze(mazeData);
		},
		setMaze : function(maze) {
			this._maze = maze;
			this.mazeViewController.setMaze(maze);
		}
	};
	h5.core.expose(controller);
})();

(function() {
	var controller = {
		__name : 'app.maze.PageController',
		mazeLogic : app.maze.MazeLogic,
		cuiEditorController : app.maze.CUIEditorController,
		guiEditorController : app.maze.GUIEditorController,
		__meta : {
			cuiEditorController : {
				rootElement : '.CUIEditor'
			},
			guiEditorController : {
				rootElement : '.GUIEditor'
			}
		},
		__ready : function() {
			var cuiEditor = this.cuiEditorController;
			var guiEditor = this.guiEditorController;
			var maze = this.mazeLogic.getMaze();
			cuiEditor.setMaze(maze);
			guiEditor.setMaze(maze);
			this._currentEditor = $(cuiEditor.rootElement).hasClass('hidden') ? guiEditor : cuiEditor;
		},
		'.changeEditor click' : function(ctx, $el) {
			var maze = this._currentEditor.createMaze();
			var targetEditor = this._currentEditor === this.cuiEditorController ? this.guiEditorController : this.cuiEditorController;
			targetEditor.setMaze(maze);
			$(targetEditor.rootElement).removeClass('hidden');
			$(this._currentEditor.rootElement).addClass('hidden');
			this._currentEditor = targetEditor;

		}
	};
	h5.core.expose(controller);
})();
