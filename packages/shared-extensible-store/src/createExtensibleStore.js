import { createStore, compose, applyMiddleware } from 'redux';
import { BehaviorSubject } from 'rxjs';
import { mergeMap, takeUntil, filter } from 'rxjs/operators';
import { createEpicMiddleware, ofType } from 'redux-observable';
import { identity, forEach, toPairs, keys } from 'ramda';

import { emptyEpic, createReducer } from './utils';
import {
	ActionTypes,
	stopEpics,
	reducersInjected,
	reducersRemoved,
	// ensureValidStateStructure,
} from './actions';

export default function createExtensibleStore(
	preloadedState,
	middleware = [],
	composeEnhancers = compose
) {
	const epicMiddleware = createEpicMiddleware();

	const epic$ = new BehaviorSubject(['__emptyEpicId', emptyEpic]);

	const rootEpic = (action$, state$) =>
		epic$.pipe(
			mergeMap(([id, epic]) =>
				epic(action$, state$).pipe(
					takeUntil(
						action$.pipe(
							ofType(ActionTypes.STOP_EPICS),
							filter(action => action.payload.includes(id))
						)
					)
				)
			)
		);

	const asyncReducers = {};

	const store = createStore(
		identity,
		preloadedState,
		composeEnhancers(applyMiddleware(...middleware, epicMiddleware))
	);

	const injectReducers = reducers => {
		const reducerPairs = toPairs(reducers);
		forEach(
			([id, reducer]) => (store.asyncReducers[id] = reducer),
			reducerPairs
		);
		store.replaceReducer(createReducer(store.asyncReducers));

		// Must dispatch to let new reducers return their initial state
		store.dispatch(reducersInjected(keys(reducers)));
	};

	const removeReducers = reducerIds => {
		forEach(id => delete store.asyncReducers[id], reducerIds);
		// store.dispatch(ensureValidStateStructure());

		store.replaceReducer(createReducer(store.asyncReducers));
		store.dispatch(reducersRemoved(reducerIds));
	};

	const injectEpics = epics => {
		const epicPairs = toPairs(epics);
		forEach(epicPair => epic$.next(epicPair), epicPairs);
	};

	const removeEpics = epicIds => {
		store.dispatch(stopEpics(epicIds));
	};

	store.asyncReducers = asyncReducers;

	store.injectReducers = injectReducers;
	store.injectEpics = injectEpics;

	store.removeReducers = removeReducers;
	store.removeEpics = removeEpics;

	epicMiddleware.run(rootEpic);

	return store;
}
