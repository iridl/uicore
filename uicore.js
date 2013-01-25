/*
MBB 2012 -- maproom implementation in javascript

$.ready runs a function at DOMContentLoaded if possible, otherwise onload
runs immediately if already loaded.  It is invoked at the end of this file.
*/
window.$ = {};
$.ready = function(fn) {
    if (jsAllLoaded()){
      return fn();
    }
      jsAllLoadedFn = fn;
    if (!(document.readyState == "complete" )){
  if (window.addEventListener) {
      window.addEventListener("DOMContentLoaded", jsAllLoadedRun, false);
      window.addEventListener("load", jsAllLoadedRun, false);
}
  else if (window.attachEvent){
      window.attachEvent("onload", jsAllLoadedRun);
  }
  else{
      window.onload = jsAllLoadedRun;
  }
    }
    if (jsAllLoaded()){
      return fn();
    }
}
    var FBloaded=false;
var jsDependsOnList = new Array();
var jsAllLoadedFn = null;
jsDependsOnList.push(document);

    function jsDependsOn(srcfile){
	var s=document.getElementsByTagName('script')[0];

    var po = document.createElement('script');
    po.type = 'text/javascript';
    po.src = srcfile;
    po.onload = jsLoaded;
    po.onreadystatechange = jsLoaded;
    po.myevtfn = jsLoaded;
    if(! po.readyState) po.readyState = "loadingScript";
    jsDependsOnList.push(po);
    s.parentNode.insertBefore(po,s);
    }
function jsAllLoaded() {
var ans = true;
for (var i=0; i<jsDependsOnList.length; i++){
    if(jsDependsOnList[i].readyState && (!(jsDependsOnList[i].readyState === 'interactive' && !!document.getElementsByTagName('body')[0])) && jsDependsOnList[i].readyState != 'loaded' && jsDependsOnList[i].readyState != 'complete'){ans=false;}
}
return ans;
}
function jsLoaded (evt) {
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
if(it && it.readyState == 'loadingScript'){
    it.readyState="complete";
}
jsAllLoadedRun();
}
var jsAllLoadedNotRun = true;
function jsAllLoadedRun(){
    if(jsAllLoadedNotRun && jsAllLoaded()){
if(!!jsAllLoadedFn){
    jsAllLoadedNotRun = false;
jsAllLoadedFn();
}
}
}
/*
To simplify writing maproom documents, and accessing them locally,
from test locations, and from the server, urls that start /maproom/
are prepending with the document root, as long as the urls are processed
by the maproom javascript code.

maproomroot: holds the document root
localHrefOf: converts a /maproom/ reference to be relative to the current document
*/
var slist=document.getElementsByTagName('script');
var scriptsrc='';
for (var i=0; i<slist.length; i++){
var shref=slist[i].src;
if(shref.substr(shref.length-9,9) == 'uicore.js'){
scriptsrc=shref;
break;
}
}
var scriptroot;
if(scriptsrc){
scriptroot = scriptsrc.substr(0,scriptsrc.indexOf('uicore.js'));
}
var maproomroot = document.location.href.substr(0,document.location.href.lastIndexOf('/maproom/')+9);
/* loads pure javascript */
var puredir = scriptroot.substr(0,scriptroot.length-7) + 'pure/libs/';
jsDependsOn(puredir + 'pure.js');

function localHrefOf(ghref){
var lhref;
var ifmap  = ghref.lastIndexOf('/maproom/');
if(ifmap > -1){
var maproomurl = ghref.substr(0,ifmap+9);
lhref = maproomroot + ghref.substr(maproomurl.length);
}
else {
lhref= ghref;
}
return lhref;
}
/* replacement for getElementsByClassName when missing */
if (typeof document.getElementsByClassName!='function') {
document.getElementsByClassName = function() {
        var elms = document.getElementsByTagName('*');
        var ei = new Array();
        for (i=0;i<elms.length;i++) {
            if (elms[i].getAttribute('class')) {
                ecl = elms[i].getAttribute('class').split(' ');
                for (j=0;j<ecl.length;j++) {
                    if (ecl[j].toLowerCase() == arguments[0].toLowerCase()) {
                        ei.push(elms[i]);
                    }
                }
            } else if (elms[i].className) {
                ecl = elms[i].className.split(' ');
                for (j=0;j<ecl.length;j++) {
                    if (ecl[j].toLowerCase() == arguments[0].toLowerCase()) {
                        ei.push(elms[i]);
                    }
                }
            }
        }
        return ei;
    }
Element.prototype.getElementsByClassName=document.getElementsByClassName;
}
/* IE 8 is missing hasOwnProperty for Elements */
if(!Element.prototype.hasOwnProperty){
    Element.prototype.hasOwnProperty=Object.prototype.hasOwnProperty;
}
if(typeof [].indexOf != 'function'){
Array.prototype.indexOf = function(obj, start) {
     for (var i = (start || 0), j = this.length; i < j; i++) {
         if (this[i] === obj) { return i; }
     }
     return -1;
}
}
// Add ECMA262-5 Array methods if not supported natively
//
if (!('indexOf' in Array.prototype)) {
    Array.prototype.indexOf= function(find, i /*opt*/) {
        if (i===undefined) i= 0;
        if (i<0) i+= this.length;
        if (i<0) i= 0;

        for (var n= this.length; i<n; i++)
            if (i in this && this[i]===find)
                return i;
        return -1;
    };
}
if (!('lastIndexOf' in Array.prototype)) {
    Array.prototype.lastIndexOf= function(find, i /*opt*/) {
        if (i===undefined) i= this.length-1;
        if (i<0) i+= this.length;
        if (i>this.length-1) i= this.length-1;
        for (i++; i-->0;) /* i++ because from-argument is sadly inclusive */
            if (i in this && this[i]===find)
                return i;
        return -1;
    };
}
if (!('forEach' in Array.prototype)) {
    Array.prototype.forEach= function(action, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this)
                action.call(that, this[i], i, this);
    };
}
if (!('map' in Array.prototype)) {
    Array.prototype.map= function(mapper, that /*opt*/) {
        var other= new Array(this.length);
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this)
                other[i]= mapper.call(that, this[i], i, this);
        return other;
    };
}
if (!('filter' in Array.prototype)) {
    Array.prototype.filter= function(filter, that /*opt*/) {
        var other= [], v;
        for (var i=0, n= this.length; i<n; i++)
            if (i in this && filter.call(that, v= this[i], i, this))
                other.push(v);
        return other;
    };
}
if (!('every' in Array.prototype)) {
    Array.prototype.every= function(tester, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this && !tester.call(that, this[i], i, this))
                return false;
        return true;
    };
}
if (!('some' in Array.prototype)) {
    Array.prototype.some= function(tester, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this && tester.call(that, this[i], i, this))
                return true;
        return false;
    };
}
function dosectionsel(){
it=document.getElementById('mapselect');
it.parentNode.getElementsByTagName('legend')[0].innerHTML=it.options[it.selectedIndex].parentNode.label;
it.previousSibling.innerHTML=it.options[it.selectedIndex].innerHTML;

var opt=it.options[it.selectedIndex];
var fullpathname = document.location.href;
var optvalue = opt.value;
var optclass="carry";
if(optvalue.indexOf('@')>0){
    optclass = optvalue.split('@')[1];
    optvalue = optvalue.split('@')[0];
}
if(optvalue.substring(0,5)!='http:'){
if(fullpathname.indexOf("?")>= 0){
fullpathname = fullpathname.substring(0,fullpathname.indexOf("?"));
}
if(fullpathname.indexOf("#")>= 0){
fullpathname = fullpathname.substring(0,fullpathname.indexOf("#"));
}
if (it.hrefroot + optvalue != fullpathname){
submitPageForm(it.hrefroot + optvalue,optclass);
}
} else {
submitPageForm(optvalue,optclass);
}
}
function tabclick(it){
    var mylist=it.parentNode.getElementsByClassName("ui-state-active");
    for (var i= 0; i<mylist.length; i++){
	var sid = mylist[i].children[0].hash.substr(1);
        document.getElementById(sid).className="ui-tabs-panel-hidden";
	mylist[i].className="ui-state-default";
    }
    it.className="ui-state-active";
	var sid = it.children[0].hash.substr(1);
        document.getElementById(sid).className="ui-tabs-panel";
    return false;
}
function limitclickevent(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
   var myinput = it.parentNode.getElementsByTagName('input')[0];
	var last = it.parentNode.info['iridl:gridvalues']['iridl:valuelist'].length-1;
	myinput.value=it.innerHTML;
	var c0 = it.parentNode.info['iridl:gridvalues']['iridl:valuelist'].indexOf(myinput.value);
	if(c0 == 0){
	myinput.guessvalue=it.parentNode.info['iridl:gridvalues']['iridl:valuelist'][1];
}
	if(c0 == last){
	myinput.guessvalue=it.parentNode.info['iridl:gridvalues']['iridl:valuelist'][last-1];
}
	if(!evt.currentTarget){
	    evt.currentTarget=this;
	}
	imageinputvaluechange(evt);
 }
function stepupclickevent(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
   var myinput = it.parentNode.getElementsByTagName('input')[0];
	var cin = it.parentNode.info['iridl:gridvalues']['iridl:valuelist'].indexOf(myinput.value);
	if(cin > -1 && cin < it.parentNode.info['iridl:gridvalues']['iridl:valuelist'].length-1) {
	myinput.value = it.parentNode.info['iridl:gridvalues']['iridl:valuelist'][cin+1];
	if(cin < it.parentNode.info['iridl:gridvalues']['iridl:valuelist'].length-2) {
	myinput.guessvalue = it.parentNode.info['iridl:gridvalues']['iridl:valuelist'][cin+2];
	}
	if(!evt.currentTarget){
	    evt.currentTarget=this;
	}
	imageinputvaluechange(evt);
	}
 }
function stepdownclickevent(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
   var myinput = it.parentNode.getElementsByTagName('input')[0];
	var cin = it.parentNode.info['iridl:gridvalues']['iridl:valuelist'].indexOf(myinput.value);
	if(cin >0) {
	myinput.value = it.parentNode.info['iridl:gridvalues']['iridl:valuelist'][cin-1];
	if(cin > 1) {
	myinput.guessvalue = it.parentNode.info['iridl:gridvalues']['iridl:valuelist'][cin-2];
	}
	if(!evt.currentTarget){
	    evt.currentTarget=this;
	}
	imageinputvaluechange(evt);
	}
 }
function imageinputvaluechange(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
 var myinput = it.parentNode.getElementsByTagName('input')[0];
 var myimage =  it.parentNode.mylink.figureimage;
 // change class of parent whether single (value in list) or multi (value not in list)
 var cin = it.parentNode.info['iridl:gridvalues']['iridl:valuelist'].indexOf(myinput.value);
 if(cin > -1){
     changeClass(it.parentNode,'multiValue','singleValue');
 }
 else {
     changeClass(it.parentNode,'singleValue','multiValue');
 }
// copy value(s) to page form and get url
var pform=document.getElementById('pageform');
var guess='';
  if(myinput.guessvalue){
  pform.elements[myinput.name].value = myinput.guessvalue;
//  guess = appendPageForm(myimage.src.replace(/[?].*/,''),myimage.className);
    guess = myinput.guessvalue;
	myinput.guessvalue='';
}
  updatePageForm(pform.elements[myinput.name],myinput.value,guess);
//  pform.elements[myinput.name].value = myinput.value;
//  myimage.src = appendPageForm(myimage.src.replace(/[?].*/,''),myimage.className);
//	if(guess){
//        preload(guess);
//	}
 }
