'use client';
import Link from 'next/link';
import { Logo } from '../logo/Logo';
import { Button } from '../button/Button';
import { useEffect, useRef, useState } from 'react';
import { Burger } from '../icons/burger/Burger';
import styles from './menu.module.scss';
import classNames from 'classnames/bind';
import { ArticleShort, Bigboard } from '@/dal/articles';

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

	const currentMenu = [...menuItemsDynamic, ...menuItems];
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
			<button onClick={toggleMenu} className={styles.burger}>
				<Burger isActive={isOpen} />
			</button>
			<div
				className={cx('container', { active: isOpen })}
				ref={modalRef}
				onClick={(e) => {
					e.preventDefault();
					toggleMenu();
				}}
			>
				<Link href='/' className={styles.linkLogo}>
					<Logo />
				</Link>

				<ul className={styles.navMenu}>
					{currentMenu.map((item) => (
						<li key={item.title} className={styles.navItem}>
							<Link href={item.href} className={styles.navLink}>
								{item.title}
							</Link>
						</li>
					))}
				</ul>

				<div className={styles.phone}>
					<Button
						value={phoneNumberRus}
						href={`tel:${phoneNumberRus}`}
						type={'primary'}
						semibold
					/>
				</div>
			</div>
		</>
	);
};
