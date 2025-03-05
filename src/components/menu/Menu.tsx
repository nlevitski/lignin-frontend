import Link from 'next/link';
import styles from './menu.module.scss';
import { Logo } from '../logo/Logo';
import { Button } from '../button/Button';
type MenuItem = {
	title: string;
	href: string;
};
const menuItems: MenuItem[] = [
	{
		title: 'Лигнин',
		href: '/',
	},
	{
		title: 'Сельское хозяйство',
		href: '#',
	},
	{
		title: 'Фармацевтика',
		href: '#',
	},
	{
		title: 'Сорбент ЛАРН',
		href: '#',
	},
	{
		title: 'Топливо',
		href: '#',
	},
	{
		title: 'Статьи',
		href: '/articles',
	},
	{
		title: 'О Нас',
		href: '#',
	},
	{
		title: 'Контакты',
		href: '#',
	},
];
const phoneNumber = '+375297290243';
const phoneValue = '+375 29 729 02 43';
export const Menu = () => {
	return (
		<div className={styles.container}>
			<Logo />
			<ul className={styles.navMenu}>
				{menuItems.map((item) => (
					<li key={item.title} className={styles.navItem}>
						<Link href={item.href}>{item.title}</Link>
					</li>
				))}
			</ul>

			<Button
				value={phoneValue}
				href={`tel:${phoneNumber}`}
				type={'primary'}
				semibold
			/>
		</div>
	);
};
