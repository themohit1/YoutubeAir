# YoutubeAir

A lightweight Chromium-based extension that enhances the YouTube viewing experience by adding a **Maximize Player Mode** to expand video playback space. This extension removes the YouTube masthead and adjusts the player to fill the viewport.

## Features
- **Maximize Player Mode**: Expands the YouTube video player to full viewport height, hiding the masthead for a cleaner experience.
- **Toggle Button**: Adds a button to the YouTube player controls to easily switch between Maximize Player Mode and default mode.
- **Hotkey Support**: Toggle Maximize Player Mode with a customizable hotkey (default: `W`).
- **Auto-Enable Option**: Automatically enable Maximize Player Mode when loading a YouTube video page.
- **Settings Popup**: Configure auto-enable and hotkey preferences.
- **Lightweight**: No unnecessary dependencies.

## Installation
1. **Clone or Download the Repository**:
   ```bash
   git clone https://github.com/themohit1/YoutubeAir.git
   ```
   Or download the ZIP file and extract it.

2. **Load the Extension in Chrome/Chromium-based browser**:
   - Open browser and navigate to `extensions page` and `for chrome (chrome://extensions/)`.
   - Enable **Developer mode**.
   - Click **Load unpacked** and select the directory containing the extension files.
   - The extension should now appear in your browser extensions list and be active on YouTube.

## Usage
- **Toggle Maximize Player Mode**:
  - Click the Maximize Player Mode button in the YouTube player controls (right side, next to other controls).
  - Alternatively, press the configured hotkey (default: `W`) to toggle the mode.
- **Configure Settings**:
  - Click the extension icon in the browser toolbar to open the settings popup.
  - Enable/disable **Auto Enable Maximize Player** to start videos in Maximize Player Mode automatically.
  - Set a custom **hotkey** by clicking the hotkey input field and pressing a single letter key.

## Files
- `manifest.json`: Extension configuration file.
- `style.css`: Styles for the YouTube player button and settings popup.
- `content.js`: Main script for injecting the Maximize Player Mode button and handling UI changes.
- `background.js`: Background service worker (currently empty).
- `settings.html`: HTML for the settings popup.
- `settings.js`: JavaScript for handling settings interactions and storage.

## Screenshots
*(Screenshots)*

## Development
To contribute or modify the extension:
1. Clone the repository.
2. Make changes to the relevant files.
3. Reload the extension in browser (`extensions page`) by clicking the refresh icon or re-loading the extension.

### Requirements
- Any Chromium-based browser supporting Manifest V3.

## Issues
If you encounter bugs or have feature requests, please open an issue on the GitHub repository. Provide as much detail as possible, including steps to reproduce, browser version, and screenshots if applicable.

## Contributing
Contributions are welcome! Please submit issues or pull requests to the GitHub repository.