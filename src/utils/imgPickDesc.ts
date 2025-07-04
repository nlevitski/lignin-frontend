import { SingleMedia } from '@/dal/common';

export const imgPickDesc = (img: SingleMedia, pickProp: 'name' | 'url'): string => {
  const order = ['xlarge', 'large', 'medium', 'small', 'xsmall']
  const currentSize = order.find((size) => Object.hasOwn(img.formats, size));
  if (!currentSize) return img[pickProp];
  return img.formats[currentSize as keyof typeof img.formats][pickProp];
}
