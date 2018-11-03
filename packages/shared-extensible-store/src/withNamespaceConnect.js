import React from 'react';
import { connect } from 'react-redux';
import { getDisplayName } from 'shared-utils';
import PropTypes from 'prop-types';

const withNamespaceConnect = ({ createMapStateToProps, createMapDispatchToProps }) => Component => {
	function WithNamespaceConnected({ props }) {
		const { actions, namespace } = props;
		const Connected = connect(
			createMapStateToProps(namespace),
			createMapDispatchToProps(actions)
		)(Component);

		return <Connected {...props} />;
	}

	WithNamespaceConnected.propTypes = {
		actions: PropTypes.object.isRequired,
		namespace: PropTypes.string.isRequired,
	};

	WithNamespaceConnected.displayName = `WithNamespaceConnected(${getDisplayName(Component)})`;

	return WithNamespaceConnected;
};

export default withNamespaceConnect;
