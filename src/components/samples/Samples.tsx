import Image from 'next/image';
import styles from './samples.module.scss';
const cards = [
	{
		title: 'high-degree-purified-lignin',
		href: '/images/webp/pics/high-degree-purified-lignin.webp',
		caption: 'Лигнин высокой степени очистки',
	},
	{
		title: 'pellet-bricket-lignin',
		href: '/images/webp/pics/pellet-bricket-lignin.webp',
		caption: 'Пеллеты и брикет из лигнина',
	},
	{
		title: 'purified-lignin',
		href: '/images/webp/pics/purified-lignin.webp',
		caption: 'Лигнин очищенный технический',
	},
];
export const Samples = () => {
	return (
		<div className={styles.panel}>
			{cards.map((card, i) => {
				return (
					<div className={styles.card} key={i}>
						<div className={styles.imgBox}>
							<Image
								className={styles.img}
								alt={card.title}
								fill
								sizes='280px'
								src={card.href}
							/>
						</div>
						<div className={styles.caption}>{card.caption}</div>
					</div>
				);
			})}
		</div>
	);
};