function tabclickevent(evt){
    evt = (evt) ? evt : ((event) ? event : null );
    it = (evt.currentTarget) ? evt.currentTarget : evt.srcElement.parentNode;
    var mylist=it.parentNode.getElementsByClassName("ui-state-active");
    for (var i= 0; i<mylist.length; i++){
	var sid;
	if(mylist[i].children[0].hash){
	    sid = mylist[i].children[0].hash.substr(1);
	}
	if(sid){
        document.getElementById(sid).className="ui-tabs-panel-hidden";
	}
	mylist[i].className="ui-state-default";
    }
    it.className="ui-state-active";
    var sid;
    if(it.children[0].hash){
	sid = it.children[0].hash.substr(1);
    }
	if(sid){
        document.getElementById(sid).className="ui-tabs-panel";
	}
	else {
	location.href= it.children[0].href;
	}
        if(document.width < 750){
	location.href= it.children[0].href;
	}
    return false;
}
function tabtarget(evt){
	var ret = (document.width < 750);
	evt = (evt) ? evt : ((event) ? event : null );
	if (evt) {
	if(ret){
	 if(evt.returnValue){
	evt.returnValue="false";
	}
	}
	}
    return(ret);
}
function tabsSetup(){
    var mylist=document.getElementsByClassName("ui-tabs");
    for (var i= 0; i<mylist.length; i++){
	var tabset=mylist[i];
	var tablist=tabset.getElementsByTagName("ul")[0].getElementsByTagName("li");
	for (var j=0; j<tablist.length; j++){
	var atab=tablist[j];
	if(!atab.children[0].onclick) {
        atab.onmousedown=tabclickevent;
	atab.onfocus=tabclickevent;
	atab.onclick=tabclickevent;
	if(j != 0){
        atab.className='ui-state-default';
        var sid = atab.children[0].hash.substr(1);
	if(!!sid){
	    if(document.getElementById(sid)){
        document.getElementById(sid).className="ui-tabs-panel-hidden";
	}
	}
	}
	else {
        atab.className='ui-state-active';
        var sid = atab.children[0].hash.substr(1);
	if(!!sid){
	    if(document.getElementById(sid))
		{document.getElementById(sid).className="ui-tabs-panel";}
	}
	}
        atab.children[0].onclick=tabtarget;
	}
	}
	}
}
function insertshare(){
var s = document.getElementById('share');
if(s){
var sl = s.getElementsByTagName('legend');
if(!sl.length){
var ls=document.createElement('legend');
ls.appendChild(document.createTextNode('Share'));
s.insertBefore(ls,s.firstChild);
}
sl = document.getElementById('googleplus');
if(!sl){
    /* google+ */
var gb= document.createElement('div');
gb.className='sharebutton';
gb.id='googleplusbutton';
gb.innerHTML='<div class="g-plusone" data-count="false" ></div>';
s.appendChild(gb);
/* twitter */
gb= document.createElement('div');
gb.className='sharebutton';
gb.id='custom-tweet-button';
var gba = document.createElement('a');
gba.setAttribute("title","Tweet");
gba.onclick=doTwitter;
gb.appendChild(gba);
s.appendChild(gb);
/* evernote */
gb= document.createElement('div');
gb.className='sharebutton';
gb.id='evernote';
gba = document.createElement('a');
gba.setAttribute("title","Save to Evernote");
gba.onclick=doEvernoteClip;
gb.appendChild(gba);
s.appendChild(gb);
gb= document.createElement('div');
gb.className='sharebutton';
gb.id='tumblr';
    var tumblr_button = document.createElement("a");
	tumblr_button.onclick=doTumblrClip;
    tumblr_button.setAttribute("title", "Share on Tumblr");
    gb.appendChild(tumblr_button);
s.appendChild(gb);
/* facebook */
gb=document.createElement('div');
// FB with url following share variables 
// gb.className="fb-like share";
//    var url = appendPageForm(location.href.replace(/[?].*/,''),'share');
// FB with parameters stripped from url 
gb.className="fb-like";
var url = location.href.replace(/[?].*/,'');
// End of Choice
    url = url.replace(/[?]/,"/QS/");
gb.setAttribute("data-href",url);
gb.setAttribute("data-send","false");
gb.setAttribute("data-layout","button_count");
gb.setAttribute("data-width","24");
gb.setAttribute("data-show-faces","true");
var s = document.getElementById('custom-tweet-button').parentNode;
s.insertBefore(gb,document.getElementById('custom-tweet-button'));
loadFB();
/* code to add GMail buttons
gb= document.createElement('div');
gb.className='sharebutton';
gb.id='gmailbutton';
    tumblr_button = document.createElement("a");
	tumblr_button.onclick=doGMail;
    tumblr_button.setAttribute("title", "Share on GMail");
    gb.appendChild(tumblr_button);
s.appendChild(gb);
*/
/* code to add Mail buttons */
gb= document.createElement('div');
gb.className='sharebutton';
gb.id='mailbutton';
    tumblr_button = document.createElement("a");
	tumblr_button.onclick=doMail;
    tumblr_button.setAttribute("title", "Share with e-mail");
    gb.appendChild(tumblr_button);
s.appendChild(gb);
}
// adds scripts to share to activate buttons
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
s.appendChild(po);
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = "http://static.evernote.com/noteit.js";
s.appendChild(ga);
}
}
function loadFB(){
var js, id = 'facebook-jssdk', ref = document.getElementsByTagName('script')[0];
           if (document.getElementById(id)) {return;}
	   js = document.createElement('div');
	   js.id='fb-root';
	   var b= document.getElementsByTagName('body')[0];
	   b.insertBefore(js, b.firstChild);
	   window.fbAsyncInit = function() {
	       /*          FB.init({
            appId      : 'myId', // App ID
            channelUrl : '', // Channel File
            status     : true, // check login status
            cookie     : true, // enable cookies to allow the server to access the session
            xfbml      : true  // parse XFBML
	    }); */
           FB.Event.subscribe('edge.create', function(targetUrl) {
              _gaq.push(['_trackSocial', 'facebook', 'like', targetUrl]);
             });
};
           js = document.createElement('script'); js.id = id; js.async = true;
	   js.onload=finishFB();
           js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
           ref.parentNode.insertBefore(js, ref);
}
function finishFB(){
/* fb followup FB.XFBML.parse() to rerender */
FBloaded=true;
}
function doTwitter(){
 var url = appendPageForm(location.href.replace(/[?].*/,''),'share');
    var tpar = getElementsByAttribute(document,'*','property','term:title');
    var dpar = getElementsByAttribute(document,'*','property','term:description');
    var title="";
	if(tpar.length>0){
	title=tpar[0].innerHTML;
	}
	if(!title)title=document.title;
var twitter_url = "https://twitter.com/share?via=iridl&hashtags=dataviz&url=" + encodeURIComponent(url) + "&text=" + encodeURIComponent(title);
 _gaq.push(['_trackSocial', 'twitter', 'tweet', url]);
window.open(twitter_url);
}
function doGMail(){
 var url = appendPageForm(location.href.replace(/[?].*/,''),'share');
    var tpar = getElementsByAttribute(document,'*','property','term:title');
	if(tpar.length>0){
	title=tpar[0].innerHTML;
	}
	if(!title)title=document.title;
var m='http://mail.google.com/mail/?ui=1&view=cm&fs=1&tf=1&to=&su='+encodeURIComponent(title)+'&body='+encodeURIComponent(url);
window.open(m);
}
function doMail(){
 var url = appendPageForm(location.href.replace(/[?].*/,''),'share');
    var tpar = getElementsByAttribute(document,'*','property','term:title');
	if(tpar.length>0){
	title=tpar[0].innerHTML;
	}
	if(!title)title=document.title;
var m='mailto:?subject='+encodeURIComponent(title)+'&body='+encodeURIComponent(url);
 _gaq.push(['_trackSocial', 'mail', 'mail', url]);
window.open(m);
}
function doTumblrClip(){
    var content = document.getElementById("content");
    var tpar = getElementsByAttribute(document,'h2','property','term:title');
    var dpar = getElementsByAttribute(document,'p','property','term:description');
    var url = appendPageForm(location.href.replace(/[?].*/,''),'share');
    var ttype='';
    var title="";
	if(tpar.length>0){
	title=tpar[0].innerHTML;
	}
	if(!title)title=document.title;
    var description="";
	if(dpar.length>0){
	description=dpar[0].innerHTML;
	}
      var tumblr_url;
    var tumblr_photo_source = "";
    var tumblr_photo_caption = "";
	if(description){
	tumblr_photo_caption = description;
	}
	else {
	tumblr_photo_caption = title;
	}
	if(content){
	if(content.getElementsByTagName('link').length>0){
	tumblr_photo_source = content.getElementsByTagName('link')[0].figureimage.src;
	}
	}
	var tumblr_photo_click_thru = url;
	if(tumblr_photo_source){
	    ttype='photo';
tumblr_url = "http://www.tumblr.com/share/photo?source=" + encodeURIComponent(tumblr_photo_source) + "&caption=" + encodeURIComponent(tumblr_photo_caption) + "&clickthru=" + encodeURIComponent(tumblr_photo_click_thru);
}
else {
	    ttype='link';
    var tumblr_link_url = url;
    var tumblr_link_name = title;
    var tumblr_link_description = description;
tumblr_url = "http://www.tumblr.com/share/link?url=" + encodeURIComponent(tumblr_link_url) + "&name=" + encodeURIComponent(tumblr_link_name) + "&description=" + encodeURIComponent(tumblr_link_description);
}
 _gaq.push(['_trackSocial', 'tumblr', ttype , url]);
window.open(tumblr_url);
}

function doEvernoteClip(){
var clipargs = {};
clipargs.contentId = 'content';
clipargs.url = appendPageForm(location.href.replace(/[?].*/,''),'share');
clipargs.filter= function (arg){
if(!(arg.className == 'imagecontrols' || arg.className.indexOf('dlcontrol')>=0 || arg.style.visibility=='hidden')){
return arg;
}
};
 _gaq.push(['_trackSocial', 'evernote', 'clip' , clipargs.url]);
Evernote.doClip(clipargs);
}
function doEvernoteClipElement(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
var clipargs = {};
clipargs.content = it.clipthis;
clipargs.url = appendPageForm(location.href.replace(/[?].*/,''),'share');
clipargs.filter= function (arg){
    if(!(arg.className == 'imagecontrols' || arg.className.indexOf('dlcontrol')>=0|| arg.style.visibility=='hidden')){
return arg;
}
};
 _gaq.push(['_trackSocial', 'evernote', 'clip' , clipargs.url]);
Evernote.doClip(clipargs);
}
function doGoogleEarthClick(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
var sfigs=getElementsByAttribute(it.clipthis,'*','rel','iridl:hasFigure');
if(sfigs.length){
    var kmlurl=sfigs[0].info['iridl:hasKML'];
    var kmlclass = sfigs[0].figureimage.className.split(' ')[0];
    if(kmlurl){
	var myurl = appendPageForm(kmlurl.replace(/[?].*/,''),kmlclass);
	location.href=myurl;
	_gaq.push(['_trackSocial', 'googleearth', 'element' , myurl]);
    }
}
}
function readwithiframe(slhref,s,readfn){
var iframe=document.getElementById('sectioniframe');
if(!iframe) {
iframe = document.createElement('iframe');
iframe.id='sectioniframe';
iframe.style.display="none";
iframe.onload = readfn;
s.appendChild(iframe);
}
iframe.src=slhref;
}
function getXMLhttp(){
var xmlhttp;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
return xmlhttp;
}
function preload(href){
var xmlhttp=getXMLhttp();
xmlhttp.onreadystatechange=function(evt) {
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
if (it.readyState==4) {
  }
}
xmlhttp.myevtfn=xmlhttp.onreadystatechange;
xmlhttp.open("GET",href,true);
xmlhttp.send();
}
function readwithxmlhttp(slhref,sel){
var xmlhttp=getXMLhttp();
xmlhttp.mysel=sel;
xmlhttp.onreadystatechange = function(evt) {
   var evt = (evt) ? evt : ((event) ? event : null );
   var xmlhttp = (evt.currentTarget) ? evt.currentTarget : this;
if(xmlhttp.readyState == 4){
    var xmlDoc;
// used to test on xmlDoc, but explorer did not work, so now I parse
if(true){
    if(window.DOMParser){
parser= new DOMParser();
xmlDoc=parser.parseFromString(xmlhttp.responseText,"text/xml");
    }
    else {
	xmlDoc= new ActiveXObject("Microsoft.XMLDOM");
	xmlDoc.async=false;
	/* IE8 gets confused by either the doctype or the ?xml, so we skip it */
	xmlDoc.loadXML(xmlhttp.responseText.substr(xmlhttp.responseText.indexOf('<html')));
	if(xmlDoc.parseError.reason){
	alert(xmlDoc.parseError.reason + ' on ' + xmlDoc.parseError.line);
	alert(xmlhttp.responseText);
	}
    }
}
dofinishchooseSection(xmlhttp.mysel,xmlDoc);
}
};
xmlhttp.myevtfn=xmlhttp.onreadystatechange;
xmlhttp.open("GET",slhref,true);
xmlhttp.send();
}
      function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue){
      var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
      var arrReturnElements = new Array();
      var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)", "i") : null;
      var oCurrent;
      var oAttribute;
      for(var i=0; i<arrElements.length; i++){
      oCurrent = arrElements[i];
      oAttribute = oCurrent.getAttribute && oCurrent.getAttribute(strAttributeName);
      if(typeof oAttribute == "string" && oAttribute.length > 0){
      if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
      arrReturnElements.push(oCurrent);
      }
      }
      }
      return arrReturnElements;
      }
