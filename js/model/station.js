define(['backbone', 'model/weather'], function(Backbone, Weather) {
	'use strict';

	/**
	 * __Station Model__
	 * Given a long/lat position, fetches the weather station closest
	 */
	var Station = Weather.extend({
		/**
		 * __apiAction__
		 * @type {String}
		 */
		apiAction: 'station',

		/**
		 * __apiMethod__
		 * @type {String}
		 */
		apiMethod: 'find',

		/**
		 * __apiParams__
		 * @type {Object}
		 */
		apiParams: {
			cnt: 1
		},

		attributes: {},

		/**
		 * __constructor()__
		 */
		constructor: function(position) {
			this.apiParams = {
				cnt: 1,
				lat: position.lat,
				lon: position.lon
			};
		},

		/**
		 * __setParams__
		 */
		getParams: function() {
			return this.apiParams;
		},

		/**
		 * __parse()__
		 * @return {Object} Attributes to set
		 */
		parse: function(response, options) {
			var station = response[0].station,
				current = response[0].last;

			return {
				id: station.id,
				currentTemp: this.kelvinToCelcius(current.main.temp),
				currentHumidity: current.main.humidity
			};
		}

	});

	return Station;
});