import { Meta, StoryFn } from '@storybook/react/'

import { Table } from '.'

export default {
  title: 'Components/UI/Table',
} as Meta

const Template: StoryFn = () => (
  <Table.Root>
    <Table.Caption>A list of your recent invoices.</Table.Caption>
    <Table.Header>
      <Table.Row>
        <Table.Head className="w-[100px]">Invoice</Table.Head>
        <Table.Head>Status</Table.Head>
        <Table.Head>Method</Table.Head>
        <Table.Head className="text-right">Amount</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell className="font-medium">INV001</Table.Cell>
        <Table.Cell>Paid</Table.Cell>
        <Table.Cell>Credit Card</Table.Cell>
        <Table.Cell className="text-right">$250.00</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table.Root>
)

export const Default = Template.bind({})
