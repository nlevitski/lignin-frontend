import { fetchJson } from '@/utils/fetchJson';
import {
	StrapiRichTextBlock,
	SingleMedia,
	SingleResponse,
	Document,
} from './common';
export type HeroContent = {
	content: StrapiRichTextBlock[];
	background: SingleMedia[];
};
export function getHeroContent(): Promise<
	SingleResponse<Document<HeroContent>>
> {
	return fetchJson({
		url: 'http://localhost:1337/api/hero-content?populate=background',
	});
}
