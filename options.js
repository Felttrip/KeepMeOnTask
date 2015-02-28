//page gets loaded
document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('add');
    // onClick's logic below:
    button.addEventListener('click', function() {
		saveList(["test","tester","testeroni"],"blackListUrl");
    });
});


function saveList(jsonArray,listType) {
	// Check that there's some code there.
	if (!jsonArray) {
	  message('Error: No value specified');
	  return;
	}
	chrome.storage.sync.set({listType: jsonArray}, function() {
	  // Notify that we saved.
	  message('Settings saved');
	});
}
