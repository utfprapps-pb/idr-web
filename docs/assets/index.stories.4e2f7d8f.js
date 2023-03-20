var a=Object.defineProperty;var o=(t,r)=>a(t,"name",{value:r,configurable:!0});import{T as e}from"./index.3b7c3b66.js";import{j as n}from"./jsx-runtime.a7df798e.js";import{L as l}from"./Lock.esm.4ad8cfe4.js";import"./index.f103e93c.js";import"./styled-components.browser.esm.bdc0ae7d.js";import"./reset.338cab5e.js";import"./index.58019f6c.js";import"./iframe.fae062d7.js";const L={parameters:{storySource:{source:`import React from 'react'

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
//# sourceMappingURL=index.stories.4e2f7d8f.js.map
