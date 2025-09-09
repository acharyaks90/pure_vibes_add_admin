import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { Product, CartItem, WishlistItem, Order, Address, DeliveryCharge } from '../types/kavach';
import { useAuth } from './useAuth';

interface KavachContextType {
  // Products
  products: Product[];
  categories: string[];
  fetchProducts: () => Promise<void>;
  
  // Wishlist
  wishlistItems: WishlistItem[];
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  
  // Cart
  cartItems: CartItem[];
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateCartQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  
  // Orders
  orders: Order[];
  createOrder: (orderData: Partial<Order>) => Promise<string | null>;
  fetchOrders: () => Promise<void>;
  trackOrder: (orderId: string) => Promise<Order | null>;
  
  // Delivery
  deliveryCharges: DeliveryCharge[];
  calculateDeliveryCharge: (subtotal: number) => number;
  
  // Addresses
  addresses: Address[];
  addAddress: (address: Address) => Promise<void>;
  updateAddress: (addressId: string, address: Address) => Promise<void>;
  deleteAddress: (addressId: string) => Promise<void>;
  
  isLoading: boolean;
}

const KavachContext = createContext<KavachContextType | undefined>(undefined);

export const useKavach = () => {
  const context = useContext(KavachContext);
  if (context === undefined) {
    throw new Error('useKavach must be used within a KavachProvider');
  }
  return context;
};

