YUI.add('brand_replace_module', function (Y) {
	BrandReplace.ATTRS = {
		sectionNode : { value : null }
	};

	function BrandReplace() {
		BrandReplace.superclass.constructor.apply(this, arguments);
		Y.log('brand replace initalised');

		/* setup the dom elements/events required for this module */
		this.initialiseDisplay();

		/* Load data */
	}	

	// Y.on('drug:new_drug_search', function (e) {
	// 	Y.log('brand replace - new drug search event recieved');
	// })

	Y.BrandReplace = Y.extend(BrandReplace, Y.Base, {
		initialiseDisplay : function() {
			var view = new Y.View();
			var brandReplaceNode = Y.Node.create(view.brandReplaceComponent);
			this.get('sectionNode').append(brandReplaceNode);
		}
	});
}, '1.0', {requires: ['base-base', 'view_module']});