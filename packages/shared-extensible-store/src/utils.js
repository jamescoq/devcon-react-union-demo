import { ignoreElements } from 'rxjs/operators';
import { identity, keys, pickBy, isEmpty, curry, head, split, o } from 'ramda';
import { mapKeys } from 'ramda-extension';
import { combineReducers } from 'redux';

import { ActionTypes } from './actions';

export const emptyEpic = action$ => action$.pipe(ignoreElements());

export const SUFFIX_DELIMITER = '__id:';

const suffix = curry((id, value) => `${value}${SUFFIX_DELIMITER}${id}`);

export const suffixKeys = id => mapKeys(o(suffix, String)(id));

export const removeSuffixFromKeys = mapKeys(o(head, split(SUFFIX_DELIMITER)));

export const createReducer = rawAsyncReducers => (state, action) => {
	const asyncReducers = removeSuffixFromKeys(rawAsyncReducers);

	if (action && action.type === ActionTypes.ENSURE_VALID_STATE_STRUCTURE) {
		return pickBy((value, key) => keys(asyncReducers).includes(key), state);
	} else {
		const reducer = isEmpty(asyncReducers)
			? identity
			: combineReducers({ ...asyncReducers });
		return reducer(state, action);
	}
};
