"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Dish {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  allergens: string[];
  vegetarian: boolean;
  spicy: boolean;
  available: boolean;
}

interface CartItem extends Dish {
  quantity: number;
}

interface User {
  email: string;
  name: string;
  phone?: string;
  isAdmin: boolean;
  loyaltyPoints?: number;
  loyaltyLevel?: "bronze" | "silver" | "gold" | "platinum";
}

interface Reservation {
  id: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
  status: "pending" | "confirmed" | "cancelled";
}

interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  type: "pickup" | "dine-in";
  pickupTime?: string;
  status: "pending" | "preparing" | "ready" | "completed" | "cancelled";
  customerName: string;
  customerPhone: string;
}

interface RestaurantContextType {
  cart: CartItem[];
  favorites: number[];
  user: User | null;
  isAdmin: boolean;
  reservations: Reservation[];
  orders: Order[];
  loyaltyPoints: number;
  loyaltyLevel: "bronze" | "silver" | "gold" | "platinum";
  addToCart: (dish: Dish) => void;
  removeFromCart: (dishId: number) => void;
  updateQuantity: (dishId: number, quantity: number) => void;
  clearCart: () => void;
  getCartItemsCount: () => number;
  getCartTotal: () => number;
  getCartSubtotal: () => number;
  getCartDiscount: () => number;
  toggleFavorite: (dishId: number) => void;
  isFavorite: (dishId: number) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  addReservation: (reservation: Omit<Reservation, "id" | "status">) => void;
  getReservations: () => Reservation[];
  addOrder: (order: Omit<Order, "id" | "date" | "status">) => void;
  getOrders: () => Order[];
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  updateReservationStatus: (reservationId: string, status: Reservation["status"]) => void;
  addLoyaltyPoints: (points: number) => void;
  getLoyaltyDiscount: () => number;
  promoCode?: string;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export function RestaurantProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(0);
  const [loyaltyLevel, setLoyaltyLevel] = useState<"bronze" | "silver" | "gold" | "platinum">("bronze");
  const [promoCode, setPromoCode] = useState<string | undefined>(undefined);