function insertchooseSection(){
var s=document.getElementById('chooseSection');
var sl=document.getElementById('toSectionList');
if (s && sl){
var sels=s.getElementsByTagName('select');
if(sels.length < 1){
var sel=document.createElement('span');
sel.className='selectvalue';
sel.onclick=selectvalueclick;
sel.onclickFn=selectvalueclick;
sel.innerHTML=getElementsByAttribute(document,'*','property','term:title')[0].innerHTML;
s.appendChild(sel);
sel=document.createElement('select');
sel.name="mapsel";
sel.onchange=dosectionsel;
sel.id='mapselect';
var slhref=sl.getElementsByTagName('a')[0].href;
slhref=addLanguageVar(localHrefOf(slhref));
s.appendChild(sel);
if(slhref){
var lin = slhref.lastIndexOf('/');
if(lin){
sel.hrefroot=slhref.substr(0,lin+1);
}else {
sel.hrefroot=slhref;
}
if(slhref.substring(0,4) == "http"){
readwithxmlhttp(slhref,sel);
}
else {
// otherwise permissions prevent us from reading the file
    /* faking select when read from a file */
var stitle=getElementsByAttribute(document,'*','property','term:title');
if(stitle.length > 0){
    var opt = document.createElement('option');
    opt.innerHTML=stitle[0].innerHTML;
    opt.value="";
    sel.appendChild(opt);
}
}
}
}
}
}
function previousElement(mynode){
if(mynode.previousSibling && mynode.previousSibling.nodeType == 3){
return previousElement(mynode.previousSibling);
}
else {
return mynode.previousSibling;
}
}
function finishchooseSectioniframe(){
var iframe=document.getElementById('sectioniframe');
var sel=document.getElementById('mapselect');

var xmlDoc = iframe.contentDocument;
dofinishchooseSection(sel,xmlDoc);
}
function dofinishchooseSection(sel,xmlDoc){
if(xmlDoc){
    var itemlist;
    if(xmlDoc.getElementsByClassName){
	itemlist=xmlDoc.getElementsByClassName('item');
    }
    else {
	var mynodes = xmlDoc.documentElement.getElementsByTagName('div');
	var oAttributeValue = 'item';
	itemlist=new Array;
       for (var i = 0; i<mynodes.length ; i++){
	   var oCurrent = mynodes[i];
	   var oAttribute = oCurrent.getAttribute('class');
      if(typeof oAttribute == "string" && oAttribute.length > 0){
      if(oAttributeValue.indexOf(oAttribute)>=0){
      itemlist.push(oCurrent);
      }
      }
       }
    }
var og=sel;
if(itemlist.length>0){
for (var i = 0; i<itemlist.length ; i++){
var item=itemlist[i];
if(previousElement(item) && previousElement(item).getAttribute('class') == 'itemGroup'){
og=document.createElement('optgroup');
var petext = previousElement(item).innerHTML ? previousElement(item).innerHTML : previousElement(item).text;
og.label=petext;
sel.appendChild(og);
}
var anc =item.getElementsByTagName('div')[0].getElementsByTagName('a')[0];
var anctext = anc.innerHTML? anc.innerHTML : anc.text;
var ancclass = anc.getAttribute('class');
var anchref = anc.getAttribute('href');
if(ancclass){optValue=anchref + '@' + ancclass;}
else {
    optValue = anchref;
}
var opt= new Option(anctext,optValue,false,false);
var fullpathname = document.location.href;
if(fullpathname.indexOf("?") >=0){
fullpathname = fullpathname.substring(0,fullpathname.indexOf("?"));
}
if(fullpathname.indexOf("#") >= 0){
fullpathname = fullpathname.substring(0,fullpathname.indexOf("#"));
}
if (sel.hrefroot + anchref == fullpathname){
opt.selected=true;
}
/* IE8 has strange optgroup behavior */
if(navigator.appVersion.indexOf('MSIE 8')<0){
og.appendChild(opt);
}else
    sel.add(opt);
}
if(typeof(sel.selectedIndex) === 'number'){
    if(sel.options[sel.selectedIndex].parentNode.label){
sel.parentNode.getElementsByTagName('legend')[0].innerHTML=sel.options[sel.selectedIndex].parentNode.label;
    }
sel.previousSibling.innerHTML=sel.options[sel.selectedIndex].innerHTML;
}
}
}
else alert("cannot parse")
}
function insertRegion(){
    var theregion=document.getElementById("chooseRegion");
if(theregion){
var sel=theregion.getElementsByTagName('select');
if (sel.length != 0){
    sel=sel[0];
    sel.onchange=regiononchange;
}
else {
sel=document.createElement('span');
sel.className='selectvalue';
sel.onclick=selectvalueclick;
sel.onclickFn=selectvalueclick;
sel.innerHTML='Global';
theregion.appendChild(sel);
sel=document.createElement('select');
sel.size=1;
sel.name="bbox";
sel.className='pageformcopy';
sel.onchange=regiononchange;
var optgrp=document.createElement('optgroup');
optgrp.label="Region";
var opt = document.createElement('option');
opt.value="bb:-20:-40:55:40:bb";
opt.innerHTML="Africa";
optgrp.appendChild(opt);
opt = document.createElement('option');
opt.value="bb:40:-10:170:75:bb";
opt.innerHTML="Asia";
optgrp.appendChild(opt);
opt = document.createElement('option');
opt.value="bb:100:-55:180:0:bb";
opt.innerHTML="Australia";
optgrp.appendChild(opt);
opt = document.createElement('option');
opt.value="bb:-20:35:40:75:bb";
opt.innerHTML="Europe";
optgrp.appendChild(opt);
opt = document.createElement('option');
opt.value="bb:10:15:75:45:bb";
opt.innerHTML="Middle East";
optgrp.appendChild(opt);
opt = document.createElement('option');
opt.value="bb:-170:15:-40:75:bb";
opt.innerHTML="North America";
optgrp.appendChild(opt);
opt = document.createElement('option');
opt.value="bb:-100:0:-70:35:bb";
opt.innerHTML="Central America";
optgrp.appendChild(opt);
opt = document.createElement('option');
opt.value="bb:-90:-60:-30:15:bb";
opt.innerHTML="South America";
optgrp.appendChild(opt);
opt = document.createElement('option');
opt.value="bb:100:-60:300:60:bb";
opt.innerHTML="Pacific";
optgrp.appendChild(opt);
opt = document.createElement('option');
opt.value="";
opt.selected="selected";
opt.innerHTML="Global";
optgrp.appendChild(opt);
sel.appendChild(optgrp);
theregion.appendChild(sel);
}
}
}
var regionIsWithinBbox = false;
function setregionwithinbbox(mydisplay,doflags){
var thebody = document.getElementsByTagName('body')[0];
    if(!mydisplay){
	if(doflags){
	regionIsWithinBbox = false;
	}
	else {
	removeClass(thebody,'regioniswithinbbox');
	}
    }
    else {
	if(doflags){
	regionIsWithinBbox = true;
	}
	else {
	    appendMissingClass(thebody,'regioniswithinbbox');
	}
    }
}
function regiononchange(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : evt.srcElement;
/* updates selectvalue element*/
it.previousSibling.innerHTML=it.options[it.selectedIndex].innerHTML;
var pform=document.getElementById('pageform');
if(pform){
if(it.name == 'bbox'){
var myin = pform.elements['region'];
if(myin){
if(it.options[it.selectedIndex].value){
    myin.value = it.options[it.selectedIndex].value
}
else {
myin.value="";
}
}
var myin = pform.elements['clickpt'];
if(myin){
myin.value="";
}
}
if(pform.elements[it.name]){
pform.elements[it.name].value=it.options[it.selectedIndex].value;
updatePageForm();
}
}
}
function pageformcopyonchange(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
var pform=document.getElementById('pageform');
if(pform){
    var elbyname = pform.elements[it.name];
if(elbyname){
    var changed = "";
if(it.option){
    changed = pform.elements[it.name];
changed.value=it.options[it.selectedIndex].value;
}
else if(elbyname.length) {
	/* multivalued copy -- hopefully checkbox */
	if(typeof(elbyname[0].checked) != 'undefined'){
	    /* multivalued copy -- checkbox */
	    for(var j = elbyname.length; j-- ;){
		if(elbyname[j].value == it.value){
		    elbyname[j].checked = it.checked;
		    changed = elbyname[j];
		}
	    }
	}
	else {
	    /* multivalued but not checkbox -- how to copy */
	}
} 
else {
    changed = pform.elements[it.name];
changed.value=it.value;
}
updatePageForm(changed);
}
}
}
function loadHasJSON(){
var sfigs=getElementsByAttribute(document,'*','rel','iridl:hasJSON');
for (var i=0 ; i<sfigs.length ; i++){
    updateHasJSON(sfigs[i]);
}
}
/* reads JSON file referred to by a link object
The parent of the link object we call the Context.
when file is returned, if the url retrieved is still the url that the
link object points to, stores parsedJSON in the Context,
and calls runPureOnContext.
 */
function updateHasJSON(myLink){
var xmlhttp= getXMLhttp();
xmlhttp.infourl = myLink.href;
xmlhttp.myContext = myLink.parentNode;
xmlhttp.myLink=myLink;
changeClass(myLink.parentNode,'valid','invalid');
xmlhttp.onreadystatechange = function(evt) {
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
if(it.readyState == 4){
var jsontxt = it.responseText;
if(it.myLink.href == it.infourl){
    it.myContext.parsedJSON=JSON.parse(jsontxt);
    runPureOnContext(it.myContext);
    updatePageFormCopies(it.myContext);
    validateAndCorrectPageForm(it.myContext);
}
}
};
xmlhttp.myevtfn=xmlhttp.onreadystatechange;
xmlhttp.open("GET",xmlhttp.infourl,true);
xmlhttp.send();
}
/*
runs pure on what I am calling a context.  It only runs on elements
within the context which have class "template".

Because this can be called more than once, I use the compile/render
form of pure.
 */
