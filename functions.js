function init() {
	// set focus
	document.getElementById('bottom-window').focus();
}

function checkSend() {
	if (window.event.keyCode === 13) {
		sendMessage();
	}
}

function sendMessage() {
	document.getElementById('top-window').value += "\n" + document.getElementById('bottom-window').value;

	const { spawn } = require('child_process');

	let args = document.getElementById('bottom-window').value.split(' ');
	
	const toExec = args.shift()
	const command = spawn(toExec, args);
	command.stdout.on('data', (data) => {
		document.getElementById('top-window').value += "\n" + data
		document.getElementById('top-window').scrollTop = document.getElementById('top-window').scrollHeight;
	});

	command.stderr.on('data', (data) => {
		console.error(`stderr: ${data}`);
	});

	command.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
	});
	
	document.getElementById('bottom-window').value = "";
}

