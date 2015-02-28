//page gets loaded
$('document').ready(function(){
	renderList("whitelist");
	renderList("blacklist");
	$('#whitelist_add').click(function(){
		var site = $('#whitelist_input')[0].value;
		$('#whitelist_input').val('');
		addToList("whitelist", site);
	});
	$('#blacklist_add').click(function(){
		var site = $('#blacklist_input')[0].value;
		$('#blacklist_input').val('');
		addToList("blacklist", site);
	})
	$('#blacklist_add').click(function(){
		var site = $('#blacklist_input')[0].value;
		addToList("blacklist", site);
		$('#blacklist_list').append("<li data-id='' data-group='blacklist'>"+site+" <span class='remove glyphicon glyphicon-remove'></span></li>");
	})

})

function renderList(listType){
	$("#"+listType+"_list").html('');
	chrome.storage.sync.get(listType, function(items){
		if(items[listType]){
			for (var i = 0; i < items[listType].length; i++) {
				$('#'+listType+'_list').append("<li data-id=\""+i+"\" data-group=\""+listType+"\">"+items[listType][i]+"<span class='remove glyphicon glyphicon-remove'></span></li>");
			};
			$('.remove').click(function(){
				siteId = $(event.currentTarget.parentElement).data("id");
				listType = $(event.currentTarget.parentElement).data("group");
				$(event.currentTarget.parentElement).remove();
				removeSite(listType, siteId);
			});
		};
	});
}

function addToList(listName,siteName) {
	chrome.storage.sync.get(listName, function(items){
		var sites = [];
		if(items[listName] && items[listName].constructor === Array){
			sites = items[listName];
		}
		sites.push(siteName);
	 	var obj = {};
	 	obj[listName] = sites;
		chrome.storage.sync.set(obj, function() {
		  renderList(listName);
		  console.log('Settings saved');
		});
	});
}

function removeSite(listType, siteId){
	chrome.storage.sync.get(listName, function(items){
		sites = items[listName];
		sites.splice(siteId,1);
	 	var obj = {};
	 	obj[listName] = sites;
		chrome.storage.sync.set(obj, function() {
		  renderList(listName);
		  console.log('Settings saved');
		});
	});
}
