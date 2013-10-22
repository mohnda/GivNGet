YUI.add('dischargeSupply_mitte_simple_plugin', function (Y) {
	Y.Plugin.DischargeSupplyMitteSimple = Y.Base.create('dischargeSupplyMitteSimplePlugin', Y.Plugin.Base, [], {
		initializer: function () {
			Y.log('dischargeSupply_mitte_simple_plugin initalised');
		},

		destructor: function () {
			this.get('sectionNode').removeChild(Y.one('#mitte')); //.set('innerHTML', '');
		},

		setDisplay : function() {
			var mitteNode = Y.Node.create(
				'<div id="mitte">' +
					'<span>Supply Duration/Quantity</span><span id="requiredLabel" class="requiredField"> *</span><br />' +
					'<input id="durationQuantity" type="text" class="durationTextBox"></input>' +
					'<input id="blisterPack" type="checkbox" /><span>Blister Pack</span><br />' +
					'<span class="durationLink">5 days</span>, <span class="durationLink">1 week</span>, ' +
					'<span class="durationLink">2 weeks</span>, <span class="durationLink">1 month</span>' +
				'</div>'
			);
			this.get('sectionNode').append(mitteNode);

			this.durationQuantity = Y.one('#durationQuantity');
			this.blisterPack = Y.one('#blisterPack');
			this.requiredLabel = Y.one('#requiredLabel');

			// add event
			Y.all('.durationLink').on('click', function(e) {
				Y.log('mitte link ' + e.target.get('innerText') + ' clicked');				
				Y.one('#durationQuantity').set('value', e.target.get('innerText'));
			});
		},

		clearAll : function() {
			this.durationQuantity.set('value', '');
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
				this.durationQuantity.set('value', '');
				this.requiredLabel.addClass('hidden');
			}
		},

		getType : function() {
			return 'simple';
		},

		durationQuantity : null,
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