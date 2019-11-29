const { app, BrowserWindow } = require('electron')

function createWindow () {
	
	let win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		},
		dummy: () => {
			alert('hello!!!');
		}

	})

	win.loadFile('index.html')	
}

app.on('ready', createWindow)
