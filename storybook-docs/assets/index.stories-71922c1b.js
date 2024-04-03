import{j as r}from"./jsx-runtime-ffb262ed.js";import{B as w}from"./button-1881e8da.js";import{I as B}from"./input-bc537ec4.js";import{L}from"./label-34b8213a.js";import{_ as d}from"./extends-98964cd2.js";import{r as t}from"./index-76fb7be0.js";import{c as O,$ as v,a as de,b as I}from"./index-632e2741.js";import{$ as pe,a as j}from"./index-38dc68cb.js";import{a as ue}from"./index-7fe56c00.js";import{$ as me}from"./index-0b22d666.js";import{$ as fe,a as ge,h as he,b as be,c as $e}from"./Combination-e66f2a2c.js";import{$ as S}from"./index-dc576e2e.js";import{a as f,c as g}from"./index-1abfe904.js";import{c as xe}from"./index-f96983da.js";import{c as ve}from"./createLucideIcon-0bafd447.js";import"./_commonjsHelpers-de833af9.js";import"./index-d3ea75b5.js";/**
 * @license lucide-react v0.320.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _e=ve("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),Z="Dialog",[J,rt]=ue(Z),[Ce,p]=J(Z),Se=e=>{const{__scopeDialog:o,children:n,open:c,defaultOpen:s,onOpenChange:a,modal:i=!0}=e,l=t.useRef(null),m=t.useRef(null),[N=!1,F]=de({prop:c,defaultProp:s,onChange:a});return t.createElement(Ce,{scope:o,triggerRef:l,contentRef:m,contentId:I(),titleId:I(),descriptionId:I(),open:N,onOpenChange:F,onOpenToggle:t.useCallback(()=>F(le=>!le),[F]),modal:i},n)},Ne="DialogTrigger",ye=t.forwardRef((e,o)=>{const{__scopeDialog:n,...c}=e,s=p(Ne,n),a=j(o,s.triggerRef);return t.createElement(S.button,d({type:"button","aria-haspopup":"dialog","aria-expanded":s.open,"aria-controls":s.contentId,"data-state":P(s.open)},c,{ref:a,onClick:v(e.onClick,s.onOpenToggle)}))}),Q="DialogPortal",[De,W]=J(Q,{forceMount:void 0}),Re=e=>{const{__scopeDialog:o,forceMount:n,children:c,container:s}=e,a=p(Q,o);return t.createElement(De,{scope:o,forceMount:n},t.Children.map(c,i=>t.createElement(O,{present:n||a.open},t.createElement(fe,{asChild:!0,container:s},i))))},T="DialogOverlay",Ee=t.forwardRef((e,o)=>{const n=W(T,e.__scopeDialog),{forceMount:c=n.forceMount,...s}=e,a=p(T,e.__scopeDialog);return a.modal?t.createElement(O,{present:c||a.open},t.createElement(Fe,d({},s,{ref:o}))):null}),Fe=t.forwardRef((e,o)=>{const{__scopeDialog:n,...c}=e,s=p(T,n);return t.createElement(ge,{as:pe,allowPinchZoom:!0,shards:[s.contentRef]},t.createElement(S.div,d({"data-state":P(s.open)},c,{ref:o,style:{pointerEvents:"auto",...c.style}})))}),_="DialogContent",we=t.forwardRef((e,o)=>{const n=W(_,e.__scopeDialog),{forceMount:c=n.forceMount,...s}=e,a=p(_,e.__scopeDialog);return t.createElement(O,{present:c||a.open},a.modal?t.createElement(Ie,d({},s,{ref:o})):t.createElement(Te,d({},s,{ref:o})))}),Ie=t.forwardRef((e,o)=>{const n=p(_,e.__scopeDialog),c=t.useRef(null),s=j(o,n.contentRef,c);return t.useEffect(()=>{const a=c.current;if(a)return he(a)},[]),t.createElement(ee,d({},e,{ref:s,trapFocus:n.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:v(e.onCloseAutoFocus,a=>{var i;a.preventDefault(),(i=n.triggerRef.current)===null||i===void 0||i.focus()}),onPointerDownOutside:v(e.onPointerDownOutside,a=>{const i=a.detail.originalEvent,l=i.button===0&&i.ctrlKey===!0;(i.button===2||l)&&a.preventDefault()}),onFocusOutside:v(e.onFocusOutside,a=>a.preventDefault())}))}),Te=t.forwardRef((e,o)=>{const n=p(_,e.__scopeDialog),c=t.useRef(!1),s=t.useRef(!1);return t.createElement(ee,d({},e,{ref:o,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:a=>{var i;if((i=e.onCloseAutoFocus)===null||i===void 0||i.call(e,a),!a.defaultPrevented){var l;c.current||(l=n.triggerRef.current)===null||l===void 0||l.focus(),a.preventDefault()}c.current=!1,s.current=!1},onInteractOutside:a=>{var i,l;(i=e.onInteractOutside)===null||i===void 0||i.call(e,a),a.defaultPrevented||(c.current=!0,a.detail.originalEvent.type==="pointerdown"&&(s.current=!0));const m=a.target;((l=n.triggerRef.current)===null||l===void 0?void 0:l.contains(m))&&a.preventDefault(),a.detail.originalEvent.type==="focusin"&&s.current&&a.preventDefault()}}))}),ee=t.forwardRef((e,o)=>{const{__scopeDialog:n,trapFocus:c,onOpenAutoFocus:s,onCloseAutoFocus:a,...i}=e,l=p(_,n),m=t.useRef(null),N=j(o,m);return be(),t.createElement(t.Fragment,null,t.createElement($e,{asChild:!0,loop:!0,trapped:c,onMountAutoFocus:s,onUnmountAutoFocus:a},t.createElement(me,d({role:"dialog",id:l.contentId,"aria-describedby":l.descriptionId,"aria-labelledby":l.titleId,"data-state":P(l.open)},i,{ref:N,onDismiss:()=>l.onOpenChange(!1)}))),!1)}),Oe="DialogTitle",je=t.forwardRef((e,o)=>{const{__scopeDialog:n,...c}=e,s=p(Oe,n);return t.createElement(S.h2,d({id:s.titleId},c,{ref:o}))}),Pe="DialogDescription",Be=t.forwardRef((e,o)=>{const{__scopeDialog:n,...c}=e,s=p(Pe,n);return t.createElement(S.p,d({id:s.descriptionId},c,{ref:o}))}),Le="DialogClose",Me=t.forwardRef((e,o)=>{const{__scopeDialog:n,...c}=e,s=p(Le,n);return t.createElement(S.button,d({type:"button"},c,{ref:o,onClick:v(e.onClick,()=>s.onOpenChange(!1))}))});function P(e){return e?"open":"closed"}const ke=Se,Ae=ye,te=Re,oe=Ee,ne=we,ae=je,se=Be,re=Me,C=t.forwardRef(({className:e,...o},n)=>r.jsx(oe,{className:f("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",e),...o,ref:n}));C.displayName=oe.displayName;try{C.displayName="Overlay",C.__docgenInfo={description:"",displayName:"Overlay",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}}}catch{}const He=g`flex flex-col fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500`,Ue=xe(He,{variants:{side:{top:g`inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top`,bottom:g`inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom`,left:g`inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm`,right:g`inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm`}},defaultVariants:{side:"right"}}),y=t.forwardRef(({side:e="right",className:o,children:n,...c},s)=>r.jsxs(te,{children:[r.jsx(C,{}),r.jsxs(ne,{ref:s,className:f(Ue({side:e}),o),...c,children:[n,r.jsxs(re,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",children:[r.jsx(_e,{className:"h-4 w-4"}),r.jsx("span",{className:"sr-only",children:"Fechar"})]})]})]}));y.displayName=ne.displayName;try{y.displayName="Content",y.__docgenInfo={description:"",displayName:"Content",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}},side:{defaultValue:{value:"right"},description:"",name:"side",required:!1,type:{name:'"top" | "right" | "bottom" | "left" | null'}}}}}catch{}const D=t.forwardRef(({className:e,...o},n)=>r.jsx(se,{ref:n,className:f("text-sm text-muted-foreground",e),...o}));D.displayName=se.displayName;try{D.displayName="Description",D.__docgenInfo={description:"",displayName:"Description",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}}}catch{}const ce=({className:e,...o})=>r.jsx("div",{className:f("flex flex-col-reverse gap-4 mt-auto sm:flex-row sm:justify-center",e),...o});ce.displayName="SheetFooter";try{SheetFooter.displayName="SheetFooter",SheetFooter.__docgenInfo={description:"",displayName:"SheetFooter",props:{}}}catch{}const ie=({className:e,...o})=>r.jsx("div",{className:f("flex flex-col space-y-2 text-center sm:text-left",e),...o});ie.displayName="SheetHeader";try{SheetHeader.displayName="SheetHeader",SheetHeader.__docgenInfo={description:"",displayName:"SheetHeader",props:{}}}catch{}const R=t.forwardRef(({className:e,...o},n)=>r.jsx(ae,{ref:n,className:f("text-lg font-semibold text-foreground",e),...o}));R.displayName=ae.displayName;try{R.displayName="Title",R.__docgenInfo={description:"",displayName:"Title",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}}}catch{}const u={Root:ke,Portal:te,Overlay:C,Trigger:Ae,Close:re,Content:y,Header:ie,Footer:ce,Title:R,Description:D},ct={title:"Components/UI/Sheet"},E=({side:e,...o})=>r.jsxs(u.Root,{children:[r.jsx(u.Trigger,{asChild:!0,children:r.jsx(w,{variant:"outline",children:e})}),r.jsxs(u.Content,{...o,side:e,children:[r.jsxs(u.Header,{children:[r.jsx(u.Title,{children:"Edit profile"}),r.jsx(u.Description,{children:"Make changes to your profile here. Click save when you are done."})]}),r.jsxs("div",{className:"grid gap-4 py-4",children:[r.jsxs("div",{className:"grid grid-cols-4 items-center gap-4",children:[r.jsx(L,{htmlFor:"name",className:"text-right",children:"Name"}),r.jsx(B,{id:"name",value:"Pedro Duarte",className:"col-span-3"})]}),r.jsxs("div",{className:"grid grid-cols-4 items-center gap-4",children:[r.jsx(L,{htmlFor:"username",className:"text-right",children:"Username"}),r.jsx(B,{id:"username",value:"@peduarte",className:"col-span-3"})]})]}),r.jsxs(u.Footer,{children:[r.jsx(u.Close,{asChild:!0,children:r.jsx(w,{className:"w-full",type:"submit",variant:"outline",children:"Close"})}),r.jsx(u.Close,{asChild:!0,children:r.jsx(w,{className:"w-full",type:"submit",children:"Save changes"})})]})]})]}),h=E.bind({});h.args={side:"top"};const b=E.bind({});b.args={side:"right"};const $=E.bind({});$.args={side:"bottom"};const x=E.bind({});x.args={side:"left"};var M,k,A;h.parameters={...h.parameters,docs:{...(M=h.parameters)==null?void 0:M.docs,source:{originalSource:`({
  side,
  ...args
}) => <Sheet.Root>
        <Sheet.Trigger asChild>
            <Button variant="outline">{side}</Button>
        </Sheet.Trigger>
        <Sheet.Content {...args} side={side}>
            <Sheet.Header>
                <Sheet.Title>Edit profile</Sheet.Title>
                <Sheet.Description>
                    Make changes to your profile here. Click save when you are done.
                </Sheet.Description>
            </Sheet.Header>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input id="name" value="Pedro Duarte" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Username
                    </Label>
                    <Input id="username" value="@peduarte" className="col-span-3" />
                </div>
            </div>
            <Sheet.Footer>
                <Sheet.Close asChild>
                    <Button className="w-full" type="submit" variant="outline">
                        Close
                    </Button>
                </Sheet.Close>

                <Sheet.Close asChild>
                    <Button className="w-full" type="submit">
                        Save changes
                    </Button>
                </Sheet.Close>
            </Sheet.Footer>
        </Sheet.Content>
    </Sheet.Root>`,...(A=(k=h.parameters)==null?void 0:k.docs)==null?void 0:A.source}}};var H,U,V;b.parameters={...b.parameters,docs:{...(H=b.parameters)==null?void 0:H.docs,source:{originalSource:`({
  side,
  ...args
}) => <Sheet.Root>
        <Sheet.Trigger asChild>
            <Button variant="outline">{side}</Button>
        </Sheet.Trigger>
        <Sheet.Content {...args} side={side}>
            <Sheet.Header>
                <Sheet.Title>Edit profile</Sheet.Title>
                <Sheet.Description>
                    Make changes to your profile here. Click save when you are done.
                </Sheet.Description>
            </Sheet.Header>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input id="name" value="Pedro Duarte" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Username
                    </Label>
                    <Input id="username" value="@peduarte" className="col-span-3" />
                </div>
            </div>
            <Sheet.Footer>
                <Sheet.Close asChild>
                    <Button className="w-full" type="submit" variant="outline">
                        Close
                    </Button>
                </Sheet.Close>

                <Sheet.Close asChild>
                    <Button className="w-full" type="submit">
                        Save changes
                    </Button>
                </Sheet.Close>
            </Sheet.Footer>
        </Sheet.Content>
    </Sheet.Root>`,...(V=(U=b.parameters)==null?void 0:U.docs)==null?void 0:V.source}}};var q,G,z;$.parameters={...$.parameters,docs:{...(q=$.parameters)==null?void 0:q.docs,source:{originalSource:`({
  side,
  ...args
}) => <Sheet.Root>
        <Sheet.Trigger asChild>
            <Button variant="outline">{side}</Button>
        </Sheet.Trigger>
        <Sheet.Content {...args} side={side}>
            <Sheet.Header>
                <Sheet.Title>Edit profile</Sheet.Title>
                <Sheet.Description>
                    Make changes to your profile here. Click save when you are done.
                </Sheet.Description>
            </Sheet.Header>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input id="name" value="Pedro Duarte" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Username
                    </Label>
                    <Input id="username" value="@peduarte" className="col-span-3" />
                </div>
            </div>
            <Sheet.Footer>
                <Sheet.Close asChild>
                    <Button className="w-full" type="submit" variant="outline">
                        Close
                    </Button>
                </Sheet.Close>

                <Sheet.Close asChild>
                    <Button className="w-full" type="submit">
                        Save changes
                    </Button>
                </Sheet.Close>
            </Sheet.Footer>
        </Sheet.Content>
    </Sheet.Root>`,...(z=(G=$.parameters)==null?void 0:G.docs)==null?void 0:z.source}}};var X,K,Y;x.parameters={...x.parameters,docs:{...(X=x.parameters)==null?void 0:X.docs,source:{originalSource:`({
  side,
  ...args
}) => <Sheet.Root>
        <Sheet.Trigger asChild>
            <Button variant="outline">{side}</Button>
        </Sheet.Trigger>
        <Sheet.Content {...args} side={side}>
            <Sheet.Header>
                <Sheet.Title>Edit profile</Sheet.Title>
                <Sheet.Description>
                    Make changes to your profile here. Click save when you are done.
                </Sheet.Description>
            </Sheet.Header>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input id="name" value="Pedro Duarte" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Username
                    </Label>
                    <Input id="username" value="@peduarte" className="col-span-3" />
                </div>
            </div>
            <Sheet.Footer>
                <Sheet.Close asChild>
                    <Button className="w-full" type="submit" variant="outline">
                        Close
                    </Button>
                </Sheet.Close>

                <Sheet.Close asChild>
                    <Button className="w-full" type="submit">
                        Save changes
                    </Button>
                </Sheet.Close>
            </Sheet.Footer>
        </Sheet.Content>
    </Sheet.Root>`,...(Y=(K=x.parameters)==null?void 0:K.docs)==null?void 0:Y.source}}};const it=["Top","Right","Bottom","Left"];export{$ as Bottom,x as Left,b as Right,h as Top,it as __namedExportsOrder,ct as default};
