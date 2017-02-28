import { fromJS, List } from 'immutable';

import { RECEIVE_TOPICS } from './action_creators';

export default function(state = List(), action) {
	switch(action.type) {
		case RECEIVE_TOPICS:
			return fromJS(action.topics);
		default:
			return state;
	}
}