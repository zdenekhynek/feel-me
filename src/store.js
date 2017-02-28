import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

export default function makeStore() {
	// Note: this API requires redux@>=3.1.0
	const store = createStore(
	  reducers,
	  applyMiddleware(thunk)
	);
	
	return store;
}