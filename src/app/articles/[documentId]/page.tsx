import { getArticleByDocumentId, getArticles } from '@/dal/articles';
import { Article } from './Article';

export async function generateStaticParams() {
	const { data } = await getArticles();
	return data.map(({ documentId }) => ({ documentId }));
}

export default async function ArticlePage({
	params,
}: {
	params: Promise<{ documentId: string }>;
}) {
	const { documentId } = await params;
	const { data } = await getArticleByDocumentId(documentId);

	return <Article article={data} />;
}
