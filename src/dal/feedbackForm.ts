import { fetchJson } from '@/utils/fetchJson';
import { getStrapiBaseUrl } from '@/utils/strapiBaseUrl';
import { SingleResponse, Document, SingleMedia } from './common';

export function getFeedbackFormInfo(): Promise<SingleResponse<Document<{
  title: string; 
  backgroundDesktop: SingleMedia; 
  backgroundMobile: SingleMedia
}>>> {
	return fetchJson({
		url: `${getStrapiBaseUrl()}/api/feedback-form?populate=backgroundDesktop&populate=backgroundMobile`,
	});
}
  
