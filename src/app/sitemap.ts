import { getArticles } from '@/dal/articles';
import { MetadataRoute } from 'next/types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = 'http://95.182.120.240:3000';
	const { data: articles } = await getArticles();

	return [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'monthly' as const,
			priority: 1,
		},
		{
			url: `${baseUrl}/articles`,
			lastModified: new Date(),
			changeFrequency: 'monthly' as const,
			priority: 0.9,
		},
		...articles.map((article) => ({
			url: `${baseUrl}/${article.path}`,
			lastModified: new Date(article.updatedAt),
			changeFrequency: 'monthly' as const,
			priority: 0.8,
		})),
	];
}