function runPureOnContext(myContext){
    if(!myContext.pureTemplateFunction){
	myContext.pureTemplateFunction= $p(myContext.getElementsByClassName("template")).compile(false,myContext.parsedJSON);
    }
    $p(myContext.getElementsByClassName("template")).render(myContext.parsedJSON,myContext.pureTemplateFunction);
changeClass(myContext,'invalid','valid');
}
function initializeDLimage(){
    var mylist=document.getElementsByClassName("dlimage");
for( var idlimage=0 ; idlimage < mylist.length ; idlimage++){
var s = mylist[idlimage];
var sl = s.getElementsByTagName('legend');
var leg;
var ctl;
var sfigs=getElementsByAttribute(s,'*','rel','iridl:hasFigure');
if(!sl.length && sfigs.length){
leg=document.createElement('legend');
leg.className='imagecontrols';
/* var ctl=document.createElement('img');
ctl.className="dlimagecontrol";
ctl.width="13";
ctl.height="13";
ctl.border="0";
ctl.hspace="2";
ctl.vspace="2";
ctl.src="http://iridl.ldeo.columbia.edu/icons/RedrawButton.jpg";
ctl.title="Redraw";
ctl.onclick=doredrawbutton;
leg.appendChild(ctl);
*/
ctl=document.createElement('div');
ctl.className="dlimagecontrol zoomout";
ctl.title="Zoom Out";
ctl.onclick=dozoomout;
leg.appendChild(ctl);
ctl=document.createElement('div');
ctl.className="dlimagecontrol settings ivarswitch";
ctl.title="Independent Variables";
ctl.onclick=dosettingsbutton;
ctl.myonclick=dosettingsbutton;
leg.appendChild(ctl);
ctl=document.createElement('div');
ctl.className="dlimagecontrol layers";
ctl.title="Layers";
ctl.onclick=dolayersbutton;
ctl.myonclick=dolayersbutton;
leg.appendChild(ctl);
 ctl=document.createElement('div');
ctl.className="dlimagecontrol info";
ctl.title="More Information";
ctl.onclick=doinfobutton;
ctl.myonclick=doinfobutton;
leg.appendChild(ctl);
ctl=document.createElement('div');
ctl.className="dlimagecontrol share";
ctl.title="Share";
ctl.onclick=dosharebutton;
ctl.myonclick=dosharebutton;
leg.appendChild(ctl);
ctl=document.createElement('div');
ctl.className="dlimagecontrol download";
ctl.title="Download";
ctl.onclick=dodownloadbutton;
ctl.myonclick=dodownloadbutton;
leg.appendChild(ctl);
ctl=document.createElement('div');
ctl.className="dlimageswitch";
ctl.title="Settings";
leg.appendChild(ctl);
s.insertBefore(leg,s.firstChild);
appendMissingClass(leg.parentNode,'ShowControlIvars');
}
else {
leg=sl[0];
}
var sfigs=getElementsByAttribute(s,'*','rel','iridl:hasFigure');
if(sfigs.length){
    updateHasFigure(sfigs[0]);

}
}
}
function updateHasFigure(myfig){
    var newinfourl = myfig.href+'info.json';
    if(myfig.href.indexOf('?')>0){
	newinfourl=myfig.href.substr(0,myfig.href.indexOf('?')) + 'info.json' + myfig.href.substr(myfig.href.indexOf('?'));
    }
if(!myfig.info || myfig.infourl != newinfourl){
    if(myfig.info){
	DLimageRemoveControls(myfig);
    }
myfig.info="seeking";
var s=myfig.parentNode;
var figurl=myfig.href;
var infourl=newinfourl;
var xmlhttp= getXMLhttp();
xmlhttp.mylink=myfig;
xmlhttp.infourl=infourl;
var imglist=s.getElementsByTagName('img');
for (var i = 0; i<imglist.length; i++){
if(imglist[i].className == 'dlimg'){
myfig.figureimage=imglist[i];
myfig.figureimage.mylink=xmlhttp.mylink;
/* sets the infourl so that we know what we are "seeking" */
myfig.infourl=infourl;
break;
}
}
xmlhttp.onreadystatechange= function(evt) {
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
if(it.readyState == 4){
var jsontxt = it.responseText;
/* sets the infourl so that we know what we have parsed */
it.mylink.infourl=it.infourl;
it.mylink.info=JSON.parse(jsontxt);
/* info now has figure information */
DLimageBuildControls(it.mylink);
DLimageBuildZoom(it.mylink);
}
	 };
	 xmlhttp.myfn=xmlhttp.onreadystatechange;
xmlhttp.open("GET",infourl,true);
xmlhttp.send();
DLimageResizeImage(xmlhttp.mylink);
}
}
function dozoomout () {
var myform=document.getElementById('pageform');
if(myform){
var myin = myform.elements['region'];
if(myin){
myin.value='';
}
myin = myform.elements['clickpt'];
if(myin){
myin.value='';
}
myin = myform.elements['bbox'];
if(myin){
myin.value='';
updatePageForm();
}
}
}
function setbbox (newbbox,crs) {
var update=false;
var within=false;
var myform=document.getElementById('pageform');
if(myform){
var ifCRS = "";
if(crs && crs != "EPSG:4326"){
    ifCRS = ":" + crs;
}
if(newbbox[0] != newbbox[2]){
var myin = myform.elements['bbox'];
if(myin){
    /*    myin.value=JSON.stringify(newbbox);  */
    myin.value='bb:' + newbbox.join(':') + ifCRS + ':bb';
update=true;
}
}
var myin = myform.elements['region'];
var res = myform.elements['resolution'];
if(myin){
var clickpt = myform.elements['clickpt'];
if(newbbox[0] == newbbox[2] && newbbox[1] == newbbox[3]){
// click -- return depends on resolution res
within=true;
    clickpt.value="pt:" + newbbox.slice(0,2).join(':') + ifCRS + ":pt";
// none -- return pt:[x,y]
// number -- return bbox of that size bb:[x,y,x+res,y+res]
// uri -- returns geoobject of that class/type 
if(res.value && res.value.substr(0,6) == 'irids:'){
    invalidatePageInput('region');
    var resurl = appendPageForm("http://iridl.ldeo.columbia.edu/expert/%28irids:SOURCES:Features:Political:Africa:Districts:ds%29//resolution/parameter/%28pt:4:10:pt%29//clickpt/parameter/geoselect//string/as.json",'transformRegion');
var xmlhttp= getXMLhttp();
xmlhttp.myurl=resurl;
xmlhttp.onreadystatechange= function(evt) {
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
if(it.readyState == 4){
var jsontxt = it.responseText;
var result
    try{result=JSON.parse(jsontxt)}
    catch(err){alert(err + ' in parsing ' + jsontxt + ' from ' + resurl)}
/* info now has figure information */
if(result["value"]){
    if(myin.value == result["value"]){
    validatePageInput('region');
    }
    else {
    myin.value=result["value"];
    updatePageForm();
    }
}
}
	 };

	 xmlhttp.myfn=xmlhttp.onreadystatechange;
xmlhttp.open("GET",resurl,true);
xmlhttp.send();
}
else if(typeof(res) != 'undefined' && parseFloat(res.value) != 'NaN'){
var x,y,delta;
delta = parseFloat(res.value);
x = delta*Math.floor(parseFloat(newbbox[0])/delta);
y = delta*Math.floor(parseFloat(newbbox[1])/delta);
var roundbox=new Array();
roundbox[0]=x;
roundbox[1]=y;
roundbox[2]=x+delta;
roundbox[3]=y+delta;
myin.value="bb:" + roundbox.join(':') + ifCRS + ":bb";
}
else {
    myin.value="pt:" + newbbox.slice(0,2).join(':') + ifCRS + ":pt";
}
    
} /* end of resolution-dependent click */
else {
    clickpt.value='';

    myin.value="bb:" + newbbox.join(':') + ifCRS + ":bb";
}
update=true;
}
if(update){
updatePageForm();
}
}
}
function parseBbox(bboxstr){
    var mybbox;
    if(bboxstr.slice(0,3)=='bb:'){
	mybbox=bboxstr.split(':').slice(1,5);
	mybbox[0] = parseFloat(mybbox[0]);
	mybbox[1] = parseFloat(mybbox[1]);
	mybbox[2] = parseFloat(mybbox[2]);
	mybbox[3] = parseFloat(mybbox[3]);
    }
    else {
mybbox=JSON.parse(bboxstr);
    }
    return mybbox;
}
function getbbox (myinfo) {
var mybbox;
var myform=document.getElementById('pageform');
if(myform){
var myin = myform.elements['bbox'];
/* parses a non-blank bounding box */
if(myin && myin.value){
mybbox=parseBbox(myin.value);
}
}
if(!mybbox){
var X0,X1,Y0,Y1;
if(typeof(myinfo["iridl:hasAbscissa"]["iridl:gridvalues"]) != 'undefined'){
var Xare = myinfo["iridl:hasAbscissa"]["iridl:gridvalues"]["@type"];
var Yare = myinfo["iridl:hasOrdinate"]["iridl:gridvalues"]["@type"];
if(Xare == 'iridl:EvenGridEdges'){
X0 = myinfo["iridl:hasAbscissa"]["iridl:gridvalues"]["iridl:first"];
X1 = myinfo["iridl:hasAbscissa"]["iridl:gridvalues"]["iridl:last"];
}
if(Xare == 'iridl:CenterValues'){
X0 = myinfo["iridl:hasAbscissa"]["iridl:plotfirst"];
X1 = myinfo["iridl:hasAbscissa"]["iridl:plotlast"];
}
if(Yare == 'iridl:EvenGridEdges'){
Y0 = myinfo["iridl:hasOrdinate"]["iridl:gridvalues"]["iridl:first"];
Y1 = myinfo["iridl:hasOrdinate"]["iridl:gridvalues"]["iridl:last"];
}
if(Yare == 'iridl:CenterValues'){
Y0 = myinfo["iridl:hasOrdinate"]["iridl:plotfirst"];
Y1 = myinfo["iridl:hasOrdinate"]["iridl:plotlast"];
}
}
    else {
X0 = myinfo["iridl:hasAbscissa"]["iridl:plotfirst"];
X1 = myinfo["iridl:hasAbscissa"]["iridl:plotlast"];
Y0 = myinfo["iridl:hasOrdinate"]["iridl:plotfirst"];
Y1 = myinfo["iridl:hasOrdinate"]["iridl:plotlast"];
    }
mybbox=[X0,Y0,X1,Y1];
}
return mybbox;
}
function doredrawbutton () {
var myform=document.getElementById('pageform');
if(myform){
updatePageForm();
}
}
function dolayersbutton(evt){
  var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
var mycontainer = it.parentNode.parentNode;
removeClass(mycontainer,'ShowControlIvars ShowControlShare ShowControlDownload');
toggleClass(mycontainer,'ShowControlLayers');
}
function dosettingsbutton(evt){
  var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
var mylink = getElementsByAttribute(it.parentNode.parentNode,'*','rel','iridl:hasFigure');
var mycontainer = it.parentNode.parentNode;
removeClass(mycontainer,'ShowControlLayers ShowControlShare ShowControlDownload');
toggleClass(mycontainer,'ShowControlIvars');
}
function dosharebutton(evt){
  var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
var mylink = getElementsByAttribute(it.parentNode.parentNode,'*','rel','iridl:hasFigure');
var mycontainer = it.parentNode.parentNode;
removeClass(mycontainer,'ShowControlIvars ShowControlLayers ShowControlDownload');
toggleClass(mycontainer,'ShowControlShare');
}
function dodownloadbutton(evt){
  var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
var mylink = getElementsByAttribute(it.parentNode.parentNode,'*','rel','iridl:hasFigure');
var mycontainer = it.parentNode.parentNode;
removeClass(mycontainer,'ShowControlIvars ShowControlLayers ShowControlShare');
toggleClass(mycontainer,'ShowControlDownload');
}
function doinfobutton (evt) {
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : evt.srcElement.parentNode;
var mylink = getElementsByAttribute(it.parentNode.parentNode,'*','rel','iridl:hasFigure');
// location.href=appendPageForm(mylink[0].href+'index.html',mylink[0].figureimage.className);
location.href=mylink[0].href;
}
function DLimageResizeImage(mylink){
var imagesrc=mylink.figureimage.src;
var patt = new RegExp('//plotaxislength.([0-9]*).psdef');
var csize = imagesrc.match(patt);
if (!csize || csize.length<2){
	csize=432;
}
else {
	csize=csize[1];
}
var pform=document.getElementById('pageform');
var ckres=pform.elements['resolution'];
if(ckres){
    appendMissingClass(ckres,'transformRegion');
}
var ipt=pform.elements['clickpt'];
if(!ipt){
ipt= document.createElement('input');
ipt.className = 'transformRegion';
ipt.name = 'clickpt';
ipt.type='hidden';
pform.appendChild(ipt);
}
ipt=pform.elements['plotaxislength'];
if(!ipt){
ipt= document.createElement('input');
ipt.className = mylink.figureimage.className.split(' ')[0];
appendMissingClass(pform,ipt.className);
ipt.name = 'plotaxislength';
ipt.type='hidden';
pform.appendChild(ipt);
}
var clientsize = Math.max(mylink.parentNode.clientWidth,mylink.parentNode.clientHeight); 
var targetsize = 20*Math.round((clientsize - 20 - 72 + 9)/20,0);
if(targetsize > csize){
ipt.value=targetsize;
var newsrc=appendPageForm(mylink.figureimage.src,mylink.figureimage.className);
mylink.figureimage.src=newsrc;
}
}
function DLimageRemoveControls(mylink){
    var myimage = mylink.figureimage;
    var maybecontrol=mylink.nextSibling;
    while(maybecontrol && maybecontrol != myimage){
	var nextcontrol=maybecontrol.nextSibling;
        if(maybecontrol.className && maybecontrol.className.indexOf('dlcontrol') >= 0){
	mylink.parentNode.removeChild(maybecontrol);
	}
	maybecontrol=nextcontrol;
    }
}
/* handles building of image controls from info.json information
invoked when load of info.json completes
*/
function DLimageBuildControls(mylink){
/* builds image choice controls and places them immediately after the hasFigure link 
*/
    if(!mylink.nextSibling.className || mylink.nextSibling.className.indexOf('dlcontrol') < 0){
	var pformchanged = false;
var currentObj=mylink;
    var kmlurl=mylink.info['iridl:hasKML'];
    if(kmlurl){
	appendMissingClass(mylink.parentNode,'hasKML');
    }
    else {
	removeClass(mylink.parentNode,'hasKML');
    }
/* builds layer controls */
var layerlist =mylink.info["iridl:hasLayers"]; 
if(layerlist){
    var ctl=document.createElement('div');
var pform=document.getElementById('pageform');
var formlayers;
if(pform){
    formlayers = pform.elements['layers'];
    if(formlayers && formlayers.length){
	var arr = [];
	for (var i = formlayers.length; i-- ; arr.unshift(formlayers[i]));
	formlayers=arr;
    }
}
    ctl.className='dlcontrol ' + 'layers';
var ipt = document.createElement('span');
ipt.className='controlLabel';
ipt.innerHTML='Layers' + '  ';
ctl.appendChild(ipt);
    for (var i = 0; i<layerlist.length; i++) {
	var layer=layerlist[i];
	var layername=layer["iridl:name"];
	var style=layer["iridl:style"];
	var iptsp = document.createElement('label');
	if(style.join){
	    iptsp.className="layeroption " + style.join(" ");
	}
	else {
	    iptsp.className="layeroption " + style;
	}
	var ipt = document.createElement('input');
	ipt.name='layers';
	ipt.value=layername;
	ipt.type='checkbox';
	ipt.className='pageformcopy';
	ipt.onchange=pageformcopyonchange;
	ipt.myonchange=pageformcopyonchange;
	if(formlayers && formlayers.value==layername){
	    ipt.checked=formlayers.checked;
	}
	else if(formlayers && formlayers.some(function (ele){return (ele.value==this)},layername)){
	    var myfl = formlayers.filter(function (ele){return ele.value==this},layername)[0];
	    ipt.checked=myfl.checked;
	    }
	else {
	ipt.checked=true;
	    if(location.href.indexOf('layers=')>0 && location.href.indexOf('layers='+layername)<0 ) {
		ipt.checked=false;
	    }
	iptsp.className += " disabled";
	var newlay = document.createElement('input');
	newlay.type = 'checkbox';
	newlay.name = 'layers';
	newlay.value = layername;
        newlay.checked=ipt.checked;
        newlay.defaultChecked=ipt.checked;
	newlay.className = mylink.figureimage.className.split(' ')[0] + ' share';
	pform.appendChild(newlay);
	pformchanged=true;
	}
	iptsp.appendChild(ipt);
	ipt=document.createElement('span');
	ipt.appendChild(document.createTextNode(layername));
	iptsp.appendChild(ipt);
	    ctl.appendChild(iptsp);
}
currentObj.parentNode.insertBefore(ctl,currentObj.nextSibling);
currentObj=ctl;
}
    var ctl=document.createElement('div');
    ctl.className='dlcontrol ' + 'share';
var ipt = document.createElement('span');
ipt.className='controlLabel';
ipt.innerHTML='Share' + '  ';
ctl.appendChild(ipt);
/* evernote */
var gb= document.createElement('div');
gb.className='sharebutton evernote';
gb.setAttribute("title","Save to Evernote");
gb.onclick=doEvernoteClipElement;
gb.myonclick=doEvernoteClipElement;
gb.clipthis = currentObj.parentNode;
ctl.appendChild(gb);
/* Google Earth */
gb= document.createElement('div');
gb.className='sharebutton googleearth';
gb.setAttribute("title","View in Google Earth");
gb.onclick=doGoogleEarthClick;
gb.myonclick=doGoogleEarthClick;
gb.clipthis = currentObj.parentNode;
ctl.appendChild(gb);

currentObj.parentNode.insertBefore(ctl,currentObj.nextSibling);
currentObj=ctl;
    var ctl=document.createElement('div');
    ctl.className='dlcontrol ' + 'download';
var ipt = document.createElement('span');
ipt.className='controlLabel';
ipt.innerHTML='Download as' + '  ';
ctl.appendChild(ipt);
currentObj.parentNode.insertBefore(ctl,currentObj.nextSibling);
currentObj=ctl;
/* builds fig dimension controls */
var dimlist=mylink.info["iridl:hasDimensions"];
if(dimlist){
for (var i = 0; i<dimlist.length; i++) {
var glist=dimlist[i]['iridl:gridvalues']['iridl:valuelist'];
if(glist && (glist.length > 1)){
var ctl = document.createElement('div');
ctl.className='dlcontrol ivar ' + dimlist[i]['iridl:name'];
var ipt = document.createElement('span');
ipt.className='controlLabel';
ctl.longName=dimlist[i]['cfatt:long_name'];
ipt.innerHTML=dimlist[i]['cfatt:long_name'] + '  ';
ctl.appendChild(ipt);
var iptset = document.createElement('span');
iptset.className='controlSet';
iptset.info=dimlist[i];
iptset.mylink=mylink;
ctl.appendChild(iptset);
ipt = document.createElement('span');
ipt.className='lowerLimit';
ipt.onclick=limitclickevent;
ipt.myevtfn=limitclickevent;
ipt.innerHTML=glist[0];
iptset.appendChild(ipt);
ipt = document.createElement('div');
ipt.className='oneStep leftarrow';
ipt.onclick=stepdownclickevent;
ipt.myclickfn=stepdownclickevent;
/*ipt.innerHTML='&lt;';*/
iptset.appendChild(ipt);
ipt = document.createElement('input');
ipt.className=mylink.figureimage.className.split(' ')[0] + ' pageformcopy';
ipt.name=dimlist[i]['iridl:name'];
ipt.value=dimlist[i]['iridl:defaultvalue'];
ipt.onchange=imageinputvaluechange;
ipt.mychangeevtfn=imageinputvaluechange;
ipt.size=16;
iptset.appendChild(ipt);
/* resets class of iptset to reflect whether the defaultvalue
 corresponds to singleValue (in list of values) or multiValue (not
 in list of values and presumably a range) */

var cin = dimlist[i]['iridl:gridvalues']['iridl:valuelist'].indexOf(ipt.value);
var controlClass;
if(cin > -1){
    controlClass="singleValue";
}
else {
    controlClass="multiValue";
}
appendMissingClass(iptset,controlClass);
if(document.getElementById('pageform')){
var pform=document.getElementById('pageform');
if(!pform.elements[ipt.name]){
var iptcpy= document.createElement('input');
iptcpy.className = ipt.className;
appendMissingClass(pform,ipt.className);
iptcpy.name = ipt.name;
iptcpy.value=ipt.value;
iptcpy.type='hidden';
pform.appendChild(iptcpy);
}
else {
if(pform.elements[ipt.name].value != ''){
ipt.value=pform.elements[ipt.name].value;
}
}
}
ipt = document.createElement('span');
ipt.onclick=stepupclickevent;
ipt.className='oneStep rightarrow';
/*ipt.innerHTML='>';*/
iptset.appendChild(ipt);
ipt = document.createElement('span');
ipt.className='upperLimit';
ipt.onclick=limitclickevent;
ipt.innerHTML=glist[glist.length-1];
iptset.appendChild(ipt);
currentObj.parentNode.insertBefore(ctl,currentObj.nextSibling);
currentObj=ctl;
}
}
}
var ivarlist = mylink.parentNode.getElementsByClassName('ivar');
if(ivarlist.length > 0){
    appendMissingClass(mylink.parentNode,'hasIvars');
    var ivars = [];
    for (var i=ivarlist.length; i--; ivars.unshift(ivarlist[i].longName));
    var ivarswitch = mylink.parentNode.getElementsByClassName('ivarswitch')[0];
    ivarswitch.setAttribute('title',ivars.join(', '));
}
else {
    removeClass(mylink.parentNode,'hasIvars');
}
var layerlist =mylink.info["iridl:hasLayers"]; 
if(layerlist){
    appendMissingClass(mylink.parentNode,'hasLayers');
}
else {
    removeClass(mylink.parentNode,'hasLayers');
}
if(pformchanged){
    updatePageForm();
}
    } // end of image (dimension) control builds
}
function DLimageBuildZoom(mylink){
var myfigure = mylink.figureimage;
if(!myfigure.myoverlay){
//if(false){
var myimgdiv = document.createElement('div');
myfigure.myoverlay=myimgdiv;
myimgdiv.className="imageOverlayDiv inactive imageoverlaypart";
myimgdiv.style.position='absolute';
// myimgdiv.style.width=myfigure.width + 'px';
// myimgdiv.style.height=myfigure.height + 'px';
// image is not necessarily loaded yet, so cannot be sure of the image size.
myimgdiv.style.width=myfigure.clientWidth + 'px';
myimgdiv.style.height=myfigure.clientHeight + 'px';
myimgdiv.style.padding='0px';
// events on div for almost everybody
myimgdiv.onmousedown=startdrag;
myimgdiv.onmouseup=stopdrag;
myimgdiv.onmousemove=followdrag;
myimgdiv.evtfnonmousedown=startdrag;
myimgdiv.evtfnonmouseup=stopdrag;
myimgdiv.evtfnonmousemove=followdrag;
/* myimgdiv.onmouseover=hello; */
myimgdiv.onmouseout=goodbye;
// hello for everybody -- turns on overlays
myfigure.onmouseover=hello;
// events on figure for IE9
myfigure.onmousedown=startdrag;
myfigure.onmouseup=stopdrag;
myfigure.onmousemove=followdrag;
myfigure.onmouseout=goodbye;
myfigure.onclick=skipme;
myimgdiv.mycontainer=myfigure.parentNode;
myimgdiv.zoomstatus=document.createElement('div');
myimgdiv.zoomstatus.className='zoomStatus imageoverlaypart';
myimgdiv.zoomstatus.style.position='absolute';
myimgdiv.zoomstatus.style.visibility='hidden';
myimgdiv.appendChild(myimgdiv.zoomstatus);
myimgdiv.outline=document.createElement('div');
myimgdiv.outline.className='imageoverlaypart';
myimgdiv.outline.style.visibility='hidden';
myimgdiv.outline.style.position='absolute';
myimgdiv.outline.style.width='85px';
myimgdiv.outline.style.height='54px';
myimgdiv.outline.style.left='102px';
myimgdiv.outline.style.top='50px';
myimgdiv.outline.style.zindex='5';
myimgdiv.outline.style.backgroundColor='#E00000';
myimgdiv.outline.style.color='#ffff99';
myimgdiv.outline.onclick=skipme;
myimgdiv.outline.onmousemove=skipme;
myimgdiv.appendChild(myimgdiv.outline);
myimgdiv.outlineimage=document.createElement('span');
myimgdiv.outlineimage.className='imageoverlaypart';
myimgdiv.outlineimage.style.position='absolute';
myimgdiv.outlineimage.style.left='-102px';
myimgdiv.outlineimage.style.top='-50px';
myimgdiv.outlineimage.style.clip='rect(52px 184px 102px 104px)';
myimgdiv.outline.appendChild(myimgdiv.outlineimage);
myimgdiv.outlineimage.onclick=skipme;
myimgdiv.outlineimage.onmousemove=skipme;
myimgdiv.inputimage=myfigure;
var newimg=document.createElement("img");
newimg.width=myimgdiv.inputimage.width;
newimg.height=myimgdiv.inputimage.height;
newimg.src=myimgdiv.inputimage.src;
myimgdiv.outlineimage.appendChild(newimg);
myfigure.parentNode.insertBefore(myimgdiv,myfigure);
// myimgdiv.appendChild(myfigure);
}
}
function hideImageOverlay(myfigure){
if(myfigure.myoverlay){
var myimgdiv=myfigure.myoverlay;
myimgdiv.outline.style.visibility='hidden';
myimgdiv.inputimage.style.visibility='visible';
}
}
function resetImageOverlay(myfigure){
if(myfigure.myoverlay){
var myimgdiv = myfigure.myoverlay;
myimgdiv.style.width=myfigure.clientWidth + 'px';
myimgdiv.style.height=myfigure.clientHeight + 'px';
myimgdiv.outlineimage.children[0].width=myfigure.width;
myimgdiv.outlineimage.children[0].height=myfigure.height;
myimgdiv.outlineimage.children[0].src=myfigure.src;
}
}
function getcurrentTarget(evt) {
evt = (evt) ? evt : event;
if(evt){
var elem = (evt.currentTarget) ? evt.currentTarget :  null;
if(elem){
return elem;
}
}
return null;
}
function hello(evt){
    var myimgdiv;
    var newentrance=false;
var mytarget=getcurrentTarget(evt);
if(!mytarget){mytarget=this};
if(mytarget.myoverlay){
    myimgdiv = mytarget.myoverlay;
    if(myimgdiv.className.indexOf('inactive')>=0){
	    newentrance='true';
    changeClass(myimgdiv,'inactive','active');
	}
}
else {
    myimgdiv = mytarget;
}
if(newentrance){
var myform=document.getElementById('pageform');
var checkobj;
if(myform){
checkobj = myform.elements['region'];
}
var mypar=myimgdiv.zoomstatus;
if(mypar){
if(checkobj){
var res = myform.elements['resolution'];
var resclass="point";
if(parseFloat(res.value) != 'NaN'){
resclass = res.value + "&deg; box";
}
// adds pickRegion if necessary to indicate that we could pick a point or choose an area
appendMissingClass(myimgdiv,'pickRegion');
mypar.innerHTML="click for " + resclass +"<br /> click & drag down-and-right for larger or to zoom in";
}
else {
mypar.innerHTML="click & drag down-and-right to zoom in";
}
mypar.style.visibility="visible";
mypar.timeoutId=setTimeout(function () {mypar.style.visibility='hidden'},3000);
}
}
return true;
}
function goodbye(evt){
    var myimgdiv;
var mytarget=getcurrentTarget(evt);
if(!mytarget){mytarget=this};
evt = (evt) ? evt : event;

if(mytarget.myoverlay){
    myimgdiv = mytarget.myoverlay;
}
else {
    myimgdiv = mytarget;
}

if(myimgdiv){
    if(!evt.relatedTarget || (evt.relatedTarget.className.indexOf('imageoverlaypart') == -1 && evt.relatedTarget != myimgdiv.inputimage  && evt.relatedTarget.parentNode != myimgdiv.outlineimage )){
    changeClass(myimgdiv,'active','inactive');
    if(myimgdiv.zoomstatus){
myimgdiv.zoomstatus.style.visibility="hidden";
if(myimgdiv.zoomstatus.timeoutId){

clearTimeout(myimgdiv.zoomstatus.timeoutId);
myimgdiv.zoomstatus.timeoutID=null;
}
    }
    }
}
return true;
}
/* drag zoom routines */
var myobj=null;
var myx,myy;
function doit(state){
myit=document.getElementById("outline");
myit.style.visibility=state;
return false;
}
function stopdrag(evt){
evt = (evt) ? evt : event;
    var myimgdiv;
var mytarget=getcurrentTarget(evt);
if(!mytarget){mytarget=this};
if(mytarget.myoverlay){
    myimgdiv = mytarget.myoverlay;
}
else {
    myimgdiv = mytarget;
}
var myinfo = myimgdiv.inputimage.mylink.info;
removeClass(myimgdiv,'zoomArea');
var myvals;
if(myobj != null && myinfo){
if(myobj.style.visibility == 'visible'){
    myvals=lonlat(myinfo,myimgdiv.inputimage.className,myimgdiv.inputimage.clientWidth,parseInt(myobj.style.left),parseInt(myobj.style.top),parseInt(myobj.style.width),parseInt(myobj.style.height));
changeClass(myimgdiv.inputimage,'valid','invalid-zooming');
}
else {
var dx,dy;
if(typeof evt.pageX != 'undefined'){
dx=evt.pageX-absLeft(myimgdiv);
dy=evt.pageY-absTop(myimgdiv);
}
else {
    dx=evt.clientX + myimgdiv.scrollLeft-absLeft(myimgdiv);
dy=evt.clientY + myimgdiv.scrollTop-absTop(myimgdiv);
}
myvals=lonlat(myinfo,myimgdiv.inputimage.className,myimgdiv.inputimage.clientWidth,dx,dy,0,0);
}
setbbox(myvals,myinfo["wms:CRS"]);
}
if(myobj != null && myobj.style.visibility == 'visible'){
evt.cancelBubble = true;
myobj=null;
mypar=myimgdiv.zoomstatus;
// mypar.innerHTML="zooming " + JSON.stringify(myvals);
mypar.innerHTML="zooming... ";
// mypar.style.visibility="visible";
return false;
}
else {
myobj=null;
return true;
}
}
function absLeft(obj){
if(obj.offsetParent){
myval=obj.offsetLeft + absLeft(obj.offsetParent);
}
else {
myval=obj.offsetLeft;
}
return myval;
}
function absTop(obj){
if(obj.offsetParent){
myval=obj.offsetTop + absTop(obj.offsetParent);
}
else {
myval=obj.offsetTop;
}
return myval;}
function startdrag(evt){
evt = (evt) ? evt : event;
    var myimgdiv;
var mytarget=getcurrentTarget(evt);
if(!mytarget){mytarget=this};
if(mytarget.myoverlay){
    myimgdiv = mytarget.myoverlay;
}
else {
    myimgdiv = mytarget;
}
var myworld = myimgdiv.mycontainer;
if(myworld){
var myinfo = myimgdiv.inputimage.mylink.info;
var plotborderleft = myinfo["iridl:plotborderleft"];
var plotbordertop = myinfo["iridl:plotbordertop"];
var plotborderright = myinfo["iridl:plotborderright"];
var plotborderbottom = myinfo["iridl:plotborderbottom"];
// alert(evt.layerX + ' ' + evt.x + ' ' + evt.pageX + ' ' + absLeft(myimgdiv));
if(typeof evt.pageX != 'undefined'){
myx=evt.pageX-absLeft(myimgdiv);
myy=evt.pageY-absTop(myimgdiv);
}
else {
    myx=evt.clientX + myimgdiv.scrollLeft-absLeft(myimgdiv);
myy=evt.clientY + myimgdiv.scrollTop-absTop(myimgdiv);
}
if(myobj == null){
myobj = myimgdiv.outline;
sizeto(myobj,0,0);
// added zoomArea class to imgdiv to indicate that we are now choosing an area
appendMissingClass(myimgdiv,'zoomArea');
return false;
}else
{return true;
}
}
}
function followdrag(evt){
evt = (evt) ? evt : event;
    var myimgdiv;
var mytarget=getcurrentTarget(evt);
if(!mytarget){mytarget=this};
if(mytarget.myoverlay){
    myimgdiv = mytarget.myoverlay;
}
else {
    myimgdiv = mytarget;
}
var myworld = myimgdiv.mycontainer;
if(myworld){
var myinfo = myimgdiv.inputimage.mylink.info;
var plotborderleft = myinfo["iridl:plotborderleft"];
var plotbordertop = myinfo["iridl:plotbordertop"];
var plotborderright = myinfo["iridl:plotborderright"];
var plotborderbottom = myinfo["iridl:plotborderbottom"];
var Xaxislength = myinfo["iridl:Xaxislength"];
var Yaxislength = myinfo["iridl:Yaxislength"];
if(myobj != null){
if(typeof evt.pageX != 'undefined'){
dx=evt.pageX-absLeft(myimgdiv);
dy=evt.pageY-absTop(myimgdiv);
}
else {
    dx=evt.clientX + myimgdiv.scrollLeft-absLeft(myimgdiv);
dy=evt.clientY + myimgdiv.scrollTop-absTop(myimgdiv);
}
cw=parseInt(myobj.style.width);
ch=parseInt(myobj.style.height);
newx=Math.min(dx,myx);
newy=Math.min(dy,myy);
neww=Math.max(dx,myx)-newx;
newh=Math.max(dy,myy)-newy;
//if(newx >plotborderleft && newy>plotborderright&& newx+neww<Xaxislength+plotborderleft && newy+newh < Yaxislength+plotbordertop)
if(true){
sizeto(myimgdiv.outline,neww,newh);
if(cw*ch > 0){
myimgdiv.outline.style.visibility='visible';
}
shiftto(myimgdiv.outline,newx,newy);
}
evt.cancelBubble = true;
}
}
return false;
}
function skipme(evt){
return false;
}
function classMatch (clists, clists2){
var clist = clists.split(' ');
var clist2 = clists2.split(' ');
for ( var i = 0; i < clist.length; i++ ){
    for (var j = 0 ; j < clist2.length; j++){
	if(clist[i] == clist2[j]){
	    return true;
	}
    }
}
return false;
}
function plotaxislengthfn(myinfo,imageclass){
var plotaxislength;
var Xaxislength = myinfo["iridl:Xaxislength"];
var Yaxislength = myinfo["iridl:Yaxislength"];
var pform=document.getElementById('pageform');

if(pform && pform.elements['plotaxislength'] && classMatch(imageclass,pform.elements['plotaxislength'].className) && pform.elements['plotaxislength'].value){
	plotaxislength = pform.elements['plotaxislength'].value;
}
else {
	if(Xaxislength >= Yaxislength){
	plotaxislength = Xaxislength;
	}
	else {
	plotaxislength = Yaxislength;
	}
}
return(plotaxislength);
}
lonlatA=new Array();
function lonlat(myinfo,myclass,imagewidth,left,top,width,height){
myA=lonlatA;
var plotborderleft = myinfo["iridl:plotborderleft"];
var plotbordertop = myinfo["iridl:plotbordertop"];
var plotborderright = myinfo["iridl:plotborderright"];
var plotborderbottom = myinfo["iridl:plotborderbottom"];
var plotaxislength = plotaxislengthfn(myinfo,myclass);
var Xaxislength = myinfo["iridl:Xaxislength"];
var Yaxislength = myinfo["iridl:Yaxislength"];
myA = getbbox(myinfo);
var X0,X1,Y0,Y1,DX,DY;
X0 = myA[0];
Y0 = myA[1];
X1 = myA[2];
Y1 = myA[3];
if(X1>X0) {
    DX = X1-X0;
} else {
    DX = X0 - X1;
}
if(Y1>Y0) {
    DY = Y1-Y0;
} else {
    DY = Y0 - Y1;
}
if(DX >= DY) {
Yaxislength = Math.round((plotaxislength * DY)/DX);
Xaxislength = plotaxislength;
}
else {
    Xaxislength = Math.round((plotaxislength * DX)/DY);
Yaxislength = plotaxislength;
}
frac = imagewidth/(parseFloat(plotborderleft) + parseFloat(Xaxislength) + parseFloat(plotborderright));
nxl =  X0 + (X1-X0)*(left-frac*plotborderleft)/(frac*Xaxislength);
nxr =  X0 + (X1-X0)*(left+width-frac*plotborderleft)/(frac*Xaxislength);
nyt =  Y1 - (Y1-Y0)*(top-frac*plotbordertop)/(frac*Yaxislength);
nyb =  Y1 - (Y1-Y0)*(top+height-frac*plotbordertop)/(frac*Yaxislength);
var scale = Math.max(0,4 - Math.floor(Math.log(Math.abs(X1-X0))/Math.log(10.)));
         nxl = nxl.toFixed(scale);
         nxr = nxr.toFixed(scale);
scale = Math.max(0,4 - Math.floor(Math.log(Math.abs(Y1-Y0))/Math.log(10.)));
         nyt = nyt.toFixed(scale);
         nyb = nyb.toFixed(scale);
myA[0]=nxl;
myA[1]=nyb;
myA[2]=nxr;
myA[3]=nyt;
return myA;
}
function grow(myit,dx,dy){
myit.style.width=parseInt(myit.style.width)+dx+'px';
myit.style.height=parseInt(myit.style.height)+dy+'px';
myitt=myit.childNodes[0];
var re=/(\d+)px,?\s*(\d+)px,?\s*(\d+)px,?\s*(\d+)px/;
var results = re.exec(myitt.style.clip);
myitt.style.clip="rect(" + results[1] + "px " + (parseInt(results[2])+dx) + "px " +
(parseInt(results[3])+dy) + "px " + results[4] + "px)";
return false;
}
function sizeto(myit,dx,dy){
cw=parseInt(myit.style.width);
ch=parseInt(myit.style.height);
grow(myit,dx-cw,dy-ch);
}
function shiftby(myit,dx,dy){
myit.style.left=parseInt(myit.style.left)+dx+'px';
myit.style.top=parseInt(myit.style.top)+dy+'px';
myitt=myit.childNodes[0];
var re=/(\d+)px,?\s*(\d+)px,?\s*(\d+)px,?\s*(\d+)px/;
var results = re.exec(myitt.style.clip);
myitt.style.clip="rect(" + (parseInt(results[1])+dy) + "px " + (parseInt(results[2])+dx) + "px " +
(parseInt(results[3])+dy) + "px " + (parseInt(results[4])+dx) + "px)";
myitt.style.left=parseInt(myitt.style.left)-dx+'px';
myitt.style.top=parseInt(myitt.style.top)-dy+'px';
return false;
}
function shiftto(myit,newx,newy){
cleft=parseInt(myit.style.left);
ctop=parseInt(myit.style.top);
shiftby(myit,newx-cleft,newy-ctop);
}
/* end of drag zoom routines */
function insertcontrolBar(){
var s=document.getElementById('irilink');
if(!s){
    var mylist=document.getElementsByClassName("controlBar");
if(mylist.length>0){
var cont=mylist[0];
var gb= document.createElement('a');
gb.id='irilink';
gb.href="http://iri.columbia.edu/";
var hasSVG = document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.1");
if(hasSVG && navigator.appVersion.indexOf('MSIE 9')<0 && navigator.appVersion.indexOf('MSIE 8')<0 ){
var ob= document.createElement('object');
ob.data=scriptroot + "icons/iri.svg";
ob.type="image/svg+xml";
ob.className="iriicon";
gb.appendChild(ob);
}
else {
var obim = document.createElement('img');
obim.className="iriicon";
        if(document.width < 750){
	    obim.src = scriptroot + 'icons/iri32.png';
}
else {
	    obim.src = scriptroot + 'icons/iri.png';
}
gb.appendChild(obim);
}
cont.insertBefore(gb,cont.firstChild);
var slist = cont.getElementsByTagName('select');
for (var i=0; i<slist.length ; i++){
    var mysel = slist[i];
    if(mysel.previousSibling.className != "selectvalue"){
	var sv = document.createElement('span');
	sv.className='selectvalue';
	sv.onclick=selectvalueclick;
	sv.onclickFn=selectvalueclick;
	if(mysel.selectedIndex >=0){
	sv.innerHTML=mysel.options[mysel.selectedIndex].innerHTML;
	}
	mysel.parentNode.insertBefore(sv,mysel);
    }
}
}
}
insertlang();
}
/* this exists to convince ios to send events to selectvalue for CSS */
function selectvalueclick () {
    return true;
}
var Languages = new Array();
Languages["en"]="english";
Languages["es"]="espa&#241;ol";
Languages["in"]="bahasa";
Languages["fr"]="fran&ccedil;ais";
Languages["id"]="bahasa";
function languageChange(){
var s=document.getElementById('chooseLanguage');
var sel=s.getElementsByTagName('select')[0];
var newvalue=sel.options[sel.selectedIndex].value;
if(newvalue){
    if(newvalue.substr(0,5)=='file:'){
	var locq = newvalue.indexOf('?');
	if(locq>0){
	var lang = newvalue.substr(newvalue.indexOf('Set-Language=')+13);
	newvalue = newvalue.substr(0,locq) + '.' + lang + newvalue.substr(locq);
	}
    }
location.href=newvalue;
}
}
function insertlang(){
var s=document.getElementById('chooseLanguage');
var langList=document.getElementsByClassName('altLanguage');
if(!s && langList.length>0){
fs = document.createElement('fieldset');
fs.className='lang';
fs.id='chooseLanguage';
var leg=document.createElement('legend');
leg.innerHTML='Language';
fs.appendChild(leg);
var sel=document.createElement('select');
sel.name="Set-Language";
sel.onchange=languageChange;
var opt=document.createElement('option');
if(document.getElementsByTagName('html')[0].hasAttribute("xml:lang")){
opt.value=document.getElementsByTagName('html')[0].getAttribute("xml:lang");
}
else {
opt.value=document.getElementsByTagName('body')[0].getAttribute("xml:lang");
}
opt.innerHTML=Languages[opt.value];
opt.value="";
sel.appendChild(opt);
for( var i=0 ; i < langList.length ; i++){
opt=document.createElement('option');
opt.value=langList[i].href;
opt.innerHTML=Languages[langList[i].hreflang];
if(!opt.innerHTML)opt.innerHTML=langList[i].lang;
sel.appendChild(opt);
}
fs.appendChild(sel);
var mylist=document.getElementsByClassName("controlBar");
if(mylist.length>0){
var cont=mylist[0];
cont.insertBefore(fs,cont.firstChild);
}
}
}
var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-432152-4']);
  _gaq.push(['_trackPageview']);
  _gaq.push(['_trackPageLoadTime']); 
 (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
	var pair;
        for (var i = 0; i < vars.length; i++) {
            pair = vars[i].split("=");
            if (pair[0] == variable) {
                return unescape(pair[1]);
            }
        }
	return undefined;
    }

