YUI.add('home_view', function (Y) {
	Y.namespace('HomeView');

	Y.HomeView.getTopLineTextView = function() {
		return '<div id="toplineText">' +
					'{guestMessage}' +
					'<a id="loginLink">({loginLinkMessage})</a>' +
					'.' +
				'</div>'
	};

	Y.HomeView.getLinkListView = function() {
		return 	'<li>' +
					'<a class="active" title="home" href="/{link}">{display_text}</a>' +
				'</li>'
	};

	Y.HomeView.getSpanListView = function() {
		return 	'<li>' +
					'<span>{text}</span>' +
				'</li>'
	};

	Y.HomeView.getColumnView = function() {
		return  '<div id="{column_name}">' +
					'<div class="contentText">' +
						'<h2>{header_text}</h2>' +
						'<p>{column_main_paragraph}</p>' +
					'</div>' +
					'<ol id="{stepsList}">' +

					'</ol>' +
				'</div>'
	}
}, '1.0', {});