import { Meta, StoryFn } from '@storybook/react/'

import { Dropzone } from '.'

export default {
	title: 'Components/UI/Dropzone'
} as Meta

const Template: StoryFn = () => (
	<Dropzone
		files={[]}
		onChange={(files) => {
			console.info('files', files)
		}}
		mimeType={['image/png']}
	/>
)

export const Default = Template.bind({})
