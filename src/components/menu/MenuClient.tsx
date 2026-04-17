"use client";
import Link from "next/link";
import { Logo } from "../logo/Logo";
import { Button } from "../button/Button";
import { useEffect, useRef, useState } from "react";
import { Burger } from "../icons/burger/Burger";
import styles from "./menu.module.scss";
import classNames from "classnames/bind";
import { Telegram, Whatsup } from "../icons/Socials";
import { ContactInfo } from "@/utils/contacts";

const cx = classNames.bind(styles);

type MenuItem = {
	title: string;
	href: string;
};

type MenuClientProps = {
	menuItems: MenuItem[];
	contactInfo: ContactInfo;
};

const menuDesktopHeight = 174;
const menuDesktopMinWidth = 960;

export const MenuClient = ({ menuItems, contactInfo }: MenuClientProps) => {
	const { 0: showSticky, 1: setShowSticky } = useState(false);
	const { 0: isOpen, 1: setIsOpen } = useState(false);
	const lastScrollYRef = useRef(0);
	const modalRef = useRef<HTMLDivElement>(null);

	const toggleMenu = () => {
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("no-scroll");
		} else {
			document.body.classList.remove("no-scroll");
		}
	}, [isOpen]);

	useEffect(() => {
		const handleScroll = () => {
			const currentY = window.scrollY;
			const lastY = lastScrollYRef.current;

			const screenHeight = window.innerHeight;
			const screenWidth = window.innerWidth;

			const scrollingUp = currentY < lastY;
			const scrollingDown = currentY > lastY;
			const scrolledPastTwoScreens = currentY > screenHeight * 2;
			const wideEnough = screenWidth > menuDesktopMinWidth;
			const closeToTop = currentY < menuDesktopHeight;

			if (showSticky && closeToTop) {
				setShowSticky(false);
			}

			if (
				!showSticky &&
				wideEnough &&
				scrollingUp &&
				scrolledPastTwoScreens
			) {
				setShowSticky(true);
			}

			if (showSticky && scrollingDown) {
				setShowSticky(false);
			}

			requestAnimationFrame(() => {
				lastScrollYRef.current = currentY;
			});
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [showSticky, setShowSticky]);

	return (
		<>
			<div className={styles.navPanel}>
				<Link href="/" className={styles.linkLogo}>
					<Logo />
				</Link>
				<button onClick={toggleMenu} className={styles.burger}>
					<Burger isActive={isOpen} />
				</button>
			</div>
			{showSticky && <div className={styles.placeholder}>&nbsp;</div>}
			<div
				className={cx("container", {
					active: isOpen,
					container_sticky: showSticky,
				})}
				ref={modalRef}
				onClick={() => {
					if (window?.innerWidth < 961) {
						toggleMenu();
					}
				}}
			>
				{!showSticky && (
					<Link href="/" className={styles.innerLogo}>
						<Logo />
					</Link>
				)}

					<ul className={cx("navMenu")}>
						{menuItems.map((item) => (
							<li key={item.title} className={styles.navItem}>
								<Link href={item.href} className={styles.navLink}>
									{item.title}
								</Link>
							</li>
						))}
					</ul>

				{!showSticky && (
					<div className={styles.contacts}>
						<Button
							value={contactInfo.phoneFormatted}
							href={`tel:${contactInfo.phone}`}
							type={"primary"}
							semibold
							style={{ flexGrow: "2" }}
						/>

						<a
							className={`${styles.social} ${styles.social_ordered}`}
							href={
								"https://api.whatsapp.com/send/?phone=%2B79997181966&text&type=phone_number&app_absent=0"
							}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Whatsup />
						</a>
						<a
							className={styles.social}
							href={"https://t.me/ligninby"}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Telegram />
						</a>
					</div>
				)}
			</div>
		</>
	);
};
