type TrackingIds = {
	gaId?: string;
	ymId?: string;
	gtmId?: string;
};

const GA4_IDS_BY_HOSTNAME: Record<string, string | undefined> = {
	"lignin.by": process.env.NEXT_PUBLIC_GA4_ID_LIGNIN_BY,
	"ligninsorbent.ru": process.env.NEXT_PUBLIC_GA4_ID_LIGNINSORBENT_RU,
};

const YM_COUNTER_IDS_BY_HOSTNAME: Record<string, string | undefined> = {
	"lignin.by": process.env.NEXT_PUBLIC_YM_ID_LIGNIN_BY,
	"ligninsorbent.ru": process.env.NEXT_PUBLIC_YM_ID_LIGNINSORBENT_RU,
};

const GTM_IDS_BY_HOSTNAME: Record<string, string | undefined> = {
	"lignin.by": process.env.NEXT_PUBLIC_GTM_ID_LIGNIN_BY,
	"ligninsorbent.ru": process.env.NEXT_PUBLIC_GTM_ID_LIGNINSORBENT_RU,
};

export function normalizeHostname(hostname: string): string {
	return hostname.trim().toLowerCase().replace(/^www\./, "");
}

export function getHostnameFromRequest(
	host: string | null | undefined,
): string {
	const hostname = host?.split(",")[0]?.trim() ?? "";
	return normalizeHostname(hostname.replace(/:\d+$/, ""));
}

export function resolveTrackingIds(hostname: string): TrackingIds {
	return {
		gaId: GA4_IDS_BY_HOSTNAME[hostname],
		ymId: YM_COUNTER_IDS_BY_HOSTNAME[hostname],
		gtmId: GTM_IDS_BY_HOSTNAME[hostname],
	};
}
