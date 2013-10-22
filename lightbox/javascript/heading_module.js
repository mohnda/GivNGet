YUI.add('heading_module', function (Y) {
	Heading.ATTRS = {
		headings : { value: null },
		sectionNode : { value : null }
	};

	function Heading() {
		Heading.superclass.constructor.apply(this, arguments);
		Y.log('heading module initalised');

		this.initialiseDisplay();
	};

	Y.Heading = Y.extend(Heading, Y.Base, {
		initialiseDisplay : function () {
			var view = new Y.View();

			var primaryHeadingnode = Y.Node.create(Y.Lang.sub(view.headingViewComponent, {size : '2', value : this.get('headings.primary')}));
			this.get('sectionNode').append(primaryHeadingnode);

			if(this.get('headings.secondary') != null) {
				var secondaryHeadingnode = Y.Node.create(Y.Lang.sub(view.headingViewComponent, {size : '3', value : this.get('headings.secondary')}));
				this.get('sectionNode').append(secondaryHeadingnode);
			}
		}
	});
}, '1.0', {requires: ['node', 'base-base', 'view_module']});