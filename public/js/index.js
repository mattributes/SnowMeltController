//these are globally defined - just hacking around...
function requestStatus(){
	fetch("/status/", 
	{
		method: "GET"
	}).then(function(res){
		console.log(res);
	});
}

function requestSetStatus(val){
	fetch("/status/", 
	{
		method: "POST",
		credentials: "same-origin",
		body: JSON.stringify({
			status: val
		})
	}).then(function(res){
		console.log(res);
	});
}

//TODO replace jquery.
$(document).on('ready', function(){

	const heaterSwitch = $('#HeaterSwitch');

	console.log(window.heater.status)

	//window.heater obj is rendered to page at request
	heaterSwitch.bootstrapToggle(window.heater.status ? 'on' : 'off');

	//ready to show
	//heaterSwitch.removeClass("none");

	heaterSwitch.change(function() {
		
		const val = $(this).prop('checked');
		//alert(val);

		requestSetStatus(val);
	});
});
