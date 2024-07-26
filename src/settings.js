document.addEventListener('DOMContentLoaded', function () {
  // Open Search page in new tab
  document.getElementById('openSearchPage').addEventListener('click', function () {
    chrome.tabs.create({ url: chrome.runtime.getURL("src/searcher.html") });
  });

  // Set template keyword
  document.getElementById('templateKeyword').textContent = TEMPLATE_KEYWORD;

  var addRowButton = document.getElementById('addRowButton');
  var saveButton = document.getElementById('saveButton');
  var searchEnginesContainer = document.getElementById('searchEngines');

  // Load saved settings on page load
  loadSearchEngines();

  // Event listener for adding a new row
  addRowButton.addEventListener('click', function () {
    addRow();
  });

  // Event listener for saving settings
  saveButton.addEventListener('click', function () {
    saveSearchEngines();
  });

  document.addEventListener('keydown', (event) => {
    // AAA NEW FIELD
    if (event.altKey && event.key === 'a') {
      event.preventDefault();
      addRow();
    }
  });

  // Function to add a new row
  function addRow(engineName = '', queryTemplate = '') {
    var row = document.createElement('div');
    row.id = 'row';
    row.className = 'flex gap-1';

    var selectEngine = document.createElement('select');
    selectEngine.id = 'selectEngine';
    selectEngine.className = 'select sm bordered flex-1 basis-1/3';

    // Populate options from searchEnginesDict
    Object.keys(searchEnginesDict).forEach(function (engine) {
      var option = document.createElement('option');
      option.value = engine;
      option.textContent = engine;
      selectEngine.appendChild(option);
    });
    if (engineName) {
      selectEngine.value = engineName;
    }

    var inputTemplate = document.createElement('input');
    inputTemplate.id = 'inputTemplate';
    inputTemplate.type = 'text';
    inputTemplate.className = 'input sm bordered flex-1 basis-2/3';
    inputTemplate.placeholder = 'Enter query template';
    if (queryTemplate) {
      inputTemplate.value = queryTemplate;
    }

    inputTemplate.addEventListener('keydown', (event) => {
      // DUPLICATE CURRENT FIELD
      if (event.altKey && event.key === 'd') {
        event.preventDefault();
        addRow(selectEngine.value, inputTemplate.value);
      }

      // DELETE CURRENT FIELD
      if (event.altKey && event.shiftKey && event.key === 'X') {
        event.preventDefault();
        row.remove();
      }

      // INSERT SYMBOL IN CURRENT FIELD
      if (event.altKey && event.key === 's') {
        event.preventDefault();

        const startPos = inputTemplate.selectionStart;
        const endPos = inputTemplate.selectionEnd;

        // Text to insert
        const insertText = TEMPLATE_KEYWORD;

        // Insert the text at the current cursor position
        inputTemplate.value = inputTemplate.value.substring(0, startPos) +
          insertText +
          inputTemplate.value.substring(endPos);

        // Move the cursor to the end of the inserted text
        inputTemplate.setSelectionRange(startPos + insertText.length, startPos + insertText.length);
      }
    });

    var deleteButton = document.createElement('div');
    deleteButton.className = 'fa fa-lg fa-solid fa-trash text-danger p-2 cursor-pointer self-center';
    deleteButton.addEventListener('click', function () {
      row.remove();
    });

    row.appendChild(selectEngine);
    row.appendChild(inputTemplate);
    row.appendChild(deleteButton);

    searchEnginesContainer.appendChild(row);
    inputTemplate.focus();
  }

  // Function to save search engines to Chrome storage
  function saveSearchEngines() {
    var rows = searchEnginesContainer.querySelectorAll('#row');
    var engines = [];

    rows.forEach(function (row) {
      var engineName = row.querySelector('#selectEngine').value;
      var queryTemplate = row.querySelector('#inputTemplate').value;
      engines.push({ engineName: engineName, queryTemplate: queryTemplate });
    });

    chrome.storage.sync.set({ 'engines': engines }, function () {
      console.log('Settings saved');
    });

    animateSaveButton();
  }

  function animateSaveButton() {
    const oldText = saveButton.textContent;
    saveButton.textContent = "Saved!"
    saveButton.classList.add("success")
    saveButton.classList.remove("primary")
    setTimeout(() => {
      saveButton.textContent = oldText;
      saveButton.classList.remove("success")
      saveButton.classList.add("primary")
    }, 1000);
  }

  // Function to load search engines from Chrome storage
  function loadSearchEngines() {
    chrome.storage.sync.get('engines', function (data) {
      if (data.engines) {
        data.engines.forEach(function (engine) {
          addRow(engine.engineName, engine.queryTemplate);
        });
      } else {
        // If no saved engines, add a default row
        addRow();
      }
    });
  }
});