import type { Locale } from "@/stores/language-store";

/**
 * Technical spec sheets sourced from "OFFRE DE SERVICE V5 2026.pdf".
 * The PDF documents specs per gamme pair rather than per individual model
 * (ARINI-PRO: X7 + M1 Pro · ARINI-Bureau: X5 + K5 · ARINI-Maison: i30 + i40 + i50 + i60) —
 * i30 and i60 reuse their paired sibling's documented fields (i40 and i50 respectively)
 * since the PDF doesn't break those two out separately.
 */

export type ProductModel =
  | "x7"
  | "m1pro"
  | "x5"
  | "k5"
  | "i30"
  | "i40"
  | "i50"
  | "i60";

export type Spec = { label: string; value: string };

const LABELS: Record<
  Locale,
  Record<
    | "modes"
    | "option"
    | "thickness"
    | "mortise"
    | "battery"
    | "life"
    | "material"
    | "connectivity"
    | "app"
    | "fingerprints"
    | "pin"
    | "cards"
    | "warranty",
    string
  >
> = {
  fr: {
    modes: "Modes d'ouverture",
    option: "Option",
    thickness: "Épaisseur de porte",
    mortise: "Mortaise standard",
    battery: "Batterie",
    life: "Autonomie batterie",
    material: "Matériau",
    connectivity: "Connectivité",
    app: "Application",
    fingerprints: "Empreintes",
    pin: "Codes PIN",
    cards: "Cartes IC/NFC",
    warranty: "Garantie",
  },
  en: {
    modes: "Access modes",
    option: "Option",
    thickness: "Door thickness",
    mortise: "Standard mortise",
    battery: "Battery",
    life: "Battery life",
    material: "Material",
    connectivity: "Connectivity",
    app: "App",
    fingerprints: "Fingerprints",
    pin: "PIN codes",
    cards: "IC/NFC cards",
    warranty: "Warranty",
  },
  ar: {
    modes: "أوضاع الفتح",
    option: "خيار إضافي",
    thickness: "سُمك الباب",
    mortise: "جسم القفل",
    battery: "البطارية",
    life: "عمر البطارية",
    material: "المادة",
    connectivity: "الاتصال",
    app: "التطبيق",
    fingerprints: "البصمات",
    pin: "رموز PIN",
    cards: "بطاقات IC/NFC",
    warranty: "الضمان",
  },
};

type ModelValues = Partial<Record<keyof (typeof LABELS)["fr"], string>>;

