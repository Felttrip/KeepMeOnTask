//page gets loaded
$('document').ready(function(){
	$('.remove').click(function(event){
		siteId = $(event.currentTarget.parentElement).data("id");
		siteType = $(event.currentTarget.parentElement).data("group");
		removeSite(siteType, siteId);
		$(event.currentTarget.parentElement).remove();


	});
	$('#whitelist_add').click(function(){
		//chrome.storage.sync.clear();
		var site = $('#whitelist_input')[0].value;
		$('#whitelist_list').append("<li>"+ site + "</li>");
		addToList("whiteListedUrls", site);
	})

})

function addToList(listName,siteName) {
	chrome.storage.sync.get(listName, function(items){
		var sites = [];
		if(items[listName].constructor === Array){
			sites = items[listName];
		}
		sites.push(siteName);
	 	var obj = {};
	 	obj[listName] = sites;
		chrome.storage.sync.set(obj, function() {
		  console.log('Settings saved');
		});
	});
}

function removeSite(listType, siteId){

}
