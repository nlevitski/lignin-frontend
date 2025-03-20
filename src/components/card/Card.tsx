import classNames from 'classnames/bind';
import styles from './card.module.scss';
import Image from 'next/image';
type CardProps = {
	imgUrl: string;
	imgAlt: string;
	caption: string;
};

export const Card = ({ caption, imgUrl, imgAlt }: CardProps) => {
	const cx = classNames.bind(styles);
	return (
		<div className={cx('card')}>
			<div className={cx('imgBox')}>
				<Image
					className={cx('img')}
					src={imgUrl}
					alt={imgAlt}
					fill
					sizes='100vw'
				/>
			</div>
			<div className={cx('caption')}>{caption}</div>
		</div>
	);
};
