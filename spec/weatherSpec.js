define(['model/weather'], function(Weather) {
	describe('Weather', function() {
		beforeEach(function() {
			this.model = new Weather();
			this.model.apiParams = {};
			//fake setParams in "subclass"
			this.model.getParams = function(p) {
				return this.apiParams;
			};
		});

		describe('kelvinToCelcius()', function() {
			it('should convert Kelvin to Celcius correctly', function() {
				var result = this.model.kelvinToCelcius(293.15);
				expect(result).toBe(20);
			});

			it('should round up to whole number', function() {
				var result = this.model.kelvinToCelcius(300);
				expect(result).toBe(27);
			});

			it('should round down to whole number', function() {
				var result = this.model.kelvinToCelcius(299.5);
				expect(result).toBe(26);
			});
		});

		describe('getAPIParameters()', function() {
			it('should compile standard parameters correctly', function() {
				//fake data
				this.model.apiParams = {
					id: 12345,
					type: 'day'
				};

				var result = this.model.getAPIParameters();

				expect(result).toBe('?id=12345&type=day');
			});

			it('should return empty string when no params', function() {
				var result = this.model.getAPIParameters();

				expect(result).toBe('');
			});
		});
	});
});