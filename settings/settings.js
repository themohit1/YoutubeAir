document.addEventListener('DOMContentLoaded', () => {
    const autoEnableCheckbox = document.getElementById('autoEnable');
    const hotkeyInput = document.getElementById('hotkeyInput');
    
    const defaultSettings = { autoEnable: false, hotkey: 'w' };

    function saveSettings(settingsToSave) {
        chrome.storage.sync.set({ settings: settingsToSave });
    }

    chrome.storage.sync.get('settings', (result) => {
        const currentSettings = { ...defaultSettings, ...result.settings };
        autoEnableCheckbox.checked = currentSettings.autoEnable;
        hotkeyInput.value = currentSettings.hotkey;
        if (!result.settings) {
            saveSettings(currentSettings);
        }
    });

    autoEnableCheckbox.addEventListener('change', () => {
        chrome.storage.sync.get('settings', (result) => {
            const currentSettings = { ...defaultSettings, ...result.settings };
            currentSettings.autoEnable = autoEnableCheckbox.checked;
            saveSettings(currentSettings);
        });
    });

    hotkeyInput.addEventListener('keydown', (event) => {
        event.preventDefault();
        const newKey = event.key.trim().toLowerCase();
        if (newKey && newKey.length === 1) {
            hotkeyInput.value = newKey;
            chrome.storage.sync.get('settings', (result) => {
                const currentSettings = { ...defaultSettings, ...result.settings };
                currentSettings.hotkey = newKey;
                saveSettings(currentSettings);
            });
        }
    });
    
    hotkeyInput.addEventListener('blur', () => {
         if (!hotkeyInput.value.trim()) {
            hotkeyInput.value = defaultSettings.hotkey;
            chrome.storage.sync.get('settings', (result) => {
                const currentSettings = { ...defaultSettings, ...result.settings };
                currentSettings.hotkey = defaultSettings.hotkey;
                saveSettings(currentSettings);
            });
        }
    });
});