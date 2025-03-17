import { Meta, StoryFn } from '@storybook/react/'

import { Avatar } from '.'

type TemplateProps = {
  isFallback: boolean
}

export default {
  title: 'Components/UI/Avatar',
} as Meta

const Template: StoryFn<TemplateProps> = ({ isFallback }) => (
  <Avatar.Root>
    <Avatar.Image
      src={
        isFallback ? '' : 'https://avatars.githubusercontent.com/u/61752597?v=4'
      }
      alt="GitHub Profile Image"
    />
    <Avatar.Fallback>GM</Avatar.Fallback>
  </Avatar.Root>
)

export const AvatarWithImage = Template.bind({})
AvatarWithImage.args = {
  isFallback: false,
}

export const AvatarWithFallback = Template.bind({})
AvatarWithFallback.args = {
  isFallback: true,
}
