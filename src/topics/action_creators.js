import * as dao from './dao';

export const REQUEST_TOPICS = 'REQUEST_TOPICS';
export const RECEIVE_TOPICS = 'RECEIVE_TOPICS';

export function requestTopics() {
	return {
		type: REQUEST_TOPICS,
	};
}

export function receiveTopics(topics) {
	return {
		type: RECEIVE_TOPICS,
		topics,
	};
}

export function fetchTopics() {
	return (dispatch) => {
		dispatch(requestTopics());
		
		return dao.fetchTopics()
			.then((resp) => {
				dispatch(receiveTopics(resp.topics));
			});	
	}
}