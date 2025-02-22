import Image from 'next/image';
import styles from './brief.module.scss';
import { Button } from '../button/Button';
type BriefProps = {
	title: string;
	imgUrl: string;
	readMoreUrl: string;
	bgUrl: string;
	imgCaption: string;

	content: string[];
};
export const Brief = ({
	title,
	imgCaption,
	imgUrl,
	readMoreUrl,

	content,
}: BriefProps) => {
	return (
		<div className={styles.container}>
			<h2 className={`${styles.title} ${styles.upper}`}>{title}</h2>
			<div className={styles.box}>
				<Image src={imgUrl} alt={imgCaption} width={320} height={320} />
				<div className={styles.content}>
					{content.map((unit, i) => (
						<p key={i}>{unit}</p>
					))}
				</div>
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
