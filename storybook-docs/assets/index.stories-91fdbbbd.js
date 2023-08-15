import{s as d,j as e}from"./styled-components.browser.esm-f24d23a7.js";import{r as p}from"./index-76fb7be0.js";import"./tslib.es6-3d696b5f.js";import"./_commonjsHelpers-de833af9.js";const a=d.div`
	display: grid;
	grid-template-columns: repeat(${({childrenLength:r})=>r}, 1fr);
	grid-gap: 16px;
	width: 100%;

	${({theme:r})=>r.media.forPhoneOnly()} {
		grid-template-columns: 1fr;
	}
`,o=({children:r})=>e.jsx(a,{childrenLength:p.Children.count(r),children:r});try{o.displayName="InputGroup",o.__docgenInfo={description:"",displayName:"InputGroup",props:{}}}catch{}const x={title:"Components/Form/Input Group",component:o},c=r=>e.jsxs(o,{...r,children:[e.jsx("div",{children:"1"}),e.jsx("div",{children:"2"}),e.jsx("div",{children:"3"}),e.jsx("div",{children:"4"})]}),t=c.bind({});var s,n,i;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`args => <InputGroup {...args}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
    </InputGroup>`,...(i=(n=t.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};const g=["Default"];export{t as Default,g as __namedExportsOrder,x as default};
//# sourceMappingURL=index.stories-91fdbbbd.js.map
