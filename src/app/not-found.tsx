import { Button } from '@/components/button/Button';
import styles from './page.module.scss';
export const metadata = {
	title: '404 - Страница не найдена',
	description: 'Извините, но такой страницы не существует.',
};
export default function NotFound() {
	return (
		<div className={styles.container}>
			<div className={styles.notFound}>
				<h1 className={styles.notFoundTitle}>
					<span>404</span>
					<br />
					Страница не найдена
				</h1>
				<p className={styles.notFoundText}>
					Извините, но такой страницы не существует.
				</p>
				<div className={styles.notFoundButtonWrapper}>
					<Button href={'/'} value={'Вернуться на главную'} />
				</div>
			</div>
		</div>
	);
}
