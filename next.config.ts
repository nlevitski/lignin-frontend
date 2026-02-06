import type { NextConfig } from 'next';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

const devDomain = process.env.DEV_DOMAIN;
const strapiInternalUrl =
	process.env.STRAPI_INTERNAL_URL ??
	process.env.STRAPI_URL ??
	'http://localhost:1337';
const strapiUrl = new URL(strapiInternalUrl);

const remotePatterns: NonNullable<NextConfig['images']>['remotePatterns'] = [
	{
		protocol: 'http', // или 'https' в продакшене
		hostname: 'localhost',
		pathname: '/**', // Разрешить все пути
	},
	{
		protocol: strapiUrl.protocol.replace(':', '') as 'http' | 'https',
		hostname: strapiUrl.hostname,
		port: strapiUrl.port || undefined,
		pathname: '/uploads/**', // Только для путей Strapi uploads
	},
	// Добавляем шаблон для API, если вы хотите использовать изображения оттуда
	{
		protocol: strapiUrl.protocol.replace(':', '') as 'http' | 'https',
		hostname: strapiUrl.hostname,
		port: strapiUrl.port || undefined,
		pathname: '/api/**', // Для API путей
	},
];

if (devDomain) {
	remotePatterns.push({
		protocol: 'http',
		hostname: devDomain,
		pathname: '/**',
	});
}

const nextConfig: NextConfig = {
	/* config options here */
	output: 'standalone',
	images: {
		remotePatterns,
	},
	async rewrites() {
		return [
			{
				source: '/uploads/:path*',
				destination: `${strapiInternalUrl}/uploads/:path*`,
			},
			{
				source: '/api/:path*',
				destination: `${strapiInternalUrl}/api/:path*`,
			},
		];
	},
	async redirects() {
		return [
			// Перенаправляем запросы к иконкам на статические файлы
			{
				source: '/apple-touch-icon.png',
				destination: '/apple-icon-180x180.png',
				permanent: false,
			},
			{
				source: '/apple-touch-icon-precomposed.png',
				destination: '/apple-icon-180x180.png',
				permanent: false,
			},
		];
	},
};

export default withVanillaExtract(nextConfig);
