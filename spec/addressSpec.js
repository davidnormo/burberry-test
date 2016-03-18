define(['model/address'], function(Address) {
	describe('Address', function() {
		beforeEach(function() {
			this.address = '1A Page Street, London, SW1P 4PQ';
			this.model = new Address({
				address: this.address
			});
		});

		/*
		 * Address.url() should return a string of the correct endpoint
		 * to query the Google Geocoder API
		 */
		describe('url()', function() {
			it('should return the correct API endpoint', function() {
				var url = this.model.url(),
					root = 'https://maps.googleapis.com/maps/api/geocode/json',
					key = 'AIzaSyADfAM5yNskI2ZqC7vuO8889_tz8ETTLT8',
					correctURL = root +
					'?address=1A+Page+Street,+London,+SW1P+4PQ' +
					'&key=' + key;

				expect(url).toBe(correctURL);
			});
		});

		/*
		 * Address.urlEncode prepares a string for the API query,
		 * encodeURIComponent isn't suitable in this case
		 */
		describe('urlEncode()', function() {
			it('should replace spaces with +', function() {
				expect(this.model.urlEncode('hi there')).toBe('hi+there');
			});
		});

		/*
		 * Address.set override the default implementation
		 * so that validation can be performed on the incoming data, rather
		 * than the existing data
		 */
		describe('set()', function() {
			beforeEach(function() {
				//class property so tests can assign their own listener
				this.callback = function() {};
				this.callbackSpy = spyOn(this, 'callback').andCallThrough();
				_.extend({}, Backbone.Events)
					.listenTo(this.model, 'invalid', this.callback);

				//to comparse after exercise
				this.currentAddress = this.model.get('address');
			});

			afterEach(function() {
				//clear the invalid event callback
				this.callback = function() {};
			});

			it('should not trigger invalid for a good address', function() {
				//listen for `invalid` event triggered by model
				_.extend({}, Backbone.Events)
					.listenTo(this.model, 'invalid', function() {
						//As good as we get to a assert.fail()
						expect(false).toBe(true);
					});

				var testAddress = '30 The Street, Bath, BA12 3EW';
				this.model.set('address', testAddress);

				expect(this.model.get('address')).toBe(testAddress);
			});

			/*
			 * A simple and not comprehensive check that the address is
			 * close to what we are expecting
			 */
			it('should trigger invalid for a bad address', function() {
				//listen for `invalid` event triggered by model
				this.callback = function(err) {
					expect(err).toBe('Invalid address');
				};

				//exercise
				this.model.set('address', '!@£$%^&*()');

				expect(this.callbackSpy).wasCalled();
				//check model state is ok
				expect(this.model.get('address')).toBe(this.currentAddress);
			});

			it('should trigger invalid for a missing address', function() {
				this.callback = function(err) {
					expect(err).toBe('Must set an address');
				};

				this.model.set('address', '');

				expect(this.callbackSpy).wasCalled();
				expect(this.model.get('address')).toBe(this.currentAddress);
			});
		});

		/*
		 * Takes data from Google Geocoder API and formats for our consumption
		 */
		describe('parse()', function() {
			beforeEach(function(){
				this.parseListener = function(){};
				this.parseSpy = spyOn(this, 'parseListener').andCallThrough();

				_.extend({}, Backbone.Events)
					.listenTo(this.model, 'invalid', this.parseListener);
			});

			it('should trigger invalid when response returns not found', function() {
				this.parseListener = function(err) {
					expect(err).toBeDefined();
				};

				this.model.parse({
					status: 'Err'
				});

				expect(this.parseSpy).wasCalled();
			});

			it('should parse correctly when response is OK', function(){
				this.parseListener = function(err) {
						expect(true).toBe(false);
				};

				var address = '1 The Road, London',
					location = {
						lng: 1,
						lat: 2
					};
				var attributes = this.model.parse({
					status: 'OK',
					results: [{
						'formatted_address': address,
						'geometry': {
							'location': location
						}
					}]
				});

				expect(this.parseSpy).wasNotCalled();
				expect(attributes['address']).toBe(address);
				expect(attributes['position']).toEqual({ lon: 1, lat: 2 });
			});
		});

		describe('fetch()', function(){
			it('should call parse and set correctly when API returns not OK', function(){
				var syncSpy = spyOn(this.model, 'sync').andCallFake(function(method, model, options){
					options.success({
						status: 'NOT OK'
					});
				});
				var successSpy = jasmine.createSpy('successSpy');

				this.model.fetch({ success: successSpy });

				expect(syncSpy).wasCalled();
				expect(successSpy).wasNotCalled();
				expect(this.model.get('address')).toBe(this.address);
			});
		});
	});
});