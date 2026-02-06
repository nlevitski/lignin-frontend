import { fetchJson } from '@/utils/fetchJson';
import { getStrapiBaseUrl } from '@/utils/strapiBaseUrl';
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
		url: `${getStrapiBaseUrl()}/api/hero-content?populate=background`,
	});
}
