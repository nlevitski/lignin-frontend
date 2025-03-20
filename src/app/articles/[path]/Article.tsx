import { Button } from '@/components/button/Button';
import { ArticleItem } from '@/dal/articles';
import styles from './articlePage.module.scss';

import RichTextRenderer, { RichTextContent } from '@/utils/RichTextRenderer';

// import { Typography } from '@/components/typography/Typography';
type ArticleProps = {
	article: ArticleItem;
};
// const cx = classNames.bind(styles);

export const Article = ({ article }: ArticleProps) => {
	return (
		<div className={styles.container}>
			{<div>{article.path}</div>}
			<RichTextRenderer
				content={(article.content as RichTextContent) || []}
				styles={styles}
				imageSizes='(max-width: 768px) 100vw, 768px'
			/>
			{/* <BlocksRenderer
				content={article.content}
				blocks={{
					paragraph: ({ children }) => (
						<p className={cx('paragraph')}>{children}</p>
					),
					heading: ({ children, level }) => {
						const Header = `h${level}` as keyof JSX.IntrinsicElements;
						return (
							<Header className={cx('header', `header-${level}`)}>
								{children}
							</Header>
						);
					},
					link: ({ children, url }) => <a href={url}>{children}</a>,
					image: ({ image }) => (
						<img src={image?.url ?? ''} alt={image?.caption ?? ''} />
					),
				}}
			/> */}
			<Button
				href='/'
				type={'secondary'}
				large
				bold
				reducePaddingH
				value={'Вернуться на главную'}
			/>
		</div>
	);
};
