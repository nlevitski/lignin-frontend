import Image from 'next/image';
import styles from './brief.module.scss';
import { Button } from '../button/Button';

import RichTextRenderer from '@/utils/RichTextRenderer';
import { CSSProperties } from 'react';
import { StrapiRichTextBlock } from '@/dal/common';

type BriefProps = {
	title: string;
	imgUrl: string;
	readMoreUrl: string;
	bgUrl: string;
	imgAlt: string;
	teaser: StrapiRichTextBlock[];
	mission?: string;
	aspectRatio?: CSSProperties;
	style?: CSSProperties;
	id?: string;
	mobileBgOff?: boolean;
};
export const Brief = ({
	title,
	imgAlt,
	imgUrl,
	readMoreUrl,
	teaser,
	mission = '',
	id = '',
	bgUrl,
	aspectRatio = {},
	style = {},
	mobileBgOff = false,
}: BriefProps) => {
	return (
		<div
			className={`${styles.container} ${styles.container_bgFixed}`}
			style={{
				backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.8) 100%), url(${bgUrl})`,
			}}
		>
			<div
				className={`${styles.wrapper} ${mobileBgOff ? styles.mobileBgOff : ''}`}
				id={id}
			>
				<div className={styles.holder}>
					<div className={styles.imgWrapper}>
						<div
							className={styles.imgBox}
							style={{ aspectRatio: 1, ...aspectRatio }}
						>
							<Image
								src={imgUrl}
								alt={imgAlt}
								sizes='(max-width: 769) 100vw, 50vw'
								fill
								style={{ objectFit: 'cover', ...style }}
							/>
						</div>
					</div>
					<h2 className={`${styles.title} ${styles.upper}`}>
						{title}
						<hr className={styles.hrLong} />
					</h2>

					<div className={styles.contentBox}>
						{mission && (
							<p>
								<strong>
									<em>{mission}</em>
								</strong>
							</p>
						)}
						<RichTextRenderer content={teaser} />
					</div>
				</div>
				<Button
					href={readMoreUrl}
					value={'Читать полностью'}
					type={'secondary'}
					bold
					large
					alignSelf
				/>
			</div>
		</div>
	);
};
