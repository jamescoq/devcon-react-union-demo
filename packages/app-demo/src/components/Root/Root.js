import React from 'react';
import { Union } from 'react-union';
import { Provider as StoreProvider } from 'shared-extensible-store';

import routes from '../../routes';
import configureStore from '../../store/configureStore';

import './Root.css';

const store = configureStore();

const Root = () => (
	<StoreProvider store={store}>
		<Union routes={routes} strictMode={false} />
	</StoreProvider>
);

export default Root;
