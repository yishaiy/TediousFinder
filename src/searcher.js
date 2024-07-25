document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");

  // Add event listener to the form submit event
  searchForm.addEventListener("submit", performSearch);
});

function performSearch(event) {
  event.preventDefault(); // Prevent the default form submission

  var searchText = document.getElementById("searchQuery").value.trim();
  if (searchText === "") {
    return;
  }

  // Retrieve search engine configurations from storage
  chrome.storage.sync.get('engines', function(data) {
    if (data.engines && data.engines.length > 0) {
      data.engines.forEach(function(engine) {
        var engineUrl = searchEnginesDict[engine.engineName];
        if (engine.queryTemplate === "") {
          return;
        }
        var url = buildSearchUrl(engineUrl, engine.queryTemplate, searchText);
        chrome.tabs.create({ url: url });
      });
    } else {
      alert("No search engines configured. Please configure search engines in the extension settings.");
    }
  });
}

// Function to build search URL by replacing <<TEXT>> in queryTemplate, and inserting full query into engineUrl.
function buildSearchUrl(engineUrl, queryTemplate, searchText) {
  var query = queryTemplate.replace(/<<TEXT>>/g, searchText);
  return engineUrl.replace(/<<QUERY>>/g, encodeURIComponent(query));
}
