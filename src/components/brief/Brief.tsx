import Image from 'next/image';
import styles from './brief.module.scss';
import { Button } from '../button/Button';
type BriefProps = {
	title: string;
	imgUrl: string;
	readMoreUrl: string;
	bgUrl: string;
	imgCaption: string;
	children: React.ReactNode;
};
export const Brief = ({
	title,
	imgCaption,
	imgUrl,
	readMoreUrl,
	children,
}: BriefProps) => {
	return (
		<div className={styles.container}>
			<h2 className={`${styles.title} ${styles.upper}`}>{title}</h2>
			<div className={styles.box}>
				<Image src={imgUrl} alt={imgCaption} width={320} height={320} />
				<div className={styles.content}>{children}</div>
			</div>
			<Button
				href={`${readMoreUrl}`}
				value={'Читать полностью'}
				type={'secondary'}
				bold
				large
			/>
		</div>
	);
};
