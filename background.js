
var whiteListedUrls = ["http://news.ycombinator.com"];
var blackListedUrls = ["facebook.com", "reddit.com"];

var enabled = false;

chrome.browserAction.onClicked.addListener(function(){
  enabled = !enabled;
  enabled ? chrome.browserAction.setIcon({path: {19:"OnTasklogoRed.png", 38:"OnTasklogoRed.png"}}) : chrome.browserAction.setIcon({path:{19:"OnTasklogoBlack.png",38:"OnTasklogoBlack.png"}});

});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	console.log(changeInfo.url);
	if( enabled && changeInfo.url && isBlackListedUrl(changeInfo.url)){
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
	var randomIndex = Math.floor((Math.random() * whiteListedUrls.length));
	return whiteListedUrls[randomIndex];
}
