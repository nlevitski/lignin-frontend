// import Image from "next/image";
// import styles from "./page.module.css";

import { Button } from '@/components/button/Button';
const phoneNumber = '+375297290243';
export default function Home() {
	return (
		<div>
			<Button
				href={`tel:${phoneNumber}`}
				value={false ? '+375 29 729 02 43' : 'Оставить заявку'}
				bold
				big
				extraBold
			/>
			<Button
				href={`tel:${phoneNumber}`}
				value={false ? '+375 29 729 02 43' : 'Читать далее'}
				type={'secondary'}
				bold
				large
			/>
		</div>
	);
}
