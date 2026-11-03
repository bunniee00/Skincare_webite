import { Category, PageResponse, Product, ProductFilterParams } from '@/types';
import { API_BASE_URL } from './utils';

// Fallback seed data matching Spring Boot DataSeeder in case backend is offline
const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: 'Cleanser', description: 'Purifying and gentle facial cleansers for removing dirt and excess sebum' },
  { id: 2, name: 'Toner', description: 'Balancing and hydrating toners to prepare and strengthen the skin barrier' },
  { id: 3, name: 'Serum', description: 'High-potency concentrated active treatments targeting specific skin concerns' },
  { id: 4, name: 'Moisturizer', description: 'Hydrating creams, gels, and lotions that lock in moisture and nourish' },
  { id: 5, name: 'Sunscreen', description: 'Broad spectrum UV protection against harmful UVA and UVB rays' },
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'CeraVe Hydrating Facial Cleanser',
    brand: 'CeraVe',
    description: 'Non-foaming cleanser that removes dirt, oil, and makeup while keeping skin hydrated with 3 essential ceramides.',
    price: 14.99,
    stock: 45,
    skinType: 'NORMAL',
    ingredients: 'Aqua / Water, Glycerin, Cetearyl Alcohol, Ceramide NP, Ceramide AP, Ceramide EOP, Hyaluronic Acid',
    volume: '237ml',
    imageUrl: null,
    isBestSeller: true,
    isNew: false,
    category: MOCK_CATEGORIES[0],
    createdAt: '2026-01-10T10:00:00',
  },
  {
    id: 2,
    name: 'La Roche-Posay Effaclar Gel',
    brand: 'La Roche-Posay',
    description: 'Gentle purifying foaming gel cleanser designed specifically for oily, acne-prone, and sensitive skin.',
    price: 19.99,
    stock: 30,
    skinType: 'OILY',
    ingredients: 'Aqua, Sodium Laureth Sulfate, PEG-8, Coco-Betaine, Hexylene Glycol, Zinc PCA',
    volume: '200ml',
    imageUrl: null,
    isBestSeller: true,
    isNew: false,
    category: MOCK_CATEGORIES[0],
    createdAt: '2026-01-15T12:00:00',
  },
  {
    id: 3,
    name: "Paula's Choice 2% BHA Liquid",
    brand: "Paula's Choice",
    description: 'Leave-on exfoliant with salicylic acid that clears clogged pores, reduces fine lines, and smooths skin texture.',
    price: 34.0,
    stock: 60,
    skinType: 'COMBINATION',
    ingredients: 'Water, Methylpropanediol, Butylene Glycol, Salicylic Acid, Polysorbate 20, Camellia Oleifera Leaf Extract',
    volume: '118ml',
    imageUrl: null,
    isBestSeller: false,
    isNew: true,
    category: MOCK_CATEGORIES[1],
    createdAt: '2026-02-01T09:30:00',
  },
  {
    id: 4,
    name: 'The Ordinary Niacinamide 10%',
    brand: 'The Ordinary',
    description: 'High-strength vitamin and mineral blemish formula with 10% pure niacinamide and 1% zinc PCA.',
    price: 6.5,
    stock: 120,
    skinType: 'COMBINATION',
    ingredients: 'Aqua, Niacinamide, Pentylene Glycol, Zinc PCA, Dimethyl Isosorbide, Tamarindus Indica Seed Gum',
    volume: '30ml',
    imageUrl: null,
    isBestSeller: true,
    isNew: false,
    category: MOCK_CATEGORIES[2],
    createdAt: '2026-02-10T14:15:00',
  },
  {
    id: 5,
    name: 'SkinCeuticals C E Ferulic Serum',
    brand: 'SkinCeuticals',
    description: 'Patented daytime antioxidant vitamin C serum that delivers advanced environmental protection and radiance.',
    price: 182.0,
    stock: 15,
    skinType: 'ALL',
    ingredients: 'Aqua, Ethoxydiglycol, L-Ascorbic Acid, Propylene Glycol, Glycerin, Laureth-23, Alpha Tocopherol, Ferulic Acid',
    volume: '30ml',
    imageUrl: null,
    isBestSeller: false,
    isNew: false,
    category: MOCK_CATEGORIES[2],
    createdAt: '2026-01-05T08:00:00',
  },
  {
    id: 6,
    name: 'COSRX Snail 96 Mucin Essence',
    brand: 'COSRX',
    description: 'Lightweight essence formulated with 96% snail secretion filtrate to deeply hydrate and repair damaged skin barrier.',
    price: 25.0,
    stock: 80,
    skinType: 'ALL',
    ingredients: 'Snail Secretion Filtrate, Betaine, Butylene Glycol, 1,2-Hexanediol, Sodium Hyaluronate, Panthenol, Arginine',
    volume: '100ml',
    imageUrl: null,
    isBestSeller: true,
    isNew: false,
    category: MOCK_CATEGORIES[2],
    createdAt: '2026-02-20T11:45:00',
  },
  {
    id: 7,
    name: "Kiehl's Ultra Facial Cream",
    brand: "Kiehl's",
    description: '24-hour daily facial moisturizer with squalane and glacial glycoprotein that provides barrier comfort.',
    price: 38.0,
    stock: 40,
    skinType: 'DRY',
    ingredients: 'Aqua, Glycerin, Cyclohexasiloxane, Squalane, Bis-PEG-18 Methyl Ether Dimethyl Silane, Sucrose Stearate',
    volume: '50ml',
    imageUrl: null,
    isBestSeller: true,
    isNew: false,
    category: MOCK_CATEGORIES[3],
    createdAt: '2026-01-25T16:20:00',
  },
  {
    id: 8,
    name: 'Beauty of Joseon Relief Sun SPF50+',
    brand: 'Beauty of Joseon',
    description: 'Organic chemical sunscreen with 30% rice extract and grain probiotics that leaves a glowing finish with no white cast.',
    price: 18.0,
    stock: 95,
    skinType: 'SENSITIVE',
    ingredients: 'Water, Oryza Sativa (Rice) Extract, Dibutyl Adipate, Propanediol, Diethylamino Hydroxybenzoyl Hexyl Benzoate',
    volume: '50ml',
    imageUrl: null,
    isBestSeller: true,
    isNew: true,
    category: MOCK_CATEGORIES[4],
    createdAt: '2026-03-01T15:00:00',
  },
  {
    id: 9,
    name: 'La Roche-Posay Anthelios SPF50+',
    brand: 'La Roche-Posay',
    description: 'Ultra-high broad-spectrum invisible fluid protection against ultra-long UVA rays with non-greasy matte finish.',
    price: 22.5,
    stock: 65,
    skinType: 'NORMAL',
    ingredients: 'Aqua, Alcohol Denat., Triethyl Citrate, Diisopropyl Sebacate, Silica, Ethylhexyl Salicylate',
    volume: '50ml',
    imageUrl: null,
    isBestSeller: false,
    isNew: true,
    category: MOCK_CATEGORIES[4],
    createdAt: '2026-03-05T09:10:00',
  },
];

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl.replace(/\/+$/, '');
  }

  private buildQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value));
      }
    });
    const qs = searchParams.toString();
    return qs ? `?${qs}` : '';
  }

  private async request<T>(path: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options?.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMessage = `HTTP error ${response.status}: ${response.statusText}`;
      try {
        const errorJson = await response.json();
        errorMessage = errorJson.message || errorMessage;
      } catch {
        // ignore parse error
      }
      throw new Error(errorMessage);
    }

    return response.json();
  }

  /**
   * GET /api/categories
   */
  async getCategories(): Promise<Category[]> {
    try {
      return await this.request<Category[]>('/api/categories', {
        next: { revalidate: 3600 },
      });
    } catch (err: any) {
      if (err?.digest === 'DYNAMIC_SERVER_USAGE') throw err;
      console.warn('[ApiClient] Failed to fetch live categories, using fallback mock:', err);
      return MOCK_CATEGORIES;
    }
  }

  /**
   * GET /api/products?page=&size=&sortBy=&sortDir=
   */
  async getProducts(params: {
    page?: number;
    size?: number;
    sortBy?: string;
    sortDir?: string;
  } = {}): Promise<PageResponse<Product>> {
    const qs = this.buildQueryString(params);
    try {
      return await this.request<PageResponse<Product>>(`/api/products${qs}`, {
        cache: 'no-store',
      });
    } catch (err: any) {
      if (err?.digest === 'DYNAMIC_SERVER_USAGE') throw err;
      console.warn('[ApiClient] Failed to fetch live products, using fallback mock:', err);
      return this.mockPaginate(MOCK_PRODUCTS, params.page || 0, params.size || 10);
    }
  }

  /**
   * GET /api/products/filter
   */
  async filterProducts(params: ProductFilterParams): Promise<PageResponse<Product>> {
    const qs = this.buildQueryString(params);
    try {
      return await this.request<PageResponse<Product>>(`/api/products/filter${qs}`, {
        cache: 'no-store',
      });
    } catch (err: any) {
      if (err?.digest === 'DYNAMIC_SERVER_USAGE') throw err;
      console.warn('[ApiClient] Failed to filter live products, filtering fallback mock:', err);
      let list = [...MOCK_PRODUCTS];

      if (params.keyword) {
        const kw = params.keyword.toLowerCase();
        list = list.filter(
          p =>
            p.name.toLowerCase().includes(kw) ||
            p.brand.toLowerCase().includes(kw) ||
            p.description.toLowerCase().includes(kw)
        );
      }
      if (params.categoryId) {
        list = list.filter(p => p.category.id === Number(params.categoryId));
      }
      if (params.skinType && params.skinType !== 'ALL') {
        list = list.filter(p => p.skinType === params.skinType || p.skinType === 'ALL');
      }
      if (params.brand) {
        list = list.filter(p => p.brand.toLowerCase() === params.brand?.toLowerCase());
      }
      if (params.minPrice !== undefined) {
        list = list.filter(p => p.price >= (params.minPrice || 0));
      }
      if (params.maxPrice !== undefined) {
        list = list.filter(p => p.price <= (params.maxPrice || 999999));
      }
      if (params.isBestSeller !== undefined) {
        list = list.filter(p => p.isBestSeller === Boolean(params.isBestSeller));
      }
      if (params.isNew !== undefined) {
        list = list.filter(p => p.isNew === Boolean(params.isNew));
      }
      if (params.inStock !== undefined) {
        list = list.filter(p => (params.inStock ? p.stock > 0 : p.stock === 0));
      }

      // Sort
      const sortBy = params.sortBy || 'createdAt';
      const sortDir = params.sortDir || 'desc';
      list.sort((a, b) => {
        let valA: any = a[sortBy as keyof Product] ?? '';
        let valB: any = b[sortBy as keyof Product] ?? '';
        if (typeof valA === 'string') {
          return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return sortDir === 'asc' ? valA - valB : valB - valA;
      });

      return this.mockPaginate(list, params.page || 0, params.size || 12);
    }
  }

  /**
   * GET /api/products/{id}
   */
  async getProductById(id: number | string): Promise<Product> {
    try {
      return await this.request<Product>(`/api/products/${id}`, {
        cache: 'no-store',
      });
    } catch (err: any) {
      if (err?.digest === 'DYNAMIC_SERVER_USAGE') throw err;
      console.warn(`[ApiClient] Failed to fetch product ${id}, looking in fallback mock:`, err);
      const found = MOCK_PRODUCTS.find(p => p.id === Number(id));
      if (found) return found;
      throw new Error(`Product with ID ${id} not found`);
    }
  }

  /**
   * Helper to get bestsellers for homepage carousel
   */
  async getBestsellers(limit: number = 8): Promise<Product[]> {
    try {
      const res = await this.filterProducts({
        isBestSeller: true,
        page: 0,
        size: limit,
        sortBy: 'createdAt',
        sortDir: 'desc',
      });
      return res.content;
    } catch {
      return MOCK_PRODUCTS.filter(p => p.isBestSeller).slice(0, limit);
    }
  }

  private mockPaginate<T>(all: T[], page: number, size: number): PageResponse<T> {
    const totalElements = all.length;
    const totalPages = Math.max(1, Math.ceil(totalElements / size));
    const start = page * size;
    const content = all.slice(start, start + size);
    return {
      content,
      pageNumber: page,
      pageSize: size,
      totalElements,
      totalPages,
      first: page === 0,
      last: page >= totalPages - 1,
      empty: content.length === 0,
    };
  }
}

export const api = new ApiClient();
export default api;