const VALUES: Record<ProductModel, Record<Locale, ModelValues>> = {
  x7: {
    fr: {
      modes: "Code, carte, empreinte digitale, app, clé mécanique",
      option: "Caméra HD pour surveiller les entrées/sorties",
      thickness: "38 à 110 mm",
      mortise: "5050 / 6068 — 24×240 mm",
      battery: "8 × piles AA alcalines",
      life: "12 mois",
      material: "Alliage aluminium",
      connectivity: "WiFi 2.4GHz + Bluetooth",
      app: "Tuya Smart / TT Lock",
      fingerprints: "Jusqu'à 200",
      pin: "Jusqu'à 150 utilisateurs",
      cards: "Jusqu'à 200",
      warranty: "2 ans",
    },
    en: {
      modes: "Code, card, fingerprint, app, mechanical key",
      option: "HD camera to monitor entries/exits",
      thickness: "38 to 110 mm",
      mortise: "5050 / 6068 — 24×240 mm",
      battery: "8 × AA alkaline batteries",
      life: "12 months",
      material: "Aluminium alloy",
      connectivity: "WiFi 2.4GHz + Bluetooth",
      app: "Tuya Smart / TT Lock",
      fingerprints: "Up to 200",
      pin: "Up to 150 users",
      cards: "Up to 200",
      warranty: "2 years",
    },
    ar: {
      modes: "رمز، بطاقة، بصمة، تطبيق، مفتاح ميكانيكي",
      option: "كاميرا HD لمراقبة الدخول/الخروج",
      thickness: "38 إلى 110 ملم",
      mortise: "5050 / 6068 — 24×240 ملم",
      battery: "8 بطاريات",
      life: "12 شهرًا",
      material: "سبيكة ألومنيوم",
      connectivity: "واي فاي 2.4GHz + بلوتوث",
      app: "Tuya Smart / TT Lock",
      fingerprints: "حتى 200",
      pin: "حتى 150 مستخدمًا",
      cards: "حتى 200",
      warranty: "سنتان",
    },
  },
  m1pro: {
    fr: {
      modes: "Code, carte, empreinte digitale, app, clé mécanique",
      thickness: "38 à 110 mm",
      mortise: "6068 — 24×240 mm",
      battery: "8 × piles AA alcalines",
      life: "12 mois",
      material: "Alliage aluminium",
      connectivity: "WiFi 2.4GHz + Bluetooth",
      app: "Tuya Smart / TT Lock",
      fingerprints: "Jusqu'à 200",
      pin: "Jusqu'à 150 utilisateurs",
      cards: "Jusqu'à 200",
      warranty: "2 ans",
    },
    en: {
      modes: "Code, card, fingerprint, app, mechanical key",
      thickness: "38 to 110 mm",
      mortise: "6068 — 24×240 mm",
      battery: "8 × AA alkaline batteries",
      life: "12 months",
      material: "Aluminium alloy",
      connectivity: "WiFi 2.4GHz + Bluetooth",
      app: "Tuya Smart / TT Lock",
      fingerprints: "Up to 200",
      pin: "Up to 150 users",
      cards: "Up to 200",
      warranty: "2 years",
    },
    ar: {
      modes: "رمز، بطاقة، بصمة، تطبيق، مفتاح ميكانيكي",
      thickness: "38 إلى 110 ملم",
      mortise: "6068 — 24×240 ملم",
      battery: "8 بطاريات",
      life: "12 شهرًا",
      material: "سبيكة ألومنيوم",
      connectivity: "واي فاي 2.4GHz + بلوتوث",
      app: "Tuya Smart / TT Lock",
      fingerprints: "حتى 200",
      pin: "حتى 150 مستخدمًا",
      cards: "حتى 200",
      warranty: "سنتان",
    },
  },
  x5: {
    fr: {
      modes: "Code, carte, empreinte digitale, app, clé mécanique",
      thickness: "38 à 110 mm",
      mortise: "6068 — 24×240 mm",
      battery: "8 × piles AA alcalines",
      life: "12 mois",
      material: "Alliage aluminium",
      connectivity: "WiFi 2.4GHz + Bluetooth",
      app: "Tuya Smart / TT Lock",
      fingerprints: "Jusqu'à 200",
      pin: "Jusqu'à 150 utilisateurs",
      cards: "Jusqu'à 200",
      warranty: "2 ans",
    },
    en: {
      modes: "Code, card, fingerprint, app, mechanical key",
      thickness: "38 to 110 mm",
      mortise: "6068 — 24×240 mm",
      battery: "8 × AA alkaline batteries",
      life: "12 months",
      material: "Aluminium alloy",
      connectivity: "WiFi 2.4GHz + Bluetooth",
      app: "Tuya Smart / TT Lock",
      fingerprints: "Up to 200",
      pin: "Up to 150 users",
      cards: "Up to 200",
      warranty: "2 years",
    },
    ar: {
      modes: "رمز، بطاقة، بصمة، تطبيق، مفتاح ميكانيكي",
      thickness: "38 إلى 110 ملم",
      mortise: "6068 — 24×240 ملم",
      battery: "8 بطاريات",
      life: "12 شهرًا",
      material: "سبيكة ألومنيوم",
      connectivity: "واي فاي 2.4GHz + بلوتوث",
      app: "Tuya Smart / TT Lock",
      fingerprints: "حتى 200",
      pin: "حتى 150 مستخدمًا",
      cards: "حتى 200",
      warranty: "سنتان",
    },
  },
  k5: {
    fr: {
      modes: "Code, carte, empreinte digitale, app, clé mécanique",
      thickness: "38 à 110 mm",
      mortise: "6068 — 24×240 mm",
      battery: "Li-ion 4200 mAh, rechargeable USB-C",
      life: "12 mois",
      material: "Alliage aluminium",
      connectivity: "WiFi 2.4GHz + Bluetooth",
      app: "Tuya Smart / TT Lock",
      fingerprints: "Jusqu'à 200",
      pin: "Jusqu'à 150 utilisateurs",
      cards: "Jusqu'à 200",
      warranty: "2 ans",
    },
    en: {
      modes: "Code, card, fingerprint, app, mechanical key",
      thickness: "38 to 110 mm",
      mortise: "6068 — 24×240 mm",
      battery: "Li-ion 4200 mAh, USB-C rechargeable",
      life: "12 months",
      material: "Aluminium alloy",
      connectivity: "WiFi 2.4GHz + Bluetooth",
      app: "Tuya Smart / TT Lock",
      fingerprints: "Up to 200",
      pin: "Up to 150 users",
      cards: "Up to 200",
      warranty: "2 years",
    },
    ar: {
      modes: "رمز، بطاقة، بصمة، تطبيق، مفتاح ميكانيكي",
      thickness: "38 إلى 110 ملم",
      mortise: "6068 — 24×240 ملم",
      battery: "ليثيوم أيون 4200 مللي أمبير، قابلة لإعادة الشحن USB-C",
      life: "12 شهرًا",
      material: "سبيكة ألومنيوم",
      connectivity: "واي فاي 2.4GHz + بلوتوث",
      app: "Tuya Smart / TT Lock",
      fingerprints: "حتى 200",
      pin: "حتى 150 مستخدمًا",
      cards: "حتى 200",
      warranty: "سنتان",
    },
  },
  i30: {
    fr: {
      modes:
        "Reconnaissance faciale 3D, code PIN, carte NFC/RFID, empreinte digitale, app, clé mécanique, codes temporaires",
      thickness: "38 à 110 mm",
      mortise: "6068 — 24×240 mm",
      battery: "Li-ion 5000 mAh, rechargeable USB-C",
      life: "18 mois",
      material: "Alliage aluminium renforcé / acier inox",
      connectivity: "WiFi 2.4GHz + Bluetooth",
      app: "Tuya Smart / TT Lock",
      fingerprints: "Jusqu'à 200",
      pin: "Jusqu'à 150 utilisateurs",
      cards: "Jusqu'à 200",
      warranty: "2 ans",
    },
    en: {
      modes:
        "3D facial recognition, PIN code, NFC/RFID card, fingerprint, app, mechanical key, temporary codes",
      thickness: "38 to 110 mm",
      mortise: "6068 — 24×240 mm",
      battery: "Li-ion 5000 mAh, USB-C rechargeable",
      life: "18 months",
      material: "Reinforced aluminium alloy / stainless steel",
      connectivity: "WiFi 2.4GHz + Bluetooth",
      app: "Tuya Smart / TT Lock",
      fingerprints: "Up to 200",
      pin: "Up to 150 users",
      cards: "Up to 200",
      warranty: "2 years",
    },
    ar: {
      modes:
        "التعرف على الوجه ثلاثي الأبعاد، رمز PIN، بطاقة NFC/RFID، بصمة، تطبيق، مفتاح ميكانيكي، رموز مؤقتة",
      thickness: "38 إلى 110 ملم",
      mortise: "6068 — 24×240 ملم",
      battery: "ليثيوم أيون 5000 مللي أمبير، قابلة لإعادة الشحن USB-C",
      life: "18 شهرًا",
      material: "سبيكة ألومنيوم معززة / فولاذ مقاوم للصدأ",
      connectivity: "واي فاي 2.4GHz + بلوتوث",
      app: "Tuya Smart / TT Lock",
      fingerprints: "حتى 200",
      pin: "حتى 150 مستخدمًا",
      cards: "حتى 200",
      warranty: "سنتان",
    },
  },
  i40: {
    fr: {
      modes:
        "Face ID 3D infrarouge, code PIN, carte NFC/RFID, empreinte digitale, app, clé mécanique, codes temporaires, reconnaissance palmaire",
      thickness: "38 à 110 mm",
      mortise: "6068 — 24×240 mm",
      battery: "Li-ion 5000 mAh, rechargeable USB-C",
      life: "18 mois",
      material: "Alliage aluminium renforcé / acier inox",
      connectivity: "WiFi 2.4GHz + Bluetooth",
      app: "Tuya Smart / TT Lock",
      fingerprints: "Jusqu'à 200",
      pin: "Jusqu'à 150 utilisateurs",
      cards: "Jusqu'à 200",
      warranty: "2 ans",
    },
    en: {
      modes:
        "3D infrared Face ID, PIN code, NFC/RFID card, fingerprint, app, mechanical key, temporary codes, palm recognition",
      thickness: "38 to 110 mm",
      mortise: "6068 — 24×240 mm",
      battery: "Li-ion 5000 mAh, USB-C rechargeable",
      life: "18 months",
      material: "Reinforced aluminium alloy / stainless steel",
      connectivity: "WiFi 2.4GHz + Bluetooth",
      app: "Tuya Smart / TT Lock",
      fingerprints: "Up to 200",
      pin: "Up to 150 users",
      cards: "Up to 200",
      warranty: "2 years",
    },
    ar: {
      modes:
        "بصمة الوجه ثلاثية الأبعاد بالأشعة تحت الحمراء، رمز PIN، بطاقة NFC/RFID، بصمة، تطبيق، مفتاح ميكانيكي، رموز مؤقتة، التعرف على راحة اليد",
      thickness: "38 إلى 110 ملم",
      mortise: "6068 — 24×240 ملم",
      battery: "ليثيوم أيون 5000 مللي أمبير، قابلة لإعادة الشحن USB-C",
      life: "18 شهرًا",
      material: "سبيكة ألومنيوم معززة / فولاذ مقاوم للصدأ",
      connectivity: "واي فاي 2.4GHz + بلوتوث",
      app: "Tuya Smart / TT Lock",
      fingerprints: "حتى 200",
      pin: "حتى 150 مستخدمًا",
      cards: "حتى 200",
      warranty: "سنتان",
    },
  },
  i50: {
    fr: {
      modes:
        "Face ID 3D ultra précision, code PIN, carte NFC/RFID, empreinte digitale, app, clé mécanique, codes temporaires multi-niveaux, reconnaissance palmaire",
      thickness: "38 à 110 mm",
      mortise: "6065 / 6068 — 24×240 mm",
      battery: "Li-ion 5000 mAh, rechargeable USB-C",
      life: "18 à 24 mois",
      material: "Alliage aluminium premium / acier inox",
      connectivity: "WiFi 2.4GHz + Bluetooth",
      app: "Tuya Smart / TT Lock",
      fingerprints: "Jusqu'à 200",
      pin: "Jusqu'à 150 utilisateurs",
      cards: "Jusqu'à 200",
      warranty: "2 ans",
    },
    en: {
      modes:
        "3D ultra-precision Face ID, PIN code, NFC/RFID card, fingerprint, app, mechanical key, multi-level temporary codes, palm recognition",
      thickness: "38 to 110 mm",
      mortise: "6065 / 6068 — 24×240 mm",
      battery: "Li-ion 5000 mAh, USB-C rechargeable",
      life: "18 to 24 months",
      material: "Premium aluminium alloy / stainless steel",
      connectivity: "WiFi 2.4GHz + Bluetooth",
      app: "Tuya Smart / TT Lock",
      fingerprints: "Up to 200",
      pin: "Up to 150 users",
      cards: "Up to 200",
      warranty: "2 years",
    },
    ar: {
      modes:
        "بصمة وجه ثلاثية الأبعاد فائقة الدقة، رمز PIN، بطاقة NFC/RFID، بصمة، تطبيق، مفتاح ميكانيكي، رموز مؤقتة متعددة المستويات، التعرف على راحة اليد",
      thickness: "38 إلى 110 ملم",
      mortise: "6065 / 6068 — 24×240 ملم",
      battery: "ليثيوم أيون 5000 مللي أمبير، قابلة لإعادة الشحن USB-C",
      life: "18 إلى 24 شهرًا",
      material: "سبيكة ألومنيوم فاخرة / فولاذ مقاوم للصدأ",
      connectivity: "واي فاي 2.4GHz + بلوتوث",
      app: "Tuya Smart / TT Lock",
      fingerprints: "حتى 200",
      pin: "حتى 150 مستخدمًا",
      cards: "حتى 200",
      warranty: "سنتان",
    },
  },
  i60: {
    fr: {
      modes:
        "Face ID 3D ultra précision, code PIN, carte NFC/RFID, empreinte digitale, app, clé mécanique, codes temporaires multi-niveaux, reconnaissance palmaire",
      thickness: "38 à 110 mm",
      mortise: "6065 / 6068 — 24×240 mm",
      battery: "Li-ion 5000 mAh, rechargeable USB-C",
      life: "18 à 24 mois",
      material: "Alliage aluminium premium / acier inox",
      connectivity: "WiFi 2.4GHz + Bluetooth",
      app: "Tuya Smart / TT Lock",
      fingerprints: "Jusqu'à 200",
      pin: "Jusqu'à 150 utilisateurs",
      cards: "Jusqu'à 200",
      warranty: "2 ans",
    },
    en: {
      modes:
        "3D ultra-precision Face ID, PIN code, NFC/RFID card, fingerprint, app, mechanical key, multi-level temporary codes, palm recognition",
      thickness: "38 to 110 mm",
      mortise: "6065 / 6068 — 24×240 mm",
      battery: "Li-ion 5000 mAh, USB-C rechargeable",
      life: "18 to 24 months",
      material: "Premium aluminium alloy / stainless steel",
      connectivity: "WiFi 2.4GHz + Bluetooth",
      app: "Tuya Smart / TT Lock",
      fingerprints: "Up to 200",
      pin: "Up to 150 users",
      cards: "Up to 200",
      warranty: "2 years",
    },
    ar: {
      modes:
        "بصمة وجه ثلاثية الأبعاد فائقة الدقة، رمز PIN، بطاقة NFC/RFID، بصمة، تطبيق، مفتاح ميكانيكي، رموز مؤقتة متعددة المستويات، التعرف على راحة اليد",
      thickness: "38 إلى 110 ملم",
      mortise: "6065 / 6068 — 24×240 ملم",
      battery: "ليثيوم أيون 5000 مللي أمبير، قابلة لإعادة الشحن USB-C",
      life: "18 إلى 24 شهرًا",
      material: "سبيكة ألومنيوم فاخرة / فولاذ مقاوم للصدأ",
      connectivity: "واي فاي 2.4GHz + بلوتوث",
      app: "Tuya Smart / TT Lock",
      fingerprints: "حتى 200",
      pin: "حتى 150 مستخدمًا",
      cards: "حتى 200",
      warranty: "سنتان",
    },
  },
};

