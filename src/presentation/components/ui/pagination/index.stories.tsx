import { Meta, StoryFn } from '@storybook/react/'

import { Pagination } from '.'

export default {
  title: 'Components/UI/Pagination',
} as Meta

const Template: StoryFn = () => (
  <Pagination.Root>
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.Previous href="#" />
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Link href="#">1</Pagination.Link>
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Ellipsis />
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Next href="#" />
      </Pagination.Item>
    </Pagination.Content>
  </Pagination.Root>
)

export const Default = Template.bind({})
