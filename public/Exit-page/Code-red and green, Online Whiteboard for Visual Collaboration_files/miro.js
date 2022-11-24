var miro=(()=>{var $=Object.defineProperty;var De=t=>$(t,"__esModule",{value:!0}),n=(t,e)=>$(t,"name",{value:e,configurable:!0});var Ce=(t,e)=>{De(t);for(var r in e)$(t,r,{get:e[r],enumerable:!0})};var Ve={};Ce(Ve,{board:()=>Ie,clientVersion:()=>Pe});var ae="sdkv2-plugin-message";function Le(t){return t.data?.commandId===ae}n(Le,"isPluginMessageEvent");function Te(t){return t!==null&&"window"in t}n(Te,"isWindow");var S=class{constructor(e){this.destroyed=!1;this.destroy=n(()=>{this.clients.forEach(e=>{e.waiting.clear()}),this.clients.clear(),this.hostWindow.removeEventListener("message",this.handlePostMessage),this.destroyed=!0},"destroy");this.createBus=n((e,r)=>{if(this.destroyed)throw new Error("SdkCommunicationBus: createBus is called on a destroyed instance");this.clients.set(e.container,{handler:r,target:e,waiting:new Map});let s=this.dispatch,{destroyBus:o}=this;return{target:e,dispatch(a,c){return s(e.container,a,c)},destroy(){return o(e.container)}}},"createBus");this.destroyBus=n(e=>{let r=this.clients.get(e);r&&(r.waiting.clear(),this.clients.delete(e))},"destroyBus");this.hostWindow=e,this.clients=new Map,this.handlePostMessage=this.handlePostMessage.bind(this),this.dispatch=this.dispatch.bind(this),this.destroyBus=this.destroyBus.bind(this),this.hostWindow.addEventListener("message",this.handlePostMessage)}getId(){return Math.random().toString(36).slice(-10)}handlePostMessage(e){if(!Le(e)||!Te(e.source))return;let r=this.clients.get(e.source);if(!r||r.target.origin!=="*"&&e.origin!==r.target.origin)return;let{data:s}=e,o=r.waiting.get(s.msgId);if(o)r.waiting.delete(s.msgId),o.resolve(s.payload);else{let a=n(c=>{c&&this.dispatch(r.target.container,c,s.msgId)},"after");r.handler(s.payload).then(a).catch(a)}}dispatch(e,r,s){return new Promise((o,a)=>{let c=!s,y=this.clients.get(e);if(!y)return;let F;c?(F=this.getId(),y.waiting.set(F,{resolve:o,reject:a})):F=s;let _e={commandId:ae,payload:r,msgId:F};y.target.container.postMessage(_e,y.target.origin),!c&&s&&(y.waiting.delete(s),o(null))})}};n(S,"SdkCommunicationBus");function de(t){return Object.keys(t)}n(de,"keys");function me(){return Math.random().toString(36).slice(-10)}n(me,"getId");function K(t){return t!=null&&typeof t=="object"&&!Array.isArray(t)}n(K,"isObject");function p(t,...e){if(!e.length)return t;let r=e.shift();return K(t)&&K(r)&&Object.keys(r).forEach(s=>{K(r[s])?(t[s]||Object.assign(t,{[s]:{}}),p(t[s],r[s])):Object.assign(t,{[s]:r[s]})}),p(t,...e)}n(p,"mergeDeep");function Z(t){let e={};return Object.keys(t).forEach(r=>{let s=t[r];typeof s!="function"&&(e[r]=s)}),e}n(Z,"asProps");var N;(function(r){r.Success="S",r.Fail="F"})(N||(N={}));var U=class{constructor({clientWindow:e=window}){let r=new S(e);this.waitingResponse=new Map,this.handlers=new Map,this.responseHandler=this.responseHandler.bind(this),this.handle=this.handle.bind(this),this.busDispatcher=r.createBus({container:e.parent,origin:"*"},this.handle)}push(e,r){let s=me(),a=[{name:e,payload:r,id:s}];return new Promise((c,y)=>{this.waitingResponse.set(s,{resolve:c,reject:y}),this.busDispatcher.dispatch(a).then(this.responseHandler)})}responseHandler(e){let r=e;for(let s=0;s<r.length;s++){let o=r[s];if(!o)continue;let a=this.waitingResponse.get(o.id);a&&(o.status===N.Success?a.resolve(o.payload):o.status===N.Fail&&a.reject(new Error(String(o.payload))),this.waitingResponse.delete(o.id))}return Promise.resolve([])}handle(e){let r=e,s=[];for(let o=0;o<r.length;o++){let a=r[o];if(a.status){this.responseHandler([a]);continue}let c=this.handlers.get(a.id);c&&c.forEach(y=>{s.push(y(a))})}return Promise.all(s)}subscribe(e,r){let s=this.handlers.get(e)||[];this.handlers.set(e,[...s,r])}unsubscribe(e,r){r||this.handlers.delete(e);let s=(this.handlers.get(e)||[]).filter(o=>o!==r);this.handlers.set(e,s)}};n(U,"IframeCommander");var ke=n(()=>{throw new Error("board not initialized")},"boardNotInitialised"),pe,E=n(()=>pe??ke(),"board"),Ae=n(()=>{throw new Error("commander not initialized")},"commanderNotInitialised"),ce,v=n(()=>ce??Ae(),"commander"),le=n(t=>{pe=t.board,ce=t.commander},"register");async function m(t,e){return e===void 0?v().push(t):v().push(t,e)}n(m,"runCommand");var u=class{async sync(){return E().sync(this)}};n(u,"BaseItem");var P=class extends u{constructor(e){super();this.type="text";this.content="";this.style={fillColor:"transparent",fillOpacity:1,fontFamily:"arial",fontSize:14,textAlign:"left"};p(this,e)}};n(P,"Text");var ue;(function(i){i.Rectangle="rectangle",i.Circle="circle",i.Triangle="triangle",i.WedgeRoundRectangleCallout="wedge_round_rectangle_callout",i.RoundRectangle="round_rectangle",i.Rhombus="rhombus",i.Parallelogram="parallelogram",i.Star="star",i.RightArrow="right_arrow",i.LeftArrow="left_arrow",i.Pentagon="pentagon",i.Hexagon="hexagon",i.Octagon="octagon",i.Trapezoid="trapezoid",i.FlowChartPredefinedProcess="flow_chart_predefined_process",i.LeftRightArrow="left_right_arrow",i.Cloud="cloud",i.LeftBrace="left_brace",i.RightBrace="right_brace",i.Cross="cross",i.Can="can"})(ue||(ue={}));var H;(function(d){d.Gray="gray",d.LightYellow="light_yellow",d.Yellow="yellow",d.Orange="orange",d.LightGreen="light_green",d.Green="green",d.DarkGreen="dark_green",d.Cyan="cyan",d.LightPink="light_pink",d.Pink="pink",d.Violet="violet",d.Red="red",d.LightBlue="light_blue",d.Blue="blue",d.DarkBlue="dark_blue",d.Black="black"})(H||(H={}));var Y;(function(l){l.Red="red",l.Magenta="magenta",l.Violet="violet",l.LightGreen="light_green",l.Green="green",l.DarkGreen="dark_green",l.Cyan="cyan",l.Blue="blue",l.DarkBlue="dark_blue",l.Yellow="yellow",l.Gray="gray",l.Black="black"})(Y||(Y={}));var x=class extends u{constructor(e){super();this.type="sticky_note";this.shape="square";this.content="";this.style={fillColor:H.LightYellow,textAlign:"center",textAlignVertical:"middle"};this.tagIds=[];p(this,e)}};n(x,"StickyNote");var I=class extends u{constructor(e){super();this.type="shape";this.content="";this.shape="rectangle";this.style={fillColor:"transparent",fontFamily:"arial",fontSize:14,textAlign:"center",textAlignVertical:"middle"};p(this,e)}};n(I,"Shape");var _=class extends u{constructor(e){super();this.type="image";this.title="";p(this,e)}};n(_,"Image");var D=class extends u{constructor(e){super();this.type="card";this.title="";this.description="";this.style={};this.dueDate=void 0;this.assignee=void 0;this.tagIds=[];p(this,e)}};n(D,"Card");var C=class extends u{constructor(e){super();this.type="app_card";this.owned=!1;this.title="";this.description="";this.style={};this.tagIds=[];this.status="disconnected";this.fields=[];p(this,e)}};n(C,"AppCard");var L=class extends u{constructor(e){super();this.type="frame";this.title="";this.childrenIds=[];this.style={fillColor:"transparent"};p(this,e)}async add(e){return this.childrenIds.push(e.id),await this.sync(),await e.sync(),e}async remove(e){let r=e.id;if(!r)throw new Error("trying to remove a non-existent item from a frame");let s=this.childrenIds.findIndex(o=>o===r);if(s===-1)throw new Error(`Can't remove item ${r} from frame ${this.id}. The item is not a current child`);this.childrenIds.splice(s,1),await this.sync(),await e.sync()}async getChildren(){let e=this.childrenIds;return e.length===0?[]:E().get({id:e})}};n(L,"Frame");var M=class extends u{constructor(e){super();this.type="unsupported";p(this,e)}};n(M,"Unsupported");var T=class extends u{constructor(e){super();this.type="preview";p(this,e)}};n(T,"Preview");var k=class extends u{constructor(e){super();this.type="embed";this.previewUrl="";this.mode="inline";p(this,e)}};n(k,"Embed");var A=class{constructor(e){this.type="connector";this.shape="curved";this.start=void 0;this.end=void 0;this.style={};p(this,e)}async sync(){return E().sync(this)}};n(A,"Connector");var R=class{constructor(e){this.type="tag";this.title="";this.color=Y.Red;p(this,e)}async sync(){return E().sync(this)}};n(R,"TagEntity");function w(t){switch(t.type){case"text":return new P(t);case"sticky_note":return new x(t);case"shape":return new I(t);case"image":return new _(t);case"frame":return new L(t);case"preview":return new T(t);case"card":return new D(t);case"app_card":return new C(t);case"embed":return new k(t);case"connector":return new A(t);case"tag":return new R(t);case"document":case"mockup":case"curve":case"webscreen":case"usm":case"mindmap":case"kanban":case"table":case"svg":case"emoji":default:return new M(t)}}n(w,"convertToSdkFormat");var Re=["drag","drop","dragend","dragstart"],Be={"pointer-events":"none","user-select":"none","-webkit-user-select":"none","-webkit-touch-callout":"none"},W=class{constructor(){this.listeners=[];this.originalBodyStyle={}}addListener(e,r,s){this.listeners.push({type:e,selector:r,handler:s})}removeListener(e,r,s){this.listeners=this.listeners.filter(o=>o.type!==e||r!=null&&o.selector!==r||s!=null&&o.handler!==s)}isDraggableElement(e){return!(e instanceof HTMLElement)&&!(e instanceof SVGElement)?!1:this.listeners.some(({selector:r})=>!!e.closest(r))}disableClickEvents(){Object.entries(Be).forEach(([e,r])=>{this.originalBodyStyle[e]=document.body.style.getPropertyValue(e),document.body.style.setProperty(e,r)})}restoreClickEvents(){Object.entries(this.originalBodyStyle).forEach(([e,r])=>{document.body.style.setProperty(e,r)}),this.originalBodyStyle={}}dragEnd(e){this.dispatch("dragend",{target:e,clientX:NaN,clientY:NaN,screenX:NaN,screenY:NaN})}dispatch(e,r){this.listeners.forEach(({selector:s,handler:o,type:a})=>{if(e!==a)return;let c=r.target.closest(s);if(!c)return;let y=new CustomEvent(e,{detail:{...r,target:c,type:e}});o(y)})}};n(W,"BaseDragSensor");var J=class extends W{constructor(){super();this.isDragging=!1;this.onMouseDown=n(e=>{let r=e.target;!this.isDraggableElement(r)||(this.target=r,window.addEventListener("mouseup",this.onMouseUp),document.addEventListener("mousemove",this.onMouseMove,{passive:!0}))},"onMouseDown");this.onMouseMove=n(e=>{if(!this.target)return;let{clientX:r,clientY:s,screenX:o,screenY:a}=e,c=this.isDragging?"drag":"dragstart";this.isDragging||this.disableClickEvents(),this.isDragging=!0,this.dispatch(c,{target:this.target,clientX:r,clientY:s,screenX:o,screenY:a})},"onMouseMove");this.onMouseUp=n(e=>{if(this.isDragging&&this.target){let{clientX:r,clientY:s,screenX:o,screenY:a}=e;this.dispatch("drop",{target:this.target,clientX:r,clientY:s,screenX:o,screenY:a})}this.resetDragging()},"onMouseUp");this.resetDragging=n(()=>{window.removeEventListener("mouseup",this.onMouseUp),document.removeEventListener("mousemove",this.onMouseMove),this.isDragging&&this.target&&this.dragEnd(this.target),this.target&&this.restoreClickEvents(),this.isDragging=!1,this.target=void 0},"resetDragging");document.addEventListener("mousedown",this.onMouseDown),window.addEventListener("blur",this.resetDragging)}};n(J,"MouseDragSensor");var Me=100,O=!1;window.addEventListener("touchmove",t=>{!O||t.preventDefault()},{passive:!1});var Q=class extends W{constructor(){super();this.onTouchStart=n(e=>{let{target:r}=e;if(!this.isDraggableElement(r))return;let{clientX:s,clientY:o,screenX:a,screenY:c}=e.touches[0];this.target=r,this.tapTimeout=window.setTimeout(()=>{this.startDragging({target:r,clientX:s,clientY:o,screenX:a,screenY:c})},Me),window.addEventListener("touchend",this.onTouchEnd),window.addEventListener("touchcancel",this.resetDragging),window.addEventListener("touchmove",this.resetDragging)},"onTouchStart");this.onTouchMove=n(e=>{if(!this.target)return;let{clientX:r,clientY:s,screenX:o,screenY:a}=e.touches[0];this.dispatch("drag",{target:this.target,clientX:r,clientY:s,screenX:o,screenY:a})},"onTouchMove");this.onTouchEnd=n(e=>{if(O&&this.target){let{clientX:s,clientY:o,screenX:a,screenY:c}=e.changedTouches[0];this.dispatch("drop",{target:this.target,clientX:s,clientY:o,screenX:a,screenY:c})}this.resetDragging()},"onTouchEnd");this.startDragging=n(e=>{window.removeEventListener("touchmove",this.resetDragging),window.addEventListener("touchmove",this.onTouchMove,{passive:!0}),O=!0,this.disableClickEvents(),this.dispatch("dragstart",e)},"startDragging");this.resetDragging=n(()=>{window.removeEventListener("touchend",this.onTouchEnd),window.removeEventListener("touchcancel",this.resetDragging),window.removeEventListener("touchmove",this.resetDragging),window.removeEventListener("touchmove",this.onTouchMove),O&&this.target&&(this.restoreClickEvents(),this.dragEnd(this.target)),this.target=void 0,O=!1,this.tapTimeout!==void 0&&(clearTimeout(this.tapTimeout),this.tapTimeout=void 0)},"resetDragging");window.addEventListener("touchstart",this.onTouchStart),window.addEventListener("blur",this.resetDragging)}};n(Q,"TouchDragSensor");var V=class{constructor(e){this.touchSensor=new Q,this.mouseSensor=new J,Object.assign(this,e)}addListener(e,r){this.mouseSensor.addListener(e,this.selector,r),this.touchSensor.addListener(e,this.selector,r)}removeListener(e,r){this.mouseSensor.removeListener(e,void 0,r),this.touchSensor.removeListener(e,void 0,r)}reset(){Re.forEach(e=>{this.mouseSensor.removeListener(e),this.touchSensor.removeListener(e)})}};n(V,"DragSensor");var f,ge=n(()=>{f?.reset(),f=new V({selector:".miro-draggable"})},"initDragSensor");function Oe(){return async t=>{let{clientX:e,clientY:r}=t.detail;await m("UI_DRAG_START",{clientX:e,clientY:r,dragImage:void 0})}}n(Oe,"onDragStart");function Ge(){let t;return e=>{if(t)return;t=requestAnimationFrame(()=>{t=void 0});let{clientX:r,clientY:s}=e.detail;m("UI_DRAG_MOVE",{clientX:r,clientY:s})}}n(Ge,"onDrag");function Fe(t){return async e=>{let{target:r,clientX:s,clientY:o}=e.detail,a=await m("UI_DRAG_DROP",{clientX:s,clientY:o});if(a==null)return;let{x:c,y}=a;t({x:c,y,target:r})}}n(Fe,"onDrop");function Se(){return async()=>{await m("UI_DRAG_END")}}n(Se,"onDragEnd");async function Ne(t){await v().push("UI_REGISTER_EVENT",{name:t})}n(Ne,"registerEventListener");async function Ue(t){await v().push("UI_UNREGISTER_EVENT",{name:t})}n(Ue,"unregisterEventListener");var ee="icon:click",te="app_card:open",re="app_card:connect",ne="selection:update",He="custom:",ye=n(t=>t.startsWith(He),"isCustomEvent"),se=class{constructor(){this.listeners={[ee]:[],[te]:[],[re]:[],[ne]:[]}}async addListener(e,r){this.listeners[e]||(this.listeners[e]=[]);let s=this.listeners[e];if(s.push(r),s.length===1)return Ne(e)}async removeListener(e,r){if(this.listeners[e]=this.listeners[e].filter(s=>s!==r),this.listeners[e].length===0)return Ue(e)}listen(){de(this.listeners).forEach(e=>{v().unsubscribe(e),v().subscribe(e,async r=>{this.listeners[e].forEach(s=>s(r))})})}};n(se,"AppManager");var g={drop:new Map,"app_card:connect":new Map,"app_card:open":new Map,"icon:click":new Map,"selection:update":new Map};function B(t,e,r){return g[t]||(g[t]=new Map),g[t].set(e,r),r}n(B,"linkEventHandlerToListener");function oe(t,e){let r=g[t],s=r.get(e);return r.delete(e),s}n(oe,"getListenerByEventHandler");var b=new se;function Ye(t){g.drop.size===0&&(g.dragstart=Oe(),g.drag=Ge(),g.dragend=Se(),f.addListener("dragstart",g.dragstart),f.addListener("drag",g.drag),f.addListener("dragend",g.dragend)),f.addListener("drop",B("drop",t,Fe(t)))}n(Ye,"attachDragAndDropListeners");function We(t){f.removeListener("drop",oe("drop",t)),g.drop.size===0&&(f.removeListener("dragstart",g.dragstart),f.removeListener("drag",g.drag),f.removeListener("dragend",g.dragend))}n(We,"detachDragAndDropListeners");function he(t,e){switch(t){case"drop":return Ye(e),Promise.resolve();case ee:return b.addListener(t,B(t,e,async()=>e()));case te:return b.addListener(t,B(t,e,async r=>{let{appCard:s}=r.payload,o={appCard:w(s)};e(o)}));case re:return b.addListener(t,B(t,e,async r=>{let{appCard:s}=r.payload,o={appCard:w(s)};e(o)}));case ne:return b.addListener(t,B(t,e,async r=>{let{items:s}=r.payload,o={items:s.map(a=>w(a))};e(o)}));default:if(ye(t)){let r=n(async s=>{let{items:o}=s.payload,a={items:o.map(c=>w(c))};e(a)},"internalHandler");return v().subscribe(t,r),B(t,e,r),b.addListener(t,r)}throw new Error(`unknown event: ${t}`)}}n(he,"on");function fe(t,e){switch(t){case"drop":return We(e),Promise.resolve();case ee:case te:case re:case ne:return b.removeListener(t,oe(t,e));default:if(ye(t)){let r=oe(t,e);return v().unsubscribe(t,r),b.removeListener(t,r)}throw new Error(`unknown event: ${t}`)}}n(fe,"off");var q=class{constructor(){this.on=he;this.off=fe}async openPanel(e){await m("UI_OPEN_PANEL",e)}async closePanel(){await m("UI_CLOSE_PANEL")}async openModal(e){await m("UI_OPEN_MODAL",e)}async closeModal(){await m("UI_CLOSE_MODAL")}};n(q,"BoardUI");var ve;(function(t){t.Red="red",t.Magenta="magenta",t.Violet="violet",t.LightGreen="light_green",t.Green="green",t.DarkGreen="dark_green",t.Cyan="cyan",t.Blue="blue",t.DarkBlue="dark_blue",t.Yellow="yellow",t.Gray="gray",t.Black="black"})(ve||(ve={}));var we;(function(t){t.Gray="gray",t.LightYellow="light_yellow",t.Yellow="yellow",t.Orange="orange",t.LightGreen="light_green",t.Green="green",t.DarkGreen="dark_green",t.Cyan="cyan",t.LightPink="light_pink",t.Pink="pink",t.Violet="violet",t.Red="red",t.LightBlue="light_blue",t.Blue="blue",t.DarkBlue="dark_blue",t.Black="black"})(we||(we={}));var be;(function(t){t.Rectangle="rectangle",t.Circle="circle",t.Triangle="triangle",t.WedgeRoundRectangleCallout="wedge_round_rectangle_callout",t.RoundRectangle="round_rectangle",t.Rhombus="rhombus",t.Parallelogram="parallelogram",t.Star="star",t.RightArrow="right_arrow",t.LeftArrow="left_arrow",t.Pentagon="pentagon",t.Hexagon="hexagon",t.Octagon="octagon",t.Trapezoid="trapezoid",t.FlowChartPredefinedProcess="flow_chart_predefined_process",t.LeftRightArrow="left_right_arrow",t.Cloud="cloud",t.LeftBrace="left_brace",t.RightBrace="right_brace",t.Cross="cross",t.Can="can"})(be||(be={}));var G;(function(t){t.Error="error",t.Info="info"})(G||(G={}));var ie="SHOW_NOTIFICATION",X=class{async showInfo(e){let r={message:e,type:G.Info};await m(ie,r)}async showError(e){let r={message:e,type:G.Error};await m(ie,r)}async show(e){await m(ie,e)}};n(X,"Notifications");var j=class{constructor(){}async get(){return await m("VIEWPORT_GET")}async set(e){return await m("VIEWPORT_SET",e)}async zoomTo(e){return Array.isArray(e)?m("VIEWPORT_ZOOM_TO",{items:e.map(r=>r.id)}):this.zoomTo([e])}};n(j,"Viewport");async function Ee(t,e){return p(e,t),e}n(Ee,"mergeResponse");async function h(t){let e=Z(t);return m("WIDGET_CREATE",e).then(r=>Ee(r,t))}n(h,"add");var z=class{constructor(){this.ui=new q;this.notifications=new X;this.viewport=new j}async createCard(e){return h(new D(e))}async createAppCard(e){return h(new C(e))}async createFrame(e){return h(new L(e))}async createImage(e){return h(new _(e))}async createPreview(e){return h(new T(e))}async createShape(e){return h(new I(e))}async createStickyNote(e){return h(new x(e))}async createText(e){return h(new P(e))}async createEmbed(e){return h(new k(e))}async createConnector(e){return h(new A(e))}async createTag(e){return h(new R(e))}async sync(e){let r=Z(e);return m("WIDGET_UPDATE",r).then(s=>{Ee(s,e)})}async remove(e){let{id:r,type:s}=e;await m("WIDGET_REMOVE",{id:r,type:s})}bringToFront(e){return Array.isArray(e)?m("BRING_TO_FRONT",{items:e.map(r=>r.id)}):this.bringToFront([e])}sendToBack(e){return Array.isArray(e)?m("SEND_TO_BACK",{items:e.map(r=>r.id)}):this.sendToBack([e])}async getById(e){let r=await this.get({id:e});if(Array.isArray(r)&&r.length)return w(r[0]);throw new Error(`Can not retrieve item with id ${e}`)}async get(e){let r=await m("WIDGET_GET",e);if(!Array.isArray(r))throw new Error("Error retrieving items");return r.map(w)}async getInfo(){return m("GET_BOARD_INFO")}async getUserInfo(){return m("GET_USER_INFO")}async getSelection(){return(await m("GET_SELECTION")).map(w)}async getAppData(e){return await m("GET_BOARD_APP_DATA",{key:e})}async setAppData(e,r){return await m("SET_BOARD_APP_DATA",{key:e,value:r})}async getIdToken(){return await m("GET_ID_TOKEN")}};n(z,"Board");var Pe="1.20788.0",xe=new U({clientWindow:window}),Ie=new z;le({commander:xe,board:Ie});xe.push("handshake",{clientVersion:Pe});ge();b.listen();new URLSearchParams(location.search).has("autotest")&&console.log("SDKv2 loaded for client version: 1.20788.0 and git commit: 2162528cbd884902398894d5cb604981aeb37720");return Ve;})();