import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/footer/Footer';
import { Feedback } from '@/components/feedback/Feedback';
import { Menu } from '@/components/menu/Menu';
import { getBigboards } from '@/dal/articles';
import { YandexMetrika } from '@/components/yandexMetrika/YandexMetrika';

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

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { data } = await getBigboards();
	return (
		<html lang='ru'>
			<body className={`${montserrat.variable}`}>
				<Menu bigboards={data} />
				{children}
				<Feedback />
				<Footer />
				<YandexMetrika />
			</body>
		</html>
	);
}
