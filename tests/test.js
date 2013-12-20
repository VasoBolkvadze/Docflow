var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var repo = require('../eventstore/repo')('http://127.0.0.1:2113');
describe('EventStore Api',function(){
	describe('post event',function(){
		var setts = {
			eventType:'something_happened3',
			stream:'strange_events3',
			data:{
				a:1,
				b:2
			}
		};
		it('event should be posted succesfully',function(done){
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