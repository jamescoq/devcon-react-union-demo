import { prefixedValueMirror } from 'shared-utils';

export const ACTION_TYPES = prefixedValueMirror('control')(['ARRIVE', 'LEAVE']);

export const arrive = () => ({
	type: ACTION_TYPES.ARRIVE,
});

export const leave = () => ({
	type: ACTION_TYPES.LEAVE,
});

const rootReducer = (state = { present: false, message: 'Not there yet' }, action) => {
	switch (action.type) {
		case ACTION_TYPES.ARRIVE:
			return { present: true, message: 'Finally here' };
		case ACTION_TYPES.LEAVE:
			return { present: false, message: 'By by DEVCON' };
		default:
			return state;
	}
};

export default rootReducer;
