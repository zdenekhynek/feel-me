var emoji = require('node-emoji');
var emojis_map = require('./config/emojis_map.json');

function parseMessage(msg) {
	var re = /i want to feel (.*?) about (.*)/ig;
	var match = re.exec(msg);

	
	return { topicId: match[2], feelId: match[1] };
}

module.exports.parseMessage = parseMessage;

function parseEmoji(msg) {
	//	convert emoji to text
	var emojiText = emoji.which(msg);

	console.log('emojiText', emojiText);

	var topicId = 'global warming';
	var feelId = emojis_map[emojiText];

	return { topicId, feelId };
}

module.exports.parseEmoji = parseEmoji;