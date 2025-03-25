import { MetadataRoute } from 'next';

const baseUrl = 'http://95.182.120.240:3000';
export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: ['/admin'],
		},
		sitemap: `${baseUrl}/sitemap.xml`,
	};
}
