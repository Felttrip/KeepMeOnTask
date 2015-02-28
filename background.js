var protocols = ["https://", "http://"];

var whiteListedUrls = ["http://news.ycombinator.com"];
var blackListedUrls = ["www.facebook.com/", "www.reddit.com/"];


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if(blackListedUrls.indexOf(tab.url) !== -1){
		chrome.tabs.update(tabId, {url: whiteListedUrls[0]});
	}
});
