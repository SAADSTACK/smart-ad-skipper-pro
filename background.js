// background.js - Ye hamesha chalta rehta hai
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "adSkipped") {
        chrome.storage.local.get(['skipCount'], (result) => {
            let count = result.skipCount || 0;
            chrome.storage.local.set({ skipCount: count + 1 });
        });
    }
});