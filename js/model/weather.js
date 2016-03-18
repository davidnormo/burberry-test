define(['backbone'], function(Backbone){
	'use strict';

	/**
	 * __Weather Base Model__
	 * A useful starting point for working with the Open Weather Map API
	 */
	var Weather = Backbone.Model.extend({

		/**
		 * __urlRoot__
		 * @type {String}
		 */
		urlRoot: 'http://api.openweathermap.org/data/2.5/',

		/**
		 * __url()__
		 * Compile the URI for the API endpoint
		 * @return {String}
		 */
		url: function(){
			return this.urlRoot +
				this.apiAction + '/' +
				this.apiMethod +
				this.getAPIParameters()
		},

		/**
		 * __getAPIParameters__
		 * Gets the parameters set to the model attributes as apiParams
		 * and returns it as a formatted GET string
		 * 
		 * @return {String}
		 */
		getAPIParameters: function(){
			//calls getParams on the inheriting object
			var paramObj = this.getParams(),
				paramStr = '';

			paramObj['APPID'] = 'fb279c857b85bc4c329d93b9c89c014b';

			_.each(paramObj, function(value, key){
				//append '&' before each, apart from first, append '?'
				paramStr += (!paramStr ? '?' : '&'); 

				paramStr += key+'='+value;
			});

			return paramStr;
		},

		/**
		 * __kelvinToCelcius__
		 * Converts a temperature in Kelvin to celcius
		 * 
		 * @param {Int} temp The temperature in Kelvin
		 * @returns {Int} Celcius
		 */
		kelvinToCelcius: function(temp){
			return Math.round(temp - 273.15, 0);
		}
	});

	return Weather;
});
