var YUI_config = {
	groups: {
		'local-modules': {
			base: 'lightbox/javascript/',
			modules: {					
				'lightbox': {
					path: 'lightbox_module.js',
					requires: ['base-base', 'attribute', 'view_module', 'buttons_module', 'dischargeSupply_manager', 'instructions_manager', 'heading_module', 'node', 'workflow_warning_module', 'drug_warning_module', 'drug_manager', 'event']
				},
				'view_module': {
					path: 'view_module.js',
					requires: ['node', 'base-base']
				},
				'brand_replace_module': {
					path: 'brand_replace_module.js',
					requires: ['node', 'base-base', 'view_module']
				},
				'buttons_module': {
					path: 'buttons_module.js',
					requires: ['node', 'base-base']
				},
				'heading_module': {
					path: 'heading_module.js',
					requires: ['node', 'base-base', 'view_module']
				},
				'workflow_warning_module': {
					path: 'workflowWarning/workflow_warning_module.js',
					requires: ['base-base', 'workflow_warning_view']
				},
				'workflow_warning_view': {
					path: 'workflowWarning/workflow_warning_view.js'
				},
				'drug_manager': {
					path: 'drug_manager.js',
					requires: ['base-base', 'base', 'attribute', 'node', 'event-custom', 'drug_readonly_plugin', 'drug_searcher_plugin']
				},
				'drug_searcher_plugin' : {
					path: 'drug_searcher_plugin.js',
					requires: ['base-build', 'plugin', 'view_module']
				},
				'drug_readonly_plugin' : {
					path: 'drug_readonly_plugin.js',
					requires: ['base-build', 'plugin']
				},
				'instructions_freeText_plugin' : {
					path: 'instructions_freeText_plugin.js',
					requires: ['base-build', 'plugin']
				},
				'drug_warning_module': {
					path: 'drugWarning/drug_warning_module.js',
					requires: ['base-base', 'drug_warning_view']
				},
				'drug_warning_view': {
					path: 'drugWarning/drug_warning_view.js'
				},
				'instructions_manager': {
					path: 'instructions_manager.js',
					requires: ['base-base', 'base', 'attribute', 'node', 'event-custom', 'instructions_freeText_plugin', 'instructions_advSig_plugin']
				},
				'instructions_freeText_plugin' : {
					path: 'instructions_freeText_plugin.js',
					requires: ['base-build', 'plugin']
				},
				'instructions_advSig_plugin' : {
					path: 'instructions_advSig_plugin.js',
					requires: ['base-build', 'plugin']
				},
				'dischargeSupply_manager': {
					path: 'dischargeSupply_manager.js',
					requires: ['base-base', 'event-custom', 'dischargeSupply_mitte_simple_plugin', 'dischargeSupply_mitte_atomised_plugin']
				},
				'dischargeSupply_mitte_simple_plugin' : {
					path: 'dischargeSupply_mitte_simple_plugin.js',
				requires: ['base-build', 'plugin']
				},
				'dischargeSupply_mitte_atomised_plugin' : {
					path: 'dischargeSupply_mitte_atomised_plugin.js',
					requires: ['base-build', 'plugin']
				},
				'comments_module': {
					path: 'comments_module.js',
					requires: ['base-base', 'view_module']
				},
				'indication_module': {
					path: 'indication_module.js',
					requires: ['base-base', 'view_module']
				},
				'intended_duration_module': {
					path: 'intendedDuration/intended_duration_module.js',
					requires: ['base-base', 'intended_duration_view']
				},
				'intended_duration_view': {
					path: 'intendedDuration/intended_duration_view.js'
				}
			}
		}
	}
};
