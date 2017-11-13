//Registering service worker
if ('serviceWorker' in navigator){
	navigator.serviceWorker.register('sw.js').then(function (registration){
		//Registration was successfull
		console.log('ServiceWorker registration successfull with scope : ', registration.scoper);
	})catch.(function(err){
		//registration failed
		console.log('serviceWorker registration failed : ', err);
	});
}

$(document).ready(function(){
	$('#note').bind('input propertychange', function(){
		localstorage.setItem("note", $(this).val());
	});

	if (localstorage.getItem("note") && localstorage.getItem("note") !==''){
		var noteItem = localstorage.getItem("note");
		$('#note').val(noteItem);
	}
})