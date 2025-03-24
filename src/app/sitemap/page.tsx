import Link from 'next/link';
import styles from './sitemap.module.scss';

const links = [
	{
		header:
			'Производим СОРБЕНТ, АДСОРБЕНТ, ЭНТЕРОСОРБЕНТ - ЛИГНИН очищенный. Сорбент для ЛАРН. Брикеты пеллеты из лигнина',
		description:
			'Производим СОРБЕНТ, АДСОРБЕНТ, ЭНТЕРОСОРБЕНТ - ЛИГНИН гидролизный высокой степени очистки. Сорбент для ЛАРН. Пеллеты и брикет из лигнина. Россия Беларусь Казахстан Узбекистан Грузия Молдова',
		href: '/',
	},
];
export default async function SitemapPage() {
	return (
		<div className={styles.container}>
			<div className={styles.holder}>
				<h1 className={styles.title}>Карта сайта</h1>
				{links.map((link) => (
					<Link href={link.href} key={link.href}>
						<h2 className={styles.header}>{link.header}</h2>
						<p className={styles.description}>{link.description}</p>
					</Link>
				))}
			</div>
		</div>
	);
}
