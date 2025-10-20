import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

// Import product images
import picanhaImg from '@/assets/products/picanha.jpg';
import contrafileImg from '@/assets/products/contrafile.jpg';
import costelaImg from '@/assets/products/costela.jpg';
import lomboSuinoImg from '@/assets/products/lombo-suino.jpg';
import coxaFrangoImg from '@/assets/products/coxa-frango.jpg';
import peitoFrangoImg from '@/assets/products/peito-frango.jpg';
import linguicaImg from '@/assets/products/linguica.jpg';
import hamburguerImg from '@/assets/products/hamburguer.jpg';
import alcatraImg from '@/assets/products/alcatra.jpg';
import fileMignonImg from '@/assets/products/file-mignon.jpg';
import costelinhaSuinaImg from '@/assets/products/costelinha-suina.jpg';
import asaFrangoImg from '@/assets/products/asa-frango.jpg';

// Import category images
import bovinosImg from '@/assets/categories/bovinos.jpg';
import suinosImg from '@/assets/categories/suinos.jpg';
import avesImg from '@/assets/categories/aves.jpg';
import congeladosImg from '@/assets/categories/congelados.jpg';
import resfriadosImg from '@/assets/categories/resfriados.jpg';
import especialImg from '@/assets/categories/especiais.jpg';

export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  images: string[];
  category: string;
  packaging: string;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
}

export interface QuoteItem {
  product: Product;
  quantity: number;
}

export interface QuoteRequest {
  id: string;
  date: string;
  customer: {
    name: string;
    company: string;
    cnpj: string;
    email: string;
    phone: string;
  };
  items: QuoteItem[];
  status: 'novo' | 'em-atendimento' | 'finalizado';
}

export interface AdminUser {
  id: number;
  nome: string;
  email: string;
  senha_mock: string;
  nivel: 'admin' | 'vendedor';
}

export interface Banner {
  id: number;
  imagem_desktop: string;
  imagem_mobile: string;
  link_url: string;
  ordem?: number;
}

// Mock Categories
const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Bovinos', slug: 'bovinos', icon: '🥩', image: bovinosImg },
  { id: '2', name: 'Suínos', slug: 'suinos', icon: '🥓', image: suinosImg },
  { id: '3', name: 'Aves', slug: 'aves', icon: '🍗', image: avesImg },
  { id: '4', name: 'Congelados', slug: 'congelados', icon: '❄️', image: congeladosImg },
  { id: '5', name: 'Resfriados', slug: 'resfriados', icon: '🧊', image: resfriadosImg },
  { id: '6', name: 'Especiais', slug: 'especiais', icon: '⭐', image: especialImg },
];

