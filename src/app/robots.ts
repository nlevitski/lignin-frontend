import { MetadataRoute } from 'next';

const baseUrl = 'http://ligninsorbent.ru';
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
