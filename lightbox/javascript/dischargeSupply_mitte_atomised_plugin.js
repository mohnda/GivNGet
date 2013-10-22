YUI.add('dischargeSupply_mitte_atomised_plugin', function (Y) {
	Y.Plugin.DischargeSupplyMitteAtomised = Y.Base.create('dischargeSupplyMitteAtomisedPlugin', Y.Plugin.Base, [], {
		initializer: function () {
			Y.log('dischargeSupply_mitte_atomised_plugin initalised');
		},

		destructor: function () {
			this.get('sectionNode').removeChild(Y.one('#mitte')); //.set('innerHTML', '');
		},

		setDisplay : function() {
			var mitteNode = Y.Node.create(
				'<div id="mitte">' +
					'<span>Supply Quantity</span><span id="requiredLabel" class="requiredField"> *</span><br />' +
					'<input id="quantity" type="text" class="quantityTextBox"></input>' +
					'<input id="duration" type="text" class="durationTextBox"></input>' +
					'<input id="blisterPack" type="checkbox" /><span>Blister Pack</span>' +
				'</div>'
			);
			this.get('sectionNode').append(mitteNode);

			this.quantity = Y.one('#quantity');
			this.duration = Y.one('#duration');
			this.blisterPack = Y.one('#blisterPack');
			this.requiredLabel = Y.one('#requiredLabel');
		},

		clearAll : function() {
			this.quantity.set('value', '');
			this.duration.set('value', '');
			this.blisterPack.set('checked', false);
		},

		loadData : function(checked) {

		},

		supplyChecked : function(checked) {
			if(checked) {
				this.blisterPack.set('disabled', false);
				this.requiredLabel.removeClass('hidden');
			} else {
				this.blisterPack.set('checked', false);
				this.blisterPack.set('disabled', true);
				this.quantity.set('value', '');
				this.duration.set('value', '');
				this.requiredLabel.addClass('hidden');
			}
		},

		getType : function() {
			return 'atomised';
		},

		quantity : null,
		duration : null,
		blisterPack : null,
		requiredLabel : null
	}, 
	{
		NS: 'SupplyMitte',

		ATTRS: {
			sectionNode : { value : ''},
		}
	});
}, '1.0', { requires: ['base-build', 'plugin'] });