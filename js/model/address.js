define(['backbone'], function(Backbone) {
	'use strict';

	/**
	 * __Address Model__
	 * Using Google Geocoder API, exchanges an address for a long/lat position
	 */
	var Address = Backbone.Model.extend({
		/**
		 * __apiKey__
		 *
		 * @property {String} apiKey Google Geocoding API Key
		 */
		apiKey: 'AIzaSyADfAM5yNskI2ZqC7vuO8889_tz8ETTLT8',

		/**
		 * __urlRoot__
		 *
		 * @property {String} urlRoot Google Geocoding API Key
		 */
		urlRoot: 'https://maps.googleapis.com/maps/api/geocode/json',

		/**
		 * __url()__
		 * Returns the API enpoint URL
		 *
		 * @return {String}
		 */
		url: function() {
			return this.urlRoot +
				'?address=' + this.urlEncode(this.get('address')) +
				'&key=' + this.apiKey;
		},

		/**
		 * __validate()__
		 * Validates the models data
		 *
		 * @param {Object} attributes
		 * @returns {Void|String} Void if passed else error string
		 */
		validate: function(attributes, options) {
			options = options || {};
			var address = attributes['address'];

			//the different error conditions
			var errors = {
				'Must set an address': (!address),
				'Invalid Address': !(/^[a-zA-Z0-9,\s-]+$/g.test(address))
			};

			var validatingServer = options.parse;
			//if not validating from a server response...
			if (!validatingServer) {
				//then it should be brand new address and
				//we want to check that the address isn't already in use
				var oldAddress = (this.get('address') || ''),
					addressPieces = address.split(','),
					firstLine = new RegExp(addressPieces[0], 'i');

				//extend error conditions array
				errors['Address already in use'] = (!!oldAddress.match(firstLine));
			}

			for (var message in errors) {
				var errorCondition = errors[message];
				if (errorCondition) {
					return message;
				}
			}
		},

		/**
		 * __set()__
		 * Custom validation on set
		 * @param {String|Object} key     Attribute key
		 * @param {Mixed} value    Attribute value
		 * @param {Object} options Optional
		 */
		set: function(key, value, options) {
			//parse may return false
			if (key === false) {
				//don't set anyting, and do likewise
				return false;
			}

			var attrs = {};

			//handle key being called with object of attributes to set
			if (typeof key === 'object') {
				options = value;
				attrs = key;
			} else {
				//otherwise just dealing with a single attribute
				attrs[key] = value;
			}

			//validate the address
			var error = this.validate(attrs, options);
			if (error !== undefined) {
				this.trigger('invalid', error);
				return;
			}

			//set the attribute(s)
			Backbone.Model.prototype.set.apply(this, [attrs, options]);
			return this;
		},

		/**
		 * __parse()__
		 * Handle data coming from server
		 * @param  {Object} response
		 * @param  {Object} options
		 * @return {Object} Attributes to set
		 */
		parse: function(response, options) {
			if (response.status !== 'OK') {
				//trigger invalid event and re-set current attributes
				this.trigger('invalid', 'Could not find that address. Please try another.');
				return false;
			}

			var result = response.results[0];
			return {
				address: result['formatted_address'],
				position: {
					lon: result['geometry']['location']['lng'],
					lat: result['geometry']['location']['lat']
				}
			};
		},

		/**
		 * __urlEncode()__
		 * Encode a string
		 *
		 * @param {String} input
		 * @returns {String}
		 */
		urlEncode: function(input) {
			return input.replace(/ /g, '+');
		}
	});

	return Address;
});