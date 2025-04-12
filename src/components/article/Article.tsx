import { ArticleItem } from '@/dal/articles';
import styles from './article.module.scss';

type ArticleProps = {
	article: ArticleItem;
};
export const Article = ({ article }: ArticleProps) => {
	return (
		<div className={styles.article}>
			{article.title && <h1>{article.title}</h1>}
			<div className={styles.cover}></div>
			{article.subtitle && <h2>{article.subtitle}</h2>}
		</div>
	);
};
