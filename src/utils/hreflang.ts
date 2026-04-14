import { getSiteUrl } from "./siteUrl";

type HreflangUrls = {
	"ru-RU": string;
	"ru-BY": string;
	"x-default": string;
};

/**
 * Генерирует URLs для hreflang метатегов
 * @param path - путь страницы (например, '/article-name' или '')
 * @returns объект с URLs для разных языковых версий
 */
export function getHreflangUrls(path: string = ""): HreflangUrls {
	const currentSiteUrl = getSiteUrl();
	const isProduction = process.env.NODE_ENV === "production";

	// Нормализуем путь (убираем начальный слеш если есть)
	const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
	const pathSegment = normalizedPath ? `/${normalizedPath}` : "";

	// В продакшене используем порты
	const ruUrl = isProduction
		? `https://ligninsorbent.ru:3000${pathSegment}`
		: `https://ligninsorbent.ru${pathSegment}`;

	const byUrl = isProduction
		? `https://lignin.by:3001${pathSegment}`
		: `https://lignin.by${pathSegment}`;

	return {
		"ru-RU": ruUrl,
		"ru-BY": byUrl,
		"x-default": `${currentSiteUrl}${pathSegment}`,
	};
}
