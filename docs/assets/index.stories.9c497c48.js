var l=Object.defineProperty;var s=(e,o)=>l(e,"name",{value:o,configurable:!0});import{I as h,r as p,T as a}from"./index.1d24d3bd.js";import{a as i,F as n,j as t,r as k}from"./jsx-runtime.ba182e87.js";import"./styled-components.browser.esm.c296be4a.js";import"./index.c6dec4e6.js";import"./reset.5149fadc.js";import"./iframe.3819cdfe.js";var r=new Map;r.set("bold",function(e){return i(n,{children:[t("rect",{x:"40",y:"88",width:"176",height:"128",rx:"8",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}),t("path",{d:"M92,88V52a36,36,0,0,1,72,0V88",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}),t("circle",{cx:"128",cy:"152",r:"16"})]})});r.set("duotone",function(e){return i(n,{children:[t("rect",{x:"40",y:"88",width:"176",height:"128",rx:"8",opacity:"0.2"}),t("rect",{x:"40",y:"88",width:"176",height:"128",rx:"8",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),t("path",{d:"M92,88V52a36,36,0,0,1,72,0V88",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),t("circle",{cx:"128",cy:"152",r:"12"})]})});r.set("fill",function(){return t(n,{children:t("path",{d:"M208,80H172V52a44,44,0,0,0-88,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80Zm-80,84a12,12,0,1,1,12-12A12,12,0,0,1,128,164Zm28-84H100V52a28,28,0,0,1,56,0Z"})})});r.set("light",function(e){return i(n,{children:[t("rect",{x:"40",y:"88",width:"176",height:"128",rx:"8",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}),t("path",{d:"M92,88V52a36,36,0,0,1,72,0V88",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}),t("circle",{cx:"128",cy:"152",r:"10"})]})});r.set("thin",function(e){return i(n,{children:[t("rect",{x:"40",y:"88",width:"176",height:"128",rx:"8",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}),t("path",{d:"M92,88V52a36,36,0,0,1,72,0V88",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}),t("circle",{cx:"128",cy:"152",r:"8"})]})});r.set("regular",function(e){return i(n,{children:[t("rect",{x:"40",y:"88",width:"176",height:"128",rx:"8",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),t("path",{d:"M92,88V52a36,36,0,0,1,72,0V88",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),t("circle",{cx:"128",cy:"152",r:"12"})]})});var u=s(function(o,d){return p(o,d,r)},"renderPath"),c=k.exports.forwardRef(function(e,o){return t(h,{...Object.assign({ref:o},e,{renderPath:u})})});c.displayName="Lock";const f=c,W={parameters:{storySource:{source:`import React from 'react'

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
`,locationsMap:{default:{startLoc:{col:42,line:13},endLoc:{col:75,line:13},startBody:{col:42,line:13},endBody:{col:75,line:13}}}}},title:"Components/Text Field",component:a},x=s(e=>t(a,{...e}),"Template"),m=x.bind({});m.args={label:"Label Example",iconsStart:[t(f,{},"lock")]};const M=["Default"];export{m as Default,M as __namedExportsOrder,W as default};
//# sourceMappingURL=index.stories.9c497c48.js.map
