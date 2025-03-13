import React from 'react';
import styles from './typography.module.scss';
import classNames from 'classnames';
type TypographyProps = {
	level: number;
	children: React.ReactNode;
};
const cx = classNames.bind(styles);
export const Typography = ({ level, children }: TypographyProps) => {
	const Tag = `h${level}`;
	console.log('----->level: ', level);
	return React.createElement(
		Tag,
		{ className: cx('header', `header-${level}`) },
		children
	);
};
