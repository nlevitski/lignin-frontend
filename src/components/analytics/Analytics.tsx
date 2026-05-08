import { GoogleAnalytics } from "@next/third-parties/google";
import { YandexMetrika } from "@/components/yandexMetrika/YandexMetrika";

type AnalyticsProps = {
	enabled?: boolean;
	gaId?: string;
	ymId?: string;
	gtmId?: string;
};

export const Analytics = ({ enabled = true, gaId, ymId, gtmId }: AnalyticsProps) => {
	if (!enabled) {
		return null;
	}

	return (
		<>
			{gtmId && (
				<noscript>
					<iframe
						src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
						height="0"
						width="0"
						style={{
							display: "none",
							visibility: "hidden",
						}}
					/>
				</noscript>
			)}
			{ymId && <YandexMetrika counterId={ymId} />}
			{gaId && <GoogleAnalytics gaId={gaId} />}
		</>
	);
};
