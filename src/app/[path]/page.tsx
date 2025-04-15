import { getArticleByPath, getArticles } from '@/dal/articles';
import { Article } from './Article';

export async function generateStaticParams() {
	const { data } = await getArticles();

	return data.map(({ path }) => ({ path }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ path: string }>;
}) {
	const { path } = await params;
	const { data } = await getArticleByPath(path);
	return {
		title: data.title,
		description: data?.metaDescription || '',
		keywords: data?.metaKeywords || '',
		alternates: {
			canonical: `https://ligninsorbent.ru/${path}`,
		},
		openGraph: {
			title: data.title,
			description: data?.metaDescription || '',
			type: 'website',
			url: `https://ligninsorbent.ru/${path}`,
			image: [`https://ligninsorbent.ru${data.cover?.url}`],
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
