(this.webpackJsonpmangankyo=this.webpackJsonpmangankyo||[]).push([[0],[,,,,,,,function(e,t,a){e.exports=a(17)},,,,,function(e,t,a){},,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(4),c=a.n(l),o=(a(12),a(2)),i=a.n(o),u=a(5),s=a(1),d=(a(14),a(15),function(e){var t=e.already,a=r.a.useRef(null);return r.a.useEffect((function(){var e;return null===(e=a.current)||void 0===e?void 0:e.classList[t?"add":"remove"]("loaded")}),[t]),r.a.createElement("h1",{className:"SplashScreen-h1",title:"\u4e07\u9854\u93e1",ref:a},r.a.createElement("img",{className:"SplashScreen-img-logo",alt:"\u4e07\u9854\u93e1 \u30ed\u30b4\u753b\u50cf",src:"./splash-logo.svg"}),r.a.createElement("img",{className:"SplashScreen-img-star",alt:"",role:"presentation",src:"./splash-star.svg"}))}),m=a(6),h=(a(16),function(e){var t,a=e.already,n=e.scale,l=e.setScale,c=e.facingMode,o=e.setFacingMode,i=e.canvasRef,u=e.download,s=r.a.useRef(null),d=r.a.useRef(null),h=r.a.useCallback((function(){var e;return null===(e=s.current)||void 0===e?void 0:e.showModal()}),[]),f=r.a.useCallback((function(){var e;return null===(e=s.current)||void 0===e?void 0:e.close()}),[]),v=r.a.useCallback(function(e,t,a){return function(n){var r;27===n.keyCode&&(n.preventDefault(),(null===(r=e.current)||void 0===r?void 0:r.open)?t():a())}}(s,f,h),[f,h]),g=r.a.useCallback(function(e){return function(){return e()}}(h),[h]),p=r.a.useCallback((function(){return o("user"===c?"environment":"user")}),[c,o]);return r.a.useEffect((function(){return document.addEventListener("keydown",v,!1)}),[v]),r.a.useEffect((function(){var e;return null===(e=i.current)||void 0===e?void 0:e.addEventListener("click",g,!1)}),[g,i]),r.a.useEffect((function(){s.current&&m.a.registerDialog(s.current)}),[s]),a?r.a.createElement(r.a.Fragment,null,r.a.createElement("dialog",{className:"Settings-dialog",ref:s,style:{top:"30px",backgroundImage:"url(./splash-star.svg)"}},r.a.createElement("section",null,r.a.createElement("h2",null,"\u8a2d\u5b9a"),r.a.createElement("dl",null,r.a.createElement("dt",null,"\u30d1\u30bf\u30fc\u30f3\u306e\u5927\u304d\u3055"),r.a.createElement("dd",null,r.a.createElement("output",null,null===(t=d.current)||void 0===t?void 0:t.value)),r.a.createElement("dd",null,r.a.createElement("input",{type:"range",step:"0.1",min:"0.1",max:"2.0",defaultValue:n,ref:d})),r.a.createElement("dd",null,r.a.createElement("button",{type:"button",onClick:function(){var e;return l((null===(e=d.current)||void 0===e?void 0:e.valueAsNumber)||.5)}},"\u9069\u7528\u3059\u308b"))),r.a.createElement("dl",null,r.a.createElement("dt",null,"\u30d5\u30ed\u30f3\u30c8\u30ab\u30e1\u30e9 / \u30ea\u30a2\u30ab\u30e1\u30e9"),r.a.createElement("dd",null,r.a.createElement("small",null,"\u203b \u30c7\u30d0\u30a4\u30b9\u304c\u8a8d\u8b58\u3067\u304d\u306a\u3044\u5834\u5408\u306f\u5207\u308a\u66ff\u308f\u308a\u307e\u305b\u3093\u3002"),r.a.createElement("button",{type:"button",onClick:p},"\u5207\u308a\u66ff\u3048\u308b")))),r.a.createElement("section",null,r.a.createElement("h2",null,"\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9"),r.a.createElement("dl",null,r.a.createElement("dt",null,"\u8868\u793a\u3055\u308c\u3066\u3044\u308b\u30ad\u30e3\u30f3\u30d0\u30b9\u753b\u50cf\u3092\u4fdd\u5b58"),r.a.createElement("dd",null,r.a.createElement("button",{type:"button",onClick:function(){return u({type:"display"})}},"\u753b\u9762\u5168\u4f53")),r.a.createElement("dd",null,r.a.createElement("button",{type:"button",onClick:function(){return u({type:"pattern"})}},"\u6700\u5c0f\u30d1\u30bf\u30fc\u30f3")))),r.a.createElement("section",null,r.a.createElement("h2",null,"\u4e07\u9854\u93e1\u306b\u3064\u3044\u3066"),r.a.createElement("dl",null,r.a.createElement("dt",null,"Source on GitHub"),r.a.createElement("dd",null,r.a.createElement("a",{href:"https://github.com/ver-1000000/mangankyo"},"mangankyo"))),r.a.createElement("dl",null,r.a.createElement("dt",null,"WebSite / Author"),r.a.createElement("dd",null,r.a.createElement("a",{href:"https://ver1000000.com"},"Ver.1000000")," / ",r.a.createElement("a",{href:"https://twitter.com/Ver1000000000"},"@Ver1000000000")))),r.a.createElement("footer",{className:"Settings-footer"},r.a.createElement("button",{type:"button",className:"sky",onClick:f},"close")))):null});function f(e){if(null==e)throw alert("\u30ec\u30f3\u30c0\u30ea\u30f3\u30b0\u30a8\u30e9\u30fc: \u30da\u30fc\u30b8\u3092\u518d\u8aad\u8fbc\u3057\u3066\u304f\u3060\u3055\u3044\u3002"),new Error("Expected 'val' to be defined, but received ".concat(e))}var v=function(e){return e instanceof OverconstrainedError?alert("".concat(e.name,":\n\u8981\u6c42\u3055\u308c\u305f\u30c7\u30d0\u30a4\u30b9\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3002\n\u8a2d\u5b9a\u3092\u5909\u66f4\u3057\u3066\u304f\u3060\u3055\u3044\u3002")):alert("".concat(e.name,":\n").concat(e.message)),null},g=function(e){return e*Math.PI/180},p=function(e){var t=e.width,a=e.height,n=Object.assign(document.createElement("canvas"),{width:t,height:a}),r=n.getContext("2d");return[n,r]},E=function(e,t){var a=t.scale,n=Math.min(e.videoWidth,e.videoHeight)*a,r=n/2*Math.tan(g(60)),l=p({width:n,height:r}),c=Object(s.a)(l,2),o=c[0],i=c[1],u=[{x:n/2,y:0},{x:n,y:r},{x:0,y:r}],d=-Math.max(0,(e.videoWidth-e.videoHeight)/2),m=-Math.max(0,(e.videoHeight-e.videoWidth)/2);return i.save(),i.scale(a,a),i.drawImage(e,d,m,e.videoWidth,e.videoHeight),i.restore(),i.globalCompositeOperation="destination-in",i.beginPath(),i.moveTo(u[0].x,u[0].y),i.lineTo(u[1].x,u[1].y),i.lineTo(u[2].x,u[2].y),i.closePath(),i.fill(),i.globalCompositeOperation="source-over",o},y=function(e){var t=p({width:3*e.width,height:2*e.height}),a=Object(s.a)(t,2),n=a[0],r=a[1],l=function(t){var a=t.rotate,l=void 0===a?0:a,c=t.scaleX,o=void 0===c?1:c,i=t.scaleY,u=void 0===i?1:i,s=t.translateX,d=void 0===s?0:s,m=t.translateY,h=void 0===m?0:m;r.setTransform(1,0,0,1,n.width/3,n.height/2),r.rotate(g(l)),r.scale(o,u),r.translate(d,h),r.drawImage(e,-n.width/3,-n.height/2)};return l({rotate:0,scaleY:1}),l({rotate:0,scaleY:-1}),l({rotate:0,scaleY:1,translateX:1.5*e.width,translateY:e.height}),l({rotate:0,scaleY:-1,translateX:1.5*e.width,translateY:e.height}),l({rotate:120,scaleY:1}),l({rotate:120,scaleY:-1}),l({rotate:120,scaleY:1,translateX:0,translateY:2*-e.height}),l({rotate:120,scaleY:-1,translateX:0,translateY:2*e.height}),l({rotate:120,scaleY:1,translateX:1.5*e.width,translateY:e.height}),l({rotate:240,scaleY:1}),l({rotate:240,scaleY:-1}),l({rotate:240,scaleY:1,translateX:0,translateY:2*e.height}),l({rotate:240,scaleY:-1,translateX:0,translateY:2*-e.height}),l({rotate:240,scaleY:-1,translateX:1.5*e.width,translateY:e.height}),r},b=function(){var e=Object(u.a)(i.a.mark((function e(t,a){var n,r,l,c,o,u,s,d,m,h,g,p;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.canvas,r=a.scale,l=a.facingMode,c=a.setPatternCanvas,o=a.setAlready,f(n),t.srcObject instanceof MediaStream&&t.srcObject.getTracks().forEach((function(e){return e.stop()})),u=navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:l}}),e.next=6,u.catch(v);case 6:return s=e.sent,t.srcObject=s||null,d=n.getContext("2d"),m=n.getBoundingClientRect(),h=m.width,g=m.height,Object.assign(n,{width:h,height:g}),p=function e(){var a=E(t,{scale:r}),n=y(a);d.fillStyle=n.createPattern(n.canvas,"repeat"),d.fillRect(0,0,h,g),c(n.canvas),t.paused||requestAnimationFrame(e)},e.next=14,t.play().then((function(){return p()})).then((function(){return o(!0)}));case 14:return e.abrupt("return",s);case 15:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),w=function(e,t){return function(a){f(e.current),f(t);var n="display"===a.type?e.current:t,r=n.width,l=n.height,c=p({width:r,height:l}),o=Object(s.a)(c,2),i=o[0];o[1].drawImage(e.current,0,0);var u=document.createElement("a"),d=document.createElement("img");document.body.appendChild(u),document.body.appendChild(d),u.href=d.src=i.toDataURL(),u.download="mangankyo_".concat((new Date).toLocaleString("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"numeric"}).replace(/\D/g,""),".png"),u.click(),u.remove(),d.remove()}},k=function(){var e=document.createElement("video");return["playsinline","muted","autoplay"].forEach((function(t){return e.setAttribute(t,"")})),e}(),Y=function(){var e=r.a.useState(!1),t=Object(s.a)(e,2),a=t[0],n=t[1],l=r.a.useState("user"),c=Object(s.a)(l,2),o=c[0],i=c[1],u=r.a.useState(.5),m=Object(s.a)(u,2),f=m[0],g=m[1],p=r.a.useState(null),E=Object(s.a)(p,2),y=E[0],Y=E[1],C=r.a.useRef(null),S=r.a.useCallback(w(C,y),[y]);return r.a.useEffect(function(e){var t=e.canvasRef,a=e.scale,n=e.facingMode,r=e.setPatternCanvas,l=e.setAlready;return function(){var e;if("function"===typeof(null===(e=navigator.mediaDevices)||void 0===e?void 0:e.getUserMedia)){var c=b(k,{canvas:t.current,scale:a,facingMode:n,setPatternCanvas:r,setAlready:l});return function(){l(!1),c.then((function(){return k.paused||k.pause()})).then((function(){return l(!0)}))}}v(new Error("\u30d6\u30e9\u30a6\u30b6\u304cgetUserMedia()\u306b\u672a\u5bfe\u5fdc\u3067\u3059\u3002\n\u4ed6\u306e\u30d6\u30e9\u30a6\u30b6\u3092\u3054\u5229\u7528\u304f\u3060\u3055\u3044\u3002"))}}({canvasRef:C,scale:f,facingMode:o,setPatternCanvas:Y,setAlready:n}),[f,o]),r.a.createElement(r.a.Fragment,null,r.a.createElement("canvas",{ref:C,className:"App-canvas"}),r.a.createElement(d,{already:a}),r.a.createElement(h,{className:"App-Settings",already:a,scale:f,setScale:g,facingMode:o,setFacingMode:i,download:S,canvasRef:C}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[7,1,2]]]);
//# sourceMappingURL=main.1f7d5820.chunk.js.map