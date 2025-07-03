import Link from 'next/link';
import styles from './sitemap.module.scss';
import { getArticles } from '@/dal/articles';
import { getMetaTagsByPath } from '@/dal/metaTags';
import { getPageInfoByPath } from '@/dal/common';

const links = [
	{
		title:
			'Производим СОРБЕНТ, АДСОРБЕНТ, ЭНТЕРОСОРБЕНТ - ЛИГНИН очищенный. Сорбент для ЛАРН. Брикеты пеллеты из лигнина',
		description:
			'Производим СОРБЕНТ, АДСОРБЕНТ, ЭНТЕРОСОРБЕНТ - ЛИГНИН гидролизный высокой степени очистки. Сорбент для ЛАРН. Россия Беларусь Казахстан Узбекистан Грузия Молдова',
		href: '/',
	},
	{
		title: 'Cтатьи о применении лигнина в различных сферах',
		description: 'Сорбент лигнин статьи научные исследования использование',
		href: '/articles',
	},
];
// const defaultMetaTags = {
// 	title: 'Карта сайта - Лигнин гидролизный',
// 	description:
// 		'Производим СОРБЕНТ, АДСОРБЕНТ, ЭНТЕРОСОРБЕНТ - ЛИГНИН гидролизный высокой степени очистки. Сорбент для ЛАРН. Россия Беларусь Казахстан Узбекистан Грузия Молдова',
// 	alternates: {
// 		canonical: 'https://ligninsorbent.ru/sitemap',
// 	},
// 	openGraph: {
// 		title: 'Карта сайта - Лигнин гидролизный',
// 		description:
// 			'Производим СОРБЕНТ, АДСОРБЕНТ, ЭНТЕРОСОРБЕНТ - ЛИГНИН гидролизный высокой степени очистки',
// 		type: 'website',
// 		url: 'https://ligninsorbent.ru/sitemap',
// 	},
// };
export async function generateMetadata() {
	const { data: { seo } } = await getMetaTagsByPath('sitemap-page?populate[seo][populate][openGraph]=true');
	// const { title, description, ogTitle, ogDescription } =
	// 	data.find(({ path }) => path === '/sitemap') || {};
	
	return {
		alternates: {
			canonical: seo?.canonicalURL,
		},
		title: seo.metaTitle,
		description: seo.metaDescription,
		openGraph: {
			title: seo.openGraph.ogTitle,
			description: seo.openGraph.ogDescription,
			type: seo.openGraph.ogType,
			url: seo.openGraph.ogUrl,
		},
	};
}
export default async function SitemapPage() {
	const { 0: { data: { title } }, 1: { data: articles } } = await Promise.all([
		getPageInfoByPath('sitemap-page'),
		getArticles(),
	]);
	const newArticles = articles
		.filter((a) => a.path !== 'hydrolyzedlignin')
		.map((article) => ({
			title: article.title,
			description: article.metaDescription,
			href: `/${article.path}`,
		}));
	const currentLinks = [...links, ...newArticles];
	return (
		<div className={styles.container}>
			<div className={styles.holder}>
				<h1 className={styles.header}>{title}</h1>
				{currentLinks.map((link) => (
					<Link className={styles.link} href={link.href} key={link.href}>
						<h2 className={styles.title}>{link.title}</h2>
						<p className={styles.description}>{link.description}</p>
					</Link>
				))}
			</div>
		</div>
	);
}
