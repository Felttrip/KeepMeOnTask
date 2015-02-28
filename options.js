//page gets loaded
// document.addEventListener('DOMContentLoaded', function() {
//     var button = document.getElementById('whitelist_add');
//     // onClick's logic below:
//   //   button.addEventListener('click', function() {
// 		// saveList(["test","tester","testeroni"],"blackListUrl");
//   //   });
// });

$('document').ready(function(){
	$('#whitelist_add').click(function(){
		$('#whitelist_list').append("<li>"+ $('#whitelist_input')[0].value + "</li>");
	})
})

function saveList(jsonArray,listType) {
	// Check that there's some code there.
	if (!jsonArray) {
	  message('Error: No value specified');
	  return;
	}
	chrome.storage.sync.set({listType: jsonArray}, function() {
	  // Notify that we saved.
	  $('blacklist_list').append(jsonArray);
	});
}
