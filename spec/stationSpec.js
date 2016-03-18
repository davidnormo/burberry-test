define(['model/station'], function(Station) {
	'use strict';

	describe('Station', function() {
		beforeEach(function() {
			this.model = new Station({
				lat: 1,
				lon: 2
			});
		});

		describe('parse()', function() {
			it('should parse the response correctly', function() {
				this.model.set(this.model.parse([{
					station: {
						id: 999
					},
					last: {
						main: {
							temp: 300,
							humidity: 70
						}
					}
				}]));

				expect(this.model.get('id')).toBe(999);
				expect(this.model.get('currentTemp')).toBe(27);
				expect(this.model.get('currentHumidity')).toBe(70);
			});
		});

		describe('url()', function(){
			it('should generate the correct API endpoint URI', function(){
				var uri = 'http://api.openweathermap.org/data/2.5/station/find?cnt=1&lat=1&lon=2';

				var result = this.model.url();

				expect(result).toBe(uri);
			});
		});
	});
});