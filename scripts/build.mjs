import { readFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const mode = process.argv[2] || 'prod';
const nextBin = path.join(root, 'node_modules', '.bin', 'next');

function parseEnvFile(contents) {
	const entries = {};

	for (const rawLine of contents.split(/\r?\n/)) {
		const line = rawLine.trim();
		if (!line || line.startsWith('#')) continue;

		const separatorIndex = line.indexOf('=');
		if (separatorIndex === -1) continue;

		const key = line.slice(0, separatorIndex).trim();
		let value = line.slice(separatorIndex + 1);

		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1);
		}

		entries[key] = value;
	}

	return entries;
}

async function loadLocalEnv() {
	const localEnvPath = path.join(root, '.env.development');
	const contents = await readFile(localEnvPath, 'utf8');
	return parseEnvFile(contents);
}

async function main() {
	if (mode === 'local') {
		const localEnv = await loadLocalEnv();
		Object.assign(process.env, localEnv);
		process.env.STRAPI_DEV_URL ||= 'http://localhost:1337';
		process.env.STRAPI_INTERNAL_URL ||= 'http://localhost:1337';
		process.env.STRAPI_SSG_URL ||= 'http://localhost:1337';
		process.env.STRAPI_URL ||= 'http://localhost:1337';
		process.env.NEXT_PUBLIC_STRAPI_URL ||= 'http://localhost:1337';
		process.env.SITE_URL ||= 'http://localhost:3000';
		process.env.NEXT_PUBLIC_SITE_URL ||= 'http://localhost:3000';
		process.env.SITE_DOMAIN ||= 'localhost';
		process.env.NEXT_PUBLIC_SITE_DOMAIN ||= process.env.SITE_DOMAIN;
		process.env.NEXT_PUBLIC_ANALYTICS_ENABLED ||= 'false';
	}

	const buildResult = await new Promise((resolve, reject) => {
		const child = spawn(nextBin, ['build'], {
			cwd: root,
			env: process.env,
			stdio: 'inherit',
		});

		child.on('error', reject);
		child.on('exit', (code, signal) => {
			if (signal) {
				reject(new Error(`next build terminated by signal ${signal}`));
				return;
			}

			resolve(code ?? 1);
		});
	});

	if (buildResult !== 0) {
		process.exit(buildResult);
	}

	const prepareResult = await new Promise((resolve, reject) => {
		const child = spawn(process.execPath, ['./scripts/prepare-standalone.mjs'], {
			cwd: root,
			env: process.env,
			stdio: 'inherit',
		});

		child.on('error', reject);
		child.on('exit', (code, signal) => {
			if (signal) {
				reject(new Error(`prepare-standalone terminated by signal ${signal}`));
				return;
			}

			resolve(code ?? 1);
		});
	});

	if (prepareResult !== 0) {
		process.exit(prepareResult);
	}
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
