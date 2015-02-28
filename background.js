//Globals
var whiteListedUrls;
var blackListedUrls;
var enabled = false;

/*
 *initalize urls;
 */
updateLists();

/* Watch for clicks of the extension icon
 * toggles the state of the app
 */
chrome.browserAction.onClicked.addListener(function(){
  enabled = !enabled;
  enabled ? chrome.browserAction.setIcon({path: {19:"OnTasklogoRed.png", 38:"OnTasklogoRed.png"}}) : chrome.browserAction.setIcon({path:{19:"OnTasklogoBlack.png",38:"OnTasklogoBlack.png"}});

});

/* Watch for clicks of the extension icon
 * toggles the state of the app
 */
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if( enabled && changeInfo.url && isBlackListedUrl(changeInfo.url)){
		chrome.tabs.update(tabId, {url: getRandomWhiteListedUrl()});
	}

});

/* Listen for changes to the storage
 * if its changed update the global
 */
chrome.storage.onChanged.addListener(function(changes, namespace) {
	for (key in changes) {
		var storageChange = changes[key];
		if(key=='blacklist'){
			blackListedUrls = storageChange.newValue;
		}
		if(key=='whitelist'){
			whiteListedUrls = storageChange.newValue;
		}
	}
});

function updateLists(){
	chrome.storage.sync.get('blacklist', function(items){
            blackListedUrls = items['blacklist'];
	});
    chrome.storage.sync.get('whitelist', function(items){
        whiteListedUrls = items['whitelist'];
	});
}

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