function setPageForm(){
var myform=document.getElementById('pageform');
if(myform){
    /* initializes pageform classes */
    var inputs = myform.children;
    var pfclasses = [];
    var clist = myform.className.split(' ');
    for (var i = 0 ; i < clist.length ; i++){
	pfclasses[clist[i]] = true;
    }
    for (var i = 0; i < inputs.length ; i++){
	var inp = inputs[i];
	/* adds defaultValue to all input elements, e.g. hidden elements  */
	if(typeof(inp.value) != undefined && typeof(inp.defaultValue) == 'undefined'){
	    inp.defaultValue = inp.value;
		}
	clist = inp.className.split(' ');
	for (var j=0; j< clist.length; j++){
	    if(!pfclasses[clist[j]]){
		pfclasses[clist[j]] = true;
		myform.className = myform.className + ' ' + clist[j];
	    }
	}
    }
    /* updates values from page url */
var achange=false;
var inputs=myform.elements;
        var query = window.location.search.substring(1);
        var vars = query.split("&");
	var pair;
        for (var i = 0; i < vars.length; i++) {
            pair = vars[i].split("=");
            if (inputs[pair[0]]) {
	        achange=true;
// decode and encode do not properly invert each other w.r.t. space to + conversion
	        var hold = pair[1].replace(/[+]/g," ");
		inputs[pair[0]].value=decodeURIComponent(hold);
            }
        }
	updatePageFormCopies(document);
}
}
function disableNullInputs(){
var myform=document.getElementById('pageform');
if(myform){
var inputs=myform.elements;
        for (var i = 0; i < inputs.length; i++) {

	    if(inputs[i].length){
		/* multiple inputs with one name -- switch together */
		var allq=true;
		var myl=inputs[i];
		if(myl.type='checkbox'){
		for(var j=myl.length;j--;){
		    /* i.e. all disabled if all defaultChecked */
		    if(myl[j].checked != myl[j].defaultChecked) {allq=false} 
		};
		if(!allq){
		var myl=inputs[i];
		for(var j=myl.length;j--;myl[j].disabled=true);
		}
		}
		else {
		for(var j=myl.length;j--;){
		    if(myl[j].value != myl[j].defaultValue) {allq=false}
		};
		if(!allq){
		var myl=inputs[i];
		for(var j=myl.length;j--;myl[j].disabled=true);
		}
		}
	    }
	    else {
		/* single input with name */
		if(!inputs[i].value){
		    inputs[i].disabled=true;
		}
	    }
}
}
}
function addLanguageVar(url){
var myform=document.getElementById('pageform');
if(myform){
var lang=myform.elements['Set-Language'];
if(lang && lang.value){
    var newurl = url;
if(newurl.charAt(newurl.length-1) == '/'){
   newurl=newurl+'index.html';
}
newurl= newurl + "?Set-Language=" + lang.value;
return newurl;
}
}
return url;
}
function setupPageFormLinks(){
var myform=document.getElementById('pageform');
if(myform){
var clist = myform.className.split(' ');
for ( var i = 0; i < clist.length; i++ )
         {
var cclass=clist[i];
var members = document.getElementsByClassName(cclass);
for ( var j = 0; j < members.length; j++ ) {
if(members[j].href){
members[j].onclick=onClickPageForm;
}
if(members[j].src){
members[j].onload=imageloadedevent;
appendMissingClass(members[j],'valid');
}
}
}
var stag = document.getElementsByClassName('pageformcopy');
for (var i=0; i< stag.length ; i++){
var sel=stag[i];
if(typeof(sel.onchange) != 'function'){
sel.onchange=pageformcopyonchange;
sel.onchangefn=pageformcopyonchange;
}
}
updatePageForm();
}
}

