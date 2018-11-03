import prefixedValueMirror from './prefixedValueMirror';

describe('prefixedValueMirror', () => {
	it('prefixes and array of strings correctly producing an object of mirrored keys and values', () => {
		expect(prefixedValueMirror('myPrefix', ['VALUE1', 'VALUE2'])).toEqual({
			VALUE1: 'myPrefix/VALUE1',
			VALUE2: 'myPrefix/VALUE2',
		});
	});
	it('retuns an empty object when array of values is empty', () => {
		expect(prefixedValueMirror('prefix', [])).toEqual({});
	});
});
