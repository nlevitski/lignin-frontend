import { getArticles, getExcludedArticles } from '@/dal/articles';
import styles from './articles.module.scss';
import { Articles } from './Articles';
import { Metadata } from 'next/types';

// export async function generateMetadata() {
// 	return {
// 		title: 'Статьи о применении лигнина',
// 		description: 'Cтатьи о применении лигнина в различных сферах',
// 		keywords: 'Сорбент лигнин статьи научные исследования использование',
// 	};
// }
export const revalidate = 60;

export const metadata: Metadata = {
	title: 'Лигнин. Статьи. Научные исследования',
	description: 'Cтатьи о применении лигнина в различных сферах',
	keywords: 'Сорбент лигнин статьи научные исследования использование',
	alternates: {
		canonical: 'https://ligninsorbent.ru/articles',
	},
	openGraph: {
		title: 'Лигнин. Статьи. Научные исследования',
		description: 'Cтатьи о применении лигнина в различных сферах',
		type: 'website',
		url: 'https://ligninsorbent.ru/articles',
		images: ['https://ligninsorbent.ru/images/webp/backgrounds/bg4.webp'],
	},
};
export default async function ArticlesPage() {
	const { 0: result, 1: excludedArticles } = await Promise.all([
		getArticles(),
		getExcludedArticles(),
	]);

	return (
		<div className={styles.articles}>
			<div className={styles.container}>
				<h1 className={`${styles.title} ${styles.upper}`}>
					Статьи о применении лигнина
				</h1>
				<Articles articles={result} excludedArticles={excludedArticles} />;
			</div>
		</div>
	);
}
