let isEnabled = true;
let adSpeed = 16;

const updateSettings = () => {
    chrome.storage.local.get(['active', 'adSpeed'], (result) => {
        isEnabled = result.active !== false;
        adSpeed = parseInt(result.adSpeed) || 16;
    });
};

const handleAds = () => {
    if (!isEnabled) return;

    const video = document.querySelector('video');
    const adContainer = document.querySelector('.ad-showing, .ad-interrupting');
    const skipButton = document.querySelector('.ytp-ad-skip-button, .ytp-ad-skip-button-modern');

    if (adContainer && video) {
        if (video.playbackRate !== adSpeed) {
            video.playbackRate = adSpeed;
            video.muted = true;
            chrome.runtime.sendMessage({ action: "adSkipped" });
        }
    } else if (video && video.playbackRate > 2) {
        video.playbackRate = 1;
        video.muted = false;
    }

    if (skipButton) skipButton.click();
};

updateSettings();
chrome.storage.onChanged.addListener(updateSettings);
const observer = new MutationObserver(handleAds);
observer.observe(document.body, { childList: true, subtree: true });