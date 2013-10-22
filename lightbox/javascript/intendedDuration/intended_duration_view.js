YUI.add('intended_duration_view', function (Y) {
	Y.namespace('IntendedDurationView');

	Y.IntendedDurationView.getView = function () {
		return '<div>' +
				'<span>Intended Duration</span>' +
				'<input class="intended_checked" id="default_selected" type="radio" name="duration" value="non_specified" checked>Not Specified</input>' +
				'<input class="intended_checked" type="radio" name="duration" value="ongoing">Ongoing</input>' +
				'<input class="intended_checked" type="radio" name="duration" value="fixed_period">Fixed Period</input>' +
				'<input class="fixed_period" id="fixed_period_input" type="text" style="width : 70px; margin-left : 8px""/>' +
				'<select id="fixed_period_dropdown" class="fixed_period" style="width : 83px; margin-left : 8px">' +
					'<option value="none"></option>' +
					'<option value="days">days</option>' +
					'<option value="weeks">weeks</option>' +
					'<option value="months">months</option>' +
					'<option value="doses">doses</option>' +
				'</select>' +
			'</div>';
	};
}, '1.0', {});