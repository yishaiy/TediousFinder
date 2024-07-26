![TediousFinder Logo](./images/logo.jpeg)

# Tedious Finder

This is a chrome extension that enables you to make multiple search queries, with just 1-click.

As the known saying: "You have been tedious, and you have found - then believe!"

# Description

First, clicking `Ctrl+Shift+1` opens the Settings page, there you should configure the search queries you want to do when using TediousFinder.

In the Settings page of the extension, you can configure the search engine and query template that should be used in search. inside the query template you can enter `<<TEXT>>` that will be replaces with your search text when searching in TediousFinder.

Then, clicking `Ctrl+Shift+2` will open the Search page and you will be able to enter your search text and run the search.

## Example of configuration

| SearchEngine | Query                     |
|--------------|---------------------------|
| Google       | \<\<TEXT\>\>                  |
| Google       | filetype:PDF \<\<TEXT\>\>     |
| Bing         | imagesize:medium \<\<TEXT\>\> |

# Installation

Add with chrome web store: [TesiousFinder]().

# Development
To run this extension locally:
 1. Navigate to `chrome://extensions`
 2. Toggle on the Developer Mode on the top right
 3. Click “Load Unpacked Extension”
 4. Navigate to the local folder containing the extension’s code and click Ok
    - This is the root of this project, the one containing the `manifest.json` file
 5. Now you can see the extension loaded, making changes to the code will reflect when you reopen the extension 
    - Assuming there are no errors, the extension should load into your browser

# TODO
- [x] better UI.
- [ ]  add search history feature.
- [ ]  handle incognito mode.