const FIELD_ORDER: (keyof (typeof LABELS)["fr"])[] = [
  "modes",
  "option",
  "thickness",
  "mortise",
  "battery",
  "life",
  "material",
  "connectivity",
  "app",
  "fingerprints",
  "pin",
  "cards",
  "warranty",
];

export function getModelSpecs(model: ProductModel, locale: Locale): Spec[] {
  const labels = LABELS[locale];
  const values = VALUES[model][locale];
  return FIELD_ORDER.filter((key) => values[key] !== undefined).map((key) => ({
    label: labels[key],
    value: values[key]!,
  }));
}

/** Guesses the ARINI model from a Shopify handle/title so the right spec sheet is shown. */
export function matchProductModel(
  handle: string,
  title?: string,
): ProductModel | null {
  const haystack = `${handle} ${title ?? ""}`.toLowerCase();

  // The demo/default product stands in for the flagship X7 until real
  // per-model Shopify products are wired up.
  if (
    haystack.includes("smart-door-lock") ||
    haystack.includes("poignee-connectee")
  )
    return "x7";

  if (/\bm1[\s-]?pro\b/.test(haystack)) return "m1pro";
  if (/\bi[\s-]?30\b/.test(haystack)) return "i30";
  if (/\bi[\s-]?40\b/.test(haystack)) return "i40";
  if (/\bi[\s-]?50\b/.test(haystack)) return "i50";
  if (/\bi[\s-]?60\b/.test(haystack)) return "i60";
  if (/\bk5\b/.test(haystack)) return "k5";
  if (/\bx5\b/.test(haystack)) return "x5";
  if (/\bx7\b/.test(haystack)) return "x7";

  return null;
}
