import type { NextConfig } from 'next';

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
};

export default nextConfig;
