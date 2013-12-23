var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var repo = require('../eventstore/repo')('http://127.0.0.1:2113',['admin','changeit']);
describe('EventStore Repository',function(){

	describe('subscribe to stream',function(){
		it('should be notified when new event occurs',function(done){
			repo.subscribeFrom('strange_events3',0,function(events){
				expect(events).to.be.an('array');
				done();
			});
		});
	});

	describe('post event',function(){
		var setts = {
			eventType:'something_happened3',
			stream:'strange_events3',
			data:{
				a:1,
				b:2
			}
		};
		it('should post event succesfully',function(done){
			repo.postEvent(setts,function(err,result){
				assert.isNull(err);
				expect(result).to.be.an('object');
				expect(result).to.have.property('eventId');
				expect(result).to.have.property('correlationId');
				expect(result.eventId).to.have.length(36);
				expect(result.correlationId).to.have.length(36);
				done();
			});
		});
	});
});