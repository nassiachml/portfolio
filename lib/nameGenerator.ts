export type BrandStyle = "tech" | "luxe" | "streetwear" | "minimal" | "nature";

interface NameGenerationRules {
  prefixes: string[];
  suffixes: string[];
  transformations: (keyword: string) => string[];
}

// Fonction pour créer des variations créatives
const createVariations = (keyword: string): string[] => {
  const variations: string[] = [];
  const first = keyword.charAt(0).toUpperCase();
  const rest = keyword.slice(1);
  
  // Variations de base
  variations.push(first + rest);
  variations.push(keyword.toUpperCase());
  variations.push(first + rest.toUpperCase());
  
  // Variations phonétiques
  if (keyword.length > 2) {
    variations.push(first + rest.slice(0, 2).toUpperCase() + rest.slice(2));
    variations.push(keyword.slice(0, 3).toUpperCase() + rest.slice(3));
  }
  
  // Mélanges créatifs
  if (keyword.length >= 4) {
    variations.push(first + rest.slice(0, 1) + rest.slice(2));
    variations.push(keyword.slice(0, 2).toUpperCase() + keyword.slice(2));
  }
  
  return variations;
};

// Fonction pour créer des combinaisons originales
const combineWords = (keyword: string, word: string): string => {
  return keyword.charAt(0).toUpperCase() + keyword.slice(1) + word.charAt(0).toUpperCase() + word.slice(1);
};

const STYLE_RULES: Record<BrandStyle, NameGenerationRules> = {
  tech: {
    prefixes: ["neo", "cyber", "digital", "smart", "next", "quantum", "flux", "pulse", "vortex", "nexus"],
    suffixes: ["io", "labs", "tech", "app", "hub", "soft", "ware", "sys", "ly", "fy", "ify", "ex", "ix"],
    transformations: (keyword) => {
      const variations = createVariations(keyword);
      return [
        ...variations,
        keyword.charAt(0).toUpperCase() + keyword.slice(1) + "ly",
        keyword.charAt(0).toUpperCase() + keyword.slice(1) + "ify",
        keyword.toUpperCase().slice(0, 3) + "IO",
        keyword.charAt(0).toUpperCase() + keyword.slice(1, 3) + "Tech",
        combineWords(keyword, "flow"),
        combineWords(keyword, "sync"),
      ];
    },
  },
  luxe: {
    prefixes: ["élite", "premium", "royal", "noble", "exclusive", "haute", "couture", "maison", "atelier", "prestige"],
    suffixes: ["é", "lux", "gold", "atelier", "maison", "couture", "prestige", "élite", "royal", "noble"],
    transformations: (keyword) => {
      const variations = createVariations(keyword);
      return [
        ...variations,
        keyword.charAt(0).toUpperCase() + keyword.slice(1) + "é",
        "Maison " + keyword.charAt(0).toUpperCase() + keyword.slice(1),
        keyword.charAt(0).toUpperCase() + keyword.slice(1) + "Lux",
        keyword.toUpperCase() + "ÉLITE",
        combineWords(keyword, "premium"),
        combineWords(keyword, "gold"),
      ];
    },
  },
  streetwear: {
    prefixes: ["street", "urban", "city", "metro", "block", "grid", "zone", "core", "raw", "edge"],
    suffixes: ["wear", "style", "gear", "co", "brand", "club", "crew", "squad", "gang", "mob"],
    transformations: (keyword) => {
      const variations = createVariations(keyword);
      return [
        ...variations,
        keyword.toUpperCase().slice(0, 4),
        keyword.toUpperCase().slice(0, 5),
        keyword.charAt(0).toUpperCase() + keyword.slice(1, 3).toUpperCase() + keyword.slice(3),
        keyword.toUpperCase() + "CO",
        combineWords(keyword, "wear"),
        combineWords(keyword, "gear"),
      ];
    },
  },
  minimal: {
    prefixes: ["zen", "pure", "simple", "clear", "void", "null", "base", "core", "essence", "prime"],
    suffixes: ["co", "studio", "works", "space", "lab", "hub", "base", "core", "pure", "zen"],
    transformations: (keyword) => {
      const variations = createVariations(keyword);
      return [
        ...variations,
        keyword.charAt(0).toUpperCase() + keyword.slice(1, 3).toUpperCase(),
        keyword.toUpperCase().slice(0, 4),
        keyword.toUpperCase().slice(0, 3),
        keyword.charAt(0).toUpperCase() + keyword.slice(1, 2) + keyword.slice(2).toUpperCase(),
        combineWords(keyword, "co"),
        combineWords(keyword, "zen"),
      ];
    },
  },
  nature: {
    prefixes: ["eco", "green", "pure", "natural", "organic", "earth", "flora", "terra", "bio", "vita"],
    suffixes: ["eco", "green", "pure", "life", "earth", "flow", "ia", "bio", "vita", "flora", "terra"],
    transformations: (keyword) => {
      const variations = createVariations(keyword);
      return [
        ...variations,
        keyword.charAt(0).toUpperCase() + keyword.slice(1) + "ia",
        keyword.charAt(0).toUpperCase() + keyword.slice(1) + "Flow",
        keyword.toUpperCase() + "ECO",
        keyword.charAt(0).toUpperCase() + keyword.slice(1) + "Bio",
        combineWords(keyword, "earth"),
        combineWords(keyword, "life"),
      ];
    },
  },
};

