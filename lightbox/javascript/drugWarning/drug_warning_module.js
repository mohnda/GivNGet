YUI.add('drug_warning_module', function (Y) {
	DrugWarning.ATTRS = {
		warning : { value : null},
		sectionNode : { value : null }
	};

	function DrugWarning() {
		DrugWarning.superclass.constructor.apply(this, arguments);
		Y.log("drug warning initalised");

		this.initialiseDisplay();
	}

	Y.DrugWarning = Y.extend(DrugWarning, Y.Base, {
		initialiseDisplay : function () {
			var view = new Y.View();
			var drugWarningNode = Y.Node.create(Y.Lang.sub(Y.DrugWarningView.getView(), {	warning : this.get('warning') }));
			this.get('sectionNode').append(drugWarningNode);
		}
	});
}, '1.0', {requires: ['base-base', 'drug_warning_view']});