export const useKavachProvider = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [deliveryCharges, setDeliveryCharges] = useState<DeliveryCharge[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [...new Set(products.map(p => p.category))];

  // Load data from localStorage for guests
  useEffect(() => {
    if (!user) {
      const savedCart = localStorage.getItem('kavach_cart');
      const savedWishlist = localStorage.getItem('kavach_wishlist');
      
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist));
      }
    }
  }, [user]);

  // Save to localStorage for guests
  const saveToLocalStorage = useCallback((key: string, data: any) => {
    if (!user) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }, [user]);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    // Mock products data
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Sacred Ganesha Yantra',
        category: 'Yantras',
        price: 299,
        originalPrice: 499,
        description: 'Authentic brass Ganesha Yantra for removing obstacles and bringing prosperity. Handcrafted by skilled artisans with traditional methods.',
        images: [
          'https://images.pexels.com/photos/8107475/pexels-photo-8107475.jpeg?auto=compress&cs=tinysrgb&w=400',
          'https://images.pexels.com/photos/6787345/pexels-photo-6787345.jpeg?auto=compress&cs=tinysrgb&w=400'
        ],
        inStock: true,
        stockQuantity: 25,
        rating: 4.5,
        reviewCount: 124,
        tags: ['Ganesha', 'Yantra', 'Prosperity', 'Brass'],
        specifications: {
          'Material': 'Brass',
          'Size': '3x3 inches',
          'Weight': '150g',
          'Origin': 'India'
        },
        isActive: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-15'),
      },
      {
        id: '2',
        name: 'Rudraksha Mala 108 Beads',
        category: 'Malas',
        price: 899,
        originalPrice: 1199,
        description: 'Original 5 Mukhi Rudraksha mala for meditation and spiritual growth. Each bead is carefully selected and blessed.',
        images: [
          'https://images.pexels.com/photos/6787202/pexels-photo-6787202.jpeg?auto=compress&cs=tinysrgb&w=400'
        ],
        inStock: true,
        stockQuantity: 15,
        rating: 4.8,
        reviewCount: 87,
        tags: ['Rudraksha', 'Meditation', 'Mala', '108 Beads'],
        specifications: {
          'Beads': '108',
          'Type': '5 Mukhi',
          'Size': '6-7mm',
          'Thread': 'Cotton'
        },
        isActive: true,
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-16'),
      },
      {
        id: '3',
        name: 'Sri Chakra Crystal Yantra',
        category: 'Yantras',
        price: 1299,
        description: 'Pure crystal Sri Chakra for divine energy and abundance. Energized with sacred mantras.',
        images: [
          'https://images.pexels.com/photos/6787345/pexels-photo-6787345.jpeg?auto=compress&cs=tinysrgb&w=400'
        ],
        inStock: true,
        stockQuantity: 8,
        rating: 4.9,
        reviewCount: 156,
        tags: ['Sri Chakra', 'Crystal', 'Energy', 'Abundance'],
        specifications: {
          'Material': 'Pure Crystal',
          'Size': '4x4 inches',
          'Weight': '200g',
          'Energized': 'Yes'
        },
        isActive: true,
        createdAt: new Date('2024-01-03'),
        updatedAt: new Date('2024-01-17'),
      },
      {
        id: '4',
        name: 'Hanuman Chalisa Book Set',
        category: 'Books',
        price: 199,
        originalPrice: 299,
        description: 'Complete Hanuman Chalisa with meaning and benefits. Includes audio CD for proper pronunciation.',
        images: [
          'https://images.pexels.com/photos/8967654/pexels-photo-8967654.jpeg?auto=compress&cs=tinysrgb&w=400'
        ],
        inStock: false,
        stockQuantity: 0,
        rating: 4.3,
        reviewCount: 78,
        tags: ['Hanuman', 'Chalisa', 'Book', 'Audio CD'],
        specifications: {
          'Pages': '64',
          'Language': 'Hindi & English',
          'Includes': 'Audio CD',
          'Binding': 'Hardcover'
        },
        isActive: true,
        createdAt: new Date('2024-01-04'),
        updatedAt: new Date('2024-01-18'),
      },
      {
        id: '5',
        name: 'Lakshmi Ganesh Idol Set',
        category: 'Idols',
        price: 799,
        description: 'Beautiful brass Lakshmi Ganesh idol set for puja. Perfect for home temple and daily worship.',
        images: [
          'https://images.pexels.com/photos/8107489/pexels-photo-8107489.jpeg?auto=compress&cs=tinysrgb&w=400'
        ],
        inStock: true,
        stockQuantity: 12,
        rating: 4.6,
        reviewCount: 92,
        tags: ['Lakshmi', 'Ganesh', 'Idol', 'Brass', 'Puja'],
        specifications: {
          'Material': 'Brass',
          'Height': '4 inches',
          'Weight': '300g each',
          'Finish': 'Antique'
        },
        isActive: true,
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-19'),
      },
      {
        id: '6',
        name: 'Tulsi Mala Premium',
        category: 'Malas',
        price: 399,
        originalPrice: 599,
        description: 'Sacred Tulsi mala for daily prayers and meditation. Made from pure Tulsi wood.',
        images: [
          'https://images.pexels.com/photos/6787456/pexels-photo-6787456.jpeg?auto=compress&cs=tinysrgb&w=400'
        ],
        inStock: true,
        stockQuantity: 20,
        rating: 4.4,
        reviewCount: 65,
        tags: ['Tulsi', 'Prayer', 'Mala', 'Wood'],
        specifications: {
          'Material': 'Tulsi Wood',
          'Beads': '108',
          'Size': '5-6mm',
          'Origin': 'Vrindavan'
        },
        isActive: true,
        createdAt: new Date('2024-01-06'),
        updatedAt: new Date('2024-01-20'),
      },
    ];

    setProducts(mockProducts);
    
    // Mock delivery charges
    setDeliveryCharges([
      {
        id: '1',
        name: 'Standard Delivery',
        baseCharge: 50,
        freeDeliveryThreshold: 500,
        isActive: true,
      }
    ]);
    
    setIsLoading(false);
  }, []);

  const addToWishlist = useCallback(async (productId: string) => {
    const newItem: WishlistItem = {
      id: Date.now().toString(),
      userId: user?.id,
      productId,
      addedAt: new Date(),
    };
    
    const updatedWishlist = [...wishlistItems, newItem];
    setWishlistItems(updatedWishlist);
    saveToLocalStorage('kavach_wishlist', updatedWishlist);
  }, [wishlistItems, user, saveToLocalStorage]);

  const removeFromWishlist = useCallback(async (productId: string) => {
    const updatedWishlist = wishlistItems.filter(item => item.productId !== productId);
    setWishlistItems(updatedWishlist);
    saveToLocalStorage('kavach_wishlist', updatedWishlist);
  }, [wishlistItems, saveToLocalStorage]);

  const isInWishlist = useCallback((productId: string) => {
    return wishlistItems.some(item => item.productId === productId);
  }, [wishlistItems]);

  const addToCart = useCallback(async (productId: string, quantity = 1) => {
    const existingItem = cartItems.find(item => item.productId === productId);
    
    if (existingItem) {
      await updateCartQuantity(productId, existingItem.quantity + quantity);
    } else {
      const newItem: CartItem = {
        id: Date.now().toString(),
        userId: user?.id,
        productId,
        quantity,
        addedAt: new Date(),
        updatedAt: new Date(),
      };
      
      const updatedCart = [...cartItems, newItem];
      setCartItems(updatedCart);
      saveToLocalStorage('kavach_cart', updatedCart);
    }
  }, [cartItems, user, saveToLocalStorage]);

  const removeFromCart = useCallback(async (productId: string) => {
    const updatedCart = cartItems.filter(item => item.productId !== productId);
    setCartItems(updatedCart);
    saveToLocalStorage('kavach_cart', updatedCart);
  }, [cartItems, saveToLocalStorage]);

  const updateCartQuantity = useCallback(async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }
    
    const updatedCart = cartItems.map(item =>
      item.productId === productId
        ? { ...item, quantity, updatedAt: new Date() }
        : item
    );
    setCartItems(updatedCart);
    saveToLocalStorage('kavach_cart', updatedCart);
  }, [cartItems, removeFromCart, saveToLocalStorage]);

  const clearCart = useCallback(async () => {
    setCartItems([]);
    saveToLocalStorage('kavach_cart', []);
  }, [saveToLocalStorage]);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  }, [cartItems, products]);

  const getCartItemsCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const calculateDeliveryCharge = useCallback((subtotal: number) => {
    const activeCharge = deliveryCharges.find(charge => charge.isActive);
    if (!activeCharge) return 0;
    
    return subtotal >= activeCharge.freeDeliveryThreshold ? 0 : activeCharge.baseCharge;
  }, [deliveryCharges]);

  const createOrder = useCallback(async (orderData: Partial<Order>): Promise<string | null> => {
    try {
      const orderId = 'ORD' + Date.now().toString();
      const trackingId = 'TRK' + Math.random().toString(36).substr(2, 9).toUpperCase();
      
      const newOrder: Order = {
        id: orderId,
        userId: user?.id || 'guest',
        userName: user?.name || orderData.userName || 'Guest User',
        userMobile: user?.mobile || orderData.userMobile || '',
        userEmail: orderData.userEmail,
        items: orderData.items || [],
        subtotal: orderData.subtotal || 0,
        deliveryCharge: orderData.deliveryCharge || 0,
        total: orderData.total || 0,
        status: 'pending',
        paymentStatus: 'pending',
        paymentMethod: orderData.paymentMethod || '',
        shippingAddress: orderData.shippingAddress!,
        trackingId,
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        deliveryHistory: [
          {
            id: '1',
            orderId,
            status: 'Order Placed',
            location: 'Processing Center',
            description: 'Your order has been placed successfully',
            timestamp: new Date(),
          }
        ],
        orderDate: new Date(),
      };
      
      setOrders(prev => [...prev, newOrder]);
      return orderId;
    } catch (error) {
      console.error('Failed to create order:', error);
      return null;
    }
  }, [user]);

  const fetchOrders = useCallback(async () => {
    // Mock implementation - in real app, fetch from backend
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const trackOrder = useCallback(async (orderId: string): Promise<Order | null> => {
    return orders.find(order => order.id === orderId) || null;
  }, [orders]);

  const addAddress = useCallback(async (address: Address) => {
    const newAddress: Address = {
      ...address,
      id: Date.now().toString(),
      userId: user?.id,
    };
    setAddresses(prev => [...prev, newAddress]);
  }, [user]);

  const updateAddress = useCallback(async (addressId: string, address: Address) => {
    setAddresses(prev => prev.map(addr => 
      addr.id === addressId ? { ...address, id: addressId } : addr
    ));
  }, []);

  const deleteAddress = useCallback(async (addressId: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== addressId));
  }, []);

  return {
    products,
    categories,
    fetchProducts,
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    orders,
    createOrder,
    fetchOrders,
    trackOrder,
    deliveryCharges,
    calculateDeliveryCharge,
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    isLoading,
  };
};

export { KavachContext };