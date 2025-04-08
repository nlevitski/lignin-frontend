'use client';
import Link from 'next/link';
import { Logo } from '../logo/Logo';
import { Button } from '../button/Button';
import { useEffect, useRef, useState } from 'react';
import { Burger } from '../icons/burger/Burger';
import styles from './menu.module.scss';
import classNames from 'classnames/bind';
import { ArticleShort, Bigboard } from '@/dal/articles';
import { Telegram, Whatsup } from '../icons/Socials';

type MenuProps = {
	bigboards: Bigboard<ArticleShort>[];
};
const cx = classNames.bind(styles);
type MenuItem = {
	title: string;
	href: string;
};
const menuItems: MenuItem[] = [
	// {
	// 	title: 'Сельское хозяйство',
	// 	href: '#',
	// },
	// {
	// 	title: 'Фармацевтика',
	// 	href: '#',
	// },
	// {
	// 	title: 'Сорбент ЛАРН',
	// 	href: '#',
	// },
	// {
	// 	title: 'Топливо',
	// 	href: '#',
	// },
	{
		title: 'Статьи',
		href: '/articles',
	},
	{
		title: 'О Нас',
		href: '/#about-us-section',
	},
	{
		title: 'Контакты',
		href: '/#footer-section',
	},
];
// const phoneNumber = '+375297290243';
// const phoneValue = '+375 29 729 02 43';
const phoneNumberRus = '+7 999 718 19 66';
export const Menu = ({ bigboards }: MenuProps) => {
	const sortedBigboards = bigboards.sort((a, b) =>
		a.menuOrder > b.menuOrder ? 1 : -1
	);

	const menuItemsDynamic = sortedBigboards.map((bigboard) => ({
		title: bigboard.menuName,
		href: `/#${bigboard.article.path}`,
	}));

	const currentMenu = [
		{ title: 'Главная', href: '/#home' },
		...menuItemsDynamic,
		...menuItems,
	];
	const { 0: isOpen, 1: setIsOpen } = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);
	const toggleMenu = () => {
		setIsOpen((prev) => {
			return !prev;
		});
	};

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add('no-scroll');
		} else {
			document.body.classList.remove('no-scroll');
		}
	}, [isOpen]);

	return (
		<>
			<div className={styles.navPanel}>
				<Link href='/' className={styles.linkLogo}>
					<Logo />
				</Link>
				<button onClick={toggleMenu} className={styles.burger}>
					<Burger isActive={isOpen} />
				</button>
			</div>
			<div
				className={cx('container', { active: isOpen })}
				ref={modalRef}
				onClick={() => {
					if (window?.innerWidth < 961) {
						toggleMenu();
					}
				}}
			>
				<Link href='/' className={styles.innerLogo}>
					<Logo />
				</Link>

				<ul className={styles.navMenu}>
					{currentMenu.map((item) => (
						<li key={item.title} className={styles.navItem}>
							{item.href !== '/articles' ? (
								<Link href={item.href} className={styles.navLink}>
									{item.title}
								</Link>
							) : (
								<a
									className={styles.navLink}
									href={item.href}
									target='_blank'
									rel='noopener noreferrer'
								>
									{item.title}
								</a>
							)}
						</li>
					))}
				</ul>

				<div className={styles.contacts}>
					<Button
						value={phoneNumberRus}
						href={`tel:${phoneNumberRus}`}
						type={'primary'}
						semibold
						style={{ flexGrow: '2' }}
					/>

					<a
						className={`${styles.social} ${styles.social_ordered}`}
						href={
							'https://api.whatsapp.com/send/?phone=%2B79997181966&text&type=phone_number&app_absent=0'
						}
						target='_blank'
						rel='noopener noreferrer'
					>
						<Whatsup />
					</a>
					<a
						className={styles.social}
						href={'https://t.me/ligninby'}
						target='_blank'
						rel='noopener noreferrer'
					>
						<Telegram />
					</a>
				</div>
			</div>
		</>
	);
};
