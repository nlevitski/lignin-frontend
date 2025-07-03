import type { NextConfig } from 'next';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'http', // или 'https' в продакшене
				hostname: 'localhost',
				pathname: '/**', // Разрешить все пути
			},
			{
				protocol: 'http',
				hostname: process.env.DEV_DOMAIN ?? '',
				pathname: '/**',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '1337', // Для Strapi
				pathname: '/uploads/**', // Только для путей Strapi uploads
			},
			// Добавляем шаблон для API, если вы хотите использовать изображения оттуда
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '1337', // Для Strapi
				pathname: '/api/**', // Для API путей
			},
		],
	},
	async rewrites() {
		return [
			{
				source: '/uploads/:path*',
				destination: 'http://localhost:1337/uploads/:path*',
			},
			{
				source: '/api/:path*',
				destination: 'http://localhost:1337/api/:path*',
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