// Mock Products
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Picanha Maturada',
    sku: 'BOV-001',
    description: 'Picanha nobre maturada por 21 dias, com marmoreio excepcional. Ideal para churrascos premium e ocasiões especiais.',
    images: [picanhaImg, picanhaImg, picanhaImg],
    category: 'bovinos',
    packaging: 'Caixa: 12 kg a 15 kg, 8 a 10 peças por caixa',
    featured: true,
  },
  {
    id: '2',
    name: 'Contrafilé Resfriado',
    sku: 'BOV-002',
    description: 'Contrafilé premium resfriado, maciez e sabor incomparáveis. Perfeito para bifes e grelhados.',
    images: [contrafileImg, contrafileImg],
    category: 'bovinos',
    packaging: 'Caixa: 15 kg a 18 kg, 12 a 15 peças por caixa',
    featured: true,
  },
  {
    id: '3',
    name: 'Costela Bovina',
    sku: 'BOV-003',
    description: 'Costela bovina com osso, ideal para assados lentos e churrascos tradicionais.',
    images: [costelaImg],
    category: 'bovinos',
    packaging: 'Caixa: 20 kg a 25 kg, 10 a 12 peças por caixa',
    featured: false,
  },
  {
    id: '4',
    name: 'Lombo Suíno',
    sku: 'SUI-001',
    description: 'Lombo suíno de primeira qualidade, limpo e aparado. Versátil para diversas preparações.',
    images: [lomboSuinoImg, lomboSuinoImg],
    category: 'suinos',
    packaging: 'Caixa: 10 kg a 12 kg, 6 a 8 peças por caixa',
    featured: true,
  },
  {
    id: '5',
    name: 'Coxa e Sobrecoxa de Frango',
    sku: 'AVE-001',
    description: 'Coxa e sobrecoxa de frango congelada, qualidade superior para restaurantes.',
    images: [coxaFrangoImg],
    category: 'aves',
    packaging: 'Caixa: 15 kg, aproximadamente 60 peças por caixa',
    featured: true,
  },
  {
    id: '6',
    name: 'Peito de Frango',
    sku: 'AVE-002',
    description: 'Peito de frango sem osso e sem pele, congelado. Ideal para preparações rápidas.',
    images: [peitoFrangoImg, peitoFrangoImg],
    category: 'aves',
    packaging: 'Caixa: 12 kg, 8 a 10 peças por caixa',
    featured: false,
  },
  {
    id: '7',
    name: 'Linguiça Toscana',
    sku: 'ESP-001',
    description: 'Linguiça toscana artesanal com temperos selecionados. Sabor marcante e autêntico.',
    images: [linguicaImg],
    category: 'especiais',
    packaging: 'Caixa: 8 kg, aproximadamente 40 unidades',
    featured: true,
  },
  {
    id: '8',
    name: 'Hambúrguer Artesanal',
    sku: 'ESP-002',
    description: 'Hambúrguer artesanal de carne bovina selecionada. Perfeito para lanches gourmet.',
    images: [hamburguerImg, hamburguerImg],
    category: 'especiais',
    packaging: 'Caixa: 6 kg, 60 unidades de 100g',
    featured: true,
  },
  {
    id: '9',
    name: 'Alcatra Bovina',
    sku: 'BOV-004',
    description: 'Alcatra de primeira, versátil e saborosa. Excelente custo-benefício.',
    images: [alcatraImg],
    category: 'bovinos',
    packaging: 'Caixa: 18 kg a 20 kg, 10 a 12 peças por caixa',
    featured: false,
  },
  {
    id: '10',
    name: 'Filé Mignon',
    sku: 'BOV-005',
    description: 'Filé mignon premium, o corte mais nobre e macio. Excelência garantida.',
    images: [fileMignonImg, fileMignonImg, fileMignonImg],
    category: 'bovinos',
    packaging: 'Caixa: 8 kg a 10 kg, 12 a 15 peças por caixa',
    featured: true,
  },
  {
    id: '11',
    name: 'Costelinha Suína',
    sku: 'SUI-002',
    description: 'Costelinha suína temperada, pronta para assar. Sabor incomparável.',
    images: [costelinhaSuinaImg],
    category: 'suinos',
    packaging: 'Caixa: 12 kg, 8 a 10 peças por caixa',
    featured: false,
  },
  {
    id: '12',
    name: 'Asa de Frango Congelada',
    sku: 'AVE-003',
    description: 'Asa de frango congelada de primeira qualidade. Perfeita para frituras e assados.',
    images: [asaFrangoImg, asaFrangoImg],
    category: 'aves',
    packaging: 'Caixa: 15 kg, aproximadamente 80 peças',
    featured: false,
  },
];

// Mock Admin Users
const MOCK_ADMIN_USERS: AdminUser[] = [
  {
    id: 1,
    nome: 'Admin Master',
    email: 'admin@realcarnes.com.br',
    senha_mock: 'admin123',
    nivel: 'admin',
  },
  {
    id: 2,
    nome: 'Felipe Vendedor',
    email: 'vendedor@realcarnes.com.br',
    senha_mock: 'vendas123',
    nivel: 'vendedor',
  },
];

// Mock Banners
const MOCK_BANNERS: Banner[] = [
  {
    id: 1,
    imagem_desktop: 'https://placehold.co/1400x450/b02a37/white?text=Banner+Oferta+Picanha',
    imagem_mobile: 'https://placehold.co/800x600/b02a37/white?text=Banner+Picanha+Mobile',
    link_url: '/produto/1001',
    ordem: 1,
  },
  {
    id: 2,
    imagem_desktop: 'https://placehold.co/1400x450/e0a800/white?text=Banner+Linha+Aves',
    imagem_mobile: 'https://placehold.co/800x600/e0a800/white?text=Banner+Aves+Mobile',
    link_url: '/categoria/aves',
    ordem: 2,
  },
];

// Mock Quote Requests (para admin)
const INITIAL_QUOTES: QuoteRequest[] = [
  {
    id: 'Q001',
    date: '2025-01-15',
    customer: {
      name: 'João Silva',
      company: 'Restaurante Sabor & Arte',
      cnpj: '12.345.678/0001-90',
      email: 'joao@saborarte.com.br',
      phone: '(11) 98765-4321',
    },
    items: [
      { product: MOCK_PRODUCTS[0], quantity: 5 },
      { product: MOCK_PRODUCTS[3], quantity: 3 },
    ],
    status: 'novo',
  },
  {
    id: 'Q002',
    date: '2025-01-14',
    customer: {
      name: 'Maria Santos',
      company: 'Açougue Premium',
      cnpj: '98.765.432/0001-10',
      email: 'maria@acouguepremium.com.br',
      phone: '(11) 91234-5678',
    },
    items: [
      { product: MOCK_PRODUCTS[1], quantity: 10 },
      { product: MOCK_PRODUCTS[4], quantity: 8 },
      { product: MOCK_PRODUCTS[6], quantity: 5 },
    ],
    status: 'em-atendimento',
  },
];

