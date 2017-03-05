var xml = require('xml');
var path = require('path');
var topics = require('../config/topics.json');
var twilio = require('twilio');

var { parseMessage, parseEmoji } = require('../messageParser');

// Map routes to controller functions
module.exports = function(router) {
  router.post('/topics', function(req, resp) {
  	var { topicId, feelId } = parseEmoji(req.body.Body); //	parseMessage(req.body.Body);
  	var topic = topics.find((t) => t.label === topicId);

  	if (topic) {
  		var feels = topic.feels;
	  	var feel = feels.find((f) => f.label === feelId);

	  	if (feel) {
	  		var content = feel.content;

			var twiml = new twilio.TwimlResponse();
			twiml.message(content.text);

			resp.writeHead(200, {'Content-Type': 'text/xml'});
    		return resp.end(twiml.toString());
		}
  	}

  	return resp.send('Nothing found');
  });

  router.get('/error', function(req, resp) {
    throw new Error('Derp. An error occurred.');
  });
};
