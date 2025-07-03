'use client';
import styles from './articles.module.scss';
import Image from 'next/image';
import { ArticleItem, ArticlesResponse, ExcludedArticle } from '@/dal/articles';
import { Document } from '@/dal/common';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type ArticlesProps = {
	articles: ArticlesResponse<Document<ArticleItem>[]>;
	excludedArticles: ArticlesResponse<Document<ExcludedArticle>[]>;
};

export const Articles = ({ articles, excludedArticles }: ArticlesProps) => {
	const currentArticles = articles.data.filter(
		(article) =>
			!excludedArticles.data.some(
				(exclude) => exclude.article.documentId === article.documentId
			)
	);
	const [windowWidth, setWindowWidth] = useState(320);
	const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (windowWidth < 961) {
			titleRefs.current.forEach((el: HTMLElement | null) => {
				if (el) el.style.height = 'auto';
			});
			return;
		}

		const cardsPerRow = windowWidth >= 1281 ? 4 : 3;

		for (let i = 0, len = currentArticles.length; i < len; i += cardsPerRow) {
			const rowTitles = titleRefs.current.slice(i, i + cardsPerRow);
			const maxHeight = rowTitles.reduce(
				(max: number, element: HTMLElement | null) => {
					if (!element) return max;
					element.style.height = 'auto';
					return Math.max(max, element.getBoundingClientRect().height);
				},
				0
			);

			rowTitles.forEach((element: HTMLElement | null) => {
				if (element) element.style.height = `${maxHeight}px`;
			});
		}
	}, [currentArticles, windowWidth]);
  
	return (
		<ul className={styles.articleList}>
			{currentArticles.map((article, index) => {
				return (
					<li className={styles.articleItem} key={article.id}>
						<Link href={`${article.path}`} className={styles.articleLink}>
							{(
								<div className={styles.imgBox}>
									<Image
										src={article.cover.url}
										alt={article.cover.name}
										className={styles.img}
										fill
										sizes='(max-width: 480px) 160px, (max-width: 768px) 240px, (max-width: 1280px) 300px, 300px'
										style={{ objectFit: 'cover' }}
									/>
								</div>
							)}
							<div className={styles.textBox}>
								<h2
									className={styles.articleTitle}
									ref={(el) => {
										titleRefs.current[index] = el;
									}}
								>
									{article.title}
								</h2>
								<p className={styles.articleDate}>
									{new Date(article.publishedAt)
										.toLocaleDateString('ru-RU', {
											day: '2-digit',
											month: '2-digit',
											year: 'numeric',
										})
										.replace(/\./g, '-')}
								</p>

								<p className={styles.articleSummary}>{article.summary}</p>
							</div>
						</Link>
					</li>
				);
			})}
		</ul>
	);
};
