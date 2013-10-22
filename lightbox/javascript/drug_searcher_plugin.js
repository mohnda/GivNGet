YUI.add('drug_searcher_plugin', function (Y) {
	Y.Plugin.SearcherDrug = Y.Base.create('SearcherDrug', Y.Plugin.Base, [], {
		initializer: function () {
			Y.log('drug_searcher_plugin initalised');
		},

		destructor: function () {
			this.get('sectionNode').set('innerHTML', '');
		},

		setDisplay : function() {
			var view = new Y.View();
			var isChange = this.get('medication') !== null;
			var med =  this.get('medication');
			var dynamicDrugNode;

			/* Change or Searcher specific functionality */
			if(isChange) {
				dynamicDrugNode = Y.Node.create(view.replacerViewComponent);
				this.get('sectionNode').append(dynamicDrugNode);
				
				Y.one('#drop_button').on('click', function (e) {
					Y.fire('drug:replacer_closed_event', e);
				})
			} else {
				dynamicDrugNode = Y.Node.create(view.searcherViewComponent);
				this.get('sectionNode').append(dynamicDrugNode);
			}

			
			var searcher = Y.one('#ac-input');

			Y.use('autocomplete', 'autocomplete-highlighters', 'event', 'autocomplete-base', function () {
				var dynamicDrugResultTemplate = view.drugShowTemplateViewComponent;

				function drugFormatter(query, results) {
					return Y.Array.map(results, function (result) {
						returnedMedication = result.raw;

						var controlled = returnedMedication.controlled ? 'ControlledDrug' : '';
						var brandRestricted = returnedMedication.brandRestricted ? 'BrandRestrictedDrug' : '';
						var colOneIcon, colOneTitle, colTwoIcon, colTwoTitle;
						colOneIcon = colOneTitle = colTwoIcon = colTwoTitle = '';		
						var paddingSpace = 0;
							
						if(brandRestricted && controlled) {
							colOneIcon = 'ControlledIcon';
							colOneTitle = 'Controlled_Drug';
							colTwoIcon = 'BrandRestrictedIcon';
							colTwoTitle = 'Brand_Restricted_Drug';
							paddingSpace = 40;
						} else if (controlled) {
							colTwoIcon = 'ControlledIcon';
							colTwoTitle = 'Controlled_Drug';
							paddingSpace = 20;
						} else if (brandRestricted) {
							colTwoIcon = 'BrandRestrictedIcon';
							colTwoTitle = 'Brand_Restricted_Drug';
							paddingSpace = 20;
						} 

						return Y.Lang.sub(dynamicDrugResultTemplate, { 
							description : returnedMedication.description,
							subsidy : returnedMedication.subsidy,
							controlled : controlled,
							brandRestricted : brandRestricted,
							colOneIcon : colOneIcon,
							colOneTitle : colOneTitle,
							colTwoIcon : colTwoIcon,
							colTwoTitle : colTwoTitle,
							paddingSpace : paddingSpace
						});
					});
				}

				searcher.plug(Y.Plugin.AutoComplete, {
					resultFormatter: drugFormatter,
					resultHighlighter : 'phraseMatch',
					minQueryLength : 3,
					scrollIntoView : true,
					circular : false,
					resultListLocator : 'items',
					resultTextLocator : 'description',
					maxResults : 100,
					source: 'http://localhost:9999/DrugfileServices/Search?q={query}&callback={callback}',
				});

				searcher.ac.on('select', function (e) {
					Y.fire('drug:medication_change_event', e);
				});

				/* Change only specific functionality */
				if(isChange) {
					searcher.ac.on('results', function (e) {
						searcher.set('value', med.fullDrugName);
						Y.log('replacement medication value set');
					});

					// send off request
					searcher.ac.sendRequest(med.code);
					
					if(med.controlledDrug) {
						Y.one('#replacer_controlled_icon').removeClass('hidden');
					} 

					if(med.brandRestricted) {
						Y.one('#replacer_restricted_icon').removeClass('hidden');
					}
				} 			
			})	
		}
	},

	{
		NS: 'Drug',

		ATTRS: {
			sectionNode : { value : null},
			medication : { value : null}
		}
	});
}, '1.0', { requires: ['base-build', 'plugin', 'view_module'] });