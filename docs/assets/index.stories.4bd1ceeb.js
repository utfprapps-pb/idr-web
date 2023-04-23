var a=Object.defineProperty;var o=(t,r)=>a(t,"name",{value:r,configurable:!0});import{T as e}from"./index.0d416f86.js";import{j as n}from"./jsx-runtime.486a830b.js";import{L as l}from"./Lock.esm.57a43e25.js";import"./index.24893020.js";import"./styled-components.browser.esm.84de3b29.js";import"./reset.623d3dc0.js";import"./index.9c6326b3.js";import"./iframe.5f6332f6.js";const L={parameters:{storySource:{source:`import React from 'react'

import { Meta, StoryFn } from '@storybook/react/'
import { Lock } from 'phosphor-react'

import { TextField, TextFieldProps } from '.'

export default {
	title: 'Components/Text Field',
	component: TextField
} as Meta

const Template: StoryFn<TextFieldProps> = (args) => <TextField {...args} />

export const Default = Template.bind({})
Default.args = {
	label: 'Label Example',
	iconsStart: [<Lock key="lock" />]
}
`,locationsMap:{default:{startLoc:{col:42,line:13},endLoc:{col:75,line:13},startBody:{col:42,line:13},endBody:{col:75,line:13}}}}},title:"Components/Text Field",component:e},i=o(t=>n(e,{...t}),"Template"),s=i.bind({});s.args={label:"Label Example",iconsStart:[n(l,{},"lock")]};const b=["Default"];export{s as Default,b as __namedExportsOrder,L as default};
//# sourceMappingURL=index.stories.4bd1ceeb.js.map
