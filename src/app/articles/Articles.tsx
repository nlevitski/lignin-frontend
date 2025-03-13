import styles from './articles.module.scss';
import Image from 'next/image';
import { ArticleItem, ArticlesResponse } from '@/dal/articles';
import Link from 'next/link';

type ArticlesProps = {
	articles: ArticlesResponse<ArticleItem[]>;
};

export const Articles = ({ articles }: ArticlesProps) => {
	return (
		<div className={styles.articles}>
			<div className={styles.container}>
				<h1 className={`${styles.title} ${styles.upper}`}>
					Статьи о применении лигнина
				</h1>
				<ul className={styles.articleList}>
					{articles.data.slice(0, 20).map((article) => {
						const { url, name } = article.cover.formats.small;
						return (
							<li className={styles.articleItem} key={article.id}>
								<div className={styles.imgBox}>
									<Image
										src={`http://localhost:1337${url}`}
										alt={name}
										className={styles.img}
										fill
										sizes='(max-width: 480px) 160px, (max-width: 768px) 240px, (max-width: 1280px) 300px, 300px'
									/>
								</div>
								<div className={styles.textBox}>
									<h2 className={styles.articleTitle}>{article.title}</h2>
									<p className={styles.articleDate}>
										{new Date(article.publishedAt).toLocaleDateString('ru-RU', {
											day: '2-digit',
											month: '2-digit',
											year: 'numeric',
										})}
									</p>
									<p className={styles.articleAnnotation}>{article.subtitle}</p>
								</div>
								<Link href={`articles/${article.documentId}`}>{'Читать'}</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};
