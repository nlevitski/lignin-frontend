type AnalyticsHeadProps = {
	enabled?: boolean;
	gtmId?: string;
};

export const AnalyticsHead = ({
	enabled = true,
	gtmId,
}: AnalyticsHeadProps) => {
	if (!enabled || !gtmId) {
		return null;
	}

	return (
		<>
			<script
				dangerouslySetInnerHTML={{
					__html: `
						(function(w,l){
							w[l]=w[l]||[];
							w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
						})(window,'dataLayer');
					`,
				}}
			/>
			<script async src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`} />
		</>
	);
};
