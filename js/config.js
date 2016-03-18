/*
 * RequireJS Config
 */
require.config({
	baseUrl: 'js/',

	paths: {
		'backbone': 'lib/backbone.dev',
		'jquery': 'lib/zepto',
		'underscore': 'lib/lodash'
	}
});

/*
 * Start the application
 */
require(['app']);