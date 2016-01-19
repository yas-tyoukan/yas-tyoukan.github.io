(function() {
	// 定数定義

	/**
	 * 迷路クラス
	 *
	 * @class
	 */
	function Maze(mazeData, rowNum, colNum) {
		this._rowNum = rowNum;
		this._colNum = colNum;
		this._data = mazeData;
	}


	Maze.prototype = {
		getMazeData: function() {
			return this._data;
		},
		getSize: function() {
			return {
				row: this._rowNum,
				col: this._colNum
			};
		},
		validate: function() {
			var validateResult = {};
			var str = this._data.join('');
			var sMatched = str.match(/s/g);
			if (!sMatched || sMatched.length !== 1) {
				return {
					message: 'スタートは１つ配置する必要があります'
				};
			}
			var gMatched = str.match(/g/g);
			if (!gMatched || gMatched.length !== 1) {
				return {
					message: 'ゴールは１つ配置する必要があります'
				};
			}
			if (!/^[ #sg]*$/.test(str)) {
				return {
					message: '不正なマスがあります'
				};
			}
			return true;
		}
	};

	/**
	 * ルートクラス
	 *
	 * @class
	 */
	function Root(maze) {
		this._root = [];
		this._maze = maze;
	}


	Root.prototype = {
		back: function() {
		},
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
			// @formatter:off
			var mazeData = [
				'######',
				'#s   #',
				'#  # #',
				'#  g #',
				'######'
			];
			// @formatter:on
			this._maze = new app.maze.Maze(mazeData, 3, 4);
		},
		getMaze: function() {
			return this._maze;
		},
		setMaze: function(maze) {
			this._maze = maze;
		},
		calcShortestRoot: function(orgMaze) {
			var maze = this._wrapMaze(orgMaze);
			// TODO
		},
		calcLongestRoot: function(orgMaze) {
			var maze = this._wrapMaze(orgMaze);
			// TODO
		},

		_wrapMaze: function(maze) {
			// TODO 番兵でラップする
		}
	};
	h5.core.expose(controller);
})();

