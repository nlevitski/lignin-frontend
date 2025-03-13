import { Button } from '../button/Button';
import { Menu } from '../menu/Menu';
import styles from './hero.module.scss';
export const Hero = () => {
	return (
		<div className={styles.container}>
			<Menu />
			<h1 className={styles.title}>
				<span className={styles.upper}>Лигнин гидролизный </span>
				<br />
				от производителя
			</h1>
			<h2 className={styles.subtitle}>
				Производим сорбент, адсорбент, энтеросорбент&nbsp;— <br /> лигнин
				высокой степени очистки для медицинских, <br />
				сельскохозяйственных, нефтеперерабатывающих, <br />
				топливных и других нужд
			</h2>
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
