import { Check, Info, ShieldAlert } from 'lucide-react'

import { Badge, type BadgeProps } from './badge'

import type { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Components/UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    children: 'Badge',
    variant: 'default',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
    asChild: {
      control: { type: 'boolean' },
    },
    className: {
      control: { type: 'text' },
    },
    children: {
      control: { type: 'text' },
    },
  },
} as Meta<typeof Badge>

type Story = StoryObj<typeof Badge>

export const Default: Story = {}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
}

export const WithIcon: Story = {
  render: (args: BadgeProps) => (
    <div className="flex gap-3 items-center flex-wrap">
      <Badge {...args}>
        <Check />
        Sucesso
      </Badge>
      <Badge variant="secondary" {...args}>
        <Info />
        Informação
      </Badge>
      <Badge variant="destructive" {...args}>
        <ShieldAlert />
        Erro
      </Badge>
    </div>
  ),
}

export const AsLink: Story = {
  args: {
    asChild: true,
  },
  render: (args: BadgeProps) => (
    <Badge {...args}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a href="#" onClick={(e) => e.preventDefault()}>
        Link como badge
      </a>
    </Badge>
  ),
}

export const LongText: Story = {
  args: {
    children:
      'Texto bem longo para verificar truncamento e nowrap do badge em diferentes larguras de container',
  },
}
