# MotmaenBash Chrome Extension

MotmaenBash is a Chrome extension designed to verify the authenticity of Iranian payment gateways.

## Overview

This Chrome extension aims to provide users with a tool to verify the authenticity of payment gateways hosted on `shaparak.ir`. It visually indicates whether a payment gateway is secure and trustworthy.

## Features

- Checks if the current page belongs to a secure payment gateway on `shaparak.ir`.
- Displays an icon in the browser's toolbar to indicate the security status of the payment gateway.
- Adds a corner sign/logo to verified secure payment gateway pages.

## Installation

To install the extension:

- Download it from the [Chrome Web Store](https://chromewebstore.google.com/detail/motmaenbash-%D9%85%D8%B7%D9%85%D8%A6%D9%86-%D8%A8%D8%A7%D8%B4/efhpmpdbeaganelnekhbffjphahncbgn?hl=fa).
- Or install the extension locally:
  1. Clone this repository.
  2. Open Chrome and navigate to `chrome://extensions`.
  3. Enable "Developer mode" in the top right corner.
  4. Click on "Load unpacked" and select the cloned repository's directory.

## Usage

Once installed, the extension will automatically detect pages on `shaparak.ir` that use HTTPS. If a secure payment gateway is detected, it will display the extension icon in the toolbar. Additionally, it will add a corner sign/logo on the page to signify its security.

## Contributing

Contributions are welcome! If you have any suggestions, bug fixes, or enhancements, please feel free to create issues or pull requests.

## Firefox Version

Check out the [Firefox version repository](https://github.com/miladnouri/motmaenbash-firefox) of this extension.

## License

This project is licensed under the [MIT License](LICENSE).
