import { Montserrat } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/footer/Footer';
import { Feedback } from '@/components/feedback/Feedback';
import { Menu } from '@/components/menu/Menu';
import { getBigboards } from '@/dal/articles';
import { YandexMetrika } from '@/components/yandexMetrika/YandexMetrika';
import { GoogleAnalytics } from '@next/third-parties/google';
import ScrollTopButton from '@/components/scrollToTopButton/ScrollToTopButton';
import { getMetaTagsByPath } from '@/dal/metaTags';
import { getFeedbackFormInfo } from '@/dal/feedbackForm';
// import { getFeedbackFormInfo } from '@/dal/feedbackForm';

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['cyrillic'],
});
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
  
	return {
		metadataBase: new URL('https://ligninsorbent.ru'),
		title: seo.metaTitle,
		description: seo.metaDescription,
		keywords: seo.keywords,
		openGraph: {
			title: seo.openGraph.ogTitle,
			description: seo.openGraph.ogDescription,
			type: seo.openGraph.ogType,
			url: seo.openGraph.ogUrl,
			images: [
				{
					url: seo.openGraph.ogImage?.url || '',
					width: seo.openGraph.ogImage?.width || 0,
					height: seo.openGraph.ogImage?.height || 0,
					alt: seo.openGraph.ogImage?.alternativeText || 'Лигнин',
				},
			],
			siteName: "Лигнин гидролизный",
		},
		alternates: {
			canonical: seo.canonicalURL,
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
export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	
  const { 0: { data: bigBoardsData }, 1: { data: feedbackFormInfoData } } = await Promise.all([
    getBigboards(),
    getFeedbackFormInfo()
  ]);
	return (
		<html lang='ru'>
			<body className={`${montserrat.variable}`}>
				<Menu bigboards={bigBoardsData} />
				{children}
				<Feedback {...feedbackFormInfoData} />
				<Footer />
				<ScrollTopButton />
				{isProduciton && <YandexMetrika />}
				{isProduciton && (
					<GoogleAnalytics
						gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!}
					/>
				)}
			</body>
		</html>
	);
}
