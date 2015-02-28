var protocols = ["https://", "http://"];

var whiteListedUrls = ["http://news.ycombinator.com"];
var blackListedUrls = ["facebook.com", "reddit.com"];


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if(isBlackListedUrl(changeInfo.url)){
		chrome.tabs.update(tabId, {url: getRandomWhiteListedUrl()});
	}
});


function isBlackListedUrl(url){
	var parsedUrl = url.substring(url.indexOf(".")+1);
	parsedUrl = parsedUrl.substring(0,parsedUrl.indexOf("/"));
	if(blackListedUrls.indexOf(parsedUrl) !== -1){
		return true;
	}
	return false;
}

function getRandomWhiteListedUrl(){
	var randomIndex = Math.floor((Math.random() * whiteListedUrls) + 1);
	return whiteListedUrls[randomIndex];
}
