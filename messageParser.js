function parseMessage(msg) {
	var re = /i want to feel (.*?) about (.*)/ig;
	var match = re.exec(msg);

	return { topicId: match[2], feelId: match[1] };
}

module.exports.parseMessage = parseMessage;