"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import ym, { YMInitializer } from "react-yandex-metrika";

type YandexMetrikaProps = {
	counterId?: string;
};

export const YandexMetrika = ({ counterId }: YandexMetrikaProps) => {
	const pathname = usePathname();

	useEffect(() => {
		if (pathname) {
			ym("hit", pathname);
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
			version="2"
		/>
	);
};
