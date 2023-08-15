import{j as e,s as t}from"./styled-components.browser.esm-f24d23a7.js";import{T as a}from"./index-78e7ff75.js";const n=({text:o})=>e.jsx(a,{size:"b3",color:"text",styles:{cursor:"pointer"},children:o});try{n.displayName="ActionsDropdownItem",n.__docgenInfo={description:"",displayName:"ActionsDropdownItem",props:{text:{defaultValue:null,description:"The text of the item\n@example ```tsx\n<ActionsDropdownItem text='My Item' />\n```",name:"text",required:!0,type:{name:"string"}}}}}catch{}const p=t.div`
	display: flex;
	align-items: center;
	padding: 12px;
	gap: 12px;

	cursor: pointer;

	&:hover {
		background-color: ${({theme:o})=>o.colors.lightgray};
	}
`,r=({children:o,onClick:s})=>e.jsx(p,{onClick:s,children:o});try{r.displayName="ActionsDropdownItemContainer",r.__docgenInfo={description:"",displayName:"ActionsDropdownItemContainer",props:{onClick:{defaultValue:null,description:`The function to be called when the item is clicked
@example \`\`\`tsx
const doSomething = () => {
	...
}

<ActionsDropdownItemContainer onClick={doSomething} />
\`\`\``,name:"onClick",required:!0,type:{name:"() => void"}}}}}catch{}const d=t.div`
	font-size: ${({theme:o})=>o.fontSizes.b3};
	color: ${({theme:o})=>o.colors.black};
`,c=({icon:o})=>e.jsx(d,{as:o});try{c.displayName="ActionsDropdownItemIcon",c.__docgenInfo={description:"",displayName:"ActionsDropdownItemIcon",props:{icon:{defaultValue:null,description:"",name:"icon",required:!0,type:{name:"ElementType<IconProps>"}}}}}catch{}const l=t.section`
	display: flex;
	flex-direction: column;

	width: max-content;

	background-color: ${({theme:o})=>o.colors.white};
	border-radius: 8px;
	box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
`,i=({children:o})=>e.jsx(l,{children:o});try{i.displayName="ActionsDropdownRoot",i.__docgenInfo={description:"",displayName:"ActionsDropdownRoot",props:{}}}catch{}export{i as A,r as a,n as b,c};
//# sourceMappingURL=index-41689f1d.js.map
