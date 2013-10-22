YUI.add('instructions_freeText_plugin', function (Y) {
	Y.Plugin.FreeTextSig = Y.Base.create('freeTextSigPlugin', Y.Plugin.Base, [], {
		initializer: function () {
			Y.log('instructions_freeText_plugin initalised');
		},
		destructor: function () {
			this.instructions.remove(true);
		},
		setDisplay : function() {
			var switchOption = '',
    			requiredOption = '';
			
			var	baseMarkup = 
				'<div class="section">' +
					'<div class="instructionsLabel"><span>Instructions</span>{requiredHtml}</div>{switchHtml}' +
					'<div><textarea id="freeTextInstructions" rows="2" cols="" class="textarea"></textarea></div>' +
				'</div>';

			if(this.get('showSwitch')) {
				switchOption = '<div class="switchLink"><span>Change to Fixed Format</span></div>'
			}

			if(this.get('required')) {
				requiredOption = '<span class="requiredField"> *</span>'
			}

			var nodeComplete = Y.Lang.sub(baseMarkup, { 
				requiredHtml : requiredOption,
				switchHtml : switchOption						
			});

			this.get('sectionNode').append(Y.Node.create(nodeComplete));

			this.instructions = Y.one('#freeTextInstructions');

			var maxlength = this.get('maxlength');
			this.instructions.after('valuechange', function(e) {
				var instructions = Y.one('#freeTextInstructions');				
				if(instructions.get('value').length > maxlength) {
					Y.log('free text valuechange - exceeded');
					instructions.addClass('fieldError');
				} else {
					Y.log('free text valuechange - NOT exceeded');
					instructions.removeClass('fieldError');
				}
			});
		},
		clearAll : function() {
			this.instructions.set('value', '');
		},
		loadData : function(med) {
			this.instructions.set('value', med.sig);
		},
		verify : function() {
			var error_message = '';
			if(this.get('required')) {
				if(this.instructions.get('value').length === 0) {
					this.instructions.addClass('fieldError');
					error_message = 'No Instructions have been entered for this medication\n\n';
				}
			}

			if(this.get('maxlength') < this.instructions.get('value').length) {
				error_message = 'The Instructions have exceeded the maximum allowed ' + this.get('maxlength') + '\n\n';
			}
			return error_message;
		},

		instructions: null
	}, 
	{
		NS: 'Sig',

		ATTRS: {
			showSwitch : { value : false },
			sectionNode : { value : ''},
			maxlength : { value : 10},
			required : { value : true }
		}
	});
}, '1.0', { requires: ['base-build', 'plugin'] });
