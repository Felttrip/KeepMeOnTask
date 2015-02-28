var protocols = ["https://", "http://"];

var whiteListedUrls = ["http://news.ycombinator.com"];
var blackListedUrls = ["facebook.com", "reddit.com"];

var enabled = false;

chrome.browserAction.onClicked.addListener(function(){
  enabled = !enabled;
  alert(enabled);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if( enabled && changeInfo.url && isBlackListedUrl(changeInfo.url)){
		chrome.tabs.update(tabId, {url: whiteListedUrls[0]});
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
