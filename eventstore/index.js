var request = require('request');
var uuid = require('node-uuid');
var appendToStream = function(host,credentials,stream,settings,done){
	var error = null;
	var eventType = settings.eventType || (function () { error = 'eventType is required'; })();
	var data = settings.data || (function () { error = 'data is required'; })();
	if(error)
	{
		done(error,null);
		return;
	}
	var expectedVersion = settings.expectedVersion || -2;
	var eventId = settings.eventId || uuid.v1();
	var correlationId = settings.correlationId || uuid.v1();
	var metadata = settings.metadata || "";

	var event = {
		"EventId": eventId,
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
			if(!err){
				done(null,{
					eventId:eventId,
					correlationId:correlationId
				});
			}else{
				done(err,null);
			}
		}).auth(credentials[0],credentials[1]);
};
var subscribeToStream = function(host,credentials,stream,position,eventsAppeared){
	var qs = '?format=json&embed=content';
	var url = host + '/streams/' + stream + '/' + position + '/forward/20' + qs;
	function getFeedLink(links,rel){
		for(var i=0; i < links.length; i++)
		{
			var link = links[i];
			if(link.relation==rel)
				return link.uri;
		}
		return null;
	}
	function readStreamPage(url){
		request({
			method:'GET',
			url:url,
			headers:{
				"Accept":"application/json",
				"ES-LongPoll":30
			}
		},function(err,res,body){
			if(err)
				console.log(err);
			if(res && res.statusCode==200){
				var page = JSON.parse(body);
				if(page.entries.length){
					var events = page.entries
						.map(function(entry){
							return entry.content;
						});
					events.reverse();
					eventsAppeared(events);
				}
				var previous = getFeedLink(page.links,'previous');
				if(previous)
					url = previous + qs;
			}
			readStreamPage(url);
		})
			.auth(credentials[0],credentials[1]);
	}
	readStreamPage(url);
};
module.exports = function(host,credentials){
	return {
		appendToStream: function(stream,settings,done){
			appendToStream(host,credentials,stream,settings,done);
		},
		subscribeToStream: function(stream,position,eventsAppeared){
			subscribeToStream(host,credentials,stream,position,eventsAppeared);
		}
	};
};