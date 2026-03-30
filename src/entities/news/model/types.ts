import { BaseEntity } from '../../../shared/types';

export interface NewsItem extends BaseEntity {
  title: string;
  date: string;
  excerpt: string;
  imageUrl?: string;
}