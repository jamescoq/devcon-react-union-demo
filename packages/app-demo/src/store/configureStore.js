import { createExtensibleStore } from 'shared-extensible-store';

import { name, version } from '../../package.json';

const configureStore = preloadedState => {
	let composeEnhancers;

	if (__DEV__) {
		composeEnhancers = require('redux-devtools-extension/developmentOnly').composeWithDevTools({
			name: `${name}@${version}`,
		});
	}

	return createExtensibleStore(preloadedState, [], composeEnhancers);
};

export default configureStore;
