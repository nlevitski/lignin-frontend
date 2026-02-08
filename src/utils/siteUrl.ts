const DEFAULT_SITE_URL = 'http://localhost:3000';

function normalizeBaseUrl(url: string): string {
	return url.replace(/\/+$/, '');
}

export function getSiteUrl(): string {
	const rawUrl =
		process.env.SITE_URL ||
		process.env.NEXT_PUBLIC_SITE_URL ||
		DEFAULT_SITE_URL;
	return normalizeBaseUrl(rawUrl);
}

export function getSiteDomain(): string {
	const explicit = process.env.SITE_DOMAIN;
	if (explicit && explicit.trim().length > 0) return explicit.trim();
	try {
		return new URL(getSiteUrl()).hostname;
	} catch {
		return 'localhost';
	}
}

export function toAbsoluteUrl(pathOrUrl?: string | null): string | undefined {
	if (!pathOrUrl) return undefined;
	try {
		return new URL(pathOrUrl, getSiteUrl()).toString();
	} catch {
		return pathOrUrl;
	}
}
