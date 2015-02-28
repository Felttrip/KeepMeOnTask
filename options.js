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
	});

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

function addToList(listType,siteName) {
	chrome.storage.sync.get(listType, function(items){
		var sites = [];
		if(items[listType] && items[listType].constructor === Array){
			sites = items[listType];
		}
		sites.push(siteName);
	 	var obj = {};
	 	obj[listType] = sites;
		chrome.storage.sync.set(obj, function() {
		  renderList(listType);
		  console.log('Settings saved');
		});
	});
}

function removeSite(listType, siteId){
	chrome.storage.sync.get(listType, function(items){
		sites = items[listType];
		sites.splice(siteId,1);
	 	var obj = {};
	 	obj[listType] = sites;
		chrome.storage.sync.set(obj, function() {
		  renderList(listType);
		  console.log('Settings saved');
		});
	});
}
