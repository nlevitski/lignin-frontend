// import Image from "next/image";
import { Brief } from '@/components/brief/Brief';
import styles from './page.module.scss';
import { Card } from '@/components/card/Card';
import { Hero } from '@/components/hero/Hero';
import { Samples } from '@/components/samples/Samples';
import { Widget } from '@/components/widget/Widget';
import { Button } from '@/components/button/Button';
import {
	getAboutUsContent,
	getArticlesPageContent,
	getArticleWithWidgetOrder,
	getBigboardsWithTeasers,
} from '@/dal/articles';
import { getHeroContent } from '@/dal/hero';
import { Features } from '@/components/features/Features';
import { AboutUs } from '@/components/aboutUs/AboutUs';


type Pagination = {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
};

export type ArticlesMeta = {
	pagination: Pagination;
};
type Feature = {
	imgUrl: string;
	imgAlt: string;
	caption: string;
};

const features: Feature[] = [
	{
		imgUrl: '/images/webp/feature-feed.webp',
		imgAlt: 'Адсорбент для кормовых добавок',
		caption: 'Эффективный адсорбент для кормовых добавок',
	},
	{
		imgUrl: '/images/webp/feature-fertilizers.webp',
		imgAlt: 'Компонент для удобрений',
		caption: 'Компонент для приготовления удобрений',
	},
	{
		imgUrl: '/images/webp/feature-recycle.webp',
		imgAlt: 'Вид топлива',
		caption: 'Дешевый и экологически чистый вид топлива',
	},
	{
		imgUrl: '/images/webp/feature-drugs.webp',
		imgAlt: 'Лекарственные препараты',
		caption: 'Производство лекарственных препаратов и бадов',
	},
	{
		imgUrl: '/images/webp/feature-petrolium.webp',
		imgAlt: 'Нефть',
		caption: 'Сорбент для ликвидации разливов нефти',
	},
];

const bigboardArticleDocumentId = 'r82tukj30x59ztiojp2d9yzp';
export const revalidate = 3600;

export default async function Home() {
	const {
		0: { data: bigboardsData },
		1: { data: articlesDataWithWidgetOrder },
		2: { data: aboutUsData },
		3: { data: heroData },
		4: { data: articlesData },
	} = await Promise.all([
		getBigboardsWithTeasers(),
		getArticleWithWidgetOrder(),
		getAboutUsContent(),
		getHeroContent(),
		getArticlesPageContent(),
	]);
	const mainArticle = bigboardsData.find(
		(bigboard) => bigboard.article.documentId === bigboardArticleDocumentId
	)!;

	const bigboardArticles = bigboardsData.filter(
		(bigboard) => bigboard.article.documentId !== bigboardArticleDocumentId
	);

	const sortedArticleWithWidgetOrder = articlesDataWithWidgetOrder.sort(
		(a, b) => (a.widgetOrder > b.widgetOrder ? 1 : -1)
	);
  
	return (
		<div id='home'>
			<Hero data={heroData} />
			<Brief
				id={mainArticle.article.path}
				title={mainArticle.article.title}
				readMoreUrl={`/${mainArticle.article.path}`}
				cover={mainArticle.cover}
        background={mainArticle.background}
				teaser={mainArticle.article.teaser || []}
				style={{ objectFit: 'initial' }}
				aspectRatio={{ aspectRatio: '779 / 716' }}
				mobileBgOff={true}
			/>
			<Features>
				{features.map((f) => (
					<Card
						key={f.caption}
						imgUrl={f.imgUrl}
						imgAlt={f.imgAlt}
						caption={f.caption}
					/>
				))}
			</Features>

			{bigboardArticles.map(({ article, background, cover }) => {
				return (
					<Brief
						id={article.path}
						key={article.documentId}
						title={article.title}
						readMoreUrl={`/${article.path}`}
						cover={cover}
						background={background}
						teaser={article.teaser || []}
						mission={article.mission}
						style={{ objectPosition: '75% 50%' }}
					/>
				);
			})}
			<div
				className={styles.container}
				style={{
					backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.8) 100%), url('/images/webp/backgrounds/bg4.webp')`,
				}}
			>
				<div className={`${styles.holder} ${styles.holder_mobileBgOff}`}>
					<h2 className={`${styles.title} ${styles.upper}`}>
						{/* Статьи о применении лигнина */}
						{articlesData.title}
					</h2>
					<ul className={styles.widgets}>
						{sortedArticleWithWidgetOrder.map(({ article, widgetOrder }) => (
							<li className={styles.widgetItem} key={widgetOrder}>
								<Widget
                  id={article.documentId}
									title={article.titleSmall}
									subtitle={article?.subtitle}
									summary={article.summary}
									articleUrl={`/${article.path}`}
                  cover={article.cover}
								/>
							</li>
						))}
					</ul>
					<Button
						href={`/articles`}
						value={'Читать другие статьи'}
						type={'secondary'}
						bold
						large
					/>
				</div>
			</div>
			<div
				className={styles.container}
				style={{
					backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.8) 100%), url('/images/webp/backgrounds/bg9.webp')`,
				}}
			>
				<div
					className={`${styles.holder} ${styles.holder_mobileBgOff} ${styles.ph20} ${styles.center}`}
					id='about-us-section'
				>
					<div className={styles.aboutWrapper}>
						<AboutUs aboutUsData={aboutUsData} />
					</div>
					<Samples />
				</div>
			</div>
		</div>
	);
}
