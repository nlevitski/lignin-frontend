import { Arrow } from '../icons/Arrow';
import Link from 'next/link';
import styles from './widget.module.scss';
import { SingleMedia } from '@/dal/common';
type WidgetProps = {
	title: string;
	subtitle: string;
	summary: string;
	// bgImgUrl: string;
	articleUrl: string;
  id: string;
  cover: SingleMedia;
};
export const Widget = ({
	title,
  id,
  cover,
	// subtitle,
	summary,
	
	articleUrl,
}: WidgetProps) => {
	return (
		<>
      <style>
        {`
        @media (min-width: 240px) and (max-width: 319px) {
          .widget-${id} {
            background-image: linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%), url(${cover.formats.thumbnail?.url});
          }
        }
        @media (min-width: 320px) and (max-width: 480px) {
          .widget-${id} {
            background-image: linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%), url(${cover.formats.small?.url});
          }
        }
        @media (min-width: 481px) and (max-width: 768px) {
          .widget-${id} {
            background-image: linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%), url(${cover.formats?.medium?.url || cover.formats.small?.url});
          }
        }
        @media (min-width: 768px) {
          .widget-${id} {
            background-image: linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%), url(${cover.url});
          }
        }
        `}
      </style>
			<Link
				className={`${styles.widget} widget-${id}`}
				href={articleUrl}
			>
				<div className={styles.head}>
					{/* <img src={bgImgUrl} alt={title} className='' /> */}
					<h3 className={styles.title}>{title}</h3>
					<div className={styles.arrow}>
						<Arrow />
					</div>
				</div>
				<p className={styles.subtitle}>{summary}</p>
			</Link>
		</>
	);
};
