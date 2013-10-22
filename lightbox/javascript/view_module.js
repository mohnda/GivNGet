YUI.add('view_module', function (Y) {
	function View() {
		View.superclass.constructor.apply(this, arguments);
	}

	View.NAME = 'view';

	Y.View = Y.extend(View, Y.Base, {
		initializer: function () {
			Y.log("View initalised");
		},

		coreViewComponent : '<div id="{nodeName}" class="section"></div>'
		,
		/* Heading */
		headingViewComponent : '<h{size}>{value}</h{size}>'
		,
		/* Drug Searcher */
		searcherViewComponent :
			'<span>Drug</span><span class="requiredField"> *</span><br />' +
			'<div id="searcher"><input id="ac-input" type="text"></div>'
		,
		/* Drug Replacer */
		replacerViewComponent :
			'<div><span>Drug</span><span class="requiredField"> *</span></div>' +
				'<div id="replacer" class="showList" style="float : left;">' +
					'<input id="ac-input" type="text" readonly>' +
					'<img id="drop_button" src="lightbox/images/dd.png">' +					
				'</div>' +
				'<div id="replacer_image_container">' +
				'<img id="replacer_controlled_icon" class="hidden" src="lightbox/images/controlledDrug.png">' +
				'<img id="replacer_restricted_icon" class="hidden" src="lightbox/images/brand-restricted.png">' +
			'</div>'
		,
		/* Drug Searcher/Replacer common */
		drugShowTemplateViewComponent :
			'<div class="drugresult subsidy_{subsidy} {controlled} {brandRestricted}" style="padding-right: {paddingSpace}px;">' +
				'<span class="ItemDescription">{description}</span>' +
				'<div class="searchIconColOne {colOneIcon}" title="{colOneTitle}"></div>' +
				'<div class="searchIconColTwo {colTwoIcon}" title="{colTwoTitle}"></div>' +
			'</div>'
		,
		/* Reason/comments */
		reasonComponent :
			'<div id="commentsSectionNode" class="notRequired">' +
				'<span>{heading}</span><span class="requiredField"> *</span><br />' +
				'<textarea id="commentsPayloadNode" rows="2" class="textarea"></textarea>' +
			'</div>'
		,
		/* Indication */
		indicationComponent :
			'<div id="indicationSectionNode">' +
				'<span>{heading}</span><span class="requiredField"> *</span><br />' +
				'<textarea id="indicationPayloadNode" rows="2" class="textarea"></textarea>' +
			'</div>'

	});
}, '1.0', {requires: ['node', 'base-base']});