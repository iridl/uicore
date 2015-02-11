var uicheck = typeof(uicoreConfig);
var uicoreConfig = uicoreConfig || {};
if(uicheck == 'undefined'){
var head = document.getElementsByTagName('head')[0];
var newel = document.createElement('script');
newel.type='text/javascript';
newel.src='/uicore/uicore.js';
head.insertBefore(newel,head.firstChild);
newel = document.createElement('link');
newel.rel='stylesheet';
newel.type='text/css';
newel.href='/localconfig/ui.css';
head.insertBefore(newel,head.firstChild);
newel = document.createElement('link');
newel.rel='stylesheet';
newel.type='text/css';
newel.href='/uicore/uicore.css';
head.insertBefore(newel,head.firstChild);
}
