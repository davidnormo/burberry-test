define(['backbone'], function(Backbone) {
	'use strict';

	/**
	 * __Past Searches View__
	 * Displays previous searches, handles the searches collection and allows user to access previous searches
	 */
	var PastSearches = Backbone.View.extend({

		el: '#pastSearches',

		events: {
			'click .climate': 'changeAddress'
		},

		/**
		 * __template__
		 * A simple template for each previous search
		 * @type {Function}
		 */
		template: _.template('<div class="climate"><%= address %></div>'),

		/**
		 * __initialize()__
		 * Setup the previous search collection
		 */
		initialize: function() {
			//we only need a basic collection to work with
			this.collection = new Backbone.Collection();
		},

		/**
		 * __render()__
		 * Called whenever a new climate model is instantiated,
		 * Displays it in the view and adds it to the collection
		 * 
		 * @param {Climate} climate The Climate model
		 */
		render: function(climate) {
			this.collection.add(climate);

			this.$el.append(this.template({
				address: climate.get('address')
			}));
		},

		/**
		 * __changeAddress()__
		 * Called when a previous address is clicked
		 * @param {Object} event The event object
		 */
		changeAddress: function(event){
			var climateDiv = $(event.target);
			var climateModel = this.collection.findWhere({ address: climateDiv.text() });
			this.trigger('changedAddress', climateModel);
		}
	});

	return PastSearches;
});