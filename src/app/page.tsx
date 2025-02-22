// import Image from "next/image";
import styles from './page.module.scss';
import { Button } from '@/components/button/Button';
import { Card } from '@/components/card/Card';
import { Feedback } from '@/components/feedback/Feedback';
import { Samples } from '@/components/samples/Samples';
import { Widget } from '@/components/widget/Widget';
const phoneNumber = '+375297290243';
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
	},
	{
		title:
			'Применение лигнина в качестве выгорающей добавки для производства кирпича',
		subtitle:
			'Лигнин можно применять в производстве кирпича в качестве выгорающей добавки',
		bgImgUrl: '/images/webp/articles/001_burnoutagent.webp',
	},
	{
		title: 'Вторая жизнь лигнина. Удобрение. Плодородие и улучшение почвы',
		subtitle: 'Лигнин в качестве органической добавки предпринимались давно',
		bgImgUrl: '/images/webp/articles/002_soil.webp',
	},
	{
		title: 'Применение лигнин для производства асфальта',
		subtitle: 'Лигнин - связующее вещество для асфальтирования дорог',
		bgImgUrl: '/images/webp/articles/003_asphalt.webp',
	},
];
export default function Home() {
	return (
		<div>
			<Button
				href={`tel:${phoneNumber}`}
				value={false ? '+375 29 729 02 43' : 'Оставить заявку'}
				bold
				big
				extraBold
			/>
			<Button
				href={`tel:${phoneNumber}`}
				value={false ? '+375 29 729 02 43' : 'Читать далее'}
				type={'secondary'}
				bold
				large
			/>
			<div className={styles.container}>
				<div className={styles.widgets}>
					{articles.map((a, i) => (
						<Widget
							key={i}
							title={a.title}
							subtitle={a.subtitle}
							bgImgUrl={a.bgImgUrl}
						/>
					))}
				</div>
			</div>
			<div className={styles.container}>
				<h2 className={`${styles.title} ${styles.upper}`}>О нас</h2>
				<p>
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
				<p>
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
			<div>
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
