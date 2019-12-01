function init() {
	//todo: init top window
}

function checkSend() {
	if (window.event.keyCode === 13) {
		sendMessage();
	}
}

function sendMessage() {
	document.getElementById('top-window').value += "\n" + document.getElementById('bottom-window').value;

	const { spawn } = require('child_process');
	const toExec = document.getElementById('bottom-window').value
	const command = spawn(toExec);
	command.stdout.on('data', (data) => {
		document.getElementById('top-window').value += "\n" + data
	});

	command.stderr.on('data', (data) => {
		console.error(`stderr: ${data}`);
	});

	command.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
	});
	
	document.getElementById('bottom-window').value = ""
}

