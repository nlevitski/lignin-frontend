const DEFAULT_STRAPI_URL = 'http://localhost:1337';

export function getStrapiBaseUrl(): string {
	const isDev = process.env.NODE_ENV !== 'production';
	return (
		(isDev ? process.env.STRAPI_DEV_URL : undefined) ||
		process.env.STRAPI_SSG_URL ||
		process.env.STRAPI_INTERNAL_URL ||
		process.env.STRAPI_URL ||
		process.env.NEXT_PUBLIC_STRAPI_URL ||
		DEFAULT_STRAPI_URL
	);
}
