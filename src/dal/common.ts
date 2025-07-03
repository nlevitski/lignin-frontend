import { fetchJson } from '@/utils/fetchJson';

export type CollectionResponse<T> = {
	data: T[];
	meta: Meta;
};

export type SingleResponse<T> = {
	data: T;
	meta: object;
};

export type Meta = {
	pagination: Pagination;
};

export type Pagination = {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
};

// export type Content = {
// 	type: string;
// 	children: ContentNode[];
// 	level?: 1 | 2 | 3 | 4 | 5 | 6;
// 	format?: string;
// };

// export type ContentNode = {
// 	type: string;
// 	text?: string;
// 	url?: string;
// 	bold?: boolean;
// 	children?: ContentNode[];
// };
export type StrapiRichTextBlock = {
	type: 'paragraph' | 'heading' | 'list' | 'image' | 'quote' | 'code' | 'link';
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	format?: 'ordered' | 'unordered';
	text?: string;
	url?: string;
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	strikethrough?: boolean;
	code?: boolean;
	image?: {
		url: string;
		alternativeText?: string | null;
		width?: number;
		height?: number;
		formats?: Formats;
	};
	children?: StrapiRichTextNode[];
};

export type StrapiRichTextNode = {
	type: 'text' | 'link';
	text?: string;
	url?: string;
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	strikethrough?: boolean;
	code?: boolean;
	children?: StrapiRichTextNode[];
};

export type SingleMedia = MediaDocument & BaseImage;

export type ImageSizes = 'thumbnail' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
export type Formats = Record<ImageSizes, ImageDocument>;

export type ImageDocument = BaseImage & {
	path: string;
	sizeInBytes: number;
};

export type MediaDocument = {
	caption: string;
	formats: Formats;
	previewUrl: string;
	provider: string;
	provider_metadata: unknown;
	alternativeText: string;
} & BaseDocument;

export type BaseDocument = {
	id: number;
	documentId: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
};

export type BaseImage = {
	name: string;
	hash: string;
	ext: string;
	mime: string;
	width: number;
	height: number;
	size: number;
	url: string;
};

export type Document<T> = BaseDocument & T;

export const getPageInfoByPath = async (path: string): Promise<SingleResponse<Document<{title: string}>>> => {
	return fetchJson({
		url: `http://localhost:1337/api/${path}`,
	});
};
