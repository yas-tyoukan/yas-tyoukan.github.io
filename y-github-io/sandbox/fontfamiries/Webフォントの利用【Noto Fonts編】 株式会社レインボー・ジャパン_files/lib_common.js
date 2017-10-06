/* ------------------------------------------------------------------------
	* /js/lib/concat 内の各プラグインを結合
* ----------------------------------------------------------------------- */

/*--------------------------------------------------------------------------*
 *
 *  heightLine JavaScript Library beta4
 *
 *  MIT-style license.
 *
 *  2007 Kazuma Nishihata
 *  http://www.webcreativepark.net
 *
 *--------------------------------------------------------------------------*/
this.rjs = this.rjs || {};
(function($){

	rjs.heightLine = function(){

		this.className="hl";
		this.parentClassName="hlp";

		reg = new RegExp(this.className+"-([a-zA-Z0-9-_]+)", "i");
		objCN =new Array();
		var objAll = document.getElementsByTagName ? document.getElementsByTagName("*") : document.all;
		for(var i = 0; i < objAll.length; i++) {
			var eltClass = objAll[i].className.toString().split(/\s+/);
			for(var j = 0; j < eltClass.length; j++) {
				if(eltClass[j] === this.className) {
					if(!objCN["main CN"]) objCN["main CN"] = new Array();
					objCN["main CN"].push(objAll[i]);
					break;
				}else if(eltClass[j] === this.parentClassName){
					if(!objCN["parent CN"]) objCN["parent CN"] = new Array();
					objCN["parent CN"].push(objAll[i]);
					break;
				}else if(eltClass[j].match(reg)){
					var OCN = eltClass[j].match(reg)
					if(!objCN[OCN]) objCN[OCN]=new Array();
					objCN[OCN].push(objAll[i]);
					break;
				}
			}
		}

		//check font size
		var e = document.createElement("div");
		var s = document.createTextNode("S");
		e.appendChild(s);
		e.style.visibility="hidden"
		e.style.position="absolute"
		e.style.top="0"
		document.body.appendChild(e);
		var defHeight = e.offsetHeight;

		changeBoxSize = function(){
			for(var key in objCN){
				if (objCN.hasOwnProperty(key)) {
					//parent type
					if(key == "parent CN"){
						for(var i=0 ; i<objCN[key].length ; i++){
							var max_height=0;
							var CCN = objCN[key][i].childNodes;
							for(var j=0 ; j<CCN.length ; j++){
								if(CCN[j] && CCN[j].nodeType == 1){
									CCN[j].style.height="auto";
									max_height = max_height>CCN[j].offsetHeight?max_height:CCN[j].offsetHeight;
								}
							}
							for(var j=0 ; j<CCN.length ; j++){
								if(CCN[j].style){
									var stylea = CCN[j].currentStyle || document.defaultView.getComputedStyle(CCN[j], '');
									var newheight = max_height;
									if(stylea.paddingTop)newheight -= stylea.paddingTop.replace("px","");
									if(stylea.paddingBottom)newheight -= stylea.paddingBottom.replace("px","");
									if(stylea.borderTopWidth && stylea.borderTopWidth != "medium")newheight-= stylea.borderTopWidth.replace("px","");
									if(stylea.borderBottomWidth && stylea.borderBottomWidth != "medium")newheight-= stylea.borderBottomWidth.replace("px","");
									CCN[j].style.height =newheight+"px";
								}
							}
						}
					}else{
						var max_height=0;
						for(var i=0 ; i<objCN[key].length ; i++){
							objCN[key][i].style.height="auto";
							max_height = max_height>objCN[key][i].offsetHeight?max_height:objCN[key][i].offsetHeight;
						}
						for(var i=0 ; i<objCN[key].length ; i++){
							if(objCN[key][i].style){
								var stylea = objCN[key][i].currentStyle || document.defaultView.getComputedStyle(objCN[key][i], '');
									var newheight = max_height;
									if(stylea.paddingTop)newheight-= stylea.paddingTop.replace("px","");
									if(stylea.paddingBottom)newheight-= stylea.paddingBottom.replace("px","");
									if(stylea.borderTopWidth && stylea.borderTopWidth != "medium")newheight-= stylea.borderTopWidth.replace("px","")
									if(stylea.borderBottomWidth && stylea.borderBottomWidth != "medium")newheight-= stylea.borderBottomWidth.replace("px","");
									objCN[key][i].style.height =newheight+"px";
							}
						}
					}
				}
			}
		}

		checkBoxSize = function(){
			if(defHeight != e.offsetHeight){
				changeBoxSize();
				defHeight= e.offsetHeight;
			}
		}
		changeBoxSize();
		setInterval(checkBoxSize,1000)
		window.onresize=changeBoxSize;
	}

	/**
	 * 対象エリアに対して、指定した数毎にheightLine.js用グループクラスを付加
	 * @exsample
	 *	[MIN OPTION]
	 *		$('.class').rjs_hlg();
	 *	[MAX OPTION]
	 *		$('.class').rjs_hlg({colmax:4});
	 */
	rjs.setHeightLineGroup = function (){
		var that = this;
		var area_no = 0;

		// Option
		var defaults = {
			colmax:'4', // カラム数
			grouplast:{
				_class:'edge'
			}
		};

		$.fn.rjs_hlg = function(options) {
			var elements = this;
			var opts = $.extend({}, $.fn.rjs_hlg.defaults, options);
			var group_number = 1;
			area_no = area_no + 1;
			elements.each(function(i) {
				var i = i+1;
				$(this).addClass("hl-area" + area_no + '-group' + group_number);
				if(i % opts.colmax === 0){
					group_number = group_number + 1;
				}
			});
			that.heightLine();
			return this;
		};

		// Option
		$.fn.rjs_hlg.defaults = defaults;

	}

	$(function(){
		rjs.heightLine();
		rjs.setHeightLineGroup();
	});

}) (jQuery);

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
/*! Lazy Load 1.9.1 - MIT license - Copyright 2010-2013 Mika Tuupola */
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);
/**
 * Copyright (c) 2007-2013 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.6
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,targ,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

/**
 * checkua.js
 * @Summary ユーザーエージェントによる分岐フラグを保持
 * @version: 0.2
 * @ReleaseDate: 2013/04/01
 * @return obj形式
 * @example
 * console.log(rjs.checkUA.ie6);
 */
 
