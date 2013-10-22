YUI.add('home_view', function (Y) {
	Y.namespace('HomeView');
	Y.HomeView.getTopLineTextView = function() {
		return '<div id="toplineText">' +
					'{guestMessage}' +
					'<a id="loginLink">({loginLinkMessage})</a>' +
					'.' +
				'</div>'
	};


}, '1.0', {});