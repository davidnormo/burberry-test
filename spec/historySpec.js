define(['model/history'], function(History) {
	describe('History', function() {
		beforeEach(function() {
			this.model = new History({
				id: 99
			});
		});

		describe('parse()', function() {
			beforeEach(function() {
				this.model.set(this.model.parse({
					list: [{
						temp: {
							v: 293.15
						},
						humidity: {
							v: 85
						}
					}, {
						temp: {
							v: 213.15
						},
						humidity: {
							v: 5
						}
					}, {
						temp: {
							v: 303.15
						},
						humidity: {
							v: 55
						}
					}, {
						temp: {
							v: 313.15
						},
						humidity: {
							v: 15
						}
					}]
				}));
			});

			it('should get the right number of days', function() {
				expect(this.model.get('numDays')).toBe(4);
			});

			it('should gather the average temperature', function() {
				expect(this.model.get('temp')).toBe(8);
			});

			it('should gather the average humidity', function() {
				expect(this.model.get('humidity')).toBe(40);
			});
		});
	});
});