import { Document } from '@/dal/common';
import { HeroContent } from '@/dal/hero';
import { Button } from '../button/Button';
import styles from './hero.module.scss';
import RichTextRenderer from '@/utils/RichTextRenderer';

type HeroProps = {
	// content: StrapiRichTextBlock[];
	// background: SingleMedia[];
  data: Document<HeroContent>
};

export const Hero = ({ data: { content } }: HeroProps) => {
	return (
		<div className={styles.container}>
			<RichTextRenderer content={content} styles={styles} />
			<Button
				value={'Оставить заявку'}
				bold
				big
				href={'#feedback-section'}
				alpha50
			/>
		</div>
	);
};
