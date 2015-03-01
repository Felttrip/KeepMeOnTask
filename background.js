//Globals
var whiteListedUrls;
var blackListedUrls;
var enabled = true;
chrome.browserAction.setBadgeText({text:"On"});

/*
 *initalize urls;
 */
updateLists();

/* Watch for clicks of the extension icon
 * toggles the state of the app
 */
chrome.browserAction.onClicked.addListener(function(){
    enabled = !enabled;
    if(enabled){
        chrome.browserAction.setIcon({path: {19:"OnTasklogoRed.png", 38:"OnTasklogoRed.png"}});
        chrome.browserAction.setBadgeText({text:"On"});
    }
    else{
        chrome.browserAction.setIcon({path:{19:"OnTasklogoBlack.png",38:"OnTasklogoBlack.png"}});
        chrome.browserAction.setBadgeText({text:"Off"});
    }
});

/* Redirects if turned on
 *
 */
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	if( enabled && changeInfo.url && isBlackListedUrl(changeInfo.url)){
        var newUrl = getRandomWhiteListedUrl();
        chrome.tabs.update(tabId, {url: newUrl});
        var oldUrl = changeInfo.url;
        chrome.identity.getProfileUserInfo(function(userInfo){
            var id = userInfo.id;
            var timeStamp = Date.now();
            var payload = { 'userid': null,
                            'site_visited': null,
                            'redirected_to': null,
                            'timestamp': null
                            };
            payload['userid'] = id;
            payload['site_visited'] = decodeURIComponent(oldUrl);
            payload['redirected_to'] = decodeURIComponent(newUrl);
            payload['timestamp'] = timeStamp;

            $.ajax({ type: "POST",
                     url: "http://104.236.56.129:4567/logs",
                     data: payload,
                     dataType: "json",
                     success: function(data){
                         console.log(data)
                     }
            });
        })

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
    var parsedUrl = url;
    if(url.indexOf("://")!==-1){
        parsedUrl = parsedUrl.substring(parsedUrl.indexOf(":")+3);
    }
    if(url.indexOf("www.")!==-1){
        parsedUrl = parsedUrl.substring(parsedUrl.indexOf(".")+1);
    }
    if(parsedUrl.indexOf("/")!==-1){
	       parsedUrl = parsedUrl.substring(0,parsedUrl.indexOf("/"));
    }
	if(blackListedUrls.indexOf(parsedUrl) !== -1){
		return true;
	}
	return false;
}

function getRandomWhiteListedUrl(){
	var randomIndex = Math.floor((Math.random() * whiteListedUrls.length));
	return "http://"+whiteListedUrls[randomIndex];
}
