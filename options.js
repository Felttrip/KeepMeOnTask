//page gets loaded
document.addEventListener('DOMContentLoaded', function() {

	var button = document.getElementById('add');
	// onClick's logic below:
    button.addEventListener('click', function() {
		saveList({"blackListedUrls": ["test","tester","testeroni"]});
	});

});


function saveList(obj) {
	chrome.storage.sync.set(obj, function() {
	  console.log('Settings saved');
	});
}

function getList(listName){
	return chrome.storage.sync.get(listName, function(items) {
		return items;
	});
}
