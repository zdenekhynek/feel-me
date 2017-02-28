import React from 'react';
import { render } from 'react-dom'; 
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import makeStore from './store';
import { fetchTopics } from './topics/action_creators';
import { InputContainer } from './input/input.jsx';

class App extends React.Component {
  render () {
    return (
    	<div>
    		<InputContainer />
    	</div>
    );
  }
}

let store = makeStore();

render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('app')
);

store.dispatch(fetchTopics());