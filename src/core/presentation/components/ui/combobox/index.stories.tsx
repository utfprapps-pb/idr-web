import { Meta, StoryFn } from '@storybook/react/'

import { Combobox, type ComboboxProps } from '.'

import type { Option } from '@/core/domain/types'

export default {
  title: 'Components/UI/Combobox',
} as Meta

const Template: StoryFn<ComboboxProps> = (args: ComboboxProps) => (
  <Combobox {...args} />
)

export const Default = Template.bind({})
Default.args = {
  handleSelect: (value: Option) => {
    // eslint-disable-next-line no-alert
    alert(`value ${value}`)
  },

  items: [
    {
      value: '1',
      label: 'Um',
    },
    {
      value: '2',
      label: 'Dois',
    },
    {
      value: '3',
      label: 'Três',
    },
  ],
}
