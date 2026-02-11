import './globals.css';
import { tildaSans } from '@/fonts/fonts';
import { Footer } from '@/components/footer/Footer';
import { Feedback } from '@/components/feedback/Feedback';
import { Menu } from '@/components/menu/Menu';
import { getBigboards } from '@/dal/articles';
import { YandexMetrika } from '@/components/yandexMetrika/YandexMetrika';
import { GoogleAnalytics } from '@next/third-parties/google';
import ScrollTopButton from '@/components/scrollToTopButton/ScrollToTopButton';
import { getMetaTagsByPath } from '@/dal/metaTags';
import { getSiteUrl, toAbsoluteUrl } from '@/utils/siteUrl';
import { getFeedbackFormInfo } from '@/dal/feedbackForm';
import { getHeroContent } from '@/dal/hero';
// import { getFeedbackFormInfo } from '@/dal/feedbackForm';

// const montserrat = Montserrat({
// 	variable: '--font-montserrat',
// 	subsets: ['cyrillic'],
// });
const icons = {
	icon: [
		{ url: '/favicon.svg', type: 'image/svg+xml' },
		{ url: '/favicon.ico', type: 'image/x-icon' },
		{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
		{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
		{ url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
		{ url: '/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
	],
	shortcut: '/favicon.ico',
	apple: [
		{ url: '/apple-icon-180x180.png', sizes: '180x180' },
		{ url: '/apple-icon-152x152.png', sizes: '152x152' },
		{ url: '/apple-icon-144x144.png', sizes: '144x144' },
		{ url: '/apple-icon-120x120.png', sizes: '120x120' },
		{ url: '/apple-icon-114x114.png', sizes: '114x114' },
		{ url: '/apple-icon-76x76.png', sizes: '76x76' },
		{ url: '/apple-icon-72x72.png', sizes: '72x72' },
		{ url: '/apple-icon-60x60.png', sizes: '60x60' },
		{ url: '/apple-icon-57x57.png', sizes: '57x57' },
	],
};

export async function generateMetadata() {
	
  const { data: { seo } } = await getMetaTagsByPath(
		'hero-content?populate[seo][populate][openGraph][populate]=ogImage'
	);
  const nonEmpty = (value?: string | null) =>
		value && value.trim().length > 0 ? value : undefined;
	const ogImageUrl = toAbsoluteUrl(nonEmpty(seo.openGraph?.ogImage?.url));
	const canonicalUrl = toAbsoluteUrl(nonEmpty(seo.canonicalURL));
	const ogUrl = toAbsoluteUrl(nonEmpty(seo.openGraph?.ogUrl));
  const ogTitle = nonEmpty(seo.openGraph?.ogTitle);
  const ogDescription = nonEmpty(seo.openGraph?.ogDescription);
  const ogType = nonEmpty(seo.openGraph?.ogType);
  const metaTitle = nonEmpty(seo.metaTitle);
  const metaDescription = nonEmpty(seo.metaDescription);
  const keywords = nonEmpty(seo.keywords);

	return {
		metadataBase: new URL(getSiteUrl()),
		title: metaTitle,
		description: metaDescription,
		keywords,
		openGraph: {
			title: ogTitle,
			description: ogDescription,
			type: ogType,
			url: ogUrl,
			images: ogImageUrl
				? [
						{
							url: ogImageUrl,
							width: seo.openGraph.ogImage?.width || 0,
							height: seo.openGraph.ogImage?.height || 0,
							alt: seo.openGraph.ogImage?.alternativeText || 'Лигнин',
						},
					]
				: undefined,
			siteName: "Лигнин гидролизный",
		},
		alternates: {
			canonical: canonicalUrl,
		},
		icons,
	};
}
// export const metadata: Metadata = {
// 	title:
// 		'От производителя: СОРБЕНТ, АДСОРБЕНТ, ЭНТЕРОСОРБЕНТ - ЛИГНИН гидролизный очищенный. Сорбент для ЛАРН. Топливные пеллеты и брикеты',
// 	description:
// 		'Производим СОРБЕНТ, АДСОРБЕНТ, ЭНТЕРОСОРБЕНТ - ЛИГНИН гидролизный высокой степени очистки. Сорбент для ЛАРН. Пеллеты и брикет из лигнина. Россия Беларусь Казахстан Узбекистан Грузия Молдова',
// 	keywords:
// 		'От производителя лигнин сорбент адсорбент очищенный для ларн Россия',
// 	alternates: {
// 		canonical: 'https://ligninsorbent.ru/',
// 	},
// 	openGraph: {
// 		title: 'Лигнин гидролизный очищенный. Сорбент для ЛАРН. Топливо из лигнина',
// 		description:
// 			'Производим сорбент лигнин гидролизный высокой степени очистки.Сорбент для ЛАРН. Пеллеты и брикет из лигнина',
// 		type: 'website',
// 		url: 'https://ligninsorbent.ru/',
// 		images: ['https://ligninsorbent.ru/uploads/open_graph_69fa6096d4.jpeg'],
// 		siteName: 'Лигнин',
// 	},
// };

const isProduciton = process.env.NODE_ENV === 'production';
const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

function cssUrlValue(pathOrUrl?: string | null): string {
	if (!pathOrUrl) return 'none';
	return `url(${pathOrUrl})`;
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	
  const { 0: { data: bigBoardsData }, 1: { data: feedbackFormInfoData }, 2: { data: heroData } } = await Promise.all([
    getBigboards(),
    getFeedbackFormInfo(),
		getHeroContent()
  ]);

	const { 0: desktop, 1: mobile } = heroData.background ?? [];
	const heroPreloadDesktopUrl = toAbsoluteUrl(
		desktop?.formats?.large?.url ||
			desktop?.formats?.medium?.url ||
			desktop?.url
	);
	const heroPreloadMobileUrl = toAbsoluteUrl(
		mobile?.formats?.medium?.url ||
			mobile?.formats?.small?.url ||
			mobile?.url
	);
	const heroCss = `
		:root {
			--hero-bg-xsmall: ${cssUrlValue(mobile?.formats?.xsmall?.url || mobile?.url)};
			--hero-bg-small: ${cssUrlValue(mobile?.formats?.small?.url || mobile?.url)};
			--hero-bg-medium: ${cssUrlValue(mobile?.formats?.medium?.url || mobile?.url)};
			--hero-bg-desktop-medium: ${cssUrlValue(desktop?.formats?.medium?.url || desktop?.url)};
			--hero-bg-large: ${cssUrlValue(desktop?.formats?.large?.url || desktop?.url)};
			--hero-bg-xlarge: ${cssUrlValue(desktop?.formats?.xlarge?.url || desktop?.url)};
			--hero-bg-full: ${cssUrlValue(desktop?.url)};
		}
	`;

	return (
		<html lang='ru'>
			<head>
				{heroPreloadDesktopUrl && (
					<link
						rel='preload'
						as='image'
						href={heroPreloadDesktopUrl}
						media='(min-width: 769px)'
						fetchPriority='high'
					/>
				)}
				{heroPreloadMobileUrl && (
					<link
						rel='preload'
						as='image'
						href={heroPreloadMobileUrl}
						media='(max-width: 768px)'
						fetchPriority='high'
					/>
				)}
				<style>{heroCss}</style>
			</head>
			<body className={`${tildaSans.variable}`}>
				<Menu bigboards={bigBoardsData} />
				{children}
				<Feedback {...feedbackFormInfoData} />
				<Footer />
				<ScrollTopButton />
				{isProduciton && <YandexMetrika />}
				{isProduciton && gaId && <GoogleAnalytics gaId={gaId} />}
			</body>
		</html>
	);
}
