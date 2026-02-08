import { MetadataRoute } from 'next';
import { getSiteUrl } from '@/utils/siteUrl';

const baseUrl = getSiteUrl();
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
