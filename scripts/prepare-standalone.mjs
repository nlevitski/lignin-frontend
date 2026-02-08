import { cp, mkdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const standaloneDir = path.join(root, '.next', 'standalone');
const standaloneNextDir = path.join(standaloneDir, '.next');
const standaloneStaticDir = path.join(standaloneNextDir, 'static');
const staticDir = path.join(root, '.next', 'static');
const publicDir = path.join(root, 'public');
const standalonePublicDir = path.join(standaloneDir, 'public');

await mkdir(standaloneNextDir, { recursive: true });

await cp(staticDir, standaloneStaticDir, { recursive: true });
await cp(publicDir, standalonePublicDir, { recursive: true });

console.log('Standalone assets copied.');
