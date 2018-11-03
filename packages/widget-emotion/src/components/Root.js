import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { withRedux } from 'shared-extensible-store';

import cry from '../assets/cry.jpg';
import smile from '../assets/smile.jpg';

import './Root.css';

const Root = ({ message, present }) => (
	<section>
		<h2>{message}</h2>
		<img src={present ? smile : cry} className="emotion" />
	</section>
);

Root.propTypes = {
	message: PropTypes.string,
	present: PropTypes.bool,
};

const mapStateToProps = state => ({
	present: state && state.control ? state.control.present : undefined,
	message: state && state.control ? state.control.message : undefined,
});

export default compose(
	withRedux({}),
	connect(mapStateToProps)
)(Root);