interface MockDataContextType {
  // Products
  products: Product[];
  getProducts: (categorySlug?: string, featured?: boolean) => Product[];
  getProductById: (id: string) => Product | undefined;
  searchProducts: (query: string) => Product[];
  createProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Categories
  categories: Category[];
  getCategories: () => Category[];
  getCategoryBySlug: (slug: string) => Category | undefined;
  createCategory: (category: Omit<Category, 'id'>) => Category;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  // Quote Cart
  quoteCart: QuoteItem[];
  addToQuoteCart: (product: Product, quantity?: number) => void;
  removeFromQuoteCart: (productId: string) => void;
  updateQuoteCartQuantity: (productId: string, quantity: number) => void;
  clearQuoteCart: () => void;
  getQuoteCartCount: () => number;
  
  // Quote Requests
  quoteRequests: QuoteRequest[];
  submitQuoteRequest: (customerData: QuoteRequest['customer']) => QuoteRequest;
  getQuoteRequests: (status?: QuoteRequest['status']) => QuoteRequest[];
  getQuoteRequestById: (id: string) => QuoteRequest | undefined;
  updateQuoteStatus: (id: string, status: QuoteRequest['status']) => void;
  
  // Admin Users
  adminUsers: AdminUser[];
  authenticateAdmin: (email: string, password: string) => AdminUser | null;
  getAdminUsers: () => AdminUser[];
  createAdminUser: (user: Omit<AdminUser, 'id'>) => AdminUser;
  updateAdminUser: (id: number, updates: Partial<AdminUser>) => void;
  deleteAdminUser: (id: number) => void;
  
  // Banners
  banners: Banner[];
  getBanners: () => Banner[];
  getBannerById: (id: number) => Banner | undefined;
  createBanner: (banner: Omit<Banner, 'id'>) => Banner;
  updateBanner: (id: number, updates: Partial<Banner>) => void;
  deleteBanner: (id: number) => void;
  reorderBanners: (bannerIds: number[]) => void;
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export const MockDataProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>(INITIAL_QUOTES);
  const [quoteCart, setQuoteCart] = useState<QuoteItem[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(MOCK_ADMIN_USERS);
  const [banners, setBanners] = useState<Banner[]>(MOCK_BANNERS);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('realCarnesQuoteCart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        console.log('Loaded cart from localStorage:', parsed);
        setQuoteCart(parsed);
      } catch (e) {
        console.error('Error loading cart from localStorage:', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    console.log('Saving cart to localStorage:', quoteCart);
    localStorage.setItem('realCarnesQuoteCart', JSON.stringify(quoteCart));
  }, [quoteCart]);

  // Products
  const getProducts = useCallback((categorySlug?: string, featured?: boolean) => {
    let filtered = products;
    
    if (categorySlug) {
      filtered = filtered.filter(p => p.category === categorySlug);
    }
    
    if (featured !== undefined) {
      filtered = filtered.filter(p => p.featured === featured);
    }
    
    return filtered;
  }, [products]);

  const getProductById = useCallback((id: string) => {
    return products.find(p => p.id === id);
  }, [products]);

  const searchProducts = useCallback((query: string) => {
    const lowerQuery = query.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.sku.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    );
  }, [products]);

