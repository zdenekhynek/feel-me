const xml = require('xml');
const path = require('path');
const topics = require('../config/topics.json');
const twilio = require('twilio');

const { parseMessage, parseEmoji } = require('../messageParser');

// Map routes to controller functions
module.exports = function(router) {
  router.post('/topics', function(req, resp) {
  	const { topicId, feelId } = parseMessage(req.body.Body);// parseEmoji(req.body.Body);
  	const topic = topics.find((t) => t.label === topicId);

  	if (topic) {
  		const feels = topic.feels;
	  	const feel = feels.find((f) => f.label === feelId);

	  	if (feel) {
	  		const content = feel.content;

			const twiml = new twilio.TwimlResponse();
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
