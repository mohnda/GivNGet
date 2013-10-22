YUI.add('buttons_module', function (Y) {
	Buttons.ATTRS = {
		sectionNode : { value : null }
	};

	function Buttons() {
		Buttons.superclass.constructor.apply(this, arguments);
		Y.log("Buttons initalised");

		this.initialiseDisplay();
	}

	Y.Buttons = Y.extend(Buttons, Y.Base, {
		initialiseDisplay : function () {
			var ok_button = Y.Node.create('<button id="btn_ok">OK</button>');		
			this.get('sectionNode').append(ok_button);

			var cancel_button = Y.Node.create('<button>Cancel</button>');		
			this.get('sectionNode').append(cancel_button);

			ok_button.on('click', function(e) {
				Y.log("Buttons - OK clicked");
				Y.fire('button:ok', e);
			});

			cancel_button.on('click', function(e) {
				Y.log("Buttons - cancel clicked");
				Y.fire('button:cancel', e);
			});
		}
	});
}, '1.0', {requires: ['node', 'base-base']});