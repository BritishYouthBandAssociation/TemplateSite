'use strict';

// Import modules
const express = require('express');
const path = require('path');

// Import custom modules
const importJSON = require('./lib/importJSON');

async function main() {
	// Initialise express app
	const app = express();

	// Import configuration
	const serverOptions = importJSON('server');

	// Set up routes for static files
	app.use(serveFavicon(
		path.join(__dirname, 'public/assets/favicon.ico')));
	app.use('/', express.static(path.join(__dirname, 'public')));

	// Set up default route to check server is running
	app.get('/', (req, res) => {
		return res.send(`I'm here!`);
	});

	// If the request gets to the bottom of the route stack, it doesn't
	// have a defined route and therefore a HTTP status code 404 is sent
	// and an error page shown
	app.use((req, res) => {
		return res.status(404).send('Not found');
	});

	// Start the server
	app.listen(serverOptions.port, () => {
		console.log(`Server listening on :${serverOptions.port}`);
	});
}

main().catch(console.error);
