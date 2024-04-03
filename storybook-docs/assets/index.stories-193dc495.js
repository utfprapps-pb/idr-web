import{j as t}from"./jsx-runtime-ffb262ed.js";import{r as o}from"./index-76fb7be0.js";import{c as p,a as l}from"./index-1abfe904.js";import{c as v}from"./index-f96983da.js";import{c as n}from"./createLucideIcon-0bafd447.js";import"./_commonjsHelpers-de833af9.js";/**
 * @license lucide-react v0.320.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=n("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.320.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=n("Home",[["path",{d:"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"y5dka4"}],["polyline",{points:"9 22 9 12 15 12 15 22",key:"e2us08"}]]);/**
 * @license lucide-react v0.320.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=n("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.320.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=n("Trees",[["path",{d:"M10 10v.2A3 3 0 0 1 8.9 16v0H5v0h0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z",key:"yh07w9"}],["path",{d:"M7 16v6",key:"1a82de"}],["path",{d:"M13 19v3",key:"13sx9i"}],["path",{d:"M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5",key:"1sj9kv"}]]),I=p`flex items-center px-2 py-1.5 gap-2 rounded-sm text-base cursor-pointer`,g={active:{false:p`text-slate-500`,true:p`text-primary-500 bg-primary-100 font-semibold`}},j=v(I,{variants:g,defaultVariants:{active:!1}}),f=o.forwardRef(({className:e,active:a,...r},c)=>t.jsx("div",{ref:c,className:l(j({active:a,className:e})),...r}));f.displayName="SidebarItem";try{SidebarItem.displayName="SidebarItem",SidebarItem.__docgenInfo={description:"",displayName:"SidebarItem",props:{active:{defaultValue:null,description:"",name:"active",required:!1,type:{name:"boolean | null"}}}}}catch{}const k=o.forwardRef(({className:e,...a},r)=>t.jsx("div",{ref:r,className:l("flex flex-col","gap-4",e),...a}));k.displayName="SidebarList";try{SidebarList.displayName="SidebarList",SidebarList.__docgenInfo={description:"",displayName:"SidebarList",props:{}}}catch{}const b=o.forwardRef(({className:e,...a},r)=>t.jsx("aside",{ref:r,className:l("flex flex-col","px-6 py-8",e),...a}));b.displayName="Sidebar";try{Sidebar.displayName="Sidebar",Sidebar.__docgenInfo={description:"",displayName:"Sidebar",props:{}}}catch{}const d={Root:b,List:k,Item:f},V={title:"Components/UI/Sidebar"},L=()=>{const e=[{key:"inicio",icon:t.jsx(S,{}),text:"Início"},{key:"propriedades",icon:t.jsx(u,{}),text:"Propriedades"},{key:"cadastros-gerais",icon:t.jsx(_,{}),text:"Cadastros Gerais"},{key:"relatorios",icon:t.jsx(h,{}),text:"Relatórios"}],[a,r]=o.useState("inicio"),c=s=>t.jsxs(d.Item,{active:a===s.key,onClick:()=>r(s.key),children:[s.icon," ",s.text]},s.key);return t.jsx(d.Root,{children:t.jsx(d.List,{children:e.map(c)})})},i=L.bind({});var m,y,x;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`() => {
  const items = [{
    key: 'inicio',
    icon: <Home />,
    text: 'Início'
  }, {
    key: 'propriedades',
    icon: <Trees />,
    text: 'Propriedades'
  }, {
    key: 'cadastros-gerais',
    icon: <Info />,
    text: 'Cadastros Gerais'
  }, {
    key: 'relatorios',
    icon: <FileTextIcon />,
    text: 'Relatórios'
  }];
  const [active, setActive] = useState<Keys>('inicio');
  const renderItems = (value: (typeof items)[0]) => <Sidebar.Item key={value.key} active={active === value.key} onClick={() => setActive((value.key as Keys))}>
            {value.icon} {value.text}
        </Sidebar.Item>;
  return <Sidebar.Root>
            <Sidebar.List>{items.map(renderItems)}</Sidebar.List>
        </Sidebar.Root>;
}`,...(x=(y=i.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};const w=["Default"];export{i as Default,w as __namedExportsOrder,V as default};
