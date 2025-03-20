import { Arrow } from '../icons/Arrow';
import Link from 'next/link';
import styles from './widget.module.scss';
type WidgetProps = {
	title: string;
	subtitle: string;
	summary: string;
	bgImgUrl: string;
	articleUrl: string;
};
export const Widget = ({
	title,
	// subtitle,
	summary,
	bgImgUrl,
	articleUrl,
}: WidgetProps) => {
	return (
		<Link
			className={styles.widget}
			style={{
				backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%), url(${bgImgUrl})`,
			}}
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
	);
};
