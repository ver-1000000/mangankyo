(this.webpackJsonpmangankyo=this.webpackJsonpmangankyo||[]).push([[0],[,,,,,,,,,,,,function(e,t,a){e.exports=a(23)},,,,,function(e,t,a){},,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(9),o=a.n(r),c=(a(17),a(6)),i=a.n(c),s=a(7),u=a(1),d=(a(19),a(20),function(e){var t=e.already,a=e.floatButtonsVisibled,n=e.floatButtonsDownloadType,r=e.setSettingsVisibled,o=e.download;return t&&a?l.a.createElement(l.a.Fragment,null,l.a.createElement("ul",{className:"FloatButtons-ul"},l.a.createElement("li",null,l.a.createElement("input",{type:"image",className:"FloatButtons-button",src:"/button-download.svg",alt:"\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u30dc\u30bf\u30f3",title:"\u30ad\u30e3\u30f3\u30d0\u30b9\u753b\u50cf\u3092\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9",onClick:function(){return o({type:n})}})),l.a.createElement("li",null,l.a.createElement("input",{type:"image",className:"FloatButtons-button",src:"/button-settings.svg",alt:"\u8a2d\u5b9a\u30dc\u30bf\u30f3",title:"\u8a2d\u5b9a\u753b\u9762\u3092\u958b\u304f",onClick:function(){return r(!0)}})))):null}),m=(a(21),function(e){var t=e.already,a=l.a.useRef(null);return l.a.useEffect((function(){var e;return null===(e=a.current)||void 0===e?void 0:e.classList[t?"add":"remove"]("loaded")}),[t]),l.a.createElement("h1",{className:"SplashScreen-h1",title:"\u4e07\u9854\u93e1",ref:a},l.a.createElement("img",{className:"SplashScreen-img-logo",alt:"\u4e07\u9854\u93e1 \u30ed\u30b4\u753b\u50cf",src:"./splash-logo.svg"}),l.a.createElement("img",{className:"SplashScreen-img-star",alt:"",role:"presentation",src:"./splash-star.svg"}))}),h=a(10),f=a(25),g=a(26),v=a(27),E=a(28),p=a(29),b=a(30),y=(a(22),"https://ver-1000000.github.io/mangankyo/"),w="Mangankyo | \u4e07\u9854\u93e1",k="Ver1000000000",S="2rem",C=function(e){var t,a=e.already,n=e.scale,r=e.setScale,o=e.facingMode,c=e.floatButtonsVisibled,i=e.floatButtonsDownloadType,s=e.download,u=e.setFacingMode,d=e.setFloatButtonsVisibled,m=e.setFloatButtonsDownloadType,C=e.settingsVisibled,Y=e.setSettingsVisibled,M=l.a.useRef(null),O=l.a.useRef(null),j=l.a.useCallback(function(e,t){return function(){t("user"===e?"environment":"user")}}(o,u),[o]);return l.a.useEffect(function(e,t){return function(){var a=function(a){27===a.keyCode&&(a.preventDefault(),t(!e))};return document.addEventListener("keydown",a),function(){return document.removeEventListener("keydown",a)}}}(C,Y),[C,Y]),l.a.useEffect(function(e,t){return function(){if(null!=t.current)return h.a.registerDialog(t.current),e?t.current.showModal():t.current.close(),function(){}}}(C,M),[C,M,a]),a?l.a.createElement(l.a.Fragment,null,l.a.createElement("dialog",{className:"Settings-dialog",ref:M,style:{backgroundImage:"url(./splash-star.svg)"}},l.a.createElement("section",null,l.a.createElement("h2",null,"\u8a2d\u5b9a"),l.a.createElement("dl",null,l.a.createElement("dt",null,"\u30d1\u30bf\u30fc\u30f3\u306e\u5927\u304d\u3055"),l.a.createElement("dd",null,l.a.createElement("output",null,null===(t=O.current)||void 0===t?void 0:t.value)),l.a.createElement("dd",null,l.a.createElement("input",{type:"range",step:"0.1",min:"0.1",max:"2.0",defaultValue:n,ref:O})),l.a.createElement("dd",null,l.a.createElement("button",{type:"button",className:"button",onClick:function(){var e;return r((null===(e=O.current)||void 0===e?void 0:e.valueAsNumber)||.5)}},"\u9069\u7528\u3059\u308b"))),l.a.createElement("dl",null,l.a.createElement("dt",null,"\u30d5\u30ed\u30f3\u30c8\u30ab\u30e1\u30e9 / \u30ea\u30a2\u30ab\u30e1\u30e9"),l.a.createElement("dd",null,l.a.createElement("small",null,"\u203b \u30c7\u30d0\u30a4\u30b9\u304c\u8a8d\u8b58\u3067\u304d\u306a\u3044\u5834\u5408\u306f\u5207\u308a\u66ff\u308f\u308a\u307e\u305b\u3093\u3002"),l.a.createElement("button",{type:"button",className:"button",onClick:j},"\u5207\u308a\u66ff\u3048\u308b"))),l.a.createElement("dl",null,l.a.createElement("dt",null,"\u30dc\u30bf\u30f3\u306e\u8868\u793a / \u975e\u8868\u793a\u3092\u5207\u308a\u66ff\u3048\u308b"),l.a.createElement("dd",null,l.a.createElement("small",null,"\u203b \u30dc\u30bf\u30f3\u304c\u975e\u8868\u793a\u306e\u6642\u3001\u30ad\u30e3\u30f3\u30d0\u30b9\u3092\u30af\u30ea\u30c3\u30af\u3059\u308b\u3068\u8a2d\u5b9a\u753b\u9762\u304c\u958b\u304d\u307e\u3059\u3002"),l.a.createElement("button",{type:"button",className:"button",onClick:function(){return d(!c)}},"\u30dc\u30bf\u30f3\u3092",c?"\u975e\u8868\u793a\u306b\u3059\u308b":"\u8868\u793a\u3059\u308b"))),l.a.createElement("dl",null,l.a.createElement("dt",null,"\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u30dc\u30bf\u30f3\u306e\u30e2\u30fc\u30c9\u3092\u5207\u308a\u66ff\u3048\u308b"),l.a.createElement("dd",null,l.a.createElement("button",{type:"button",className:"button",onClick:function(){return m("display"===i?"pattern":"display")}},"\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u30dc\u30bf\u30f3\u3092[","display"===i?"\u753b\u9762\u5168\u4f53":"\u6700\u5c0f\u30d1\u30bf\u30fc\u30f3","\u30e2\u30fc\u30c9] \u306b\u3059\u308b")))),l.a.createElement("section",null,l.a.createElement("h2",null,"\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9"),l.a.createElement("dl",null,l.a.createElement("dt",null,"\u8868\u793a\u3055\u308c\u3066\u3044\u308b\u30ad\u30e3\u30f3\u30d0\u30b9\u753b\u50cf\u3092\u4fdd\u5b58"),l.a.createElement("dd",null,l.a.createElement("button",{type:"button",className:"button",onClick:function(){return s({type:"display"})}},"\u753b\u9762\u5168\u4f53")),l.a.createElement("dd",null,l.a.createElement("button",{type:"button",className:"button",onClick:function(){return s({type:"pattern"})}},"\u6700\u5c0f\u30d1\u30bf\u30fc\u30f3")))),l.a.createElement("section",null,l.a.createElement("h2",null,"\u4e07\u9854\u93e1\u306b\u3064\u3044\u3066"),l.a.createElement("dl",null,l.a.createElement("dt",null,"Source on GitHub"),l.a.createElement("dd",null,l.a.createElement("a",{href:"https://github.com/ver-1000000/mangankyo"},"mangankyo"))),l.a.createElement("dl",null,l.a.createElement("dt",null,"WebSite / Author"),l.a.createElement("dd",null,l.a.createElement("a",{href:"https://ver1000000.com"},"Ver.1000000")," / ",l.a.createElement("a",{href:"https://twitter.com/Ver1000000000"},"@Ver1000000000")))),l.a.createElement("section",null,l.a.createElement("h2",null,"SNS\u3067\u5171\u6709"),l.a.createElement("dl",null,l.a.createElement("dd",{className:"Settings-shareButton-container"},l.a.createElement(f.a,{url:y},l.a.createElement(g.a,{size:S})),l.a.createElement(v.a,{url:y,title:w,via:k},l.a.createElement(E.a,{size:S})),l.a.createElement(p.a,{url:y,title:w},l.a.createElement(b.a,{size:S}))))),l.a.createElement("footer",{className:"Settings-footer"},l.a.createElement("button",{type:"button",className:"button sky",onClick:function(){return Y(!1)}},"close")))):null};function Y(e){if(null==e)throw alert("\u30ec\u30f3\u30c0\u30ea\u30f3\u30b0\u30a8\u30e9\u30fc: \u30da\u30fc\u30b8\u3092\u518d\u8aad\u8fbc\u3057\u3066\u304f\u3060\u3055\u3044\u3002"),new Error("Expected 'val' to be defined, but received ".concat(e))}var M=function(e){return e instanceof OverconstrainedError?alert("".concat(e.name,":\n\u8981\u6c42\u3055\u308c\u305f\u30c7\u30d0\u30a4\u30b9\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3002\n\u8a2d\u5b9a\u3092\u5909\u66f4\u3057\u3066\u304f\u3060\u3055\u3044\u3002")):alert("".concat(e.name,":\n").concat(e.message)),null},O=function(e){return e*Math.PI/180},j=function(e){var t=e.width,a=e.height,n=Object.assign(document.createElement("canvas"),{width:t,height:a}),l=n.getContext("2d");return[n,l]},B=function(e,t){var a=t.scale,n=Math.min(e.videoWidth,e.videoHeight)*a,l=n/2*Math.tan(O(60)),r=j({width:n,height:l}),o=Object(u.a)(r,2),c=o[0],i=o[1],s=[{x:n/2,y:0},{x:n,y:l},{x:0,y:l}],d=-Math.max(0,(e.videoWidth-e.videoHeight)/2),m=-Math.max(0,(e.videoHeight-e.videoWidth)/2);return i.save(),i.scale(a,a),i.drawImage(e,d,m,e.videoWidth,e.videoHeight),i.restore(),i.globalCompositeOperation="destination-in",i.beginPath(),i.moveTo(s[0].x,s[0].y),i.lineTo(s[1].x,s[1].y),i.lineTo(s[2].x,s[2].y),i.closePath(),i.fill(),i.globalCompositeOperation="source-over",c},N=function(e,t){var a=j({width:3*e.width,height:2*e.height}),n=Object(u.a)(a,2),l=n[0],r=n[1],o=function(t){var a=t.rotate,n=void 0===a?0:a,o=t.scaleY,c=void 0===o?1:o,i=t.translateX,s=void 0===i?0:i,u=t.translateY,d=void 0===u?0:u;r.setTransform(1,0,0,1,l.width/3,l.height/2),r.rotate(O(n)),r.scale(1,c),r.translate(s,d),r.drawImage(e,-l.width/3,-l.height/2)};return o({rotate:0,scaleY:1}),o({rotate:0,scaleY:-1}),o({rotate:0,scaleY:1,translateX:1.5*e.width,translateY:e.height}),o({rotate:0,scaleY:-1,translateX:1.5*e.width,translateY:e.height}),o({rotate:120,scaleY:1}),o({rotate:120,scaleY:-1}),o({rotate:120,scaleY:1,translateX:0,translateY:2*-e.height}),o({rotate:120,scaleY:-1,translateX:0,translateY:2*e.height}),o({rotate:120,scaleY:1,translateX:1.5*e.width,translateY:e.height}),o({rotate:240,scaleY:1}),o({rotate:240,scaleY:-1}),o({rotate:240,scaleY:1,translateX:0,translateY:2*e.height}),o({rotate:240,scaleY:-1,translateX:0,translateY:2*-e.height}),o({rotate:240,scaleY:-1,translateX:1.5*e.width,translateY:e.height}),t(l),r.createPattern(r.canvas,"repeat")},x=function(){var e=Object(s.a)(i.a.mark((function e(t,a){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.srcObject instanceof MediaStream&&t.srcObject.getTracks().forEach((function(e){return e.stop()})),e.abrupt("return",navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:a}}).catch(M));case 2:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),V=function(){var e=Object(s.a)(i.a.mark((function e(t,a){var n,l,r,o,c,s,u,d,m,h;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.canvas,l=a.scale,r=a.facingMode,o=a.setPatternCanvas,c=a.setAlready,Y(n),e.next=4,x(t,r);case 4:return t.srcObject=e.sent,s=n.getContext("2d"),u=n.getBoundingClientRect(),d=u.width,m=u.height,Object.assign(n,{width:d,height:m}),h=function e(){var a=B(t,{scale:l});s.fillStyle=N(a,o),s.fillRect(0,0,d,m),t.paused||requestAnimationFrame(e)},e.next=11,t.play().then((function(){return h()})).then((function(){return c(!0)}));case 11:return e.abrupt("return",t.srcObject);case 12:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),D=function(e,t){return function(a){Y(e.current),Y(t);var n="display"===a.type?e.current:t,l=n.width,r=n.height,o=j({width:l,height:r}),c=Object(u.a)(o,2),i=c[0];c[1].drawImage(e.current,0,0);var s=document.createElement("a"),d=document.createElement("img");document.body.appendChild(s),document.body.appendChild(d),s.href=d.src=i.toDataURL(),s.download="mangankyo_".concat((new Date).toLocaleString("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"numeric"}).replace(/\D/g,""),".png"),s.click(),s.remove(),d.remove()}},F=function(){var e=document.createElement("video");return["playsinline","muted","autoplay"].forEach((function(t){return e.setAttribute(t,"")})),e}(),T=function(){var e=l.a.useState(!1),t=Object(u.a)(e,2),a=t[0],n=t[1],r=l.a.useState(!0),o=Object(u.a)(r,2),c=o[0],i=o[1],s=l.a.useState("display"),h=Object(u.a)(s,2),f=h[0],g=h[1],v=l.a.useState(!1),E=Object(u.a)(v,2),p=E[0],b=E[1],y=l.a.useState("user"),w=Object(u.a)(y,2),k=w[0],S=w[1],Y=l.a.useState(.5),O=Object(u.a)(Y,2),j=O[0],B=O[1],N=l.a.useState(null),x=Object(u.a)(N,2),T=x[0],A=x[1],P=l.a.useRef(null),R=l.a.useCallback(D(P,T),[T]),X=F;return l.a.useEffect(function(e){var t=e.video,a=e.canvasRef,n=e.scale,l=e.facingMode,r=e.setPatternCanvas,o=e.setAlready;return function(){var e;if("function"===typeof(null===(e=navigator.mediaDevices)||void 0===e?void 0:e.getUserMedia)){var c=V(t,{video:t,canvas:a.current,scale:n,facingMode:l,setPatternCanvas:r,setAlready:o});return function(){o(!1),c.then((function(){return t.paused||t.pause()})).then((function(){return o(!0)}))}}M(new Error("\u304a\u4f7f\u3044\u306e\u30d6\u30e9\u30a6\u30b6\u306fgetUserMedia()\u306b\u672a\u5bfe\u5fdc\u3067\u3059\u3002\n\u4ed6\u306e\u30d6\u30e9\u30a6\u30b6\u3092\u3054\u5229\u7528\u304f\u3060\u3055\u3044\u3002"))}}({video:X,canvasRef:P,scale:j,facingMode:k,setPatternCanvas:A,setAlready:n}),[P,j,k]),l.a.createElement(l.a.Fragment,null,l.a.createElement("canvas",{ref:P,className:"App-canvas",style:{pointerEvents:c?"none":"auto"},onClick:function(){return b(!0)}}),l.a.createElement(m,{already:a}),l.a.createElement(d,{already:a,floatButtonsVisibled:c,floatButtonsDownloadType:f,download:R,setSettingsVisibled:b}),l.a.createElement(C,{already:a,scale:j,facingMode:k,floatButtonsVisibled:c,floatButtonsDownloadType:f,download:R,setScale:B,setFacingMode:S,settingsVisibled:p,setSettingsVisibled:b,setFloatButtonsVisibled:i,setFloatButtonsDownloadType:g}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(T,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[12,1,2]]]);
//# sourceMappingURL=main.a6ea34d1.chunk.js.map