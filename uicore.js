/*
MBB 2012 -- maproom implementation in javascript
*/
var uicoreConfig = uicoreConfig || {};
if(!uicoreConfig.resolutionQueryServers){
    uicoreConfig.resolutionQueryServers = {};
}
/* to change the GoogleAnalyticsId, redefine this after uicore.js */
/* uicoreConfig.GoogleAnalyticsId='UA-xxxxx-xx'; */
/* to set the help e-mail, redefine this after uicore.js
uicoreConfig.helpemail='help@iri.columbia.edu'; */
uicoreConfig.helpemail='';
/* to add a server for a new resolution, run something like the following */
uicoreConfig.resolutionQueryServers["irids:SOURCES:Ethiopia:Features:Forecast:kiremt_2013:ds"] = "http://www.ethiometmaprooms.gov.et:8082/";
/* to change json used for setting preferred language on multi-language pages, reset this */
uicoreConfig.languageSettingDocument="/uicore/toolinfo/buttoninfo.json";
/* additional default uicoreConfig settings */
uicoreConfig.resolutionQueryServers["default"]= "http://iridl.ldeo.columbia.edu/";
uicoreConfig.resolutionQueryServers["irids:SOURCES:TMA:Features:Forecast:vuli_2013:ds"]= "http://maproom.meteo.go.tz/";

/*
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
/* loads pure javascript */
var puredir = scriptroot.substr(0,scriptroot.length-7) + 'pure/libs/';
jsDependsOn(puredir + 'pure.js');
jsDependsOn(puredir + 'jquery.js');
/* loads jsonld javascript */
jsDependsOn(scriptroot.substr(0,scriptroot.length-7) + 'jsonld/jsonld.js');
var ifmaproomroot = document.location.href.lastIndexOf('/maproom/');
var maproomroot = document.location.href.substr(0,document.location.href.lastIndexOf('/maproom/')+9);

