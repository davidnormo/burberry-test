define(['backbone', 'model/station', 'model/history'], function(Backbone, Station, History){
	'use strict';

	/**
	 * __Climate Model__
	 * Collects together the data from the other models
	 */
	var Climate = Backbone.Model.extend({
		/**
		 * __initialize()__
		 * Setup a new Station model and fetch the station id and current weather
		 */
		initialize: function(){
			var station = new Station(this.get('position'));
			this.listenTo(station, 'sync', this.setStationData);
			station.fetch();
		},

		/**
		 * __setStationData()__
		 * Sets the data fetched from Station, and calls fetch on History
		 * @param {Station} station The station model
		 */
		setStationData: function(station){
			this.set(station.attributes);
			this.trigger('newdata', this);

			var history = new History({
				id: this.get('id')
			});
			this.listenTo(history, 'sync', this.setHistoricalData)
			history.fetch();
		},

		/**
		 * __setHistoricalData()__
		 * Sets data fetched from History
		 * @param {History} history The history model
		 */
		setHistoricalData: function(history){
			this.set(history.attributes);
			this.trigger('newdata', this);
		},
	});

	return Climate;

});