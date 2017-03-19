//global ns - hacking for now
function submit(){
	const form = new FormData(document.getElementById('LoginForm'));
	fetch("/", {
		method: "POST",
		credentials: "same-origin",
		body: JSON.stringify({
			user: document.getElementById("InputUser").value,
			password: document.getElementById("InputPassword").value
		})
	}).then(function(res){
		console.log(res);

		if (res.status === 200){
			window.location = window.location.origin + '/index';
		}
	});
}

document.getElementById("LoginSubmit").addEventListener("click", function () {
	submit();
});

document.getElementById("InputPassword").addEventListener("keydown", function(e) {
	//enter key
	if (e.keyCode == 13) {
		submit();
	}
});