import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import PropTypes from 'prop-types';

import { Provider as ContextProvider } from './context';

export default function Provider({ store, ...otherProps }) {
	return (
		<ContextProvider value={store}>
			<ReduxProvider store={store} {...otherProps} />
		</ContextProvider>
	);
}

Provider.propTypes = {
	store: PropTypes.object.isRequired,
};
