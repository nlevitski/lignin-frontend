import { getArticleByPath, getArticles } from '@/dal/articles';
import { Article } from './Article';

export async function generateStaticParams() {
	const { data } = await getArticles();

	return data
		.map(({ path }) => path)
		.filter((path) => typeof path === 'string' && path.trim().length > 0)
		.map((path) => ({ path }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ path: string }>;
}) {
	const { path } = await params;
	const { data } = await getArticleByPath(path);
	const nonEmpty = (value?: string | null) =>
		value && value.trim().length > 0 ? value : undefined;
	const coverUrl = nonEmpty(data.cover?.url);
	const metaDescription = nonEmpty(data?.metaDescription);
	const metaKeywords = nonEmpty(data?.metaKeywords);
	return {
		title: data.title,
		description: metaDescription,
		keywords: metaKeywords,
		alternates: {
			canonical: `https://ligninsorbent.ru/${path}`,
		},
		openGraph: {
			title: data.title,
			description: metaDescription,
			type: 'website',
			url: `https://ligninsorbent.ru/${path}`,
			images: coverUrl
				? [`https://ligninsorbent.ru${coverUrl}`]
				: undefined,
		},
	};
}
export const revalidate = 3600;
export default async function ArticlePage({
	params,
}: {
	params: Promise<{ path: string }>;
}) {
	const { path } = await params;
	const { data } = await getArticleByPath(path);
	return <Article article={data} />;
}
