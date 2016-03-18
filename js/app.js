define(['backbone'], function(Backbone) {
	'use strict';

	/**
	 * Application Router
	 */
	var Router = Backbone.Router.extend({

		/**
		 * __routes__
		 * @type {Object}
		 */
		routes: {
			'*path': 'loadApp'
		},

		/**
		 * __loadApp()__
		 * Loads the views for our app, and sets everything running
		 * @param  {String} path
		 */
		loadApp: function(path) {
			require(['view/search', 'view/display', 'view/pastSearches', 'model/climate'],
				function(Search, Display, PastSearches, Climate) {
					//setup the views + models
					var searchView = new Search(),
						displayView = new Display(),
						pastSearchesView = new PastSearches();

					var addressModel = searchView.model;

					//using events share the climate model between the views
					var eventBus = _.extend({}, Backbone.Events);
					eventBus.listenTo(addressModel, 'sync', function() {
						var climate = new Climate({
							address: addressModel.get('address'),
							position: addressModel.get('position')
						});

						displayView.listenTo(climate, 'newdata', displayView.render)
							.listenTo(pastSearchesView, 'changedAddress', displayView.render)
							.render(climate);					

						searchView.listenTo(pastSearchesView, 'changedAddress', searchView.render);

						pastSearchesView.render(climate);
					});
				}
			);
		}
	});

	/*
	 * Init application
	 */
	$(function() {
		var router = new Router();
		Backbone.history.start({
			pushState: true
		});
	});
});