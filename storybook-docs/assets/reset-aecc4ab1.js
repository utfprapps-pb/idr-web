import{a as O}from"./styled-components.browser.esm-f24d23a7.js";var P={grad:.9,turn:360,rad:360/(2*Math.PI)},g=function(t){return typeof t=="string"?t.length>0:typeof t=="number"},s=function(t,r,n){return r===void 0&&(r=0),n===void 0&&(n=Math.pow(10,r)),Math.round(n*t)/n+0},d=function(t,r,n){return r===void 0&&(r=0),n===void 0&&(n=1),t>n?n:t>r?t:r},M=function(t){return(t=isFinite(t)?t%360:0)>0?t:t+360},w=function(t){return{r:d(t.r,0,255),g:d(t.g,0,255),b:d(t.b,0,255),a:d(t.a)}},y=function(t){return{r:s(t.r),g:s(t.g),b:s(t.b),a:s(t.a,3)}},T=/^#([0-9a-f]{3,8})$/i,m=function(t){var r=t.toString(16);return r.length<2?"0"+r:r},S=function(t){var r=t.r,n=t.g,e=t.b,a=t.a,o=Math.max(r,n,e),i=o-Math.min(r,n,e),l=i?o===r?(n-e)/i:o===n?2+(e-r)/i:4+(r-n)/i:0;return{h:60*(l<0?l+6:l),s:o?i/o*100:0,v:o/255*100,a}},A=function(t){var r=t.h,n=t.s,e=t.v,a=t.a;r=r/360*6,n/=100,e/=100;var o=Math.floor(r),i=e*(1-n),l=e*(1-(r-o)*n),f=e*(1-(1-r+o)*n),v=o%6;return{r:255*[e,l,i,i,f,e][v],g:255*[f,e,e,l,i,i][v],b:255*[i,i,f,e,e,l][v],a}},k=function(t){return{h:M(t.h),s:d(t.s,0,100),l:d(t.l,0,100),a:d(t.a)}},N=function(t){return{h:s(t.h),s:s(t.s),l:s(t.l),a:s(t.a,3)}},F=function(t){return A((n=(r=t).s,{h:r.h,s:(n*=((e=r.l)<50?e:100-e)/100)>0?2*n/(e+n)*100:0,v:e+n,a:r.a}));var r,n,e},p=function(t){return{h:(r=S(t)).h,s:(a=(200-(n=r.s))*(e=r.v)/100)>0&&a<200?n*e/100/(a<=100?a:200-a)*100:0,l:a/2,a:r.a};var r,n,e,a},j=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,R=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,z=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,E=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,B={string:[[function(t){var r=T.exec(t);return r?(t=r[1]).length<=4?{r:parseInt(t[0]+t[0],16),g:parseInt(t[1]+t[1],16),b:parseInt(t[2]+t[2],16),a:t.length===4?s(parseInt(t[3]+t[3],16)/255,2):1}:t.length===6||t.length===8?{r:parseInt(t.substr(0,2),16),g:parseInt(t.substr(2,2),16),b:parseInt(t.substr(4,2),16),a:t.length===8?s(parseInt(t.substr(6,2),16)/255,2):1}:null:null},"hex"],[function(t){var r=z.exec(t)||E.exec(t);return r?r[2]!==r[4]||r[4]!==r[6]?null:w({r:Number(r[1])/(r[2]?100/255:1),g:Number(r[3])/(r[4]?100/255:1),b:Number(r[5])/(r[6]?100/255:1),a:r[7]===void 0?1:Number(r[7])/(r[8]?100:1)}):null},"rgb"],[function(t){var r=j.exec(t)||R.exec(t);if(!r)return null;var n,e,a=k({h:(n=r[1],e=r[2],e===void 0&&(e="deg"),Number(n)*(P[e]||1)),s:Number(r[3]),l:Number(r[4]),a:r[5]===void 0?1:Number(r[5])/(r[6]?100:1)});return F(a)},"hsl"]],object:[[function(t){var r=t.r,n=t.g,e=t.b,a=t.a,o=a===void 0?1:a;return g(r)&&g(n)&&g(e)?w({r:Number(r),g:Number(n),b:Number(e),a:Number(o)}):null},"rgb"],[function(t){var r=t.h,n=t.s,e=t.l,a=t.a,o=a===void 0?1:a;if(!g(r)||!g(n)||!g(e))return null;var i=k({h:Number(r),s:Number(n),l:Number(e),a:Number(o)});return F(i)},"hsl"],[function(t){var r=t.h,n=t.s,e=t.v,a=t.a,o=a===void 0?1:a;if(!g(r)||!g(n)||!g(e))return null;var i=function(l){return{h:M(l.h),s:d(l.s,0,100),v:d(l.v,0,100),a:d(l.a)}}({h:Number(r),s:Number(n),v:Number(e),a:Number(o)});return A(i)},"hsv"]]},D=function(t,r){for(var n=0;n<r.length;n++){var e=r[n][0](t);if(e)return[e,r[n][1]]}return[null,void 0]},U=function(t){return typeof t=="string"?D(t.trim(),B.string):typeof t=="object"&&t!==null?D(t,B.object):[null,void 0]},x=function(t,r){var n=p(t);return{h:n.h,s:d(n.s+100*r,0,100),l:n.l,a:n.a}},$=function(t){return(299*t.r+587*t.g+114*t.b)/1e3/255},H=function(t,r){var n=p(t);return{h:n.h,s:n.s,l:d(n.l+100*r,0,100),a:n.a}},I=function(){function t(r){this.parsed=U(r)[0],this.rgba=this.parsed||{r:0,g:0,b:0,a:1}}return t.prototype.isValid=function(){return this.parsed!==null},t.prototype.brightness=function(){return s($(this.rgba),2)},t.prototype.isDark=function(){return $(this.rgba)<.5},t.prototype.isLight=function(){return $(this.rgba)>=.5},t.prototype.toHex=function(){return r=y(this.rgba),n=r.r,e=r.g,a=r.b,i=(o=r.a)<1?m(s(255*o)):"","#"+m(n)+m(e)+m(a)+i;var r,n,e,a,o,i},t.prototype.toRgb=function(){return y(this.rgba)},t.prototype.toRgbString=function(){return r=y(this.rgba),n=r.r,e=r.g,a=r.b,(o=r.a)<1?"rgba("+n+", "+e+", "+a+", "+o+")":"rgb("+n+", "+e+", "+a+")";var r,n,e,a,o},t.prototype.toHsl=function(){return N(p(this.rgba))},t.prototype.toHslString=function(){return r=N(p(this.rgba)),n=r.h,e=r.s,a=r.l,(o=r.a)<1?"hsla("+n+", "+e+"%, "+a+"%, "+o+")":"hsl("+n+", "+e+"%, "+a+"%)";var r,n,e,a,o},t.prototype.toHsv=function(){return r=S(this.rgba),{h:s(r.h),s:s(r.s),v:s(r.v),a:s(r.a,3)};var r},t.prototype.invert=function(){return b({r:255-(r=this.rgba).r,g:255-r.g,b:255-r.b,a:r.a});var r},t.prototype.saturate=function(r){return r===void 0&&(r=.1),b(x(this.rgba,r))},t.prototype.desaturate=function(r){return r===void 0&&(r=.1),b(x(this.rgba,-r))},t.prototype.grayscale=function(){return b(x(this.rgba,-1))},t.prototype.lighten=function(r){return r===void 0&&(r=.1),b(H(this.rgba,r))},t.prototype.darken=function(r){return r===void 0&&(r=.1),b(H(this.rgba,-r))},t.prototype.rotate=function(r){return r===void 0&&(r=15),this.hue(this.hue()+r)},t.prototype.alpha=function(r){return typeof r=="number"?b({r:(n=this.rgba).r,g:n.g,b:n.b,a:r}):s(this.rgba.a,3);var n},t.prototype.hue=function(r){var n=p(this.rgba);return typeof r=="number"?b({h:r,s:n.s,l:n.l,a:n.a}):s(n.h)},t.prototype.isEqual=function(r){return this.toHex()===b(r).toHex()},t}(),b=function(t){return t instanceof I?t:new I(t)};const L=({color:t,percentage:r=.1})=>b(t).darken(r).toHex(),V=({color:t,percentage:r=.1})=>b(t).lighten(r).toHex(),h=Object.freeze({xsmall:600,small:960,medium:1280,large:1920}),u=t=>`${t}px`,c={colors:{primary:"#0B71B9",secondary:"#038657",white:"#FFFFFF",black:"#262626",text:"#495057",lightgray:"#DEE2E6",gray:"#ADB5BD",darkgray:"#343A40",disabled:{background:V({color:"#ADB5BD",percentage:.2}),border:L({color:"#0B71B9",percentage:.3}),text:"#343A40"},background:"#F7F7F7",error:"#D51A52"},fontFamily:{primary:"'Work Sans', '-apple-system', 'Roboto', 'Helvetica', 'Arial', sans-serif",logo:"Mochiy Pop P One"},fontSizes:{h1:"104px",h2:"76px",h3:"48px",h4:"32px",h5:"28px",b1:"24px",b2:"20px",b3:"16px",b4:"12px"},fontWeights:{light:"400",regular:"500",bold:"700"},media:{lessThan:t=>`@media(max-width: ${u(t)})`,between:(t,r)=>{const n=u(t),e=u(r);return`@media (min-width: ${n}) and (max-width: ${e})`},greaterThan:t=>`@media(min-width: ${u(t)})`,forPhoneOnly:()=>`@media(max-width: ${u(h.xsmall)})`,forTablePortraitUp:()=>`@media(min-width: ${u(h.xsmall)})`,forTablePortraitOnly:()=>`@media(min-width: ${u(h.xsmall)}) and (max-width: ${u(h.small)})`,forTableLandscapeUp:()=>`@media(min-width: ${u(h.small)})`,forTableLandscapeOnly:()=>`@media(min-width: ${u(h.small)}) and (max-width: ${u(h.medium)})`,forDesktopUp:()=>`@media(min-width: ${u(h.medium)})`,forDesktopOnly:()=>`@media(min-width: ${u(h.medium)}) and (max-width: ${u(h.large)})`,forBigDesktopUp:()=>`@media(min-width: ${u(h.large)})`}},q=O`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
		font-family: ${c.fontFamily.primary};
  }

  button, link, input[type="submit"] {
    cursor: pointer;
  }

  body {
		color: ${c.colors.text};
		background-color: ${c.colors.background};
		line-height: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

	html, body, #root {
    height: 100%;
    min-height: 100vh;
		min-height: 100dvh;
  }

  ol,
  ul {
    list-style: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

	*::-webkit-scrollbar {
    width: 10px;
  }

  *::-webkit-scrollbar-track {
    background: ${c.colors.white};
    border-radius: 10px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${c.colors.gray};
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: content-box;
  }
`;export{q as R,L as d,V as l,c as t};
//# sourceMappingURL=reset-aecc4ab1.js.map
