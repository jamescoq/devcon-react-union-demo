import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { withRedux } from 'shared-extensible-store';

import rootReducer, { arrive, leave } from '../redux';

import './Root.css';

const Root = ({ arrive, data: { content, heading }, leave, message }) => (
	<section>
		<h1>{heading}</h1>
		<p>{content}</p>
		<p>{`Status: ${message}`}</p>
		<button onClick={arrive} className="btn-control">
			I am here
		</button>
		<button onClick={leave} className="btn-control">
			I have to go
		</button>
	</section>
);

Root.propTypes = {
	arrive: PropTypes.func,
	data: PropTypes.shape({
		heading: PropTypes.node,
		content: PropTypes.node,
	}),
	leave: PropTypes.func,
	message: PropTypes.string,
};

const mapStateToProps = state => ({
	message: state.control.message,
});

const mapDispatchToProps = { arrive, leave };

export default compose(
	withRedux({
		reducers: { control: rootReducer },
	}),
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(Root);
