YUI.add('workflow_warning_view', function (Y) {
	Y.namespace('WorkflowWarningView');

	Y.WorkflowWarningView.getView = function () {
		return '<span class="alert">{warning}</span>';
	};
}, '1.0', {});