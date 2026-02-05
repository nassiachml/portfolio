"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useStore } from "../../context/StoreContext";
import { useRouter } from "next/navigation";
import { Package, Plus, Minus, Edit, Trash2, Search } from "lucide-react";
import Image from "next/image";

interface StockItem {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  stock: number;
  sizes: { [key: string]: number };
  colors: { [key: string]: number };
}

export default function StockPage() {
  const { user, isAdmin } = useStore();
  const router = useRouter();
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newProduct, setNewProduct] = useState(false);

  useEffect(() => {
    if (!user || !isAdmin) {
      router.push("/ecommerce/login");
      return;
    }
    loadStock();
  }, [user, isAdmin, router]);

  const loadStock = () => {
    fetch("/fashion-data.json")
      .then((res) => res.json())
      .then((data) => {
        const stock: StockItem[] = data.products.map((product: any) => ({
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          image: product.images[0],
          stock: Math.floor(Math.random() * 50) + 10, // Stock fictif aléatoire
          sizes: product.sizes.reduce((acc: any, size: string) => {
            acc[size] = Math.floor(Math.random() * 10) + 1;
            return acc;
          }, {}),
          colors: product.colors.reduce((acc: any, color: string) => {
            acc[color] = Math.floor(Math.random() * 10) + 1;
            return acc;
          }, {}),
        }));
        setStockItems(stock);
      });
  };

  const updateStock = (id: number, newStock: number) => {
    setStockItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, stock: Math.max(0, newStock) } : item
      )
    );
  };

  const updateSizeStock = (id: number, size: string, quantity: number) => {
    setStockItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const newSizes = { ...item.sizes };
          newSizes[size] = Math.max(0, quantity);
          return { ...item, sizes: newSizes };
        }
        return item;
      })
    );
  };

  const updateColorStock = (id: number, color: string, quantity: number) => {
    setStockItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const newColors = { ...item.colors };
          newColors[color] = Math.max(0, quantity);
          return { ...item, colors: newColors };
        }
        return item;
      })
    );
  };

  const addNewProduct = () => {
    const newId = Math.max(...stockItems.map((i) => i.id)) + 1;
    const newItem: StockItem = {
      id: newId,
      name: "Nouveau Produit",
      category: "hoodies",
      price: 0,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop",
      stock: 0,
      sizes: { XS: 0, S: 0, M: 0, L: 0, XL: 0 },
      colors: { Noir: 0 },
    };
    setStockItems([...stockItems, newItem]);
    setNewProduct(false);
    setEditingId(newId);
  };

  const deleteProduct = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      setStockItems((items) => items.filter((item) => item.id !== id));
    }
  };

  const filteredItems = stockItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-5xl md:text-7xl font-black text-black mb-4 md:mb-0 tracking-tighter">
            GESTION DU STOCK
          </h1>
          <button
            onClick={() => setNewProduct(true)}
            className="px-6 py-3 bg-black text-white font-bold uppercase tracking-wider hover:bg-gray-900 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Ajouter un produit
          </button>
        </div>

        {/* Search */}
        <div className="mb-8 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un produit..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors text-black"
          />
        </div>

        {/* Stock Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-black text-white p-6 border border-gray-800">
            <Package className="w-8 h-8 mb-4" />
            <p className="text-gray-300 text-sm uppercase tracking-wider mb-1">
              Total produits
            </p>
            <p className="text-3xl font-black text-white">{stockItems.length}</p>
          </div>
          <div className="bg-pink-500 text-white p-6 border border-pink-600">
            <Package className="w-8 h-8 mb-4" />
            <p className="text-pink-50 text-sm uppercase tracking-wider mb-1">
              Stock total
            </p>
            <p className="text-3xl font-black text-white">
              {stockItems.reduce((sum, item) => sum + item.stock, 0)}
            </p>
          </div>
          <div className="bg-yellow-500 text-white p-6 border border-yellow-600">
            <Package className="w-8 h-8 mb-4" />
            <p className="text-yellow-50 text-sm uppercase tracking-wider mb-1">
              Produits en rupture
            </p>
            <p className="text-3xl font-black text-white">
              {stockItems.filter((item) => item.stock === 0).length}
            </p>
          </div>
        </div>

        {/* Stock Items */}
        <div className="space-y-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border border-gray-200 p-6 hover:border-gray-400 transition-colors"
            >
              <div className="grid md:grid-cols-12 gap-6">
                {/* Product Image */}
                <div className="md:col-span-2">
                  <div className="relative aspect-[3/4] bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 200px"
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div className="md:col-span-10">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-black text-black mb-1 uppercase tracking-tight">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 uppercase">
                        {item.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setEditingId(editingId === item.id ? null : item.id)
                        }
                        className="px-4 py-2 border border-gray-300 hover:border-black transition-colors flex items-center gap-2 text-black"
                      >
                        <Edit className="w-4 h-4" />
                        Modifier
                      </button>
                      <button
                        onClick={() => deleteProduct(item.id)}
                        className="px-4 py-2 border border-red-300 hover:border-red-500 transition-colors flex items-center gap-2 text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                        Supprimer
                      </button>
                    </div>
                  </div>

                  {/* Stock Total */}
                  <div className="mb-4">
                    <label className="block text-sm font-bold uppercase tracking-wider text-black mb-2">
                      Stock total
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => updateStock(item.id, item.stock - 1)}
                        className="w-10 h-10 border border-gray-300 bg-black text-white flex items-center justify-center hover:bg-gray-900 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-2xl font-bold text-black w-20 text-center">
                        {item.stock}
                      </span>
                      <button
                        onClick={() => updateStock(item.id, item.stock + 1)}
                        className="w-10 h-10 border border-gray-300 bg-black text-white flex items-center justify-center hover:bg-gray-900 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Sizes Stock */}
                  {editingId === item.id && (
                    <div className="mb-4">
                      <label className="block text-sm font-bold uppercase tracking-wider text-black mb-2">
                        Stock par taille
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {Object.entries(item.sizes).map(([size, qty]) => (
                          <div key={size} className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700 w-8">
                              {size}:
                            </span>
                            <button
                              onClick={() =>
                                updateSizeStock(item.id, size, qty - 1)
                              }
                              className="w-8 h-8 border border-gray-300 bg-black text-white flex items-center justify-center hover:bg-gray-900 transition-colors text-xs"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-bold text-black w-8 text-center">
                              {qty}
                            </span>
                            <button
                              onClick={() =>
                                updateSizeStock(item.id, size, qty + 1)
                              }
                              className="w-8 h-8 border border-gray-300 bg-black text-white flex items-center justify-center hover:bg-gray-900 transition-colors text-xs"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Colors Stock */}
                  {editingId === item.id && (
                    <div>
                      <label className="block text-sm font-bold uppercase tracking-wider text-black mb-2">
                        Stock par couleur
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {Object.entries(item.colors).map(([color, qty]) => (
                          <div key={color} className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700 w-16">
                              {color}:
                            </span>
                            <button
                              onClick={() =>
                                updateColorStock(item.id, color, qty - 1)
                              }
                              className="w-8 h-8 border border-gray-300 bg-black text-white flex items-center justify-center hover:bg-gray-900 transition-colors text-xs"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-bold text-black w-8 text-center">
                              {qty}
                            </span>
                            <button
                              onClick={() =>
                                updateColorStock(item.id, color, qty + 1)
                              }
                              className="w-8 h-8 border border-gray-300 bg-black text-white flex items-center justify-center hover:bg-gray-900 transition-colors text-xs"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucun produit trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
}

