import{s as a,n,j as c}from"./styled-components.browser.esm-f24d23a7.js";import{r as s}from"./index-76fb7be0.js";import{l as t,t as e,d as i}from"./reset-aecc4ab1.js";const x=a.button`
	display: flex;
	align-items: center;
	justify-content: center;

	position: relative;

	cursor: pointer;

	font-size: ${({theme:o})=>o.fontSizes.b3};
	font-family: ${({theme:o})=>o.fontFamily.primary};

	border: none;
	border-radius: 8px;

	width: 100%;

	padding: 12px 24px;

	${({buttonTheme:o,disabled:r})=>n`
		color: ${o.color};
		background: ${o.background};
		border: ${o.border};

		${!r&&n`
			&:hover {
				background: ${o.backgroundHover};
			}
		`};
	`}

	${({disabled:o,theme:r})=>o&&n`
			color: ${r.colors.disabled.text};
			background-color: ${r.colors.disabled.background};
			border: 1px solid ${r.colors.disabled.border};
			cursor: not-allowed;
		`}
`,h={primary:{color:t({color:e.colors.white}),background:t({color:e.colors.primary}),backgroundHover:e.colors.primary},outline:{color:e.colors.primary,background:e.colors.white,backgroundHover:i({color:e.colors.white,percentage:.05}),border:`1px solid ${e.colors.primary}`},text:{color:e.colors.primary,background:"transparent",backgroundHover:i({color:e.colors.white,percentage:.05})},success:{color:t({color:e.colors.white}),background:e.colors.secondary,backgroundHover:t({color:e.colors.secondary,percentage:.2})},error:{color:t({color:e.colors.white}),background:e.colors.error,backgroundHover:t({color:e.colors.error,percentage:.2})}},d=s.forwardRef(({children:o,disabled:r=!1,theme:l="primary",type:m="button",onClick:b=()=>null,...y},f)=>{const g=s.useMemo(()=>h[l],[l]);return c.jsx(x,{buttonTheme:g,ref:f,type:m,disabled:r,onClick:b,...y,children:o})});try{d.displayName="ButtonContainer",d.__docgenInfo={description:"",displayName:"ButtonContainer",props:{onClick:{defaultValue:{value:"() => null"},description:`The onClick function of the button
@example \`\`\`tsx
const doSomething = () => {
	...
}

<Button onClick={doSomething} />
\`\`\``,name:"onClick",required:!1,type:{name:"(() => void)"}},disabled:{defaultValue:{value:"false"},description:"The disable condition of the button\n@example ```tsx\n<Button disabled />\n```",name:"disabled",required:!1,type:{name:"boolean"}},type:{defaultValue:{value:"button"},description:"The type of the button\n@example ```tsx\n<Button type='button' />\n```",name:"type",required:!1,type:{name:"enum",value:[{value:'"button"'},{value:'"submit"'}]}},theme:{defaultValue:{value:"primary"},description:"The theme of the button\n@example ```tsx\n<Button theme='primary' />\n```",name:"theme",required:!1,type:{name:"enum",value:[{value:'"primary"'},{value:'"text"'},{value:'"error"'},{value:'"outline"'},{value:'"success"'}]}}}}}catch{}const _=a.div`
	font-size: ${({theme:o})=>o.fontSizes.b2};
	margin: 0 4px;
`,u=({icon:o})=>c.jsx(_,{as:o});try{u.displayName="ButtonIcon",u.__docgenInfo={description:"",displayName:"ButtonIcon",props:{icon:{defaultValue:null,description:"",name:"icon",required:!0,type:{name:"ElementType"}}}}}catch{}const v=a.section`
	display: flex;
	justify-content: center;
	width: 100%;
`,p=({children:o})=>c.jsx(v,{children:o});try{p.displayName="ButtonRoot",p.__docgenInfo={description:"",displayName:"ButtonRoot",props:{}}}catch{}export{p as B,d as a,u as b};
//# sourceMappingURL=index-988ceaef.js.map