function invalidatePageInput(iname){
    ChangeClassPageInput(iname,'valid','invalid');
}
function validatePageInput(iname){
    ChangeClassPageInput(iname,'invalid','valid');
}
function ChangeClassPageInput(iname,fromclass,toclass){
    var myform=document.getElementById('pageform');
    if(myform){
	var myinput=myform.elements[iname];
	if(myinput){
	    var clist = myinput.className.split(' ');
	    for ( var i = 0; i < clist.length; i++ )
		{
		    var cclass=clist[i];
		    var members = document.getElementsByClassName(cclass);
		    for ( var j = 0; j < members.length; j++ ) {
			var cmem=members[j];
			if(cmem.rel == 'iridl:hasJSON'){
			changeClass(cmem.parentNode,fromclass,toclass);
			}
			else if(cmem.rel == 'iridl:hasFigure'){
			    changeClass(cmem.parentNode,fromclass,toclass);
			}
			else {
			    changeClass(cmem,fromclass,toclass);
			}

		    }
		}
	}
    }
}

/*
function to indicate an update to the pageform
updates all image urls that have classes that match the pageform
updates elements in class pageformcopy with corresponding name.

If supplied with the input element that changed,
1) only checks the classes that correspond, and
2) uses guessvalue to do readahead, resetting when done. 
*/
function updatePageFormQuietly(changedInput, newvalue, guessvalue){
updatePageFormSub(true,changedInput, newvalue, guessvalue);
}
function updatePageForm(changedInput, newvalue, guessvalue){
updatePageFormSub(false,changedInput, newvalue, guessvalue);
}
function updatePageFormSub(quietflag,changedInput, newvalue, guessvalue){
var myform=document.getElementById('pageform');
if(myform){
updatePageFormConditionalClassesAndFlags(true);
var clist;
if(changedInput){
clist = changedInput.className.split(' ');
if(newvalue){
changedInput.value=newvalue;
}
}
else {
clist = myform.className.split(' ');
}
for ( var i = 0; i < clist.length; i++ )
         {
var cclass=clist[i];
var membersnl = document.getElementsByClassName(cclass);
var members=Array.prototype.slice.call(membersnl,0);
members.sort(function(a,b) {var ao=Math.abs(a.offsetTop-window.pageYOffset); bo=Math.abs(b.offsetTop-window.pageYOffset); return ao-bo});
for ( var j = 0; j < members.length; j++ ) {
var cmem=members[j];
/* first changes images that are on-screen */
if(cmem.offsetTop != 0 && cmem.tagName == 'IMG'){
var newsrc = appendPageForm(cmem.src.replace(/[?].*/,''),cmem.className);
if(newsrc != cmem.src){
if(!quietflag) {
changeClass(cmem,'valid','invalid');
}
    cmem.src = newsrc;
}
}
if(cmem.tagName == 'LINK' || cmem.tagName == 'A'){
var newsrc = appendPageForm(cmem.href.replace(/[?].*/,''),cmem.className);
if(newsrc != cmem.href){
    cmem.href = newsrc;
    if(cmem.rel == 'iridl:hasJSON'){
	updateHasJSON(cmem);
    }
    if(cmem.rel == 'iridl:hasFigure'){
	updateHasFigure(cmem);
    }
}
}
if(cmem.tagName == 'DIV'){
    if(cmem.getAttribute('data-href') && cmem.indexOf('share')>=0 ) {
    var url = appendPageForm(location.href.replace(/[?].*/,''),'share');
    url = url.replace(/[?]/,"/QS/");
    cmem.setAttribute("data-href",url);
    if(typeof(FB) != 'undefined'){
    FB.XFBML.parse();
    }
    }
					   
}
}	
	 } 
/* changes images that were missed above (presumably off-screen */
for ( var i = 0; i < clist.length; i++ )
    {
var cclass=clist[i];
var members = document.getElementsByClassName(cclass);
for ( var j = 0; j < members.length; j++ ) {
var cmem=members[j];
if(cmem.tagName == 'IMG'){
var newsrc = appendPageForm(cmem.src.replace(/[?].*/,''),cmem.className);
if(newsrc != cmem.src){
if(!quietflag) {
changeClass(cmem,'valid','invalid');
}
/* to avoid generating unused images, if an image is marked regionwithinbbox and is not being shown, the url is not changed */
if(regionIsWithinBbox || cmem.className.indexOf('regionwithinbbox')<0){
    cmem.src = newsrc;
}
}
}
}
	}
/* processes guessvalue, i.e. readahead for images */
if(guessvalue){
changedInput.value=guessvalue;
for ( var i = 0; i < clist.length; i++ )
         {
var cclass=clist[i];
var members = document.getElementsByClassName(cclass);
for ( var j = 0; j < members.length; j++ ) {
var cmem=members[j];
if(cmem.tagName == 'IMG'){
var newsrc = appendPageForm(cmem.src.replace(/[?].*/,''),cmem.className);
if(newsrc != cmem.src){
	preload(newsrc);
}
}
}
}
changedInput.value=newvalue;
}
updatePageFormCopies(document);
updatePageFormConditionalClassesAndFlags(false);
}
}
function updatePageFormConditionalClassesAndFlags(doflags){
var myform=document.getElementById('pageform');
if(myform){
    /* updates regionwithinbbox */
var mybb = myform.elements['bbox'];
var myregion = myform.elements['region'];
var myclickpt = myform.elements['clickpt'];
var within = false;
if(myclickpt && myclickpt.value){
    within = true;
}
else {
if (mybb && mybb.value.length>8 && myregion && myregion.value.length > 8){
var bba = parseBbox(mybb.value);
    var regiona = myregion.value.split(':',8);
    if(regiona[0] == 'bb' && regiona.length > 4 && regiona[1] == bba[0] && regiona[2] == bba[1] && regiona[3] == bba[2]   && regiona[4] == bba[3]){
	within = false;
    }
    else {
	within = true;
    }
}
else 
    {
if(myregion && myregion.value.length > 8){
    within = true;
}
    }
}
if(within){
    setregionwithinbbox(true,doflags);
}
else {
    setregionwithinbbox(false,doflags);
}
/* does bodyClasses */
if(!doflags){
if(myform.className.indexOf('bodyClass')>=0){
var mylist = myform.elements;
var thebody = document.getElementsByTagName('body')[0];
for (var i=0 ; i < mylist.length ; i++){
    if(mylist[i].className.indexOf('bodyClass')>=0){
	var value = mylist[i].name + mylist[i].value;
	if(thebody.className.indexOf(value)<0 || thebody.className.substr(thebody.className.indexOf(value)).split(" ") != value){
	    var cclassi = thebody.className.indexOf(mylist[i].name);
	    if(cclassi>=0){
		var oldclass = "" + thebody.className.substr(cclassi).split(" ")[0];
		removeClass(thebody,oldclass);
	    }
	    appendMissingClass(thebody,value);
	}
    }
}
}
}
}
}
/* updates class pageformcopy selects to match pageform
 */
