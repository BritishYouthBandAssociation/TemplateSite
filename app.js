'use strict';

// Import modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const serveFavicon = require('serve-favicon');

// Import custom modules
const importJSON = require('./lib/importJSON');

/**
 * loadRoutes() Loads all of the routes from /routers into a map
 *
 * @return {Array<Array<String, Object>>} All of the routes
 */
function loadRoutes() {
	const routes = [];

	const routeFiles =
		fs.readdirSync(path.join(__dirname, 'routes'))
			.filter(file => file.endsWith('.js'));

	for (const file of routeFiles) {
		const route = require(path.join(__dirname, 'routes', file));
		routes.push([ route.root, route.router ]);
	}

	return routes;
}

async function main() {
	// Initialise express app
	const app = express();

	// Import configuration
	const serverOptions = importJSON('server');

	// Set up parsers to allow access to POST bodies
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	// Set up routes for static files
	app.use(serveFavicon(
		path.join(__dirname, 'public/assets/favicon.ico')));
	app.use('/', express.static(path.join(__dirname, 'public')));

	// Add external routers to express
	for (const route of loadRoutes())
		app.use(route[0], route[1]);

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
