YUI.add('drug_warning_view', function (Y) {
	Y.namespace('DrugWarningView');

	Y.DrugWarningView.getView = function () {
		return '<span class="alert">{warning}</span>';
	};
}, '1.0', {});