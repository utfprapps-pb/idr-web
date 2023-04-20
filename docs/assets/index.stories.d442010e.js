var a=Object.defineProperty;var o=(t,r)=>a(t,"name",{value:r,configurable:!0});import{T as e}from"./index.5f72e50d.js";import{j as n}from"./jsx-runtime.6092e680.js";import{L as l}from"./Lock.esm.e7f61654.js";import"./index.24105264.js";import"./styled-components.browser.esm.94ce6fb2.js";import"./reset.aa460e6b.js";import"./index.69d35f74.js";import"./iframe.54871c50.js";const L={parameters:{storySource:{source:`import React from 'react'

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
//# sourceMappingURL=index.stories.d442010e.js.map
