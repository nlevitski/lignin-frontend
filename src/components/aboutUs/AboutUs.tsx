import RichTextRenderer, { RichTextContent } from '@/utils/RichTextRenderer';
import { AboutUs as AboutUsType } from '../../dal/articles';
import styles from './about-us.module.scss';

type AboutUsProps = {
	aboutUsData: AboutUsType;
};
export const AboutUs = ({ aboutUsData }: AboutUsProps) => {
	return (
		<RichTextRenderer
			content={(aboutUsData.content as RichTextContent) || []}
			styles={styles}
			imageSizes='(max-width: 768px) 100vw, 768px'
		/>
	);
};