  useEffect(() => {
    const savedCart = localStorage.getItem("restaurant_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    const savedFavorites = localStorage.getItem("restaurant_favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedUser = localStorage.getItem("restaurant_user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAdmin(userData.isAdmin || false);
      if (userData.loyaltyPoints !== undefined) {
        setLoyaltyPoints(userData.loyaltyPoints);
      }
      if (userData.loyaltyLevel) {
        setLoyaltyLevel(userData.loyaltyLevel);
      }
    }

    const savedLoyaltyPoints = localStorage.getItem("restaurant_loyalty_points");
    if (savedLoyaltyPoints) {
      const points = parseInt(savedLoyaltyPoints, 10);
      setLoyaltyPoints(points);
      updateLoyaltyLevel(points);
    }

    const savedReservations = localStorage.getItem("restaurant_reservations");
    if (savedReservations) {
      setReservations(JSON.parse(savedReservations));
    } else {
      // Générer beaucoup de réservations fictives
      const demoReservations: Reservation[] = [
        // Réservations pour Marie Dubois
        {
          id: "RES-001",
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          time: "19:30",
          guests: 2,
          name: "Marie Dubois",
          email: "client@sakura-troyes.fr",
          phone: "+33 6 12 34 56 78",
          specialRequests: "Table près de la fenêtre",
          status: "confirmed",
        },
        {
          id: "RES-002",
          date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          time: "20:00",
          guests: 4,
          name: "Marie Dubois",
          email: "client@sakura-troyes.fr",
          phone: "+33 6 12 34 56 78",
          specialRequests: "Anniversaire",
          status: "confirmed",
        },
        {
          id: "RES-003",
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          time: "19:00",
          guests: 2,
          name: "Marie Dubois",
          email: "client@sakura-troyes.fr",
          phone: "+33 6 12 34 56 78",
          status: "confirmed",
        },
        {
          id: "RES-004",
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          time: "12:30",
          guests: 3,
          name: "Marie Dubois",
          email: "client@sakura-troyes.fr",
          phone: "+33 6 12 34 56 78",
          status: "pending",
        },
        // Réservations pour autres clients
        {
          id: "RES-005",
          date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
          time: "20:30",
          guests: 2,
          name: "Sophie Bernard",
          email: "sophie.bernard@email.com",
          phone: "+33 6 34 56 78 90",
          status: "confirmed",
        },
        {
          id: "RES-006",
          date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          time: "19:00",
          guests: 6,
          name: "Thomas Leroy",
          email: "thomas.leroy@email.com",
          phone: "+33 6 45 67 89 01",
          specialRequests: "Table pour groupe",
          status: "confirmed",
        },
        {
          id: "RES-007",
          date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
          time: "12:00",
          guests: 4,
          name: "Emma Martin",
          email: "emma.martin@email.com",
          phone: "+33 6 56 78 90 12",
          status: "pending",
        },
        {
          id: "RES-008",
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          time: "20:00",
          guests: 2,
          name: "Lucas Dubois",
          email: "lucas.dubois@email.com",
          phone: "+33 6 67 89 01 23",
          status: "confirmed",
        },
        {
          id: "RES-009",
          date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
          time: "19:30",
          guests: 5,
          name: "Clara Petit",
          email: "clara.petit@email.com",
          phone: "+33 6 78 90 12 34",
          specialRequests: "Allergie aux arachides",
          status: "pending",
        },
        {
          id: "RES-010",
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          time: "12:30",
          guests: 3,
          name: "Hugo Garcia",
          email: "hugo.garcia@email.com",
          phone: "+33 6 89 01 23 45",
          status: "confirmed",
        },
        {
          id: "RES-011",
          date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
          time: "20:00",
          guests: 2,
          name: "Manon Lefevre",
          email: "manon.lefevre@email.com",
          phone: "+33 6 90 12 34 56",
          status: "pending",
        },
        {
          id: "RES-012",
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          time: "19:00",
          guests: 4,
          name: "Paul Bernard",
          email: "paul.bernard@email.com",
          phone: "+33 6 01 23 45 67",
          status: "confirmed",
        },
      ];
      setReservations(demoReservations);
      localStorage.setItem("restaurant_reservations", JSON.stringify(demoReservations));
    }

    const savedOrders = localStorage.getItem("restaurant_orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Générer beaucoup de commandes fictives
      const demoOrders: Order[] = [
        {
          id: "ORD-001",
          date: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          items: [
            {
              id: 1,
              name: "Assortiment Sushi Premium",
              description: "Sélection de 12 sushis frais",
              category: "sushis",
              price: 24.90,
              image: "",
              allergens: ["Poisson", "Soja"],
              vegetarian: false,
              spicy: false,
              available: true,
              quantity: 1,
            },
          ],
          total: 24.90,
          type: "pickup",
          pickupTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
          status: "preparing",
          customerName: "Sophie Bernard",
          customerPhone: "+33 6 34 56 78 90",
        },
        {
          id: "ORD-002",
          date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          items: [
            {
              id: 6,
              name: "Ramen Tonkotsu",
              description: "Bouillon de porc crémeux",
              category: "plats",
              price: 16.90,
              image: "",
              allergens: ["Gluten", "Œufs", "Soja"],
              vegetarian: false,
              spicy: false,
              available: true,
              quantity: 2,
            },
          ],
          total: 33.80,
          type: "dine-in",
          status: "ready",
          customerName: "Thomas Leroy",
          customerPhone: "+33 6 45 67 89 01",
        },
        // Commandes pour Marie Dubois (client de démo)
        {
          id: "ORD-003",
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            {
              id: 1,
              name: "Assortiment Sushi Premium",
              description: "Sélection de 12 sushis frais",
              category: "sushis",
              price: 24.90,
              image: "",
              allergens: ["Poisson", "Soja"],
              vegetarian: false,
              spicy: false,
              available: true,
              quantity: 2,
            },
            {
              id: 3,
              name: "Maki California",
              description: "8 makis au saumon, avocat et concombre",
              category: "makis",
              price: 12.90,
              image: "",
              allergens: ["Poisson", "Soja"],
              vegetarian: false,
              spicy: false,
              available: true,
              quantity: 1,
            },
          ],
          total: 62.70,
          type: "dine-in",
          status: "completed",
          customerName: "Marie Dubois",
          customerPhone: "+33 6 12 34 56 78",
        },
        {
          id: "ORD-004",
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            {
              id: 6,
              name: "Ramen Tonkotsu",
              description: "Bouillon de porc crémeux",
              category: "plats",
              price: 16.90,
              image: "",
              allergens: ["Gluten", "Œufs", "Soja"],
              vegetarian: false,
              spicy: false,
              available: true,
              quantity: 1,
            },
            {
              id: 11,
              name: "Soupe Miso",
              description: "Soupe traditionnelle au miso",
              category: "entrees",
              price: 5.90,
              image: "",
              allergens: ["Soja"],
              vegetarian: true,
              spicy: false,
              available: true,
              quantity: 1,
            },
          ],
          total: 22.80,
          type: "pickup",
          status: "completed",
          customerName: "Marie Dubois",
          customerPhone: "+33 6 12 34 56 78",
        },
        {
          id: "ORD-005",
          date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            {
              id: 19,
              name: "Menu Découverte",
              description: "Assortiment sushis + Maki + Entrée + Dessert",
              category: "plats",
              price: 32.90,
              image: "",
              allergens: ["Poisson", "Soja", "Gluten"],
              vegetarian: false,
              spicy: false,
              available: true,
              quantity: 1,
            },
          ],
          total: 32.90,
          type: "dine-in",
          status: "completed",
          customerName: "Marie Dubois",
          customerPhone: "+33 6 12 34 56 78",
        },
        {
          id: "ORD-006",
          date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            {
              id: 2,
              name: "Sashimi Mix",
              description: "Assortiment de 15 sashimis",
              category: "sushis",
              price: 28.50,
              image: "",
              allergens: ["Poisson", "Soja"],
              vegetarian: false,
              spicy: false,
              available: true,
              quantity: 1,
            },
            {
              id: 13,
              name: "Mochi Glacé",
              description: "3 mochis glacés",
              category: "desserts",
              price: 7.90,
              image: "",
              allergens: ["Gluten", "Lait", "Sésame"],
              vegetarian: true,
              spicy: false,
              available: true,
              quantity: 1,
            },
          ],
          total: 36.40,
          type: "dine-in",
          status: "completed",
          customerName: "Marie Dubois",
          customerPhone: "+33 6 12 34 56 78",
        },
        {
          id: "ORD-007",
          date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            {
              id: 8,
              name: "Teriyaki Saumon",
              description: "Filet de saumon grillé",
              category: "plats",
              price: 19.90,
              image: "",
              allergens: ["Poisson", "Soja", "Gluten"],
              vegetarian: false,
              spicy: false,
              available: true,
              quantity: 1,
            },
            {
              id: 12,
              name: "Gyoza Porc",
              description: "6 raviolis japonais",
              category: "entrees",
              price: 8.90,
              image: "",
              allergens: ["Gluten", "Soja"],
              vegetarian: false,
              spicy: false,
              available: true,
              quantity: 1,
            },
          ],
          total: 28.80,
          type: "pickup",
          status: "completed",
          customerName: "Marie Dubois",
          customerPhone: "+33 6 12 34 56 78",
        },
        // Beaucoup d'autres commandes pour l'admin
        {
          id: "ORD-008",
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            { id: 1, name: "Assortiment Sushi Premium", description: "Sélection de 12 sushis frais", category: "sushis", price: 24.90, image: "", allergens: ["Poisson", "Soja"], vegetarian: false, spicy: false, available: true, quantity: 1 },
            { id: 13, name: "Mochi Glacé", description: "3 mochis glacés", category: "desserts", price: 7.90, image: "", allergens: ["Gluten", "Lait"], vegetarian: true, spicy: false, available: true, quantity: 2 },
          ],
          total: 40.70,
          type: "dine-in",
          status: "completed",
          customerName: "Emma Martin",
          customerPhone: "+33 6 56 78 90 12",
        },
        {
          id: "ORD-009",
          date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            { id: 6, name: "Ramen Tonkotsu", description: "Bouillon de porc crémeux", category: "plats", price: 16.90, image: "", allergens: ["Gluten", "Œufs"], vegetarian: false, spicy: false, available: true, quantity: 1 },
          ],
          total: 16.90,
          type: "pickup",
          status: "completed",
          customerName: "Lucas Dubois",
          customerPhone: "+33 6 67 89 01 23",
        },
        {
          id: "ORD-010",
          date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            { id: 2, name: "Sashimi Mix", description: "Assortiment de 15 sashimis", category: "sushis", price: 28.50, image: "", allergens: ["Poisson", "Soja"], vegetarian: false, spicy: false, available: true, quantity: 1 },
            { id: 3, name: "Maki California", description: "8 makis", category: "makis", price: 12.90, image: "", allergens: ["Poisson"], vegetarian: false, spicy: false, available: true, quantity: 1 },
            { id: 11, name: "Soupe Miso", description: "Soupe traditionnelle", category: "entrees", price: 5.90, image: "", allergens: ["Soja"], vegetarian: true, spicy: false, available: true, quantity: 1 },
          ],
          total: 47.30,
          type: "dine-in",
          status: "completed",
          customerName: "Clara Petit",
          customerPhone: "+33 6 78 90 12 34",
        },
        {
          id: "ORD-011",
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            { id: 8, name: "Teriyaki Saumon", description: "Filet de saumon grillé", category: "plats", price: 19.90, image: "", allergens: ["Poisson", "Soja"], vegetarian: false, spicy: false, available: true, quantity: 2 },
          ],
          total: 39.80,
          type: "dine-in",
          status: "completed",
          customerName: "Hugo Garcia",
          customerPhone: "+33 6 89 01 23 45",
        },
        {
          id: "ORD-012",
          date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            { id: 19, name: "Menu Découverte", description: "Assortiment complet", category: "plats", price: 32.90, image: "", allergens: ["Poisson", "Soja"], vegetarian: false, spicy: false, available: true, quantity: 1 },
            { id: 13, name: "Mochi Glacé", description: "3 mochis", category: "desserts", price: 7.90, image: "", allergens: ["Gluten"], vegetarian: true, spicy: false, available: true, quantity: 1 },
          ],
          total: 40.80,
          type: "pickup",
          status: "completed",
          customerName: "Manon Lefevre",
          customerPhone: "+33 6 90 12 34 56",
        },
        {
          id: "ORD-013",
          date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            { id: 1, name: "Assortiment Sushi Premium", description: "12 sushis", category: "sushis", price: 24.90, image: "", allergens: ["Poisson"], vegetarian: false, spicy: false, available: true, quantity: 3 },
          ],
          total: 74.70,
          type: "dine-in",
          status: "completed",
          customerName: "Paul Bernard",
          customerPhone: "+33 6 01 23 45 67",
        },
        {
          id: "ORD-014",
          date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            { id: 6, name: "Ramen Tonkotsu", description: "Bouillon de porc", category: "plats", price: 16.90, image: "", allergens: ["Gluten"], vegetarian: false, spicy: false, available: true, quantity: 1 },
            { id: 12, name: "Gyoza Porc", description: "6 raviolis", category: "entrees", price: 8.90, image: "", allergens: ["Gluten"], vegetarian: false, spicy: false, available: true, quantity: 1 },
          ],
          total: 25.80,
          type: "pickup",
          status: "completed",
          customerName: "Alice Dubois",
          customerPhone: "+33 6 12 34 56 78",
        },
        {
          id: "ORD-015",
          date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            { id: 2, name: "Sashimi Mix", description: "15 sashimis", category: "sushis", price: 28.50, image: "", allergens: ["Poisson"], vegetarian: false, spicy: false, available: true, quantity: 1 },
            { id: 3, name: "Maki California", description: "8 makis", category: "makis", price: 12.90, image: "", allergens: ["Poisson"], vegetarian: false, spicy: false, available: true, quantity: 2 },
          ],
          total: 54.30,
          type: "dine-in",
          status: "completed",
          customerName: "Marc Lefevre",
          customerPhone: "+33 6 23 45 67 89",
        },
        {
          id: "ORD-016",
          date: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            { id: 8, name: "Teriyaki Saumon", description: "Filet de saumon", category: "plats", price: 19.90, image: "", allergens: ["Poisson"], vegetarian: false, spicy: false, available: true, quantity: 1 },
            { id: 11, name: "Soupe Miso", description: "Soupe traditionnelle", category: "entrees", price: 5.90, image: "", allergens: ["Soja"], vegetarian: true, spicy: false, available: true, quantity: 1 },
            { id: 13, name: "Mochi Glacé", description: "3 mochis", category: "desserts", price: 7.90, image: "", allergens: ["Gluten"], vegetarian: true, spicy: false, available: true, quantity: 1 },
          ],
          total: 33.70,
          type: "dine-in",
          status: "completed",
          customerName: "Julie Martin",
          customerPhone: "+33 6 34 56 78 90",
        },
        {
          id: "ORD-017",
          date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            { id: 19, name: "Menu Découverte", description: "Menu complet", category: "plats", price: 32.90, image: "", allergens: ["Poisson"], vegetarian: false, spicy: false, available: true, quantity: 2 },
          ],
          total: 65.80,
          type: "pickup",
          status: "completed",
          customerName: "Pierre Bernard",
          customerPhone: "+33 6 45 67 89 01",
        },
        {
          id: "ORD-018",
          date: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            { id: 1, name: "Assortiment Sushi Premium", description: "12 sushis", category: "sushis", price: 24.90, image: "", allergens: ["Poisson"], vegetarian: false, spicy: false, available: true, quantity: 1 },
            { id: 6, name: "Ramen Tonkotsu", description: "Bouillon", category: "plats", price: 16.90, image: "", allergens: ["Gluten"], vegetarian: false, spicy: false, available: true, quantity: 1 },
          ],
          total: 41.80,
          type: "dine-in",
          status: "completed",
          customerName: "Sophie Bernard",
          customerPhone: "+33 6 34 56 78 90",
        },
        {
          id: "ORD-019",
          date: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            { id: 2, name: "Sashimi Mix", description: "15 sashimis", category: "sushis", price: 28.50, image: "", allergens: ["Poisson"], vegetarian: false, spicy: false, available: true, quantity: 1 },
            { id: 12, name: "Gyoza Porc", description: "6 raviolis", category: "entrees", price: 8.90, image: "", allergens: ["Gluten"], vegetarian: false, spicy: false, available: true, quantity: 1 },
            { id: 13, name: "Mochi Glacé", description: "3 mochis", category: "desserts", price: 7.90, image: "", allergens: ["Gluten"], vegetarian: true, spicy: false, available: true, quantity: 1 },
          ],
          total: 45.30,
          type: "pickup",
          status: "completed",
          customerName: "Thomas Leroy",
          customerPhone: "+33 6 45 67 89 01",
        },
        {
          id: "ORD-020",
          date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            { id: 3, name: "Maki California", description: "8 makis", category: "makis", price: 12.90, image: "", allergens: ["Poisson"], vegetarian: false, spicy: false, available: true, quantity: 3 },
            { id: 11, name: "Soupe Miso", description: "Soupe", category: "entrees", price: 5.90, image: "", allergens: ["Soja"], vegetarian: true, spicy: false, available: true, quantity: 2 },
          ],
          total: 50.50,
          type: "dine-in",
          status: "completed",
          customerName: "Emma Martin",
          customerPhone: "+33 6 56 78 90 12",
        },
        {
          id: "ORD-021",
          date: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            { id: 8, name: "Teriyaki Saumon", description: "Saumon grillé", category: "plats", price: 19.90, image: "", allergens: ["Poisson"], vegetarian: false, spicy: false, available: true, quantity: 2 },
          ],
          total: 39.80,
          type: "pickup",
          status: "completed",
          customerName: "Lucas Dubois",
          customerPhone: "+33 6 67 89 01 23",
        },
        {
          id: "ORD-022",
          date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            { id: 19, name: "Menu Découverte", description: "Menu", category: "plats", price: 32.90, image: "", allergens: ["Poisson"], vegetarian: false, spicy: false, available: true, quantity: 1 },
            { id: 1, name: "Assortiment Sushi Premium", description: "12 sushis", category: "sushis", price: 24.90, image: "", allergens: ["Poisson"], vegetarian: false, spicy: false, available: true, quantity: 1 },
          ],
          total: 57.80,
          type: "dine-in",
          status: "completed",
          customerName: "Clara Petit",
          customerPhone: "+33 6 78 90 12 34",
        },
        {
          id: "ORD-023",
          date: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            { id: 6, name: "Ramen Tonkotsu", description: "Ramen", category: "plats", price: 16.90, image: "", allergens: ["Gluten"], vegetarian: false, spicy: false, available: true, quantity: 1 },
            { id: 12, name: "Gyoza Porc", description: "Raviolis", category: "entrees", price: 8.90, image: "", allergens: ["Gluten"], vegetarian: false, spicy: false, available: true, quantity: 1 },
          ],
          total: 25.80,
          type: "pickup",
          status: "completed",
          customerName: "Hugo Garcia",
          customerPhone: "+33 6 89 01 23 45",
        },
        {
          id: "ORD-024",
          date: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            { id: 2, name: "Sashimi Mix", description: "Sashimis", category: "sushis", price: 28.50, image: "", allergens: ["Poisson"], vegetarian: false, spicy: false, available: true, quantity: 2 },
            { id: 13, name: "Mochi Glacé", description: "Mochis", category: "desserts", price: 7.90, image: "", allergens: ["Gluten"], vegetarian: true, spicy: false, available: true, quantity: 1 },
          ],
          total: 64.90,
          type: "dine-in",
          status: "completed",
          customerName: "Manon Lefevre",
          customerPhone: "+33 6 90 12 34 56",
        },
        {
          id: "ORD-025",
          date: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000).toISOString(),
          items: [
            { id: 3, name: "Maki California", description: "Makis", category: "makis", price: 12.90, image: "", allergens: ["Poisson"], vegetarian: false, spicy: false, available: true, quantity: 2 },
            { id: 11, name: "Soupe Miso", description: "Soupe", category: "entrees", price: 5.90, image: "", allergens: ["Soja"], vegetarian: true, spicy: false, available: true, quantity: 1 },
          ],
          total: 31.70,
          type: "pickup",
          status: "completed",
          customerName: "Paul Bernard",
          customerPhone: "+33 6 01 23 45 67",
        },
        // Commandes en cours
        {
          id: "ORD-026",
          date: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          items: [
            { id: 1, name: "Assortiment Sushi Premium", description: "12 sushis", category: "sushis", price: 24.90, image: "", allergens: ["Poisson"], vegetarian: false, spicy: false, available: true, quantity: 1 },
          ],
          total: 24.90,
          type: "pickup",
          pickupTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
          status: "preparing",
          customerName: "Alice Martin",
          customerPhone: "+33 6 11 22 33 44",
        },
        {
          id: "ORD-027",
          date: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
          items: [
            { id: 6, name: "Ramen Tonkotsu", description: "Ramen", category: "plats", price: 16.90, image: "", allergens: ["Gluten"], vegetarian: false, spicy: false, available: true, quantity: 2 },
          ],
          total: 33.80,
          type: "dine-in",
          status: "ready",
          customerName: "Bob Dupont",
          customerPhone: "+33 6 22 33 44 55",
        },
        {
          id: "ORD-028",
          date: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          items: [
            { id: 2, name: "Sashimi Mix", description: "Sashimis", category: "sushis", price: 28.50, image: "", allergens: ["Poisson"], vegetarian: false, spicy: false, available: true, quantity: 1 },
            { id: 3, name: "Maki California", description: "Makis", category: "makis", price: 12.90, image: "", allergens: ["Poisson"], vegetarian: false, spicy: false, available: true, quantity: 1 },
          ],
          total: 41.40,
          type: "dine-in",
          status: "pending",
          customerName: "Celine Moreau",
          customerPhone: "+33 6 33 44 55 66",
        },
      ];
      setOrders(demoOrders);
      localStorage.setItem("restaurant_orders", JSON.stringify(demoOrders));
      
      // Calculer et initialiser les points de fidélité pour Marie Dubois
      const marieOrders = demoOrders.filter((o: Order) => o.customerName === "Marie Dubois");
      const mariePoints = marieOrders.reduce((sum: number, o: Order) => sum + Math.floor(o.total), 0);
      const savedPoints = localStorage.getItem("restaurant_loyalty_points");
      if (!savedPoints) {
        localStorage.setItem("restaurant_loyalty_points", mariePoints.toString());
      }
    }

    const savedPromoCode = localStorage.getItem("restaurant_promo_code");
    if (savedPromoCode) {
      setPromoCode(savedPromoCode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("restaurant_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("restaurant_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("restaurant_reservations", JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem("restaurant_orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (dish: Dish) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === dish.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...dish, quantity: 1 }];
    });
  };

  const removeFromCart = (dishId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== dishId));
  };

  const updateQuantity = (dishId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(dishId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === dishId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartItemsCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getCartTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    // Appliquer les promotions
    let discount = 0;
    const now = new Date();
    const currentHour = now.getHours();
    
    // Happy Hour : 15% de réduction sur les sushis entre 14h et 17h
    if (currentHour >= 14 && currentHour < 17) {
      const sushiItems = cart.filter(item => item.category === "sushis" || item.category === "makis");
      const sushiTotal = sushiItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      discount += sushiTotal * 0.15;
    }
    
    // Réduction fidélité
    if (user && !user.isAdmin) {
      const loyaltyDiscount = getLoyaltyDiscount();
      discount += subtotal * (loyaltyDiscount / 100);
    }
    
    return Math.max(0, subtotal - discount);
  };

  const getCartSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getCartDiscount = () => {
    const subtotal = getCartSubtotal();
    let discount = 0;
    const now = new Date();
    const currentHour = now.getHours();
    
    // Happy Hour
    if (currentHour >= 14 && currentHour < 17) {
      const sushiItems = cart.filter(item => item.category === "sushis" || item.category === "makis");
      const sushiTotal = sushiItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      discount += sushiTotal * 0.15;
    }
    
    // Réduction fidélité
    if (user && !user.isAdmin) {
      const loyaltyDiscount = getLoyaltyDiscount();
      discount += subtotal * (loyaltyDiscount / 100);
    }
    
    // Code promo
    if (promoCode && promoCodes[promoCode]) {
      discount += subtotal * (promoCodes[promoCode].discount / 100);
    }
    
    return discount;
  };

  const applyPromoCode = (code: string): boolean => {
    const upperCode = code.toUpperCase();
    if (promoCodes[upperCode]) {
      setPromoCode(upperCode);
      localStorage.setItem("restaurant_promo_code", upperCode);
      return true;
    }
    return false;
  };

  const removePromoCode = () => {
    setPromoCode(undefined);
    localStorage.removeItem("restaurant_promo_code");
  };

  const toggleFavorite = (dishId: number) => {
    setFavorites((prev) => {
      if (prev.includes(dishId)) {
        return prev.filter((id) => id !== dishId);
      }
      return [...prev, dishId];
    });
  };

  const isFavorite = (dishId: number) => {
    return favorites.includes(dishId);
  };

  const login = (email: string, password: string): boolean => {
    if (email === "admin@sakura-troyes.fr" && password === "admin123") {
      const adminUser: User = {
        email,
        name: "Admin SAKURA",
        isAdmin: true,
      };
      setUser(adminUser);
      setIsAdmin(true);
      localStorage.setItem("restaurant_user", JSON.stringify(adminUser));
      return true;
    }

    if (email === "client@sakura-troyes.fr" && password === "client123") {
      // Calculer les points à partir des commandes existantes de Marie Dubois
      const savedOrders = localStorage.getItem("restaurant_orders");
      let totalPoints = 0;
      
      if (savedOrders) {
        const orders = JSON.parse(savedOrders);
        const marieOrders = orders.filter((o: Order) => o.customerName === "Marie Dubois");
        totalPoints = marieOrders.reduce((sum: number, o: Order) => sum + Math.floor(o.total), 0);
      }
      
      // Si pas de points calculés, utiliser les points des commandes de démo
      if (totalPoints === 0) {
        // Calculer à partir des commandes de démo pour Marie Dubois
        // ORD-003: 62.70€ = 62 points, ORD-004: 22.80€ = 22 points, ORD-005: 32.90€ = 32 points
        // ORD-006: 36.40€ = 36 points, ORD-007: 28.80€ = 28 points
        totalPoints = 62 + 22 + 32 + 36 + 28; // Total: 180 points
      }
      
      const savedPoints = localStorage.getItem("restaurant_loyalty_points");
      const points = savedPoints ? parseInt(savedPoints, 10) : totalPoints;
      
      let level: "bronze" | "silver" | "gold" | "platinum" = "bronze";
      if (points >= 1000) level = "platinum";
      else if (points >= 500) level = "gold";
      else if (points >= 200) level = "silver";
      
      const clientUser: User = {
        email,
        name: "Marie Dubois",
        phone: "+33 6 12 34 56 78",
        isAdmin: false,
        loyaltyPoints: points,
        loyaltyLevel: level,
      };
      setUser(clientUser);
      setIsAdmin(false);
      setLoyaltyPoints(points);
      setLoyaltyLevel(level);
      localStorage.setItem("restaurant_user", JSON.stringify(clientUser));
      localStorage.setItem("restaurant_loyalty_points", points.toString());
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("restaurant_user");
  };

  const addReservation = (reservation: Omit<Reservation, "id" | "status">) => {
    const newReservation: Reservation = {
      ...reservation,
      id: `RES-${Date.now()}`,
      status: "pending",
    };
    setReservations((prev) => [...prev, newReservation]);
  };

  const getReservations = () => {
    return reservations;
  };

  const addOrder = (order: Omit<Order, "id" | "date" | "status">) => {
    const newOrder: Order = {
      ...order,
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      status: "pending",
    };
    setOrders((prev) => [...prev, newOrder]);
    // Ajouter des points de fidélité (1 point par euro dépensé sur le total final) seulement si connecté
    if (user && !user.isAdmin) {
      const pointsToAdd = Math.floor(order.total);
      addLoyaltyPoints(pointsToAdd);
    }
    return newOrder;
  };

  const getOrders = () => {
    return orders;
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  };

  const updateReservationStatus = (reservationId: string, status: Reservation["status"]) => {
    setReservations((prev) =>
      prev.map((res) => (res.id === reservationId ? { ...res, status } : res))
    );
  };

  const updateLoyaltyLevel = (points: number) => {
    if (points >= 1000) {
      setLoyaltyLevel("platinum");
    } else if (points >= 500) {
      setLoyaltyLevel("gold");
    } else if (points >= 200) {
      setLoyaltyLevel("silver");
    } else {
      setLoyaltyLevel("bronze");
    }
  };

  const addLoyaltyPoints = (points: number) => {
    setLoyaltyPoints((prev) => {
      const newPoints = prev + points;
      let newLevel: "bronze" | "silver" | "gold" | "platinum" = "bronze";
      if (newPoints >= 1000) newLevel = "platinum";
      else if (newPoints >= 500) newLevel = "gold";
      else if (newPoints >= 200) newLevel = "silver";
      
      setLoyaltyLevel(newLevel);
      localStorage.setItem("restaurant_loyalty_points", newPoints.toString());
      if (user) {
        const updatedUser = { ...user, loyaltyPoints: newPoints, loyaltyLevel: newLevel };
        setUser(updatedUser);
        localStorage.setItem("restaurant_user", JSON.stringify(updatedUser));
      }
      return newPoints;
    });
  };

  const getLoyaltyDiscount = (): number => {
    switch (loyaltyLevel) {
      case "platinum":
        return 20;
      case "gold":
        return 15;
      case "silver":
        return 10;
      case "bronze":
        return 5;
      default:
        return 0;
    }
  };

  useEffect(() => {
    localStorage.setItem("restaurant_loyalty_points", loyaltyPoints.toString());
  }, [loyaltyPoints]);

  return (
    <RestaurantContext.Provider
      value={{
        cart,
        favorites,
        user,
        isAdmin,
        reservations,
        orders,
        loyaltyPoints,
        loyaltyLevel,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartItemsCount,
        getCartTotal,
        getCartSubtotal,
        getCartDiscount,
        toggleFavorite,
        isFavorite,
        login,
        logout,
        addReservation,
        getReservations,
        addOrder,
        getOrders,
        updateOrderStatus,
        updateReservationStatus,
        addLoyaltyPoints,
        getLoyaltyDiscount,
        promoCode,
        applyPromoCode,
        removePromoCode,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error("useRestaurant must be used within a RestaurantProvider");
  }
  return context;
}

