module.exports = {
	stories: [
		'../**/*.stories.mdx',
		'../**/*.stories.@(js|jsx|ts|tsx)',
		'../**/stories.@(js|jsx|ts|tsx)'
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions'
	],
	framework: {
		name: '@storybook/react-vite',
		options: {}
	},
	features: {
		storyStoreV7: true
	},
	docs: {
		autodocs: true
	}
}
