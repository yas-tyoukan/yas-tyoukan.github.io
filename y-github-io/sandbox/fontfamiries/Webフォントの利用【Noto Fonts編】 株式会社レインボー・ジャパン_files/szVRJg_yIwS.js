if (self.CavalryLogger) { CavalryLogger.start_js(["zf7BP"]); }

__d("ChannelClientID",[],(function a(b,c,d,e,f,g){var h=(Math.random()*2147483648|0).toString(16),i={getID:function j(){return h}};f.exports=i}),null);
__d('destroyOnUnload',['Run'],(function a(b,c,d,e,f,g){function h(i){c('Run').onLeave(i)}f.exports=h}),null);
__d('ImageTimingHelper',['Arbiter','BigPipe','URI'],(function a(b,c,d,e,f,g){var h={},i={};c('Arbiter').subscribe(c('BigPipe').Events.init,function(j,k){if(k.lid&&k.lid!=='0')k.arbiter.subscribe('images_displayed',function(l,m){var n=h[m.lid];if(!n)n=h[m.lid]=[];m.images.forEach(function(o){try{var p=new (c('URI'))(o);o=p.setFragment('').toString()}catch(q){return}if(i[o])return;i[o]=true;n.push({pagelet:m.pagelet,timeslice:m.timeslice,ts:m.ts,uri:o})})});});f.exports.getImageTimings=function(j){return h[j]||[]}}),null);
__d('PageletEventsHelper',['Arbiter','PageletEventConstsJS'],(function a(b,c,d,e,f,g){var h='BigPipe/init',i='pagelet_event',j='phase_begin',k={},l=[],m=false;function n(){return {pagelets:{},categories:{},phase_start:{},display_resources:{},all_resources:{}}}function o(r,s,t,u){if(k[u].pagelets[s]==undefined)k[u].pagelets[s]={};k[u].pagelets[s][r]=t}function p(r){r.subscribe(i,function(s,t){var event=t.event,u=t.ts,v=t.id,w=t.lid,x=t.phase,y=t.categories,z=t.allResources,aa=t.displayResources;o(event,v,u,w);var ba=k[w],ca=ba.pagelets[v];if(event===c('PageletEventConstsJS').ARRIVE_END){ca.phase=x;ba.all_resources[v]=z;ba.display_resources[v]=aa}if((event===c('PageletEventConstsJS').ONLOAD_END||event===c('PageletEventConstsJS').DISPLAY_END)&&y)y.forEach(function(fa){if(ba.categories[fa]==undefined)ba.categories[fa]={};ba.categories[fa][event]=u});for(var da=0,ea=l.length;da<ea;da++)l[da](v,event,u,w);});r.subscribe(j,function(event,s){k[s.lid].phase_start[s.phase]=s.ts})}var q={init:function r(){if(m)return;c('Arbiter').subscribe(h,function(event,s){var t=s.lid,u=s.arbiter;k[t]=n();p(u)});m=true},getMetrics:function r(s){if(k[s])return JSON.parse(JSON.stringify(k[s]));return null},subscribeToPageletEvents:function r(s){l.push(s);return {remove:function t(){l.splice(0,l.indexOf(s))}}}};f.exports=q}),null);
__d('PluginCSSReflowHack',['Style'],(function a(b,c,d,e,f,g){var h={trigger:function i(j){setTimeout(function(){var k='border-bottom-width',l=c('Style').get(j,k);c('Style').set(j,k,parseInt(l,10)+1+'px');var m=j.offsetHeight;c('Style').set(j,k,l);return m},1000)}};f.exports=h}),null);
__d('PluginConfirm',['DOMEvent','DOMEventListener','PluginMessage','PopupWindow','URI','PlatformBaseVersioning'],(function a(b,c,d,e,f,g){function h(i){Object.assign(this,{plugin:i,confirm_params:{},return_params:c('URI').getRequestURI().getQueryData()});this.addReturnParams({ret:'sentry'});delete this.return_params.hash}Object.assign(h.prototype,{addConfirmParams:function i(j){Object.assign(this.confirm_params,j)},addReturnParams:function i(j){Object.assign(this.return_params,j);return this},start:function i(){var j=c('PlatformBaseVersioning').versionAwareURI(new (c('URI'))('/plugins/error/confirm/'+this.plugin)).addQueryData(this.confirm_params).addQueryData({secure:c('URI').getRequestURI().isSecure(),plugin:this.plugin,return_params:JSON.stringify(this.return_params)});this.popup=c('PopupWindow').open(j.toString(),320,486);c('PluginMessage').listen();return this}});h.starter=function(i,j,k){var l=new h(i);l.addConfirmParams(j||{});l.addReturnParams(k||{});return l.start.bind(l)};h.listen=function(i,j,k,l){c('DOMEventListener').add(i,'click',function(m){new (c('DOMEvent'))(m).kill();h.starter(j,k,l)()})};f.exports=h}),null);
__d('PluginConnection',['Arbiter','CSS','Plugin'],(function a(b,c,d,e,f,g){var h=function i(){};Object.assign(h.prototype,{init:function i(j,k,l,event){event=event||c('Plugin').CONNECT;this.identifier=j;this.element=k;this.css=l;c('Arbiter').subscribe([c('Plugin').CONNECT,c('Plugin').DISCONNECT],function(m,n){if(j===n.href)c('CSS')[m===event?'addClass':'removeClass'](k,l);return true});return this},connected:function i(){return c('CSS').hasClass(this.element,this.css)},connect:function i(){return c('Arbiter').inform(c('Plugin').CONNECT,{href:this.identifier},c('Arbiter').BEHAVIOR_STATE)},disconnect:function i(){return c('Arbiter').inform(c('Plugin').DISCONNECT,{href:this.identifier},c('Arbiter').BEHAVIOR_STATE)},toggle:function i(){return this.connected()?this.disconnect():this.connect()}});h.init=function(i){for(var j,k=0;k<i.length;k++){j=new h();j.init.apply(j,i[k])}};f.exports=h}),null);
__d('BanzaiLogger',['Banzai'],(function a(b,c,d,e,f,g){var h='logger';function i(k){return {log:function l(m,n){c('Banzai').post(j._getRoute(m),n,k)},registerToSendWithBeacon:function l(m,n,o,p){c('Banzai').registerToSendWithBeacon(j._getRoute(m),n,o,p)},_getRoute:function l(m){return h+':'+m}}}var j=i();j.create=i;f.exports=j}),null);
__d("PagePluginActionTypes",[],(function a(b,c,d,e,f,g){f.exports=Object.freeze({CLICK:"click"})}),null);
__d("PagePluginActions",[],(function a(b,c,d,e,f,g){f.exports=Object.freeze({PAGE_AVATAR:"page_avatar",PAGE_CTA:"page_cta",PAGE_LIKE:"page_like",PAGE_PERMALINK:"page_permalink",PAGE_SHARE:"page_share",PAGE_UNLIKE:"page_unlike"})}),null);
__d('PluginPageActionLogger',['BanzaiLogger','BanzaiODS','DOM','Event','PagePluginActions','PagePluginActionTypes'],(function a(b,c,d,e,f,g){var h={initializeClickLoggers:function i(j,k,l,m,n,o,p,q,r,s){var t=function u(v,w){try{var x=c('DOM').find(m,'.'+v);c('Event').listen(x,'click',function(y){c('BanzaiODS').bumpEntityKey('platform_www','platform.plugin.page.action');c('BanzaiLogger').log('PagePluginActionsLoggerConfig',{page_id:k,page_plugin_action:w,page_plugin_action_type:c('PagePluginActionTypes').CLICK,referer_url:l,is_sdk:j})})}catch(y){}};t(n,c('PagePluginActions').PAGE_LIKE);t(o,c('PagePluginActions').PAGE_UNLIKE);t(p,c('PagePluginActions').PAGE_AVATAR);t(q,c('PagePluginActions').PAGE_PERMALINK);t(r,c('PagePluginActions').PAGE_SHARE);t(s,c('PagePluginActions').PAGE_CTA)}};f.exports=h}),null);
__d('XHRHttpError',[],(function a(b,c,d,e,f,g){'use strict';var h='HTTP_CLIENT_ERROR',i='HTTP_PROXY_ERROR',j='HTTP_SERVER_ERROR',k='HTTP_TRANSPORT_ERROR',l='HTTP_UNKNOWN_ERROR',m={HTTP_CLIENT_ERROR:h,HTTP_PROXY_ERROR:i,HTTP_SERVER_ERROR:j,HTTP_TRANSPORT_ERROR:k,HTTP_UNKNOWN_ERROR:l,getErrorCode:function n(o,p){if(p===0){var q=o.getProtocol();if(q==='file'||q==='ftp')return null;return k}else if(p>=100&&p<200){return i}else if(p>=200&&p<300){return null}else if(p>=400&&p<500){return h}else if(p>=500&&p<600){return j}else if(p>=12001&&p<12156){return k}else return l;}};f.exports=m}),null);
__d('xhrSimpleDataSerializer',[],(function a(b,c,d,e,f,g){'use strict';function h(i){var j=[];for(var k in i)j.push(encodeURIComponent(k)+'='+encodeURIComponent(i[k]));return j.join('&')}f.exports=h}),null);
__d('XHRRequest',['invariant','Env','ErrorUtils','ResourceTimingsStore','ResourceTypes','TimeSlice','URI','XHRHttpError','ZeroRewrites','getAsyncHeaders','xhrSimpleDataSerializer'],(function a(b,c,d,e,f,g,h){var i={errorCode:null,errorMsg:null,errorType:null},j={loadedBytes:null,totalBytes:null};function k(l){'use strict';this.setURI(l);this.setResponseType(null);this.setMethod('POST');this.setTransportBuilder(c('ZeroRewrites').getTransportBuilderForURI(this.getURI()));this.setDataSerializer(c('xhrSimpleDataSerializer'));this.$XHRRequest1=c('ResourceTimingsStore').getUID(c('ResourceTypes').XHR,l!=null?l.toString():'')}k.prototype.setURI=function(l){'use strict';this.$XHRRequest2=c('ZeroRewrites').rewriteURI(new (c('URI'))(l));return this};k.prototype.getURI=function(){'use strict';return this.$XHRRequest2};k.prototype.setResponseType=function(l){'use strict';this.$XHRRequest3=l;return this};k.prototype.setMethod=function(l){'use strict';this.$XHRRequest4=l;return this};k.prototype.getMethod=function(){'use strict';return this.$XHRRequest4};k.prototype.setData=function(l){'use strict';this.$XHRRequest5=l;return this};k.prototype.getData=function(){'use strict';return this.$XHRRequest5};k.prototype.setRawData=function(l){'use strict';this.$XHRRequest6=l;return this};k.prototype.setRequestHeader=function(l,m){'use strict';if(!this.$XHRRequest7)this.$XHRRequest7={};this.$XHRRequest7[l]=m;return this};k.prototype.setTimeout=function(l){'use strict';this.$XHRRequest8=l;return this};k.prototype.getTimeout=function(){'use strict';return this.$XHRRequest8};k.prototype.setResponseHandler=function(l){'use strict';this.$XHRRequest9=l;return this};k.prototype.getResponseHandler=function(){'use strict';return this.$XHRRequest9};k.prototype.setErrorHandler=function(l){'use strict';this.$XHRRequest10=l;return this};k.prototype.getErrorHandler=function(){'use strict';return this.$XHRRequest10};k.prototype.setNetworkFailureHandler=function(l){'use strict';this.$XHRRequest11=l;return this};k.prototype.getNetworkFailureHandler=function(){'use strict';return this.$XHRRequest11};k.prototype.setAbortHandler=function(l){'use strict';this.$XHRRequest12=l;return this};k.prototype.getAbortHandler=function(){'use strict';return this.$XHRRequest12};k.prototype.setTimeoutHandler=function(l){'use strict';this.$XHRRequest13=l;return this};k.prototype.setUploadProgressHandler=function(l){'use strict';this.$XHRRequest14=l;return this};k.prototype.setDownloadProgressHandler=function(l){'use strict';this.$XHRRequest15=l;return this};k.prototype.setTransportBuilder=function(l){'use strict';this.$XHRRequest16=l;return this};k.prototype.setDataSerializer=function(l){'use strict';this.$XHRRequest17=l;return this};k.prototype.send=function(){'use strict';var l=this.$XHRRequest8,m=this.$XHRRequest16(),n=this.getURI(),o=new (c('URI'))(n).getQualifiedURI().toString(),p=this.$XHRRequest1;c('ResourceTimingsStore').updateURI(c('ResourceTypes').XHR,p,o);c('ResourceTimingsStore').measureRequestSent(c('ResourceTypes').XHR,p);this.$XHRRequest18=m;var q;this.$XHRRequest4==='POST'||!this.$XHRRequest6||h(0);if(c('Env').force_param)Object.assign(this.$XHRRequest5,c('Env').force_param);if(this.$XHRRequest4==='GET'||this.$XHRRequest6){n.addQueryData(this.$XHRRequest5);q=this.$XHRRequest6}else q=this.$XHRRequest17(this.$XHRRequest5);var r=c('TimeSlice').guard(function v(w){c('ResourceTimingsStore').measureResponseReceived(c('ResourceTypes').XHR,p);for(var x=arguments.length,y=Array(x>1?x-1:0),z=1;z<x;z++)y[z-1]=arguments[z];w.apply(this,y)},'XHRRequest response received',{isContinuation:true});m.onreadystatechange=this.$XHRRequest19(r);m.onerror=this.$XHRRequest20(r);if(m.upload&&this.$XHRRequest14)m.upload.onprogress=this.$XHRRequest21.bind(this);if(this.$XHRRequest15)m.onprogress=this.$XHRRequest22.bind(this);if(l)this.$XHRRequest23=setTimeout(this.$XHRRequest24.bind(this),l);if(this.$XHRRequest25!==null&&this.$XHRRequest25!==undefined)m.withCredentials=this.$XHRRequest25;m.open(this.$XHRRequest4,n.toString(),true);var s=false;if(this.$XHRRequest7)for(var t in this.$XHRRequest7){if(t.toLowerCase()==='content-type')s=true;m.setRequestHeader(t,this.$XHRRequest7[t])}if(this.$XHRRequest4=='POST'&&!this.$XHRRequest6&&!s)m.setRequestHeader('Content-Type','application/x-www-form-urlencoded');var u=c('getAsyncHeaders')(n);Object.keys(u).forEach(function(v){m.setRequestHeader(v,u[v])});if(this.$XHRRequest3==='arraybuffer')if('responseType' in m){m.responseType='arraybuffer'}else if('overrideMimeType' in m){m.overrideMimeType('text/plain; charset=x-user-defined')}else if('setRequestHeader' in m)m.setRequestHeader('Accept-Charset','x-user-defined');if(this.$XHRRequest3==='blob')m.responseType=this.$XHRRequest3;m.send(q)};k.prototype.abort=function(l){'use strict';this.$XHRRequest26();if(this.$XHRRequest12)c('ErrorUtils').applyWithGuard(this.$XHRRequest12,null,[l],null,'XHRRequest:_abortHandler');};k.prototype.$XHRRequest26=function(){'use strict';var l=this.$XHRRequest18;if(l){l.onreadystatechange=null;l.abort()}this.$XHRRequest27()};k.prototype.$XHRRequest24=function(){'use strict';this.$XHRRequest26();if(this.$XHRRequest13)c('ErrorUtils').applyWithGuard(this.$XHRRequest13,null,null,null,'XHRRequest:_abortHandler');};k.prototype.$XHRRequest28=function(l){'use strict';if(this.$XHRRequest3)if('response' in l){return l.response}else if(this.$XHRRequest3==='arraybuffer')if(window.VBArray){return window.VBArray(l.responseBody).toArray()}return l.responseText};k.prototype.$XHRRequest20=function(l){'use strict';return function(){var m={};m.errorCode=c('XHRHttpError').HTTP_TRANSPORT_ERROR;m.errorMsg='Network Failure.';m.errorType='Network';if(this.$XHRRequest11){c('ErrorUtils').applyWithGuard(l.bind(undefined,this.$XHRRequest11),null,[m],null,'XHRRequest:_networkFailureHandler')}else l(function(){});}.bind(this)};k.prototype.$XHRRequest19=function(l){'use strict';var m=c('TimeSlice').guard(function(n){for(var o=arguments.length,p=Array(o>1?o-1:0),q=1;q<o;q++)p[q-1]=arguments[q];return n.apply(this,p)},'XHRRequest onreadystatechange',{isContinuation:false});return function(){var n=this.$XHRRequest18,o=n.readyState;if(o>=2){var p=o===4,q=this.getURI(),r=c('XHRHttpError').getErrorCode(q,n.status),s=this.$XHRRequest9;if(r!==null){if(p){i.errorCode=r;i.errorMsg=this.$XHRRequest28(n);i.errorType=n.status?'HTTP '+n.status:'HTTP';if(this.$XHRRequest10){c('ErrorUtils').applyWithGuard(l.bind(undefined,this.$XHRRequest10),null,[i],null,'XHRRequest:_errorHandler')}else l(function(){});}}else if(s){var t=null;if(s.includeHeaders)t=n.getAllResponseHeaders();if(p||s.parseStreaming&&o===3){var u=p?l:m;c('ErrorUtils').applyWithGuard(u.bind(undefined,s),null,[this.$XHRRequest28(n),t,p],null,'XHRRequest:handler')}}else if(p)l(function(){});if(p)this.$XHRRequest27();}}.bind(this)};k.prototype.$XHRRequest21=function(l){'use strict';j.loadedBytes=l.loaded;j.totalBytes=l.total;if(this.$XHRRequest14)c('ErrorUtils').applyWithGuard(this.$XHRRequest14,null,[j],null,'XHRRequest:_uploadProgressHandler');};k.prototype.$XHRRequest22=function(l){'use strict';var m={loadedBytes:l.loaded,totalBytes:l.total};if(this.$XHRRequest15)c('ErrorUtils').applyWithGuard(this.$XHRRequest15,null,[m],null,'XHRRequest:_downloadProgressHandler');};k.prototype.$XHRRequest27=function(){'use strict';clearTimeout(this.$XHRRequest23);delete this.$XHRRequest18};f.exports=k}),null);
__d('SimpleFBAuthenticatedXHRRequest',['invariant','CurrentUser','DTSG','ServerJSDefine','XHRRequest','isFacebookURI'],(function a(b,c,d,e,f,g,h){var i,j,k=1;i=babelHelpers.inherits(l,c('XHRRequest'));j=i&&i.prototype;function l(m,n){'use strict';j.constructor.call(this,m);var o={__dyn:c('ServerJSDefine').getLoadedModuleHash(),__req:(k++).toString(36),__ajax__:1,__a:1,__user:c('CurrentUser').getID()};j.setData.call(this,babelHelpers['extends']({},n,o))}l.prototype.send=function(){'use strict';if(!c('isFacebookURI')(this.getURI()))return j.send.call(this);if(c('DTSG').getCachedToken){var m=c('DTSG').getCachedToken();if(m){return this.sendOnDTSGToken(m)}else{c('DTSG').getToken().done(function(n){return this.sendOnDTSGToken(n)}.bind(this));return this}}else this.sendOnDTSGToken(c('DTSG').getToken());};l.prototype.sendOnDTSGToken=function(m){'use strict';if(m)j.setData.call(this,babelHelpers['extends']({},this.getData(),{fb_dtsg:m}));return j.send.call(this)};l.prototype.setData=function(m){'use strict';h(0)};l.parseResponse=function(m){'use strict';return JSON.parse(m.substr(9))};l.getPayload=function(m){'use strict';var n=l.parseResponse(m).payload;return n.payload?n.payload:n};f.exports=l}),null);
__d("XFantailLogController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("\/ajax\/fantail\/",{service:{type:"String",required:true}})}),null);
__d('FantailLogQueue',['ChannelClientID','CircularBuffer','FantailConfig','PHPQuerySerializer','SimpleFBAuthenticatedXHRRequest','XFantailLogController','destroyOnUnload','setIntervalAcrossTransitions','sprintf'],(function a(b,c,d,e,f,g){var h={DEBUG:'debug',INFO:'info',WARN:'warn',ERROR:'error'};function i(j){'use strict';this.$FantailLogQueue2=j;this.$FantailLogQueue3=new (c('CircularBuffer'))(200);c('setIntervalAcrossTransitions')(this.$FantailLogQueue4.bind(this),30*1000);c('destroyOnUnload')(this.$FantailLogQueue4.bind(this))}i.get=function(j){'use strict';i.$FantailLogQueue1=i.$FantailLogQueue1||{};i.$FantailLogQueue1[j]=i.$FantailLogQueue1[j]||new i(j);return i.$FantailLogQueue1[j]};i.prototype.debug=function(j){'use strict';for(var k=arguments.length,l=Array(k>1?k-1:0),m=1;m<k;m++)l[m-1]=arguments[m];this.$FantailLogQueue5.apply(this,[h.DEBUG,j].concat(l))};i.prototype.info=function(j){'use strict';for(var k=arguments.length,l=Array(k>1?k-1:0),m=1;m<k;m++)l[m-1]=arguments[m];this.$FantailLogQueue5.apply(this,[h.INFO,j].concat(l))};i.prototype.warn=function(j){'use strict';for(var k=arguments.length,l=Array(k>1?k-1:0),m=1;m<k;m++)l[m-1]=arguments[m];this.$FantailLogQueue5.apply(this,[h.WARN,j].concat(l))};i.prototype.error=function(j){'use strict';for(var k=arguments.length,l=Array(k>1?k-1:0),m=1;m<k;m++)l[m-1]=arguments[m];this.$FantailLogQueue5.apply(this,[h.ERROR,j].concat(l))};i.prototype.$FantailLogQueue5=function(j,k){'use strict';for(var l=arguments.length,m=Array(l>2?l-2:0),n=2;n<l;n++)m[n-2]=arguments[n];var o=c('sprintf').apply(undefined,[k].concat(m));this.$FantailLogQueue3.write({log_time:Date.now(),log:o,severity:j,device_id:c('ChannelClientID').getID()})};i.prototype.$FantailLogQueue4=function(){'use strict';var j=this.$FantailLogQueue3.read();if(j.length>0){var k={log_time:[],log:[],severity:[],device_id:[]};j.forEach(function(m){k.log_time.push(m.log_time);k.log.push(m.log);k.severity.push(m.severity);k.device_id.push(m.device_id)});this.$FantailLogQueue3.clear();var l=c('XFantailLogController').getURIBuilder().setString('service',this.$FantailLogQueue2).getURI();new (c('SimpleFBAuthenticatedXHRRequest'))(l,k).setMethod('POST').setDataSerializer(c('PHPQuerySerializer').serialize).setRequestHeader('Content-Type','application/x-www-form-urlencoded').send()}};f.exports=i}),null);
__d("NavigationMetricsEnumJS",[],(function a(b,c,d,e,f,g){f.exports=Object.freeze({NAVIGATION_START:"navigationStart",UNLOAD_EVENT_START:"unloadEventStart",UNLOAD_EVENT_END:"unloadEventEnd",REDIRECT_START:"redirectStart",REDIRECT_END:"redirectEnd",FETCH_START:"fetchStart",DOMAIN_LOOKUP_START:"domainLookupStart",DOMAIN_LOOKUP_END:"domainLookupEnd",CONNECT_START:"connectStart",CONNECT_END:"connectEnd",SECURE_CONNECTION_START:"secureConnectionStart",REQUEST_START:"requestStart",RESPONSE_START:"responseStart",RESPONSE_END:"responseEnd",DOM_LOADING:"domLoading",DOM_INTERACTIVE:"domInteractive",DOM_CONTENT_LOADED_EVENT_START:"domContentLoadedEventStart",DOM_CONTENT_LOADED_EVENT_END:"domContentLoadedEventEnd",DOM_COMPLETE:"domComplete",LOAD_EVENT_START:"loadEventStart",LOAD_EVENT_END:"loadEventEnd"})}),null);
__d("ResourceTimingMetricsEnumJS",[],(function a(b,c,d,e,f,g){f.exports=Object.freeze({START_TIME:"startTime",REDIRECT_START:"redirectStart",REDIRECT_END:"redirectEnd",FETCH_START:"fetchStart",DOMAIN_LOOKUP_START:"domainLookupStart",DOMAIN_LOOKUP_END:"domainLookupEnd",CONNECT_START:"connectStart",SECURE_CONNECTION_START:"secureConnectionStart",CONNECT_END:"connectEnd",REQUEST_START:"requestStart",RESPONSE_START:"responseStart",RESPONSE_END:"responseEnd"})}),null);
__d('NavigationTimingHelper',['NavigationMetricsEnumJS','forEachObject','performance'],(function a(b,c,d,e,f,g){function h(j,k){var l={};c('forEachObject')(c('NavigationMetricsEnumJS'),function(m){var n=k[m];if(n)l[m]=n+j;});return l}var i={getAsyncRequestTimings:function j(k){if(!k||!c('performance').timing||!c('performance').getEntriesByName)return undefined;var l=c('performance').getEntriesByName(k);if(l.length===0)return undefined;return h(c('performance').timing.navigationStart,l[0])},getNavTimings:function j(){if(!c('performance').timing)return undefined;return h(0,c('performance').timing)}};f.exports=i}),null);
__d('ResourceTimingBootloaderHelper',['Bootloader','ErrorUtils','ImageTimingHelper','Map','ResourceTimingMetricsEnumJS','ResourceTimingsStore','ResourceTypes','Set','URI','forEachObject','isEmpty','performance'],(function a(b,c,d,e,f,g){var h=500,i=[],j={},k={},l={},m=['.mp4','.m4v','.mpd','m4a'],n=new (c('Set'))(['bootload','js_exec','start_bootload','tag_bootload']);function o(x){for(var y=m,z=Array.isArray(y),aa=0,y=z?y:y[typeof Symbol==='function'?Symbol.iterator:'@@iterator']();;){var ba;if(z){if(aa>=y.length)break;ba=y[aa++]}else{aa=y.next();if(aa.done)break;ba=aa.value}var ca=ba;if(x.endsWith(ca))return true;}return false}function p(x){var y=new (c('Map'))();c('ResourceTimingsStore').getMapFor(x).forEach(function(z){if(z.requestSent!=null){var aa=y.get(z.uri);if(aa!=null){aa.push(z)}else y.set(z.uri,[z]);}});y.forEach(function(z){return z.sort(function(aa,ba){return aa.requestSent-ba.requestSent})});return y}function q(x,y,z,aa){var ba=x.get(y);if(ba!=null)for(var ca=0;ca<ba.length;ca++){var da=ba[ca],ea=da.requestSent,fa=da.responseReceived;if((z==null||ea!=null&&ea<=z)&&(aa==null||fa!=null&&fa>=aa))return ba.splice(ca,1)[0];}return null}function r(x,y,z,aa,ba,ca,da){if(!c('performance').timing||!c('performance').getEntriesByType)return null;var ea={},fa=c('performance').timing.navigationStart;if(z)ea=c('ImageTimingHelper').getImageTimings(aa).sort(function(ob,pb){return ob.ts-pb.ts}).reduce(function(ob,pb){if(ob[pb.uri])return ob;ob[pb.uri]=pb.pagelet;return ob},{});var ga=Array.from(c('performance').getEntriesByType('resource')),ha=ga.filter(function(ob){return ob.duration>=0&&ob.startTime!=null&&ob.startTime+fa>y&&(ba==null||ob.responseEnd==null||ob.responseEnd+fa<ba)});ha.sort(function(ob,pb){return ob.startTime-pb.startTime});var ia=ha.length,ja=0,ka=0,la=0,ma=0,na=0,oa=p(c('ResourceTypes').XHR),pa=p(c('ResourceTypes').CSS),qa=p(c('ResourceTypes').JS);for(var ra=0;ra<ha.length;ra++){var sa=ha[ra],ta='',ua='',va='',wa=void 0,xa=sa.initiatorType;switch(xa){case 'css':case 'link':case 'script':var ya=c('ResourceTimingsStore').parseMakeHasteURL(sa.name);if(!ya)continue;var za=ya[0],ab=ya[1];if((ab==='css'||ab==='js')&&da){var bb=ab==='css'?pa:qa;wa=q(bb,sa.name,sa.startTime+fa,sa.responseEnd+fa);if(wa!=null){ua=ab;ta=wa.uid;break}}if(ab==='css'||ab==='js'){ua=ab;var cb=l[sa.name]||la++;ta=cb+'_'+za}else{var db=u(sa.name);va=db[0];ua=db[1];ta=ka+++'_'+va}break;case 'img':ta=ka+++'_'+s(sa.name);ua='img';break;case 'iframe':ta=ma+++'_'+s(sa.name)+t(sa.name);ua='iframe';break;case 'xmlhttprequest':if(ca){var eb=s(sa.name),fb=t(sa.name);if(o(fb)){ta=na+++'_'+eb+fb;ua='video';break}else{wa=q(oa,sa.name,sa.startTime+fa,sa.responseEnd+fa);if(wa!=null){ua=c('ResourceTypes').XHR;ta=wa.uid;break}}}default:continue;}var gb={},hb=Object.keys(c('ResourceTimingMetricsEnumJS'));for(var ib=0;ib<hb.length;ib++){var jb=c('ResourceTimingMetricsEnumJS')[hb[ib]],kb=sa[jb];if(kb)gb[jb]=kb+c('performance').timing.navigationStart;}if(wa!=null){var lb=wa,mb=lb.requestSent,nb=lb.responseReceived;if(y!=null&&mb!=null&&mb<y||ba!=null&&nb!=null&&nb>ba)continue;gb.requestSent=mb;gb.responseReceived=nb}gb.type=ua;gb.desc=ta;if(ua=='img'&&Object.prototype.hasOwnProperty.call(ea,sa.name))gb.pagelet=ea[sa.name];gb.transferSize=sa.transferSize;gb.encodedBodySize=sa.encodedBodySize;if(x[sa.name]==undefined)x[sa.name]=[];ja++;x[sa.name].push(gb)}if(da)return {numValidEntries:ia,numSuccessfulMetrics:ja};return null}function s(x){var y=new (c('URI'))(x).getDomain();return y}function t(x){var y=new (c('URI'))(x).getPath();return y}function u(x){return [s(x),'img']}function v(x){var y=Object.keys(x).filter(function(aa){return aa.startsWith('start_bootload/')}).sort(function(aa,ba){return x[aa]-x[ba]}).map(function(aa){return aa.substring(aa.indexOf('/')+1)});y.forEach(function(aa){return n.forEach(function(ba){var ca=ba+'/'+aa;if(x[ca]!=null)j[ca]=x[ca];})});i=i.concat(y);if(i.length>h){var z=i.splice(0,i.length-h);z.forEach(function(aa){return n.forEach(function(ba){if(j[ba+'/'+aa])delete j[ba+'/'+aa];})})}}var w={addPastBootloaderMetricsToResourceTimings:function x(){var y=arguments.length<=0||arguments[0]===undefined?{}:arguments[0],z=arguments.length<=1||arguments[1]===undefined?{}:arguments[1],aa=c('Bootloader').getURLToHashMap();c('forEachObject')(y,function(ba,ca){var da=aa[ca];if(!da)return;var ea=new (c('Map'))();ea.set('bootloader_hash',da);n.forEach(function(fa){var ga=fa+'/'+da,ha=z[ga]||j[ga];if(ha!=null)ea.set(fa,ha);});if(ea.size>0)ba.forEach(function(fa){if(fa.requestSent||fa.responseReceived)return;ea.forEach(function(ga,ha){return fa[ha]=ga})});})},mergeBootloaderMetricsAndResourceTimings:function x(){var y=arguments.length<=0||arguments[0]===undefined?{}:arguments[0],z=arguments.length<=1||arguments[1]===undefined?{}:arguments[1],aa=arguments.length<=2||arguments[2]===undefined?true:arguments[2];if(c('isEmpty')(l))l=c('Bootloader').getURLToHashMap();var ba=new (c('Map'))();c('forEachObject')(l,function(da,ea){ba.set(da,ea)});var ca=[];c('forEachObject')(z,function(da,ea){var fa=ea.indexOf('/');if(fa===-1)return;var ga=ea.substring(0,fa);if(!n.has(ga))return;ca.push(ea);var ha=ea.substring(fa+1),ia=ba.get(ha);if(!ia){ia=ha;ha=l[ia];if(!ha)return;}if(ia.startsWith('data:'))ia='inlined resource: '+ha;if(y[ia]==null)y[ia]=[{}];y[ia].forEach(function(ja){ja.bootloader_hash=ha;ja[ga]=da})});if(!aa){v(z);ca.forEach(function(da){return delete z[da]})}return y},getLastTTIAndE2EImageResponseEnds:function x(y,z,aa){var ba={TTI:y,E2E:z};if(!c('performance').timing)return ba;var ca=aa.filter(function(fa){return fa.ts<=y}).map(function(fa){return fa.uri}).reduce(function(fa,ga){fa[ga]=true;return fa},{}),da=aa.map(function(fa){return fa.uri}).reduce(function(fa,ga){fa[ga]=true;return fa},{});for(var ea in k)k[ea].forEach(function(fa){if(fa.type==='img'){if(ca[ea])ba.TTI=Math.max(ba.TTI,fa.responseEnd);if(da[ea])ba.E2E=Math.max(ba.E2E,fa.responseEnd);}});return ba},getMetrics:function x(y,z,aa,ba,ca,da){k={};if(c('isEmpty')(l))l=c('Bootloader').getURLToHashMap();var ea=r(k,y,z,aa,ba,ca,da);return {data:k,diagnostics:ea}}};f.exports=w}),null);
__d('PerfXFlusher',['invariant','Banzai'],(function a(b,c,d,e,f,g,h){var i='perfx_custom_logger_endpoint',j=['perfx_page','perfx_page_type','lid'];function k(m){j.forEach(function(n){return h(n in m,'PerfXFlusher: Field "%s" missing in the PerfX payload',n)})}var l={flush:function m(n){k(n);c('Banzai').post(i,n,{signal:true})},registerToSendWithBeacon:function m(n){c('Banzai').registerToSendWithBeacon(i,n)}};f.exports=l}),null);
__d('DataAttributeUtils',['DataStore','Parent'],(function a(b,c,d,e,f,g){var h=[],i={LEGACY_CLICK_TRACKING_ATTRIBUTE:'data-ft',CLICK_TRACKING_DATASTORE_KEY:'data-ft',ENABLE_STORE_CLICK_TRACKING:'data-fte',IMPRESSION_TRACKING_CONFIG_ATTRIBUTE:'data-xt-vimp',IMPRESSION_TRACKING_CONFIG_DATASTORE_KEY:'data-xt-vimp',REMOVE_LEGACY_TRACKING:'data-ftr',getDataAttribute:function l(m,n){if(j[n])return j[n](m);return m.getAttribute(n)},setDataAttribute:function l(m,n,o){if(k[n])return k[n](m,o);return m.setAttribute(n,o)},getDataFt:function l(m){if(m.getAttribute(i.ENABLE_STORE_CLICK_TRACKING)){var n=c('DataStore').get(m,i.CLICK_TRACKING_DATASTORE_KEY);if(!n)n=i.moveClickTrackingToDataStore(m,m.getAttribute(i.REMOVE_LEGACY_TRACKING));return n}return m.getAttribute(i.LEGACY_CLICK_TRACKING_ATTRIBUTE)},setDataFt:function l(m,n){if(m.getAttribute(i.ENABLE_STORE_CLICK_TRACKING)){c('DataStore').set(m,i.CLICK_TRACKING_DATASTORE_KEY,n);return}m.setAttribute(i.LEGACY_CLICK_TRACKING_ATTRIBUTE,n)},moveXTVimp:function l(m){i.moveAttributeToDataStore(m,i.IMPRESSION_TRACKING_CONFIG_ATTRIBUTE,i.IMPRESSION_TRACKING_CONFIG_DATASTORE_KEY);h.push(m.id)},getXTrackableElements:function l(){var m=h.map(function(p){return document.getElementById(p)}).filter(function(p){return !!p}),n=document.querySelectorAll('[data-xt-vimp]');for(var o=0;o<n.length;o++)m.push(n[o]);return m},getDataAttributeGeneric:function l(m,n,o){var p=c('DataStore').get(m,o);return p!==undefined?p:m.getAttribute(n)},moveAttributeToDataStore:function l(m,n,o){var p=m.getAttribute(n);if(p){c('DataStore').set(m,o,p);m.removeAttribute(n)}},moveClickTrackingToDataStore:function l(m,n){var o=m.getAttribute(i.LEGACY_CLICK_TRACKING_ATTRIBUTE);if(o){c('DataStore').set(m,i.CLICK_TRACKING_DATASTORE_KEY,o);if(n)m.removeAttribute(i.LEGACY_CLICK_TRACKING_ATTRIBUTE);}return o},getClickTrackingParent:function l(m){var n=c('Parent').byAttribute(m,i.LEGACY_CLICK_TRACKING_ATTRIBUTE)||c('Parent').byAttribute(m,i.ENABLE_STORE_CLICK_TRACKING);return n},getClickTrackingElements:function l(m){return m.querySelectorAll('['+i.LEGACY_CLICK_TRACKING_ATTRIBUTE+'], '+'['+i.ENABLE_STORE_CLICK_TRACKING+']')},getParentByAttributeOrDataStoreKey:function l(m,n,o){while(m&&(!m.getAttribute||!m.getAttribute(n))&&c('DataStore').get(m,o)===undefined)m=m.parentNode;return m}},j={'data-ft':i.getDataFt,'data-xt-vimp':function l(m){return i.getDataAttributeGeneric(m,'data-xt-vimp','data-xt-vimp')},'data-ad':function l(m){return i.getDataAttributeGeneric(m,'data-ad','data-ad')},'data-xt':function l(m){return i.getDataAttributeGeneric(m,'data-xt','data-xt')}},k={'data-ft':i.setDataFt,'data-xt':function l(m,n){c('DataStore').set(m,'data-xt',n)}};f.exports=i}),null);
__d("pageLoadedViaSWCache",[],(function a(b,c,d,e,f,g){function h(){return self.__SW_CACHE__===1}f.exports=h}),null);
__d('PerfXLogger',['DataAttributeUtils','NavigationMetrics','NavigationTimingHelper','PerfXFlusher','Set','forEachObject','pageLoadedViaSWCache','performanceAbsoluteNow','setTimeoutAcrossTransitions'],(function a(b,c,d,e,f,g){var h={},i={},j=65*1000,k=['e2e','tti','all_pagelets_displayed','all_pagelets_loaded'],l={},m={_listenersSetUp:false,_setupListeners:function n(){if(this._listenersSetUp)return;this._subscribeToNavigationMetrics();c('PerfXFlusher').registerToSendWithBeacon(function(){var o=[];c('forEachObject')(h,function(p,q){if(!h[q].sent){var r=this.getPayload(q,'unload fired');if(r!=null)o.push(r);}}.bind(this));h={};return o}.bind(this));this._listenersSetUp=true},_init:function n(o){var p=o.lid;if(p==null)return;var q=i[p]||[];delete i[p];if(o.sw_controlled_tags){if(navigator.serviceWorker&&navigator.serviceWorker.controller)for(var r=0;r<o.sw_controlled_tags.length;r++)q.push(o.sw_controlled_tags[r]);delete o.sw_controlled_tags}h[p]=babelHelpers['extends']({tags:new (c('Set'))(q),sent:false},o);this._registerTimeoutSendback(p);this._setupListeners()},initWithNavigationMetricsLID:function n(o,p){var q=c('NavigationMetrics').getFullPageLoadLid();if(!q)return;this._init(babelHelpers['extends']({},p,{lid:q}));if(o&&o.always)for(var r=0;r<o.always.length;r++)m.addTag(q,o.always[r]);if(o&&o.swCache&&c('pageLoadedViaSWCache')())for(var s=0;s<o.swCache.length;s++)m.addTag(q,o.swCache[s]);},init:function n(o,p){if(p!=null&&o.lid!=null)l[o.lid]=p;this._init(o)},addTag:function n(o,p){var q=h[o];if(q){q.tags.add(p);return}if(!i[o])i[o]=[];i[o].push(p)},addTagWithNavigationMetricsLID:function n(o){var p=c('NavigationMetrics').getFullPageLoadLid();if(!p)return;m.addTag(p,o)},_registerTimeoutSendback:function n(o){var p=this._getFetchStart(o),q=j;if(p!=null)q-=c('performanceAbsoluteNow')()-p;c('setTimeoutAcrossTransitions')(function(){return this._uploadPayload(o,'sendback time out')}.bind(this),q)},_subscribeToNavigationMetrics:function n(){c('NavigationMetrics').addRetroactiveListener(c('NavigationMetrics').Events.EVENT_OCCURRED,function(o,p){if(!(o in h))return;if(k.includes(p.event)&&Object.prototype.hasOwnProperty.call(p,'timestamp')&&p.timestamp!=null){h[o][p.event]=p.timestamp;if(p.visibilityState)h[o][p.event+'_page_visibility']=p.visibilityState;}});c('NavigationMetrics').addRetroactiveListener(c('NavigationMetrics').Events.NAVIGATION_DONE,function(o,p){var q=p.serverLID;if(!(q in h))return;k.forEach(function(event){if(Object.prototype.hasOwnProperty.call(p,event)&&p[event]!=null)h[q][event]=p[event];});this._uploadPayload(q)}.bind(this))},_getPayloadWithOffset:function n(o,p,q){var r=h[o];if(r==null)return null;var s=Object.assign({},r),t=document.querySelector('[id^="hyperfeed_story_id"]');if(t){var u=JSON.parse(c('DataAttributeUtils').getDataFt(t));if(u)s.mf_query_id=u.qid;}s.tags=Array.from(r.tags);this._adjustValues(s,p);s.fetch_start=p;if(s.perfx_page_type==='normal'){var v=c('NavigationTimingHelper').getNavTimings();if(v!=null&&v.navigationStart!=null)s.nav_to_fetch=p-v.navigationStart;}if(q!=null)s.sendback_reason=q;if(navigator&&navigator.hardwareConcurrency)s.num_cores=navigator.hardwareConcurrency;if(navigator&&navigator.deviceMemory)s.ram_gb=navigator.deviceMemory;delete s.sent;return s},_uploadPayload:function n(o,p){if(h[o]!=null&&!h[o].sent){var q=this.getPayload(o,p);if(q!=null){c('PerfXFlusher').flush(q);h[o].sent=true}}},getPayload:function n(o,p){return this._getPayloadWithOffset(o,this._getFetchStart(o),p)},_getFetchStart:function n(o){if(!(o in h))return null;var p=void 0,q=h[o].perfx_page_type;if(q=='quickling'){if(!(o in l)){return null}else p=c('NavigationTimingHelper').getAsyncRequestTimings(l[o]);}else p=c('NavigationTimingHelper').getNavTimings();if(!p||!p.fetchStart)return null;return p.fetchStart},_adjustValues:function n(o,p){k.forEach(function(q){if(Object.prototype.hasOwnProperty.call(o,q))o[q]-=p;})}};f.exports=m}),null);
__d("XRelayBootloadController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("\/relay\/bootload\/",{component:{type:"String",required:true},params:{type:"String",required:true},route:{type:"String",required:true},uri:{type:"String",required:true}})}),null);