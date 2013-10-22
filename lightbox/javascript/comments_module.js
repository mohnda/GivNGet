YUI.add('comments_module', function (Y) {
	var thisObject; /* needed to access 'this' in YUI function scope */

	Comments.ATTRS = {
		config : { value: null },
		medication : { value: null },
		sectionNode : { value : null },
		payloadNode : { value : null }
	};

	function Comments() {
		Comments.superclass.constructor.apply(this, arguments);
		thisObject = this;
		Y.log('comments initalised');

		// isRequired defaults to false unless set
		this.set('isRequired', (this.get('config.required') !== undefined && this.get('config.required') === true));

		// maxLength defaults to 250 unless set
		this.set('maxLength', this.get('config.maxLength') !== undefined ? this.get('config.maxLength') : 250);


		/* setup the dom elements/events required for this module */
		this.initialiseDisplay();

		/* Load data */
		if(this.get('medication') != null) {
			this.get('payloadNode').set('value', this.get('medication.comments'));
		}
	}	

	Y.on('drug:new_drug_search', function (e) {
		Y.log('comments - new drug search event recieved');
		thisObject.get('payloadNode').set('value', '');
	})

	Y.Comments = Y.extend(Comments, Y.Base, {
		initialiseDisplay : function() {
			var view = new Y.View();
			var commentsNode = Y.Node.create(Y.Lang.sub(view.reasonComponent, {	heading : this.get('config.heading') }));
			this.get('sectionNode').append(commentsNode);
			this.set('payloadNode', Y.one('#commentsPayloadNode'));

			if(this.get('isRequired')) {
				Y.one('#commentsSectionNode').removeClass('notRequired');
			}
		},
		verify : function() {
			if(this.get('isRequired') && this.get('payloadNode').get('value').length === 0) {
				Y.log('Reason/Comments verify failed - invalid value');
				return 'the ' + this.get('config.heading') + ' field is required and has not been completed';
			}
		}
	});
}, '1.0', {requires: ['base-base', 'view_module']});