this.rjs = this.rjs || {};
(function($){
	this.rjs.checkUA = {
		// OS
		windows: false,
		mac: false,

		// Browser
		ie: false,
		ie6: false,
		ie7: false,
		ie8: false,
		ie9: false,
		ie10: false,
		firefox: false,
		chrome: false,
		safari: false,
		opera: false,

		// Engine
		webkit: false,

		// Device
		PC: false,
		iPhone: false,
		iPad:false,
		android: false,
		androidTab:false,
		Mobile:false,
		WindowsPhone:false,
		BlackBerry:false,

		setUA:function(){
			var ua = navigator.userAgent;

			// --------------------------------------------------
			// Check OS
			// --------------------------------------------------
				if(ua.indexOf('Win') !== -1){
					this.windows = true;
				}else if(ua.indexOf('Mac') !== -1){
					this.mac = true;
				}

			// --------------------------------------------------
			// Check Browser
			// --------------------------------------------------
				// IE
				if(ua.indexOf('MSIE') != -1){
					this.ie = true
					if(ua.indexOf('MSIE 6') != -1){ this.ie6 = true };
					if(ua.indexOf('MSIE 7') != -1){ this.ie7 = true };
					if(ua.indexOf('MSIE 8') != -1){ this.ie8 = true };
					if(ua.indexOf('MSIE 9') != -1){ this.ie9 = true };
					if(ua.indexOf('MSIE 10') != -1){ this.ie10 = true };
				}
				// Firefox
				else if(ua.indexOf('Firefox') != -1){ this.firefox = true; }

				// Chrome
				else if(ua.indexOf('Chrome') != -1){ this.chrome = true; this.webkit = true; }

				// Safari
				else if(ua.indexOf('Safari') != -1 && ua.indexOf('Chrome') == -1){ this.safari = true; this.webkit = true; }

				// Opera
				else if(ua.indexOf('Opera') != -1){ this.opera = true; }

			// --------------------------------------------------
			// Device Check
			// --------------------------------------------------
				if(ua.indexOf('iPhone') != -1){
					this.iPhone = true;
				}else if(ua.indexOf('iPad') != -1){
					// iPad
					this.iPad = true;
				}else if(ua.indexOf('android') != -1){
					// Android
					this.android = true;
				}else if(ua.indexOf('android') != -1 && ua.indexOf('Mobile') == -1){
					// Android Tab
					this.androidTab=true;
				}else if(ua.indexOf('Mobile') != -1){
					// Mobile
					this.Mobile = true;
				}else if(ua.indexOf('Windows Phone') != -1){
					// Windows Phone
					this.WindowsPhone = true;
				}else if(ua.indexOf('BlackBerry') != -1){
					// BlackBerry
					this.BlackBerry = true;
				}else{
					this.PC = true;
				}

			// --------------------------------------------------
				return this;
		}
	}
	rjs.checkUA.setUA();
}) (jQuery);
