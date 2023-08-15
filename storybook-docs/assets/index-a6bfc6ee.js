import{s as r,j as o,c}from"./styled-components.browser.esm-f24d23a7.js";const l=r.header`
	grid-area: Header;
	background-color: ${({theme:e})=>e.colors.white};

	display: flex;
	align-items: center;
	justify-content: flex-end;

	padding: 24px 34px;
`,t=({children:e})=>o.jsx(l,{children:e});try{t.displayName="HeaderRoot",t.__docgenInfo={description:"",displayName:"HeaderRoot",props:{}}}catch{}const _=r.div`
	display: flex;
	align-items: center;

	gap: 12px;
	padding: 8px 16px 8px 8px;

	border-radius: 48px;
	background-color: ${({theme:e})=>e.colors.background};
`,a=({children:e})=>o.jsx(_,{children:e});try{a.displayName="HeaderUserContent",a.__docgenInfo={description:"",displayName:"HeaderUserContent",props:{}}}catch{}const n=({components:e,children:d})=>e.reduceRight((i,p)=>o.jsx(p,{children:i}),d);try{n.displayName="Compose",n.__docgenInfo={description:"",displayName:"Compose",props:{components:{defaultValue:null,description:"",name:"components",required:!0,type:{name:"Component[]"}}}}}catch{}const m=c`
	to {
		transform: rotate(360deg);
	}
`,g=r.section`
	&::before {
		content: '';
		display: block;
		width: ${({size:e})=>e}px;
		height: ${({size:e})=>e}px;
		animation: ${m} 0.9s infinite linear;
		border: 5px ${({theme:e})=>e.colors.primary} solid;
		border-left-color: ${({theme:e})=>e.colors.white};
		border-radius: 100%;
	}
`,s=({size:e=14})=>o.jsx(g,{size:e});try{s.displayName="Loading",s.__docgenInfo={description:"",displayName:"Loading",props:{size:{defaultValue:{value:"14"},description:"The loading size\n@example ```tsx\n<Loading size={20} />\n```",name:"size",required:!1,type:{name:"number"}}}}}catch{}export{t as H,a};
//# sourceMappingURL=index-a6bfc6ee.js.map
