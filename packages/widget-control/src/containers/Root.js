import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { withRedux } from 'shared-extensible-store';

import rootReducer, { arrive, leave } from '../redux';

import './Root.css';

const Root = ({ arrive, data: { heading, content }, leave }) => (
	<section>
		<h1>{heading}</h1>
		<p>{content}</p>
		<button onClick={arrive} className="btn-control">I am here</button>
		<button onClick={leave} className="btn-control">I have to go</button>
	</section>
);

Root.propTypes = {
	arrive: PropTypes.func,
	data: PropTypes.shape({
		heading: PropTypes.node,
		content: PropTypes.node,
	}),
	leave: PropTypes.func,
};

const mapStateToProps = state => ({
	present: state.control.present,
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
