window.onload = onWindowLoad;

function onWindowLoad() {

    // Retrieve existing settings
    $(':checkbox').each(function (index, element) {
        var name = this.name;
        chrome.storage.sync.get(name, function (items) {
            element.checked = items[name]; // true  OR  false / undefined (=false)
        });
    });


    $(':checkbox').change(function () {
        saveSettings(this.name, this.checked);
    });
}

function saveSettings(key, value) {
    var items = {};
    items[key] = value;

    chrome.storage.sync.set(items, function () {
        console.log(key + " was saved | value: " + value);
    });
}

function getSettings(key) {
    chrome.storage.sync.get(key, function (data) {
        return data[key];
    });
}