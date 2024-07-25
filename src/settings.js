document.addEventListener('DOMContentLoaded', function() {
  var addRowButton = document.getElementById('addRowButton');
  var saveButton = document.getElementById('saveButton');
  var searchEnginesContainer = document.getElementById('searchEngines');

  // Load saved settings on page load
  loadSearchEngines();

  // Event listener for adding a new row
  addRowButton.addEventListener('click', function() {
    addRow();
  });

  // Event listener for saving settings
  saveButton.addEventListener('click', function() {
    saveSearchEngines();
  });

  // Function to add a new row
  function addRow(engineName = '', queryTemplate = '') {
    var row = document.createElement('div');
    row.className = 'row';

    var selectEngine = document.createElement('select');
    selectEngine.className = 'selectEngine';
    
    // Populate options from searchEnginesDict
    Object.keys(searchEnginesDict).forEach(function(engine) {
      var option = document.createElement('option');
      option.value = engine;
      option.textContent = engine;
      selectEngine.appendChild(option);
    });
    if (engineName) {
      selectEngine.value = engineName;
    }

    var inputTemplate = document.createElement('input');
    inputTemplate.type = 'text';
    inputTemplate.className = 'inputTemplate';
    inputTemplate.placeholder = 'Enter query template';
    if (queryTemplate) {
      inputTemplate.value = queryTemplate;
    }

    var deleteButton = document.createElement('button');
    deleteButton.className = 'deleteButton';
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', function() {
      row.remove();
    });

    row.appendChild(selectEngine);
    row.appendChild(inputTemplate);
    row.appendChild(deleteButton);

    searchEnginesContainer.appendChild(row);
  }

  // Function to save search engines to Chrome storage
  function saveSearchEngines() {
    var rows = searchEnginesContainer.querySelectorAll('.row');
    var engines = [];

    rows.forEach(function(row) {
      var engineName = row.querySelector('.selectEngine').value;
      var queryTemplate = row.querySelector('.inputTemplate').value;
      engines.push({ engineName: engineName, queryTemplate: queryTemplate });
    });

    chrome.storage.sync.set({ 'engines': engines }, function() {
      console.log('Settings saved');
    });
  }

  // Function to load search engines from Chrome storage
  function loadSearchEngines() {
    chrome.storage.sync.get('engines', function(data) {
      if (data.engines) {
        data.engines.forEach(function(engine) {
          addRow(engine.engineName, engine.queryTemplate);
        });
      } else {
        // If no saved engines, add a default row
        addRow();
      }
    });
  }
});