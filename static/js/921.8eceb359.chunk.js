"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[921],{3816:function(e,t,n){n.r(t),n.d(t,{default:function(){return b}});var r=n(4951),a=n(8),o=n(7176),c=n(958),i=n(9454),s=n(2543),u=n(7491),d=n(8844),l=n(1017),p=n(8900);function f(){return(f=(0,l.Z)((0,d.Z)().mark((function e(t){var n;return(0,d.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h("https://api.zymx.tech/gpt/gen-image",{prompt:t});case 2:return n=e.sent,e.next=5,n.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function h(e,t){return g.apply(this,arguments)}function g(){return(g=(0,l.Z)((0,d.Z)().mark((function e(t,n){var r;return(0,d.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=Object.keys(n).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(n[e])})).join("&"),e.next=3,fetch(t,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded",Authorization:(0,p.Nh)()},body:r});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var m=n(6135),v=n(2978);function b(){var e=(0,u.useState)(!1),t=(0,a.Z)(e,2),n=t[0],d=t[1],l=(0,u.useState)(""),h=(0,a.Z)(l,2),g=h[0],b=h[1],x=(0,p.pG)(),y=(0,a.Z)(x,1)[0],j=(0,p.v$)(),w=(0,u.useState)([]),Z=(0,a.Z)(w,2),S=Z[0],k=Z[1];return(0,v.jsxs)("div",{className:"p-4 space-y-4 pb-24",children:[(0,v.jsxs)("div",{className:"font-bold text-red-500 p-2 bg-red-50 bg-opacity-80 rounded-lg",children:["Careful!!! ",(0,v.jsx)("br",{}),"Once you refresh the page, you're unable to find back the images. Make sure save the images you like before you leave."]}),(0,v.jsx)("div",{className:"text-base font-bold",children:"Prompt:"}),(0,v.jsx)(o.Z.TextArea,{rows:3,value:g,placeholder:"Input your prompt here. You have to input 10 characters at least. ",onChange:function(e){return b(e.target.value)},disabled:n}),(0,v.jsx)(c.ZP,{type:"primary",loading:n,onClick:function(){j.token?(d(!0),function(e){return f.apply(this,arguments)}(g).then((function(e){0===e.code&&k([e.data].concat((0,r.Z)(S)))})).catch((function(e){console.log("failed to gen image. ",e)})).finally((function(){d(!1)}))):y()},disabled:g.length<10,children:"Gen!"}),(0,v.jsx)("div",{className:"text-base font-bold",children:"Result:"}),(0,v.jsxs)("div",{className:"flex space-x-2",children:[n&&(0,v.jsx)("div",{className:"w-28 h-28 flex items-center justify-center bg-white bg-opacity-70 rounded-lg",children:(0,v.jsx)(i.Z,{})}),S.map((function(e,t){var n,r=e.data[0],a=null!==(n=r.url)&&void 0!==n?n:"data:image/png;base64,".concat(r.b64_json);return(0,v.jsx)("div",{className:"w-28 h-28 rounded-lg",children:(0,v.jsx)(s.Z,{src:a})},t)}))]}),(0,v.jsx)("div",{children:S.map((function(e,t){var n,r=e.data[0],a=null!==(n=r.url)&&void 0!==n?n:"data:image/png;base64,".concat(r.b64_json);return(0,v.jsxs)("div",{className:"bg-white bg-opacity-90 rounded-lg p-4",children:[(0,v.jsx)("div",{className:"font-bold mb-2",children:(0,m.i)(e.created)}),(0,v.jsx)("div",{className:"mb-2 bg-gray-300 rounded-lg p-2 bg-opacity-50",children:r.revised_prompt}),(0,v.jsx)("img",{src:a,alt:r.revised_prompt,className:"w-full h-full"})]},t)}))})]})}},6135:function(e,t,n){function r(e){var t=new Date(1e3*e);return"".concat(t.getFullYear(),"-").concat((t.getMonth()+1).toString().padStart(2,"0"),"-").concat(t.getDate().toString().padStart(2,"0")," ").concat(t.getHours().toString().padStart(2,"0"),":").concat(t.getMinutes().toString().padStart(2,"0"),":").concat(t.getSeconds().toString().padStart(2,"0"))}n.d(t,{i:function(){return r}})},9348:function(e,t,n){n.d(t,{Z:function(){return a}});var r=n(2796);function a(e,t,n,a){var o=r.unstable_batchedUpdates?function(e){r.unstable_batchedUpdates(n,e)}:n;return null!==e&&void 0!==e&&e.addEventListener&&e.addEventListener(t,o,a),{remove:function(){null!==e&&void 0!==e&&e.removeEventListener&&e.removeEventListener(t,o,a)}}}},4064:function(e,t,n){n.d(t,{g1:function(){return r},os:function(){return a}});function r(){return{width:document.documentElement.clientWidth,height:window.innerHeight||document.documentElement.clientHeight}}function a(e){var t=e.getBoundingClientRect(),n=document.documentElement;return{left:t.left+(window.pageXOffset||n.scrollLeft)-(n.clientLeft||document.body.clientLeft||0),top:t.top+(window.pageYOffset||n.scrollTop)-(n.clientTop||document.body.clientTop||0)}}}}]);
//# sourceMappingURL=921.8eceb359.chunk.js.map