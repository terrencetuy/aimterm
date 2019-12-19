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
	const { spawn } = require('child_process');

	// display command
	let commandDiv = document.createElement('div');
	let getUserCommand = spawn('whoami');
	getUserCommand.stdout.on('data', (data) => {
		let toExecCmd = document.createTextNode(document.getElementById('bottom-window').value);
		let userSpan = document.createElement('span');
		userSpan.classList.add('sender-prompt');
		let userSpanText = document.createTextNode(data.toString().trim() + ': ');
		userSpan.appendChild(userSpanText);
		commandDiv.appendChild(userSpan);
		commandDiv.appendChild(toExecCmd);
		document.getElementById('top-window').appendChild(commandDiv); 

		// display response
		let responseDiv = document.createElement('div');
		let getHostCommand = spawn('hostname');
		getHostCommand.stdout.on('data', (data) => {
			console.log(data.toString());
			let hostSpan = document.createElement('span');
			hostSpan.classList.add('recipient-prompt');
			let hostSpanText = document.createTextNode(data.toString().trim() + ': ');
			hostSpan.appendChild(hostSpanText);
			responseDiv.appendChild(hostSpan);
			let args = document.getElementById('bottom-window').value.trim().split(' ');
			let toExec = args.shift();
			let getOutputCommand = spawn(toExec, args);
			getOutputCommand.stdout.on('data', (data) => {
				let outputText = document.createTextNode(data.toString().trim());
				document.getElementById('top-window').value += "\n" + data
				responseDiv.appendChild(outputText);
				document.getElementById('top-window').appendChild(responseDiv); 
				document.getElementById('top-window').scrollTop = document.getElementById('top-window').scrollHeight;
				document.getElementById('bottom-window').value = "";
			});

		});
	});
}

