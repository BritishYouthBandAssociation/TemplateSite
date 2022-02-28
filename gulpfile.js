'use strict';

const { src, dest, series } = require('gulp');
const rename = require('gulp-rename');
const fs = require('fs');
const path = require('path');
const importJSON = require(path.join(__dirname, 'lib', 'importJSON'));
const prompt = require('prompt-sync')({ sigint: true });
const del = require('del');

function cleanConfig() {
	const configFiles =
		fs.readdirSync(path.join(__dirname, 'config'))
			.filter(file => !file.endsWith('.sample.json'))
			.map(file => `./config/${file}`);

	return del(configFiles);
}

function copyConfig() {
	return src('config/*.sample.json')
		.pipe(rename(path => {
			path.basename = path.basename.split('.sample')[0];
		}))
		.pipe(dest('config/'));
}

function setConfig(cb) {
	const writeConfig = (file, contents) => {
		console.log(`Writing config to ${file}.json`);

		fs.writeFileSync(
			path.join(__dirname, 'config', `${file}.json`),
			JSON.stringify(contents)
		);
	};

	const configFiles =
		fs.readdirSync(path.join(__dirname, 'config'))
			.filter(file => !file.endsWith('.sample.json'))
			.map(file => file.split('.json')[0]);

	console.log('\nEditing config files');
	console.log('\nWhen prompted for a new value, press enter to keep ' +
		'the existing one');

	for (const file of configFiles) {
		const contents = importJSON(file);

		console.log(`\nConsidering ${file}.json`);
		console.log('Current contents:');
		console.log(contents);

		const answer =
			prompt('Would you like to edit the config? (y/N) ');

		if (answer !== 'y')
			continue;

		for (const [ k, v ] of Object.entries(contents)) {
			let value =
				prompt(` - ${k} (${v}): `).trim();

			if (value.length === 0)
				continue;

			switch (typeof v) {
				case 'number':
					value = Number(value);
					break;
				case 'boolean':
					value = value === 'true';
					break;
			}

			contents[k] = value;
		}

		writeConfig(file, contents);
	}

	cb();
}

exports.default = series(cleanConfig, copyConfig, setConfig);
