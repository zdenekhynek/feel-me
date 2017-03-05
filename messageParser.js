const emoji = require('node-emoji');
const emojis_map = require('./config/emojis_map.json');

function parseMessage(msg) {
	const re = /i want to feel (.*?) about (.*)/ig;
	const match = re.exec(msg);
	
	return { topicId: match[2], feelId: match[1] };
}

module.exports.parseMessage = parseMessage;

function parseEmoji(msg) {
	//	convert emoji to text
	const emojiText = emoji.which(msg);

	const topicId = 'global warming';
	const feelId = emojis_map[emojiText];

	return { topicId, feelId };
}

module.exports.parseEmoji = parseEmoji;