export default async function sitemap() {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
	const staticPages = [
		{
			url: `${baseUrl}`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/contact`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
	];
}
