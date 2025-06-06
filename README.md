# Zotero Anytype

A Zotero plugin that integrates your Zotero library with Anytype using the Anytype local API.

## Features

- Export Zotero items to Anytype as fully formatted pages
- Create structured bibliographic entries with metadata in Anytype
- Attach PDFs and other files from Zotero to your Anytype pages
- Maintain links between your research sources in Zotero and your notes in Anytype
- Automatically update Anytype when your Zotero library changes

## Prerequisites

- Zotero 5.0 or higher
- Anytype with local API enabled
- An Anytype API key
- Your Anytype space ID

## Configuration

Before using the plugin, you need to configure it with your Anytype API credentials:

1. Open Anytype and enable the local API in settings
2. Generate an API key in Anytype (Settings > Developer > API Keys)
3. Note your Space ID (visible in the URL when viewing your space or in space settings)
4. In Zotero, after installing the plugin, go to Edit > Preferences > Anytype
5. Enter your API key and Space ID
6. Select your preferred template for exported items

## Installation

1. Download the latest release `.xpi` file from the releases page
2. In Zotero, go to Tools → Add-ons
3. Click the gear icon and select "Install Add-on From File..."
4. Select the downloaded `.xpi` file
5. Restart Zotero when prompted

## Usage

1. Select items in your Zotero library
2. Click the "Export to Anytype" button in the toolbar or from the Tools menu
3. The plugin will connect to your local Anytype instance via the API
4. Selected items will be created as pages in your Anytype space
5. The export dialog will show progress and provide links to the created pages

## How It Works

The plugin uses the Anytype local API to create pages from your Zotero items:

- **Initialization**: The plugin initializes by loading your API key and Space ID from the preferences.
- **API Connection**: It establishes a connection to the Anytype local API using the provided credentials.
- **Data Retrieval**: The plugin retrieves the selected Zotero items and their associated data (e.g., metadata, file attachments).
- **Page Creation**: For each Zotero item, the plugin creates a corresponding page in Anytype, using the item's metadata to populate the page content and structure.
- **File Attachment**: If configured, the plugin attaches related files (e.g., PDFs) from Zotero to the newly created Anytype pages.
- **Link Maintenance**: The plugin maintains links between Zotero items and Anytype pages, enabling easy navigation between your research and notes.
- **Automatic Updates**: It can automatically update Anytype pages when changes are detected in the Zotero library, ensuring your notes are always in sync with your research.

## Development

### Building the plugin

Run the build script to create an installable .xpi file:

```bash
chmod +x build.sh
./build.sh
```

The built plugin will be placed in the `builds` directory.

### Project Structure

- `bootstrap.js`: Plugin initialization and lifecycle management
- `chrome/content/scripts/main.js`: Main plugin code
- `chrome/content/overlay.xul`: UI components
- `install.rdf`: Plugin metadata

## License

This project is licensed under the MIT License - see the LICENSE file for details.