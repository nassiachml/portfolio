"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  sizes: string[];
  colors: string[];
  inStock: boolean;
}

interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
}

interface User {
  email: string;
  name: string;
  orders: Order[];
  isAdmin?: boolean;
}

interface StoreContextType {
  cart: CartItem[];
  favorites: number[];
  user: User | null;
  isAdmin: boolean;
  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (productId: number, size: string, color: string) => void;
  updateQuantity: (productId: number, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  createOrder: () => string | null;
  getOrders: () => Order[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load cart and favorites from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("fashion_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const savedFavorites = localStorage.getItem("fashion_favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedUser = localStorage.getItem("fashion_user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAdmin(userData.isAdmin || false);
    }

    // Initialize demo orders for admin
    const existingOrders = localStorage.getItem("fashion_orders");
    if (!existingOrders || JSON.parse(existingOrders).length === 0) {
      const demoOrders: Order[] = [
        {
          id: "UE-1701234567890",
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            {
              id: 1,
              name: "Oversized Hoodie Black",
              price: 59.99,
              quantity: 2,
              selectedSize: "M",
              selectedColor: "Noir",
              images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop"],
            },
            {
              id: 6,
              name: "Oversized T-Shirt Logo Black",
              price: 24.99,
              quantity: 1,
              selectedSize: "L",
              selectedColor: "Noir",
              images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop"],
            },
          ],
          total: 144.97,
          status: "delivered",
        },
        {
          id: "UE-1701234567891",
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            {
              id: 4,
              name: "Oversized Denim Jacket",
              price: 89.99,
              quantity: 1,
              selectedSize: "L",
              selectedColor: "Bleu foncé",
              images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop"],
            },
          ],
          total: 89.99,
          status: "shipped",
        },
        {
          id: "UE-1701234567892",
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            {
              id: 2,
              name: "Oversized Cargo Pants Olive",
              price: 69.99,
              quantity: 1,
              selectedSize: "M",
              selectedColor: "Olive",
              images: ["https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&h=1000&fit=crop"],
            },
            {
              id: 7,
              name: "Oversized Bomber Jacket",
              price: 79.99,
              quantity: 1,
              selectedSize: "XL",
              selectedColor: "Noir",
              images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop"],
            },
          ],
          total: 149.98,
          status: "processing",
        },
        {
          id: "UE-1701234567893",
          date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          items: [
            {
              id: 10,
              name: "Oversized Trench Coat",
              price: 129.99,
              quantity: 1,
              selectedSize: "M",
              selectedColor: "Beige",
              images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop"],
            },
          ],
          total: 129.99,
          status: "pending",
        },
      ];
      localStorage.setItem("fashion_orders", JSON.stringify(demoOrders));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("fashion_cart", JSON.stringify(cart));
  }, [cart]);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("fashion_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (product: Product, size: string, color: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) =>
          item.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prevCart,
        { ...product, quantity: 1, selectedSize: size, selectedColor: color },
      ];
    });
  };

  const removeFromCart = (productId: number, size: string, color: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      )
    );
  };

  const updateQuantity = (
    productId: number,
    size: string,
    color: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId &&
        item.selectedSize === size &&
        item.selectedColor === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const isFavorite = (productId: number) => {
    return favorites.includes(productId);
  };

  const login = (email: string, password: string): boolean => {
    // Admin login
    if (email === "admin@urbanedge.com" && password === "admin123") {
      const adminUser: User = {
        email,
        name: "Admin Urban Edge",
        orders: JSON.parse(localStorage.getItem("fashion_orders") || "[]"),
        isAdmin: true,
      };
      setUser(adminUser);
      setIsAdmin(true);
      localStorage.setItem("fashion_user", JSON.stringify(adminUser));
      return true;
    }

    // Demo client login
    if (email === "client@urbanedge.com" && password === "client123") {
      const demoUser: User = {
        email,
        name: "Marie Dubois",
        orders: JSON.parse(localStorage.getItem("fashion_orders") || "[]").slice(0, 2),
        isAdmin: false,
      };
      setUser(demoUser);
      setIsAdmin(false);
      localStorage.setItem("fashion_user", JSON.stringify(demoUser));
      return true;
    }

    // Generic user login
    const demoUser: User = {
      email,
      name: email.split("@")[0],
      orders: [],
      isAdmin: false,
    };
    setUser(demoUser);
    setIsAdmin(false);
    localStorage.setItem("fashion_user", JSON.stringify(demoUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("fashion_user");
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const createOrder = (): string | null => {
    if (cart.length === 0 || !user) return null;

    const order: Order = {
      id: `UE-${Date.now()}`,
      date: new Date().toISOString(),
      items: [...cart],
      total: getCartTotal(),
      status: "pending",
    };

    const existingOrders = JSON.parse(
      localStorage.getItem("fashion_orders") || "[]"
    );
    const updatedOrders = [...existingOrders, order];
    localStorage.setItem("fashion_orders", JSON.stringify(updatedOrders));

    if (user) {
      const updatedUser = {
        ...user,
        orders: [...user.orders, order],
      };
      setUser(updatedUser);
      localStorage.setItem("fashion_user", JSON.stringify(updatedUser));
    }

    clearCart();
    return order.id;
  };

  const getOrders = (): Order[] => {
    return JSON.parse(localStorage.getItem("fashion_orders") || "[]");
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        favorites,
        user,
        isAdmin,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleFavorite,
        isFavorite,
        login,
        logout,
        getCartTotal,
        getCartItemsCount,
        createOrder,
        getOrders,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
