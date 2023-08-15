import{s as n,n as i,j as l}from"./styled-components.browser.esm-f24d23a7.js";const c=n.img`
	border-radius: ${({type:e})=>e==="circle"?"50%":"0%"};

	object-fit: cover;

	transition: all 0.2s ease-in-out;

	&:hover {
		transform: scale(1.1);
	}

	${({size:e})=>i`
		width: ${e}px;
		height: ${e}px;

		@media (max-width: 768px) {
			width: calc(${e}px / 1.5);
			height: calc(${e}px / 1.5);
		}

		@media (max-width: 480px) {
			width: calc(${e}px / 2);
			height: calc(${e}px / 2);
		}
	`}
`,a=({size:e=50,type:t="circle",...r})=>l.jsx(c,{size:e,type:t,...r});try{a.displayName="Avatar",a.__docgenInfo={description:"",displayName:"Avatar",props:{src:{defaultValue:null,description:'The source of the avatar image\n@example ```tsx\n<Avatar src="https://example.com/avatar.png" />\n```',name:"src",required:!0,type:{name:"string"}},alt:{defaultValue:null,description:'The alt text of the avatar image\n@example ```tsx\n<Avatar alt="Avatar" />\n```',name:"alt",required:!0,type:{name:"string"}},size:{defaultValue:{value:"50"},description:"The size of the avatar\n@example ```tsx\n<Avatar size={50} />\n```",name:"size",required:!1,type:{name:"number"}},type:{defaultValue:{value:"circle"},description:'The type of the avatar\n@example ```tsx\n<Avatar type="circle" />\n```',name:"type",required:!1,type:{name:"enum",value:[{value:'"circle"'},{value:'"square"'}]}}}}}catch{}export{a as A};
//# sourceMappingURL=index-804a8b5c.js.map
