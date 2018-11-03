import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getDisplayName } from 'shared-utils';

export default function withNamespace({ actionAndReducerWithNamespace, createEpicsWithNamespace }) {
	return NextComponent => {
		class WithNamespace extends Component {
			static propTypes = {
				namespace: PropTypes.string.isRequired,
			};

			static defaultProps = {};

			static displayName = `WithNamespace(${getDisplayName(NextComponent)})`;

			constructor(props, context) {
				super(props, context);
			}

			render() {
				const { namespace } = this.props;

				const { reducer, actions, actionTypes } = actionAndReducerWithNamespace(namespace);

				const epics = {
					[namespace]: createEpicsWithNamespace(actions, actionTypes),
				};
				const reducers = { [namespace]: reducer };

				return (
					<NextComponent
						{...this.props}
						actions={actions}
						namespace={namespace}
						epics={epics}
						reducers={reducers}
					/>
				);
			}
		}

		return WithNamespace;
	};
}
