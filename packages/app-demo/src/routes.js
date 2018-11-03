import loadEmotion from 'widget-emotion';
import loadControl from 'widget-control';

export default [
	{
		path: 'emotion',
		getComponent(done) {
			loadEmotion(mod => done(mod.default));
		},
	},
	{
		path: 'control',
		getComponent(done) {
			loadControl(mod => done(mod.default));
		},
	},
];
