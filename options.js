//page gets loaded
$('document').ready(function(){
	getList("whitelist");
	getList("blacklist");
	$('.remove').click(function(event){
		siteId = $(event.currentTarget.parentElement).data("id");
		siteType = $(event.currentTarget.parentElement).data("group");
		removeSite(siteType, siteId);
		$(event.currentTarget.parentElement).remove();


	});
	$('#whitelist_add').click(function(){
		//chrome.storage.sync.clear();
		var site = $('#whitelist_input')[0].value;
		addToList("whitelist", site);
		$('#whitelist_list').append("<li data-id='' data-group='whitelist'>"+site+" <span class='remove glyphicon glyphicon-remove'></span></li>");
	})

})

function getList(listType){
	chrome.storage.sync.get(listType, function(items){
		for (var i = 0; i < items.length; i++) {
			$('#'+listType+'_list').append("<li data-id=\""+i+"\" data-group=\""+listType+"\">"+items[listName]+"<span class='remove glyphicon glyphicon-remove'></span></li>");
		};
	})
}

function addToList(listName,siteName) {
	chrome.storage.sync.get(listName, function(items){
		var sites = [];
		console.log(typeof(items[listName]));
		if(typeof(items[listName]) === Array){
			sites = items[listName];
		}
		console.log("Dope");
		sites.push(siteName);
	 	var obj = {};
	 	obj[listName] = sites;
	 	console.log(msg)
		chrome.storage.sync.set(obj, function() {
		  console.log('Settings saved');
		});
	});
}

function removeSite(listType, siteId){

}
