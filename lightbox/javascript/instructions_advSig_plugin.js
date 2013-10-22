YUI.add('instructions_advSig_plugin', function (Y) {
	Y.Plugin.AdvSig = Y.Base.create('instructionsAdvSigPlugin', Y.Plugin.Base, [], {
		initializer: function () {
			Y.log('instructions_advSig_plugin initalised');
		},

		destructor: function () {
			this.instructions.remove(true);
		},

		setDisplay : function() {
			var switchHtml = '';
			if(this.get('showSwitch')) {
				switchHtml = '<div class="switchLink"><span>Change to Free Text</span></div>'
			}


			var sigNode = Y.Node.create(
				'<div class=instructionsGroup section>' +
					'<div>' +
						'<div class="instructionsLabel"><span>Instructions</span></div>' +
						'<div class="switchLink"><span>Change to Free Text</span></div>' +
					'</div>' +
					'<div>' +
					'<span><b>Input drug instructions</b></span><br />' +
					'</div>' +
					'<table id="atomised_drug">' +
						'<thead>' +
							'<tr>' +
								'<th id="atomised_dose">Dose<span class="requiredField">*</span></th>' +
								'<th id="atomised_form">Form/Unit<span class="requiredField">*</span></th>' +
								'<th id="atomised_frequency">Frequency<span class="requiredField">*</span></th>' +
								'<th id="atomised_route">Route<span class="requiredField">*</span></th>' +
							'</tr>' +
						'</thead>' +
						'<tbody>' +	
							'<tr>' +
								'<td><input id="dose" type="text" style="width : 70px;"/></td>' +
								'<td>' +
									'<select style="width : 83px;">' +
										'<option value="none"></option>' +
										'<option value="Ampoule">Ampoule</option>' +
										'<option value="Tablet">Tablet</option>' +
										'<option value="Cream">Cream</option>' +
										'<option value="mg">mg</option>' +
									'</select>' +
								'</td>' +									
								'<td><input id="frequency" type="text" style="width : 230px;"/><input id="prn" type="checkbox" name="" value="">PRN</td>' +
								'<td><input id="route" type="text" style="width : 80px;"/></td>' +
							'</tr>' +
						'</tbody>' +
				'</table>' +
					'<div class="instructionsLabel"><span>Additional Instructions</span></div>' +
					'<div><textarea id="additional_instructions" rows="2" class="textarea"></textarea></div>' +
				'</div>'
			);

			this.get('sectionNode').append(sigNode);

			this.dose = Y.one('#dose');
			// this.form_unit = Y.one('#');
			this.frequency = Y.one('#frequency');
			this.prn = Y.one('#prn');
			this.route = Y.one('#route');
			this.additional_instructions = Y.one('#additional_instructions');
		},
		clearAll : function() {
			this.dose.set('value', '');
			// this.form_unit
			this.frequency.set('value', '');
			this.route.set('value', '');
			this.additional_instructions.set('value', '');
		},

		loadData : function(med) {
			//this.instructions.set('value', med.sig);
		},
		verify : function() {
			var error_message = '';

			if(this.dose.get('value').length === 0) {
				this.dose.addClass('fieldError');
				error_message += 'No Instructions Dose has been entered for this medication\n\n';
			}
			// if(this.form_unit.get('value').length === 0) {
			// 	this.form_unit.addClass('fieldError');
			// 	error_message += 'No Instructions Form Unit has been entered for this medication\n\n';
			// }
			if(this.frequency.get('value').length === 0) {
				this.frequency.addClass('fieldError');
				error_message += 'No Instructions Frequency has been entered for this medication\n\n';
			}
			if(this.route.get('value').length === 0) {
				this.route.addClass('fieldError');
				error_message += 'No Instructions Route has been entered for this medication\n\n';
			}

			return error_message;
		},

		dose : null,
		form_unit : null,
		frequency : null,
		route : null,
		additional_instructions : null
	}, 
	{
		NS: 'Sig',

		ATTRS: {
			sectionNode : { value : ''},
			isRequired : { value : true }
		}
	});
}, '1.0', { requires: ['base-build', 'plugin'] });
