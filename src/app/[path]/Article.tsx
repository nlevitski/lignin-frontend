import { Button } from '@/components/button/Button';
import { ArticleItem } from '@/dal/articles';
import styles from './articlePage.module.scss';
import Image from 'next/image';
import RichTextRenderer from '@/utils/RichTextRenderer';

type ArticleProps = {
	article: ArticleItem;
};
export const revalidate = 60;
export const Article = ({ article }: ArticleProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.holder}>
				<h1 className={styles.title}>{article.title}</h1>

				<div className={styles.imgBox}>
					<Image
						className={styles.img}
						src={article.cover.url}
						alt={article.cover.name}
						width={article.cover.width}
						height={article.cover.height}
					/>
					<p className={styles.imgCaption}>{article.imgCaption}</p>
				</div>
				<h2 className={styles.subtitle}>{article.subtitle}</h2>
				<p className={styles.paragraph}>
					<em>
						<strong>{article.mission}</strong>
					</em>
				</p>
				<RichTextRenderer
					content={article.content || []}
					styles={styles}
					imageSizes='(max-width: 768px) 100vw, 50vw'
				/>
			</div>
			<Button
				href='/articles'
				type={'secondary'}
				large
				bold
				reducePaddingH
				value={'Вернуться к статьям'}
				alignSelf
				style={{ margin: '30px 0 0' }}
			/>
		</div>
	);
};
