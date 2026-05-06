'use client';

import { useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import ym, { YMInitializer } from 'react-yandex-metrika';

const YM_COUNTER_IDS_BY_HOSTNAME: Record<string, string | undefined> = {
	"lignin.by": process.env.NEXT_PUBLIC_YM_ID_LIGNIN_BY,
	"ligninsorbent.ru": process.env.NEXT_PUBLIC_YM_ID_LIGNINSORBENT_RU,
};

function normalizeHostname(hostname: string): string {
	return hostname.trim().toLowerCase().replace(/^www\./, "");
}

export const YandexMetrika = () => {
	const pathname = usePathname();

	const counterId = useMemo(() => {
		if (typeof window === "undefined") return undefined;

		const hostname = normalizeHostname(window.location.hostname);
		return YM_COUNTER_IDS_BY_HOSTNAME[hostname];
	}, []);

	useEffect(() => {
		if (pathname) {
			ym('hit', pathname);
		}
	}, [pathname]);

	if (!counterId) {
		return null;
	}

	return (
		<YMInitializer
			accounts={[Number(counterId)]}
			options={{
				webvisor: true,
				defer: true,
				clickmap: true,
				trackLinks: true,
				accurateTrackBounce: true,
			}}
			version='2'
		/>
	);
};
