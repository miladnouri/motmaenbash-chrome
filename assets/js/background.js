// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);

// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {

  if (tab.url != undefined && changeInfo.status == "complete") {
    //show the page action.
    chrome.pageAction.show(tabId);
    var url = new URL(tab.url);
    if( url.hostname.match(/\.shaparak\.ir$/i) && url.protocol == "https:" ){
      chrome.pageAction.setIcon({
      tabId: tabId,
      path: {
          128: "/assets/images/icon_ok.png"
        }
      });
      chrome.pageAction.setTitle({
          tabId: tabId,
          title: "درگاه پرداخت امن، مطمئن باش"
      });
    }else{
      // Do Nothing
    }

  }

};