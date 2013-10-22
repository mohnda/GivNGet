YUI.add('intended_duration_module', function (Y) {
	function IntendedDuration() {
		IntendedDuration.superclass.constructor.apply(this, arguments);
		this.setDisplay = setDisplay;

		this.setDisplay();
	}

	IntendedDuration.NAME = 'intendedDuration';

	IntendedDuration.ATTRS = {
		sectionNode : { value : null }
	};

	Y.on('drug:new_drug_search', function (e) {
		Y.log('IntendedDuration - new drug search event recieved');
	//	Y.one('#default_selected').set('checked', true);
		Y.one('#fixed_period_dropdown').set('selectedIndex', 0);
		Y.all('.fixed_period').removeClass('show');
	})

	var setDisplay = function() {
		this.get('sectionNode').append(Y.IntendedDurationView.getView());

		// add event
		Y.all('.intended_checked').on('click', function(e) {
			Y.log('intended duration selection change ' + e.target.get('value') + ' selected');
			if(e.target.get('value') === 'fixed_period') {
				Y.all('.fixed_period').addClass('show');
			} else {
				Y.all('.fixed_period').removeClass('show');
			}
		});
	};

	Y.IntendedDuration = Y.extend(IntendedDuration, Y.Base, {
		initializer : function() {
			Y.log('intended duration initalised');
		}
	});
}, '1.0', {requires: ['base-base', 'intended_duration_view']});