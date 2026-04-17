"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { YandexMetrika } from "@/components/yandexMetrika/YandexMetrika";

type AnalyticsProps = {
	gaId?: string;
	enabled?: boolean;
};

export const Analytics = ({ gaId, enabled = true }: AnalyticsProps) => {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		if (!enabled) return;

		let cancelled = false;
		let timeoutId: number | undefined;

		const start = () => {
			timeoutId = window.setTimeout(() => {
				if (!cancelled) {
					setIsReady(true);
				}
			}, 1_500);
		};

		if (document.readyState === "complete") {
			start();
		} else {
			window.addEventListener("load", start, { once: true });
		}

		return () => {
			cancelled = true;
			if (timeoutId) {
				window.clearTimeout(timeoutId);
			}
			window.removeEventListener("load", start);
		};
	}, [enabled]);

	if (!enabled || !isReady) {
		return null;
	}

	return (
		<>
			<YandexMetrika />
			{gaId && <GoogleAnalytics gaId={gaId} />}
		</>
	);
};
