import{j as d}from"./jsx-runtime-ffb262ed.js";import{r as s,R as w}from"./index-76fb7be0.js";import{c as N,a as R}from"./index-1abfe904.js";import{c as j}from"./index-f96983da.js";/**
 * @license lucide-react v0.320.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var _={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.320.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),I=(t,l)=>{const e=s.forwardRef(({color:n="currentColor",size:a=24,strokeWidth:c=2,absoluteStrokeWidth:u,className:r="",children:o,...f},m)=>s.createElement("svg",{ref:m,..._,width:a,height:a,stroke:n,strokeWidth:u?Number(c)*24/Number(a):c,className:["lucide",`lucide-${A(t)}`,r].join(" "),...f},[...l.map(([p,b])=>s.createElement(p,b)),...Array.isArray(o)?o:[o]]));return e.displayName=`${t}`,e};/**
 * @license lucide-react v0.320.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=I("AlertCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.320.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=I("XCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]),C=N`
	flex h-10 w-full
	rounded-md border border-slate-300
	py-2
	text-base text-slate-900 bg-white
	ring-offset-slate-400
	file:border-0 file:bg-transparent file:text-sm file:font-medium
	placeholder:text-slate-400
	focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400
	disabled:cursor-not-allowed disabled:opacity-50
`,q={isError:{true:N`border-destructive focus-visible:ring-0`,false:""}},E=j(C,{variants:q,defaultVariants:{isError:!1}}),O=(t,l=0)=>{const e=s.useRef(!1),n=s.useRef(),a=s.useRef(t),c=s.useCallback(()=>e.current,[]),u=s.useCallback(()=>{e.current=!1,clearTimeout(n.current),n.current=setTimeout(()=>{e.current=!0,a.current()},l)},[l]),r=s.useCallback(()=>{e.current=null,clearTimeout(n.current)},[]);return s.useEffect(()=>{a.current=t},[t]),s.useEffect(()=>(u(),r),[r,l,u]),{isReady:c,clear:r,set:u}},z=({fn:t,ms:l=0,deps:e=[]})=>{const{isReady:n,clear:a,set:c}=O(t,l);return s.useEffect(c,e),{isReady:n,clear:a}},k=28,v=8,$=({isError:t,iconsStart:l,iconsEnd:e,value:n,debounce:a=0,debounceCallback:c=()=>{},mask:u,onChange:r})=>{const o=s.useCallback(i=>{if(u){const y=u(i.target.value);return i.target.value=y,r==null?void 0:r(i)}return r==null?void 0:r(i)},[u,r]),{clear:f}=z({deps:[n],ms:a,fn:c}),m=s.useCallback(()=>{o({target:{value:""}}),f()},[f,o]),p=i=>i*k,b=(l==null?void 0:l.length)??0,g=(e==null?void 0:e.length)??0;return{paddingLeft:v+p(b),paddingRight:t?v+k+p(g):v+p(g),handleOnChange:o,handleOnClear:m}},h=w.forwardRef(({className:t,type:l,iconsStart:e=[],iconsEnd:n=[],isError:a,debounce:c=0,debounceCallback:u=()=>{},mask:r,...o},f)=>{const{paddingLeft:m,paddingRight:p,handleOnChange:b,handleOnClear:g}=$({iconsStart:e,iconsEnd:n,isError:a,debounce:c,debounceCallback:u,mask:r,...o});return d.jsxs("div",{className:"flex w-full relative items-center",children:[d.jsx("div",{className:"flex gap-1 absolute pl-2",children:e.map(({key:i,icon:y,onClick:x})=>d.jsx(y,{className:x?"cursor-pointer":"cursor-default",size:20,onClick:x},i))}),d.jsx("input",{type:l,style:{paddingLeft:`${m}px`,paddingRight:`${p}px`},className:R(C,t,E({isError:a})),ref:f,...o,onChange:b}),d.jsxs("div",{className:"flex gap-1 absolute pr-2 right-0",children:[n.map(({key:i,icon:y,onClick:x})=>d.jsx(y,{className:x?"cursor-pointer":"cursor-default",size:20,onClick:x},i)),c?d.jsx(V,{className:"cursor-pointer",size:20,onClick:g}):null,a?d.jsx(L,{className:"text-destructive",size:20}):null]})]})});h.displayName="Input";try{h.displayName="Input",h.__docgenInfo={description:"",displayName:"Input",props:{isError:{defaultValue:null,description:"",name:"isError",required:!1,type:{name:"boolean | null"}},iconsStart:{defaultValue:{value:"[]"},description:"",name:"iconsStart",required:!1,type:{name:"InputIcon[]"}},iconsEnd:{defaultValue:{value:"[]"},description:"",name:"iconsEnd",required:!1,type:{name:"InputIcon[]"}},debounce:{defaultValue:{value:"0"},description:"",name:"debounce",required:!1,type:{name:"number"}},debounceCallback:{defaultValue:{value:"() => {}"},description:"",name:"debounceCallback",required:!1,type:{name:"(() => void)"}},mask:{defaultValue:null,description:"",name:"mask",required:!1,type:{name:"((value: string) => string)"}}}}}catch{}export{h as I};
