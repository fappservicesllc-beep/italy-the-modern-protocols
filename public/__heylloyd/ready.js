(function(){
  function notify(){
    try { window.parent.postMessage({type:"heylloyd:app-ready"}, "*"); } catch(e){}
  }
  function arm(){
    requestAnimationFrame(function(){ requestAnimationFrame(notify); });
  }
  if (document.readyState === "complete") arm();
  else window.addEventListener("load", arm);
})();
