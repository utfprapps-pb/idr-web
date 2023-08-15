import{s as g,j as c,n as $}from"./styled-components.browser.esm-f24d23a7.js";import{r as f}from"./index-76fb7be0.js";import{N as O,s as P,u as T,a as F,b as z,c as K,d as v}from"./index-5714bb06.js";import{l as q,d as B}from"./reset-aecc4ab1.js";import"./index-41689f1d.js";import"./index-804a8b5c.js";import"./index-988ceaef.js";import"./index-a6bfc6ee.js";import{T as V}from"./index-78e7ff75.js";import"./index-36336389.js";const W=g.div`
	position: relative;
`,M=({children:e})=>c.jsx(W,{children:e});try{M.displayName="MenuContainer",M.__docgenInfo={description:"",displayName:"MenuContainer",props:{}}}catch{}/**
 * React Router DOM v6.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function y(){return y=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},y.apply(this,arguments)}function A(e,t){if(e==null)return{};var o={},r=Object.keys(e),a,i;for(i=0;i<r.length;i++)a=r[i],!(t.indexOf(a)>=0)&&(o[a]=e[a]);return o}function D(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function G(e,t){return e.button===0&&(!t||t==="_self")&&!D(e)}const H=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset"],X=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",J=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Q=f.forwardRef(function(t,o){let{onClick:r,relative:a,reloadDocument:i,replace:l,state:d,target:p,to:n,preventScrollReset:u}=t,_=A(t,H),{basename:j}=f.useContext(O),h,x=!1;if(typeof n=="string"&&J.test(n)&&(h=n,X))try{let s=new URL(window.location.href),m=n.startsWith("//")?new URL(s.protocol+n):new URL(n),b=P(m.pathname,j);m.origin===s.origin&&b!=null?n=b+m.search+m.hash:x=!0}catch{}let C=T(n,{relative:a}),U=Y(n,{replace:l,state:d,target:p,preventScrollReset:u,relative:a});function E(s){r&&r(s),s.defaultPrevented||U(s)}return f.createElement("a",y({},_,{href:h||C,onClick:x||i?r:E,ref:o,target:p}))});var I;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher"})(I||(I={}));var w;(function(e){e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(w||(w={}));function Y(e,t){let{target:o,replace:r,state:a,preventScrollReset:i,relative:l}=t===void 0?{}:t,d=F(),p=z(),n=K(e,{relative:l});return f.useCallback(u=>{if(G(u,o)){u.preventDefault();let _=r!==void 0?r:v(p)===v(n);d(e,{replace:_,state:a,preventScrollReset:i,relative:l})}},[p,d,n,r,a,o,e,i,l])}const Z=g(Q)`
	all: unset;

	display: flex;
	align-items: center;
	cursor: pointer;

	gap: 16px;
	padding: 24px 48px;

	transition: color 0.3s ease-in-out;

	${({active:e})=>e==="true"&&$`
			border-right: 8px solid ${({theme:t})=>t.colors.primary};
			background-color: ${({theme:t})=>q({color:t.colors.primary,percentage:.55})};

			p {
				color: ${({theme:t})=>t.colors.darkgray};
				font-weight: 700;
			}
		`};
`,R=({children:e,active:t,to:o})=>c.jsx(Z,{active:String(t),to:o,children:e});try{R.displayName="MenuItem",R.__docgenInfo={description:"",displayName:"MenuItem",props:{active:{defaultValue:null,description:"The active state of the menu item\n@example ```tsx\n<MenuItem active />\n```",name:"active",required:!0,type:{name:"boolean"}}}}}catch{}const S=({icon:e})=>c.jsx(e,{size:32});try{S.displayName="MenuItemIcon",S.__docgenInfo={description:"",displayName:"MenuItemIcon",props:{icon:{defaultValue:null,description:"",name:"icon",required:!0,type:{name:"ElementType<IconProps>"}}}}}catch{}const L=({text:e})=>c.jsx(V,{color:"gray",size:"b2",styles:{cursor:"pointer"},children:e});try{L.displayName="MenuItemText",L.__docgenInfo={description:"",displayName:"MenuItemText",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}}}}}catch{}const ee=g.div`
	display: grid;
	place-items: center;

	color: ${({theme:e})=>B({color:e.colors.primary,percentage:.2})};

	height: 120px;

	font-weight: 600;
	font-family: ${({theme:e})=>e.fontFamily.logo};
	font-size: ${({theme:e})=>e.fontSizes.b1};
`,N=({children:e})=>c.jsx(ee,{children:e});try{N.displayName="MenuLogo",N.__docgenInfo={description:"",displayName:"MenuLogo",props:{}}}catch{}const te=g.aside`
	grid-area: Sidebar;
	position: fixed;
	top: 0;
	left: 0;

	height: 100vh;
	width: 320px;

	background-color: ${({theme:e})=>e.colors.white};
`,k=({children:e})=>c.jsx(te,{children:e});try{k.displayName="MenuRoot",k.__docgenInfo={description:"",displayName:"MenuRoot",props:{}}}catch{}export{k as M,M as a,N as b,R as c,S as d,L as e};
//# sourceMappingURL=index-70630a18.js.map
