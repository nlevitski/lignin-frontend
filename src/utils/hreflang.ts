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

	// Нормализуем путь (убираем начальный слеш если есть)
	const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
	const pathSegment = normalizedPath ? `/${normalizedPath}` : "";

	// URLs без портов для hreflang
	const ruUrl = `https://ligninsorbent.ru${pathSegment}`;
	const byUrl = `https://lignin.by${pathSegment}`;

	return {
		"ru-RU": ruUrl,
		"ru-BY": byUrl,
		"x-default": `${currentSiteUrl}${pathSegment}`,
	};
}
