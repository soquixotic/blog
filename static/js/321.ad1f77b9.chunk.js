"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[321],{1321:function(e,t,a){a.r(t),a.d(t,{default:function(){return u}});var l=a(8),n=a(522),c=a(2543),i=a.p+"static/media/default-cover.bee98ca0fef3702d1f89.jpg",s=a(7491),r=a(3942),d=a(2978);function o(e){var t,a=e.article,l=(0,r.s0)(),n=1e3*a.update_at,o=new Date(n),u="".concat(o.getFullYear(),"-").concat((o.getMonth()+1).toString().padStart(2,"0"),"-").concat(o.getDate().toString().padStart(2,"0")," ").concat(o.getHours().toString().padStart(2,"0"),":").concat(o.getMinutes().toString().padStart(2,"0"),":").concat(o.getSeconds().toString().padStart(2,"0")),f=(0,s.useCallback)((function(){l("/article?id="+a.id)}),[a,l]);return(0,d.jsxs)("div",{className:"flex h-36 bg-white items-center w-full rounded-xl hover:cursor-pointer shadow-xl overflow-hidden justify-between",onClick:f,children:[(0,d.jsxs)("div",{className:"flex flex-col h-full mr-2 p-2 justify-between",children:[(0,d.jsxs)("div",{className:"flex flex-col",children:[(0,d.jsx)("div",{className:"font-bold mb-2 line-clamp-1 text-base",children:a.title}),(0,d.jsx)("div",{className:"line-clamp-3 text-base mb-2",children:a.brief})]}),(0,d.jsx)("div",{className:"line-clamp-1 font-light text-sm",children:u})]}),(0,d.jsx)(c.Z,{src:null!==(t=a.image)&&void 0!==t?t:i,preview:!1,wrapperClassName:"w-36 h-36",className:"aspect-square w-36 h-36",style:{width:"144px"}})]})}function u(){var e=(0,s.useState)([]),t=(0,l.Z)(e,2),a=t[0],c=t[1],i=(0,s.useState)(!0),r=(0,l.Z)(i,2),u=r[0],f=r[1];return(0,s.useEffect)((function(){fetch("https://api.zymx.tech/article/list?page_size=10").then((function(e){return e.json()})).then((function(e){var t;0===e.code&&c(null!==(t=e.data.articles)&&void 0!==t?t:[])})).catch((function(e){console.log(e)})).finally((function(){return f(!1)}))}),[]),(0,d.jsx)("div",{className:"w-full h-full flex justify-center min-h-screen",style:{maxWidth:"750px",minWidth:"360px"},children:(0,d.jsx)(n.Z,{header:(0,d.jsx)("div",{className:"text-2xl font-bold ml-4",children:"\u6700\u8fd1\u6587\u7ae0"}),dataSource:a,split:!1,className:"w-full min-h-screen",loading:u,renderItem:function(e){return(0,d.jsx)(n.Z.Item,{style:{paddingInline:"0px",padding:"8px"},className:"w-full",children:(0,d.jsx)(o,{article:e})})}})})}}}]);
//# sourceMappingURL=321.ad1f77b9.chunk.js.map