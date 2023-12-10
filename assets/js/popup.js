var statusIcon, statusTitle;
chrome.tabs.query({
    active: true,
    currentWindow: true
}, function(tabs) {
  var url = new URL(tabs[0].url);
  statusIcon = document.getElementById('status_icon');
  statusTitle = document.getElementById('status_title');
  if( url.hostname.match(/\.shaparak\.ir$/i) && url.protocol == "https:" ){
    statusTitle.className = "status_title_ok";
    statusTitle.innerHTML = 'درگاه پرداخت امن، مطمئن باش';
    statusIcon.src = 'assets/images/icon_ok.png';
  }else{
    statusTitle.className = "status_title_nok";
    statusTitle.innerHTML = 'این صفحه یک درگاه پرداخت نیست. تنها در صورت مشاهده تیک سبز رنگ، مطمئن باش که یک درگاه امن و معتبر است.';
    statusIcon.src = 'assets/images/icon_128.png';
  }
});
