import { fetchJson } from '@/utils/fetchJson';
import { SingleResponse, Document, SingleMedia } from './common';

export function getFeedbackFormInfo(): Promise<SingleResponse<Document<{
  title: string; 
  backgroundDesktop: SingleMedia; 
  backgroundMobile: SingleMedia
}>>> {
  return fetchJson({
		url: 'http://localhost:1337/api/feedback-form?populate=backgroundDesktop&populate=backgroundMobile',
	});
}
  