// Content script for MotmaenBash extension
// Handles displaying security verification mark on web pages

// Create security verification overlay
function createSecurityOverlay(message) {
  // Remove existing overlay if any
  const existingOverlay = document.getElementById('motmaenBashCornerSign');
  if (existingOverlay) {
    existingOverlay.remove();
  }
  
  const overlayDiv = document.createElement('div');
  overlayDiv.id = 'motmaenBashCornerSign';
  
  if (message.className) {
    overlayDiv.className = message.className;
  }
  
  let imgSrc = chrome.runtime.getURL('assets/images/sign.png');
  if (message.icon && message.icon.includes('icon_danger.png')) {
    imgSrc = chrome.runtime.getURL('assets/images/icon_danger.png');
  } else if (message.icon && message.icon.includes('icon_ok.png')) {
    imgSrc = chrome.runtime.getURL('assets/images/sign.png');
  }
  
  overlayDiv.innerHTML = `<a href="https://motmaenbash.milad.nu" target="_blank">
    <img title="${message.description || 'مطمئن باش'}" 
    id="motmaenBashCornerSignLogo" 
    src="${imgSrc}"/>
  </a>`;
  
  document.body.insertBefore(overlayDiv, document.body.firstChild);
}

// Initial check for current URL
const url = new URL(location.href);
if (url.hostname.match(/\.shaparak\.ir$/i)) {
  chrome.runtime.sendMessage({ action: 'checkSecurity', url: location.href }, (response) => {
    if (response && response.message) {
      createSecurityOverlay(response.message);
    } else {
      // Default secure for shaparak.ir domains with HTTPS
      if (url.protocol === 'https:') {
        createSecurityOverlay({
          description: 'این درگاه پرداخت معتبر و امن است',
          icon: 'assets/images/icon_ok.png'
        });
      }
    }
  });
}

// Listen for security updates from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateSecurity') {
    createSecurityOverlay(message.message);
    sendResponse({ success: true });
  }
  return true;
});
