var url = new URL(location.href);
// alert(url.hostname);
if( (url.hostname.match(/\.shaparak\.ir$/i) ) && url.protocol == "https:" ){
  var overlayDiv=document.createElement("div");
  overlayDiv.id = "motmaenBashCornerSign";
  overlayDiv.innerHTML = '<a href="https://motmaenbash.milad.nu" target="_blank"><img title="این درگاه پرداخت معتبر و امن است" id="motmaenBashCornerSignLogo" src="' + chrome.runtime.getURL('assets/images/sign.png') + '"/></a>'
  document.body.insertBefore(overlayDiv, document.body.firstChild);
}
