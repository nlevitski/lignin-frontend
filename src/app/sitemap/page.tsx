import Link from 'next/link';
import styles from './sitemap.module.scss';
import { getArticles } from '@/dal/articles';
import { getSitemapsByDomain } from '@/dal/sitemaps';
import { getSiteDomain, toAbsoluteUrl } from '@/utils/siteUrl';

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
	const domain = getSiteDomain();
	const { data } = await getSitemapsByDomain(domain);
	const entry = data?.[0];
	if (entry?.seo) {
		return {
			alternates: {
				canonical: toAbsoluteUrl(entry.seo.canonicalURL),
			},
			title: entry.seo.metaTitle,
			description: entry.seo.metaDescription,
			openGraph: {
				title: entry.seo.openGraph.ogTitle,
				description: entry.seo.openGraph.ogDescription,
				type: entry.seo.openGraph.ogType,
				url: toAbsoluteUrl(entry.seo.openGraph.ogUrl),
			},
		};
	}
	return {};
}
export default async function SitemapPage() {
	const domain = getSiteDomain();
	const { 0: sitemapRes, 1: { data: articles } } = await Promise.all([
		getSitemapsByDomain(domain),
		getArticles(),
	]);
	const title = sitemapRes.data?.[0]?.title;
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
				<h1 className={styles.header}>{title || 'Карта сайта'}</h1>
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
