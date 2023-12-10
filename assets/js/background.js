// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);

// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {

  if (tab.url != undefined && changeInfo.status == "complete") {
    var url = new URL(tab.url);
    console.log(tab.url);
    console.log(url);
    //show the page action.
    if( url.hostname.match(/\.shaparak\.ir$/i) && url.protocol == "https:" ){
      chrome.action.setIcon({
      tabId: tabId,
      path: {
          128: "/assets/images/icon_ok.png"
        }
      });
      chrome.action.setTitle({
          tabId: tabId,
          title: "درگاه پرداخت امن، مطمئن باش"
      });
    }else{
      // Do Nothing
    }

  }

};