import { prefixedValueMirror } from 'shared-utils';
// import { makeSimpleActionCreator, makeConstantActionCreator } from 'lnd-cardif-redux-actions';

export const ActionTypes = prefixedValueMirror(
	'@@vwg-skoda-b2e-extensible-store'
)([
	'STOP_EPICS',
	'REDUCERS_INJECTED',
	'REDUCERS_REMOVED',
	// 'ENSURE_VALID_STATE_STRUCTURE',
]);

export const stopEpics = ids => ({
	type: ActionTypes.STOP_EPICS,
	payload: ids,
});

export const reducersInjected = ids => ({
	type: ActionTypes.REDUCERS_INJECTED,
	payload: ids,
});

export const reducersRemoved = ids => ({
	type: ActionTypes.REDUCERS_REMOVED,
	payload: ids,
});

// export const ensureValidStateStructure = makeConstantActionCreator(
// 	ActionTypes.ENSURE_VALID_STATE_STRUCTURE
// );
