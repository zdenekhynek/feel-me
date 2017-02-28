import React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';

export const Input = ({ topic }) => {
	console.log('topic');
	console.log(topic);
	const label = topic.get('label', '');

	return (
		<div>I want to feel ___ about {label}</div>
	);
}

Input.propTypes = {};

export function mapStateToProps(state) { //	state, ownProps
	const topics = state.topics;
	const topic = topics.get(0, Map());

	return { topic };
};

export const InputContainer = connect(mapStateToProps)(Input);