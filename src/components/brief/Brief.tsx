import Image from 'next/image';
import styles from './brief.module.scss';
import { Button } from '../button/Button';

import RichTextRenderer from '@/utils/RichTextRenderer';
import { CSSProperties } from 'react';
import { SingleMedia, StrapiRichTextBlock } from '@/dal/common';

type BriefProps = {
	title: string;
	readMoreUrl: string;
	background: SingleMedia;
	cover: SingleMedia;
	teaser: StrapiRichTextBlock[];
	mission?: string;
	aspectRatio?: CSSProperties;
	style?: CSSProperties;
	id?: string;
	mobileBgOff?: boolean;
};
export const Brief = ({
	title,
	readMoreUrl,
	teaser,
	mission = '',
	id = '',
  background,
  cover,
	aspectRatio = {},
	style = {},
	mobileBgOff = false,
}: BriefProps) => {
	return (
		<>
			<style>
				{`
          @media (min-width: 960px) {
              .container-${id} {
                background-image: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 100%), url(${background?.formats?.large?.url || background?.formats?.medium?.url || background?.formats?.small?.url});
              }
        `}
			</style>
			<div
				className={`${styles.container} ${styles.container_bgFixed} container-${id}`}
			>
				<div
					className={`${styles.wrapper} ${
						mobileBgOff ? styles.mobileBgOff : ''
					}`}
					id={id}
				>
					<div className={styles.holder}>
						<div className={styles.imgWrapper}>
							<div
								className={styles.imgBox}
								style={{ aspectRatio: 1, ...aspectRatio }}
							>
								<Image
									src={cover?.url || cover?.formats?.large?.url || cover?.formats?.medium?.url || cover?.formats?.small?.url || ''}
									alt={cover?.alternativeText || ''}
									sizes='(max-width: 768px) 80vw, 35vw'
									fill
									style={{ objectFit: 'cover', ...style }}
									fetchPriority='high'
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
		</>
	);
};