function updatePageFormCopies(context){
    var mycontext=context;
    if(!mycontext || !mycontext.getElementsByClassName){
	mycontext=document;
    }
var myform=document.getElementById('pageform');
if(myform){
var stag = mycontext.getElementsByClassName('pageformcopy');
for (var i=0; i< stag.length ; i++){
var sel=stag[i];
var cval;
var elbyname = myform.elements[sel.name];
if(typeof(elbyname) != 'undefined'){
    if(elbyname.length){
	/* multivalued copy -- hopefully checkbox */
	if(elbyname[0].type != 'checkbox'){
	    /* multivalued copy -- checkbox */
	    for(var j = elbyname.length; j-- ;){
		if(elbyname[j].value == sel.value){
		    sel.checked = elbyname[j].checked;
		}
	    }
	}
	else {
	    /* multivalued but not checkbox -- how to copy */
	}
    }
    else {
    /* single valued form elements */
cval = myform.elements[sel.name].value;
if((typeof(sel.value) != 'undefined') && cval && sel.value != cval){
sel.value=cval;
}
    }
    }
    else {
	alert('no pageform input called ' + sel.name);
    }
if(typeof(cval) != 'undefined' && typeof(sel.selectedIndex) === 'number'){
var options=sel.options;
sel.selectedIndex=-1;
if(sel.previousSibling.className == 'selectvalue'){
sel.previousSibling.innerHTML="";
}
for (var j=0; j < options.length ; j++){
if(options[j].value == cval){
sel.selectedIndex=j;
if(sel.previousSibling.className == 'selectvalue'){
sel.previousSibling.innerHTML=sel.options[sel.selectedIndex].innerHTML;
}
break;
}
}
}
}
}
}
/* validateAndCorrectsPageForm */
function validateAndCorrectPageForm(context){
    var mycontext=context;
    if(!mycontext || !mycontext.getElementsByClassName){
	mycontext=document;
    }
var myform=document.getElementById('pageform');
if(myform){
    var valid=true;
    var stag = mycontext.getElementsByClassName('containsAllValids');
for (var i=0; i< stag.length ; i++){
var sel=stag[i];
if(sel.selectedIndex == -1 && typeof(myform.elements[sel.name]) != 'undefined'){
    valid=false;
    sel.selectedIndex=0;
myform.elements[sel.name].value=sel.options[sel.selectedIndex].value;
if(sel.previousSibling.className == 'selectvalue'){
sel.previousSibling.innerHTML=sel.options[sel.selectedIndex].innerHTML;
}
 }   
}
if(!valid){
    updatePageForm();
}
}
}
function imageloadedevent(evt){
    evt = (evt) ? evt : ((event) ? event : null );
var it = (evt.currentTarget) ? evt.currentTarget : evt.srcElement;
changeClass(it,'invalid','valid');
changeClass(it,'invalid-zooming','valid');
if(it.className.indexOf('dlimg') >=0){
if(it.mylink){
var mynode = it.mylink.parentNode;
if(it.height>1.5*it.width && mynode.className.indexOf('tall')<0){
mynode.className = mynode.className + ' tall';
}
if(it.height<1.5*it.width && mynode.className.indexOf('tall')>0){
mynode.className = mynode.className.replace(' tall','');
}
if(it.height*2<it.width && mynode.className.indexOf('wide')<0){
mynode.className = mynode.className + ' wide';
}
if(it.height*2>it.width && mynode.className.indexOf('wide')>0){
mynode.className = mynode.className.replace(' wide','');
}
hideImageOverlay(it);
/* makes sure the image overlay is the right size if it exists */
resetImageOverlay(it);
var pform=document.getElementById('pageform');
if(pform && pform.elements['plotaxislength'] && pform.elements['plotaxislength'].value){
var clientsize = Math.max(it.width,it.height); 
var targetsize = 20*Math.round((clientsize - 20 - 72 + 9)/20,0);
var plen = pform.elements['plotaxislength'].value;
if(targetsize!=plen){
pform.elements['plotaxislength'].value = targetsize;
updatePageFormQuietly(pform.elements['plotaxislength']);
}
}
}
}
return true;
}
/* if none of the classes in srcclass are in element.className,
appends the first class in srclass
*/
function appendMissingClass(element,srcclass){
var targetclass=element.className;
var slist = srcclass.split(' ');
var match = false;
for (var i = 0 ; i < slist.length; i++){
if(targetclass.indexOf(slist[i]) >=0){
match = true;
}
}
if(!match){
    if(!element.className){
element.className = slist[0];
    }
    else {
element.className = targetclass + ' ' + slist[0];
    }
}
}
function removeClass(element,srcclass){
var targetclass=element.className;
var slist = srcclass.split(' ');
var match = false;
for (var i = 0 ; i < slist.length; i++){
var ind =targetclass.indexOf(slist[i]);
if( ind>=0){
if(ind==0){
element.className=element.className.replace(slist[i],"");
}
else {
element.className=element.className.replace(" "+slist[i],"");
}
}
}
}
function toggleClass(element,toggleName){
var targetclass=element.className;
var slist = toggleName.split(' ');
var match = false;
for (var i = 0 ; i < slist.length; i++){
var ind =targetclass.indexOf(slist[i]);
if( ind>=0){
if(ind==0){
element.className=element.className.replace(slist[i],"");
}
else {
element.className=element.className.replace(" "+slist[i],"");
}
}
else {
    if(element.className){
	element.className= element.className + " " + slist[i];
    }
    else {
	element.className=slist[i];
    }
}
}

}
// changes class of all sublements within an element
// traverses list in reverse order because the list updates as it executes
function changeClassWithin(pelement,fromclass,toclass){
var targetlist=pelement.getElementsByClassName(fromclass);
if(pelement.className.indexOf(fromclass) >= 0 ){
    targetlist[targetlist.length] = pelement;
}
for (var i = targetlist.length-1 ; i >= 0; i--){
var ind=targetlist[i];
ind.className=ind.className.replace(fromclass,toclass);
}
}
function changeClass(pelement,fromclass,toclass){
var targetlist=pelement.parentNode.getElementsByClassName(fromclass);
for (var i = targetlist.length-1 ; i >= 0; i--){
var ind=targetlist[i];
if(ind == pelement){
ind.className=ind.className.replace(fromclass,toclass);
}
}
}

