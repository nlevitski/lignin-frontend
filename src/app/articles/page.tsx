import { getArticles } from '@/dal/articles';
import { Articles } from './Articles';

export default async function ArticlesPage() {
	const articles = await getArticles();
	// const articles = [{ title: '', subtitle: '', content: ['', '', ''] }];
	return <Articles articles={articles} />;
}
