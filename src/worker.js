chrome.commands.onCommand.addListener(function(command) {
  if (command === "open_search_page") {
    chrome.tabs.create({ url: chrome.runtime.getURL("src/searcher.html") });
  }
});
