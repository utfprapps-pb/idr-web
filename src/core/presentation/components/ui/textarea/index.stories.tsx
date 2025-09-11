import { Textarea, type TextareaProps } from '.'

import type { Meta, StoryFn } from '@storybook/react/'

export default {
  title: 'Components/UI/Textarea',
  component: Textarea,
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when the textarea is empty.',
      defaultValue: 'Type here...',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Type here...' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the textarea input when true.',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
      },
    },
    isError: {
      control: 'boolean',
      description: 'Show error on text area when true.',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
      },
    },
    value: {
      control: 'text',
      description: 'The value of the textarea.',
      defaultValue: '',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    className: {
      control: 'text',
      description: 'Custom class names for additional styling.',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Callback function called when the textarea value changes.',
      table: {
        type: {
          summary: '(event: React.ChangeEvent<HTMLTextAreaElement>) => void',
        },
      },
    },
  },
} as Meta

const Template: StoryFn<TextareaProps> = (args) => <Textarea {...args} />

export const Default = Template.bind({})
Default.args = {
  placeholder: 'Type here...',
}

export const Disabled = Template.bind({})
Disabled.args = {
  placeholder: 'Not allowed',
  disabled: true,
}

export const WithValue = Template.bind({})
WithValue.args = {
  placeholder: 'Type here...',
  value: 'Pre-filled content',
  disabled: false,
}

export const ErrorState = Template.bind({})
ErrorState.args = {
  placeholder: 'Type here...',
  isError: true,
  value: 'This input has an error',
}
