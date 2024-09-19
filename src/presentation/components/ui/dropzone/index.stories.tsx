import { Meta, StoryFn } from '@storybook/react/'

import { Dropzone } from '.'

export default {
	title: 'Components/UI/Dropzone'
} as Meta

const Template: StoryFn = () => (
	<Dropzone onChange={() => null} mimeType={['image/png']} />
)

export const Default = Template.bind({})
