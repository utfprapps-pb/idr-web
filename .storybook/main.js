const { mergeConfig, loadConfigFromFile } = require('vite')
const viteConfig = require('path').resolve(__dirname, '../vite.config.ts')

module.exports = {
	stories: [
		'../src/**/*.stories.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)',
		'../src/**/stories.@(js|jsx|ts|tsx)'
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions'
	],
	framework: '@storybook/react',
	core: {
		builder: '@storybook/builder-vite'
	},
	features: {
		storyStoreV7: true
	},
	async viteFinal(config) {
		const { config: userConfig } = await loadConfigFromFile(viteConfig)
		userConfig.base = './'
		return mergeConfig(config, {
			...userConfig
		})
	}
}
