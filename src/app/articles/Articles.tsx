import styles from './articles.module.scss';
import Image from 'next/image';
import { ArticleItem, ArticlesResponse } from '@/dal/articles';
import Link from 'next/link';

type ArticlesProps = {
	articles: ArticlesResponse<ArticleItem[]>;
};

const toExcludePaths = ['hydrolyzedlignin', 'application'];

export const Articles = ({ articles }: ArticlesProps) => {
	const currentArticles = articles.data.filter(
		(article) => !toExcludePaths.includes(article.path)
	);
	return (
		<div className={styles.articles}>
			<div className={styles.container}>
				<h1 className={`${styles.title} ${styles.upper}`}>
					Статьи о применении лигнина
				</h1>
				<ul className={styles.articleList}>
					{currentArticles.map((article) => {
						return (
							<li className={styles.articleItem} key={article.id}>
								<Link
									href={`articles/${article.path}`}
									className={styles.articleLink}
								>
									{!!article.cover?.formats?.small && (
										<div className={styles.imgBox}>
											<Image
												src={article.cover.formats.small.url}
												alt={article.cover.formats.small.name}
												className={styles.img}
												fill
												sizes='(max-width: 480px) 160px, (max-width: 768px) 240px, (max-width: 1280px) 300px, 300px'
											/>
										</div>
									)}
									<div className={styles.textBox}>
										<h2 className={styles.articleTitle}>{article.title}</h2>
										<p className={styles.articleDate}>
											{new Date(article.publishedAt).toLocaleDateString(
												'ru-RU',
												{
													day: '2-digit',
													month: '2-digit',
													year: 'numeric',
												}
											)}
										</p>
										<p className={styles.articleAnnotation}>
											{article.subtitle}
										</p>
									</div>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};