export function generateBrandNames(
  keyword: string,
  style: BrandStyle
): string[] {
  if (!keyword || keyword.trim().length === 0) {
    return [];
  }

  const cleanKeyword = keyword.trim().toLowerCase();
  const rules = STYLE_RULES[style];
  const names: Set<string> = new Set();

  // Génération avec préfixes (plus créative)
  rules.prefixes.forEach((prefix) => {
    // Combinaison directe
    const name1 = prefix.charAt(0).toUpperCase() + prefix.slice(1) + cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1);
    names.add(name1);
    
    // Avec séparation visuelle
    if (cleanKeyword.length > 3) {
      const name2 = prefix.charAt(0).toUpperCase() + prefix.slice(1) + cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1, 3) + cleanKeyword.slice(3);
      names.add(name2);
    }
    
    // Version courte
    if (prefix.length > 3 && cleanKeyword.length > 2) {
      const name3 = prefix.slice(0, 3).toUpperCase() + cleanKeyword.slice(0, 3).toUpperCase();
      names.add(name3);
    }
  });

  // Génération avec suffixes (plus variée)
  rules.suffixes.forEach((suffix) => {
    // Combinaison classique
    const name1 = cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1) + suffix.charAt(0).toUpperCase() + suffix.slice(1);
    names.add(name1);
    
    // Version courte
    if (cleanKeyword.length > 2) {
      const name2 = cleanKeyword.slice(0, 3).toUpperCase() + suffix.charAt(0).toUpperCase() + suffix.slice(1);
      names.add(name2);
    }
    
    // Avec transformation
    const name3 = cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1, -1) + suffix;
    names.add(name3);
  });

  // Transformations créatives
  rules.transformations(cleanKeyword).forEach((transformed) => {
    names.add(transformed);
  });

  // Variations originales selon le style
  if (style === "tech") {
    // Mélanges tech
    names.add(cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1, 2) + "X" + cleanKeyword.slice(2));
    names.add(cleanKeyword.slice(0, 2).toUpperCase() + "Tech");
    names.add("N" + cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1));
  }

  if (style === "luxe") {
    // Variations luxe
    names.add(cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1) + "Paris");
    names.add("Le " + cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1));
    names.add(cleanKeyword.toUpperCase() + " & Co");
  }

  if (style === "streetwear") {
    // Variations street
    names.add(cleanKeyword.toUpperCase().slice(0, 3) + "NYC");
    names.add(cleanKeyword.toUpperCase().slice(0, 2) + "X" + cleanKeyword.slice(2).toUpperCase());
    names.add(cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1, 2) + cleanKeyword.slice(2).toUpperCase());
  }

  if (style === "minimal") {
    // Variations minimal
    names.add(cleanKeyword.toUpperCase().slice(0, 3));
    names.add(cleanKeyword.toUpperCase().slice(0, 2) + cleanKeyword.slice(-1).toUpperCase());
    names.add(cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1, 2) + cleanKeyword.slice(-2).toUpperCase());
  }

  if (style === "nature") {
    // Variations nature
    names.add(cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1) + "Earth");
    names.add(cleanKeyword.toUpperCase() + "Nature");
    names.add(cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1) + "Pure");
  }

  // Variations phonétiques créatives
  const vowels = ["a", "e", "i", "o", "u"];
  const lastChar = cleanKeyword.slice(-1);
  
  if (vowels.includes(lastChar) && cleanKeyword.length > 2) {
    // Si se termine par une voyelle, ajouter des variations
    names.add(cleanKeyword.slice(0, -1).charAt(0).toUpperCase() + cleanKeyword.slice(1, -1) + "y");
    names.add(cleanKeyword.slice(0, -1).charAt(0).toUpperCase() + cleanKeyword.slice(1, -1) + "ie");
    names.add(cleanKeyword.slice(0, -1).charAt(0).toUpperCase() + cleanKeyword.slice(1, -1) + "a");
  }

  // Mélanges de lettres créatifs
  if (cleanKeyword.length >= 4) {
    const first = cleanKeyword.charAt(0).toUpperCase();
    const middle = cleanKeyword.slice(1, Math.floor(cleanKeyword.length / 2));
    const end = cleanKeyword.slice(Math.floor(cleanKeyword.length / 2));
    names.add(first + middle.toUpperCase() + end);
    names.add(first + middle + end.toUpperCase());
    
    // Variations avec insertion de lettres
    if (style === "tech") {
      names.add(first + middle + "X" + end);
      names.add(first + "X" + middle + end);
    }
    if (style === "streetwear") {
      names.add(first + middle.toUpperCase() + "Z" + end);
    }
  }

  // Variations avec doublement de lettres
  if (cleanKeyword.length >= 3) {
    const first = cleanKeyword.charAt(0).toUpperCase();
    const second = cleanKeyword.charAt(1);
    const rest = cleanKeyword.slice(2);
    names.add(first + second + second + rest);
  }

  // Variations avec remplacement de lettres
  if (cleanKeyword.length >= 3) {
    const first = cleanKeyword.charAt(0).toUpperCase();
    const rest = cleanKeyword.slice(1);
    // Remplacement 'i' par 'y', 'e' par 'a', etc.
    const replaced = rest.replace(/i/g, 'y').replace(/e/g, 'a');
    if (replaced !== rest) {
      names.add(first + replaced);
    }
  }

  // Ajouts créatifs selon le style
  if (style === "tech" && cleanKeyword.length > 2) {
    names.add(cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1) + "Lab");
    names.add(cleanKeyword.slice(0, 2).toUpperCase() + "Labs");
    names.add("N" + cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1));
    names.add(cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1) + "ly");
  }

  if (style === "luxe" && cleanKeyword.length > 2) {
    names.add(cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1) + "Paris");
    names.add("Le " + cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1));
    names.add(cleanKeyword.toUpperCase() + " & Co");
    names.add("Maison de " + cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1));
  }

  if (style === "streetwear" && cleanKeyword.length > 2) {
    names.add(cleanKeyword.toUpperCase().slice(0, 3) + "NYC");
    names.add(cleanKeyword.toUpperCase().slice(0, 2) + "X" + cleanKeyword.slice(2).toUpperCase());
    names.add(cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1, 2) + cleanKeyword.slice(2).toUpperCase());
    names.add(cleanKeyword.toUpperCase() + "CO");
  }

  if (style === "minimal" && cleanKeyword.length > 2) {
    names.add(cleanKeyword.toUpperCase().slice(0, 3));
    names.add(cleanKeyword.toUpperCase().slice(0, 2) + cleanKeyword.slice(-1).toUpperCase());
    names.add(cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1, 2) + cleanKeyword.slice(-2).toUpperCase());
    names.add(cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(-1).toUpperCase());
  }

  if (style === "nature" && cleanKeyword.length > 2) {
    names.add(cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1) + "Earth");
    names.add(cleanKeyword.toUpperCase() + "Nature");
    names.add(cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1) + "Pure");
    names.add(cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1) + "Bio");
  }

  // Convertir en array et mélanger
  const namesArray = Array.from(names);
  
  // Mélanger aléatoirement
  for (let i = namesArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [namesArray[i], namesArray[j]] = [namesArray[j], namesArray[i]];
  }

  // Retourner 10-12 noms les plus originaux
  return namesArray.slice(0, 12);
}

export const STYLE_INFO: Record<
  BrandStyle,
  { label: string; icon: string; color: string; description: string }
> = {
  tech: {
    label: "Tech",
    icon: "💻",
    color: "#3b82f6",
    description: "Noms modernes pour startups tech",
  },
  luxe: {
    label: "Luxe",
    icon: "💎",
    color: "#fbbf24",
    description: "Noms élégants et prestigieux",
  },
  streetwear: {
    label: "Streetwear",
    icon: "🧢",
    color: "#ef4444",
    description: "Noms percutants et urbains",
  },
  minimal: {
    label: "Minimal",
    icon: "✨",
    color: "#8b5cf6",
    description: "Noms épurés et simples",
  },
  nature: {
    label: "Nature",
    icon: "🌿",
    color: "#10b981",
    description: "Noms écologiques et naturels",
  },
};
