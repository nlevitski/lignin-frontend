import styles from './features.module.scss';
type FeatureProps = {
	children: React.ReactNode;
};
export const Features = ({ children }: FeatureProps) => {
	return (
		<div className={styles.features}>
			<h2 className={styles.title}>Применение Лигнина</h2>
			<ul className={styles.featureList}>{children}</ul>
		</div>
	);
};
