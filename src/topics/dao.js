const headers = {
	Accept: 'application/json',
};
const options = { headers };

export function fetchTopics() {
  const url = './topics.json';

  return fetch(url, options).then((res) => {
  	return res.json();
  }, (err) => {
  	console.error(`Error: ${err}`);
  });

}