YUI.add('indication_module', function (Y) {
	var thisObject; /* needed to access 'this' in YUI function scope */

	Indication.ATTRS = {
		config : { value: null },
		medication : { value: null },
		sectionNode : { value : null },
		payloadNode : { value : null }
	};

	function Indication() {
		Indication.superclass.constructor.apply(this, arguments);
		thisObject = this;
		Y.log('indication initalised');

		// isRequired defaults to true unless set
		this.set('isRequired', !(this.get('config.required') !== undefined && this.get('config.required') === false));

		Y.log('Required: ' + this.get('isRequired'));
		// maxLength defaults to 1000 unless set
		this.set('maxLength', this.get('config.maxLength') !== undefined ? this.get('config.maxLength') : 1000);

		/* setup the dom elements/events required for this module */
		this.initialiseDisplay();

		/* Load data */
		if(this.get('medication') != null) {
			this.get('payloadNode').set('value', this.get('medication.indication'));
		}
	}	

	Y.on('drug:new_drug_search', function (e) {
		Y.log('indication - new drug search event recieved');
		thisObject.get('payloadNode').set('value', '');
	})

	Y.Indication = Y.extend(Indication, Y.Base, {
		initialiseDisplay : function() {
			var view = new Y.View();
			var indicationNode = Y.Node.create(Y.Lang.sub(view.indicationComponent, {	heading : this.get('config.heading') }));
			this.get('sectionNode').append(indicationNode);
			this.set('payloadNode', Y.one('#indicationPayloadNode'));

			if(this.get('isRequired') === false) {
				Y.one('#indicationSectionNode').addClass('notRequired');
			}
		},
		verify : function() {
			if(this.get('isRequired') && this.get('payloadNode').get('value').length === 0) {
				Y.log('Indication verify failed - invalid value');
				return 'the ' + this.get('config.heading') + ' field is required and has not been completed';
			}
		}
	});
}, '1.0', {requires: ['base-base', 'view_module']});