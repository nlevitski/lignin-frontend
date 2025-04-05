import { getArticles } from '@/dal/articles';
import styles from './articles.module.scss';
import { Articles } from './Articles';

export async function generateMetadata() {
	return {
		title: 'Статьи о применении лигнина',
		description: 'Cтатьи о применении лигнина в различных сферах',
		keywords: 'Сорбент лигнин статьи научные исследования использование',
	};
}
export const revalidate = 60;
export default async function ArticlesPage() {
	const result = await getArticles();

	return (
		<div className={styles.articles}>
			<div className={styles.container}>
				<h1 className={`${styles.title} ${styles.upper}`}>
					Статьи о применении лигнина
				</h1>
				<Articles articles={result} />;
			</div>
		</div>
	);
}
