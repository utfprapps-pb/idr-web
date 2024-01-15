import{s as x,j as a,n as g,J as z}from"./styled-components.browser.esm-f24d23a7.js";import{R as t,r}from"./index-76fb7be0.js";import{I as S,r as M}from"./IconBase.esm-c95bc69f.js";import"./index-41689f1d.js";import"./index-804a8b5c.js";import"./index-988ceaef.js";import"./index-cc0352a8.js";import{T as B}from"./index-78e7ff75.js";import"./index-36336389.js";var u=new Map;u.set("bold",function(e){return t.createElement(t.Fragment,null,t.createElement("circle",{cx:"128",cy:"128",r:"96",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}),t.createElement("line",{x1:"128",y1:"80",x2:"128",y2:"132",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"24"}),t.createElement("circle",{cx:"128",cy:"172",r:"16"}))});u.set("duotone",function(e){return t.createElement(t.Fragment,null,t.createElement("circle",{cx:"128",cy:"128",r:"96",opacity:"0.2"}),t.createElement("circle",{cx:"128",cy:"128",r:"96",fill:"none",stroke:e,strokeMiterlimit:"10",strokeWidth:"16"}),t.createElement("line",{x1:"128",y1:"80",x2:"128",y2:"136",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),t.createElement("circle",{cx:"128",cy:"172",r:"12"}))});u.set("fill",function(){return t.createElement(t.Fragment,null,t.createElement("path",{d:"M128,24A104,104,0,1,0,232,128,104.2,104.2,0,0,0,128,24Zm-8,56a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm8,104a12,12,0,1,1,12-12A12,12,0,0,1,128,184Z"}))});u.set("light",function(e){return t.createElement(t.Fragment,null,t.createElement("circle",{cx:"128",cy:"128",r:"96",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}),t.createElement("line",{x1:"128",y1:"80",x2:"128",y2:"136",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"12"}),t.createElement("circle",{cx:"128",cy:"172",r:"10"}))});u.set("thin",function(e){return t.createElement(t.Fragment,null,t.createElement("circle",{cx:"128",cy:"128",r:"96",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}),t.createElement("line",{x1:"128",y1:"80",x2:"128",y2:"136",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"8"}),t.createElement("circle",{cx:"128",cy:"172",r:"8"}))});u.set("regular",function(e){return t.createElement(t.Fragment,null,t.createElement("circle",{cx:"128",cy:"128",r:"96",fill:"none",stroke:e,strokeMiterlimit:"10",strokeWidth:"16"}),t.createElement("line",{x1:"128",y1:"80",x2:"128",y2:"136",fill:"none",stroke:e,strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"16"}),t.createElement("circle",{cx:"128",cy:"172",r:"12"}))});var D=function(n,o){return M(n,o,u)},V=r.forwardRef(function(e,n){return t.createElement(S,Object.assign({ref:n},e,{renderPath:D}))});V.displayName="WarningCircle";const O=V,A=x.section`
	display: flex;
	flex-direction: column;

	width: 100%;
	gap: 4px;
`,C=({children:e})=>a.jsx(A,{children:e});try{C.displayName="TextFieldRoot",C.__docgenInfo={description:"",displayName:"TextFieldRoot",props:{}}}catch{}const w=r.createContext({}),$=({children:e,value:n,onChange:o,error:d,touched:i,mask:s,validator:m,validationDependency:b})=>{const E=r.useRef(null),I=r.useRef(null),[p,f]=r.useState(d??""),[c,h]=r.useState(i),l=r.useCallback(()=>m&&c&&f(m()),[c,f,m]);r.useEffect(()=>{l()},[n,b,l]),r.useEffect(()=>{i!==void 0&&c!==i&&h(i)},[i,c]),r.useEffect(()=>{c&&l()},[l,c]);const _=r.useCallback(q=>{h(!0),l();const P=s?s(q.target.value):q.target.value;o&&o(P)},[l,s,o]),y=r.useCallback(()=>{h(!0),l()},[l]),T=r.useMemo(()=>({actionsContainerLeftRef:E,actionsContainerRightRef:I,value:n,error:p,handleOnChange:_,handleOnBlur:y}),[n,p,_,y]);return a.jsx(w.Provider,{value:T,children:a.jsx(C,{children:e})})},F=()=>r.useContext(w);try{$.displayName="TextFieldProvider",$.__docgenInfo={description:"",displayName:"TextFieldProvider",props:{value:{defaultValue:null,description:"The value of the text field\n@example ```tsx\n<TextFieldInput value='Value' />\n```",name:"value",required:!0,type:{name:"string"}},onChange:{defaultValue:null,description:"The function that will be called when the value of the text field changes\n@example ```tsx\n<TextFieldInput onChange={value => console.log(value)} />\n```",name:"onChange",required:!0,type:{name:"(value: string) => void"}},error:{defaultValue:{value:"''"},description:"The error of the text field\n@example ```tsx\n<TextField error='This field is required' />\n```",name:"error",required:!1,type:{name:"string"}},touched:{defaultValue:{value:"false"},description:"The touched state of the text field\n@example ```tsx\n<TextFieldInput touched />\n```",name:"touched",required:!1,type:{name:"boolean"}},mask:{defaultValue:null,description:"The mask of the text field\n@example ```tsx\n<TextFieldInput mask={value => value.toUpperCase()} />\n```",name:"mask",required:!1,type:{name:"((value: string) => string)"}},validator:{defaultValue:null,description:"The validator of the text field\n@example ```tsx\n<TextFieldInput validator={() => 'This field is required'} />\n```",name:"validator",required:!1,type:{name:"(() => string)"}},validationDependency:{defaultValue:null,description:"The dependency of the validator of the text field.\nThis is used to revalidate the text field when the dependency changes\n@example ```tsx\n<TextFieldInput validator={() => 'This field is required'} validationDependency={value} />\n```",name:"validationDependency",required:!1,type:{name:"any"}}}}}catch{}const U=x.span`
	${({theme:{colors:e,fontFamily:n,fontSizes:o}})=>g`
		color: ${e.error};

		font-family: ${n.primary};
		font-size: ${o.b4};
	`}

	text-align: end;
	font-weight: 400;
`,L=()=>{const{error:e}=F();return a.jsx(U,{children:e})};try{L.displayName="TextFieldError",L.__docgenInfo={description:"",displayName:"TextFieldError",props:{}}}catch{}const Z=x.div`
	display: flex;
	align-items: center;
	justify-content: center;

	color: ${({theme:e})=>e.colors.darkgray};
	font-size: ${({theme:e})=>e.fontSizes.b2};
`,v=({icon:e,onClick:n})=>{const{colors:o}=z(),{error:d}=F();return a.jsx(Z,{as:e,onClick:n,style:{cursor:n?"pointer":"default",color:d&&o.error}})};try{v.displayName="TextFieldIcon",v.__docgenInfo={description:"",displayName:"TextFieldIcon",props:{icon:{defaultValue:null,description:"The icon to be rendered.\n@example ```tsx\n<TextFieldIcon icon={UserCircle} />\n```",name:"icon",required:!0,type:{name:"ElementType<IconProps>"}},onClick:{defaultValue:null,description:"The function that be called when click on icon.\n@example ```tsx\n<TextFieldIcon icon={UserCircle} onClick={() => alert('Hello World!')} />\n```",name:"onClick",required:!1,type:{name:"(() => void)"}}}}}catch{}const J=x.div`
	display: flex;
	width: max-content;
	gap: 4px;
	position: absolute;
	padding: 8px;

	${({position:e})=>e}: 0;
`,R=({children:e,position:n="left",isWithError:o=!1})=>{const{actionsContainerLeftRef:d,actionsContainerRightRef:i,error:s}=F();return a.jsxs(J,{ref:n==="left"?d:i,hasError:!!s,position:n,children:[e,s&&o&&a.jsx(v,{icon:O})]})};try{R.displayName="TextFieldIcons",R.__docgenInfo={description:"",displayName:"TextFieldIcons",props:{position:{defaultValue:{value:"left"},description:"",name:"position",required:!1,type:{name:"enum",value:[{value:'"left"'},{value:'"right"'}]}},isWithError:{defaultValue:{value:"false"},description:"",name:"isWithError",required:!1,type:{name:"boolean"}}}}}catch{}const G=x.input`
	background-color: ${({theme:e})=>e.colors.white};
	border: 1px solid
		${({hasError:e,theme:n})=>e?n.colors.error:n.colors.darkgray};
	border-radius: 4px;
	box-sizing: border-box;

	color: ${({theme:e})=>e.colors.text};

	font-size: ${({theme:e})=>e.fontSizes.b3};
	font-weight: ${({theme:e})=>e.fontWeights.regular};
	font-family: ${({theme:e})=>e.fontFamily.primary};

	height: 44px;
	width: 100%;

	outline: none;

	${({paddingLeft:e,paddingRight:n})=>g`
		padding: 0 ${n}px 0 ${e}px;
	`}

	${({hasError:e,theme:n})=>!e&&g`
			&:active,
			&:focus {
				border: 2px solid ${n.colors.primary};
				box-shadow: inset 0px 4px 5px rgba(33, 1, 38, 0.03);
			}
		`}

	&:disabled {
		${({theme:e})=>g`
			background-color: ${e.colors.disabled.background};
			border: 1px solid ${e.colors.disabled.border};
		`}
	}

	&::placeholder {
		${({theme:e})=>g`
			color: ${e.colors.gray};
			font-size: ${e.fontSizes.b3};
			font-weight: ${e.fontWeights.light};
			font-family: ${e.fontFamily.primary};
		`}
	}
`,k=16,W=e=>{const{disabled:n=!1,placeholder:o,type:d="text"}=e,{actionsContainerLeftRef:i,actionsContainerRightRef:s,value:m,error:b,handleOnBlur:E,handleOnChange:I}=F(),p=r.useRef(k),f=r.useRef(k),[c,h]=r.useState(p.current),[l,_]=r.useState(f.current);return r.useLayoutEffect(()=>{var y,T;p.current=((y=i.current)==null?void 0:y.offsetWidth)??k,f.current=((T=s.current)==null?void 0:T.offsetWidth)??k,h(p.current),_(f.current)},[i,s]),a.jsx(G,{value:m,type:d,disabled:n,placeholder:o,hasError:!!b,paddingLeft:c,paddingRight:l,onChange:I,onBlur:E})};try{W.displayName="TextFieldInput",W.__docgenInfo={description:"",displayName:"TextFieldInput",props:{type:{defaultValue:{value:"'text'"},description:"The type of the text field\n@example ```tsx\n<TextFieldInput type='password' />\n```",name:"type",required:!1,type:{name:"enum",value:[{value:'"text"'},{value:'"password"'}]}},placeholder:{defaultValue:null,description:"The placeholder of the text field\n@example ```tsx\n<TextFieldInput placeholder='Example of placeholder />",name:"placeholder",required:!1,type:{name:"string"}},disabled:{defaultValue:{value:"false"},description:"The disable condition of the Text field\n@example ```tsx\n<TextFieldInput disabled={true} />",name:"disabled",required:!1,type:{name:"boolean"}}}}}catch{}const H=x.div`
	display: flex;
	align-items: center;
	position: relative;
`,j=({children:e})=>a.jsx(H,{children:e});try{j.displayName="TextFieldInputContainer",j.__docgenInfo={description:"",displayName:"TextFieldInputContainer",props:{}}}catch{}const N=({label:e})=>a.jsx(B,{size:"b3",color:"text",children:e});try{N.displayName="TextFieldLabel",N.__docgenInfo={description:"",displayName:"TextFieldLabel",props:{label:{defaultValue:null,description:"The label of the text field\n@example ```tsx\n<TextField label='Email' />\n```",name:"label",required:!0,type:{name:"string"}}}}}catch{}const ie={Root:$,Error:L,Label:N,Input:W,Icons:R,Icon:v,InputContainer:j};export{ie as T};
//# sourceMappingURL=index-12816d64.js.map
