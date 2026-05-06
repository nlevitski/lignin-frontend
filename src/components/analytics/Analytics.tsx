"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { YandexMetrika } from "@/components/yandexMetrika/YandexMetrika";

const GA4_IDS_BY_HOSTNAME: Record<string, string | undefined> = {
	"lignin.by": process.env.NEXT_PUBLIC_GA4_ID_LIGNIN_BY,
	"ligninsorbent.ru": process.env.NEXT_PUBLIC_GA4_ID_LIGNINSORBENT_RU,
};

type AnalyticsProps = {
	enabled?: boolean;
};

function normalizeHostname(hostname: string): string {
	return hostname.trim().toLowerCase().replace(/^www\./, "");
}

export const Analytics = ({ enabled = true }: AnalyticsProps) => {
	const [isReady, setIsReady] = useState(false);
	const [hostname, setHostname] = useState<string | null>(null);

	useEffect(() => {
		if (!enabled) return;

		setHostname(normalizeHostname(window.location.hostname));

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

	const gaId = hostname ? GA4_IDS_BY_HOSTNAME[hostname] : undefined;

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
