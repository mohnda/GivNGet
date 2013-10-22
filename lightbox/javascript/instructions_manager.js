YUI.add('instructions_manager', function (Y) {
	var isFreeTextSwitch;
	var instructionsInstance;

	function InstructionsManager() {
		InstructionsManager.superclass.constructor.apply(this, arguments);
		this.initaliseStrategy = initaliseStrategy;
		this.verify = verify;
	}

	InstructionsManager.NAME = 'instructionsmanager';

	InstructionsManager.ATTRS = {
		advSig : { value: false },
		medData : { value: null },
		sectionNode : { value : null }
	};

	Y.on('drug:new_drug_search', function (e) {
		Y.log('Instructions - new drug search event recieved');
		instructionsInstance.Sig.clearAll();	
	})

	var verify = function() {
		return instructionsInstance.Sig.verify();
	};

	var initaliseStrategy = function(obj) {
		instructionsInstance = obj;

		var showSwitch = instructionsInstance.get('advSig') && instructionsInstance.get('med') != null && instructionsInstance.get('med.isCompositePack');

		if(instructionsInstance.get('advSig') && !showSwitch) {
			Y.use('instructions_advSig_plugin', function (Y) {
				instructionsInstance.plug(Y.Plugin.AdvSig, { sectionNode : instructionsInstance.get('sectionNode') });
			});
		} else {
			Y.use('instructions_freeText_plugin', function (Y) {
				instructionsInstance.plug(Y.Plugin.FreeTextSig, { showSwitch: showSwitch, sectionNode : instructionsInstance.get('sectionNode') });
			});
		}

		// set up the html display and events
		instructionsInstance.Sig.setDisplay();

		// load any data
		if(instructionsInstance.get('medData') != null) {
			instructionsInstance.Sig.loadData(instructionsInstance.get('medData.primary'));
		}
	};

	Y.InstructionsManager = Y.extend(InstructionsManager, Y.Base, {
		initializer : function() {
			Y.log('instructions manager initalised');
		}
	});
}, '1.0', {requires: ['base-base', 'base', 'attribute', 'node', 'event-custom']});