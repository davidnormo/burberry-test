define(['backbone'], function(Backbone){
	'use strict';

	/**
	 * __Display Weather View__
	 * Renders data as and when it is available by registered render() to the Climate model events
	 */
	var Display = Backbone.View.extend({

		el: '#display',

		/**
		 * __render()__
		 * Called when Climate model's attributes change
		 */
		render: function(climate){
			this.renderPosition(climate);

			var currentTemp = climate.get('currentTemp'),
				pastTemp = climate.get('temp');

			//if the current climate data is available...
			if(currentTemp !== undefined){
				this.renderCurrentWeather(climate);
			}

			//if the past climate data is available...
			if(pastTemp !== undefined){
				this.renderHistoricalData(climate);
			}
		},

		/**
		 * __renderPosition()__
		 * Render the position and address
		 * @param {Climate} climate Climate model
		 */
		renderPosition: function(climate){
			var position = climate.get('position');
			this.$('#lon').html(position.lon + '&deg;N');
			this.$('#lat').html(position.lat + '&deg;W');
			this.$('#address-title').text(climate.get('address'));
		},

		/**
		 * __renderCurrentWeather()__
		 * Renders the current weather conditions
		 * @param {Climate} climate
		 */
		renderCurrentWeather: function(climate){
			this.$('#current .temp').html(climate.get('currentTemp') + '&deg;C');
			this.$('#current .humidity').text(climate.get('currentHumidity') + '%');
		},

		/**
		 * __renderHistoricalData()__
		 * Renders the past weather data
		 * @param {Climate} climate
		 */
		renderHistoricalData: function(climate){
			this.$('#historical .days').html(climate.get('numDays') + ' days');
			this.$('#historical .temp').html(climate.get('temp') + '&deg;C');
			this.$('#historical .humidity').text(climate.get('humidity') + '%');
		}
	});

	return Display;
});