// import Image from "next/image";
import { Brief } from '@/components/brief/Brief';
import styles from './page.module.scss';
import { Card } from '@/components/card/Card';
import { Hero } from '@/components/hero/Hero';
import { Samples } from '@/components/samples/Samples';
import { Widget } from '@/components/widget/Widget';
import { Button } from '@/components/button/Button';
import {
	getArticleWithWidgetOrder,
	getBigboardsWithTeasers,
} from '@/dal/articles';
import { pickImgSize } from '@/utils/pickImgSizes';
import { Features } from '@/components/features/Features';

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

export default async function Home() {
	const {
		0: { data: bigboardsData },
		1: { data: articlesDataWithWidgetOrder },
	} = await Promise.all([
		getBigboardsWithTeasers(),
		getArticleWithWidgetOrder(),
	]);
	const mainArticle = bigboardsData.find(
		(bigboard) => bigboard.article.documentId === bigboardArticleDocumentId
	)!;

	const mainCover = pickImgSize(mainArticle.article.cover.formats);
	const bigboardArticles = bigboardsData.filter(
		(bigboard) => bigboard.article.documentId !== bigboardArticleDocumentId
	);

	const sortedArticleWidthWidgetorder = articlesDataWithWidgetOrder.sort(
		(a, b) => (a.widgetOrder > b.widgetOrder ? 1 : -1)
	);

	return (
		<div>
			<Hero />
			<Brief
				title={mainArticle.article.title}
				readMoreUrl={`/${mainArticle.article.path}`}
				imgUrl={mainCover.url}
				imgAlt={mainCover.name}
				bgUrl={'/images/backgrounds/'}
				teaser={mainArticle.article.teaser || []}
				style={{ objectFit: 'initial' }}
				aspectRatio={{ aspectRatio: '779 / 716' }}
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

			{bigboardArticles.map(({ article }) => {
				const currentImg = pickImgSize(article.cover.formats);
				return (
					<Brief
						id={article.path}
						key={article.documentId}
						title={article.title}
						readMoreUrl={`/${article.path}`}
						imgUrl={currentImg.url}
						imgAlt={currentImg.name}
						bgUrl={'/images/backgrounds/'}
						teaser={article.teaser || []}
						style={{ objectPosition: '75% 50%' }}
					/>
				);
			})}
			<div className={styles.container}>
				<ul className={styles.widgets}>
					{/* {unitedArticles.map((a, i) => (
						<li className={styles.widgetItem} key={i}>
							<Widget
								title={a.title}
								subtitle={a.subtitle}
								summary={a.summary}
								bgImgUrl={a.bgImgUrl}
								articleUrl={a.articleUrl}
							/>
							
						</li>
					))} */}
					{sortedArticleWidthWidgetorder.map(({ article, widgetOrder }) => (
						<li className={styles.widgetItem} key={widgetOrder}>
							<Widget
								title={article.titleSmall}
								subtitle={article?.subtitle}
								summary={article.summary}
								bgImgUrl={article.cover.formats.small.url}
								articleUrl={`/${article.path}`}
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
			<div className={styles.container} id='about-us-section'>
				<h2 className={`${styles.title} ${styles.upper}`}>О нас</h2>
				<p className={styles.center}>
					Компания в 2018 году занялась переработкой и высокой очисткой
					гидролизного лигнина, чистота которого позволяет широко использовать
					его в различных сферах.
				</p>
				<ul className={styles.aboutUsList}>
					<li>
						Лигнин высокой степени очистки не имеет химического вмешательства во
						время очистки, поэтому на выходе мы получаем абсолютно чистый
						продукт различной степени влажности.
					</li>
					<li>
						Лигнин очищенный технический - переработанное, просеянное и
						высушенное сырье, которое находит свое применение не только в
						промышленности, но и в энергетике и многих других сферах.
					</li>
					<li>
						Экологически чистое топливо в виде брикета или пеллет выгодно
						отличается на фоне других своей крепостью, теплоотдачей,
						влагостойкостью и многими другими показателями.
					</li>
					<li>
						Так же предлагаем лигнин из отвалов навалом или фасованный в
						биг-бэги. Самовывоз или доставка.
					</li>
				</ul>
				<p className={styles.center}>
					Работаем с компаниями из Беларуси, России, Украины, Узбекистана,
					Казахстана, Польши, Литвы, Латвии и другими странами.
				</p>
				<h3 className={`${styles.subtitle} ${styles.upper}`}>
					Мы производим высококачественное сырье и топливо для вашего
					производства
				</h3>
				<Samples />
			</div>
		</div>
	);
}
