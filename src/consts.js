var QUERY_PLACEHOLDER = "<<QUERY>>";
var TEMPLATE_KEYWORD = "<<TEXT>>";

// Define searchEnginesDict globally
var searchEnginesDict = {
  "Google": "https://google.com/search?q=" + QUERY_PLACEHOLDER,
  "Bing": "https://www.bing.com/search?q=" + QUERY_PLACEHOLDER,
  "Yahoo": "https://search.yahoo.com/search?p=" + QUERY_PLACEHOLDER,
  "DuckDuckGo": "https://duckduckgo.com/?q=" + QUERY_PLACEHOLDER,
  // Add more search engines as needed
};
