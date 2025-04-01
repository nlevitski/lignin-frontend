import Link from 'next/link';
import { Socials } from '../socials/Socials';
import styles from './footer.module.scss';

export const Footer = () => {
	return (
		<footer className={styles.footer} id='footer-section'>
			<div className={styles.container}>
				<h2 className={styles.title}>Связаться с нами:</h2>
				<h3 className={styles.entity}>ИП Alex Volk</h3>
				<dl className={styles.contacts}>
					<dt>Телефон / WhatsApp:</dt>
					<dd>
						Беларусь <br />
						<span className={styles.phone}>+375 29 729 02 43</span>
					</dd>
					<dd>
						Россия <br />
						<span className={styles.phone}>+7 999 718 19 66</span>
					</dd>
					<dt className={styles.emailDt}>Email:&nbsp;</dt>
					<dd className={styles.emailDd}>alex.bizby@gmail.com</dd>
				</dl>
				{/* <a href='#'>Карта сайта</a> */}
				<Link className={styles.link} href='/sitemap-info'>
					{'Карта сайта'}
				</Link>
				<Socials />
			</div>
		</footer>
	);
};
