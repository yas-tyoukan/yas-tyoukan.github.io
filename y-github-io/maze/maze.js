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

		// startとgoalの場所を覚えておく
		for (var i = 0; i < rowNum; i++) {
			var row = mazeData[i];
			if (!row) {
				continue;
			}
			if (!this._start && row.indexOf('s') !== -1) {
				this._start = [i, row.indexOf('s')];
			}
			if (!this._goal && row.indexOf('g') !== -1) {
				this._goal = [i, row.indexOf('g')];
			}
			if (this._start && this._goal) {
				break;
			}
		}
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
		getStart: function() {
			return this._start;
		},

		getGoal: function() {
			return this._goal;
		},

		getSquare: function(pos) {
			return this._data[pos[0]][pos[1]];
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
				's    #',
				'   #  ',
				'   g  '
			];
			// @formatter:on
			this._maze = new app.maze.Maze(mazeData, mazeData.length, mazeData[0].length);
		},
		getMaze: function() {
			return this._maze;
		},
		setMaze: function(maze) {
			this._maze = maze;
		},
		calcShortestRoot: function(orgMaze) {
			var maze = this._wrapMaze(orgMaze);
			// ゴールの位置から番号を振っていく
			var pointer = [];
			var start = maze.getStart();
			var goal = maze.getGoal();
			var size = maze.getSize();
			var rowNum = size.row;
			var colNum = size.col;
			var distMap = [];
			var currentIndex = 0;
			for (var i = 0; i < rowNum; i++) {
				distMap[i] = [];
				if (i === goal[0]) {
					distMap[i][goal[1]] = currentIndex;
				}
			}
			var currentPositions = [goal.slice(0)];
			var root;
			while (!root && currentPositions.length) {
				var nextPositions = [];
				currentIndex++;
				for (var i = 0, l = currentPositions.length; i < l; i++) {
					var arround = this._getArround(currentPositions[i]);
					for (var p in arround) {
						if (arround[p][0] === start[0] && arround[p][1] === start[1]) {
							root = [[start[0], start[1]]];
							break;
						}
						if (maze.getSquare(arround[p]) === ' ' && distMap[arround[p][0]][arround[p][1]] == null) {
							distMap[arround[p][0]][arround[p][1]] = currentIndex;
							nextPositions.push(arround[p]);
						}
					}
				}
				currentPositions = nextPositions;
			}
			if (!root) {
				// sからgまでのルートがない(迷路としておかしい)
				return;
			}
			while (currentIndex--) {
				var arround = this._getArround(root[root.length - 1]);
				for (var p in arround) {
					if (distMap[arround[p][0]][arround[p][1]] === currentIndex) {
						root.push(arround[p]);
						break;
					}
				}
			}
			// ラップ前の座標にする
			for (var i = 0, l = root.length; i < l; i++) {
				root[i][0]--;
				root[i][1]--;
			}
			return root;
		},

		calcAllThrouRoot: function(orgMaze) {
			return this.calcLongestRoot(orgMaze, true);
		},

		calcLongestRoot: function(orgMaze, allThrouh) {
			var maze = this._wrapMaze(orgMaze);
			// ゴールの位置から番号を振っていく
			var pointer = [];
			var start = maze.getStart();
			var goal = maze.getGoal();
			var size = maze.getSize();
			var rowNum = size.row;
			var colNum = size.col;
			var currentIndex = 0;
			var roots = [{
				root: [start],
				map: maze.getMazeData().slice(0)
			}];
			var accessibles = [];
			// スタートから探索
			var loopCount = 0;
			function setFootprint(map, pos) {
				var str = map[pos[0]];
				var index = pos[1];
				map[pos[0]] = str.slice(0, index) + '$' + str.slice(index + 1);
				return map;
			}

			while (roots.length && loopCount++ < 100000) {
				var currentRoots = [];
				for (var i = 0, l = roots.length; i < l; i++) {
					var last = roots[i].root[roots[i].root.length - 1];
					var arround = this._getArround(last);
					for (var p in arround) {
						var root = roots[i].root;
						var map = roots[i].map;
						if (arround[p][0] === goal[0] && arround[p][1] === goal[1]) {
							root = root.slice(0);
							root.push(goal);
							accessibles.push(root);
							continue;
						}
						if (map[arround[p][0]][arround[p][1]] !== ' ') {
							continue;
						}
						map = setFootprint(map.slice(0), arround[p]);
						// 他の候補が行き止まりになるかどうか
						// (全マス通るルート探索の場合のみ。枝刈りをする。)
						if (allThrouh) {
							var isOtherDead = false;
							for (var otherP in arround) {
								var nextP = map[arround[otherP][0]][arround[otherP][1]];
								if (p === otherP || nextP !== ' ' || nextP !== 'g') {
									continue;
								}
								var count = 0;
								var arroundArround = this._getArround(arround[otherP]);
								var count = 0;
								for (var arroundP in arroundArround) {
									var a = arroundArround[arroundP];
									if (map[a[0]][a[1]] === ' ') {
										count++;
									}
								}
								if (count < 2) {
									// 行き止まりができてる
									isOtherDead = true;
									break;
								}
							}
							if (isOtherDead) {
								continue;
							}
						}
						root = root.slice(0);
						root.push([arround[p][0], arround[p][1]]);
						currentRoots.push({
							root: root,
							map: map
						});
					}
				}
				roots = currentRoots;
			}
			if (!accessibles.length) {
				// sからgまでのルートがない(迷路としておかしい)
				return;
			}
			// 最後に見つけたルートが最長ルート
			var root = accessibles[accessibles.length - 1];

			// ラップ前の座標にする
			for (var i = 0, l = root.length; i < l; i++) {
				root[i][0]--;
				root[i][1]--;
			}
			return root;
		},

		/**
		 * 番兵でラップする
		 * @param {Object} maze
		 */
		_wrapMaze: function(maze) {
			var mazeData = [];
			var rows = maze.getMazeData();
			var size = maze.getSize();
			var rowNum = size.row + 2;
			var colNum = size.col + 2;
			for (var i = 0; i < rowNum; i++) {
				var row = '#' + (rows[i - 1] || '');
				while (row.length !== colNum) {
					row += '#';
				}
				mazeData[i] = row;
			}
			return new app.maze.Maze(mazeData, rowNum, colNum);
		},

		_getArround: function(pos) {
			return {
				up: [pos[0] - 1, pos[1]],
				down: [pos[0] + 1, pos[1]],
				left: [pos[0], pos[1] - 1],
				right: [pos[0], pos[1] + 1]
			};
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
			// テキストエリアの文字列から行頭の改行と末尾の改行は取り除く
			var str = this._$textArea.val().replace(/^\n*|\n*$/g, '');
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
		__name: 'app.maze.RootViewerController',
		mazeViewerController: app.maze.ViewController,

		_currentTimer: null,
		__meta: {
			mazeViewerController: {
				rootElement: '.mazeView'
			}
		},
		__ready: function() {
			this._canvas = this.$find('.rootView')[0];
		},
		setMaze: function(maze) {
			this._maze = maze;
			this.mazeViewerController.setMaze(maze);
		},
		drawRoot: function(root, animate) {
			var animate = animate === false ? animate : true;
			var maze = this._maze;
			var $square = this.mazeViewerController.$find('.square:first');
			var width = $square.outerWidth();
			var height = $square.outerHeight();
			var canvas = this._canvas;
			var ctx = canvas.getContext('2d');
			var size = maze.getSize();
			canvas.height = height * size.row;
			canvas.width = width * size.col;
			if (this._currentTimer) {
				clearInterval(this._currentTimer);
				this._currentTImer = null;
			}
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			if (!animate) {
				ctx.beginPath();
			}
			ctx.strokeStyle = 'rgba(255, 0, 0, 0.6)';
			ctx.lineWidth = 3;
			ctx.lineCap = 'round';
			var xys = [];
			var rootLength = root.length;
			for (var i = 0; i < rootLength; i++) {
				var p = root[i];
				var y = p[0] * width + width / 2;
				var x = p[1] * height + height / 2;

				if (animate) {
					xys.push([x, y]);
				} else {
					if (i === 0) {
						ctx.moveTo(x, y);
						continue;
					}
					ctx.lineTo(x, y);
				}
			}
			if (animate) {
				function step(index) {
					if (index === 0) {
						return;
					}
					ctx.beginPath();
					ctx.moveTo(xys[index-1][0], xys[index-1][1]);
					ctx.lineTo(xys[index][0], xys[index][1]);
					ctx.stroke();
				}

				var index = 0;
				var timer = setInterval(function() {
					step(index);
					if (index++ === (rootLength - 1)) {
						clearInterval(timer);
					}
				}, 100);
				this._currentTimer = timer;
			} else {
				ctx.stroke();
			}
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
		rootViewerController: app.maze.RootViewerController,
		__meta: {
			cuiEditorController: {
				rootElement: '.CUIEditor'
			},
			guiEditorController: {
				rootElement: '.GUIEditor'
			},
			rootViewerController: {
				rootElement: '.rootViewer'
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
			this._showResult(maze, root);
		},

		'.closeRootViewer click': function() {
			$(this.rootViewerController.rootElement).addClass('hidden');
			this.$find('.mazeEdit').removeClass('hidden');
		},

		_showResult: function(maze, root) {
			// TODO 結果表示
			this.rootViewerController.setMaze(maze);
			$(this.rootViewerController.rootElement).removeClass('hidden');
			this.$find('.mazeEdit').addClass('hidden');
			if (root) {
				this.rootViewerController.drawRoot(root);
			} else {
				alert('スタートからゴールまで到達できる道が見つかりませんでした');
			}
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
