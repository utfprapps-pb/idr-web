var X=Object.defineProperty;var i=(e,t)=>X(e,"name",{value:t,configurable:!0});import{r as x,a as E,j as C,R as Y}from"./jsx-runtime.02201e70.js";import{H as L,C as w}from"./styled-components.browser.esm.016c4039.js";import{t as c}from"./reset.489d37f0.js";var Z=x.exports.createContext({color:"currentColor",size:"1em",weight:"regular",mirrored:!1}),pe=i(function(t,r,n){var o=n.get(t);return o?o(r):(console.error('Unsupported icon weight. Choose from "thin", "light", "regular", "bold", "fill", or "duotone".'),null)},"renderPathForWeight");function M(e,t){if(e==null)return{};var r={},n=Object.keys(e),o,a;for(a=0;a<n.length;a++)o=n[a],!(t.indexOf(o)>=0)&&(r[o]=e[o]);return r}i(M,"_objectWithoutPropertiesLoose");var D=x.exports.forwardRef(function(e,t){var r=e.alt,n=e.color,o=e.size,a=e.weight,u=e.mirrored,l=e.children,b=e.renderPath,f=M(e,["alt","color","size","weight","mirrored","children","renderPath"]),v=x.exports.useContext(Z),B=v.color,I=B===void 0?"currentColor":B,_=v.size,j=v.weight,G=j===void 0?"regular":j,z=v.mirrored,J=z===void 0?!1:z,Q=M(v,["color","size","weight","mirrored"]);return E("svg",{...Object.assign({ref:t,xmlns:"http://www.w3.org/2000/svg",width:o!=null?o:_,height:o!=null?o:_,fill:n!=null?n:I,viewBox:"0 0 256 256",transform:u||J?"scale(-1, 1)":void 0},Q,f),children:[!!r&&C("title",{children:r}),l,C("rect",{width:"256",height:"256",fill:"none"}),b(a!=null?a:G,n!=null?n:I)]})});D.displayName="IconBase";const be=D;var ee={grad:.9,turn:360,rad:360/(2*Math.PI)},g=i(function(e){return typeof e=="string"?e.length>0:typeof e=="number"},"t"),s=i(function(e,t,r){return t===void 0&&(t=0),r===void 0&&(r=Math.pow(10,t)),Math.round(r*e)/r+0},"n"),d=i(function(e,t,r){return t===void 0&&(t=0),r===void 0&&(r=1),e>r?r:e>t?e:t},"e"),K=i(function(e){return(e=isFinite(e)?e%360:0)>0?e:e+360},"u"),P=i(function(e){return{r:d(e.r,0,255),g:d(e.g,0,255),b:d(e.b,0,255),a:d(e.a)}},"a"),N=i(function(e){return{r:s(e.r),g:s(e.g),b:s(e.b),a:s(e.a,3)}},"o"),te=/^#([0-9a-f]{3,8})$/i,y=i(function(e){var t=e.toString(16);return t.length<2?"0"+t:t},"s"),U=i(function(e){var t=e.r,r=e.g,n=e.b,o=e.a,a=Math.max(t,r,n),u=a-Math.min(t,r,n),l=u?a===t?(r-n)/u:a===r?2+(n-t)/u:4+(t-r)/u:0;return{h:60*(l<0?l+6:l),s:a?u/a*100:0,v:a/255*100,a:o}},"h"),A=i(function(e){var t=e.h,r=e.s,n=e.v,o=e.a;t=t/360*6,r/=100,n/=100;var a=Math.floor(t),u=n*(1-r),l=n*(1-(t-a)*r),b=n*(1-(1-t+a)*r),f=a%6;return{r:255*[n,l,u,u,b,n][f],g:255*[b,n,n,l,u,u][f],b:255*[u,u,b,n,n,l][f],a:o}},"b"),R=i(function(e){return{h:K(e.h),s:d(e.s,0,100),l:d(e.l,0,100),a:d(e.a)}},"g"),S=i(function(e){return{h:s(e.h),s:s(e.s),l:s(e.l),a:s(e.a,3)}},"d"),q=i(function(e){return A((r=(t=e).s,{h:t.h,s:(r*=((n=t.l)<50?n:100-n)/100)>0?2*r/(n+r)*100:0,v:n+r,a:t.a}));var t,r,n},"f"),m=i(function(e){return{h:(t=U(e)).h,s:(o=(200-(r=t.s))*(n=t.v)/100)>0&&o<200?r*n/100/(o<=100?o:200-o)*100:0,l:o/2,a:t.a};var t,r,n,o},"c"),re=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,ne=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,oe=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,ae=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,V={string:[[function(e){var t=te.exec(e);return t?(e=t[1]).length<=4?{r:parseInt(e[0]+e[0],16),g:parseInt(e[1]+e[1],16),b:parseInt(e[2]+e[2],16),a:e.length===4?s(parseInt(e[3]+e[3],16)/255,2):1}:e.length===6||e.length===8?{r:parseInt(e.substr(0,2),16),g:parseInt(e.substr(2,2),16),b:parseInt(e.substr(4,2),16),a:e.length===8?s(parseInt(e.substr(6,2),16)/255,2):1}:null:null},"hex"],[function(e){var t=oe.exec(e)||ae.exec(e);return t?t[2]!==t[4]||t[4]!==t[6]?null:P({r:Number(t[1])/(t[2]?100/255:1),g:Number(t[3])/(t[4]?100/255:1),b:Number(t[5])/(t[6]?100/255:1),a:t[7]===void 0?1:Number(t[7])/(t[8]?100:1)}):null},"rgb"],[function(e){var t=re.exec(e)||ne.exec(e);if(!t)return null;var r,n,o=R({h:(r=t[1],n=t[2],n===void 0&&(n="deg"),Number(r)*(ee[n]||1)),s:Number(t[3]),l:Number(t[4]),a:t[5]===void 0?1:Number(t[5])/(t[6]?100:1)});return q(o)},"hsl"]],object:[[function(e){var t=e.r,r=e.g,n=e.b,o=e.a,a=o===void 0?1:o;return g(t)&&g(r)&&g(n)?P({r:Number(t),g:Number(r),b:Number(n),a:Number(a)}):null},"rgb"],[function(e){var t=e.h,r=e.s,n=e.l,o=e.a,a=o===void 0?1:o;if(!g(t)||!g(r)||!g(n))return null;var u=R({h:Number(t),s:Number(r),l:Number(n),a:Number(a)});return q(u)},"hsl"],[function(e){var t=e.h,r=e.s,n=e.v,o=e.a,a=o===void 0?1:o;if(!g(t)||!g(r)||!g(n))return null;var u=function(l){return{h:K(l.h),s:d(l.s,0,100),v:d(l.v,0,100),a:d(l.a)}}({h:Number(t),s:Number(r),v:Number(n),a:Number(a)});return A(u)},"hsv"]]},T=i(function(e,t){for(var r=0;r<t.length;r++){var n=t[r][0](e);if(n)return[n,t[r][1]]}return[null,void 0]},"N"),ie=i(function(e){return typeof e=="string"?T(e.trim(),V.string):typeof e=="object"&&e!==null?T(e,V.object):[null,void 0]},"x"),k=i(function(e,t){var r=m(e);return{h:r.h,s:d(r.s+100*t,0,100),l:r.l,a:r.a}},"M"),$=i(function(e){return(299*e.r+587*e.g+114*e.b)/1e3/255},"H"),F=i(function(e,t){var r=m(e);return{h:r.h,s:r.s,l:d(r.l+100*t,0,100),a:r.a}},"$"),W=function(){function e(t){this.parsed=ie(t)[0],this.rgba=this.parsed||{r:0,g:0,b:0,a:1}}return i(e,"r"),e.prototype.isValid=function(){return this.parsed!==null},e.prototype.brightness=function(){return s($(this.rgba),2)},e.prototype.isDark=function(){return $(this.rgba)<.5},e.prototype.isLight=function(){return $(this.rgba)>=.5},e.prototype.toHex=function(){return t=N(this.rgba),r=t.r,n=t.g,o=t.b,u=(a=t.a)<1?y(s(255*a)):"","#"+y(r)+y(n)+y(o)+u;var t,r,n,o,a,u},e.prototype.toRgb=function(){return N(this.rgba)},e.prototype.toRgbString=function(){return t=N(this.rgba),r=t.r,n=t.g,o=t.b,(a=t.a)<1?"rgba("+r+", "+n+", "+o+", "+a+")":"rgb("+r+", "+n+", "+o+")";var t,r,n,o,a},e.prototype.toHsl=function(){return S(m(this.rgba))},e.prototype.toHslString=function(){return t=S(m(this.rgba)),r=t.h,n=t.s,o=t.l,(a=t.a)<1?"hsla("+r+", "+n+"%, "+o+"%, "+a+")":"hsl("+r+", "+n+"%, "+o+"%)";var t,r,n,o,a},e.prototype.toHsv=function(){return t=U(this.rgba),{h:s(t.h),s:s(t.s),v:s(t.v),a:s(t.a,3)};var t},e.prototype.invert=function(){return h({r:255-(t=this.rgba).r,g:255-t.g,b:255-t.b,a:t.a});var t},e.prototype.saturate=function(t){return t===void 0&&(t=.1),h(k(this.rgba,t))},e.prototype.desaturate=function(t){return t===void 0&&(t=.1),h(k(this.rgba,-t))},e.prototype.grayscale=function(){return h(k(this.rgba,-1))},e.prototype.lighten=function(t){return t===void 0&&(t=.1),h(F(this.rgba,t))},e.prototype.darken=function(t){return t===void 0&&(t=.1),h(F(this.rgba,-t))},e.prototype.rotate=function(t){return t===void 0&&(t=15),this.hue(this.hue()+t)},e.prototype.alpha=function(t){return typeof t=="number"?h({r:(r=this.rgba).r,g:r.g,b:r.b,a:t}):s(this.rgba.a,3);var r},e.prototype.hue=function(t){var r=m(this.rgba);return typeof t=="number"?h({h:t,s:r.s,l:r.l,a:r.a}):s(r.h)},e.prototype.isEqual=function(t){return this.toHex()===h(t).toHex()},e}(),h=i(function(e){return e instanceof W?e:new W(e)},"w");const H=i(({color:e,percentage:t=.1})=>h(e).darken(t).toHex(),"darken"),p=i(({color:e,percentage:t=.1})=>h(e).lighten(t).toHex(),"lighten"),ue=L.section`
	display: flex;
	justify-content: center;
	width: 100%;
