// Popup script for MotmaenBash extension
// Handles displaying security information in the popup

import { getTypeName, getLevelName } from './utils.js';

document.addEventListener('DOMContentLoaded', function() {
  const statusIcon = document.getElementById('status_icon');
  const statusTitle = document.getElementById('status_title');
  const detailsContainer = document.createElement('div');
  detailsContainer.id = 'security_details';
  
  // Get security information from storage
  chrome.storage.local.get(['currentUrl', 'securityResult', 'message'], function(data) {
    if (data.currentUrl && data.message) {
      statusIcon.src = data.message.icon;
      statusTitle.className = data.message.className || 'status_title_nok';
      statusTitle.innerHTML = data.message.title;
      
      if (data.securityResult && data.securityResult.secure === false) {
        const typeName = getTypeName(data.securityResult.type);
        const levelName = getLevelName(data.securityResult.level);
        const matchType = data.securityResult.match === 1 ? 'دامنه' : 'آدرس کامل';
        
        detailsContainer.innerHTML = `
          <div class="security_detail">
            <span class="detail_label">نوع تهدید:</span> 
            <span class="detail_value">${typeName}</span>
          </div>
          <div class="security_detail">
            <span class="detail_label">سطح هشدار:</span> 
            <span class="detail_value">${levelName}</span>
          </div>
          <div class="security_detail">
            <span class="detail_label">تطابق:</span> 
            <span class="detail_value">${matchType}</span>
          </div>
        `;
        
        statusTitle.parentNode.insertBefore(detailsContainer, statusTitle.nextSibling);
      }
    } else {
      // If no data is available, get current tab information
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function(tabs) {
        if (tabs && tabs[0] && tabs[0].url) {
          const url = new URL(tabs[0].url);
          
          if (url.hostname.match(/\.shaparak\.ir$/i) && url.protocol === 'https:') {
            statusTitle.className = 'status_title_ok';
            statusTitle.innerHTML = 'درگاه پرداخت امن، مطمئن باش';
            statusIcon.src = 'assets/images/icon_ok.png';
          } else {
            statusTitle.className = 'status_title_nok';
            statusTitle.innerHTML = 'این صفحه یک درگاه پرداخت نیست. تنها در صورت مشاهده تیک سبز رنگ، مطمئن باش که یک درگاه امن و معتبر است.';
            statusIcon.src = 'assets/images/icon_128.png';
          }
        }
      });
    }
  });
  
  // Add database update button
  const updateButton = document.createElement('button');
  updateButton.id = 'update_database';
  updateButton.className = 'button-link';
  updateButton.textContent = 'بروزرسانی پایگاه داده';
  updateButton.addEventListener('click', function() {
    updateButton.textContent = 'در حال بروزرسانی...';
    updateButton.disabled = true;
    
    // Send message to background script to update database
    chrome.runtime.sendMessage({ action: 'updateDatabase' }, function(response) {
      if (response && response.success) {
        updateButton.textContent = 'بروزرسانی با موفقیت انجام شد';
        setTimeout(() => {
          updateButton.textContent = 'بروزرسانی پایگاه داده';
          updateButton.disabled = false;
        }, 2000);
      } else {
        updateButton.textContent = 'خطا در بروزرسانی';
        updateButton.disabled = false;
      }
    });
  });
  
  const pageDiv = document.querySelector('.page');
  if (pageDiv) {
    pageDiv.appendChild(updateButton);
  }
});