function onClickPageForm(evt){
    evt = (evt) ? evt : ((event) ? event : null );
var it = (evt.currentTarget) ? evt.currentTarget : evt.srcElement;
submitPageForm(it.href,it.className);
return false;
}
/*
submitPageForm -- submits pageform to href, appending inputs corresponding to class.
*/
function submitPageForm(href,classes){
var localhref=localHrefOf(href);
if(localhref.indexOf('?')>0){
    localhref=localhref.substr(0,localhref.indexOf('?'));
}
var myform=document.getElementById('pageform');
if(myform){
var inputs=myform.elements;
        for (var i = 0; i < inputs.length; i++) {
inputs[i].disabled=true;
}
var alldisabled=true;
var clist = classes.split(' ');
for ( var ic = 0; ic < clist.length; ic++ ){
var cclass=clist[ic];
var members = document.getElementsByClassName(cclass);
for ( var j = 0; j < members.length; j++ )
if(members[j].disabled && members[j].value){
members[j].disabled=false;
alldisabled=false;
}
}
if(alldisabled){
    if(localhref.substring(0,5) =='file:'){
if(localhref.charAt(localhref.length-1) == '/'){
    localhref=localhref+'index.html';
}
    }
document.location.href=localhref;
}
else {
/* our rewrite rules do not handle Set-Language for a directory, so we avoid doing it
 */
if(localhref.charAt(localhref.length-1) == '/'){
    localhref=localhref+'index.html';
}
myform.action=localhref;
myform.submit();
}
}
else {
document.location.href=localhref;
}
}
/*
appendPageForm -- appends to href, appending pageform inputs corresponding to class.
*/
function appendPageForm(href,classes){
var localhref=localHrefOf(href);
var myform=document.getElementById('pageform');
if(myform){
var inputs=myform.elements;
        for (var i = 0; i < inputs.length; i++) {
inputs[i].disabled=true;
}
var alldisabled=true;
var clist = classes.split(' ');
for ( var ic = 0; ic < clist.length; ic++ ){
var cclass=clist[ic];
var members = document.getElementsByClassName(cclass);
for ( var j = 0; j < members.length; j++ )
    if(members[j].disabled) {
	if(members[j].type != 'checkbox' && members[j].value){
members[j].disabled=false;
alldisabled=false;
	} 
	else if(members[j].type == 'checkbox' && members[j].checked != members[j].defaultChecked) {
	    var myname=members[j].name;
	    for (var k=members.length;k--;){
		if(members[k].disabled && members[k].name == myname){
		    members[k].disabled=false;
	    }
	    }
alldisabled=false;	    
	    }
}
}
if(alldisabled){
return localhref;
}
else {
var action = localhref;
delim= '?';
        for (var i = 0; i < inputs.length; i++) {
var myinput=inputs[i];
	if(!myinput.disabled){
	    if(myinput.type != 'checkbox' || myinput.checked){
	action = action + delim + myinput.name + '=' + encodeURIComponent(myinput.value);
	delim='&'
	    }
	}
	}
return action;
}
}
else {
return localhref;
}
}
// loadmaproom is run once (at DOMContentLoaded if possible, or onload).
var loadmaproomneeded=true;
$.ready(
function loadmaproom(){
if(loadmaproomneeded){
loadmaproomneeded=false;
setPageForm();
tabsSetup();
insertcontrolBar();
initializeDLimage();
insertchooseSection();
insertRegion();
insertshare();
loadHasJSON();
setupPageFormLinks();
}
}
);
