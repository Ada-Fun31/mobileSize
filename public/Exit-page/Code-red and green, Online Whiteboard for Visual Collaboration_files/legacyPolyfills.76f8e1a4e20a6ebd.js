(self.webpackChunk=self.webpackChunk||[]).push([[17062],{550708:(t,e,n)=>{"use strict";n(531809)},531809:()=>{!function(){var t,e,n,o,i,r=document.querySelector(".rtbLoader_logo"),a=document.createElement("canvas"),s=b("361.576097 26 297.379942 26 373.532672 98.2291134 233.885178 26 169.689023 26 246.839857 124.314405 106.194259 26 42 26 119.216279 155.036325 42 494 106.194259 494 246.839857 137.686236 169.689023 494 233.885178 494 373.532672 111.600944 297.379942 494 361.576097 494 502 80.0761719"),u=b("361.576097 26 297.379942 26 374.080065 259.46232 233.885178 26 169.689023 26 247.38725 285.547611 106.194259 26 42 26 119.763672 316.269531 42 494 106.194259 494 247.38725 298.919442 169.689023 494 233.885178 494 374.080065 272.834151 297.379942 494 361.576097 494 502 241.309379"),l=b("321.576097 26 257.379942 26 373.942828 374.240832 193.885178 26 129.689023 26 247.250013 400.326123 66.1942589 26 2 26 119.626435 431.048043 2 494 66.1942589 494 247.250013 413.697954 129.689023 494 193.885178 494 373.942828 387.612663 257.379942 494 321.576097 494 502 356.087891"),c=b("520 26 455.874888 26 254.034953 406.018961 392.450391 26 328.325279 26 127.482343 432.104252 264.900781 26 200.777563 26 0 462.826172 200.777563 494 264.900781 494 127.482343 445.476083 328.325279 494 392.450391 494 254.034953 419.390792 455.874888 494 520 494 382.51619 387.866019"),d=(e=.8,n=0,o=.2,i=1,function(t){return L(function(t,e,n){for(var o=t,i=0;i<4;++i){var r=w(o,e,n);if(0===r)return o;o-=(L(o,e,n)-t)/r}return o}(t,e,o),n,i)});t=function(t,e,n,o,i,r,a){var s,u,l,c,d,f,p="init",y=!1,h=0,m=!1,g=t.getContext("2d"),v=window.devicePixelRatio||1;g.mozImageSmoothingEnabled=!1,g.imageSmoothingEnabled=!1;var b=r/o,L=a/i;function w(){if(e.length<2)throw new Error("Wtf, just render shape once and do not call this. Or define more shapes.");if("stop"!==p&&"pause"!==p){if("init"===p){g.clearRect(0,0,o,i);var t=(l=e[h=0]).points;g.beginPath(),g.fillStyle=n;for(var r=0;r<t.length;r++){var a=t[r];0===r?g.moveTo(a.x,a.y):g.lineTo(a.x,a.y)}g.fill(),T()}else if("delay"===p){(y=Date.now())>=c&&E()}else if("animate"===p){if(g.clearRect(0,0,o,i),u.points.length!==l.points.length)throw new Error("Invalid shapes config, points count should be the same");var y=Date.now();g.beginPath(),g.fillStyle=n;for(r=0;r<l.points.length;r++){var m,v,b=l.points[r],L=u.points[r];if(y>=f)m=b.x,v=b.y;else{var M=(y-d)/l.duration;M=l.easing(M),m=x(L.x,b.x,M),v=x(L.y,b.y,M)}0===r?g.moveTo(m,v):g.lineTo(m,v)}g.fill(),y>=f&&T()}s=requestAnimationFrame(w)}}function T(){h++,u=l,(l=e[h])||(h=0,l=e[0]),m&&console.info("Morph step",'from "'+u.id+'" to "'+l.id+'". Delay: '+l.delay),y?p="pause":l.delay?(p="delay",c=Date.now()+l.delay):E()}function E(){p="animate",d=Date.now(),f=d+l.duration}function x(t,e,n){return t+(e-t)*n}return t.width=b*o*v,t.height=L*i*v,t.style.width=b*o+"px",t.style.height=L*i+"px",g.scale(b*v,L*v),{start:function(){p="init",y=!1,w()},stop:function(){y=!1,p="stop",cancelAnimationFrame(s)},pause:function(){y=!0},resume:function(){y=!1,"pause"===p&&(E(),w())},setColor:function(t){n=t},showLogs:function(t){m=t}}}(a,[{id:"top-start",points:s,duration:400,delay:400,easing:function(t){return d(t)}},{id:"bottom",points:l,duration:400,delay:300,easing:function(t){return d(t)}},{id:"bottom-left",points:c,duration:400,delay:300,easing:function(t){return d(t)}},{id:"top",points:s,duration:400,delay:300,easing:function(t){return d(t)}},{id:"half",points:u,duration:400,delay:300,easing:function(t){return d(t)}},{id:"bottom",points:l,duration:400,delay:400,easing:function(t){return d(t)}}],"#E1E0E7",520,520,196,196),r.appendChild(a),r.removeChild(r.querySelector("svg")),t.start();var f=document.getElementById("rtb-loader"),p=f.querySelector(".rtbLoader_error"),y=p.querySelector(".rtbLoader_error_description"),h=p.querySelector(".rtbLoader_error_timeout"),m=!1,g={};function v(){h.innerHTML||y.innerHTML?(p.style.display="block",t.pause()):(p.style.display="none",t.resume())}function b(t){for(var e=t.split(" "),n=[],o=0;o<e.length;o+=2)n.push({x:parseFloat(e[o]),y:parseFloat(e[o+1])});return n}function L(t,e,n){return((T(e,n)*t+E(e,n))*t+x(e))*t}function w(t,e,n){return 3*T(e,n)*t*t+2*E(e,n)*t+x(e)}function T(t,e){return 1-3*e+3*t}function E(t,e){return 3*e-6*t}function x(t){return 3*t}g.shapesMorphAnimation=t,g.setErrorHTML=function(t){y.innerHTML=t,v()},g.setTimeoutHTML=function(t){h.innerHTML=t,v()},g.attachClick=function(t,e){var n=document.querySelector(t);n.setAttribute("no-prevent-ios-touchstart","true"),n.addEventListener("click",(function t(){n.removeEventListener("click",t),e()}))},g.setVisibility=function(e){e?m&&(m=!1,document.body.classList.add("app-loading"),f.style.display="block",t.start()):m||(m=!0,document.body.classList.remove("app-loading"),f.style.display="none",t.stop(),g.setErrorHTML(""),g.setTimeoutHTML(""))},window.rtbLoader=g}()}},t=>{var e;e=550708,t(t.s=e)}]);
//# sourceMappingURL=https://miro.com/app/static/legacyPolyfills.76f8e1a4e20a6ebd.js.map