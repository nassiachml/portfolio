export type ArticleTag = "nutrition" | "motivation";

export interface Article {
  id: string;
  icon: string;
  title: string;
  tag: ArticleTag;
  readTime: number; // minutes
  content: ArticleSection[];
  cta: string;
  ctaHref: string;
}

export interface ArticleSection {
  type: "intro" | "section" | "conclusion" | "cta";
  title?: string;
  body: string[];
  list?: { label: string; items: string[] }[];
}

export const HERO_PHRASES = [
  "Prends soin de ton corps, il t'accompagnera toute ta vie.",
  "Chaque effort compte, même le plus petit.",
  "La discipline crée les résultats.",
  "Mieux vaut peu mais souvent.",
  "Ton corps peut tout, crois en lui.",
];

export const articles: Article[] = [
  {
    id: "bases-nutrition",
    icon: "🥗",
    title: "Les bases d'une nutrition équilibrée pour rester en forme",
    tag: "nutrition",
    readTime: 5,
    cta: "Découvre ton plan nutrition personnalisé dans ton tableau de bord.",
    ctaHref: "/fitness/dashboard",
    content: [
      {
        type: "intro",
        body: [
          "Cette semaine tu as brûlé {{weeklyCalories}} kcal et réalisé {{sessionsCount}} séance(s). Adopter une bonne nutrition ne signifie pas se priver, mais apprendre à nourrir son corps intelligemment. Une alimentation équilibrée améliore l'énergie, la récupération sportive et le bien-être mental.",
        ],
      },
      {
        type: "section",
        title: "1. Comprendre les macronutriments",
        body: ["Une alimentation saine repose sur trois piliers :"],
        list: [
          {
            label: "Protéines : construction musculaire et récupération",
            items: ["Viandes maigres, poissons, œufs, légumineuses"],
          },
          {
            label: "Glucides : source principale d'énergie",
            items: ["Riz complet, pâtes complètes, fruits, légumes"],
          },
          {
            label: "Lipides : indispensables au bon fonctionnement hormonal",
            items: ["Huile d'olive, avocat, noix, poissons gras"],
          },
        ],
      },
      {
        type: "section",
        body: ["✅ Astuce : aucun macronutriment n'est « mauvais », tout est une question d'équilibre."],
      },
      {
        type: "section",
        title: "2. Manger au bon moment",
        body: [
          "Avant le sport : glucides + protéines légères",
          "Après le sport : protéines + glucides pour la récupération",
          "Entre les repas : collations saines (fruit, yaourt, poignée d'amandes)",
        ],
      },
      {
        type: "section",
        title: "3. Hydratation : la clé oubliée",
        body: [
          "Boire suffisamment d'eau améliore : les performances sportives, la digestion, la concentration.",
          "💧 Objectif : 1,5 à 2 litres par jour minimum",
        ],
      },
      {
        type: "conclusion",
        body: [
          "Une bonne nutrition n'est pas une contrainte, mais un allié durable pour atteindre tes objectifs fitness et bien-être.",
        ],
      },
      { type: "cta", body: ["Découvre ton plan nutrition personnalisé dans ton tableau de bord."] },
    ],
  },
  {
    id: "bien-manger-sport",
    icon: "🥗",
    title: "Bien manger quand on fait du sport (sans frustration)",
    tag: "nutrition",
    readTime: 4,
    cta: "Suis tes calories et repas directement dans l'application.",
    ctaHref: "/fitness/nutrition",
    content: [
      {
        type: "intro",
        body: [
          "Tu as fait {{sessionsCount}} séance(s) cette semaine. Faire du sport sans adapter son alimentation peut ralentir les résultats. L'objectif : manger mieux, pas moins.",
        ],
      },
      {
        type: "section",
        title: "1. Éviter les régimes extrêmes",
        body: [
          "Les régimes trop restrictifs : fatiguent le corps, favorisent les blessures, créent de la frustration.",
          "🎯 Préfère une alimentation progressive et durable.",
        ],
      },
      {
        type: "section",
        title: "2. Exemple de journée équilibrée",
        body: ["Voici une répartition type sur une journée :"],
        list: [
          { label: "Petit-déjeuner", items: ["Flocons d'avoine + fruit + yaourt"] },
          { label: "Déjeuner", items: ["Protéine (poulet/poisson) + légumes + féculents complets"] },
          { label: "Collation", items: ["Fruit ou poignée d'oléagineux"] },
          { label: "Dîner", items: ["Léger mais nourrissant (légumes + protéines)"] },
        ],
      },
      {
        type: "conclusion",
        body: [
          "La régularité est plus importante que la perfection. Un écart n'annule jamais les efforts.",
        ],
      },
      { type: "cta", body: ["Suis tes calories et repas directement dans l'application."] },
    ],
  },
  {
    id: "rester-motive",
    icon: "🔥",
    title: "Rester motivé sur le long terme : la clé du succès",
    tag: "motivation",
    readTime: 4,
    cta: "Planifie ta prochaine séance dès maintenant.",
    ctaHref: "/fitness/sessions",
    content: [
      {
        type: "intro",
        body: [
          "{{userName}}, tu as réalisé {{sessionsCount}} séance(s) cette semaine — chaque effort compte. La motivation fluctue. Ce qui compte, c'est la discipline et la constance.",
        ],
      },
      {
        type: "section",
        title: "1. Fixer des objectifs réalistes",
        body: [
          "❌ Mauvais objectif : « Perdre 10 kg en 1 mois »",
          "✅ Bon objectif : « Faire 3 séances par semaine pendant 1 mois »",
        ],
      },
      {
        type: "section",
        title: "2. Visualiser ses progrès",
        body: [
          "Voir ses progrès : augmente la motivation, renforce la confiance, pousse à continuer.",
          "📊 Utilise les graphiques et statistiques de ton tableau de bord.",
        ],
      },
      {
        type: "section",
        title: "3. Accepter les moments de creux",
        body: [
          "Personne n'est motivé tous les jours. L'important n'est pas de ne jamais tomber, mais de se relever rapidement.",
        ],
      },
      {
        type: "conclusion",
        body: [
          "Chaque séance compte. Chaque effort est une victoire. Tu construis une version plus forte de toi-même.",
        ],
      },
      { type: "cta", body: ["Planifie ta prochaine séance dès maintenant."] },
    ],
  },
  {
    id: "sport-habitude",
    icon: "💪",
    title: "Transformer le sport en habitude (et non en contrainte)",
    tag: "motivation",
    readTime: 3,
    cta: "Découvre les routines adaptées à ton niveau.",
    ctaHref: "/fitness/routines",
    content: [
      {
        type: "intro",
        body: [
          "Avec {{daysActive}} jour(s) actif(s) cette semaine, tu poses les bases. Le secret des personnes régulières n'est pas la motivation, mais l'habitude.",
        ],
      },
      {
        type: "section",
        title: "1. Commencer petit",
        body: ["20 minutes suffisent", "Mieux vaut peu mais souvent"],
      },
      {
        type: "section",
        title: "2. Programmer ses séances",
        body: [
          "Traite tes séances comme un rendez-vous important.",
          "📅 Bloque un créneau fixe chaque semaine.",
        ],
      },
      {
        type: "section",
        title: "3. Se récompenser",
        body: [
          "Nouvelle tenue de sport, Journée off bien-être, Moment détente",
          "🎁 La récompense renforce l'habitude.",
        ],
      },
      {
        type: "conclusion",
        body: ["Le sport devient facile quand il fait partie de ton quotidien."],
      },
      { type: "cta", body: ["Découvre les routines adaptées à ton niveau."] },
    ],
  },
];
