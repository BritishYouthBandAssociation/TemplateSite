'use strict';

// Import required modules
const express = require('express');

// Set up constants
const PORT = 5000;

async function main() {
	// Initialise express app
	const app = express();

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
	app.listen(PORT, () => {
		console.log(`Server listening on :${PORT}`);
	});
}

main().catch(console.error);
