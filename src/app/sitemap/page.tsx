import Link from 'next/link';
import styles from './sitemap.module.scss';
import { getArticles } from '@/dal/articles';
import { getMetaTags } from '@/dal/metaTags';

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
const defaultMetaTags = {
	title: 'Карта сайта - Лигнин гидролизный',
	description:
		'Производим СОРБЕНТ, АДСОРБЕНТ, ЭНТЕРОСОРБЕНТ - ЛИГНИН гидролизный высокой степени очистки. Сорбент для ЛАРН. Россия Беларусь Казахстан Узбекистан Грузия Молдова',
	alternates: {
		canonical: 'https://ligninsorbent.ru/sitemap',
	},
	openGraph: {
		title: 'Карта сайта - Лигнин гидролизный',
		description:
			'Производим СОРБЕНТ, АДСОРБЕНТ, ЭНТЕРОСОРБЕНТ - ЛИГНИН гидролизный высокой степени очистки',
		type: 'website',
		url: 'https://ligninsorbent.ru/sitemap',
	},
};
export async function generateMetadata() {
	const { data } = await getMetaTags();
	const { title, description, ogTitle, ogDescription } =
		data.find(({ path }) => path === '/sitemap') || {};
	return {
		alternates: {
			canonical: 'https://ligninsorbent.ru/sitemap',
		},
		title: title || defaultMetaTags.title,
		description: description || defaultMetaTags.description,
		openGraph: {
			title: ogTitle || defaultMetaTags.openGraph.title,
			description: ogDescription || defaultMetaTags.openGraph.description,
			type: defaultMetaTags.openGraph.type,
			url: defaultMetaTags.openGraph.url,
		},
	};
}
export default async function SitemapPage() {
	const { data: articles } = await getArticles();
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
				<h1 className={styles.header}>Карта сайта</h1>
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
