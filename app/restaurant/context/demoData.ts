// Données de démo pour le restaurant SAKURA

export const generateDemoOrders = () => {
  const now = Date.now();
  const orders = [];
  
  // Clients fictifs
  const customers = [
    { name: "Sophie Bernard", phone: "+33 6 34 56 78 90" },
    { name: "Thomas Leroy", phone: "+33 6 45 67 89 01" },
    { name: "Camille Martin", phone: "+33 6 56 78 90 12" },
    { name: "Lucas Dubois", phone: "+33 6 67 89 01 23" },
    { name: "Emma Rousseau", phone: "+33 6 78 90 12 34" },
    { name: "Hugo Moreau", phone: "+33 6 89 01 23 45" },
    { name: "Léa Petit", phone: "+33 6 90 12 34 56" },
    { name: "Nathan Girard", phone: "+33 6 01 23 45 67" },
    { name: "Chloé Bernard", phone: "+33 6 12 34 56 78" },
    { name: "Maxime Lefevre", phone: "+33 6 23 45 67 89" },
  ];

  const statuses: ("pending" | "preparing" | "ready" | "completed" | "cancelled")[] = ["pending", "preparing", "ready", "completed", "completed", "completed"];
  const types: ("pickup" | "dine-in")[] = ["pickup", "dine-in"];

  // Plats disponibles
  const dishes = [
    { id: 1, name: "Assortiment Sushi Premium", price: 24.90, category: "sushis" },
    { id: 2, name: "Sashimi Mix", price: 28.50, category: "sushis" },
    { id: 3, name: "Maki California", price: 12.90, category: "makis" },
    { id: 6, name: "Ramen Tonkotsu", price: 16.90, category: "plats" },
    { id: 8, name: "Teriyaki Saumon", price: 19.90, category: "plats" },
    { id: 11, name: "Soupe Miso", price: 5.90, category: "entrees" },
    { id: 12, name: "Gyoza Porc", price: 8.90, category: "entrees" },
    { id: 13, name: "Mochi Glacé", price: 7.90, category: "desserts" },
    { id: 19, name: "Menu Découverte", price: 32.90, category: "plats" },
  ];

  // Générer 30 commandes
  for (let i = 0; i < 30; i++) {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const daysAgo = Math.floor(Math.random() * 30);
    const hoursAgo = Math.floor(Math.random() * 24);
    
    // Générer 1-4 items par commande
    const numItems = Math.floor(Math.random() * 4) + 1;
    const items = [];
    let total = 0;
    
    for (let j = 0; j < numItems; j++) {
      const dish = dishes[Math.floor(Math.random() * dishes.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      items.push({
        id: dish.id,
        name: dish.name,
        description: "",
        category: dish.category,
        price: dish.price,
        image: "",
        allergens: [],
        vegetarian: false,
        spicy: false,
        available: true,
        quantity,
      });
      total += dish.price * quantity;
    }

    orders.push({
      id: `ORD-${String(i + 1).padStart(3, "0")}`,
      date: new Date(now - daysAgo * 24 * 60 * 60 * 1000 - hoursAgo * 60 * 60 * 1000).toISOString(),
      items,
      total: Math.round(total * 100) / 100,
      type,
      status,
      customerName: customer.name,
      customerPhone: customer.phone,
      ...(type === "pickup" && { pickupTime: new Date(now + 30 * 60 * 1000).toISOString() }),
    });
  }

  return orders;
};

export const generateDemoReservations = () => {
  const now = Date.now();
  const reservations = [];
  
  const customers = [
    { name: "Marie Dubois", email: "marie.dubois@email.com", phone: "+33 6 12 34 56 78" },
    { name: "Sophie Bernard", email: "sophie.bernard@email.com", phone: "+33 6 34 56 78 90" },
    { name: "Thomas Leroy", email: "thomas.leroy@email.com", phone: "+33 6 45 67 89 01" },
    { name: "Camille Martin", email: "camille.martin@email.com", phone: "+33 6 56 78 90 12" },
    { name: "Lucas Dubois", email: "lucas.dubois@email.com", phone: "+33 6 67 89 01 23" },
    { name: "Emma Rousseau", email: "emma.rousseau@email.com", phone: "+33 6 78 90 12 34" },
    { name: "Hugo Moreau", email: "hugo.moreau@email.com", phone: "+33 6 89 01 23 45" },
    { name: "Léa Petit", email: "lea.petit@email.com", phone: "+33 6 90 12 34 56" },
  ];

  const times = ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];
  const statuses: ("pending" | "confirmed" | "cancelled")[] = ["pending", "confirmed", "confirmed", "confirmed"];
  const specialRequests = [
    "Table près de la fenêtre",
    "Anniversaire",
    "Allergie aux arachides",
    "Table calme",
    "Enfants",
    null,
    null,
    null,
  ];

  // Générer 20 réservations (passées et futures)
  for (let i = 0; i < 20; i++) {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const time = times[Math.floor(Math.random() * times.length)];
    const daysOffset = Math.floor(Math.random() * 14) - 7; // -7 à +7 jours
    const guests = Math.floor(Math.random() * 6) + 2; // 2 à 7 personnes
    const request = specialRequests[Math.floor(Math.random() * specialRequests.length)];

    reservations.push({
      id: `RES-${String(i + 1).padStart(3, "0")}`,
      date: new Date(now + daysOffset * 24 * 60 * 60 * 1000).toISOString(),
      time,
      guests,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      status,
      ...(request && { specialRequests: request }),
    });
  }

  // Ajouter des réservations spécifiques pour Marie Dubois
  const marieReservations = [
    {
      id: "RES-MARIE-001",
      date: new Date(now + 3 * 24 * 60 * 60 * 1000).toISOString(),
      time: "20:00",
      guests: 2,
      name: "Marie Dubois",
      email: "marie.dubois@email.com",
      phone: "+33 6 12 34 56 78",
      status: "confirmed" as const,
      specialRequests: "Table romantique",
    },
    {
      id: "RES-MARIE-002",
      date: new Date(now + 7 * 24 * 60 * 60 * 1000).toISOString(),
      time: "19:30",
      guests: 4,
      name: "Marie Dubois",
      email: "marie.dubois@email.com",
      phone: "+33 6 12 34 56 78",
      status: "confirmed" as const,
      specialRequests: "Anniversaire",
    },
    {
      id: "RES-MARIE-003",
      date: new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString(),
      time: "20:30",
      guests: 2,
      name: "Marie Dubois",
      email: "marie.dubois@email.com",
      phone: "+33 6 12 34 56 78",
      status: "confirmed" as const,
    },
    {
      id: "RES-MARIE-004",
      date: new Date(now + 10 * 24 * 60 * 60 * 1000).toISOString(),
      time: "21:00",
      guests: 3,
      name: "Marie Dubois",
      email: "marie.dubois@email.com",
      phone: "+33 6 12 34 56 78",
      status: "pending" as const,
    },
  ];

  return [...reservations, ...marieReservations];
};

