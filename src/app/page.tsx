// import Image from "next/image";
import { Brief } from '@/components/brief/Brief';
import styles from './page.module.scss';
import { Card } from '@/components/card/Card';
import { Feedback } from '@/components/feedback/Feedback';
import { Hero } from '@/components/hero/Hero';
import { Samples } from '@/components/samples/Samples';
import { Widget } from '@/components/widget/Widget';
import { Button } from '@/components/button/Button';
import { getArticles } from '@/dal/articles';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
// const phoneNumber = '+375297290243';
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
const articles = [
	{
		title:
			'Лигнин в качестве удобрения. Повышение урожайности и качества почвы',
		subtitle: 'Лигнин – субстрат для выращивания овощей',
		bgImgUrl: '/images/webp/articles/000_fertilizer.webp',
		articleUrl: '/articles/#',
	},
	{
		title:
			'Применение лигнина в качестве выгорающей добавки для производства кирпича',
		subtitle:
			'Лигнин можно применять в производстве кирпича в качестве выгорающей добавки',
		bgImgUrl: '/images/webp/articles/001_burnoutagent.webp',
		articleUrl: '/articles/#',
	},
	{
		title: 'Вторая жизнь лигнина. Удобрение. Плодородие и улучшение почвы',
		subtitle: 'Лигнин в качестве органической добавки предпринимались давно',
		bgImgUrl: '/images/webp/articles/002_soil.webp',
		articleUrl: '/articles/#',
	},
	{
		title: 'Применение лигнин для производства асфальта',
		subtitle: 'Лигнин - связующее вещество для асфальтирования дорог',
		bgImgUrl: '/images/webp/articles/003_asphalt.webp',
		articleUrl: '/articles/#',
	},
];
export default async function Home() {
	const { data } = await getArticles();

	return (
		<div>
			<Hero />
			<Brief
				title={'Лигнин, что это?'}
				readMoreUrl={'/articles'}
				imgUrl={'/images/webp/articles/000_fertilizer.webp'}
				bgUrl={'/images/backgrounds/'}
				imgCaption={'fertilizer'}
			>
				{['some', 'any', 'every'].map((unit, i) => (
					<p key={i}>{unit}</p>
				))}
			</Brief>
			<BlocksRenderer content={data[21].content.slice(0, 5)} />
			<div className={styles.container}>
				<ul className={styles.widgets}>
					{articles.map((a, i) => (
						<li className={styles.widgetItem} key={i}>
							<Widget
								title={a.title}
								subtitle={a.subtitle}
								bgImgUrl={a.bgImgUrl}
								articleUrl={a.articleUrl}
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
			<div className={styles.container}>
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
			<Feedback />
			<div className={styles.features}>
				{features.map((f) => (
					<Card
						key={f.caption}
						imgUrl={f.imgUrl}
						imgAlt={f.imgAlt}
						caption={f.caption}
					/>
				))}
			</div>
		</div>
	);
}
