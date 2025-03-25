import Image from 'next/image';
import styles from './brief.module.scss';
import { Button } from '../button/Button';
import { Teaser } from '@/dal/articles';
import RichTextRenderer from '@/utils/RichTextRenderer';
import { CSSProperties } from 'react';
type BriefProps = {
	title: string;
	imgUrl: string;
	readMoreUrl: string;
	bgUrl: string;
	imgAlt: string;
	teaser: Teaser[];
	aspectRatio?: CSSProperties;
	style?: CSSProperties;
	id?: string;
};
export const Brief = ({
	title,
	imgAlt,
	imgUrl,
	readMoreUrl,
	teaser,
	id = '',
	bgUrl,
	aspectRatio = {},
	style = {},
}: BriefProps) => {
	return (
		<div
			className={styles.container}
			id={id}
			style={{
				backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.8) 100%), url(${bgUrl})`,
				backgroundAttachment: 'fixed',
			}}
		>
			<div className={styles.wrapper}>
				<div className={styles.holder}>
					<div className={styles.imgWrapper}>
						<div
							className={styles.imgBox}
							style={{ aspectRatio: 1, ...aspectRatio }}
						>
							<Image
								src={imgUrl}
								alt={imgAlt}
								sizes='100vw'
								fill
								style={{ objectFit: 'cover', ...style }}
							/>
						</div>
					</div>
					<h2 className={`${styles.title} ${styles.upper}`}>{title}</h2>
					<div className={styles.contentBox}>
						<RichTextRenderer content={teaser} />
					</div>
				</div>
				<Button
					href={readMoreUrl}
					value={'Читать полностью'}
					type={'secondary'}
					bold
					large
				/>
			</div>
		</div>
	);
};
