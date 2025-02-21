import styles from './button.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
type ButtonProps = {
	value: string;
	type?: 'primary' | 'secondary' | 'tertiary';
	bold?: boolean;
	extraBold?: boolean;
	large?: boolean;
	big?: boolean;
	href?: string;
};

export const Button = ({
	value,
	type = 'primary',
	bold = false,
	href = '',
	large = false,
	big = false,
	extraBold = false,
}: ButtonProps) => {
	const resultCx = cx('button', `button_${type}`, {
		button_bold: bold,
		button_big: big,
		button_extraBold: extraBold,
		button_large: large,
	});
	return href ? (
		<a href={href} className={resultCx}>
			{value}
		</a>
	) : (
		<button className={resultCx}>{value}</button>
	);
};