function localHrefOf(ghref){
var lhref;
var ifmap  = ghref.lastIndexOf('/maproom/');
var ifscript  = ghref.lastIndexOf('/uicore/');
if(ifmaproomroot > -1 && ifmap > -1){
var maproomurl = ghref.substr(0,ifmap+9);
lhref = maproomroot + ghref.substr(maproomurl.length);
}
    else if(ifscript > -1){
var scripturl = ghref.substr(0,ifscript+8);
lhref = scriptroot + ghref.substr(scripturl.length);
    }
else {
lhref= ghref;
}
if(lhref.substr(0,1) == '/'){
    lhref = location.protocol + '//' + location.host + lhref;
}
return lhref;
}
/* replacement for getElementsByClassName when missing */
if (typeof document.getElementsByClassName!='function') {
document.getElementsByClassName = function() {
        var elms = this.getElementsByTagName('*');
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
function dohomesel(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
var opt=it.options[it.selectedIndex];
var fullpathname = document.location.href;
var optvalue = opt.value;
    var optpath = optvalue.replace(/\?.*/,'');
    if(optpath == location.pathname){
	var optclass = "share carryLanguage";
    }
    else {
	var optclass = "carryup carryLanguage";
    }
if(optvalue){
/*    _gaq.push(['_trackSocial', 'HomeMenu', opt.innerHTML]); */
    ga('send','social', 'HomeMenu', opt.innerHTML,location.href);
    var url = appendPageForm(optvalue,optclass,false,true);

    document.location.href=url;
}
    }
function dosectionsel(){
it=document.getElementById('mapselect');
if(it.options[it.selectedIndex].parentNode.label){
    it.parentNode.getElementsByTagName('legend')[0].innerHTML=it.options[it.selectedIndex].parentNode.label;}
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
// copy value(s) to page form and get url
var pform=document.getElementById('pageform');
var guess='';
  if(myinput.guessvalue){
  pform.elements[myinput.name].value = myinput.guessvalue;
//  guess = appendPageForm(myimage.src,myimage.className);
    guess = myinput.guessvalue;
	myinput.guessvalue='';
}
  updatePageForm(pform.elements[myinput.name],myinput.value,guess);
//  pform.elements[myinput.name].value = myinput.value;
//  myimage.src = appendPageForm(myimage.src,myimage.className);
//	if(guess){
//        preload(guess);
//	}
 }
function tabclickevent(evt){
    evt = (evt) ? evt : ((event) ? event : null );
    it = (evt.currentTarget) ? evt.currentTarget : evt.srcElement.parentNode;
    if(makeTabActive(it)){
        if(history && history.pushState){
	    var url = it.children[0].hash;
	    if(url){
	    var mylabel = it.children[0].innerText;
	    var mytitle = document.title;
	    if(mylabel){
		mytitle=addTabToTitle(mylabel);
	    }
	    else {
		mylabel = url.substr(1);
	    }
	    history.pushState(url,mytitle,url);
	    document.title=mytitle;
	       ga('send','social', 'Tabs', mylabel, window.location.href);
	    }
	}
    }
    return false;
}
function makeSubTabActive(tab){
    var ifchange=(tab.className != "ui-state-active");
    var mylist=tab.parentNode.getElementsByClassName("ui-state-active");
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
    tab.className="ui-state-active";
    var sid;
    if(tab.children[0].hash){
	sid = tab.children[0].hash.substr(1);
    }
	if(sid){
        document.getElementById(sid).className="ui-tabs-panel";
	}
	else {
	location.href= tab.children[0].href;
	}
        if(document.width < 750){
	location.href= tab.children[0].href;
	}
    return ifchange;
}
function makeTabActive(tab){
    var ifchange=makeSubTabActive(tab);
    makeTabParentActive(tab.parentNode);
    return ifchange;
};
function addTabToTitle(myadd){
    var newtitle = document.title.replace(/:.*$/,"") + ": " + myadd;
    return(newtitle);
}
function makeTabParentActive(tabnode){
    if(tabnode.className=="ui-tabs-panel-hidden"){
	var myid = tabnode.id;
	if(myid){
	    var myhash = '#' + myid;
	    makeTabActiveFromHash(myhash,true);
	}
    }
    else {
	if(tabnode.parentNode){
	    makeTabParentActive(tabnode.parentNode);
	}
    }
}
/* getTabParent -- gets first object or parent that is a tab -- starts with the object */
function getTabParent(tabnode){
    if(tabnode.className=="ui-tabs-panel-hidden" || tabnode.className=="ui-tabs-panel"){
	return(tabnode);
    }
    else {
	if(tabnode.parentNode){
	    return(getTabParent(tabnode.parentNode));
	}
    }
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
	var tablist;
	if(tabset.getElementsByClassName("ui-tabs-nav")[0]){
	tablist=tabset.getElementsByClassName("ui-tabs-nav")[0].getElementsByTagName("li");
	}
	else {
	    tablist=[];
	}
	var activetab=0;
	for (var j=0; j<tablist.length; j++){
	    if(tablist[j].className=='ui-state-active')activetab=j
	}
	for (var j=0; j<tablist.length; j++){
	    var atab=tablist[j];
	    if(!atab.children[0].onclick) {
		atab.onmousedown=tabclickevent;
		atab.onfocus=tabclickevent;
		atab.onclick=tabclickevent;
		if(j != activetab){
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
    if(window.location.hash){
	makeTabActiveFromHash(window.location.hash);
    }
}
function makeTabActiveFromHash (myhash,dontClearChildren){
    var mytab="";
    if(myhash){
	var myid = myhash.substr(1);
	var myobject = document.getElementById(myid);
	if(!dontClearChildren){
	    if(myobject){
		clearTabActive(myobject.getElementsByClassName('ui-tabs-nav'));
	    }
	}
	if(myobject){
	    var mypanel=getTabParent(myobject);
	    if(mypanel){
		var myphash = '#' + mypanel.id;
		mytabsets = document.getElementsByClassName('ui-tabs-nav');
		for(var i=mytabsets.length;i--;){
		    var mytabset=mytabsets[i];
		    var mytabs=mytabset.getElementsByTagName('li');
		    for(var j=mytabs.length;j--;){
			if(mytabs[j].children[0].hash == myphash){
			    makeTabActive(mytabs[j]);
			    mytab = mytabs[j];
			}
		    }
		}
	    }
	}
    }
    return(mytab);
}
function clearTabActive (mytabsets){
    if(!mytabsets){
	mytabsets = document.getElementsByClassName('ui-tabs-nav');
    }
	for(var i=mytabsets.length;i--;){
	    var mytabset=mytabsets[i];
	    var mytabs=mytabset.getElementsByTagName('li');
	    if(mytabs.length){
		makeSubTabActive(mytabs[0]);
	    }
	}
}
function insertcontactus(){
var s = document.getElementById('contactus');
if(s){
var sl = s.getElementsByTagName('legend');
if(!sl.length){
    appendMissingClass(s,'langgroup');
var ls=document.createElement('legend');
    ls.setAttribute('lang','es');
ls.appendChild(document.createTextNode('Contáctenos'));
s.insertBefore(ls,s.firstChild);
ls=document.createElement('legend');
    ls.setAttribute('lang','fr');
ls.appendChild(document.createTextNode('Contactez Nous'));
s.insertBefore(ls,s.firstChild);
ls=document.createElement('legend');
    ls.setAttribute('lang','en');
ls.appendChild(document.createTextNode('Contact Us'));
s.insertBefore(ls,s.firstChild);
    updateLangGroups(s);
}
sl = document.getElementById('googleplus');
if(!sl){
    var tumblr_button;
    if(uicoreConfig.helpemail){
/* code to add Mail-help buttons */
    gb= document.createElement('div');
    gb.className='sharebutton';
    gb.id='helpmailbutton';
    tumblr_button = document.createElement("a");
    tumblr_button.onclick=doHelpMail;
    tumblr_button.setAttribute("title", uicoreConfig.helpemail);
    gb.appendChild(tumblr_button);
    s.appendChild(gb);
    }
}
}
}
function insertshare(){
    insertcontactus();
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
    var tumblr_button;
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
gba.setAttribute("title","Save to Evernote with link back");
gba.onclick=doEvernoteClip;
gb.appendChild(gba);
s.appendChild(gb);
/* Pinterest */
gb= document.createElement('div');
gb.className='sharebutton pinterest';
gb.onclick=doPinterestClip;
/* s.appendChild(gb); */
/* tumblr */
gb= document.createElement('div');
gb.className='sharebutton';
gb.id='tumblr';
    tumblr_button = document.createElement("a");
	tumblr_button.onclick=doTumblrClip;
    tumblr_button.setAttribute("title", "Share on Tumblr with link back");
    gb.appendChild(tumblr_button);
s.appendChild(gb);
/* CSP Forum */
gb= document.createElement('div');
gb.className='sharebutton';
gb.id='csp';
    tumblr_button = document.createElement("a");
	tumblr_button.onclick=doIRIFClipElement;
    tumblr_button.setAttribute("title", "Share with Climate Services Partnership Forums");
    gb.appendChild(tumblr_button);
s.appendChild(gb);
/* code to add Mail buttons */
gb= document.createElement('div');
gb.className='sharebutton';
gb.id='mailbutton';
    tumblr_button = document.createElement("a");
	tumblr_button.onclick=doMail;
    tumblr_button.setAttribute("title", "Share with e-mail");
    gb.appendChild(tumblr_button);
s.appendChild(gb);
/* facebook */
gb=document.createElement('div');
// FB with url following share variables 
// gb.className="fb-like share";
//    var url = appendPageForm(location.href,'share');
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
/* s.insertBefore(gb,document.getElementById('custom-tweet-button')); */
    s.appendChild(gb);
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
var gb= document.createElement('div');
gb.className='sharebutton';
gb.id='googleplusbutton';
    var annote = "inline";
    if(window.innerWidth < 480)annote="bubble";
gb.innerHTML='<div class="g-plusone" data-annotation="' + annote + '" ></div>';
s.appendChild(gb);
}
// adds scripts to share to activate buttons
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
s.appendChild(po);
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = "http://static.evernote.com/noteit.js";
s.appendChild(ga);
/* var pi = document.createElement('script'); pi.type = 'text/javascript'; pi.async = true;
    pi.src = "//assets.pinterest.com/js/pinit.js";
s.appendChild(pi);
*/
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
/*              _gaq.push(['_trackSocial', 'facebook', 'like', targetUrl]);*/
            ga('send','social', 'facebook','like', targetUrl);
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
 var url = appendPageForm(location.href,'share');
    var tpar = getElementsByAttribute(document,'*','property','term:title');
    var dpar = getElementsByAttribute(document,'*','property','term:description');
    var title="";
	if(tpar.length>0){
	title=tpar[0].innerHTML;
	}
	if(!title)title=document.title;
var twitter_url = "https://twitter.com/share?via=iridl&hashtags=dataviz&url=" + encodeURIComponent(url) + "&text=" + encodeURIComponent(title);
/* _gaq.push(['_trackSocial', 'twitter', 'tweet', url]);*/
    ga('send','social', 'twitter','tweet', url);
window.open(twitter_url);
}
function doGMail(){
 var url = appendPageForm(location.href,'share');
    var tpar = getElementsByAttribute(document,'*','property','term:title');
    var title="";
	if(tpar.length>0){
	title=tpar[0].innerHTML;
	}
	if(!title)title=document.title;
var m='http://mail.google.com/mail/?ui=1&view=cm&fs=1&tf=1&to=&su='+encodeURIComponent(title)+'&body='+encodeURIComponent(url);
window.open(m);
}
function doMail(){
 var url = appendPageForm(location.href,'share');
    var tpar = getElementsByAttribute(document,'*','property','term:title');
    var title="";
	if(tpar.length>0){
	title=tpar[0].innerHTML;
	}
	if(!title)title=document.title;
var m='mailto:?subject='+encodeURIComponent(title)+'&body='+encodeURIComponent(url);
/* _gaq.push(['_trackSocial', 'mail', 'mail', url]);*/
    ga('send','social', 'mail','mail', url);
window.open(m);
}
function doHelpMail(){
 var url = appendPageForm(location.href,'share');
    var tpar = getElementsByAttribute(document,'*','property','term:title');
    var title="";
	if(tpar.length>0){
	title=tpar[0].innerHTML;
	}
	if(!title)title=document.title;
var m='mailto:' + uicoreConfig.helpemail +'?subject='+encodeURIComponent(title)+'&body='+encodeURIComponent(url);
/* _gaq.push(['_trackSocial', 'mail', 'mail', url]);*/
    ga('send','social', 'mail','help', url);
window.open(m);
}
function doTumblrClip(){
    var content = document.getElementById("content");
    var tpar = getElementsByAttribute(document,'h2','property','term:title');
    var dpar = getElementsByAttribute(document,'p','property','term:description');
    var url = appendPageForm(location.href,'share');
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
    else {
	var figimg = getFigureImage(document);
	if(figimg)tumblr_photo_source = figimg.src;
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
/* _gaq.push(['_trackSocial', 'tumblr', ttype , url]);*/
    ga('send','social', 'tumblr',ttype, url);
window.open(tumblr_url);
}
function doTumblrClipElement(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
   var figimg = getFigureImage(it.clipthis);

    var content = document.getElementById("content");
    var tpar = getElementsByAttribute(document,'h2','property','term:title');
    var dpar = getElementsByAttribute(document,'p','property','term:description');
    var url = appendPageForm(location.href,'share');
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
    if(figimg && figimg.src){
	tumblr_photo_source = figimg.src
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
/* _gaq.push(['_trackSocial', 'tumblr', ttype , url]);*/
    ga('send','social', 'tumblr',ttype, url);
window.open(tumblr_url);
}
function homelinkclick(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
   var myurl;
var homelinks=getElementsByAttribute(document,'link','rel','home');
if(homelinks.length == 1){
myurl=homelinks[0].href;
document.location.href=myurl;
}
else if(homelinks.length == 0){
myurl="http://iri.columbia.edu/";
document.location.href=myurl;
}
}
function doEvernoteClip(){
var clipargs = {};
clipargs.contentId = 'content';
    clipargs.url = appendPageForm(location,'share');
clipargs.filter= function (arg){
if(!(arg.className == 'imagecontrols' || arg.className.indexOf('dlcontrol')>=0 || arg.style.visibility=='hidden')){
return arg;
}
};
/* _gaq.push(['_trackSocial', 'evernote', 'clip', clipargs.url]);*/
    ga('send','social', 'evernote','clip', clipargs.url);
Evernote.doClip(clipargs);
}
function doPinterestClip(){
    var tpar = getElementsByAttribute(document,'h2','property','term:title');
    var dpar = getElementsByAttribute(document,'p','property','term:description');
    var url = appendPageForm(location.href,'share');
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
/*      _gaq.push(['_trackSocial', 'Pinterest', 'clipPage']); */
    ga('send','social', 'Pinterest','clipPage',location.href); 
    var pinterest_link_url = url;
    var pinterest_link_description = title + ":  " +description;
pinterest_url = "//pinterest.com/pin/create/button/?url=" + encodeURIComponent(pinterest_link_url) + "&description=" + encodeURIComponent(pinterest_link_description);
window.open(pinterest_url)
}
function doEvernoteClipElement(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
var clipargs = {};
clipargs.content = it.clipthis;
clipargs.url = appendPageForm(location.href,'share');
clipargs.filter= function (arg){
    if(!(arg.className == 'imagecontrols' || arg.className.indexOf('dlcontrol')>=0|| arg.style.visibility=='hidden')){
return arg;
}
};
/* _gaq.push(['_trackSocial', 'evernote', 'clipelement']);*/
    ga('send','social', 'evernote','clipelement',location.href);
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
	var linkurl = appendPageForm(location.href,'share');
	var pform=document.getElementById('pageform');
	pform.elements['linkurl'].value=linkurl;
	submitPageForm(kmlurl,kmlclass+' linkurl','POST'); 
/*	_gaq.push(['_trackSocial', 'googleearth', 'asKML']);*/
	ga('send','social', 'googleearth','asKML',location.href);
    }
}
}
function doWMSClick(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
var sfigs=getElementsByAttribute(it.clipthis,'*','rel','iridl:hasFigure');
if(sfigs.length){
    var kmlurl=sfigs[0].info['iridl:hasWMS'];
    var kmlclass = sfigs[0].figureimage.className.split(' ')[0];
    if(kmlurl){
	var myurl = appendPageForm(kmlurl,kmlclass);
	alert(myurl);
	/*	location.href=myurl; */
/*	_gaq.push(['_trackSocial', 'WMS', 'asWMS']);*/
	ga('send','social', 'WMS','asWMS',location.href);
    }
}
}
function doGeoTiffClick(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
var sfigs=getElementsByAttribute(it.clipthis,'*','rel','iridl:hasFigure');
if(sfigs.length){
    var kmlurl=sfigs[0].info['iridl:hasGeoTiff'];
    var kmlclass = sfigs[0].figureimage.className.split(' ')[0];
    if(kmlurl){
	var myurl = appendPageForm(kmlurl,kmlclass);
	location.href=myurl;
/*	_gaq.push(['_trackSocial', 'DataDownload', 'asGeoTiff']);*/
	ga('send','social', 'DataDownload','asGeoTiff',location.href);
    }
}
}
function doGeoTiffPCClick(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
var sfigs=getElementsByAttribute(it.clipthis,'*','rel','iridl:hasFigure');
if(sfigs.length){
    var kmlurl=sfigs[0].info['iridl:hasGeoTiffPaletteColor'];
    var kmlclass = sfigs[0].figureimage.className.split(' ')[0];
    if(kmlurl){
	var myurl = appendPageForm(kmlurl,kmlclass);
	location.href=myurl;
/*	_gaq.push(['_trackSocial', 'DataDownload', 'asGeoTiffPC']);*/
	ga('send','social', 'DataDownload','asGeoTiffPC',location.href);
    }
}
}
function getFigureImage(clipthis){
    var figimg;
    if(!clipthis){
	clipthis = document.getElementById("content");
    }
    if(!clipthis){
	clipthis=document;
    }
    var sfigimgs=getElementsByAttribute(clipthis,'*','rel','iridl:hasFigureImage');
    var sfigs=getElementsByAttribute(clipthis,'*','rel','iridl:hasFigure');
    if(sfigimgs.length){
	figimg=sfigimgs[0];
	for(var i=sfigimgs.length;i--;){
	   if(sfigimgs[i].className.indexOf("selectedImage") >= 0){
	       figimg=sfigimgs[i];
	   }
       }
    }
    else if(sfigs.length){
	figimg=sfigs[0].figureimage;
    }
    else {
	var sfigimgs = clipthis.getElementsByTagName('img');
	var maxsize = 0;
	var imax = -1;
	for(var i=sfigimgs.length;i--;){
	    var isize = sfigimgs[i].width * sfigimgs[i].height;
	   if( isize >= imax){
	       imax = isize;
	       imax = i;
	   }
       }
	if(imax >= 0){
	    figimg = sfigimgs[imax];
	}
    }

   return(figimg);
}
function getOnlyFigureImage(clipthis){
    var figimg;
    if(!clipthis){
	clipthis = document.getElementById("content");
    }
    if(!clipthis){
	clipthis=document;
    }
    var sfigimgs=getElementsByAttribute(clipthis,'*','rel','iridl:hasFigureImage');
    var sfigs=getElementsByAttribute(clipthis,'*','rel','iridl:hasFigure');
    if(sfigimgs.length){
	figimg=sfigimgs[0];
	for(var i=sfigimgs.length;i--;){
	   if(sfigimgs[i].className.indexOf("selectedImage") >= 0){
	       figimg=sfigimgs[i];
	   }
       }
    }
    else if(sfigs.length){
	figimg=sfigs[0].figureimage;
    }
   return(figimg);
}
function getPDFImage(clipthis){
  var sfigimgs=getElementsByAttribute(clipthis,'*','rel','iridl:hasPDFImage');
   var figimg;
   if(sfigimgs.length){
       figimg=sfigimgs[0];
       for(var i=sfigimgs.length;i--;){
	   if(sfigimgs[i].className.indexOf("selectedImage") >= 0){
	       figimg=sfigimgs[i];
	   }
       }
   }
   return(figimg);
}
function getPNGImage(clipthis){
  var sfigimgs=getElementsByAttribute(clipthis,'*','rel','iridl:hasPNGImage');
   var figimg;
   if(sfigimgs.length){
       figimg=sfigimgs[0];
       for(var i=sfigimgs.length;i--;){
	   if(sfigimgs[i].className.indexOf("selectedImage") >= 0){
	       figimg=sfigimgs[i];
	   }
       }
   }
   return(figimg);
}
function getTable(clipthis){
  var sfigimgs=getElementsByAttribute(clipthis,'*','rel','iridl:hasTable');
   var figimg;
   if(sfigimgs.length){
       figimg=sfigimgs[0];
       for(var i=sfigimgs.length;i--;){
	   if(sfigimgs[i].parentNode.getElementsByClassName("selectedImage").length > 0){
	       figimg=sfigimgs[i];
	   }
       }
   }
   return(figimg);
}
function doTSVClick(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
   var figimg = getTable(it.clipthis);
     
   if(figimg && figimg.href){
       var pdfurl=figimg.href;
       var pdfclass=figimg.className;
       pdfurl = pdfurl.replace(/[?].*/,'') + '.tsv';
	submitPageForm(pdfurl,pdfclass,'GET'); 
/*       _gaq.push(['_trackSocial', 'DataDownload', 'asTSV']);*/
       ga('send','social', 'DataDownload','asTSV',location.href);
   }
}
function doHTMLClick(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
   var figimg = getTable(it.clipthis);
     
   if(figimg && figimg.href){
       var pdfurl=figimg.href;
       var pdfclass=figimg.className;
       pdfurl = pdfurl.replace(/[?].*/,'') + '.html';
	submitPageForm(pdfurl,pdfclass,'GET'); 
/*       _gaq.push(['_trackSocial', 'DataDownload', 'asHTML']);*/
       ga('send','social', 'DataDownload','asHTML',location.href);
   }
}
function doPDFClick(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
   var figimg = getFigureImage(it.clipthis);
     
   if(figimg && figimg.src){
       var pdfurl=figimg.src;
       var pdfclass=figimg.className;
       pdfurl = pdfurl.replace(/\.(gif|png|jpg)/,'.pdf');
       var linkurl = appendPageForm(location.href,'share');
       var pform=document.getElementById('pageform');
       pform.elements['linkurl'].value=linkurl;
       submitPageForm(pdfurl,pdfclass+' linkurl','POST'); 
/*       _gaq.push(['_trackSocial', 'ImageDownload', 'asPDF']);*/
       ga('send','social', 'ImageDownload','asPDF',location.href);
   }
}
function doPDFImageClick(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
   var figimg = getPDFImage(it.clipthis);
   if(figimg && figimg.href){
       var pdfurl=figimg.href;
       var pdfclass=figimg.className;
       var pform=document.getElementById('pageform');
       submitPageForm(pdfurl,pdfclass,'GET'); 
       ga('send','social', 'ImageDownload','asPDF',location.href);
   }
}
function doPNGImageClick(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
   var figimg = getPNGImage(it.clipthis);
   if(figimg && figimg.href){
       var pdfurl=figimg.href;
       var pdfclass=figimg.className;
       var pform=document.getElementById('pageform');
       submitPageForm(pdfurl,pdfclass,'GET'); 
       ga('send','social', 'ImageDownload','asPNG',location.href);
   }
}
function doPinterestClipElement(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
   var figimg = getFigureImage(it.clipthis);
     
   if(figimg && figimg.src){
       var pinurl=figimg.src;
       var pinclass=figimg.className;
       var linkurl = appendPageForm(location.href,'share');
       pinrul = pinurl.replace(/[/]expert[/]/,'/');
       pinurl = pinurl.substr(0,8) + pinurl.substring(8).replace(/[/][/]([^/+]+)/g,function(match){
		   return '(' + match.substring(2,match.length) + ')cvn';
	       });
    var tpar = getElementsByAttribute(document,'h2','property','term:title');
    var dpar = getElementsByAttribute(document,'p','property','term:description')

    var title="";
	if(tpar.length>0){
	title=tpar[0].innerHTML;
	}
	if(!title)title=document.title;
    var description="";
	if(dpar.length>0){
	description=dpar[0].innerHTML;
	}
    var pinterest_link_description = title + ":  " +description;

/*           _gaq.push(['_trackSocial', 'Pinterest', 'clipelement']);*/
ga('send','social', 'Pinterest','clipelement',location.href);
       pinterest_url = "//pinterest.com/pin/create/button/?url=" + encodeURIComponent(linkurl) + "&media=" + encodeURIComponent(pinurl) + "&description=" + encodeURIComponent(pinterest_link_description);
           window.open(pinterest_url); 
   }
}
function doIRIFClipElement(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
   var figimg = getFigureImage(it.clipthis);
     
       var pinurl;
       var pinclass;
   if(figimg && figimg.src){
       pinurl=figimg.src;
       pinclass=figimg.className;
   }
       var linkurl = appendPageForm(location.href,'share');
    var tpar = getElementsByAttribute(document,'h2','property','term:title');
    var dpar = getElementsByAttribute(document,'p','property','term:description')

    var title="";
	if(tpar.length>0){
	title=tpar[0].innerHTML;
	}
	if(!title)title=document.title;
    var description="";
	if(dpar.length>0){
	description=dpar[0].innerHTML;
	}
    var pinterest_link_description = title + ":  " +description;

/*           _gaq.push(['_trackSocial', 'Pinterest', 'clipelement']);*/
ga('send','social', 'IRIForum','clipelement',location.href);
    pinterest_url = "http://forums.climate-services.org/RemotePosts/post_dl.php?link=" + encodeURIComponent(linkurl);
    if(pinurl){
	pinterest_url = pinterest_url + "&image=" + encodeURIComponent(pinurl);
    }
	pinterest_url = pinterest_url + "&title=" + encodeURIComponent(pinterest_link_description) + "&start=true";
           window.open(pinterest_url);
   
}
function doFigureImageClick(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
   var figimg = it;

   toggleClass(figimg,'selectedImage');
   var mydlimage = figimg.mydlimage;
   var sfigs = getElementsByAttribute(mydlimage,'*','rel','iridl:hasFigureImage');
   if(sfigs.length){
       for(var i= sfigs.length;i--;){
	   if(sfigs[i] != figimg){
	       removeClass(sfigs[i],'selectedImage');
	   }
       }
   }
}
function doGifClick(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
   var figimg = getFigureImage(it.clipthis);
   if(figimg && figimg.src){
       var pdfurl=figimg.src;
       var pdfclass=figimg.className;
	submitPageForm(pdfurl,pdfclass,'GET'); 
/*	_gaq.push(['_trackSocial', 'ImageDownload', 'asGIF']);*/
       ga('send','social', 'ImageDownload', 'asGIF',location.href);
    }
}
function doJpgClick(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
   var figimg = getFigureImage(it.clipthis);
   if(figimg && figimg.src){
    var pdfurl = figimg.src.replace(/.gif/,'.jpg');
    var pdfclass = figimg.className;
	submitPageForm(pdfurl,pdfclass,'GET'); 
/*	_gaq.push(['_trackSocial', 'ImageDownload', 'asJPG']);*/
       ga('send','social', 'ImageDownload', 'asJPG',location.href);
   }
}
function doarcgisClick(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
var sfigs=getElementsByAttribute(it.clipthis,'*','rel','iridl:hasFigure');
if(sfigs.length){
    var kmlurl=sfigs[0].info['iridl:hasWMS'];
    var kmlclass = sfigs[0].figureimage.className.split(' ')[0];
    if(kmlurl){
	var myurl = appendPageForm(kmlurl,kmlclass);
	var msga=it.parentNode.parentNode.getElementsByClassName('messagearea');
	if(msga.length>0){
	    msga[0].innerHTML="<p>To open directly in ArcGIS using WMS, use menus Add Data -> Add GISserver -> WMSserver, and enter this URL</p><textarea style='width:100%;' rows=20>" + myurl + '</textarea><p>Alternatively, choose a GeoTiff option under the download button <span class="dlimagecontrol download" title="Download"></span> to download an image ArcGIS can read';
	    toggleClass(msga[0],'show');
	}
	else {
	alert("To open in ArcGIS, use menus Add Data -> Add GISserver -> WMSserver, and enter this URL\n\n" + myurl);
	}
	/*	location.href=myurl; */
/*	_gaq.push(['_trackSocial', 'arcgis', 'asWMS']);*/
	ga('send','social', 'arcgis', 'asWMS',location.href);
    }
}
}
function docutandpasteClick(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
var sfigs=getElementsByAttribute(it.clipthis,'*','rel','iridl:hasFigure');
if(sfigs.length){
	var myurl = sfigs[0].href;
        var iconurl=sfigs[0].info['iridl:icon'];
	var msga=it.parentNode.parentNode.getElementsByClassName('messagearea');
    
	if(msga.length>0){
	    var mymsg="<p>To add this widget to a web page, cut-and-paste this code</p><textarea style='width:100%;' rows=20><script type=\"text/javascript\" src=\"" + scriptroot + 'insertui.js\"></script>\n';
	    if(iconurl){
		mymsg = mymsg + '<link rel="term:icon" href="' + iconurl + '" />\n';
	    }
	    mymsg=mymsg + "<fieldset class=\"dlimage\">\n<a rel=\"iridl:hasFigure\" href=\"" + myurl + '\">visit site</a>\n';
	    var figs = sfigs[0].parentNode.getElementsByTagName('img');
	    for (var i=0 ; i < figs.length ; i++){
		if(figs[i].parentNode == sfigs[0].parentNode){
		    var figclass = figs[i].className.split(' ')[0];
		    var myfigurl = appendPageForm(figs[i].src,figclass + '&share')
		    mymsg = mymsg + '<img class=\"' + figclass + '\" src=\"' + myfigurl + '\" />\n';
		}
	    }
	    mymsg = mymsg + '</fieldset></textarea>';
	    mymsg = mymsg + '<p>The script line insures that the needed css and javascript files are included and should be omitted if they are already there.  The term:icon link is purely informative and is used as metadata in building a collection of map room pages.  The fieldset element is the actual widget.';
	    msga[0].innerHTML=mymsg;
	    toggleClass(msga[0],'show'); 
	}
	/*	location.href=myurl; */
/*	_gaq.push(['_trackSocial', 'arcgis', 'asWMS']);*/
	ga('send','social', 'ImageDownload', 'asWidget',location.href);
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
function getLanguageFrom(href){
var xmlhttp=getXMLhttp();
xmlhttp.onreadystatechange=function(evt) {
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
    if(it.readyState == 4){
	if(it.status == 200){
	    var jsontxt = it.responseText;
	    var info=JSON.parse(jsontxt);
 	    var plang = info['uicore:lang'];
	if(plang){
	    var myform=document.getElementById('pageform');
	    if(myform){
		var lang=myform.elements['lang'];
		var slang=myform.elements['Set-Language'];
		if(lang.value != plang && ( !slang || (slang && !slang.value))){
		    var s=document.getElementById('chooseLanguage');
		    var sel=s.getElementsByTagName('select')[0];
		    sel.value = plang;
		    if(sel.selectedIndex<0){
			sel.value=lang.value;
		    }
		    lang.value=sel.options[sel.selectedIndex].value;
		}
	    }
	}
    }
    }
};
xmlhttp.myevtfn=xmlhttp.onreadystatechange;
    xmlhttp.open("GET",localHrefOf(href),true);
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
var titleobj=getElementsByAttribute(document,'*','property','term:title')[0];
if (s && sl  && titleobj){
var sels=s.getElementsByTagName('select');
if(sels.length < 1){
var sel=document.createElement('span');
sel.className='selectvalue';
sel.onclick=selectvalueclick;
sel.onclickFn=selectvalueclick;
sel.innerHTML=titleobj.innerHTML;
    sel.setAttribute('value',titleobj.innerHTML);
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
function updateHasSectionList(selectlink){
var s=document.getElementById('chooseSection');
var sl=document.getElementById('toSectionList');
var titleobj=getElementsByAttribute(document,'*','property','term:title')[0];
if (s && sl  && titleobj){
var sels=s.getElementsByTagName('select');
if(sels.length > 0){
    var sel=sels[0];
var slhref=selectlink.href;
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
    var opts = sel.options;
    for (i=opts.length; i>0  ; i--){
	sel.remove(opts[i]);
    }
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
var altpathname = fullpathname + 'index.html';
if (sel.hrefroot + anchref == fullpathname || sel.hrefroot + anchref == altpathname){
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
    sel.setAttribute('value','Global');
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
it.previousSibling.setAttribute('value',it.options[it.selectedIndex].value);
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
if(it.options){
    changed = pform.elements[it.name];
    if(changed.length){
	    /* multivalued but not checkbox -- copy first
	     unless data-nameindex is set */
	var ind = 0;
	var myind = it.getAttribute('data-nameindex');
	if(myind){ind = myind};
	changed[ind].value=it.options[it.selectedIndex].value;
    }
    else {
	changed.value=it.options[it.selectedIndex].value;
    }
}
/* no options, not a select */
else if(elbyname.length) {
	/* multivalued copy -- hopefully checkbox */
	if(elbyname[0].type == 'checkbox'){
	    /* multivalued copy -- checkbox */
	    for(var j = elbyname.length; j-- ;){
		if(elbyname[j].value == it.value){
		    elbyname[j].checked = it.checked;
		    changed = elbyname[j];
		}
	    }
	}
	else {
	    /* multivalued but not pageform not a checkbox 
	     if it is a checkbox, looks for match or unset*/
	    if(it.type == 'checkbox'){
/* sets first unset element */
		if(it.checked){
		    for(var j = 0 ; j< elbyname.length; j++){
			if(elbyname[j].value == ''){
			    elbyname[j].value = it.value;
			    changed = elbyname[j];
			    break;
			}
		    }
		}
		else {
/* unchecked checkbox -- unsets matching element */
		    for(var j = 0 ; j< elbyname.length; j++){
			if(elbyname[j].value == it.value){
			    for(var k=j ; k< elbyname.length-1 ; k++){
				elbyname[k].value=elbyname[k+1].value;
			    }
			    elbyname[elbyname.length-1].value = '';
			    changed = elbyname[j];
			    break;
			}
		    }
		}
	    }
	    else {
       /* punts by setting first one unless data-nameindex is set */
		var ind=0;
	var myind = it.getAttribute('data-nameindex');
	if(myind){ind = myind};
	    changed = pform.elements[it.name][ind];
	    changed.value=it.value;
	    }
	}
} 
else {
    changed = pform.elements[it.name];
changed.value=it.value;
}
updatePageForm(changed);
}
}
    if (it.className && it.className.indexOf('scrollToTop')){
	scrollTo(0,0);
    }

}
function loadHasSparqlEndpoint(){
var sfigs=getElementsByAttribute(document,'*','rel','iridl:hasSparqlEndpoint');
for (var i=0 ; i<sfigs.length ; i++){
    if(!sfigs[i].parentNode.parsedJSON){updateHasSparqlEndpoint(sfigs[i])};
}
}
/* 
The parent of the link object we call the Context.
when file is returned, if the url retrieved is still the url that the
link object points to, stores parsedJSON in the Context,
and calls runPureOnContext.

Here we call all the queries associated with a particular SparqlEndpoint
 */
function updateHasSparqlEndpoint(myLink){
    var queries=getElementsByAttribute(myLink.parentNode,'*','property','iridl:hasSerqlQuery');
    for (var i=0 ; i<queries.length ; i++){
	updateHasRqlQuery(myLink,queries[i],'serql');
    }
    var queries=getElementsByAttribute(myLink.parentNode,'*','property','iridl:hasSparqlQuery');
    for (var i=0 ; i<queries.length ; i++){
	updateHasRqlQuery(myLink,queries[i],'sparql');
    }
}
/* builds url from link and Serql query 
querylang is serql or sparql for sesame */
function sparqlEndpointUrl(endpoint,query,querylang,varclasses,varmap){
    var appendurl = appendPageForm("",varclasses,true);
    var myquery = query;
    var myform=document.getElementById('pageform');
/* finds multivalued variables, if any */
    var inlist = myform.getElementsByClassName(varclasses.replace(/loading/,''));
    var multi = {};
    for (var i = 0 ; i < inlist.length ; i++){
	var myin = inlist[i];
	if(myin.tagName == 'INPUT' && myform[myin.name].length){
	    if(!multi[myin.name]){multi[myin.name]=[];}
	    if(myin.value){multi[myin.name].push(myin.value)}
	}
    }
    for (var key in multi){
	var mylist = multi[key];
	var replacewith = mylist.join(',');
	var myregexp;
	var newquery
	if(querylang == 'serql'){
	    if(replacewith){
		myregexp = new RegExp('([\{\,]) *' + key + ' *([\}\,])','g');
		newquery = myquery.replace(myregexp,"$1" + replacewith + "$2");
	    }
	    else {
		myregexp = new RegExp('((\{)|(\,)) *' + key + ' *((\})|(\,))','g');
		newquery = myquery.replace(myregexp,"$2" + replacewith + "$5");
	    }
	}
	else {
/* sparql -- simple comma-seperated list of values to replace ?key */
	    myregexp = new RegExp('[?]' + key + '([ ,.;])','g');
	    newquery = myquery.replace(myregexp,replacewith+ "$1");
	}
	myquery=newquery;
    }
    
    var localurl = endpoint + '?query=' + encodeURIComponent(myquery) + '&queryLn=' + querylang;

    if(appendurl){
	var vars = appendurl.substring(1).split("&");
	var pair;
	for (var i = 0 ; i < vars.length ; i++){
            pair = vars[i].split("=");
	    var newvalue;
	    var ifid=false;
	    var mys = false;
	    if(myform[pair[0]].length) {
/* skips multi as currently no way to bind */
	    }
	    else {
/* single valued -- use variable binding */
	    if(myform.jsonldContext && myform.jsonldContext['@context']){
		mys = myform.jsonldContext['@context'][pair[0]];
		if(mys){
		    ifid=(mys['@type'] == '@id');
		}
	    }
	    if(ifid){
		newvalue =  "<" + expandNS(unescape(pair[1]),myform.nsContext['@context']) + '>';
	    }
	    else {
		newvalue = '"' + unescape(pair[1]) + '"';
	    }
		var varname = pair[0];
		if(varmap && varmap[varname]){
		    varname=varmap[varname];
		}
	    localurl = localurl + "&" + encodeURIComponent("$" + varname ) + "=" + encodeURIComponent(newvalue);
	    }
	}
    }
    return localurl;
}
var escaped_one_to_xml_special_map = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>'
};

function decodeXML(string) {
    return string.replace(/(&lt;|&gt;|&amp;)/g,
        function(str, item) {
            return escaped_one_to_xml_special_map[item];
    });
}
/* builds url from link and query and retrieves if necessary */
function updateHasRqlQuery(myLink,myQuery,querylang){
    var xmlhttp= getXMLhttp();
    var varmap = myQuery.getAttribute('data-varmap');
    if(varmap){
	varmap = JSON.parse(varmap);
    }
    if(!myQuery.cleantxt){
	myQuery.cleantxt = decodeXML(myQuery.text);
    }
    var localurl = sparqlEndpointUrl(myLink.href,myQuery.cleantxt, querylang , myQuery.className,varmap);
    var restrictif = myQuery.getAttribute('data-if');
    var restrictnotif = myQuery.getAttribute('data-notif');
    var ifneeded = (myQuery.localurl != localurl);
    if(restrictif){
	if($(restrictif).length == 0){
	ifneeded=false;
	    myQuery.localurl='';
    }
    }
    if(restrictnotif){
	if($(restrictnotif).length > 0){
	ifneeded=false;
	    myQuery.localurl='';
    }
    }
    if(ifneeded){
	relStartLoading(myQuery);
	clearFailed(myQuery);
	myQuery.localurl = localurl;
	var dumpelement=getElementsByAttribute(myLink.parentNode,'*','property','iridl:QueryAsText');
	if(dumpelement.length > 0 ){
	    if(myLink.parentNode.loading == 1){
		dumpelement[0].innerHTML='';
	    }
	    var qid = (myQuery.id) ? myQuery.id : myQuery.getAttribute('data-id');
	    if(qid){
		dumpelement[0].innerHTML+='<p>' + qid + '</p>';
	    }
	    dumpelement[0].innerHTML+= '<pre>' + myQuery.text+'</pre>';
	    var appendurl = appendPageForm("",myQuery.className,true);
	    if(appendurl){
		dumpelement[0].innerHTML=dumpelement[0].innerHTML + ' with variable bindings ' +unescape(appendurl.substring(1).replace(/&/g,' '));
	    }
	}
	dumpelement=getElementsByAttribute(myLink.parentNode,'*','property','iridl:JsonAsText');
	if(dumpelement.length > 0 ){dumpelement[0].innerHTML=''}
	xmlhttp.infourl = localurl;
	xmlhttp.myContext = myLink.parentNode;
	xmlhttp.myLink=myLink;
	xmlhttp.myQuery=myQuery;
	changeClassWithin(xmlhttp.myContext,'valid','invalid');
	xmlhttp.onreadystatechange = function(evt) {
	    var evt = (evt) ? evt : ((event) ? event : null );
	    var it = (evt.currentTarget) ? evt.currentTarget : this;
	    if(it.readyState == 4){
		if(it.status == 200){
		    var jsontxt = it.responseText;
		    var parsedJSON = JSON.parse(jsontxt);
		    if(it.myQuery.localurl == it.infourl){
			var qid = (myQuery.id) ? myQuery.id : myQuery.getAttribute('data-id');
			if(qid){
			    if(!it.myContext.parsedJSON){
				it.myContext.parsedJSON = {};
			    }
			    it.myContext.parsedJSON[qid]=parsedJSON;
			}
			else {
			    it.myContext.parsedJSON=parsedJSON;
			}
			var dumpelement=getElementsByAttribute(it.myContext,'*','property','iridl:JsonAsText');
			if(it.myQuery.nextElementSibling && it.myQuery.nextElementSibling.getAttribute('property') == 'iridl:hasJsonldFrame'){
			    var frame = JSON.parse(it.myQuery.nextElementSibling.text);
			    var framedforPure;
			    jsonld.frame(parsedJSON,frame,function(err,framed){
				if(err){
				    alert('frame returned ' + JSON.stringify(err,null,3));
				}
				else {
				    framedforPure=framed;
				}
				var myquery=it.myQuery;
				var qid = (it.myQuery.id) ? it.myQuery.id : it.myQuery.getAttribute('data-id');
				if(qid){
				    if(!myquery.parentNode.parsedJSON){
					myquery.parentNode.parsedJSON = {};
				    }
				    myquery.parentNode.parsedJSON[qid]=framedforPure;
				}
				else {
				    myquery.parentNode.parsedJSON=framedforPure;
				}
				/* finish inside frame */
				var dumpelement=getElementsByAttribute(myquery.parentNode,'*','property','iridl:JsonAsText');
				if(dumpelement.length > 0 ){
				    dumpelement[0].innerHTML=JSON.stringify(myquery.parentNode.parsedJSON,null,3);}
				relStopLoading(myquery);
				runPureOnContext(myquery.parentNode);
				updatePageFormCopies(myquery.parentNode);
				validateAndCorrectPageForm(myquery.parentNode);
			    });
			}
			else {
			    /* finish without frame */
			    if(dumpelement.length > 0 ){
				dumpelement[0].innerHTML=JSON.stringify(it.myContext.parsedJSON,null,3)}
			    relStopLoading(it.myQuery);
			    runPureOnContext(it.myContext);
			    updatePageFormCopies(it.myContext);
			    validateAndCorrectPageForm(it.myContext);
			}
		    }
		}
		else {
		    /*failed -- stop loading */
		    relStopLoading(it.myQuery);
		    setFailed(it.myQuery, it.status, it.statusText + it.responseText);
		    var dumpelement=getElementsByAttribute(it.myQuery.parentNode,'*','property','iridl:JsonAsText');
		    if(dumpelement.length > 0 ){
			dumpelement[0].innerHTML=it.statusText + it.responseText}
		}
	    }
	};
	xmlhttp.myevtfn=xmlhttp.onreadystatechange;
	xmlhttp.open("GET",xmlhttp.infourl,true);
	xmlhttp.setRequestHeader("Accept","application/ld+json,application/sparql-results+json");
	xmlhttp.send();
    }
}
function loadHasJSON(){
var sfigs=getElementsByAttribute(document,'*','rel','iridl:hasJSON');
for (var i=0 ; i<sfigs.length ; i++){
    if(!sfigs[i].parentNode.parsedJSON){updateHasJSON(sfigs[i])};
}
sfigs=getElementsByAttribute(document,'*','property','iridl:hasJSON');
for (var i=0 ; i<sfigs.length ; i++){
    if(!sfigs[i].parentNode.parsedJSON){readHasJSON(sfigs[i])};
}
}
function readfileinto(url,inputelement){
var xmlhttp= getXMLhttp();
xmlhttp.infourl=url;
xmlhttp.inputelement=inputelement;
xmlhttp.onreadystatechange = function(evt) {
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
if(it.readyState == 4){
    if(it.status == 200){
	var jsontxt = it.responseText;
	it.inputelement.value=jsontxt;
    }
    else {
	/* failed */
	setFailed(it.inputelement, it.status, it.statusText + it.responseText);
    }
}
};
xmlhttp.myevtfn=xmlhttp.onreadystatechange;
xmlhttp.open("GET",xmlhttp.infourl,true);
xmlhttp.send();
}
function readHasJSON(myScript){
    var myContext=myScript.parentNode;
    var jsontxt = myScript.text;
    var qid = (myScript.id) ? myScript.id : myScript.getAttribute('data-id');
    if(qid){
	if(!myContext.parsedJSON){
	    myContext.parsedJSON = {};
	}
	myContext.parsedJSON[qid]=JSON.parse(jsontxt);
    }
    else {
	myContext.parsedJSON=JSON.parse(jsontxt);
    }
    runPureOnContext(myContext);
    updatePageFormCopies(myContext);
    validateAndCorrectPageForm(myContext);
}
/* reads JSON file referred to by a link object
The parent of the link object we call the Context.
when file is returned, if the url retrieved is still the url that the
link object points to, stores parsedJSON in the Context,
and calls runPureOnContext.
 */
function updateHasJSON(myLink){
var xmlhttp= getXMLhttp();
var localurl = localHrefOf(myLink.href);
if(myLink.href && myLink.localurl != localurl){
    relStartLoading(myLink);
    clearFailed(myLink);
myLink.localurl = localurl;
xmlhttp.infourl = localurl;
xmlhttp.myContext = myLink.parentNode;
xmlhttp.myLink=myLink;
changeClassWithin(myLink.parentNode,'valid','invalid');
xmlhttp.onreadystatechange = function(evt) {
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
if(it.readyState == 4){
    if(it.status == 200){
	var jsontxt = it.responseText;
	if(it.myLink.localurl == it.infourl){
	    var dumpelement=getElementsByAttribute(it.myContext,'*','property','iridl:JsonAsText');
	    if(dumpelement.length > 0){dumpelement[0].innerHTML=jsontxt;}
	    var qid = (it.myLink.id) ? it.myLink.id : it.myLink.getAttribute('data-id');
	    if(qid){
		if(!it.myContext.parsedJSON){
		    it.myContext.parsedJSON = {};
		}
		it.myContext.parsedJSON[qid]=JSON.parse(jsontxt);
	    }
	    else {
		it.myContext.parsedJSON=JSON.parse(jsontxt);
	    }
	    relStopLoading(it.myLink);
	    runPureOnContext(it.myContext);
	    updatePageFormCopies(it.myContext);
	    validateAndCorrectPageForm(it.myContext);
	}
    }
    else {
	/* failed */
	relStopLoading(it.myLink);
	setFailed(it.myLink, it.status, it.statusText + it.responseText);
    }
}
};
xmlhttp.myevtfn=xmlhttp.onreadystatechange;
xmlhttp.open("GET",xmlhttp.infourl,true);
xmlhttp.send();
}
}
/*
runs pure on what I am calling a context.  It only runs on elements
within the context which have a class that matches the directive element (default value "template" if no directive element).

Because this can be called more than once, I use the compile/render
form of pure.

Note that you can now explicitly set the template, called a 'directive' by PURE,
by using a script type="application/json" property="iridl:hasPUREdirective" in your context.
 */
var contextcount=0;
function runPureOnContext(myContext){
    if(!myContext.byDirective){
	/* run for the first time -- needs to survey iridl:hasPUREdirective(s) for directives and templateClasses */
	/* stores context directives in an array so there can be multiple templates with multiple structures*/
	myContext.byDirective=[];
	myContext.contextcount=contextcount;
	contextcount=contextcount+1;
	/* loops over script iridl:hasPUREdirective elements for directives */
	var myscripts = getElementsByAttribute(myContext,'script','property','iridl:hasPUREdirective');
	if(myscripts.length > 0){
	    for (var iscript = 0 ; iscript<myscripts.length ; iscript++){
		var myscript = myscripts[iscript];
	        if(myscript.parentNode == myContext){
                    var holdtxt = myscript.text;
		   var mystuff = {};
		    mystuff.pureDirective="";
		    if(holdtxt){
			var directive;
			try {
			    directive = enhancedPureDirective(holdtxt,mystuff);
			    if(holdtxt.indexOf('.sort')>0 || holdtxt.indexOf('iridl:firstLetter')>0){
				appendMissingClass(myContext,'PureDependsOnLang');
			    }
			} catch(e){
			    alert('JSON parse error in ' + holdtxt);
			}
			if(!directive){
			    alert('probable parse error in ' + holdtxt);
			}
			mystuff.pureDirective=directive;
		    }
		    if(myscript.className){
			mystuff.pureTemplateClass=myscript.className;
		    }
		    else {
			mystuff.pureTemplateClass='template';
		    }
		    myContext.byDirective.push(mystuff);
		}
	    }
	}
	else {
	/* does default single directive or not*/
	    myContext.byDirective[0]={};
	    myContext.byDirective[0].pureDirective=myContext.pureDirective;
	    if(myContext.pureTemplateClass){
	    	    myContext.byDirective[0].pureTemplateClass=myContext.pureTemplateClass;
		    }
		    else {
	    	    myContext.byDirective[0].pureTemplateClass='template';
		    }
	}
	/* finds templates for each directive */
	var mydirs = myContext.byDirective;
	for (var iscript = 0 ; iscript<mydirs.length ; iscript++){
	    var myscript = mydirs[iscript];
	    var mytclass =  myscript.pureTemplateClass + 'isAPureTemplateFor' + myContext.contextcount;
	    var mytems0 = myContext.getElementsByClassName(myscript.pureTemplateClass);
	    for (var i=0 ; i< mytems0.length;i++){
		if(mytems0[i].tagName != 'SCRIPT'){
		    appendMissingClass(mytems0[i],mytclass);
		}
	    }
	    myscript.pureTemplates=myContext.getElementsByClassName(mytclass);
	    myscript.pureTClass='.' + mytclass;
	}
    }
    /* we have a directives list */
    var mydirs = myContext.byDirective;
    for (var iscript = 0 ; iscript<mydirs.length ; iscript++){
	var myscript = mydirs[iscript];
	var mytems = myscript.pureTemplates;
	var mytclass = myscript.pureTClass;
	if(mytems.length>0){
	    var i=0;

	    var holdonchange = mytems[i].onchange;
	    if(myscript.pureDirective){
		if(!myscript.pureFunction){
		    myscript.pureFunction = $p(mytclass).compile(myscript.pureDirective);
		}
		$p(mytclass).render(myContext.parsedJSON,myscript.pureFunction);
	    }
	    else {
		$p(mytclass).autoRender(myContext.parsedJSON);
	    }
            if(typeof(holdonchange)=='function' ){
	        mytems[i].onchange=holdonchange;
		mytems[i].myonchange=holdonchange;
            }
	}
    }
    setupPageFormLinks(myContext);
    changeClassWithin(myContext,'invalid','valid');
	    updateLangGroups(myContext);
    var forcereflow=myContext.offsetHeight;
}
function enhancedPureDirective(directivestring,myDirective){
    var cleanstring = decodeXML(directivestring);
    var directive = JSON.parse(cleanstring);
    var newdirective = transformObject(directive,mapObject,myDirective);
	directive=newdirective;
    return directive;
}
function transformObject(object,func,myDirective){
    var newobj = {};
    for (var key in object ){
	var newval = func(object[key],key,myDirective);
	    newobj[key]=newval;
    }
    return newobj;
}
function mapObject (obj,key,myDirective){
	var newobj = obj;
	var findlg=new RegExp('([^"]*).iridl:asLangGroup');
	var findrc=new RegExp('([^".]*)[.]([^".]*).iridl:recurse');
	var findfl=new RegExp('([^"]*).iridl:firstLetter');
	if(typeof(obj) == 'object'){
	    newobj = transformObject(obj,mapObject,myDirective);
	}
        if(key=='sort'){
	    var sortvar = obj;
	    newobj = function(a,b){
		var mysortvar = sortvar;
		var ret;
		var sa,sb;
		if(sortvar == '.'){
		    sa = a;
		    sb = b;
		}
		else {
		    sa = a[sortvar];
		    if(typeof(sa) == 'object' && sa.length){
/* sa is an array -- could be strings or objects */
			if(typeof(sa[sa.length-1]) == 'object' && sa.length > 1){
			    var sanew = sa[0];
/* array of objects -- look for current language if possible*/
			    var clang=document.getElementsByTagName('body')[0].getAttribute("lang");
			    if(clang){
				for(var ilang=0; ilang < sa.length; ilang++){
				    if(sa[ilang]['@language'] == clang){
					sanew = sa[ilang];
					break;
				    }
				}
			    }
			    sa = sanew;
			}
			else {
			    sa = sa[0];
			}

		    }
/* if sa is an object, look for a @value attribute */
		    if (typeof(sa) == 'object' && sa['@value']){
			sa = sa['@value'];
		    }
/* same processing for sb */
		    sb = b[sortvar];
		    if(typeof(sb) == 'object' && sb.length){
			if(typeof(sb[sb.length-1]) == 'object' && sb.length > 1){
			    var sbnew = sb[0];
/* array of objects -- look for current language if possible*/
			    var clang=document.getElementsByTagName('body')[0].getAttribute("lang");
			    if(clang){
				for(var ilang=0; ilang < sb.length; ilang++){
				    if(sb[ilang]['@language'] == clang){
					sbnew = sb[ilang];
					break;
				    }
				}
			    }
			    sb = sbnew;
			}
			else {
			    sb = sb[0];
			}
		    }
		    if (typeof(sb) == 'object' && sb['@value']){
			sb = sb['@value'];
		    }
		}
		if(!sa){
		    return -1
		}
		else if (!sb){
		    return 1}
		else {
		    return removeDiacritics(sa.toLowerCase()) > removeDiacritics(sb.toLowerCase()) ? 1 : -1;
		}
	    };
	}
	else if(typeof(obj) == 'string'){
	    var res = findlg.exec(obj);
	    if(res){
		var localref=res[1];
		newobj = function(arg){
		    var local=localref; 
		    var ret; 

		    var mycontid = local.substr(1+local.indexOf('.'));
		    var contidlist = mycontid.split(".");
		    var mycont = arg.item;
		    for (var i=0 ; i < contidlist.length ; i++) {
                        if (mycont) {
			mycont = mycont[contidlist[i]];
			}
		    }
		    if(mycont && mycont.sort){
		    mycont.sort(function(a,b){
			if(typeof(a) == 'string' || !a['@language']){
			    return 1;
			}
			else if(typeof(b) == 'string'||  !b['@language']){
			    return -1;
			}
			else {
			    if(a['@language'] > b['@language']){
				return 1;
			    }
			    else {
				return -1;
			    }
			}
});
		    };	
		    if(!mycont){
			ret='';
		    }
		    else if(typeof(mycont)=='string' || mycont['@value']){
			var entry=mycont;
			if(typeof(entry)=='object'){
			ret = '<span lang="' + entry['@language'] + '">' + entry['@value'] + '</span>'; 
			}
			else {
			    ret= '<span lang="">' + entry + '</span>' ;
			}
		    }
		    else {
		    ret='';
		    if(mycont.length > 1){
			ret = '<span class="langgroup">';
		    }
		    for (var i = 0 ; i < mycont.length ; i++){
			var entry = mycont[i];
			if(typeof(entry)=='object'){
			ret += '<span lang="' + entry['@language'] + '">' + entry['@value'] + '</span>'; 
			}
			else {
			    ret+= '<span lang="">' + entry + '</span>' ;
			}
		    }
		    if(mycont.length > 1){
			ret += '</span>';
		    }
		    }
		    return ret}; 
	    }
	    if(res = findfl.exec(obj)){
		var localref=res[1];
		newobj = function(arg){
		    var local=localref; 
		    var ret; 

		    var mycontid = local.substr(1+local.indexOf('.'));
		    var contidlist = mycontid.split(".");
		    var mycont = arg.item;
		    for (var i=0 ; i < contidlist.length ; i++) {
                        if (mycont) {
			mycont = mycont[contidlist[i]];
			}
		    }
		    if(mycont && mycont.sort){
		    mycont.sort(function(a,b){
			if(typeof(a) == 'string' || !a['@language']){
			    return 1;
			}
			else if(typeof(b) == 'string'||  !b['@language']){
			    return -1;
			}
			else {
			    if(a['@language'] > b['@language']){
				return 1;
			    }
			    else {
				return -1;
			    }
			}
});
		    };	
		    if(!mycont){
			ret='';
		    }
		    else{
			var entry;
			if(!mycont.length){
			    entry=mycont;
			}
			else {
			    entry=mycont[0];
			if(typeof(mycont[mycont.length-1]) == 'object' && mycont.length > 1){
/* array of objects -- look for current language if possible*/
			    var clang=document.getElementsByTagName('body')[0].getAttribute("lang");
			    if(clang){
				for(var ilang=0; ilang < mycont.length; ilang++){
				    if(mycont[ilang]['@language'] == clang){
					entry = mycont[ilang];
					break;
				    }
				}
			    }
			}

			}
			if(typeof(entry)=='object'){
			    ret = removeDiacritics(entry['@value'].substr(0,1).toLowerCase()); 
			}
			else {
			    ret= removeDiacritics(entry.substr(0,1).toLowerCase());
			}
		    }
		    return ret;
		}; 
	    }
	    if (res = findrc.exec(obj)){
		var localref=res[1];
		var localloopon=res[2];
		var myd = myDirective;
		newobj = function(arg){
		    var local=localref;
		    var loopon=localloopon;
		    var context=myd;
		    var ret='';
		    if(context.pureFunction){
			var myfunc = context.pureFunction;
			if(arg[local] && arg[local].item[loopon]){
			    ret = myfunc(arg[local].item); 
			}
		    }
		    return ret;
		};
	    }

	}
	return newobj;
    }
function validate(context,vid){
}
function invalidate(context,vid){
}
/* set/clear failed class on object, maintain failed attribute on body */
function clearFailed(cmem){
    removeClass(cmem,'failed');
    cmem.removeAttribute('failcode');
    cmem.removeAttribute('failmsg');
    var mybody = document.getElementsByTagName('body')[0];
    var cnt = parseInt(mybody.getAttribute('failed'));
    cnt += -1;
    if (cnt > 0){
	mybody.setAttribute('failed',cnt);
    }
    else {
	mybody.removeAttribute('failed');
    }
}
    function setFailed(cmem,scode,msg){
	if(scode){
	    cmem.setAttribute('failcode',scode);
	    cmem.setAttribute('failmsg',msg);
	}
    if(appendMissingClass(cmem,'failed')){
	var mybody = document.getElementsByTagName('body')[0];
	var cnt = parseInt(mybody.getAttribute('failed'));
	if(cnt){
	    cnt += 1;
	}
	else {
	    cnt = 1;
	}
	mybody.setAttribute('failed',cnt);
    }
}
/* uses currenturl loadingCount, and Loading class to track loading state for links and their context */
function relStartLoading(link){
    myContext = link.parentNode;
    if(appendMissingClass(link,'loading')){
/* set loading in context */
	if(myContext.loading && myContext.loading > 0){
	    myContext.loading = myContext.loading + 1;
	}
	else {
	    myContext.loading = 1;
	    appendMissingClass(myContext,'loading');
	}
/* set loading on body */
	var mybody = document.getElementsByTagName('body')[0];
	var cnt = parseInt(mybody.getAttribute('loading'));
	if(cnt){
	    cnt += 1;
	}
	else {
	    cnt = 1;
	}
	mybody.setAttribute('loading',cnt);
	removeClass(mybody,'slowly');
	if(mybody.loadTimer){
	    clearTimeout(mybody.loadTimer);
	}
	mybody.loadTimer = setTimeout(function () {
	    if(mybody.getAttribute('loading')){appendMissingClass(mybody,'slowly')};},5000);
    }
}
function relStopLoading(link){
    myContext = link.parentNode;
    removeClass(link,'loading');
    var mybody = document.getElementsByTagName('body')[0];
    var cnt = parseInt(mybody.getAttribute('loading'));
    cnt += -1;
    if (cnt > 0){
	mybody.setAttribute('loading',cnt);
    }
    else {
	mybody.removeAttribute('loading');
	removeClass(mybody,'slowly');
    }
    myContext.loading = myContext.loading - 1;
    if(myContext.loading == 0){
	removeClass(myContext,'loading');
    }
}
function initializeDLimage(){
    var mylist=document.getElementsByClassName("dlimage");
for( var idlimage=0 ; idlimage < mylist.length ; idlimage++){
var s = mylist[idlimage];
var sl = s.getElementsByTagName('legend');
var leg;
var ctl;
var sfigs=getElementsByAttribute(s,'*','rel','iridl:hasFigure');
if(sfigs.length){
    appendMissingClass(s,'hasFigure');
}
if(!sl.length){
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
/* zoom info settings layers only if hasFigure */
if(sfigs.length){
ctl=document.createElement('div');
ctl.className="dlimagecontrol zoomout";
ctl.title="Zoom Out";
ctl.onclick=dozoomout;
ctl.myonclick=dozoomout;
leg.appendChild(ctl);
 ctl=document.createElement('div');
ctl.className="dlimagecontrol info";
ctl.title="More Information";
ctl.onclick=doinfobutton;
ctl.myonclick=doinfobutton;
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
if(s.className.indexOf('NoDefaultIvars')<0){
appendMissingClass(s,'ShowControlIvars');
}
}
/* share download buttons always appear */
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
ctl.title="Control Lock";
ctl.onclick=docontrollockbutton;
ctl.myonclick=docontrollockbutton;
leg.appendChild(ctl);
s.insertBefore(leg,s.firstChild);
}
else {
leg=sl[0];
}
var sfigs=getElementsByAttribute(s,'*','rel','iridl:hasFigure');
if(sfigs.length){
    updateHasFigure(sfigs[0]);
}
else {
DLimageBuildControls(s);
}
}
}
function updateHasFigure(myfig){
    var newinfourl = myfig.href;
    var lastslashindex = newinfourl.lastIndexOf('/');
    newinfourl = newinfourl.substr(0,lastslashindex+1);
    newinfourl = newinfourl +'info.json';
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
    if(imglist[i].className.indexOf('dlimg')>-1){
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
/* checks the infourl so that we know we have the current json */
    if(it.mylink.infourl==it.infourl){
it.mylink.info=JSON.parse(jsontxt);
/* info now has figure information */
DLimageBuildControls(it.mylink.parentNode,it.mylink);
DLimageBuildZoom(it.mylink);
    }
}
	 };
	 xmlhttp.myfn=xmlhttp.onreadystatechange;
xmlhttp.open("GET",infourl,true);
xmlhttp.send();
DLimageResizeImage(xmlhttp.mylink);
}
}
function dozoomout (evt) {
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : evt.srcElement.parentNode;
   var mylink = getElementsByAttribute(it.parentNode.parentNode,'*','rel','iridl:hasFigure');
    var myclasses = mylink[0].figureimage.className;
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
    if(myin.length){
	for (var i = 0;i < myin.length;i++){
	    if(matchToken(myin[i].className,myclasses)){
		myin[i].value='';
		break;
	    }
	}
    }
    else {
myin.value='';
    }
updatePageForm();
}
}
}
function matchToken(astring,bstring){
    var alist = astring.split(' ');
    var blist = bstring.split(' ');
    for (var j=0;j<alist.length;j++){
	for (var k=0; k<blist.length;k++){
	    if(blist[k] == alist[j]){
		return true;
	    }
	}
    }
    return false;
}
function clearregionwithin () {
var myform=document.getElementById('pageform');
if(myform){
    var myin;
myin = myform.elements['clickpt'];
if(myin){
myin.value='';
}
myin = myform.elements['region'];
var mybbox = myform.elements['bbox'];
if(myin && mybbox){
    if(mybbox.length){
    myin.value=mybbox[0].value;
    }
    else {
    myin.value=mybbox.value;
    }
updatePageForm();
}
}
}
function setbbox (newbbox,myinfo,myclasses) {
var update=false;
var within=false;
    var crs = myinfo["wms:CRS"];
var myform=document.getElementById('pageform');
if(myform){
var ifCRS = "";
if(crs && crs != "EPSG:4326"){
    if(crs == "CRS:1"){
	var abname, abunits,orname,orunits;
	if(myinfo["iridl:hasAbscissa"]){
	    abname=myinfo["iridl:hasAbscissa"]["cfatt:standard_name"];
	    abunits=myinfo["iridl:hasAbscissa"]["cfatt:units"];
	    var abcal = myinfo["iridl:hasAbscissa"]["cfatt:calendar"];
	    if(abcal && abcal != "standard"){
		abunits = abunits + "/" + abcal;
	    }
	}
	if(myinfo["iridl:hasOrdinate"]){
	    orname=myinfo["iridl:hasOrdinate"]["cfatt:standard_name"];
	    orunits=myinfo["iridl:hasOrdinate"]["cfatt:units"];
	    var orcal = myinfo["iridl:hasOrdinate"]["cfatt:calendar"];
	    if(orcal && orcal != "standard"){
		orunits = orunits + "/" + orcal;
	    }
	}
	if(abname && abunits && orname && orunits){
	    crs = "cfsn:" + abname + ":" + abunits + ":" + orname + ":" + orunits ;
	}
    }
    ifCRS = ":" + crs;
}
if(newbbox[0] != newbbox[2]){
var myin = myform.elements['bbox'];
if(myin){
    /*    myin.value=JSON.stringify(newbbox);  */
    var newbb = 'bb:' + newbbox.slice(0,4).join(':') + ifCRS + ':bb'; 
    if(myin.length){
	for (var i = 0;i < myin.length;i++){
	    if(matchToken(myin[i].className,myclasses)){
		myin[i].value=newbb;
		break;
	    }
	}
    }
    else {
	myin.value= newbb;
    }
update=true;
}
}
/* sets clickpt */
var clickpt = myform.elements['clickpt'];
    var historyid;
if(newbbox[0] == newbbox[2] && newbbox[1] == newbbox[3]){
    // click -- return depends on resolution res
    within=true;
    clickpt.value="pt:" + newbbox.slice(0,2).join(':') + ifCRS + ":pt";
    historyid = clickpt.value;
}
/* sets region */
var myin = myform.elements['region'];
var res = myform.elements['resolution'];
var resf = myform.elements['resolutionFilter'];
var ress,resfs,myins;
if(myin){
    var myins;
if(myin.length) {
    myins=myin;
}
else {
    myins=[myin];
}
if(res && res.length) {
    ress=res;
}
else {
    ress=[res];
}
if(resf && resf.length) {
    resfs=resf;
}
else {
    resfs=[resf];
}
if(newbbox[0] == newbbox[2] && newbbox[1] == newbbox[3]){
// click -- return depends on resolution res
    for (iin=0 ; iin < myins.length ; iin++){
	myin = myins[iin];
	res = ress[iin];
	resf = resfs[iin];
// none -- return pt:[x,y]
// number -- return bbox of that size bb:[x,y,x+res,y+res]
// uri -- returns geoobject of that class/type 
if(res.value && res.value.substr(0,6) == 'irids:'){
    invalidatePageInput(myin);
    var queryserver=uicoreConfig.resolutionQueryServers[res.value];
    if(!queryserver){
	queryserver=uicoreConfig.resolutionQueryServers['default'];
    }
    if(!queryserver){
	queryserver="http://iridl.ldeo.columbia.edu/";
    }
    var resurl = queryserver + "expert/%28irids:SOURCES:Features:Political:Africa:Districts:ds%29//resolution/parameter/%28pt:4:10:pt%29//clickpt/parameter/" + encodeURIComponent('{}')+"//resolutionFilter/parameter/geoselect//string/as.json";
    resclasses="";
    if(resf && resf.className){
	resclasses = resclasses + ' ' + resf.className;
    }
    resurl = appendPageForm(resurl,resclasses);
    var delim = '?';
    if(resurl.indexOf('?')>0){
	delim="&";
    }
    resurl = resurl + delim + 'clickpt=' + encodeURIComponent(clickpt.value);
    resurl = resurl + '&resolution=' + encodeURIComponent(res.value);
    if(resf){
	if(resf.value.indexOf('{')<0){
	resurl=resurl + '&resolutionFilter=' + encodeURIComponent('{' + resf.value + '}');
	}
	else{
	resurl=resurl + '&resolutionFilter=' + encodeURIComponent(resf.value);
	}
    }
var xmlhttp= getXMLhttp();
xmlhttp.myurl=resurl;
xmlhttp.myin=myin;
    xmlhttp.historyid=historyid;
xmlhttp.onreadystatechange= function(evt) {
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
if(it.readyState == 4){
var jsontxt = it.responseText;
var result;
    try{result=JSON.parse(jsontxt)}
    catch(err){alert(err + ' in parsing from ' + resurl + ' parsing ' + jsontxt)}
/* info now has figure information */
if(result["value"]){
    var myin = it.myin;
    if(myin.value == result["value"]){
    validatePageInput(myin);
    }
    else {
    myin.value=result["value"];
	
	updatePageForm(undefined,undefined,undefined,it.historyid);
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
    } /* end of loop on iin */
} /* end of resolution-dependent click */
else {
    clickpt.value='';

    myin.value="bb:" + newbbox.slice(0,4).join(':') + ifCRS + ":bb";
}
update=true;
}
/* Sets corresponding form variables for Abscissa and Ordinate */
    var abscissa = myinfo["iridl:hasAbscissa"];
    var ordinate = myinfo["iridl:hasOrdinate"];
    var myvars = [];
    if(abscissa && myform[abscissa["iridl:name"]]){
	myvars[0]=abscissa;
    }
    if(ordinate && myform[ordinate["iridl:name"]]){
	myvars[1]=ordinate;
    }
    if(within && myvars.length){
	for(var idim=0;idim<myvars.length;idim++){
	    var mygrid=myvars[idim];
	    if(mygrid){
		var myname=mygrid["iridl:name"];
		var myout=myform.elements[myname];
		var gridvalues =mygrid["iridl:gridvalues"];
		var g0,g1,ginc;
		var cval;
		var cval0 = newbbox[idim];
		gare = gridvalues["@type"];
		if(gare == 'iridl:EvenGrid'){
		    g0 = parseFloat(gridvalues["iridl:first"]);
		    g1 = parseFloat(gridvalues["iridl:last"]);
		    ginc = parseFloat(gridvalues["iridl:step"]);
		    var nval = Math.round((Math.abs(g1-g0)/ginc));
		    var ival = Math.round(nval*(cval0-g0)/(g1-g0));
		    cval = g0 + ival*ginc;
		}
		if(gare == 'iridl:EvenGridEdges'){
		    g0 = parseFloat(gridvalues["iridl:first"]);
		    g1 = parseFloat(gridvalues["iridl:last"]);
		    ginc = parseFloat(gridvalues["iridl:step"]);
		    var pw;
		    if(typeof(gridvalues["iridl:pointwidth"]) != 'undefined'){
			pw = gridvalues["iridl:pointwidth"];
		    }
		    else {
			pw = ginc;
		    }
		    var g0c = g0 + pw/2;
		    var nval = Math.round((Math.abs(g1-g0)/ginc))-1;
		    var ival = Math.round(nval*(cval0-g0c)/(g1-g0-ginc));
		    cval = g0c + ival*ginc;
		}
		if(gare == 'iridl:CenterValues'){
		    g0 = parseFloat(mygrid["iridl:plotfirst"]);
		    g1 = parseFloat(mygrid["iridl:plotlast"]);
		    var glist=gridvalues['iridl:valuelist'];
		    var nval = glist.length-1;
		    var ival = Math.round(nval*(cval0-g0)/(g1-g0));
		    cval = glist[ival];
		}
/* uses units to convert */
		var units = mygrid['cfatt:units'];
		if(units.substr(0,10) =='days since'){
		    var refdate = new Date(units.substr(11).replace('-1-1','-01-01'));
		    var cdate = new Date(Math.round(cval*1000*3600*24) + refdate.getTime());
		    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		    myform[myname].value = cdate.getDate() + ' ' + months[cdate.getMonth()] + ' ' + cdate.getFullYear();
		}
		else {
		myform[myname].value=cval;
		}
		update=true;
	    }
	}
    }
    
if(update){
	updatePageForm(undefined,undefined,undefined,historyid);
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
function getbbox (myinfo,myclasses) {
var mybbox;
var myform=document.getElementById('pageform');
if(myform){
var myin = myform.elements['bbox'];
/* parses a non-blank bounding box */
if(myin){
    if(myin.length){
	for (var i = 0;i < myin.length;i++){
	    if(matchToken(myin[i].className,myclasses)){
		if(myin[i].value){
		    mybbox=parseBbox(myin[i].value);
		}
		break;
	    }
	}
    }
    else {
	if(myin.value){
	    mybbox=parseBbox(myin.value);
	}
    }
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
    mybbox=[X0,Y0,X1,Y1,true];
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
function docontrollockbutton(evt){
  var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
var mylink = getElementsByAttribute(it.parentNode.parentNode,'*','rel','iridl:hasFigure');
var mycontainer = it.parentNode.parentNode;
toggleClass(mycontainer,'ControlLock');
if(mycontainer.className.indexOf('ControlLock')<0){
    it.blur();
    mycontainer.blur();
}
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
   var newloc = mylink[0].href;
    var lastslashindex = newloc.lastIndexOf('/');
    newloc = newloc.substr(0,lastslashindex+1);
   var locq = mylink[0].href.indexOf('?');
	if(locq>0){
	    newloc=newloc.substr(0,locq);
	}
location.href=appendPageForm(newloc+'index.html',mylink[0].figureimage.className);
}
function DLimageResizeImage(mylink){
    if(mylink.figureimage){
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
var ipt=pform.elements['clickpt'];
if(!ipt){
ipt= document.createElement('input');
ipt.className = 'transformRegion';
ipt.name = 'clickpt';
ipt.type='hidden';
    ipt.initialValue='';
pform.appendChild(ipt);
}
ipt=pform.elements['plotaxislength'];
if(!ipt){
ipt= document.createElement('input');
ipt.className = mylink.figureimage.className.split(' ')[0];
appendMissingClass(pform,ipt.className);
    appendMissingClass(ipt,'dlauximg');
appendMissingClass(pform,'dlauximg');
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
function DLimageBuildControls(mydlimage,mylink){
/* builds image choice controls and places them immediately after the link if it exists, otherwise the legend
*/
    var currentObj;
    if(mylink){
	currentObj=mylink;
    }
    else {
	var llist = mydlimage.getElementsByTagName('legend');
	if(llist.length > 0){
	currentObj=llist[0];
	}
    }
    if(!currentObj.nextSibling.className || currentObj.nextSibling.className.indexOf('dlcontrol') < 0){
	var pformchanged = false;
	var kmlurl;
	var wmsurl;
	var sdataurl;
	var tiffurl;
	var tiffpcurl;
	if(mylink && mylink.info){
	    kmlurl=mylink.info['iridl:hasKML'];
	    wmsurl=mylink.info['iridl:hasWMS'];
	    sdataurl=mylink.info['iridl:hasSelectedData'];
	    tiffurl=mylink.info['iridl:hasGeoTiff'];
	    tiffpcurl=mylink.info['iridl:hasGeoTiffPaletteColor'];
	}
	if(kmlurl){
	    appendMissingClass(mydlimage,'hasKML');
	}
	else {
	    removeClass(mydlimage,'hasKML');
	}
	if(wmsurl){
	    appendMissingClass(mydlimage,'hasWMS');
	}
	else {
	    removeClass(mydlimage,'hasWMS');
	}
	if(sdataurl){
	    appendMissingClass(mydlimage,'hasSelectedData');
	}
	else {
	    removeClass(mydlimage,'hasSelectedData');
	}
	if(tiffurl){
	    appendMissingClass(mydlimage,'hasGeoTiff');
	}
	else {
	    removeClass(mydlimage,'hasGeoTiff');
	}
	if(tiffpcurl){
	    appendMissingClass(mydlimage,'hasGeoTiffPaletteColor');
	}
	else {
	    removeClass(mydlimage,'hasGeoTiffPaletteColor');
	}
/* builds layer controls */
	var layerlist;
	if(mylink && mylink.info){
	    layerlist=mylink.info["iridl:hasLayers"]; 
	}
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
		    ipt.initialChecked=ipt.checked;
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
/* creates share control */
	var ctl=document.createElement('div');
	ctl.className='dlcontrol ' + 'share';
	var ipt = document.createElement('span');
	ipt.className='controlLabel';
	ipt.innerHTML='Open in' + '  ';
	ctl.appendChild(ipt);
/* evernote */
	var gb= document.createElement('div');
	gb.className='sharebutton evernote';
	gb.setAttribute("title","Save to Evernote with link back");
	gb.onclick=doEvernoteClipElement;
	gb.myonclick=doEvernoteClipElement;
	gb.clipthis = currentObj.parentNode;
	ctl.appendChild(gb);
/* tumblr */
	var gb= document.createElement('div');
	gb.className='sharebutton tumblr';
	gb.setAttribute("title","Save to Tumblr with link back");
	gb.onclick=doTumblrClipElement;
	gb.myonclick=doTumblrClipElement;
	gb.clipthis = currentObj.parentNode;
	ctl.appendChild(gb);
/* CSPF */
	var gb= document.createElement('div');
	gb.className='sharebutton iriforum';
	gb.setAttribute("title","Share image and link using the Climate Services Partnership Forums");
	gb.onclick=doIRIFClipElement;
	gb.myonclick=doIRIFClipElement;
	gb.clipthis = currentObj.parentNode;
	ctl.appendChild(gb);
/* pinterest */
	var gb= document.createElement('div');
	gb.className='sharebutton pinterest';
	gb.setAttribute("title","Save to Pinterest with link back");
	gb.onclick=doPinterestClipElement;
	gb.myonclick=doPinterestClipElement;
	gb.clipthis = currentObj.parentNode;
	ctl.appendChild(gb);
/* Google Earth */
	if(mylink){
	gb= document.createElement('div');
	gb.className='sharebutton googleearth';
	gb.setAttribute("title","View in Google Earth");
	gb.onclick=doGoogleEarthClick;
	gb.myonclick=doGoogleEarthClick;
	gb.clipthis = currentObj.parentNode;
	ctl.appendChild(gb);
/* ArcGIS */
	gb= document.createElement('div');
	gb.className='sharebutton arcgis';
	gb.setAttribute("title","View in ArcGIS");
	gb.onclick=doarcgisClick;
	gb.myonclick=doarcgisClick;
	gb.clipthis = currentObj.parentNode;
	ctl.appendChild(gb);
	}
	currentObj.parentNode.insertBefore(ctl,currentObj.nextSibling);
	currentObj=ctl;
/* Download Control */
	var ctl=document.createElement('div');
	ctl.className='dlcontrol ' + 'download';
	var ipt = document.createElement('span');
	ipt.className='controlLabel';
	ipt.innerHTML='Download as' + '  ';
	ctl.appendChild(ipt);
	if(mylink){
/* KML */
	var gb= document.createElement('div');
	gb.className='sharebutton asKML';
	gb.setAttribute("title","KML with link back");
	gb.onclick=doGoogleEarthClick;
	gb.myonclick=doGoogleEarthClick;
	gb.clipthis = currentObj.parentNode;
	ctl.appendChild(gb);
/* WMS */
	gb= document.createElement('div');
	gb.className='sharebutton asWMS';
	gb.setAttribute("title","WMS");
	gb.onclick=doWMSClick;
	gb.myonclick=doWMSClick;
	gb.clipthis = currentObj.parentNode;
	ctl.appendChild(gb);
/* GeoTiffPC */
	gb= document.createElement('div');
	gb.className='sharebutton asGeoTiffPaletteColor';
	gb.setAttribute("title","GeoTiff");
	gb.onclick=doGeoTiffPCClick;
	gb.myonclick=doGeoTiffPCClick;
	gb.clipthis = currentObj.parentNode;
	ctl.appendChild(gb);
/* GeoTiff */
	gb= document.createElement('div');
	gb.className='sharebutton asGeoTiff';
	gb.setAttribute("title","data GeoTiff");
	gb.onclick=doGeoTiffClick;
	gb.myonclick=doGeoTiffClick;
	gb.clipthis = currentObj.parentNode;
	ctl.appendChild(gb);
	appendMissingClass(mydlimage,'hasDownload');
	}
	if(getTable(mydlimage)){
/* tsv */
	    gb= document.createElement('div');
	    gb.className='sharebutton asHTML';
	    gb.setAttribute("title","HTML");
	    gb.onclick=doHTMLClick;
	    gb.myonclick=doHTMLClick;
	    gb.clipthis = currentObj.parentNode;
	    ctl.appendChild(gb);
	    gb= document.createElement('div');
	    gb.className='sharebutton asTSV';
	    gb.setAttribute("title","TSV");
	    gb.onclick=doTSVClick;
	    gb.myonclick=doTSVClick;
	    gb.clipthis = currentObj.parentNode;
	    ctl.appendChild(gb);
	    appendMissingClass(mydlimage,'hasDownload');
	}
	if(getPNGImage(mydlimage)){
/* PDF */
	    gb= document.createElement('div');
	    gb.className='sharebutton asPNG';
	    gb.setAttribute("title","PNG image");
	    gb.onclick=doPNGImageClick;
	    gb.myonclick=doPNGImageClick;
	    gb.clipthis = currentObj.parentNode;
	    ctl.appendChild(gb);
	appendMissingClass(mydlimage,'hasDownload');
	}
	if(getPDFImage(mydlimage)){
/* PDF */
	    gb= document.createElement('div');
	    gb.className='sharebutton asPDF';
	    gb.setAttribute("title","PDF image");
	    gb.onclick=doPDFImageClick;
	    gb.myonclick=doPDFImageClick;
	    gb.clipthis = currentObj.parentNode;
	    ctl.appendChild(gb);
	appendMissingClass(mydlimage,'hasDownload');
	}
	if(getOnlyFigureImage(mydlimage)){
/* PDF */
	    gb= document.createElement('div');
	    gb.className='sharebutton asPDF';
	    gb.setAttribute("title","PDF image with link back");
	    gb.onclick=doPDFClick;
	    gb.myonclick=doPDFClick;
	    gb.clipthis = currentObj.parentNode;
	    if(pform && !pform.elements['linkurl']){
		var ipt= document.createElement('input');
		ipt.type='hidden';
		ipt.name='linkurl';
		ipt.className='linkurl';
		pform.appendChild(ipt);
	    }
	    ctl.appendChild(gb);
/* GIF */
	    gb= document.createElement('div');
	    gb.className='sharebutton asGIF';
	    gb.setAttribute("title","GIF image");
	    gb.onclick=doGifClick;
	    gb.myonclick=doGifClick;
	    gb.clipthis = currentObj.parentNode;
	    ctl.appendChild(gb);
/* JPG */
	    gb= document.createElement('div');
	    gb.className='sharebutton asJPG';
	    gb.setAttribute("title","JPG");
	    gb.onclick=doJpgClick;
	    gb.myonclick=doJpgClick;
	    gb.clipthis = currentObj.parentNode;
	    ctl.appendChild(gb);
/* cut and paste */
	gb= document.createElement('div');
	gb.className='sharebutton asCutAndPaste';
	gb.setAttribute("title","copy to html");
	gb.onclick=docutandpasteClick;
	gb.myonclick=docutandpasteClick;
	gb.clipthis = currentObj.parentNode;
	ctl.appendChild(gb);

	    appendMissingClass(mydlimage,'hasDownload');
	    var sfigs = getElementsByAttribute(mydlimage,'*','rel','iridl:hasFigureImage');
	    if(sfigs.length){
		for(var i= sfigs.length;i--;){
		    sfigs[i].onclick=doFigureImageClick;
		    sfigs[i].onclickfn=doFigureImageClick;
		    sfigs[i].mydlimage = mydlimage;
		}
		if(sfigs.length>1){appendMissingClass(sfigs[0],'selectedImage')}
	    }
	}
/* add download control area to parent */
	currentObj.parentNode.insertBefore(ctl,currentObj.nextSibling);
	currentObj=ctl;
/* adds message area for download controls e.g. ArcGIS */
	var msga = document.createElement('div');
	msga.className='messagearea';
	currentObj.parentNode.insertBefore(msga,currentObj.nextSibling);
	currentObj=msga;
/* builds fig dimension controls */
	if(mylink) {
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
var cmax = dimlist[i]['iridl:gridvalues']['iridl:valuelist'].length-1;
var controlClass;
appendMissingClass(ipt,'hasValueList');
if(cin > -1){
    controlClass="singleValue";
}
else {
    controlClass="multiValue";
}
appendMissingClass(iptset,controlClass);
 if(cin > 0){
     controlClass= 'aboveLower';
 }
    else if(cin == 0){
     controlClass='atLower';
    }
appendMissingClass(iptset,controlClass);
 if(cin >= 0 && cin < cmax){
     controlClass='belowUpper';
 }
    else if(cin == cmax){
	controlClass='atUpper';
    }
appendMissingClass(iptset,controlClass);
if(document.getElementById('pageform')){
var pform=document.getElementById('pageform');
if(!pform.elements[ipt.name]){
var iptcpy= document.createElement('input');
    iptcpy.className = ipt.className;
    appendMissingClass(pform,ipt.className);
    appendMissingClass(iptcpy,'dlauximg');
    appendMissingClass(iptcpy,'share');
    iptcpy.name = ipt.name;
    iptcpy.value='';
    iptcpy.type='hidden';
    pform.appendChild(iptcpy);
    updatePageFormFromUrl(iptcpy);
}
if(pform.elements[ipt.name].value != ''){
ipt.value=pform.elements[ipt.name].value;
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
    updatePageFormNoHistory();
}
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
myimgdiv.outline.className='imageoverlaypart clipper';
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
myimgdiv.outlineimage=document.createElement('div');
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
var pform=document.getElementById('pageform');
    if(pform){
	var bbox = pform.elements['bbox'];
	if(!bbox){
	    bbox = document.createElement('input');
	    bbox.name='bbox';
	    bbox.type='hidden';
	    bbox.className = myfigure.className.split(' ')[0] + ' share';
	    pform.appendChild(bbox);
	}
}
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
var myobj=null;
function clearmyobj(){
    myobj=null;
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
var myinfo = myimgdiv.inputimage.mylink.info;
var checkobj;
sizeto(myimgdiv.outline,0,0);
clearmyobj();
if(myform){
checkobj = myform.elements['region'];
}
var mypar=myimgdiv.zoomstatus;
if(mypar){
if(checkobj){
var res = myform.elements['resolution'];
    if(res && res.length){
	/* if multiple resolutions, uses first */
	res = res[0];
    }
    var resclass="point";
/* if there is a resolution select menu, uses its labels */
    var resselect = document.getElementsByClassName('pageformcopy');
    if(resselect.length>0){
	for(var i=resselect.length;i--;){
	    if(resselect[i].name=='resolution'){
		for (var j=resselect[i].options.length;j--;){
		    if(resselect[i].options[j].value==res.value){
			resclass=resselect[i].options[j].text;
		    }
		}
	    }
	}
    }
    if(resclass=='point'){
	if(res.value.substring && res.value.substring(0,6)=='irids:'){
	    var parts = res.value.split(':');
	    resclass = parts[parts.length-2];
	}
	else {
	    if(myinfo['wms:CRS'] == 'EPSG:4326'){
		resclass = res.value + "&deg; box";
	    }
	    else {
		resclass = res.value + "m box";
	    }
	}
    }
// adds pickRegion if necessary to indicate that we could pick a point or choose an area
appendMissingClass(myimgdiv,'pickRegion');
mypar.innerHTML="click for " + resclass +"<br /> click-drag-release for larger or to zoom in";
}
else {
mypar.innerHTML="click-drag-release to zoom in";
}
mypar.style.visibility="visible";
mypar.timeoutId=setTimeout(function () {mypar.style.visibility='hidden'},10000);
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
    var myclasses = myimgdiv.inputimage.className;
removeClass(myimgdiv,'zoomArea');
var myvals;
if(myobj != null && myinfo){
if(myobj.style.visibility == 'visible'){
    myvals=lonlat(myinfo,myimgdiv.inputimage.className,myimgdiv.inputimage.clientWidth,parseInt(myobj.style.left),parseInt(myobj.style.top),parseInt(myobj.style.width),parseInt(myobj.style.height));
changeClass(myimgdiv.inputimage,'valid','invalid-zooming');
}
else {
var dx,dy;
/* using inputimage as coordinate reference because firefox performs better with it -- I think because it is a visible object unlike myimgdiv, so it is positioned more reliably.  Also helps keep the overlay and the image aligned.  */
dx=evt.clientX + window.pageXOffset - absLeft(myimgdiv.inputimage);
dy=evt.clientY + window.pageYOffset - absTop(myimgdiv.inputimage);
myvals=lonlat(myinfo,myimgdiv.inputimage.className,myimgdiv.inputimage.clientWidth,dx,dy,0,0);
}
    setbbox(myvals,myinfo,myclasses);
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
    var	myval=0;
    if(obj){
	if(obj.offsetParent){
	    myval=obj.offsetLeft + absLeft(obj.offsetParent);
	}
	else {
	    myval=obj.offsetLeft;
	}
    }
    return myval;
}
function absTop(obj){
    var myval=0;
    if(obj){
	if(obj.offsetParent){
	    myval=obj.offsetTop + absTop(obj.offsetParent);
	}
	else {
	    myval=obj.offsetTop;
	}
    }
return myval;
}
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
/* makes sure myimgdiv is active, otherwise will not have valid position */
    changeClass(myimgdiv,'inactive','active');
var myworld = myimgdiv.mycontainer;
if(myworld){
var myinfo = myimgdiv.inputimage.mylink.info;
var plotborderleft = myinfo["iridl:plotborderleft"];
var plotbordertop = myinfo["iridl:plotbordertop"];
var plotborderright = myinfo["iridl:plotborderright"];
var plotborderbottom = myinfo["iridl:plotborderbottom"];
// alert(evt.layerX + ' ' + evt.x + ' ' + evt.pageX + ' ' + absLeft(myimgdiv));
    myx=evt.clientX + window.pageXOffset - absLeft(myimgdiv.inputimage);
myy=evt.clientY + window.pageYOffset - absTop(myimgdiv.inputimage);
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
    var px,py;
if(myobj != null){
    px=evt.clientX + window.pageXOffset;
    py=evt.clientY + window.pageYOffset;
    dx = px - absLeft(myimgdiv.inputimage);
    dy = py - absTop(myimgdiv.inputimage);
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
function stopevent(evt){
evt = (evt) ? evt : event;
evt.cancelBubble = true;
return true;
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
    myA = getbbox(myinfo,myclass);
var X0,X1,Y0,Y1,DX,DY;
X0 = myA[0];
Y0 = myA[1];
X1 = myA[2];
Y1 = myA[3];
    ifdefault = myA[4];
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
/* needs to use bbox limits to modify if not full range */
    if(ifdefault){
if(Xaxislength >= Yaxislength) {
Yaxislength = Math.round((plotaxislength * Yaxislength)/Xaxislength);
Xaxislength = plotaxislength;
}
else {
    Xaxislength = Math.round((plotaxislength * Xaxislength)/Yaxislength);
Yaxislength = plotaxislength;
}
    }
    else {
if(DX >= DY) {
Yaxislength = Math.round((plotaxislength * DY)/DX);
Xaxislength = plotaxislength;
}
else {
    Xaxislength = Math.round((plotaxislength * DX)/DY);
Yaxislength = plotaxislength;
}
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
function insertInstructions(){
    var mylist=document.getElementsByClassName("buttonInstructions");
    if(mylist.length>0){
/* make sure Set-Language has carryLanguage */
	var myform=document.getElementById('pageform');
	if(myform){
	    var slang=myform.elements['Set-Language'];
	    if(slang){
		appendMissingClass(slang,'carryLanguage');
		appendMissingClass(myform,'carryLanguage');
	    }
	}
	var cont=mylist[0];
	if(typeof(cont.filledOut)=='undefined'){
	    cont.filledOut=true;
	    var el = document.createElement('a');
	    el.rel="iridl:hasJSON";
	    el.className="carryLanguage";
	    el.href="/uicore/toolinfo/buttoninfo.json";
	    cont.appendChild(el);
	    el = document.createElement('script');
	    el.type = "application/json";
            el.setAttribute('property','iridl:hasPUREdirective');
	    el.text='{".button" : {"button<-uicore:buttonList":{".icon@class+": "button.uicore:icon",".label": "button.term:label",".description": "button.term:description"}}}';
	    cont.appendChild(el);
	    el=document.createElement('div');
	    el.className="template";
	    cont.appendChild(el);
	    var el2=document.createElement('div');
	    el2.className="button";
	    el.appendChild(el2);
	    el=document.createElement('div');
	    el.className="dlimagecontrol icon ";
	    el2.appendChild(el);
	    el=document.createTextNode(' ');
	    el2.appendChild(el);
	    el=document.createElement('span');
	    el.className="label";
	    el2.appendChild(el);
	    el=document.createTextNode(' ');
	    el2.appendChild(el);
	    el=document.createElement('span');
	    el.className="description";
	    el2.appendChild(el);
	}
    }
}
function insertcontrolBar(){
var s=document.getElementById('homelink');
if(!s){
    var mylist=document.getElementsByClassName("controlBar");
if(mylist.length>0){
var cont=mylist[0];
var gb= document.createElement('div');
gb.id='homelink';
var homelinks=getElementsByAttribute(document,'link','rel','home');
var homelinkjson=getElementsByAttribute(document,'link','rel','home alternate');
gb.inout='out';
gb.onclick=homelinkclick;
gb.myonclick=homelinkclick;
if(homelinkjson.length == 1
&& navigator.appVersion.indexOf('MSIE 8')<0) {
    // menu from json
    appendMissingClass(gb,'HomeSelect');
    var mylink = document.createElement('a');
    mylink.setAttribute('rel','iridl:hasJSON');
    mylink.className=homelinkjson[0].className;
    mylink.href=homelinkjson[0].href;
    gb.appendChild(mylink);
    gb.pureTemplateClass = 'homeTemplate';
    gb.pureDirective = {
	'option.toplist' : {
	    'opt<-options':{
		'.': 'opt.title',
		'.@value': 'opt.href',
	    }
	},	
	'optgroup' : {
	    'grp<-groups':{
		'.@label': 'grp.title',
		'option' : {
		    'oopt<-grp.links':{
			'.': 'oopt.title',
			'.@value': 'oopt.href',
		    }
		}	

	    }
	}
    }
    var sel = document.createElement('select');
    sel.name = 'homelinksel';
    sel.id = 'homelinksel';
    sel.onchange=dohomesel;
    sel.myonchange=dohomesel;
    sel.className='homeTemplate homeselect pageformcopy';
    var opt;
    opt=document.createElement('option');
    opt.innerHTML=' ';
    opt.value='';
    opt.className='toplist';
    sel.appendChild(opt);
    opt=document.createElement('optgroup');
    opt.innerHTML=' ';
    opt.value='';
    var oopt=document.createElement('option');
    oopt.innerHTML=' ';
    oopt.value='';
    opt.appendChild(oopt);
    sel.appendChild(opt);
    opt=document.createElement('option');
    opt.innerHTML=' ';
    opt.value='';
    opt.className='emptyOption';
    sel.appendChild(opt);
    gb.appendChild(sel);
var myform=document.getElementById('pageform');
if(myform){
    var ipt = document.createElement('input');
    ipt.name='homelinksel';
    ipt.id = 'homelinksel';
    ipt.type='hidden';
    ipt.value='unseturl';
    myform.appendChild(ipt);
}
    }
else if(homelinks.length > 1) {
    // menu from flat list of links
    var sel = document.createElement('select');
    appendMissingClass(gb,'HomeSelect');
    sel.name = 'homelinksel';
    sel.name = 'homelinksel';
    sel.onchange=dohomesel;
    sel.myonchange=dohomesel;
	var opt=document.createElement('option');
	opt.innerHTML=' ';
	opt.value='';
	sel.appendChild(opt);
	var cnt=1;
    for(var i = 0; i < homelinks.length ; i++){
	var title = homelinks[i].title;
	if(title){
	var opt=document.createElement('option');
	opt.innerHTML=title;
	opt.value=homelinks[i].href;
	sel.appendChild(opt);
	cnt = cnt + 1;
	}
    }
    sel.selectedIndex=-1;
    gb.appendChild(sel);
}
/* skips over text nodes, links, and scripts to get homelink next to other displayed elements */
    var cfirst = cont.firstChild;
    while (cfirst && (!cfirst.tagName || cfirst.tagName=='A'  || cfirst.tagName=='SCRIPT')){
	cfirst = cfirst.nextSibling;
    }
cont.insertBefore(gb,cfirst);
var slist = cont.getElementsByTagName('select');
for (var i=0; i<slist.length ; i++){
    var mysel = slist[i];
    if(mysel.name != 'homelinksel' && mysel.previousSibling && mysel.previousSibling.className != "selectvalue"){
	var sv = document.createElement('span');
	sv.className='selectvalue';
	sv.onclick=selectvalueclick;
	sv.onclickFn=selectvalueclick;
	if(mysel.selectedIndex >=0){
	sv.innerHTML=mysel.options[mysel.selectedIndex].innerHTML;
	    sv.setAttribute('value',sv.innerHTML);
	}
	mysel.parentNode.insertBefore(sv,mysel);
    }
}
}
}
insertlang();
}
/* this exists to convince ios to send events to selectvalue for CSS */
function selectvalueclick (evt) {
    evt = (evt) ? evt : ((event) ? event : null );
    it = (evt.currentTarget) ? evt.currentTarget : this;
    if(it.nextSibling && it.nextSibling.dispatchEvent){
	it.nextSibling.dispatchEvent(evt);
    }
    return true;
}
var Languages = new Array();
Languages["en"]="english";
Languages["es"]="espa&#241;ol";
Languages["in"]="bahasa";
Languages["fr"]="fran&ccedil;ais";
Languages["id"]="bahasa";
Languages["ru"]="русский";
Languages["sw"]="swahili";
Languages["mg"]="malagasy";
var LanguageTitle = new Array();
LanguageTitle["en"]="Language";
LanguageTitle["es"]="Idioma";
LanguageTitle["in"]="Bahasa";
LanguageTitle["fr"]="Langue";
LanguageTitle["id"]="Bahasa";
LanguageTitle["ru"]="Язык";
LanguageTitle["sw"]="Lugha";
LanguageTitle["mg"]="Teny";
function languageChange(){
    var s=document.getElementById('chooseLanguage');
    var sel=s.getElementsByTagName('select')[0];
    var myform=document.getElementById('pageform');
    var lang;
    var reloadOnLanguageChange=false;
    if(document.getElementsByTagName('body')[0].className.indexOf('reloadOnLanguageChange') >= 0){reloadOnLanguageChange=true;}
    if(myform){
	lang=myform.elements['lang'];
    }
    if(!lang){reloadOnLanguageChange=true;}
    var newvalue;
    var newlang=sel.options[sel.selectedIndex].value;
    if(newlang){
	if(!lang && location.href.substr(0,5)=='file:'){
	    var locq = location.href.lastIndexOf('.');
	    if(locq>0){
		newvalue = location.href.substr(0,locq) + '.' + newlang;
	    }
	    location.href=newvalue;
	}
	else {
	    if(myform){
		var slang=myform.elements['Set-Language'];
		if(slang && slang.className && slang.className.indexOf('carryLanguage')<0){
		    appendMissingClass(slang,'carryLanguage');
		    appendMissingClass(myform,'carryLanguage');
		}
		if(lang && lang.className && lang.className.indexOf('bodyAttribute')<0){
		    appendMissingClass(slang,'bodyAttribute');
		    appendMissingClass(myform,'bodyAttribute');
		}
		if(sel.parentNode.firstChild.tagName == 'LEGEND'){
		sel.parentNode.firstChild.innerHTML=LanguageTitle[newlang];
		}
		if(slang){
		    slang.value=newlang;
		}
		if(!reloadOnLanguageChange){
		    lang.value=newlang;
		    updatePageForm();
		    var rerun = document.getElementsByClassName('PureDependsOnLang');
		    for (ip = 0 ; ip < rerun.length ; ip++){
			runPureOnContext(rerun[ip]);
		    }
		}
		else {
		    var newloc = appendPageForm('',myform.className);
		    location.search=newloc;
		}
	    }
	}
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
sel.onchangefn=languageChange;
    var dopt=false;
    var opt;
if(document.getElementsByTagName('html')[0].hasAttribute("xml:lang")){
    dopt=true;
	document.getElementsByTagName('body')[0].setAttribute("lang",
							      document.getElementsByTagName('html')[0].getAttribute("xml:lang"));
opt =document.createElement('option');
opt.value=document.getElementsByTagName('html')[0].getAttribute("xml:lang");
}
    else if(document.getElementsByTagName('body')[0].getAttribute("xml:lang")){
	dopt=true;
	document.getElementsByTagName('body')[0].setAttribute("lang",
							      document.getElementsByTagName('body')[0].getAttribute("xml:lang"));
opt=document.createElement('option');
opt.value=document.getElementsByTagName('body')[0].getAttribute("xml:lang");
}
    if(opt){
opt.innerHTML=Languages[opt.value];
//opt.value="";
sel.appendChild(opt);
    }
for( var i=0 ; i < langList.length ; i++){
    opt=document.createElement('option');
    opt.value=langList[i].hreflang;
    opt.innerHTML=Languages[langList[i].hreflang];
    if(!opt.innerHTML)opt.innerHTML=langList[i].hreflang;
    sel.appendChild(opt);
}
    if(!dopt){
	var myform=document.getElementById('pageform');
	if(myform){
	    var lang=myform.elements['lang'];
	    var slang=myform.elements['Set-Language'];
	    if(slang && slang.value && lang && !lang.value){
		lang.value = slang.value;
	    }
	    if(lang && lang.value){
		sel.value=lang.value;
		if(sel.selectedIndex<0)sel.selectedIndex=1;
	    }
	    if(lang && !lang.value){
		lang.value=sel.options[sel.selectedIndex].value
/* reads user language preference by getting tool documentation */
		getLanguageFrom(uicoreConfig.languageSettingDocument);
	    }
	}
    }
leg.innerHTML=LanguageTitle[sel.options[sel.selectedIndex].value];
fs.appendChild(sel);
var mylist=document.getElementsByClassName("controlBar");
if(mylist.length>0){
var cont=mylist[0];
cont.insertBefore(fs,cont.firstChild);
}
}
}
/* set up old style Google Analytics */
/*var _gaq = _gaq || [];
function setupGA() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  } */
/* set up Google Universal Analytics */
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');


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

function setPageFormVariable(name,newvalue){
var myform=document.getElementById('pageform');
    if(myform){
	if(myform.elements[name]){
	    myform.elements[name].value=newvalue;
	    updatePageForm(myform.elements[name]);
	}
    }
    return true;
}
function setPageForm(){
var myform=document.getElementById('pageform');
    if(!myform){
	var body = document.getElementsByTagName('body')[0];
	myform = document.createElement('form');
	myform.id = 'pageform';
	myform.className='share';
	body.insertBefore(myform,body.firstChild);

    }
if(myform){
    window.onpopstate=updatePageFormFromUrlEvt;
/* makes sure lang element is class bodyAttribute */
    var langgroups = document.getElementsByClassName('langgroup');
    if(langgroups.length > 0) {
	var mylang = myform.elements['lang'];
	if(!mylang){
	    mylang = document.createElement('input');
	    mylang.className='bodyAttribute';
	    mylang.name='lang';
	    mylang.type='hidden';
	    myform.appendChild(mylang);
	}
	appendMissingClass(mylang,'bodyAttribute');
    }
    /* initializes pageform classes */
    var inputs = myform.children;
    var pfclasses = [];
    var clist = myform.className.split(' ');
    for (var i = 0 ; i < clist.length ; i++){
	pfclasses[clist[i]] = true;
    }
    for (var i = 0; i < inputs.length ; i++){
	var inp = inputs[i];

	if(typeof(inp.initialValue) == 'undefined'){
	    inp.initialValue = inp.getAttribute('data-default');
	    if(inp.initialValue && !inp.value){
		inp.value=inp.initialValue;
	    }
	    if(inp.initialValue && inp.type == 'checkbox'){
		inp.initialChecked = inp.checked;
	    }

		}

	clist = inp.className.split(' ');
	for (var j=0; j< clist.length; j++){
	    if(!pfclasses[clist[j]]){
		pfclasses[clist[j]] = true;
		myform.className = myform.className + ' ' + clist[j];
	    }
	}
    }
/* sets form jsonldContext 
jsonldContext == context as written
nsContext == just the namespace declarations
structContext == just the structure declarations -- expanded to not depend on nsContext, 
                 but not changed in meaning: nsContext + structContext is still jsonldContext
*/
    if(myform.nextElementSibling && myform.nextElementSibling.getAttribute('property') == 'iridl:hasJsonldContext'){
	myform.jsonldContext = JSON.parse(myform.nextElementSibling.text);
	var mysplitContext=splitContext(myform.jsonldContext);
	myform.nsContext=mysplitContext[0];
	myform.structContext=mysplitContext[1];
    }
    /* updates values from page url */
var achange=false;
var inputs=myform.elements;
var varcnts = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
	var pair;
        for (var i = 0; i < vars.length; i++) {
            pair = vars[i].split("=");
	    var iname=pair[0];
            if (inputs[iname]) {
	        achange=true;
// decode and encode do not properly invert each other w.r.t. space to + conversion
	        var hold = pair[1].replace(/[+]/g," ");
		if(!varcnts[iname]){
		    varcnts[iname]=0;
		}
		var ipos=varcnts[iname];
		var refvalue = decodeURIComponent(hold);
		if(inputs[iname].length){
		    if(inputs[iname][ipos].type == 'checkbox'){
			for (var ick = 0 ; ick < inputs[iname].length; ick++){
			    if(inputs[iname][ick].value == refvalue){
				inputs[iname][ick].checked = true;
			    }
			    else if(ipos == 0){
				inputs[iname][ick].checked = false;
			    }
			}
		    }
		    else {
			inputs[iname][ipos].value=refvalue;
		    }
		}
		else {
		    inputs[iname].value=refvalue;
		}
		varcnts[iname] = varcnts[iname] + 1;
            }
        }
	updatePageFormCopies(document);
}
    if(history && history.pushState){
	var url = location.href;
	history.replaceState(url,'initial',url);
    }

}
function splitContext(icontext){
    var ns={},struct={};
    ns['@context']={};
    struct['@context']={};
    var mycontext=icontext['@context'];
/* extracts namespace declarations */
    for (var key in mycontext){
	if(typeof(mycontext[key]) == "string"){
	    ns['@context'][key] = expandNS(mycontext[key],mycontext);
	}
    }
/* extracts structures, expanding ns */
    var myns=ns['@context']
    for (var key in mycontext){
	if(typeof(mycontext[key]) != "string"){
	    myhash = mycontext[key];
	    var newhash={};
	    for (var pkey in myhash){
		var curr = expandNS(myhash[pkey],myns);
		newhash[expandNS(pkey,myns)]=curr;
	}
	    struct['@context'][key] = newhash;
	}
    }
    return [ns,struct];
}
function expandNS(curi,ns){
    var rstr = curi;
    if(typeof(curi) == "string"){
    var cat = curi.indexOf(':');
    if (cat > 0){
	var abbr = curi.substring(0,cat);
	var nsexp = ns[abbr];
	if(nsexp){
	    rstr = nsexp + curi.substring(cat+1);
	}
    }
    }
    return rstr;
}
/* onpopstate handler */
function updatePageFormFromUrlEvt(evt){
    updatePageFormFromUrl();
}
function updatePageFormFromUrl(elementtocheck){
    /* updates values from page url */
var myform=document.getElementById('pageform');
if(myform){
var achange=false;
    var inputs;
    if(elementtocheck){
	inputs=[];
	inputs[elementtocheck.name]=elementtocheck;
	inputs[0]=elementtocheck;
    }
    else {
	inputs=myform.elements;
    }
var varcnts = {};
    for(var i=0; i < inputs.length; i++){
	var inp=inputs[i];
	if(typeof(inp.initialValue) != 'undefined' && inp.value != inp.initialValue){
	    achange=true;
	    inp.value = inp.initialValue;
	    
	}
	else if(inp.type == 'checkbox'){
	    if(typeof(inp.initialChecked)=='undefined'){
		inp.initialChecked=true;
	    }
	    if(inp.checked != inp.initialChecked){
		achange=true;
		inp.checked = inp.initialChecked;
	    }
	}
	
    }
        var query = window.location.search.substring(1);
        var vars = query.split("&");
	var pair;
        for (var i = 0; i < vars.length; i++) {
            pair = vars[i].split("=");
	    var iname=pair[0];
            if (inputs[iname]) {
	        achange=true;
// decode and encode do not properly invert each other w.r.t. space to + conversion
	        var hold = pair[1].replace(/[+]/g," ");
		if(!varcnts[iname]){
		    varcnts[iname]=0;
		}
		var ipos=varcnts[iname];
		if(inputs[iname].length){
		    if(inputs[iname][ipos].type == 'checkbox'){
			var newvalue = decodeURIComponent(hold);
			for (var j = ipos; j < inputs[iname].length; j++){
			    if(varcnts[iname] == 0){
				inputs[iname][j].checked = false;
			    }
			if(inputs[iname][j].value == newvalue){
			    inputs[iname][j].checked = true;
			}
		    }
		    }
		    else {
			inputs[iname][ipos].value=decodeURIComponent(hold);
			achange=true;
		    }
		}
		else {
		    var newvalue=decodeURIComponent(hold);
		    inputs[iname].value=newvalue;
		    if(iname=='Set-Language' && inputs['lang'])inputs['lang'].value=newvalue;
		    achange=true;
		}
		varcnts[iname] = varcnts[iname] + 1;
            }
        }
    if(achange){updatePageFormNoHistory()};
}
    if(window.location.hash){
	var mytab = makeTabActiveFromHash(window.location.hash);
	if(mytab){
	    var mylabel = mytab.children[0].innerText;
	    if(mylabel){
		document.title=addTabToTitle(mylabel);
	    }
	}
    }
    else {
	clearTabActive();
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
		    if(myl[j].value != myl[j].initialValue) {allq=false}
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
function setupPageFormLinks(context){
var myform=document.getElementById('pageform');
if(myform){
var clist = myform.className.split(' ');
for ( var i = 0; i < clist.length; i++ )
         {
var cclass=clist[i];
var members = context.getElementsByClassName(cclass);
for ( var j = 0; j < members.length; j++ ) {
if(members[j].href){
members[j].onclick=onClickPageForm;
}
if(members[j].src){
members[j].onload=imageloadedevent;
members[j].onabort=imageabortedevent;
members[j].onerror=imageerrorevent;
appendMissingClass(members[j],'valid');
}
}
}
    setUIHandlers(context);
updatePageFormNoHistory();
}
}
function setUIHandlers(context){
/* pageformcopy form elements copy their values to the pageform */
var stag = context.getElementsByClassName('pageformcopy');
for (var i=0; i< stag.length ; i++){
var sel=stag[i];
if(typeof(sel.onchange) != 'function'){
sel.onchange=pageformcopyonchange;
sel.onchangefn=pageformcopyonchange;
}
}
/* like pageformcopy, but in addition to setting bbox, also sets region to match and clears clickpt */
var stag = context.getElementsByClassName('RegionMenu');
for (var i=0; i< stag.length ; i++){
    var sel=stag[i];
    appendMissingClass(sel,'pageformcopy');
if(typeof(sel.onchange) != 'function'){
sel.onchange=regiononchange;
sel.onchangefn=regiononchange;
}
}
/* popup regionwithinbbox:  sets region to match bbox and clears clickpt */
var stag = context.getElementsByClassName('popup regionwithinbbox');
for (var i=0; i< stag.length ; i++){
    var sel=stag[i];
if(typeof(sel.onchange) != 'function'){
sel.onclick=clearregionwithin;
sel.onclickfn=clearregionwithin;
}
}
/* morecount/moreitem:  provides more button if more moreitem's than count */
    var stag = getElementsByAttribute(context,'*','data-morecount','*');
for (var i=0; i< stag.length ; i++){
    var sel=stag[i];
    var morecount = sel.getAttribute('data-morecount');
    var morechildren = [];
    for (var j=0 ; j< sel.children.length ; j++){
	if (sel.children[j].className && sel.children[j].className.indexOf('moreitem')>-1){
	    morechildren.push(sel.children[j]);
	}
    }

    sel.setAttribute('moreitemcount',morechildren.length);
    if (morecount < morechildren.length-3){
    /* morecount is restrictive */
	appendMissingClass(sel,'hasMoreButton');
	sel.setAttribute('morehide',morechildren.length-morecount);
	sel.onclick=toggleShowAll;
	sel.onclickfn=toggleShowAll;
	for (var j = 0 ; j < morecount ; j++){
	    appendMissingClass(morechildren[j],'belowMoreCount')
	}
    }
    morechildren=sel.getElementsByClassName('moreitem');
    for (var j = 0 ; j < morechildren.length ; j++){
	if(typeof morechildren[j].onclick != 'function'){
	    morechildren[j].onclick=stopevent;
	    morechildren[j].onclickfn=stopevent;
	    morechildren[j].onmouseover=fixglossloc;
	    morechildren[j].onmouseoverfn=fixglossloc;
	}
    }
}
/* ingrid command form */
    var stag = context.getElementsByClassName('ingridcommand');
    for (var i=0; i< stag.length ; i++){
	var aform = stag[i];
	if(typeof aform.onsubmit != 'function'){
	    aform.onsubmit=dopageformcommand;
	    aform.onsubmitfn=dopageformcommand;
	    }
	}
/* property=wn20schema:lexicalForm and rel=wn20schema:containsWordSense */
    var stag = getElementsByAttribute(context,'*','rel','wn20schema:containsWordSense');
    for (var i=0; i< stag.length ; i++){
	var sel=stag[i];
	if(typeof sel.onclick != 'function'){
	    sel.onclick=handleworddef;
	    sel.onclickfn=handleworddef;
	}
    }
/* property=wn30:lexicalForm and rel=wn30:hasSense */
    var stag = getElementsByAttribute(context,'*','rel','wn30:hasSense');
    for (var i=0; i< stag.length ; i++){
	var sel=stag[i];
	if(typeof sel.onclick != 'function'){
	    sel.onclick=handleworddef;
	    sel.onclickfn=handleworddef;
	}
    }
}
function dopageformcommand (evt){
  var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
    var cmd = it.elements["command"].value;
    var url='';
    var ipos = 0;
    while (ipos < cmd.length){
	var ipar= cmd.indexOf("(",ipos);
	if(ipar >= ipos){
	    var pcnt = 1;
	    url = url + cmd.substring(ipos,ipar).replace(/\s+/gm,'/');
	    var cpos = ipar + 1;
	    while (pcnt > 0 && cpos < cmd.length){
		var cch = cmd.substr(cpos,1);
		if (cch == '('){
		    pcnt = pcnt  + 1;
		    }
		else if (cch == ')'){
		    pcnt = pcnt - 1;
		    }
		cpos = cpos + 1;
		}
	    url = url + cmd.substring(ipar,cpos);
	    ipos = cpos;
	    }
	else {
	    url = url + cmd.substr(ipos).replace(/\s+/gm,'/');
	    ipos = cmd.length;
	    }
	}
    if(url.substr(url.length-1) != '/'){
	url = url + '/';
	}
    var cleanurl = encodeURIComponent(url).replace(/%2F/gm,'/');
    if(location.hash){
	cleanurl = cleanurl + location.hash;
	}
    url = appendPageForm(cleanurl,'share carryLanguage');
    location.href=url;
    evt.returnValue=false;
    return false;
}
function handleworddef(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;

    var myglossary = getElementsByAttribute(document,'link','rel','iridl:hasGlossary');
    if(myglossary){
	var qurl = myglossary[0].getAttribute('href');
	var word=it.getAttribute('resource');
	if(word.substr(0,1)=='['){
	    word = word.substr(1,word.length-2);
	}
	document.location.href= qurl + '?word=' + encodeURIComponent(word);
    }
}
/* this is a work around for a webkit position: absolute bug in multicolumn layout.  Hopefully will be unnecessary someday, though was reported a year ago for Chromium.  
Note that it assumes gloss is defined with position absolute relative to the page, an intervening position: relative will mess things up.
 2014-10-13 */
function fixglossloc(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
    var isWebkit = 'WebkitAppearance' in document.documentElement.style;
    if(isWebkit){
    var mylbl = it.getElementsByClassName("lbl");
    var mygloss = it.getElementsByClassName("gloss");
    if(mylbl.length > 0 && mygloss.length > 0){
	mygloss[0].style.top=(absTop(mylbl[0])+mylbl[0].offsetHeight+5)+'px';
	mygloss[0].style.left=absLeft(mylbl[0])+'px';
    }
    }
}
function toggleShowAll(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
    toggleClass(it,'ShowAll');
    var forcereflow=it.offsetHeight;
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
	var myinput;
	if(iname.form){
	    myinput = iname;
	}
	else {
	    myinput=myform.elements[iname];
	}
	if(myinput){
	    if(myinput.className){
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
}
/* support for langgroup -- attribute is maintained as list of all lang contained within, so selection can be done with css */
function updateLangGroups(context){
    var langgroupstyle = document.getElementById('langgroupstyle');
    if(!langgroupstyle){
	langgroupstyle = document.createElement('style');
	langgroupstyle.id='langgroupstyle';
	langgroupstyle.innerHTML = ".langgroup [lang] {display:inline}\n\
.langgroup [lang] + [lang] {display:none}\n";
	var ref = document.getElementsByTagName('script')[0];
	ref.parentNode.insertBefore(langgroupstyle,ref);
	langgroupstyle.langs={};
    }
    var langgroups = context.getElementsByClassName('langgroup');
    for (var i = 0; i < langgroups.length ; i++){
	var mygrp = langgroups[i];
	var langs = {};
/* copies xml:lang attributes to lang if they exist */
	var langlist = getElementsByAttribute(mygrp,'*','xml:lang','*');
	for (var j=0; j < langlist.length ; j++){
	    if(!langlist[j].getAttribute('lang')){
		langlist[j].setAttribute('lang',langlist[j].getAttribute('xml:lang'));
	    }
	}
	langlist = getElementsByAttribute(mygrp,'*','lang','*');
	for (var j=0; j < langlist.length ; j++){
	    langs[langlist[j].getAttribute('lang')]="1";
	}
	var keys = new Array();
	for (var key in langs){
	    keys.push(key);
	    if(!langgroupstyle.langs[key]){
		langgroupstyle.langs[key]='1';
		var ctarget = 'body[lang="' + key + '"] .langgroup[langgroup~="' + key + '"] [lang]';
		langgroupstyle.innerHTML += ctarget + ' {display: none}\n' ;
		ctarget = 'body[lang="' + key + '"] .langgroup[langgroup~="' + key + '"] [lang="' + key + '"]';
		langgroupstyle.innerHTML += ctarget + ' {display: inline}\n' ;
	    }
	}
	mygrp.setAttribute('langgroup',keys.join(' '));
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
function updatePageFormQuietly(changedInput, newvalue, guessvalue,historyid){
var addhistory=true;
    updatePageFormSub(true,changedInput, newvalue, guessvalue,historyid,addhistory);
}
function updatePageForm(changedInput, newvalue, guessvalue,historyid){
var addhistory=true;
    updatePageFormSub(false,changedInput, newvalue, guessvalue,historyid,addhistory);
}
function updatePageFormNoHistory(changedInput, newvalue, guessvalue){
var addhistory=false;
    updatePageFormSub(false,changedInput, newvalue, guessvalue,undefined,addhistory);
}
function updatePageFormSub(quietflag,changedInput, newvalue, guessvalue,historyid,addhistory){
var myform=document.getElementById('pageform');
if(myform){
updatePageFormConditionalClassesAndFlags(true);
var clist;
if(changedInput){
    if(changedInput.className){
clist = changedInput.className.split(' ');
    }
    else {
	clist = [];
    }
    if(typeof(newvalue)!='undefined'){
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
var newsrc = appendPageForm(cmem.src,cmem.className);
if(newsrc != cmem.src){
if(!quietflag) {
changeClass(cmem,'valid','invalid');
    relStartLoading(cmem);
    clearFailed(cmem);
}
    cmem.src = newsrc;
}
}
if(cmem.tagName == 'LINK' || cmem.tagName == 'A'){
var newsrc = appendPageForm(cmem.href,cmem.className);
if(newsrc != cmem.href){
    if(!cmem.sourcehref){
	cmem.sourcehref = cmem.href;
    }
    cmem.href = newsrc;
    if(cmem.rel == 'iridl:hasJSON'){
	updateHasJSON(cmem);
    }
    if(cmem.rel == 'iridl:hasFigure'){
	updateHasFigure(cmem);
    }
    if(cmem.rev == 'section'){
	updateHasSectionList(cmem);
    }
}
}
if(cmem.tagName == 'SCRIPT'){
    if(cmem.getAttribute('property') == 'iridl:hasSerqlQuery'){
	var links = getElementsByAttribute(cmem.parentNode,'*','rel','iridl:hasSparqlEndpoint');
	if(links.length>0)updateHasRqlQuery(links[0],cmem,'serql');
    }
    if(cmem.getAttribute('property') == 'iridl:hasSparqlQuery'){
	var links = getElementsByAttribute(cmem.parentNode,'*','rel','iridl:hasSparqlEndpoint');
	if(links.length>0)updateHasRqlQuery(links[0],cmem,'sparql');
    }
}
if(cmem.tagName == 'DIV'){
    if(cmem.getAttribute('data-href') && cmem.indexOf('share')>=0 ) {
    var url = appendPageForm(location.href,'share');
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
var newsrc = appendPageForm(cmem.src,cmem.className);
if(newsrc != cmem.src){
if(!quietflag) {
changeClass(cmem,'valid','invalid');
    appendMissingClass(cmem,'loading');
    clearFailed(cmem);
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
var newsrc = appendPageForm(cmem.src,cmem.className);
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
    if(addhistory && history && history.pushState){
	var url = appendPageForm(location.href,'share carryLanguage');
	var currentstate = history.state;
	if(location.href != url){
	    var newstate = historyid;
	    if(!historyid){
		newstate=url;
	    }
	    if(currentstate == historyid){
	    history.replaceState(newstate,'update',url);
	    }
	    else {
	    history.pushState(newstate,'update',url);
	    }
	}
    }
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
if(myregion && myregion.length){
    myregion=myregion[0];
}
if(myclickpt && myclickpt.value){
    within = true;
}
else {
if (mybb && mybb.value && mybb.value.length>8 && myregion && myregion.value.length > 8){
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
if(myform.className.indexOf('bodyClass')>=0){
    var mylist = myform.elements;
    var thebody = document.getElementsByTagName('body')[0];
    for (var i=0 ; i < mylist.length ; i++){
	if(mylist[i].className.indexOf('bodyClass')>=0){
	    var value = mylist[i].name + mylist[i].value.replace(/[: .,@#]/g,'');
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
if(myform.className.indexOf('bodyAttribute')>=0){
    var mylist = myform.elements;
    var thebody = document.getElementsByTagName('body')[0];
    var bodyvars = {};
   for (var i=0 ; i < mylist.length ; i++){
	if(mylist[i].className.indexOf('bodyAttribute')>=0){
	    if(!bodyvars[mylist[i].name]){
		bodyvars[mylist[i].name] = myform.elements[mylist[i].name];
	    }
	}
    }
    for (var key in bodyvars){
	var myinputs = bodyvars[key];
	if(myinputs.length){
	    var use = [];
	    for (var i=0 ; i < myinputs.length; i++){
		if(myinputs[i].value && !(myinputs[i].type == 'checkbox' && !myinputs[i].checked)){
		    use.push(myinputs[i].value);
		}
	    }
	    if(use.length){
		thebody.setAttribute(key,use.join(' '));
	    }
	    else {
		thebody.removeAttribute(key);
	    }
	}
	else {
	    if(myinputs.value){
		thebody.setAttribute(key,myinputs.value);
		if(key == 'lang' && thebody.getAttribute('xml:lang')){
		    thebody.setAttribute('xml:lang',myinputs.value);
		}
	    }
	    else {
		thebody.removeAttribute(key);
	    }
	}
    }
}
/* does hasValueList */
    var mylist = document.getElementsByClassName('hasValueList');
    for (var i=0 ; i < mylist.length ; i++)
    {
	var it=mylist[i];
 // change class of parent whether single (value in list) or multi (value not in list)
	if(it.parentNode.info && it.parentNode.info['iridl:gridvalues']){
	    var cin = it.parentNode.info['iridl:gridvalues']['iridl:valuelist'].indexOf(it.value);
	    var cmax = it.parentNode.info['iridl:gridvalues']['iridl:valuelist'].length-1;
	    if(cin > -1){
		changeClass(it.parentNode,'multiValue','singleValue');
	    }
	    else {
		changeClass(it.parentNode,'singleValue','multiValue');
	    }
	    if(cin > 0){
		changeOrAppendClass(it.parentNode,'atLower','aboveLower');
	    }
	    else if(cin == 0){
		changeOrAppendClass(it.parentNode,'aboveLower','atLower');
	    }
	    if(cin >= 0 && cin < cmax){
		changeOrAppendClass(it.parentNode,'atUpper','belowUpper');
	    }
	    else if(cin == cmax){
		changeOrAppendClass(it.parentNode,'belowUpper','atUpper');
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
	if(elbyname[0].type == 'checkbox'){
	    /* multivalued copy -- checkbox */
	    for(var j = elbyname.length; j-- ;){
		if(elbyname[j].value == sel.value){
		    sel.checked = elbyname[j].checked;
		}
	    }
	}
	else {
	    /* multivalued but not checkbox 
	      looks for matching values to set checkboxes
	    */
	    if(sel.type == 'checkbox') {
	    /* multivalued copy to checkbox */
		var ifchecked = false;
	    for(var j = elbyname.length; j-- ;){
		if(elbyname[j].value == sel.value){
		    ifchecked=true;
		    break;
		}
	    }
		sel.checked=ifchecked;
		if(ifchecked){sel.disabled=false;}
	    }
	    else {
		/* not a checkbox -- just copies first */
		var ind = 0;
		var myind = sel.getAttribute('data-nameindex');
		if(myind){ind = myind};
		cval = myform.elements[sel.name][ind].value;
		if((typeof(sel.value) != 'undefined') && cval && sel.value != cval){
		    sel.value=cval;
		}
	    }
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
    sel.previousSibling.setAttribute('value',"");
}
for (var j=0; j < options.length ; j++){
if(options[j].value == cval){
sel.selectedIndex=j;
if(sel.previousSibling.className == 'selectvalue'){
sel.previousSibling.innerHTML=sel.options[sel.selectedIndex].innerHTML;
    sel.previousSibling.setAttribute('value',sel.options[sel.selectedIndex].value);
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
/* checks for null region and bbox not null */
    var region = myform.elements['region'];
    var bbox = myform.elements['bbox'];
    if(region && typeof(region.value)!='undefined'){
	if((!region.value) && typeof(bbox)!='undefined' && bbox.value !=''){
	    region.value = bbox.value;
	    valid=false;
	}
    }
    var stag = mycontext.getElementsByClassName('containsAllValids');
for (var i=0; i< stag.length ; i++){
var sel=stag[i];
if(sel.selectedIndex == -1 && typeof(myform.elements[sel.name]) != 'undefined'){
    valid=false;
    sel.selectedIndex=0;
    if(sel.selectedIndex == 0){
myform.elements[sel.name].value=sel.options[sel.selectedIndex].value;
if(sel.previousSibling.className == 'selectvalue'){
sel.previousSibling.innerHTML=sel.options[sel.selectedIndex].innerHTML;
    sel.previousSibling.setAttribute('value',sel.options[sel.selectedIndex].value);
}
    }
 }   
}
if(!valid){
    var historyid;
    if(history){
	    historyid = history.state;
    }
    updatePageForm(undefined,undefined,undefined,historyid);
}
}
}
function imageabortedevent(evt){
    evt = (evt) ? evt : ((event) ? event : null );
    var it = (evt.currentTarget) ? evt.currentTarget : evt.srcElement;
    relStopLoading(it,'loading');
}
function imageerrorevent(evt){
    evt = (evt) ? evt : ((event) ? event : null );
    var it = (evt.currentTarget) ? evt.currentTarget : evt.srcElement;
    relStopLoading(it,'loading');
    setFailed(it);
}
function imageloadedevent(evt){
    evt = (evt) ? evt : ((event) ? event : null );
var it = (evt.currentTarget) ? evt.currentTarget : evt.srcElement;
changeClass(it,'invalid','valid');
changeClass(it,'invalid-zooming','valid');
    relStopLoading(it,'loading');
if(it.className.indexOf('dlimg') >=0){
if(it.mylink){
var mynode = it.mylink.parentNode;
/* transitions are slightly separate to avoid vibration */
if(it.height>3.1*it.width && mynode.className.indexOf('narrow')<0){
mynode.className = mynode.className + ' narrow';
}
if(it.height<2.9*it.width && mynode.className.indexOf('narrow')>0){
mynode.className = mynode.className.replace(' narrow','');
}
if(it.height<2.9*it.width &&  it.height>1.5*it.width && mynode.className.indexOf('tall')<0){
mynode.className = mynode.className + ' tall';
}
if((it.height<1.3*it.width || it.height>3.1*it.width)&& mynode.className.indexOf('tall')>0){
mynode.className = mynode.className.replace(' tall','');
}
if(it.height*2<it.width && mynode.className.indexOf('wide')<0){
mynode.className = mynode.className + ' wide';
}
if(it.height*1.8>it.width && mynode.className.indexOf('wide')>0){
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
var delp = targetsize - plen;
/* only makes image size changes greater than 20 */
if(delp >= 21 || delp <= -21){
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
if(targetclass && targetclass.indexOf(slist[i]) >=0){
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
    return !match;
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
function sameasthis(ele){return ele=this};
function changeClassWithin(pelement,fromclass,toclass){
var classlist = pelement.className.split(' ');
if(classlist.some(sameasthis,fromclass)){
    var newlist = new Array;
    for (var i = classlist.length-1 ; i >=0 ; i--){
	if(classlist[i] == fromclass){
	    newlist[i] = toclass;
	}
	else {
	newlist[i] = classlist[i];
	}
    }
	
    pelement.className = newlist.join(' ');
}
var targetlist=pelement.getElementsByClassName(fromclass);
if(targetlist.length > 0){
for (var i = targetlist.length-1 ; i >= 0; i--){
var ind=targetlist[i];
var classlist = ind.className.split(' ');
var newlist = new Array;
    for (var i = classlist.length-1 ; i >=0 ; i--){
	if(classlist[i] == fromclass){
	    newlist[i] = toclass;
	}
	else {
	newlist[i] = classlist[i];
	}
    }
	
    ind.className = newlist.join(' ');
}
}
}
function changeOrAppendClass(pelement,fromclass,toclass){
    changeClass(pelement,fromclass,toclass);
    appendMissingClass(pelement,toclass);
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
/* alldisabledPageForm -- disables FormElements that are default or not in classes,
returns true if all default values or not in classes */
function alldisabledPageForm(classes,includeDefaultValues){
    var myform=document.getElementById('pageform');
    var alldisabled;
    if(myform){
	var inputs=myform.elements;
        for (var i = 0; i < inputs.length; i++) {
	    inputs[i].disabled=true;
	}
	alldisabled=true;
	var clist = classes.split(' ');
	for ( var ic = 0; ic < clist.length; ic++ ){
	    var cclass=clist[ic].replace('&',' ');
	    var members = document.getElementsByClassName(cclass);
	    for ( var j = 0; j < members.length; j++ )
		if(members[j].disabled) {
		    if(members[j].type != 'checkbox' && members[j].value){
			if(includeDefaultValues || members[j].initialValue != members[j].value){
			    alldisabled=false;
			    var myname=members[j].name;
			    members[j].disabled=false;
			    for (var k=j;k--;){
				if(members[k].disabled && members[k].name == myname){
				    members[k].disabled=false;
				}
			    }
			}
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
    }
    return alldisabled;
}
/*
submitPageForm -- submits pageform to href, appending inputs corresponding to class.
*/
function submitPageForm(href,classes,inMethod){
    var localhref=localHrefOf(removePageForm(href));
var theMethod='GET';
if(inMethod){
    theMethod=inMethod;
}
var myform=document.getElementById('pageform');
if(myform){
    var alldisabled=alldisabledPageForm(classes);
    if(alldisabled && theMethod == 'GET'){
	if(localhref.substring(0,5) =='file:'){
/*
	    if(localhref.charAt(localhref.length-1) == '/'){
		localhref=localhref+'index.html';
	    }
*/
	}
	document.location.href=localhref;
    }
    else {
/* our rewrite rules do not handle Set-Language for a directory, so we avoid doing it
	if(localhref.charAt(localhref.length-1) == '/'){
	    localhref=localhref+'index.html';
	}
 */
	if(localhref.indexOf('?')>0){
	    localhref = appendPageForm(href,classes,false);
	    document.location.href=localhref;
	}
	else {
	myform.action=localhref;
	myform.method=theMethod;
	myform.submit();
	}
    }
}
else {
    document.location.href=localhref;
}
}
/* removePageForm -- removes all values in url that exist in page form
*/
function removePageForm(href,overridePageForm){
    var newhref = href;
    var myform=document.getElementById('pageform');
    if(href && myform){
	var action = String(href);
	var thehash;
	if(action.indexOf && action.indexOf("#") >= 0){
	    thehash = action.substring(action.indexOf('#'));
	    action=action.substring(0,action.indexOf('#'));
	}
	var inputs=myform.elements;
	var hrefparts = action.split('?');
	var newhref=hrefparts[0];
        var query = hrefparts[1];
	if(query){
	    var delim='?';
	    var vars = query.split("&");
		var pair;
		for (var i = 0; i < vars.length; i++) {
		    pair = vars[i].split("=");
		    var iname=pair[0];
		    if (!inputs[iname]) {
			newhref=newhref + delim + vars[i];
			delim='&';
		    }
		    else if(overridePageForm) {
			inputs[iname].value = unescape(pair[1]);
		    }
		}
	}
	if(thehash){
	    newhref=newhref+thehash;
	}
    }
    return newhref;
}
/*
appendPageForm -- appends to href, appending pageform inputs corresponding to class.
*/
function appendPageForm(href,classes,includeDefaultValues,overridePageForm){
    var filtered =removePageForm(href,overridePageForm);
    var localhref=localHrefOf(filtered);
    var myform=document.getElementById('pageform');
    if(myform){
	var alldisabled=alldisabledPageForm(classes,includeDefaultValues);
	if(alldisabled){
	    return localhref;
	}
	else {
	    var action = localhref;
	    var thehash;
	    if(action.indexOf("#") >= 0){
		thehash = action.substring(action.indexOf('#'));
		action=action.substring(0,action.indexOf('#'));
	    }
	    var inputs=myform.elements;
	    if(action.indexOf("?") >= 0){
		delim='&';
	    }
	    else {
		delim= '?';
	    }
	    for (var i = 0; i < inputs.length; i++) {
		var myinput=inputs[i];
		if(!myinput.disabled){
		    if(myinput.type != 'checkbox' || myinput.checked){
			action = action + delim + myinput.name + '=' + encodeURIComponent(myinput.value);
			delim='&'
		    }
		}
	    }
	    if(thehash){
		action = action + thehash;
	    }
	    return action;
	}
    }
    else {
	return localhref;
    }
}
/* special character remapper until localCompare with language argument is fully supported on browsers */
var defaultDiacriticsRemovalap = [
    {'base':'A', 'letters':'\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F'},
    {'base':'AA','letters':'\uA732'},
    {'base':'AE','letters':'\u00C6\u01FC\u01E2'},
    {'base':'AO','letters':'\uA734'},
    {'base':'AU','letters':'\uA736'},
    {'base':'AV','letters':'\uA738\uA73A'},
    {'base':'AY','letters':'\uA73C'},
    {'base':'B', 'letters':'\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181'},
    {'base':'C', 'letters':'\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E'},
    {'base':'D', 'letters':'\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779'},
    {'base':'DZ','letters':'\u01F1\u01C4'},
    {'base':'Dz','letters':'\u01F2\u01C5'},
    {'base':'E', 'letters':'\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E'},
    {'base':'F', 'letters':'\u0046\u24BB\uFF26\u1E1E\u0191\uA77B'},
    {'base':'G', 'letters':'\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E'},
    {'base':'H', 'letters':'\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D'},
    {'base':'I', 'letters':'\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197'},
    {'base':'J', 'letters':'\u004A\u24BF\uFF2A\u0134\u0248'},
    {'base':'K', 'letters':'\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2'},
    {'base':'L', 'letters':'\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780'},
    {'base':'LJ','letters':'\u01C7'},
    {'base':'Lj','letters':'\u01C8'},
    {'base':'M', 'letters':'\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C'},
    {'base':'N', 'letters':'\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4'},
    {'base':'NJ','letters':'\u01CA'},
    {'base':'Nj','letters':'\u01CB'},
    {'base':'O', 'letters':'\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C'},
    {'base':'OI','letters':'\u01A2'},
    {'base':'OO','letters':'\uA74E'},
    {'base':'OU','letters':'\u0222'},
    {'base':'OE','letters':'\u008C\u0152'},
    {'base':'oe','letters':'\u009C\u0153'},
    {'base':'P', 'letters':'\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754'},
    {'base':'Q', 'letters':'\u0051\u24C6\uFF31\uA756\uA758\u024A'},
    {'base':'R', 'letters':'\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782'},
    {'base':'S', 'letters':'\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784'},
    {'base':'T', 'letters':'\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786'},
    {'base':'TZ','letters':'\uA728'},
    {'base':'U', 'letters':'\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244'},
    {'base':'V', 'letters':'\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245'},
    {'base':'VY','letters':'\uA760'},
    {'base':'W', 'letters':'\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72'},
    {'base':'X', 'letters':'\u0058\u24CD\uFF38\u1E8A\u1E8C'},
    {'base':'Y', 'letters':'\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE'},
    {'base':'Z', 'letters':'\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762'},
    {'base':'a', 'letters':'\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250'},
    {'base':'aa','letters':'\uA733'},
    {'base':'ae','letters':'\u00E6\u01FD\u01E3'},
    {'base':'ao','letters':'\uA735'},
    {'base':'au','letters':'\uA737'},
    {'base':'av','letters':'\uA739\uA73B'},
    {'base':'ay','letters':'\uA73D'},
    {'base':'b', 'letters':'\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253'},
    {'base':'c', 'letters':'\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184'},
    {'base':'d', 'letters':'\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A'},
    {'base':'dz','letters':'\u01F3\u01C6'},
    {'base':'e', 'letters':'\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD'},
    {'base':'f', 'letters':'\u0066\u24D5\uFF46\u1E1F\u0192\uA77C'},
    {'base':'g', 'letters':'\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F'},
    {'base':'h', 'letters':'\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265'},
    {'base':'hv','letters':'\u0195'},
    {'base':'i', 'letters':'\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131'},
    {'base':'j', 'letters':'\u006A\u24D9\uFF4A\u0135\u01F0\u0249'},
    {'base':'k', 'letters':'\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3'},
    {'base':'l', 'letters':'\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747'},
    {'base':'lj','letters':'\u01C9'},
    {'base':'m', 'letters':'\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F'},
    {'base':'n', 'letters':'\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5'},
    {'base':'nj','letters':'\u01CC'},
    {'base':'o', 'letters':'\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275'},
    {'base':'oi','letters':'\u01A3'},
    {'base':'ou','letters':'\u0223'},
    {'base':'oo','letters':'\uA74F'},
    {'base':'p','letters':'\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755'},
    {'base':'q','letters':'\u0071\u24E0\uFF51\u024B\uA757\uA759'},
    {'base':'r','letters':'\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783'},
    {'base':'s','letters':'\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B'},
    {'base':'t','letters':'\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787'},
    {'base':'tz','letters':'\uA729'},
    {'base':'u','letters': '\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289'},
    {'base':'v','letters':'\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C'},
    {'base':'vy','letters':'\uA761'},
    {'base':'w','letters':'\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73'},
    {'base':'x','letters':'\u0078\u24E7\uFF58\u1E8B\u1E8D'},
    {'base':'y','letters':'\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF'},
    {'base':'z','letters':'\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763'}
];

var diacriticsMap = {};
for (var i=0; i < defaultDiacriticsRemovalap.length; i++){
    var letters = defaultDiacriticsRemovalap[i].letters.split("");
    for (var j=0; j < letters.length ; j++){
        diacriticsMap[letters[j]] = defaultDiacriticsRemovalap[i].base;
    }
}

// "what?" version ... http://jsperf.com/diacritics/12
function removeDiacritics (str) {
    return str.replace(/[^\u0000-\u007E]/g, function(a){ 
	return diacriticsMap[a] || a; 
    });
}

// GitHub setup
function githubSetup(){
var githubform=document.getElementsByClassName('githubconnect');
if(githubform[0]){
githubform[0].onsubmit=dogithub;
githubform[0].onsubmitfn=dogithub;
githubform[0].elements["github"].onchange=dogithubjson;
githubform[0].elements["github"].onchangefn=dogithubjson;
var gid = getCookie('githubid');
if(gid){
githubform[0].elements["github"].value=gid;
setgithubjson(gid);
}
}
}
function getCookie(wantid){
var cookies=document.cookie;
var cookielist=cookies.split(';')
for(var i=0; i<cookielist.length ; i++){
	var apair=cookielist[i].split("=");
	var cname=apair[0];
	while(cname.charAt(0)==' ')cname = cname.substring(1);
	if(cname.indexOf(wantid) == 0)return apair[1];
}
return "";
}
function dogithub(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
document.cookie="githubid=" + it.elements["github"].value;
return false;
}
function dogithubjson(evt){
   var evt = (evt) ? evt : ((event) ? event : null );
   var it = (evt.currentTarget) ? evt.currentTarget : this;
setgithubjson(it.value);
}
function getCookie(wantid){
var cookies=document.cookie;
var cookielist=cookies.split(';')
for(var i=0; i<cookielist.length ; i++){
	var apair=cookielist[i].split("=");
	var cname=apair[0];
	while(cname.charAt(0)==' ')cname = cname.substring(1);
	if(cname.indexOf(wantid) == 0)return apair[1];
}
return "";
}
function setgithubjson(newname){
var githubjson=document.getElementById('githubjson');
if(githubjson){
githubjson.href='https://api.github.com/users/' + newname;
updateHasJSON(githubjson);
}
var githubgistjson=document.getElementById('githubgistjson');
if(githubgistjson){
githubgistjson.href='https://api.github.com/users/' + newname + '/gists';
updateHasJSON(githubgistjson);
}
}

// loadmaproom is run once (at DOMContentLoaded if possible, or onload).
var loadmaproomneeded=true;
$.ready(
function loadmaproom(){
if(loadmaproomneeded){
loadmaproomneeded=false;
    var mybody = document.getElementsByTagName('body')[0];
    if(window.name){
	mybody.setAttribute('within',window.name);
    }
setPageForm();
tabsSetup();
insertcontrolBar();
initializeDLimage();
insertchooseSection();
insertRegion();
insertshare();
insertInstructions();
setupPageFormLinks(document);
    updateLangGroups(document);
loadHasJSON();
loadHasSparqlEndpoint();
githubSetup();
if(uicoreConfig.GoogleAnalyticsId){
/*  _gaq.push(['_setAccount', uicoreConfig.GoogleAnalyticsId]);
  _gaq.push(['_trackPageview']);
  _gaq.push(['_trackPageLoadTime']); 
    setupGA();
*/
  ga('create', uicoreConfig.GoogleAnalyticsId, 'columbia.edu');
  ga('send', 'pageview');
}
    if(uicoreConfig.GoogleSearchCX){
var mynav=document.getElementById('GoogleSearch');
	if(mynav){
	    var sb = document.createElement('div');
	    var sbb = document.createElement('gcse:searchbox-only');
	    sb.appendChild(sbb);
	    mynav.appendChild(sbb);
  (function() {
    var cx = uicoreConfig.GoogleSearchCX;
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
        '//www.google.com/cse/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();
    }
    }
}
}
);
