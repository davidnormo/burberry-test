define(['backbone', 'model/weather'], function(Backbone, Weather) {
	'use strict';

	/**
	 * __History Model__
	 * Queries the Open Weather Map API for historical data from a station
	 */
	var History = Weather.extend({
		/**
		 * __apiAction__
		 * The action to call on the API endpoint
		 * @type {String}
		 */
		apiAction: 'history',

		/**
		 * __apiMethod__
		 * The method to call on the action of the API endpoint
		 * @type {String}
		 */
		apiMethod: 'station',

		/**
		 * __apiParams__
		 * @type {Object}
		 */
		apiParams: {
			type: 'day'
		},

		attributes: {},

		/**
		 * __constructor()__
		 * @param {Object} stationData The station id
		 */
		constructor: function(stationData) {
			this.apiParams = {
				type: 'day',
				id: stationData.id
			};
		},

		/**
		 * __getParams()__
		 * Called by the Weather Model super class
		 * @returns {Object} The GET parameters
		 */
		getParams: function() {
			return this.apiParams;
		},

		/**
		 * __parse()__
		 * Parses the response from the server
		 * @param  {Object} response
		 * @param  {Object} options
		 * @returns {Object} The attributes to set to this model
		 */
		parse: function(response, options){
			var days = response.list;

			var sumTemp = 0,
				sumHumidity = 0;
			_.each(days, function(day){
				sumTemp += this.kelvinToCelcius(day.temp.v);
				sumHumidity += day.humidity.v;
			}, this);

			return { 
				numDays: days.length,
				temp: Math.round(sumTemp / days.length, 0),
				humidity: Math.round(sumHumidity / days.length, 0)
			};
		}
	});

	return History;
});
