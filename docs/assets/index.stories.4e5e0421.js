var a=Object.defineProperty;var o=(t,r)=>a(t,"name",{value:r,configurable:!0});import{T as e}from"./index.bd1ba45d.js";import{j as n}from"./jsx-runtime.8b7a82ff.js";import{L as l}from"./Lock.esm.74c99769.js";import"./index.bbf5a926.js";import"./styled-components.browser.esm.83f34480.js";import"./reset.9911dcd3.js";import"./index.5b582071.js";import"./iframe.ad0c0696.js";const L={parameters:{storySource:{source:`import React from 'react'

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
//# sourceMappingURL=index.stories.4e5e0421.js.map
