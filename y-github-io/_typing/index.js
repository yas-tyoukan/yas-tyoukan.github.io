(function() {
	var defaultRule = {
		'し': 'si'
	/* ... */
	};
	function KanaRule(rule) {
	/* ... */
	}
	KanaRule.prototype = {
		changeRule: function(kana, romaji) {
			/* ... */
			this.dispatchEvent('changeRule');
		}
	};
	h5.mixin.eventDispatcher.mix(KanaRule.prototype);

	var logic = {
		__name: 'app.typing.controller.KanaParserLogic'
	};

	var controller = {
		__name: 'app.typing.controller.PageController',
		parserLogic: logic,
		__ready: function() {
			this.currentRule = new KanaRule(defaultRule);
			this.currentRule.addEventListener('changeRule', this._changeRule);
		},
		_changeRule: function() {
		/* 表示中のローマ字列の変換等 */
		}
	};
	h5.core.expose(controller);
})();