(function() {
	var dataToView = {
		' ': '□',
		'#': '■',
		's': 's',
		'g': 'g'
	};
	var controller = {
		__name: 'app.maze.ViewController',
		setMaze: function(maze) {
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
		__name: 'app.maze.CUIEditorController',
		_maze: null,
		__init: function() {
			this._$textArea = this.$find('textarea');
		},
		createMaze: function() {
			var str = this._$textArea.val();
			var mazeData = [];
			var rows = str.split('\n');
			var rowNum = rows.length;
			var colNum = 0;
			for (var i = 0; i < rowNum; i++) {
				var r = rows[i].replace(/[^ #sg]/g, ' ');
				var l = r.length;
				mazeData.push(r);
				colNum = colNum < l ? l : colNum;
			}
			return new app.maze.Maze(mazeData, rowNum, colNum);
		},
		setMaze: function(maze) {
			this._maze = maze;
			var mazeData = this._maze.getMazeData();
			var str = '';
			for (var i = 0, l = mazeData.length; i < l; i++) {
				str += mazeData[i] + '\n';
			}
			this._$textArea.val(str);
		},
		getMaze: function() {
			return this._maze;
		}
	};
	h5.core.expose(controller);
})();

(function() {
	var viewToData = {
		'□': ' ',
		'■': '#',
		's': 's',
		'g': 'g'
	};

	var controller = {
		__name: 'app.maze.GUIEditorController',
		mazeViewController: app.maze.ViewController,
		__meta: {
			mazeViewController: {
				rootElement: null
			}
		},
		_maze: null,
		_size: null,
		__init: function() {
			this.$mazeView = this.$find('.mazeView');
			this.__meta.mazeViewController.rootElement = this.$mazeView;
		},
		createMaze: function() {
			var mazeData = [''];
			var rowIndex = 0;
			this.$mazeView.children().each(function() {
				if ($(this).is('br')) {
					mazeData[++rowIndex] = '';
					return;
				}
				mazeData[rowIndex] = mazeData[rowIndex] + viewToData[$.trim($(this).text())];
			});
			var size = this._size;
			this._maze = new app.maze.Maze(mazeData, size.row, size.col);
			return this._maze;
		},
		setMaze: function(maze) {
			this._maze = maze;
			this._size = maze.getSize();
			this.mazeViewController.setMaze(maze);
		},
		getMaze: function() {
			return this._maze;
		},

		'.square click': function(ctx, $el) {
			if (ctx.event.metaKey) {
				// metaKey: windowsの場合はctrlキー, macの場合はcommandキー
				this._switchSquareSG($el);
				return;
			}
			this._switchSquare($el);
		},

		'.square contextmenu': function(ctx, $el) {
			ctx.event.preventDefault();
			this._switchSquareSG($el);
		},

		'{rootElement} contextmenu': function(ctx, $el) {
			ctx.event.preventDefault();
		},

		'.changeSize click': function(ctx, $el) {
			var currentSize = this._maze.getSize();
			var rowNum = parseInt(this.$find('[name=rowNum]').val());
			var colNum = parseInt(this.$find('[name=colNum]').val());
			if (isNaN(rowNum) || isNaN(colNum) || rowNum < 1 || colNum < 1) {
				alert('サイズの指定が不正です。縦横ともに1以上の数値で指定してください');
				return;
			}
			if (rowNum < currentSize.row || colNum < currentSize.col) {
				if (!confirm('はみ出る部分は削りますがいいですか？')) {
					return;
				}
			}
			this._setSize(rowNum, colNum);
		},

		_switchSquareSG: function($el) {
			if ($el.text() === 's') {
				$el.text('g');
			} else {
				$el.text('s');
			}
		},

		_switchSquare: function($el) {
			if ($el.text() === '□') {
				$el.text('■');
			} else {
				$el.text('□');
			}
		},

		_setSize: function(rowNum, colNum) {
			var mazeData = this._maze.getMazeData();
			mazeData = mazeData.slice(0, rowNum);
			for (var r = 0; r < rowNum; r++) {
				if (!mazeData[r]) {
					mazeData[r] = '';
				}
				var row = mazeData[r];
				row = row.slice(0, colNum);
				for (var c = row.length; c < colNum; c++) {
					row += ' ';
				}
				mazeData[r] = row;
			}
			this._size = {
				row: rowNum,
				col: colNum
			};
			this.setMaze(new app.maze.Maze(mazeData, rowNum, colNum));
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
			cuiEditor.setMaze(maze);
			guiEditor.setMaze(maze);
			this._currentEditor = $(cuiEditor.rootElement).hasClass('hidden') ? guiEditor : cuiEditor;
		},
		'.changeEditor click': function(ctx, $el) {
			var maze = this._currentEditor.createMaze();
			var targetEditor = this._currentEditor === this.cuiEditorController ? this.guiEditorController : this.cuiEditorController;
			targetEditor.setMaze(maze);
			$(targetEditor.rootElement).removeClass('hidden');
			$(this._currentEditor.rootElement).addClass('hidden');
			this._currentEditor = targetEditor;
		},
		'.calcRoot click': function(ctx, $el) {
			var maze = this._currentEditor.createMaze();
			if (!this._validateMaze(maze)) {
				return;
			}
			var method = $el.data('method');
			if (!this.mazeLogic[method]) {
				return alert('指定されたメソッドはありません');
			}
			var root = this.mazeLogic[method](maze);
			// TODO 結果表示
		},
		_validateMaze: function(maze) {
			var validateResult = maze.validate();
			if (validateResult.message) {
				alert(validateResult.message);
				return false;
			}
			return true;
		}
	};
	h5.core.expose(controller);
})();
