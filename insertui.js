var uicheck = typeof(uicoreConfig);
var uicoreConfig = uicoreConfig || {};
if(uicheck == 'undefined'){
var slist=document.getElementsByTagName('script');
var scriptsrc='';
for (var i=0; i<slist.length; i++){
var shref=slist[i].src;
if(shref.substr(shref.length-11,11) == 'insertui.js'){
scriptsrc=shref;
break;
}
}
var scriptroot="/uicore/";
var localconfigroot="/localconfig/";
if(scriptsrc){
scriptroot = scriptsrc.substr(0,scriptsrc.indexOf('insertui.js'));
localconfigroot = scriptsrc.substr(0,scriptsrc.indexOf('uicore/insertui.js'))+'localconfig/';
}
var head = document.getElementsByTagName('head')[0];
var newel = document.createElement('script');
newel.type='text/javascript';
newel.src=scriptroot + 'uicore.js';
head.insertBefore(newel,head.firstChild);
newel = document.createElement('link');
newel.rel='stylesheet';
newel.type='text/css';
newel.href=localconfigroot + 'ui.css';
head.insertBefore(newel,head.firstChild);
newel = document.createElement('link');
newel.rel='stylesheet';
newel.type='text/css';
newel.href=scriptroot + 'uicore.css';
head.insertBefore(newel,head.firstChild);
}
