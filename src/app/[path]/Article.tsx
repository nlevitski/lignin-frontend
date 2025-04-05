import { Button } from '@/components/button/Button';
import { ArticleItem } from '@/dal/articles';
import styles from './articlePage.module.scss';
import Image from 'next/image';
import RichTextRenderer, { RichTextContent } from '@/utils/RichTextRenderer';

import { pickImgSize } from '@/utils/pickImgSizes';

type ArticleProps = {
	article: ArticleItem;
};
export const revalidate = 60;
export const Article = ({ article }: ArticleProps) => {
	const format = pickImgSize(article.cover.formats);
	return (
		<div className={styles.container}>
			<div className={styles.holder}>
				<h1 className={styles.title}>{article.title}</h1>

				<div className={styles.imgBox}>
					<Image
						className={styles.img}
						src={format.url}
						alt={format.name}
						width={format.width}
						height={format.height}
					/>
					{/* <img
						className={styles.img}
						src={format.url}
						alt={format.name}
						width={format.width}
						height={format.height}
					/> */}
					<p className={styles.imgCaption}>{article.imgCaption}</p>
				</div>
				<h2 className={styles.subtitle}>{article.subtitle}</h2>
				<p className={styles.paragraph}>
					<em>
						<strong>{article.mission}</strong>
					</em>
				</p>
				<RichTextRenderer
					content={(article.content as RichTextContent) || []}
					styles={styles}
					imageSizes='(max-width: 768px) 100vw, 768px'
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
