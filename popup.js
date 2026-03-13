document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('toggleBtn');
    const statusSpan = document.querySelector('#status span');
    const countDisplay = document.getElementById('countDisplay');
    const speedSelect = document.getElementById('speedSelect');

    // Load saved settings
    chrome.storage.local.get(['active', 'skipCount', 'adSpeed'], (result) => {
        let isActive = result.active !== false;
        countDisplay.innerText = result.skipCount || 0;
        speedSelect.value = result.adSpeed || "16";
        updateUI(isActive);
    });

    // Toggle ON/OFF
    btn.addEventListener('click', () => {
        chrome.storage.local.get(['active'], (result) => {
            let newState = !(result.active !== false);
            chrome.storage.local.set({ active: newState }, () => updateUI(newState));
        });
    });

    // Save Speed Preference
    speedSelect.addEventListener('change', () => {
        chrome.storage.local.set({ adSpeed: speedSelect.value });
    });

    function updateUI(isActive) {
        btn.innerText = isActive ? 'Turn OFF' : 'Turn ON';
        btn.style.background = isActive ? '#ff4444' : '#28a745';
        statusSpan.innerText = isActive ? 'Active' : 'Inactive';
        statusSpan.style.color = isActive ? '#28a745' : '#ff4444';
    }
});