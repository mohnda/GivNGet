YUI.add('workflow_warning_module', function (Y) {
	WorkflowWarning.ATTRS = {
		warning : { value : null},
		sectionNode : { value : null }
	};

	function WorkflowWarning() {
		WorkflowWarning.superclass.constructor.apply(this, arguments);
		Y.log("workflow warning initalised");

		this.initialiseDisplay();
	}

	Y.WorkflowWarning = Y.extend(WorkflowWarning, Y.Base, {
		initialiseDisplay : function () {
			//var view = new Y.View();
			var flowWarningNode = Y.Node.create(Y.Lang.sub(Y.WorkflowWarningView.getView(), { warning : this.get('warning') }));
			this.get('sectionNode').append(flowWarningNode);
		}
	});
}, '1.0', {requires: ['base-base', 'workflow_warning_view']});