YUI.add('dischargeSupply_manager', function (Y) {
	var thisObject; /* needed to access 'this' in YUI function scope */

	DischargeSupplyManager.ATTRS = {
		advSig : { value: false },
		medData : { value: null },
		supply : { value: null },
		sectionNode : { value : null }
	};

	function DischargeSupplyManager() {
		DischargeSupplyManager.superclass.constructor.apply(this, arguments);
		Y.log('Supply Duration Manager initalised');
		thisObject = this;

		// defaultState (checked) defaults to false unless set
		this.set('defaultState', (this.get('supply.defaultChecked') !== undefined && this.get('supply.defaultChecked') === true));
		this.set('isAdvSigCtrlDrug', (this.get('advSig') === true && this.get('medData') !== undefined && this.get('medData.primary.controlledDrug') === true));

		
		this.initialiseDisplay();
	}

	Y.DischargeSupplyManager = Y.extend(DischargeSupplyManager, Y.Base, {
		initialiseDisplay : function() {
			var supplyNode = Y.Node.create('<input id="supplyPayloadNode" type="checkbox" /><span>Supply on Discharge</span><br />');
			this.get('sectionNode').append(supplyNode);
			this.set('supplyPayloadNode', Y.one('#supplyPayloadNode'));

			// load any data
			if(this.get('medData') != null) {
				this.get('supplyPayloadNode').set('checked', this.get('medData.primary.script'));
			} else {
				this.get('supplyPayloadNode').set('checked', this.get('defaultState'));
			}

			// now plug the mitte module if needed
			if (this.get('supply.type') === 'mitte') {
				if(this.get('isAdvSigCtrlDrug')) {
					Y.use('dischargeSupply_mitte_atomised_plugin', function (Y) {
						thisObject.plug(Y.Plugin.DischargeSupplyMitteAtomised, { sectionNode : thisObject.get('sectionNode') });
					});
				} else {
					Y.use('dischargeSupply_mitte_simple_plugin', function (Y) {
						thisObject.plug(Y.Plugin.DischargeSupplyMitteSimple, { sectionNode : thisObject.get('sectionNode') });
					});
				}

				this.SupplyMitte.setDisplay();
			}

			this.get('supplyPayloadNode').on('click', function(e) {
				Y.log('supply changed event fired: checked = ' + e.target.get('checked'));
				Y.fire('supply:supplyOnDischarge_event', e);
			});


		},
		resetDefault : function() {
			this.get('supplyPayloadNode').set('checked', this.get('defaultState'));
		}
	});

	Y.on('drug:new_drug_search', function (e) {
		Y.log('supply manager - new drug search event recieved');
		thisObject.resetDefault();

		if(thisObject.get('supply.type') === 'mitte') {
			thisObject.SupplyMitte.clearAll();
		}
	})

	// 	Y.on('drug:medication_change_event', function (e) {
	// 	Y.log('Supply manager - drug change event recieved');
	// 	dischargeSupplyInstance.SupplySimple.resetDefault();

	// 	if(dischargeSupplyInstance.get('supply.type') === 'mitte') {
	// 		//TODO this needs to be done better
	// 		if (! dischargeSupplyInstance.get('advSig')) {
	// 			dischargeSupplyInstance.SupplyMitte.clearAll();
	// 		} else {			
	// 			if(dischargeSupplyInstance.SupplyMitte.getType() === 'simple'){
	// 				if(e.result.raw.controlled) {
	// 					dischargeSupplyInstance.unplug('SupplyMitte');

	// 					Y.use('dischargeSupply_mitte_atomised_plugin', function (Y) { // TODO: move to the outer level as is always present
	// 						dischargeSupplyInstance.plug(Y.Plugin.DischargeSupplyMitteAtomised, { sectionNode : dischargeSupplyInstance.get('sectionNode') });
	// 						dischargeSupplyInstance.SupplyMitte.setDisplay();
	// 					});
	// 				} else {
	// 					dischargeSupplyInstance.SupplyMitte.clearAll();
	// 				}
	// 			} else {
	// 				if(e.result.raw.controlled) {
	// 					dischargeSupplyInstance.SupplyMitte.clearAll();
	// 				} else {					
	// 					dischargeSupplyInstance.unplug('SupplyMitte');

	// 					Y.use('dischargeSupply_mitte_simple_plugin', function (Y) { // TODO: move to the outer level as is always present
	// 						dischargeSupplyInstance.plug(Y.Plugin.DischargeSupplyMitteSimple, { sectionNode : dischargeSupplyInstance.get('sectionNode') });
	// 						dischargeSupplyInstance.SupplyMitte.setDisplay();
	// 					});
	// 				}
	// 			}
	// 		}
	// 	}	
	// })

	
}, '1.0', {requires: ['base-base', 'event-custom', 'dischargeSupply_mitte_simple_plugin', 'dischargeSupply_mitte_atomised_plugin']});