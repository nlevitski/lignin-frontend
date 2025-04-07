import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/footer/Footer';
import { Feedback } from '@/components/feedback/Feedback';
import { Menu } from '@/components/menu/Menu';
import { getBigboards } from '@/dal/articles';
import { YandexMetrika } from '@/components/yandexMetrika/YandexMetrika';
import { GoogleAnalytics } from '@next/third-parties/google';

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['cyrillic'],
});

export const metadata: Metadata = {
	title:
		'От производителя: СОРБЕНТ, АДСОРБЕНТ, ЭНТЕРОСОРБЕНТ - ЛИГНИН гидролизный очищенный. Сорбент для ЛАРН. Топливные пеллеты и брикеты ',
	description:
		'Производим СОРБЕНТ, АДСОРБЕНТ, ЭНТЕРОСОРБЕНТ - ЛИГНИН гидролизный высокой степени очистки. Сорбент для ЛАРН. Пеллеты и брикет из лигнина. Россия Беларусь Казахстан Узбекистан Грузия Молдова',
};

const isProduciton = process.env.NODE_ENV === 'production';
export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { data } = await getBigboards();
	console.log(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID);
	return (
		<html lang='ru'>
			<body className={`${montserrat.variable}`}>
				<Menu bigboards={data} />
				{children}
				<Feedback />
				<Footer />
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
