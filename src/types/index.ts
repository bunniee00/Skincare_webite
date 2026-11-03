export type SkinType =
  | 'OILY'
  | 'DRY'
  | 'COMBINATION'
  | 'SENSITIVE'
  | 'NORMAL'
  | 'ALL';

export const SKIN_TYPES: { label: string; value: SkinType }[] = [
  { label: 'All Skin Types', value: 'ALL' },
  { label: 'Oily', value: 'OILY' },
  { label: 'Dry', value: 'DRY' },
  { label: 'Combination', value: 'COMBINATION' },
  { label: 'Sensitive', value: 'SENSITIVE' },
  { label: 'Normal', value: 'NORMAL' },
];

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  price: number;
  stock: number;
  skinType: SkinType;
  ingredients: string;
  volume: string;
  imageUrl: string | null;
  isBestSeller: boolean;
  isNew: boolean;
  category: Category;
  createdAt: string;
  updatedAt?: string;
}

export interface PageResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface ProductFilterParams {
  keyword?: string;
  categoryId?: number;
  skinType?: SkinType;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  inStock?: boolean;
  page?: number;
  size?: number;
  sortBy?: 'price' | 'name' | 'createdAt' | 'stock';
  sortDir?: 'asc' | 'desc';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ApiError {
  status: number;
  message: string;
  timestamp?: string;
  errors?: Record<string, string>;
}
