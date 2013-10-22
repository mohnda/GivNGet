YUI.add('drug_manager', function (Y) {
	var drugInstance;

	function DrugManager() {
		DrugManager.superclass.constructor.apply(this, arguments);
		this.initaliseStrategy = initaliseStrategy;
	}

	DrugManager.NAME = 'drugmanager';

	DrugManager.ATTRS = {
		medication : { value: null },
		type : { value : ''},
		sectionNode : { value : null }
	};


	Y.on('drug:replacer_closed_event', function (e) {
		Y.log('med replacer closed event - baseline medication selected by default');

		drugInstance.unplug('Drug');

		Y.use('drug_readonly_plugin', function (Y) {
			drugInstance.plug(Y.Plugin.ReadOnlyDrug, { medication : drugInstance.get('medication.primary'), sectionNode : drugInstance.get('sectionNode') });
		});
		drugInstance.Drug.setDisplay();
	})

	Y.on('drug:medication_change_event', function (e) {
		Y.log('med change event - medication selected: ' + e.result.raw.description);
		selectedMedication = e.result.raw;

		drugInstance.unplug('Drug');

		Y.use('drug_readonly_plugin', function (Y) {
			drugInstance.plug(Y.Plugin.ReadOnlyDrug, { medication : selectedMedication, sectionNode : drugInstance.get('sectionNode') });
		});
		drugInstance.Drug.setDisplay();
		Y.fire('drug:new_drug_search', e);
	})	

	Y.on('drug:search_again_event', function (e) {
		drugInstance.unplug('Drug');

		Y.use('drug_searcher_plugin', function (Y) {
			drugInstance.plug(Y.Plugin.SearcherDrug, { medication : drugInstance.get('medication.primary'), sectionNode : drugInstance.get('sectionNode') });
		});

		if(drugInstance.get('type') == null || drugInstance.get('type.operation') !== 'change') {
			Y.fire('drug:new_drug_search', e);
		} 

		drugInstance.Drug.setDisplay();
	})

	var initaliseStrategy = function(obj) {
		drugInstance = obj;

		if(drugInstance.get('medication') != null) {
			if(drugInstance.get('type') != null && drugInstance.get('type.operation') === 'change') {
				Y.use('drug_readonly_plugin', function (Y) {
					drugInstance.plug(Y.Plugin.ReadOnlyDrug, { medication : drugInstance.get('medication.primary'), sectionNode : drugInstance.get('sectionNode') });
				});
			} else {
				Y.use('drug_readonly_plugin', function (Y) {
					drugInstance.plug(Y.Plugin.ReadOnlyDrug, { medication : drugInstance.get('medication.primary'), readonly : true, sectionNode : drugInstance.get('sectionNode') });
				});
			}			
		} else {
			Y.use('drug_searcher_plugin', function (Y) {
				drugInstance.plug(Y.Plugin.SearcherDrug, { sectionNode : drugInstance.get('sectionNode') });
			});
		}

		drugInstance.Drug.setDisplay();
	};

	Y.DrugManager = Y.extend(DrugManager, Y.Base, {
		initializer : function() {
			Y.log('drug manager initalised');
		}
	});
}, '1.0', {requires: ['base-base', 'base', 'attribute', 'node', 'event-custom', 'drug_readonly_plugin', 'drug_searcher_plugin']});