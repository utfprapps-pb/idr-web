var a=Object.defineProperty;var o=(t,r)=>a(t,"name",{value:r,configurable:!0});import{B as n}from"./index.bbf5a926.js";import{j as e}from"./jsx-runtime.8b7a82ff.js";import{L as s}from"./Lock.esm.74c99769.js";import"./styled-components.browser.esm.83f34480.js";import"./reset.9911dcd3.js";import"./iframe.ad0c0696.js";const x={parameters:{storySource:{source:`import React from 'react'

import { Meta, StoryFn } from '@storybook/react/'
import { Lock } from 'phosphor-react'

import { Button, ButtonProps } from '.'

export default {
	title: 'Components/Button',
	component: Button
} as Meta

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
	children: 'Label Example',
	icon: <Lock />
}
`,locationsMap:{default:{startLoc:{col:39,line:13},endLoc:{col:69,line:13},startBody:{col:39,line:13},endBody:{col:69,line:13}}}}},title:"Components/Button",component:n},p=o(t=>e(n,{...t}),"Template"),c=p.bind({});c.args={children:"Label Example",icon:e(s,{})};const L=["Default"];export{c as Default,L as __namedExportsOrder,x as default};
//# sourceMappingURL=index.stories.a9c2ac11.js.map
