(this["webpackJsonpbetter-bookmarks-client"]=this["webpackJsonpbetter-bookmarks-client"]||[]).push([[0],{115:function(e,t,a){e.exports=a(209)},120:function(e,t,a){},123:function(e,t){},125:function(e,t){},159:function(e,t){},160:function(e,t){},204:function(e,t,a){},209:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),c=a(48),o=a.n(c),l=(a(120),a(10)),s=a(216),u=a(110),i=a(14),m=a(30),d=a(17),p=(a(202),a(203),a(204),a(9)),f=a.n(p),b=a(16),E=a(212),h=a(213),g=a(214),w=Object(n.createContext)(),O=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));console.log("isDev: ".concat(O));var x=O?"http://127.0.0.1:4000":"https://betterbookmarks.herokuapp.com",j="https://twitter.com/i/oauth2/authorize?response_type=code&client_id=YnEzOGs2Y2pLMWRUTXM2X3dYU1g6MTpjaQ&redirect_uri="+x+"/twtauth?user=",y=function(){var e=Object(b.a)(f.a.mark((function e(t,a,n,r){var c,o,l,s,u,i;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=x+"/auth"+(r?"/signup":"/login"),console.log("authenticating with url: "),console.log(c),o={email:t,password:a,twtId:n||null},e.prev=4,e.next=7,fetch(c,{method:"POST",cache:"no-cache",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});case 7:return l=e.sent,s=l.status,e.next=11,l.json();case 11:if(u=e.sent,r){e.next=16;break}return e.abrupt("return",{error:200===s?null:u,success:200===s?u.message:null,token:u.token||null,userId:u.userId||null,twtChallenge:u.twtChallenge||null});case 16:if(200!==s){e.next=27;break}return e.next=19,y(t,a,null,!1);case 19:if(!(i=e.sent).success){e.next=24;break}return e.abrupt("return",{error:null,success:"Account created & logged in!",token:i.token,userId:i.userId,twtChallenge:i.twtChallenge});case 24:return e.abrupt("return",{error:"User ".concat(t," created but login failed.")});case 25:e.next=28;break;case 27:return e.abrupt("return",{error:u});case 28:e.next=34;break;case 30:return e.prev=30,e.t0=e.catch(4),console.error(e.t0),e.abrupt("return",{error:"Unknown error"});case 34:case"end":return e.stop()}}),e,null,[[4,30]])})));return function(t,a,n,r){return e.apply(this,arguments)}}(),k=function(){var e=Object(b.a)(f.a.mark((function e(t){var a,n,r,c;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=x+"/user/signout",e.prev=1,e.next=4,fetch(a,{method:"Get",cache:"no-cache",headers:{Authorization:"JWT ".concat(t)}});case 4:return n=e.sent,r=n.status,console.log("in logout, response:"),e.next=9,n.json();case 9:if(c=e.sent,console.log(c),200!==r){e.next=15;break}return e.abrupt("return",{error:null,success:c.message});case 15:return e.abrupt("return",{error:c.message});case 16:e.next=21;break;case 18:return e.prev=18,e.t0=e.catch(1),e.abrupt("return",{error:"Unknown error logging out."});case 21:case"end":return e.stop()}}),e,null,[[1,18]])})));return function(t){return e.apply(this,arguments)}}(),v=function(){var e=Object(n.useContext)(w),t=e.state,a=e.dispatch,c=t.loggedIn,o=t.token,l=function(){var e=Object(b.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o){e.next=3;break}return Object(d.b)("No user to logout!",{type:"error"}),e.abrupt("return");case 3:return e.next=5,k(o);case 5:if(!(t=e.sent).error){e.next=9;break}return Object(d.b)(t.error,{type:"error"}),e.abrupt("return");case 9:Object(d.b)(t.success,{type:"success"}),["SET_USER","SET_LOGIN","SET_TOKEN","SET_FOLDERS","SET_USER_ID"].forEach((function(e){return a({type:e,payload:null})}));case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement(E.a,{sticky:"top",className:"nav"},r.a.createElement(h.a,{tag:i.b,to:"/",className:"text-white navbrand"},"Better Bookmarks"),r.a.createElement(i.c,{to:"/folders",className:"text-white"},"Folders"),r.a.createElement(i.c,{to:"/likes",className:"text-white"},"Likes"),r.a.createElement(i.c,{to:"/import",className:"text-white"},"Import"),r.a.createElement(g.a,{className:"text-white float-right navtxt"},c?r.a.createElement("span",{onClick:l,className:"text-white text-large link"},"Logout"):r.a.createElement(i.c,{className:"text-white text-large",to:"/auth"},"Login")))},N=function(){return r.a.createElement(m.a,{to:"/"})},S=a(215),T=a(217),I=a(218),C=a(219),_=a(220),L=a(221),R=a(222),U=a(223),z=function(){var e=Object(n.useContext)(w),t=e.state,a=e.dispatch,c=t.loggedIn,o=Object(n.useState)(!1),u=Object(l.a)(o,2),i=u[0],p=u[1],E=Object(n.useState)(!1),h=Object(l.a)(E,2),g=h[0],O=h[1],x=Object(n.useState)(!0),j=Object(l.a)(x,2),k=j[0],v=j[1],N=Object(n.useState)(""),z=Object(l.a)(N,2),G=z[0],W=z[1],F=Object(n.useState)(""),D=Object(l.a)(F,2),A=D[0],B=D[1],K=Object(n.useState)(""),J=Object(l.a)(K,2),M=J[0],P=J[1],H=Object(n.useState)(""),Y=Object(l.a)(H,2),X=Y[0],$=Y[1],q=Object(n.useState)(!1),Q=Object(l.a)(q,2),V=Q[0],Z=Q[1],ee=function(){var e=Object(b.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),""!==G&&""!==A&&(k||""!==M)){e.next=4;break}return Object(d.b)("Please complete all required fields.",{type:"error"}),e.abrupt("return");case 4:if(k||A===M){e.next=7;break}return Object(d.b)("Passwords do not match!",{type:"error"}),e.abrupt("return");case 7:O(!0),p(!0);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();Object(n.useEffect)((function(){i?Object(b.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y(G,A,X,!k);case 2:(t=e.sent).error?Object(d.b)(t.error,{type:"error"}):(Object(d.b)(t.success,{type:"success"}),console.log("authResult:"),console.log(t),te(G,t)),O(!1),p(!1);case 6:case"end":return e.stop()}}),e)})))():O(!1)}),[i]);var te=function(e,t){console.log("setting credentials: "),console.log(e,t.token,t.userId,t.twtChallenge),a({type:"SET_USER",payload:e}),a({type:"SET_TOKEN",payload:t.token}),a({type:"SET_USER_ID",payload:t.userId}),a({type:"SET_TWT_CHALLENGE",payload:t.twtChallenge}),a({type:"SET_LOGIN",payload:!0})};return g?r.a.createElement("div",{className:"Center"},r.a.createElement(S.a,{color:"primary"}),r.a.createElement("div",{className:"text-primary"},"Loading...")):c?r.a.createElement(m.a,{to:"/folders"}):r.a.createElement(s.a,{fluid:!0,className:"mt-5 "},r.a.createElement(T.a,null,r.a.createElement(I.a,{md:"8",className:"offset-md-2 p-3 "},r.a.createElement(C.a,{className:"formcard auth-form",onSubmit:ee},r.a.createElement(_.a,{className:"mt-4"},r.a.createElement("input",{className:"input",type:"email",name:"email",id:"email",placeholder:"Email",value:G,onChange:function(e){return W(e.target.value)}})),r.a.createElement(_.a,null,r.a.createElement("input",{className:"input mt-2",type:"password",name:"password",id:"password",value:A,onChange:function(e){return B(e.target.value)},placeholder:"Password"})),k?r.a.createElement(_.a,{check:!0,className:"mt-2"},r.a.createElement(L.a,{check:!0},r.a.createElement(R.a,{className:"checkmark",type:"checkbox",onChange:function(){Z(!V)},checked:V})," ",r.a.createElement("span",{className:"text-right",style:{color:"#f9f9f9",fontWeight:"400",letterSpacing:"1px"}},"Stay signed in"))):[r.a.createElement(_.a,{key:"password-confirm"},r.a.createElement("input",{className:"input mt-2",type:"password",name:"password-confirm",id:"password-confirm",value:M,onChange:function(e){return P(e.target.value)},placeholder:"Confirm password"})),r.a.createElement(_.a,{key:"twtId"},r.a.createElement("input",{className:"input mt-2",type:"text",name:"twtId",id:"twtId",value:X,onChange:function(e){return $(e.target.value)},placeholder:"Twitter Username"}))],r.a.createElement(U.a,{type:"submit",color:"primary",block:!0,className:"text-uppercase button mt-5",style:{padding:"15px",fontSize:"18px"}},k?"Sign in":"Register")))),r.a.createElement(T.a,null,r.a.createElement(I.a,{md:"8",className:"offset-md-8"},r.a.createElement(U.a,{onClick:function(){v(!k)},type:"button",className:"text-uppercase button-static",style:{padding:"15px",fontSize:"18px"}},k?"Register":"Sign in"))))},G=a(224),W=a(225),F=a(226),D=function(e,t,a){return j+e+"&code_challenge="+t+"&scope=tweet.read%20like.read&state="+a+"&code_challenge_method=plain"},A=function(e){var t=e.location;console.log("in home, location.search: ".concat(t.search)),"?close"===t.search&&(console.log("closing window"),window.close());var a=Object(n.useContext)(w),c=a.state,o=(a.dispatch,c.loggedIn),s=c.userId,u=c.twtChallenge,i=c.twtState,m=Object(n.useState)(!1),d=Object(l.a)(m,2),p=d[0],f=d[1],b=Object(n.useState)(""),E=Object(l.a)(b,2),h=E[0],g=E[1];return Object(n.useEffect)((function(){o&&s?(g(D(s,u,i)),f(!0),console.log("twtChallenge: ".concat(u)),console.log("twtState: ".concat(i))):(g(""),f(!1))}),[o]),r.a.createElement("div",{className:"center-home"},r.a.createElement(G.a,{className:"homecard card-fab"},r.a.createElement(W.a,null,"Welcome to Better Bookmarks"),r.a.createElement(F.a,null,r.a.createElement("ul",null,r.a.createElement("li",null,"Organize your favorite Tweets into folders"),r.a.createElement("li",null,"Share folders with anyone"),r.a.createElement("li",null,'No more "This Tweet has been deleted"')),p?r.a.createElement("span",{className:"link",onClick:function(){window.open(h)}},"Login with Twitter"):null)))},B=a(227),K=a(228),J="https://betterbookmarks.herokuapp.com",M=function(){var e=Object(b.a)(f.a.mark((function e(t){var a,n,r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return J+"/user/folders",e.prev=1,e.next=4,fetch("https://betterbookmarks.herokuapp.com/user/folders",{method:"GET",cache:"no-cache",headers:{Authorization:"JWT ".concat(t)}});case 4:return a=e.sent,n=a.status,e.next=8,a.json();case 8:if(r=e.sent,200!==n){e.next=13;break}return e.abrupt("return",{error:null,folders:r.folders});case 13:return e.abrupt("return",{error:r.message});case 14:e.next=20;break;case 16:return e.prev=16,e.t0=e.catch(1),console.error(e.t0),e.abrupt("return",null);case 20:case"end":return e.stop()}}),e,null,[[1,16]])})));return function(t){return e.apply(this,arguments)}}(),P=function(){var e=Object(b.a)(f.a.mark((function e(t,a){var n,r,c,o;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=J+"/user/folders/"+t,console.log("getonefolder URL:"),console.log(n),e.prev=3,e.next=6,fetch(n,{method:"GET",cache:"no-cache",headers:{Authorization:"JWT ".concat(a)}});case 6:return r=e.sent,c=r.status,console.log("getting one folder status: ".concat(c)),e.next=11,r.json();case 11:if(o=e.sent,200!==c){e.next=16;break}return e.abrupt("return",{error:null,tweets:o.tweets});case 16:return e.abrupt("return",{error:o.message});case 17:e.next=23;break;case 19:return e.prev=19,e.t0=e.catch(3),console.error(e.t0),e.abrupt("return",{error:e.t0});case 23:case"end":return e.stop()}}),e,null,[[3,19]])})));return function(t,a){return e.apply(this,arguments)}}(),H=a(42),Y=function(e){var t=e.folder,a=e.folderKey,c=Object(n.useContext)(w),o=(c.state,c.dispatch),l=Object(m.g)();return r.a.createElement(T.a,null,r.a.createElement(I.a,{onClick:function(){return e=a,console.log("clicked folder ".concat(e)),o({type:"SET_SINGLE_FOLDER",payload:e}),o({type:"SET_SINGLE_FOLDER_NAME",payload:t.folderName}),void l.push("/onefolder");var e},md:"10",className:"d-flex justify-content-center align-items-center text-large cardtxt",style:{fontWeight:"700",fontSize:"32px",letterSpacing:"2px"}},r.a.createElement("div",{className:"name"},t.folderName)),r.a.createElement(I.a,{md:"2",className:"d-flex justify-content-center align-items-center"},r.a.createElement("div",{className:"iconbtn mr-4 "},r.a.createElement(H.a,{onClick:function(){},color:"#FF6370",className:" icon",style:{zIndex:"1"}})),r.a.createElement("div",{className:"iconbtn mr-5",style:{marginRight:"30px"}},r.a.createElement(H.b,{className:"icon ",color:"#54eafe",onClick:function(){}})," ")))},X=function(){var e=Object(n.useContext)(w),t=e.state,a=(e.dispatch,t.loggedIn),c=t.token,o=Object(n.useState)(!0),u=Object(l.a)(o,2),i=u[0],p=u[1],E=Object(n.useState)(!1),h=Object(l.a)(E,2),g=h[0],O=h[1],x=Object(n.useState)([]),j=Object(l.a)(x,2),y=j[0],k=j[1];return Object(n.useEffect)((function(){g||a&&Object(b.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M(c);case 2:if(!(t=e.sent).error){e.next=8;break}return Object(d.b)("Error: ".concat(t.error)),O(!0),p(!1),e.abrupt("return");case 8:t.folders&&(console.log("got folders: "),console.log(t.folders),k(t.folders),O(!0),p(!1));case 9:case"end":return e.stop()}}),e)})))()}),[g]),a?i?r.a.createElement("div",{className:"Center"},r.a.createElement(S.a,{color:"primary"}),r.a.createElement("div",{className:"text-primary"},"Loading...")):(console.log("rendering folders: "),console.log(y),r.a.createElement(s.a,{className:"mt-4 mb-5 folder-list"},0!==y.length||i?r.a.createElement(B.a,null,y.map((function(e){return r.a.createElement(K.a,{key:e.folderId,className:"listcard mt-4"},r.a.createElement(Y,{folder:e,folderKey:e.folderId}))}))):r.a.createElement("div",{className:"Center text-large cardtxt",style:{fontWeight:"700",fontSize:"32px",letterSpacing:"2px"}},"No folders found!"))):r.a.createElement(m.a,{to:"/auth"})},$=a(113),q=(a(210),a(114)),Q=function(e){var t=e.tweet,a=(e.tweetKey,e.embed),c=Object(n.useContext)(w);c.state,c.dispatch,Object(m.g)();return r.a.createElement(T.a,null,r.a.createElement(I.a,{md:"10",className:"d-flex justify-content-center align-items-center text-large cardtxt",style:{fontWeight:"700",fontSize:"32px",letterSpacing:"2px"}},r.a.createElement("div",{hidden:!a,className:"tweet"},r.a.createElement(q.a,{tweetId:t.twtId})),r.a.createElement("div",{hidden:!!a,className:"tweet"},t.twtText)),r.a.createElement(I.a,{md:"2",className:"d-flex justify-content-center align-items-center"},r.a.createElement("div",{className:"iconbtn"},r.a.createElement(H.a,{onClick:function(){},color:"#FF6370",className:" icon",style:{zIndex:"1"}}))))},V=function(){var e=Object(n.useContext)(w),t=e.state,a=(e.dispatch,Object(m.g)()),c=t.folder,o=t.folderName,u=t.loggedIn,i=t.token,p=Object(n.useState)(!0),E=Object(l.a)(p,2),h=E[0],g=E[1],O=Object(n.useState)(!0),x=Object(l.a)(O,2),j=x[0],y=x[1],k=Object(n.useState)([]),v=Object(l.a)(k,2),N=v[0],C=v[1],_=Object(n.useState)(!0),L=Object(l.a)(_,2),R=L[0],U=L[1];Object(n.useEffect)((function(){j&&c&&u&&Object(b.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P(c,i);case 2:if(!(t=e.sent).error){e.next=8;break}return Object(d.b)("Error: ".concat(t.error)),y(!1),g(!1),e.abrupt("return");case 8:t.tweets&&(console.log("got tweets: "),console.log(t.tweets),C(t.tweets),y(!1),g(!1));case 9:case"end":return e.stop()}}),e)})))()})),Object(n.useEffect)((function(){}));if(u){if(h)return r.a.createElement("div",{className:"Center"},r.a.createElement(S.a,{color:"primary"}),r.a.createElement("div",{className:"text-primary"},"Loading..."));var z=[],G=[];N.forEach((function(e,t){t%2===0?z.push(r.a.createElement(K.a,{key:e.twtId,className:"tweetcard mb-4"},r.a.createElement(Q,{tweet:e,embed:R,tweetKey:e.twtId}))):G.push(r.a.createElement(K.a,{key:e.twtId,className:"tweetcard mb-4"},r.a.createElement(Q,{tweet:e,embed:R,tweetKey:e.twtId})))}));for(var W=[],F=0;F<z.length;F++)W.push(r.a.createElement(T.a,null,r.a.createElement(I.a,null,z[F]),r.a.createElement(I.a,null,G[F]?G[F]:null)));return r.a.createElement(r.a.Fragment,null," ",r.a.createElement(s.a,{className:"tweetcard"},r.a.createElement(T.a,null,r.a.createElement(I.a,{md:"2"},r.a.createElement("div",{className:"icon",onClick:function(){a.push("/folders")}},r.a.createElement($.a,{size:22,className:" text-white"}))),r.a.createElement(I.a,{md:"8"},r.a.createElement("div",{className:"folderName"},o)),r.a.createElement(I.a,{onClick:function(){U(!R)},md:"2"},r.a.createElement("div",{className:"text-white float-right text-large link"},R?"Text":"Embedded")))),r.a.createElement(s.a,{scrollable:!0,className:"mt-4 mb-5 tweet-list"},0!==N.length||h?r.a.createElement(B.a,null,r.a.createElement(s.a,null,W)):r.a.createElement("div",{className:"Center text-large cardtxt",style:{fontWeight:"700",fontSize:"32px",letterSpacing:"2px"}},"No Tweets (yet)!")))}return r.a.createElement(m.a,{to:"/auth"})},Z=a(12),ee=function(e,t){switch(t.type){case"SET_TWT_CHALLENGE":return null===t.payload?Object(Z.a)({},e,{twtChallenge:null}):Object(Z.a)({},e,{twtChallenge:t.payload});case"SET_USER_ID":return null===t.payload?Object(Z.a)({},e,{userId:null}):Object(Z.a)({},e,{userId:t.payload});case"SET_SINGLE_FOLDER_NAME":return Object(Z.a)({},e,{folderName:t.payload});case"SET_SINGLE_FOLDER":return Object(Z.a)({},e,{folder:t.payload});case"SET_PREV_USER":return null===t.payload?Object(Z.a)({},e,{prevUser:null}):Object(Z.a)({},e,{prevUser:t.payload});case"SET_SHOW_LOGOUT":return Object(Z.a)({},e,{showLogout:t.payload});case"RESET_SIGNIN":return Object(Z.a)({},e,{signIn:!0});case"SET_FOLDERS":return null===t.payload?Object(Z.a)({},e,{folders:[]}):Object(Z.a)({},e,{folders:t.payload});case"SET_LOGIN":return null===t.payload?Object(Z.a)({},e,{loggedIn:!1}):Object(Z.a)({},e,{loggedIn:t.payload});case"SET_USER":return null===t.payload?Object(Z.a)({},e,{user:null}):Object(Z.a)({},e,{user:t.payload});case"SET_TOKEN":return null===t.payload||!1===t.payload?Object(Z.a)({},e,{token:null}):Object(Z.a)({},e,{token:t.payload});default:return e}},te={showLogout:!1,inAuth:!1,loggedIn:!1,twtAuth:{authed:!1,twtId:null,twtToken:null,twtSecret:null},user:null,userId:null,twtChallenge:null,twtState:Object(u.randomBytes)(48).toString("hex"),prevUser:null,token:null,folders:[],folder:{},folerName:null,folderToUpdate:null,folderIdToUpdate:null},ae=function(){var e=Object(n.useReducer)(ee,te),t=Object(l.a)(e,2),a=t[0],c=t[1];return r.a.createElement(i.a,{basename:"better-bookmarks"},r.a.createElement(w.Provider,{value:{state:a,dispatch:c}},r.a.createElement(d.a,{theme:"dark"}),r.a.createElement(v,null),r.a.createElement(s.a,{className:"h-75"},r.a.createElement(m.d,null,r.a.createElement(m.b,{exact:!0,path:"/auth",component:z}),r.a.createElement(m.b,{exact:!0,path:"/folders",component:X}),r.a.createElement(m.b,{exact:!0,path:"/onefolder",component:V}),r.a.createElement(m.b,{exact:!0,path:"/",component:A}),r.a.createElement(m.b,{exact:!0,path:"*",component:N})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ae,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[115,1,2]]]);
//# sourceMappingURL=main.da4900b1.chunk.js.map