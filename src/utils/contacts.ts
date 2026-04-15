import { getSiteDomain } from "./siteUrl";

export type ContactInfo = {
	country: string;
	phone: string;
	phoneFormatted: string;
};

/**
 * Возвращает контактную информацию в зависимости от домена
 * Работает на этапе SSG (Static Site Generation)
 */
export function getContactInfo(): ContactInfo {
	const domain = getSiteDomain();

	// Для белорусского домена
	if (domain === "lignin.by") {
		return {
			country: "Беларусь",
			phone: "+375297290243",
			phoneFormatted: "+375 29 729 02 43",
		};
	}

	// Для российского домена (по умолчанию)
	return {
		country: "Россия",
		phone: "+79997181966",
		phoneFormatted: "+7 999 718 19 66",
	};
}
