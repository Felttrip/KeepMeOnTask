var newUrl = "http://facebook.com";

chrome.tabs.onCreated.addListener(function(tab){
	chrome.tabs.update(tab.id, {url: newUrl});	
});
