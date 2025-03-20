import { Formats, ImageProperties } from '@/dal/articles';

export const pickImgSize = (obj: Formats): ImageProperties => {
	const sizes = ['large', 'medium', 'small', 'thumbnail'] as const;
	const field = sizes.find((size) => Object.hasOwn(obj, size)) || 'small';
	return obj[field];
};
