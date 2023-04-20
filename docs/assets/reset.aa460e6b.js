var d=Object.defineProperty;var r=(e,t)=>d(e,"name",{value:t,configurable:!0});import{W as l}from"./styled-components.browser.esm.94ce6fb2.js";const i=Object.freeze({xsmall:600,small:960,medium:1280,large:1920}),a=r(e=>`${e}px`,"extractBreakpointValue"),m={colors:{primary:"#0B71B9",secondary:"#038657",white:"#FFFFFF",black:"#424242",lightgray:"#8D8D8D",gray:"#444545",darkgray:"#202328",background:"#F7F7F7",error:"#D51A52"},fontFamily:{primary:"'Work Sans', '-apple-system', 'Roboto', 'Helvetica', 'Arial', sans-serif"},fontSizes:{h1:"104px",h2:"76px",h3:"48px",h4:"32px",h5:"24px",b1:"24px",b2:"20px",b3:"16px",b4:"12px"},fontWeights:{light:"400",regular:"500",bold:"700"},media:{lessThan:e=>`@media(max-width: ${a(e)})`,between:(e,t)=>{const o=a(e),n=a(t);return`@media (min-width: ${o}) and (max-width: ${n})`},greaterThan:e=>`@media(min-width: ${a(e)})`,forPhoneOnly:()=>`@media(max-width: ${a(i.xsmall)})`,forTablePortraitUp:()=>`@media(min-width: ${a(i.xsmall)})`,forTablePortraitOnly:()=>`@media(min-width: ${a(i.xsmall)}) and (max-width: ${a(i.small)})`,forTableLandscapeUp:()=>`@media(min-width: ${a(i.small)})`,forTableLandscapeOnly:()=>`@media(min-width: ${a(i.small)}) and (max-width: ${a(i.medium)})`,forDesktopUp:()=>`@media(min-width: ${a(i.medium)})`,forDesktopOnly:()=>`@media(min-width: ${a(i.medium)}) and (max-width: ${a(i.large)})`,forBigDesktopUp:()=>`@media(min-width: ${a(i.large)})`}},h=l`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  button, link, input[type="submit"] {
    cursor: pointer;
  }

  body {
		font-family: ${m.fontFamily.primary};
		background-color: ${m.colors.background};
  }
`;export{h as R,m as t};
//# sourceMappingURL=reset.aa460e6b.js.map