`,se=L.button`
	display: flex;
	align-items: center;
	justify-content: center;

	position: relative;

	cursor: pointer;

	font-size: ${({theme:e})=>e.fontSizes.b3};
	font-family: ${({theme:e})=>e.fontFamily.primary};

	border: none;
	border-radius: 8px;

	width: 100%;

	padding: 12px 24px;

	svg {
		font-size: ${({theme:e})=>e.fontSizes.b3};
		margin-right: 8px;
	}

	${({buttonTheme:e,disabled:t})=>w`
			color: ${e.color};
			background: ${e.background};
			border: ${e.border};

			${!t&&w`
				&:hover {
					background: ${e.backgroundHover};
				}
			`};
		`}

	${({disabled:e,theme:t})=>e&&w`
			color: ${H({color:t.colors.primary,percentage:.8})};
			background-color: ${p({color:t.colors.lightgray,percentage:.25})};
			border: 1px solid
				${p({color:t.colors.lightgray,percentage:.25})};
			cursor: not-allowed;
		`}
`,le={primary:{color:p({color:c.colors.white}),background:p({color:c.colors.primary}),backgroundHover:c.colors.primary},outline:{color:c.colors.primary,background:c.colors.white,backgroundHover:H({color:c.colors.white,percentage:.05}),border:`1px solid ${c.colors.primary}`},text:{color:c.colors.primary,background:"transparent",backgroundHover:H({color:c.colors.white,percentage:.05})},success:{color:p({color:c.colors.white}),background:c.colors.secondary,backgroundHover:p({color:c.colors.secondary,percentage:.2})},error:{color:p({color:c.colors.white}),background:c.colors.error,backgroundHover:p({color:c.colors.error,percentage:.2})}},O=Y.forwardRef(({children:e,disabled:t=!1,theme:r="primary",type:n="button",icon:o,onClick:a=i(()=>null,"onClick"),...u},l)=>{const b=x.exports.useMemo(()=>le[r],[r]);return C(ue,{children:E(se,{buttonTheme:b,ref:l,type:n,disabled:t,onClick:a,...u,children:[o,e]})})});try{O.displayName="Button",O.__docgenInfo={description:"",displayName:"Button",props:{children:{defaultValue:null,description:"The button content\n@example ```tsx\n<Button>\n	<p>children</p>\n</Button>\n```",name:"children",required:!0,type:{name:"ReactNode"}},disabled:{defaultValue:{value:"false"},description:"The disable condition of the button\n@example ```tsx\n<Button disabled />\n```",name:"disabled",required:!1,type:{name:"boolean"}},theme:{defaultValue:{value:"primary"},description:"The theme of the button\n@example ```tsx\n<Button theme='primary' />\n```",name:"theme",required:!1,type:{name:"enum",value:[{value:'"primary"'},{value:'"outline"'},{value:'"text"'},{value:'"success"'},{value:'"error"'}]}},type:{defaultValue:{value:"button"},description:"The type of the button\n@example ```tsx\n<Button type='button' />\n```",name:"type",required:!1,type:{name:"enum",value:[{value:'"submit"'},{value:'"button"'}]}},icon:{defaultValue:null,description:"The icon of the button\n@example ```tsx\n<Button icon={<Eye />} />\n```",name:"icon",required:!1,type:{name:"ReactNode"}},onClick:{defaultValue:{value:"() => null"},description:`The onClick function of the button
@example \`\`\`tsx
const doSomething = () => {
	...
}

<Button onClick={doSomething} />
\`\`\``,name:"onClick",required:!1,type:{name:"(() => void)"}}}}}catch{}export{O as B,be as I,H as d,p as l,pe as r};
//# sourceMappingURL=index.b6821dff.js.map
