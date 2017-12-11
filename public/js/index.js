//these are globally defined - just hacking around...
function requestStatus(){
	fetch("/status/", 
	{
		method: "GET",
		credentials: "same-origin",
	}).then(function(res){
		console.log(res);

		//TODO update UI based off status.
	});
}

function setStatus(val){
	hideShowDurationForm(val);
	startTimeCheck(val);

	let duration;

	if (val){
		duration = $("#DurationInput").val();

		//TODO needs testing.
		//TODO say time remainging....
		window.setTimeout(function(){
			requestStatus();
		}, duration * 60 * 1000);

	}

	fetch("/status/", 
	{
		method: "POST",
		credentials: "same-origin",
		body: JSON.stringify({
			status: val,
			duration: duration
		})
	}).then(function(res){
		console.log(res);
	});
}

function requestTimeRemaining(){
	fetch("/remainingTime/", 
	{
		method: "GET",
		credentials: "same-origin"
	}).then(function(res){
		return res.json();
	}).then(function(msRemaining){
		console.log(msRemaining/1000);
		$("#TimeRemaining").html(msRemaining/1000);
	});
}

function hideShowDurationForm(heaterStatus){

	const durationForm = $('#DurationForm');

	//if heater is on, show remaining time.

	//if heater is off, show the form.
	
	if(heaterStatus){
		durationForm.hide();
	}else{
		durationForm.show();
	}

}

let intervalCheck;

function startTimeCheck(status){
	if (status){
		//TODO better
		if (intervalCheck){
			clearInterval(intervalCheck);
		}

		intervalCheck = window.setInterval(function(){
			requestTimeRemaining();
		},1000);

		$("#TimeRemaining").show();
	}else{
		if (intervalCheck){
			clearInterval(intervalCheck);
		}

		$("#TimeRemaining").hide();
	}
}


//TODO replace jquery.
$(document).on('ready', function(){

	const heaterSwitch = $('#HeaterSwitch');

	console.log(window.SnowMeltController.HeaterStatus);

	//window.heater obj is rendered to page at request
	heaterSwitch.bootstrapToggle(window.SnowMeltController.HeaterStatus.status ? 'off' : 'on');
	hideShowDurationForm(window.SnowMeltController.HeaterStatus.status);
	startTimeCheck(window.SnowMeltController.HeaterStatus.status)


	heaterSwitch.change(function() {
		const val = $(this).prop('checked');
		setStatus(!val);
	});
});
