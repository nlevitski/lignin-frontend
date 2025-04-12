import { StrapiRichTextBlock } from '@/dal/common';
import { Button } from '../button/Button';
import styles from './hero.module.scss';
import RichTextRenderer from '@/utils/RichTextRenderer';
type HeroProps = {
	content: StrapiRichTextBlock[];
	bgUrl: string;
};
export const Hero = ({ content, bgUrl }: HeroProps) => {
	return (
		<div
			className={styles.container}
			style={{
				backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.5)), url(${bgUrl})`,
			}}
		>
			<RichTextRenderer content={content} styles={styles} />
			{/* <h1 className={styles.title}>
				<span className={styles.upper}>Лигнин гидролизный </span>
				<br />
				от производителя
			</h1>
			<h2 className={styles.subtitle}>
				Производим сорбент, адсорбент, энтеросорбент&nbsp;— <br /> лигнин
				высокой степени очистки для медицинских, <br />
				сельскохозяйственных, нефтеперерабатывающих, <br />
				топливных и других нужд
			</h2> */}
			<Button
				value={'Оставить заявку'}
				bold
				big
				href={'#feedback-section'}
				alpha50
			/>
		</div>
	);
};
