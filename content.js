(function(chrome) {
    'use strict';

    const SELECTORS = {
        RIGHT_CONTROLS: ".ytp-right-controls",
        PLAYER_BUTTON: "ytp-button",
        MASTHEAD: '#masthead-container, #masthead',
        MOVIE_PLAYER: "#movie_player",
        MAXIMIZE_PLAYER_HTML_CLASS: "maximize-player",
        MAXIMIZE_PLAYER_TOGGLE_CLASS: "maximize-player-toggle",
        MAXIMIZE_PLAYER_ICON_CLASS: "maximize-player-icon"
    };

    const state = {
        button: null,
        isMaximized: false,
        isTransitioning: false,
        playerObserver: null,
        settings: {
            hotkey: 'w',
            autoEnable: false
        }
    };

    function createMaximizePlayerButton() {
        const button = document.createElement("button");
        button.className = `${SELECTORS.PLAYER_BUTTON} ${SELECTORS.MAXIMIZE_PLAYER_TOGGLE_CLASS}`;
        button.setAttribute("aria-label", "Maximize Player Mode");
        const icon = document.createElement("div");
        icon.className = SELECTORS.MAXIMIZE_PLAYER_ICON_CLASS;
        button.appendChild(icon);
        button.addEventListener("click", handleToggleRequest);
        return button;
    }
    
    function updateUIVisibility(isEnteringMaximize) {
        const masthead = document.querySelector(SELECTORS.MASTHEAD);
        if (masthead) masthead.style.display = isEnteringMaximize ? 'none' : 'flex';
        document.documentElement.classList.toggle(SELECTORS.MAXIMIZE_PLAYER_HTML_CLASS, isEnteringMaximize);
        if (state.button) {
            const title = isEnteringMaximize ? `Exit Maximize Player Mode (${state.settings.hotkey.toUpperCase()})` : `Maximize Player Mode (${state.settings.hotkey.toUpperCase()})`;
            state.button.setAttribute("aria-label", title);
            state.button.setAttribute("title", title);
        }
        window.dispatchEvent(new Event("resize"));
    }

    function enterMaximizeMode() {
        if (state.isTransitioning || state.isMaximized) return;
        state.isTransitioning = true;
        state.isMaximized = true;
        updateUIVisibility(true);
        window.scrollTo(0, 0);
        state.isTransitioning = false;
    }

    function exitMaximizeMode() {
        if (state.isTransitioning || !state.isMaximized) return;
        state.isTransitioning = true;
        state.isMaximized = false;
        updateUIVisibility(false);
        state.isTransitioning = false;
    }

    function handleToggleRequest() {
        state.isMaximized ? exitMaximizeMode() : enterMaximizeMode();
    }

    function addCustomButton() {
        if (state.button) return;
        state.button = createMaximizePlayerButton();
        document.querySelector(SELECTORS.RIGHT_CONTROLS).prepend(state.button);
        updateUIVisibility(state.isMaximized);
        if (state.settings.autoEnable && !state.isMaximized) enterMaximizeMode();
    }

    function removeCustomButton() {
        if (state.isMaximized) exitMaximizeMode();
        state.button?.remove();
        state.button = null;
        state.playerObserver?.disconnect();
    }
    
    function observeForPlayerControls() {
        state.playerObserver?.disconnect();
        state.playerObserver = new MutationObserver((_, observer) => {
            if (document.querySelector(SELECTORS.RIGHT_CONTROLS)) {
                addCustomButton();
                observer.disconnect();
            }
        });
        state.playerObserver.observe(document.body, { childList: true, subtree: true });
    }

    function handlePageNavigation() {
        removeCustomButton();
        if (window.location.pathname.includes('/watch')) observeForPlayerControls();
    }

    function handleKeyDown(event) {
        if (event.key.toLowerCase() !== state.settings.hotkey || event.target.isContentEditable || /INPUT|TEXTAREA/.test(event.target.tagName)) return;
        if (document.querySelector(SELECTORS.RIGHT_CONTROLS)) {
            event.preventDefault();
            handleToggleRequest();
        }
    }
    
    function loadSettings() {
        const defaultSettings = { autoEnable: false, hotkey: 'w' };
        chrome.storage.sync.get('settings', (result) => {
            state.settings = { ...defaultSettings, ...result.settings };
            handlePageNavigation();
        });
    }

    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'sync' && changes.settings) {
            const newSettings = changes.settings.newValue;
            const hotkeyChanged = state.settings.hotkey !== newSettings.hotkey;
            state.settings = { ...state.settings, ...newSettings };
            if (hotkeyChanged) {
                updateUIVisibility(state.isMaximized);
            }
        }
    });
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('yt-navigate-finish', loadSettings);
    loadSettings();

})(chrome);