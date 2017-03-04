var xml = require('xml');
var path = require('path');
var topics = require('../config/topics.json');

// Map routes to controller functions
module.exports = function(router) {
  router.get('/topics/:topicId/feels/:feelId', function(req, resp) {
  	var { topicId, feelId } = req.params;
  	var topic = topics.find((t) => t.id === topicId);

  	if (topic) {
  		var feels = topic.feels;
	  	var feel = feels.find((f) => f.id === feelId);

	  	if (feel) {
	  		var content = feel.content;
	  		console.log('content');
	  		console.log(content);

	  		resp.set('Content-Type', 'text/xml');
			return resp.send(xml(content));
	  	}
  	}

  	return resp.send('Nothing found');
  });

  router.get('/error', function(req, resp) {
    throw new Error('Derp. An error occurred.');
  });
};
