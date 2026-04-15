import { ArticleShort, Bigboard } from "@/dal/articles";
import { getContactInfo } from "@/utils/contacts";
import { MenuClient } from "./MenuClient";

type MenuProps = {
	bigboards: Bigboard<ArticleShort>[];
};

type MenuItem = {
	title: string;
	href: string;
};

const menuItems: MenuItem[] = [
	{
		title: "Статьи",
		href: "/articles",
	},
	{
		title: "О Нас",
		href: "/#about-us-section",
	},
	{
		title: "Контакты",
		href: "/#footer-section",
	},
];

export const Menu = ({ bigboards }: MenuProps) => {
	const contactInfo = getContactInfo();

	const sortedBigboards = bigboards.sort((a, b) =>
		a.menuOrder > b.menuOrder ? 1 : -1,
	);

	const menuItemsDynamic = sortedBigboards.map((bigboard) => ({
		title: bigboard.menuName,
		href: `/#${bigboard.article.path}`,
	}));

	const currentMenu = [
		{ title: "Главная", href: "/#home" },
		...menuItemsDynamic,
		...menuItems,
	];

	return <MenuClient menuItems={currentMenu} contactInfo={contactInfo} />;
};
