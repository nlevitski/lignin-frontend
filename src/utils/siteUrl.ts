const DEFAULT_SITE_URL = 'http://localhost:3000';
const DEFAULT_SITE_DOMAIN = 'ligninsorbent.ru';
const SUPPORTED_SITE_DOMAINS = ['lignin.by', 'ligninsorbent.ru'] as const;

export type SiteDomain = (typeof SUPPORTED_SITE_DOMAINS)[number];

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

export function getCurrentSite(): SiteDomain {
	const domain = getSiteDomain();

	return SUPPORTED_SITE_DOMAINS.includes(domain as SiteDomain)
		? (domain as SiteDomain)
		: DEFAULT_SITE_DOMAIN;
}

export function toAbsoluteUrl(pathOrUrl?: string | null): string | undefined {
	if (!pathOrUrl) return undefined;
	try {
		return new URL(pathOrUrl, getSiteUrl()).toString();
	} catch {
		return pathOrUrl;
	}
}
