import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { withRedux } from 'shared-extensible-store';

import cry from '../assets/cry.jpg';
import smile from '../assets/smile.jpg';

import './Root.css';

const Root = ({ present }) => (
	<section>
		<img src={present ? smile : cry} className="emotion" />
	</section>
);

Root.propTypes = {
	present: PropTypes.bool,
};

const mapStateToProps = state => ({
	present: state && state.control ? state.control.present : undefined,
});

export default compose(
	withRedux({}),
	connect(mapStateToProps)
)(Root);

