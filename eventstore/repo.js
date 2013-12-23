var request = require('request');
var uuid = require('node-uuid');
module.exports = function(host,credentials){
	return {
		postEvent:function(settings,done){
			var eventType = settings.eventType || (function () { throw "eventType is required"; })();
			var stream = settings.stream || (function () { throw "stream is required"; })();
			var data = settings.data || (function () { throw "data is required"; })();

			var expectedVersion = settings.expectedVersion || -2;
			var eventId = settings.eventId || uuid.v1();
			var correlationId = settings.correlationId || uuid.v1();
			var metadata = settings.metadata || "";

			var event = {
				"eventId": eventId,
				"EventType": eventType,
				"Data": data,
				"Metadata": metadata
			};
			var body = [event];
			var bodyStr = JSON.stringify(body);
			var encodedStream = encodeURIComponent(stream);
			var url = host + "/streams/" + encodedStream;

			request({
					url:url,
					method:'POST',
					headers:{
						"Accept": "application/json",
						"Content-Type": "application/json",
						"ES-ExpectedVersion": expectedVersion
					},
					body:bodyStr
				}
				, function(err,res,body){
					console.log(res.statusCode);
					if(!err){
						done(null,{
							eventId:eventId,
							correlationId:correlationId
						});
					}else{
						done(err,null);
					}
				}).auth(credentials[0],credentials[1]);
		},
		subscribeFrom:function(stream,position,onStateUpdate){

			onStateUpdate([1,2]);
		}
	};
};