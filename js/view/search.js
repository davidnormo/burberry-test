define(['backbone', 'model/address'], function(Backbone, Address) {
	'use strict';

	/**
	 * __Search View__
	 * Handles address input and displaying errors
	 */
	var Search = Backbone.View.extend({
		el: '#search',

		events: {
			'click button': 'newAddress',
			'submit form': 'newAddress'
		},

		/**
		 * __initialize()__
		 * Setup with default address, calling fetch on the Address model
		 */
		initialize: function() {
			var defaultAddress = '1A Page Street, London, SW1P 4PQ';
			this.$('input').val(defaultAddress);
			
			this.model = new Address({ address: defaultAddress });
			this.listenTo(this.model, 'invalid', this.invalidAddress);
			this.model.fetch();
		},

		/**
		 * __render()__
		 * Renders a previous address found
		 * @param {Climate} climate A previous Climate model
		 */
		render: function(climate){
			this.$('#error').html('');
			var address = climate.get('address');
			this.$('input').val(address);

			//fake getting this data from the server so validation rules act in that way
			this.model.set('address', address, { parse: true });
		},

		/**
		 * __newAddress()__
		 * Event listener when a new address has been entered
		 * Set it in the view and calls fetch on the Address model
		 */
		newAddress: function(event) {
			event.preventDefault();

			//remove error message if exists
			this.$('#error').html('');

			this.model.set('address', this.$('input').val());
			if(this.$('#error').text() === ''){
				this.model.fetch();
			}
		},

		/**
		 * __invalidAddress()__
		 * Displays errors from the model
		 * @param  {String} err Error string
		 */
		invalidAddress: function(err) {
			this.$('#error').html(err);
		}
	});

	return Search;
});