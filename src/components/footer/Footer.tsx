import Link from "next/link";
import { Socials } from "../socials/Socials";
import styles from "./footer.module.scss";
import { FooterMap } from "../map/Map";
import { getContactInfo } from "@/utils/contacts";

export const Footer = () => {
	const contactInfo = getContactInfo();

	return (
		<footer className={styles.footer} id="footer-section">
			<div className={styles.container}>
				<h2 className={styles.title}>Связаться с нами:</h2>
				<h3 className={styles.entity}>ИП Alex Volk</h3>
				<dl className={styles.contacts}>
					<dt>Телефон / WhatsApp:</dt>
					<dd>
						{contactInfo.country} <br />
						<span className={styles.phone}>
							{contactInfo.phoneFormatted}
						</span>
					</dd>
					<dt className={styles.emailDt}>Email:&nbsp;</dt>
					<dd className={styles.emailDd}>alex.bizby@gmail.com</dd>
				</dl>
				<Link className={styles.link} href="/sitemap">
					{"Карта сайта"}
				</Link>
				<Socials />
				<FooterMap />
			</div>
		</footer>
	);
};
