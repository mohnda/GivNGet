YUI.add('lightbox', function (Y) {
	var type
	var loadedModules = [];
	var lightboxNode;
	
	function MedLightBox() {
		MedLightBox.superclass.constructor.apply(this, arguments);
		type = this.get('lightboxConfig.type');
		lightboxNode = this.get('lbnode');
		//helper to get the primary med info if available
		primaryData = this.get('medData') ? this.get('medData.primary') : null;

		/*
		 * Basic lightbox setup. 
		 */
		Y.one('#lightboxContainer').addClass('lightbox_' + this.get('lightboxConfig.colour'));
		Y.one('#lightboxContainer').addClass('lightlabel');
		Y.one('#lightboxContainer').addClass('lightboxContainer');
		
		/*
		 * Title module setup
		 */
		var HeadingModuleNode = createCoreNode('headingModuleNode', this.get('lbnode'));
		var HeadingNode = new Y.Heading({ headings : this.get('lightboxConfig.headings'), sectionNode : HeadingModuleNode});
		
		/*
		 * Flow Warning module setup
		 */
		if (this.get('lightboxConfig.flow_warning') != null) {
			var flowWarningModuleNode = createCoreNode('flowWarningModuleNode', this.get('lbnode'));
			var WorkflowWarning = new Y.WorkflowWarning({ warning : this.get('lightboxConfig.flow_warning'), sectionNode : flowWarningModuleNode});
		}

		/*
		 * load drug module. This includes searchers, replacers, readonly drug info, 
		 * coding info, controlled/brand restricted info.
		 */
		var drugModuleNode = createCoreNode('drugModuleNode', this.get('lbnode'));
		var DrugManager = new Y.DrugManager({ sectionNode : drugModuleNode, medication : this.get('medData'), type : this.get('lightboxConfig.type') });
		DrugManager.initaliseStrategy(DrugManager, drugModuleNode);

		/*
		 * Drug Warning module setup
		 */
		if (this.get('lightboxConfig.drug_warning') != null) {
			var drugWarningModuleNode = createCoreNode('drugWarningModuleNode', this.get('lbnode'));
			var DrugWarning = new Y.DrugWarning({ warning : this.get('lightboxConfig.drug_warning'), sectionNode : drugWarningModuleNode});
		}

		/*
		 * Sig (Instructions) Module
		 */
		var sigModuleNode = createCoreNode('sigModuleNode', this.get('lbnode'));
		var InstructionsManager = new Y.InstructionsManager({
			advSig : this.get('advSig'),
			medData : this.get('medData'),
			sectionNode : sigModuleNode
		});
		InstructionsManager.initaliseStrategy(InstructionsManager);
		loadedModules.push(InstructionsManager);

		/*
		 * Intended Duration Module
		 */
		 if (this.get('lightboxConfig.intendedDuration') != null) {
		 	var intendedDurationModuleNode = createCoreNode('intendedDurationModuleNode', this.get('lbnode'));
			Y.use('intended_duration_module', function (Y) {
				var IntendedDuration = new Y.IntendedDuration({
					sectionNode : intendedDurationModuleNode
				});
			});
		}

		/*
		 * Supply/Mitte module
		 */
		if (this.get('lightboxConfig.supply') != null) {
			var supplyModuleNode = createCoreNode('supplyModuleNode', this.get('lbnode'));
			var DischargeSupplyManager = new Y.DischargeSupplyManager({
				advSig : this.get('advSig'),
				medData : this.get('medData'),
				supply : this.get('lightboxConfig.supply'),
				sectionNode : supplyModuleNode
			});
		}
	//	DischargeSupplyManager.initaliseStrategy(DischargeSupplyManager);
		
		/*
		 * Reason/Comments module
		 */
		if (this.get('lightboxConfig.comments') != null) {
			var commentsConfig = this.get('lightboxConfig.comments');
			Y.use('comments_module', function (Y) {
				var commentsModuleNode = createCoreNode('commentsModuleNode', lightboxNode);
				var comments = new Y.Comments({
					config : commentsConfig,
					medication : primaryData,
					sectionNode : commentsModuleNode
				});
				loadedModules.push(comments);
			});
		}

		/*
		 * Indication Module
		 */
		if (this.get('lightboxConfig.indication') != null) {
			var indicationConfig = this.get('lightboxConfig.indication');
			Y.use('indication_module', function (Y) {
				var indicationModuleNode = createCoreNode('indicationModuleNode', lightboxNode);
				var indication = new Y.Indication({
					config : indicationConfig,
					medication : primaryData,
					sectionNode : indicationModuleNode
				});
				loadedModules.push(indication);
			});
		}

		/*
		 * Buttons module
		 */
		var buttonModuleNode = createCoreNode('buttonModuleNode', this.get('lbnode'));
		var buttonsNode = new Y.Buttons({sectionNode : buttonModuleNode});
    }

	MedLightBox.NAME = 'lightbox';

	MedLightBox.ATTRS = {
		lightboxConfig	: {	value	: null },
		medData 	: { value	: null },
		advSig	: { value	: false },
		lbnode	: { value	: null }
	};

	function createCoreNode(node, parent) {
		var view = new Y.View();

		var newNode = Y.Node.create(Y.Lang.sub(view.coreViewComponent, { 
				nodeName : node
			})
		);

		parent.append(newNode);

		return newNode;
	}

	function destroyLightbox() {
		lightboxNode.set('className',''); /* Clears any styling on the main node */
		lightboxNode.set('innerHTML', '');
	}

	Y.MedLightBox = Y.extend(MedLightBox, Y.Base, {
		initializer: function () {
			Y.log("lightbox initalised");
		},
	});

	Y.on('button:ok', function (e) {
		var verification_error = '';
		for(var i = 0; i < loadedModules.length; i++) {
			verification_error += loadedModules[i].verify();
		}

		if(verification_error !== '') {
			alert(verification_error);
		} else {
			destroyLightbox();
		}
	})

	Y.on('button:cancel', function (e) {
		destroyLightbox();
	})
}, '1.0', {requires: ['base-base', 'attribute', 'view_module', 'buttons_module', 'dischargeSupply_manager', 'heading_module', 'node', 'workflow_warning_module', 'drug_warning_module', 'drug_manager', 'instructions_manager']});
