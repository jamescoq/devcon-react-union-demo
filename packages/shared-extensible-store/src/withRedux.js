import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { o, keys, mergeAll } from 'ramda';
import { getDisplayName } from 'shared-utils';

import { suffixKeys } from './utils';
import { Consumer } from './context';

function withStoreContext(Component) {
	function WithStoreContext(props) {
		return (
			<Consumer>
				{store => <Component {...props} store={store} />}
			</Consumer>
		);
	}

	WithStoreContext.displayName = `WithStoreContext(${getDisplayName(
		Component
	)})`;
	return WithStoreContext;
}

export default function withRedux({ epics, reducers }) {
	return NextComponent => {
		class WithRedux extends Component {
			static propTypes = {
				epics: PropTypes.object,
				reducers: PropTypes.object,
				store: PropTypes.object.isRequired,
			};

			static defaultProps = {
				epics: {},
				reducers: {},
			};

			static displayName = `WithRedux(${getDisplayName(NextComponent)})`;

			static counter = 0;

			constructor(props) {
				super(props);
				this.id = WithRedux.counter++;
				this.props.store.injectReducers(this.reducers);
				this.props.store.injectEpics(this.epics);
			}

			componentWillUnmount() {
				this.props.store.removeReducers(keys(this.reducers));
				this.props.store.removeEpics(keys(this.epics));
			}

			suffixReduxDependencies = dependencies =>
				o(suffixKeys(this.id), mergeAll)(dependencies);

			get reducers() {
				return this.suffixReduxDependencies([
					reducers,
					this.props.reducers,
				]);
			}

			get epics() {
				return this.suffixReduxDependencies([epics, this.props.epics]);
			}

			render() {
				return <NextComponent {...this.props} />;
			}
		}

		return withStoreContext(WithRedux);
	};
}