  const createProduct = useCallback((product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: String(products.length + 1),
    };
    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  }, [products.length]);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, ...updates } : product
      )
    );
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  // Categories
  const getCategories = useCallback(() => {
    return categories;
  }, [categories]);

  const getCategoryBySlug = useCallback((slug: string) => {
    return categories.find(c => c.slug === slug);
  }, [categories]);

  const createCategory = useCallback((category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: String(categories.length + 1),
    };
    setCategories(prev => [...prev, newCategory]);
    return newCategory;
  }, [categories.length]);

  const updateCategory = useCallback((id: string, updates: Partial<Category>) => {
    setCategories(prev =>
      prev.map(category =>
        category.id === id ? { ...category, ...updates } : category
      )
    );
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  }, []);

  // Quote Cart
  const addToQuoteCart = useCallback((product: Product, quantity: number = 1) => {
    console.log('Adding to cart:', product.name, 'quantity:', quantity);
    setQuoteCart(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeFromQuoteCart = useCallback((productId: string) => {
    setQuoteCart(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const updateQuoteCartQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromQuoteCart(productId);
      return;
    }
    
    setQuoteCart(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeFromQuoteCart]);

  const clearQuoteCart = useCallback(() => {
    setQuoteCart([]);
  }, []);

  const getQuoteCartCount = useCallback(() => {
    return quoteCart.reduce((total, item) => total + item.quantity, 0);
  }, [quoteCart]);

  // Quote Requests
  const submitQuoteRequest = useCallback((customerData: QuoteRequest['customer']) => {
    const newQuote: QuoteRequest = {
      id: `Q${String(quoteRequests.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      customer: customerData,
      items: [...quoteCart],
      status: 'novo',
    };
    
    setQuoteRequests(prev => [newQuote, ...prev]);
    clearQuoteCart();
    
    return newQuote;
  }, [quoteCart, quoteRequests.length, clearQuoteCart]);

  const getQuoteRequests = useCallback((status?: QuoteRequest['status']) => {
    if (status) {
      return quoteRequests.filter(q => q.status === status);
    }
    return quoteRequests;
  }, [quoteRequests]);

  const getQuoteRequestById = useCallback((id: string) => {
    return quoteRequests.find(q => q.id === id);
  }, [quoteRequests]);

  const updateQuoteStatus = useCallback((id: string, status: QuoteRequest['status']) => {
    setQuoteRequests(prev =>
      prev.map(quote =>
        quote.id === id ? { ...quote, status } : quote
      )
    );
  }, []);

  // Admin Users
  const authenticateAdmin = useCallback((email: string, password: string) => {
    const user = adminUsers.find(
      u => u.email === email && u.senha_mock === password
    );
    return user || null;
  }, [adminUsers]);

  const getAdminUsers = useCallback(() => {
    return adminUsers;
  }, [adminUsers]);

  const createAdminUser = useCallback((user: Omit<AdminUser, 'id'>) => {
    const newUser: AdminUser = {
      ...user,
      id: Math.max(...adminUsers.map(u => u.id), 0) + 1,
    };
    setAdminUsers(prev => [...prev, newUser]);
    return newUser;
  }, [adminUsers]);

  const updateAdminUser = useCallback((id: number, updates: Partial<AdminUser>) => {
    setAdminUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, ...updates } : user
      )
    );
  }, []);

  const deleteAdminUser = useCallback((id: number) => {
    setAdminUsers(prev => prev.filter(u => u.id !== id));
  }, []);

  // Banners
  const getBanners = useCallback(() => {
    return [...banners].sort((a, b) => (a.ordem || 0) - (b.ordem || 0));
  }, [banners]);

  const getBannerById = useCallback((id: number) => {
    return banners.find(b => b.id === id);
  }, [banners]);

  const createBanner = useCallback((banner: Omit<Banner, 'id'>) => {
    const newBanner: Banner = {
      ...banner,
      id: Math.max(...banners.map(b => b.id), 0) + 1,
      ordem: banner.ordem || banners.length + 1,
    };
    setBanners(prev => [...prev, newBanner]);
    return newBanner;
  }, [banners]);

  const updateBanner = useCallback((id: number, updates: Partial<Banner>) => {
    setBanners(prev =>
      prev.map(banner =>
        banner.id === id ? { ...banner, ...updates } : banner
      )
    );
  }, []);

  const deleteBanner = useCallback((id: number) => {
    setBanners(prev => prev.filter(b => b.id !== id));
  }, []);

  const reorderBanners = useCallback((bannerIds: number[]) => {
    setBanners(prev => {
      const reordered = bannerIds.map((id, index) => {
        const banner = prev.find(b => b.id === id);
        return banner ? { ...banner, ordem: index + 1 } : null;
      }).filter(Boolean) as Banner[];
      
      return reordered;
    });
  }, []);

  const value = {
    products,
    getProducts,
    getProductById,
    searchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    
    categories,
    getCategories,
    getCategoryBySlug,
    createCategory,
    updateCategory,
    deleteCategory,
    
    quoteCart,
    addToQuoteCart,
    removeFromQuoteCart,
    updateQuoteCartQuantity,
    clearQuoteCart,
    getQuoteCartCount,
    
    quoteRequests,
    submitQuoteRequest,
    getQuoteRequests,
    getQuoteRequestById,
    updateQuoteStatus,
    
    adminUsers,
    authenticateAdmin,
    getAdminUsers,
    createAdminUser,
    updateAdminUser,
    deleteAdminUser,
    
    banners,
    getBanners,
    getBannerById,
    createBanner,
    updateBanner,
    deleteBanner,
    reorderBanners,
  };

  return (
    <MockDataContext.Provider value={value}>
      {children}
    </MockDataContext.Provider>
  );
};

export const useMockData = () => {
  const context = useContext(MockDataContext);
  if (context === undefined) {
    throw new Error('useMockData must be used within a MockDataProvider');
  }
  return context;
};
