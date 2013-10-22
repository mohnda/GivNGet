YUI.add('drug_readonly_plugin', function (Y) {
	Y.Plugin.ReadOnlyDrug = Y.Base.create('ReadOnlyDrug', Y.Plugin.Base, [], {
		initializer: function () {
			Y.log('drug_readonly_plugin initalised' + (this.get('readonly') ? ' (READ ONLY)' : ' (SEARCH ENABLED)'));
		},

		destructor: function () {
			this.get('sectionNode').set('innerHTML', '');
		},

		// TODO: this is too complex. Use css classes to show/hide here as it is pragmatic to do so (one html view)(we arent actually choosing nodes from classes or getting data so ok to do so.
		setDisplay : function() {
			Y.log('read only drug plugin display called');
			var brandRestricted = (this.get('medication.brandRestricted') ? '<img class="drug_results" src="lightbox/images/brand-restricted.png">': '');
			var baseDisplay;

			if(this.get('readonly')) {
				var controlled = (this.get('medication.controlledDrug') ? '<img class="drug_results" src="lightbox/images/controlledDrug.png">' : '');
				var baseDisplay = Y.Lang.sub('<span>Drug</span><br />' +
					'<div class"results-container">' +
						'<span id="result_description" class="drug_results">{description} </span>' +
						'{controlled}<span> </span>' +
						'{restricted}' +
					'</div>', { 
						description : this.get('medication.fullDrugName'),
						restricted : brandRestricted,
						controlled : controlled
				});				
			} else {
				var coding = (this.get('medication.codingType') != '' ? '<img class="drug_results" src="lightbox/images/bullet_ball_glass_green.png">' : '<img class="drug_results" src="images/bullet_ball_glass_red.png"><span class="freeTextWarning">Free text drug chosen</span>');
				var controlled = (this.get('medication.controlled') ? '<img  class="drug_results" src="lightbox/images/controlledDrug.png">' : '');

				var baseDisplay = Y.Lang.sub('<span>Drug</span><span class="requiredField"> *</span><br />' +
					'<div class"results-container">' +
						'<span id="result_description" class="drug_results">{description} </span>' +
						'{controlled}<span> </span>' +
						'{restricted}<span> </span>' +
						'{coding}<span> </span>' +
						'<span id="drug_search_again" class="drug_results fakeLink" id="drug_search_again">Search Again</span>' +
					'</div>', { 
						description : this.get('medication.description'),
						coding : coding,
						restricted : brandRestricted,
						controlled : controlled
				});
			}

			var displayNode = Y.Node.create(baseDisplay);
			this.get('sectionNode').append(displayNode);

			if(! this.get('readonly')) {
				Y.one('#drug_search_again').on('click', function(e) {
					Y.fire('drug:search_again_event', {a : 'something_here'});
				});
			}
		}
	},

	{
		NS: 'Drug',

		ATTRS: {
			medication: { value : null },
			readonly : { value : false},
			sectionNode : { value : null}
		}
	});
}, '1.0', { requires: ['base-build', 'plugin'] });