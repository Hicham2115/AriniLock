// Static (non-LLM) conversation flow for the chat widget.
// Mirrors the guided 2-question journey described in lib/chatbot/knowledge.md,
// plus a keyword-matched FAQ for free-text questions. No network calls.

import { MAIN_PRODUCT_HANDLE } from "@/lib/shopify/products";

export type Locale = "fr" | "en" | "ar";
export type Stage = "language" | "property" | "feature" | "done";

export interface ChatOption {
  label: string;
  value: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export const LANGUAGE_OPTIONS: ChatOption[] = [
  { label: "Français", value: "fr" },
  { label: "English", value: "en" },
  { label: "العربية", value: "ar" },
];

export const LANGUAGE_PROMPT: Message = {
  role: "assistant",
  content: "🌐 Choisissez votre langue / Choose your language / اختر لغتك",
};

function matchLanguageKeyword(text: string): Locale | null {
  const t = text.toLowerCase();
  if (/[؀-ۿ]/.test(text)) return "ar";
  if (/فرنس|عرب/.test(text)) return text.includes("فرنس") ? "fr" : "ar";
  if (/english|anglais/.test(t)) return "en";
  if (/fran[çc]ais|french/.test(t)) return "fr";
  return null;
}

interface LocaleContent {
  welcome: Message;
  featureQuestion: Message;
  propertyOptions: ChatOption[];
  featureOptions: ChatOption[];
  propertyLabels: Record<string, string>;
  recommend: (feature: string, property: string | null) => { content: string; productLink: string };
  faqs: { test: RegExp; answer: string }[];
  noMatch: string;
  restartRe: RegExp;
  linkRe: RegExp;
  linkAnswer: (link: string) => string;
  fallbackDone: string;
}

// ── French ───────────────────────────────────────────────────────────────────

const FR_PROPERTY_LABELS: Record<string, string> = {
  appartement: "appartement",
  villa: "villa",
  bureau: "bureau",
  airbnb: "logement Airbnb",
};

function frRecommend(feature: string, property: string | null) {
  const propertyLabel = property ? FR_PROPERTY_LABELS[property] : null;
  const contextSuffix =
    propertyLabel && (property === "villa" || property === "airbnb") && feature !== "simple"
      ? ` — particulièrement adapté aux ${propertyLabel === "villa" ? "villas et riads" : "locations Airbnb"} grâce aux codes d'accès temporaires`
      : "";
  switch (feature) {
    case "camera":
      return {
        productLink: "/produits/m1-pro",
        content: `Pour ${propertyLabel ? `votre ${propertyLabel}` : "ce profil"}, je recommande l'**ARINILOCK M1 Pro** — écran HD 4,5", visiophone bidirectionnel, caméra vision nocturne, 6 modes d'accès${contextSuffix} — 2 590 MAD.\n\n[Voir le produit →](/produits/m1-pro)`,
      };
    case "avance":
      return {
        productLink: "/produits/i-60",
        content: `Pour ${propertyLabel ? `votre ${propertyLabel}` : "ce profil"}, je recommande l'**ARINILOCK i60** — Face ID 3D, reconnaissance de la paume de main, empreinte digitale, caméra HD nocturne${contextSuffix} — 3 490 MAD.\n\n[Voir le produit →](/produits/i-60)`,
      };
    case "simple":
    default: {
      const link = `/produits/${MAIN_PRODUCT_HANDLE}`;
      return {
        productLink: link,
        content: `Pour ${propertyLabel ? `votre ${propertyLabel}` : "ce profil"}, je recommande la **Poignée connectée ARINILOCK** — empreinte digitale, code PIN, carte RFID, application, clé de secours — à partir de 1 590 MAD.\n\n[Voir le produit →](${link})`,
      };
    }
  }
}

const FR: LocaleContent = {
  welcome: {
    role: "assistant",
    content: "Bonjour ! Je suis l'assistant ARINILOCK. Pour vous conseiller le bon modèle, pour quel type de bien cherchez-vous une serrure ?",
  },
  featureQuestion: { role: "assistant", content: "Merci ! Et quel niveau de fonctionnalités recherchez-vous ?" },
  propertyOptions: [
    { label: "Un appartement", value: "appartement" },
    { label: "Une villa", value: "villa" },
    { label: "Un bureau", value: "bureau" },
    { label: "Un Airbnb / location courte durée", value: "airbnb" },
  ],
  featureOptions: [
    { label: "Simple — empreinte, code PIN, RFID", value: "simple" },
    { label: "Avec caméra — visiophone ou surveillance", value: "camera" },
    { label: "Avancé — Face ID, paume de main", value: "avance" },
  ],
  propertyLabels: FR_PROPERTY_LABELS,
  recommend: frRecommend,
  faqs: [
    { test: /compatib|porte\b/i, answer: "ARINILOCK s'adapte à la majorité des portes intérieures et d'entrée standards en bois et métal. Contactez notre équipe avant l'achat pour vérifier la compatibilité avec votre porte : [Contact →](/contact)" },
    { test: /panne|coupure|électri/i, answer: "En cas de panne électrique, la serrure reste utilisable via empreinte, code PIN ou carte RFID tant que les piles fonctionnent — pas besoin de réseau électrique. Le déverrouillage à distance nécessite en revanche une connexion internet. En cas de panne totale des piles, une clé physique de secours est toujours fournie." },
    { test: /pile|batterie|autonomie/i, answer: "Les 4 piles AA standards tiennent environ 4 à 6 mois selon l'usage. L'autonomie restante est visible à tout moment dans l'application, qui vous alerte avant épuisement." },
    { test: /livr|délai|delai/i, answer: "Livraison partout au Maroc, généralement en 2 à 4 jours ouvrés. Paiement à la livraison disponible, ainsi que le paiement en ligne (CMI, Visa, Mastercard)." },
    { test: /paiement|payer|cmi|carte bancaire/i, answer: "Le paiement à la livraison est disponible partout au Maroc — aucune carte bancaire requise à la commande. Le paiement en ligne (CMI, Visa, Mastercard) est aussi accepté." },
    { test: /garantie/i, answer: "ARINILOCK est couverte par une garantie constructeur de 2 ans." },
    { test: /install/i, answer: "L'installation est réalisée par nos techniciens certifiés, gratuite et incluse avec la commande — jamais en auto-installation. Elle prend généralement moins de 45 minutes." },
    { test: /application|\bapp\b|tuya/i, answer: "L'application mobile **Tuya** (iOS & Android) permet de contrôler la serrure à distance, consulter l'historique des accès et recevoir des alertes en temps réel — connexion WiFi + Bluetooth requise pour les fonctions à distance." },
    { test: /empreinte/i, answer: "Jusqu'à 150 empreintes digitales peuvent être enregistrées, organisées en jusqu'à 10 profils." },
    { test: /invité|temporaire|locataire|code.*(guest|invite)/i, answer: "Oui, l'application permet de créer des codes PIN temporaires pour vos invités, votre aide à domicile ou vos locataires — très pratique pour les locations courte durée." },
    { test: /accessoire/i, answer: "Accessoires disponibles : lot de piles longue durée (89 MAD), plaque de finition supplémentaire (149 MAD), lot de 2 cartes RFID (99 MAD). [Voir la boutique →](/produits)" },
    { test: /contact|téléphone|telephone|whatsapp|email|adresse|horaire/i, answer: "Vous pouvez nous joindre au +212 6 68 89 88 60 (WhatsApp) ou par email à support@arinilock.ma, du lundi au vendredi de 9h à 18h. [Page contact →](/contact)" },
    { test: /prix|combien.*(coûte|coute)|tarif/i, answer: "Poignée connectée : à partir de 1 590 MAD. M1 Pro (avec caméra) : 2 590 MAD. i60 (Face ID + paume) : 3 490 MAD. [Voir la boutique →](/produits)" },
    { test: /avis|note\b|évaluation/i, answer: "ARINILOCK a une note moyenne de 4.8/5 sur 312 avis vérifiés, dont 86% de 5 étoiles." },
  ],
  noMatch: "Je n'ai pas bien compris 🙂 Choisissez une option ci-dessous, ou reformulez votre question.",
  restartRe: /recommenc|autre produit|nouveau choix|repartir|restart/i,
  linkRe: /\blien\b|redirig|emm[eè]ne[- ]?moi|porte[- ]?moi|take me|go to it|link/i,
  linkAnswer: (link) => `Voici le lien : [Voir →](${link})`,
  fallbackDone: "Je peux vous renseigner sur la livraison, la garantie, l'installation, l'application ou nos accessoires. Vous pouvez aussi cliquer sur « Recommencer » pour revoir nos recommandations, ou visiter [notre boutique →](/produits).",
};

// ── English ──────────────────────────────────────────────────────────────────

const EN_PROPERTY_LABELS: Record<string, string> = {
  appartement: "apartment",
  villa: "villa",
  bureau: "office",
  airbnb: "Airbnb rental",
};

function enRecommend(feature: string, property: string | null) {
  const propertyLabel = property ? EN_PROPERTY_LABELS[property] : null;
  const contextSuffix =
    propertyLabel && (property === "villa" || property === "airbnb") && feature !== "simple"
      ? ` — especially well suited to ${propertyLabel === "villa" ? "villas and riads" : "Airbnb rentals"} thanks to temporary access codes`
      : "";
  switch (feature) {
    case "camera":
      return {
        productLink: "/produits/m1-pro",
        content: `For ${propertyLabel ? `your ${propertyLabel}` : "this profile"}, I recommend the **ARINILOCK M1 Pro** — 4.5" HD screen, two-way video intercom, night-vision camera, 6 access modes${contextSuffix} — 2,590 MAD.\n\n[View product →](/produits/m1-pro)`,
      };
    case "avance":
      return {
        productLink: "/produits/i-60",
        content: `For ${propertyLabel ? `your ${propertyLabel}` : "this profile"}, I recommend the **ARINILOCK i60** — 3D Face ID, palm recognition, fingerprint, HD night-vision camera${contextSuffix} — 3,490 MAD.\n\n[View product →](/produits/i-60)`,
      };
    case "simple":
    default: {
      const link = `/produits/${MAIN_PRODUCT_HANDLE}`;
      return {
        productLink: link,
        content: `For ${propertyLabel ? `your ${propertyLabel}` : "this profile"}, I recommend the **ARINILOCK Connected Handle** — fingerprint, PIN code, RFID card, app, backup key — starting at 1,590 MAD.\n\n[View product →](${link})`,
      };
    }
  }
}

const EN: LocaleContent = {
  welcome: {
    role: "assistant",
    content: "Hi! I'm the ARINILOCK assistant. To recommend the right model, what type of property are you looking to secure?",
  },
  featureQuestion: { role: "assistant", content: "Thanks! And what level of features are you looking for?" },
  propertyOptions: [
    { label: "An apartment", value: "appartement" },
    { label: "A villa", value: "villa" },
    { label: "An office", value: "bureau" },
    { label: "An Airbnb / short-term rental", value: "airbnb" },
  ],
  featureOptions: [
    { label: "Simple — fingerprint, PIN, RFID", value: "simple" },
    { label: "With camera — video intercom or surveillance", value: "camera" },
    { label: "Advanced — Face ID, palm recognition", value: "avance" },
  ],
  propertyLabels: EN_PROPERTY_LABELS,
  recommend: enRecommend,
  faqs: [
    { test: /compat|\bdoor\b/i, answer: "ARINILOCK fits most standard interior and entrance doors in wood and metal. Contact our team before purchasing to check compatibility with your door: [Contact →](/contact)" },
    { test: /outage|power cut|electri/i, answer: "During a power outage, the lock still works via fingerprint, PIN code, or RFID card as long as the batteries are charged — no electrical network needed. Remote unlocking via the app does require an internet connection. If the batteries fully die, a physical backup key is always included." },
    { test: /batter|autonomy/i, answer: "The 4 standard AA batteries last about 4 to 6 months depending on usage. Remaining battery life is visible anytime in the app, which alerts you before it runs out." },
    { test: /deliver|shipping/i, answer: "Delivery anywhere in Morocco, typically within 2 to 4 business days. Cash on delivery is available, as well as online payment (CMI, Visa, Mastercard)." },
    { test: /payment|pay\b|cmi|credit card/i, answer: "Cash on delivery is available anywhere in Morocco — no credit card required to order. Online payment (CMI, Visa, Mastercard) is also accepted." },
    { test: /warrant/i, answer: "ARINILOCK comes with a 2-year manufacturer warranty." },
    { test: /install/i, answer: "Installation is done by our certified technicians, free and included with your order — never self-installed. It usually takes less than 45 minutes." },
    { test: /application|\bapp\b|tuya/i, answer: "The **Tuya** mobile app (iOS & Android) lets you control the lock remotely, view access history, and receive real-time alerts — WiFi + Bluetooth connection required for remote features." },
    { test: /fingerprint/i, answer: "Up to 150 fingerprints can be registered, organized into up to 10 profiles." },
    { test: /guest|temporary|tenant/i, answer: "Yes, the app lets you create temporary PIN codes for guests, housekeeping staff, or tenants — very handy for short-term rentals." },
    { test: /accessor/i, answer: "Available accessories: long-life battery pack (89 MAD), extra finishing plate (149 MAD), set of 2 RFID cards (99 MAD). [Visit the shop →](/produits)" },
    { test: /contact|phone|whatsapp|email|address|hours/i, answer: "You can reach us at +212 6 68 89 88 60 (WhatsApp) or by email at support@arinilock.ma, Monday to Friday 9am–6pm. [Contact page →](/contact)" },
    { test: /price|cost|how much/i, answer: "Connected Handle: starting at 1,590 MAD. M1 Pro (with camera): 2,590 MAD. i60 (Face ID + palm): 3,490 MAD. [Visit the shop →](/produits)" },
    { test: /review|rating/i, answer: "ARINILOCK has an average rating of 4.8/5 across 312 verified reviews, with 86% giving 5 stars." },
  ],
  noMatch: "I didn't quite catch that 🙂 Please choose an option below, or rephrase your question.",
  restartRe: /restart|start over|another product|new choice/i,
  linkRe: /\blink\b|redirect|take me|go to it/i,
  linkAnswer: (link) => `Here's the link: [View →](${link})`,
  fallbackDone: "I can help with delivery, warranty, installation, the app, or our accessories. You can also click \"Restart\" to review our recommendations, or visit [our shop →](/produits).",
};

// ── Arabic ───────────────────────────────────────────────────────────────────

const AR_PROPERTY_LABELS: Record<string, string> = {
  appartement: "شقتك",
  villa: "فيلتك",
  bureau: "مكتبك",
  airbnb: "سكن Airbnb الخاص بك",
};

function arRecommend(feature: string, property: string | null) {
  const propertyLabel = property ? AR_PROPERTY_LABELS[property] : null;
  const contextSuffix =
    propertyLabel && (property === "villa" || property === "airbnb") && feature !== "simple"
      ? ` — مناسبة بشكل خاص لـ${property === "villa" ? "الفيلات والرياض" : "سكنات Airbnb"} بفضل رموز الدخول المؤقتة`
      : "";
  switch (feature) {
    case "camera":
      return {
        productLink: "/produits/m1-pro",
        content: `بالنسبة لـ${propertyLabel ?? "هذا الملف الشخصي"}، أنصحك بـ **ARINILOCK M1 Pro** — شاشة HD مقاس 4.5 بوصة، اتصال فيديو ثنائي الاتجاه، كاميرا رؤية ليلية، 6 طرق دخول${contextSuffix} — 2590 درهم.\n\n[عرض المنتج →](/produits/m1-pro)`,
      };
    case "avance":
      return {
        productLink: "/produits/i-60",
        content: `بالنسبة لـ${propertyLabel ?? "هذا الملف الشخصي"}، أنصحك بـ **ARINILOCK i60** — تعرف على الوجه ثلاثي الأبعاد، بصمة اليد، بصمة الإصبع، كاميرا HD للرؤية الليلية${contextSuffix} — 3490 درهم.\n\n[عرض المنتج →](/produits/i-60)`,
      };
    case "simple":
    default: {
      const link = `/produits/${MAIN_PRODUCT_HANDLE}`;
      return {
        productLink: link,
        content: `بالنسبة لـ${propertyLabel ?? "هذا الملف الشخصي"}، أنصحك بـ **مقبض ARINILOCK المتصل** — بصمة الإصبع، رمز PIN، بطاقة RFID، تطبيق، مفتاح احتياطي — ابتداءً من 1590 درهم.\n\n[عرض المنتج →](${link})`,
      };
    }
  }
}

const AR: LocaleContent = {
  welcome: {
    role: "assistant",
    content: "مرحباً! أنا مساعد ARINILOCK الافتراضي. لأقترح عليك الطراز المناسب، ما نوع العقار الذي تبحث له عن قفل؟",
  },
  featureQuestion: { role: "assistant", content: "شكراً لك! وما هو مستوى الميزات الذي تبحث عنه؟" },
  propertyOptions: [
    { label: "شقة", value: "appartement" },
    { label: "فيلا", value: "villa" },
    { label: "مكتب", value: "bureau" },
    { label: "سكن Airbnb / إيجار قصير المدة", value: "airbnb" },
  ],
  featureOptions: [
    { label: "بسيط — بصمة، رمز PIN، RFID", value: "simple" },
    { label: "مع كاميرا — اتصال فيديو أو مراقبة", value: "camera" },
    { label: "متقدم — Face ID، بصمة اليد", value: "avance" },
  ],
  propertyLabels: AR_PROPERTY_LABELS,
  recommend: arRecommend,
  faqs: [
    { test: /توافق|باب/i, answer: "يتناسب ARINILOCK مع معظم الأبواب الداخلية والخارجية القياسية المصنوعة من الخشب والمعدن. تواصل مع فريقنا قبل الشراء للتحقق من توافقه مع بابك: [اتصل بنا →](/contact)" },
    { test: /انقطاع|كهرباء/i, answer: "في حال انقطاع الكهرباء، يبقى القفل قابلاً للاستخدام عبر البصمة أو رمز PIN أو بطاقة RFID طالما البطاريات تعمل — لا حاجة لشبكة كهربائية. أما فتح القفل عن بعد عبر التطبيق فيتطلب اتصالاً بالإنترنت. وفي حال نفاد البطاريات كلياً، يتوفر دائماً مفتاح احتياطي عادي." },
    { test: /بطاري/i, answer: "تدوم 4 بطاريات القياسية حوالي 4 إلى 6 أشهر حسب الاستخدام. يمكنك رؤية مستوى البطارية المتبقي في أي وقت عبر التطبيق الذي ينبهك قبل نفادها." },
    { test: /توصيل|شحن|تسليم/i, answer: "التوصيل متوفر في جميع أنحاء المغرب، عادة خلال 2 إلى 4 أيام عمل. الدفع عند الاستلام متاح، وكذلك الدفع الإلكتروني (CMI، Visa، Mastercard)." },
    { test: /دفع|بطاقة بنكية/i, answer: "الدفع عند الاستلام متاح في جميع أنحاء المغرب — لا حاجة لبطاقة بنكية عند الطلب. كما يمكن الدفع الإلكتروني عبر CMI أو Visa أو Mastercard." },
    { test: /ضمان/i, answer: "يستفيد ARINILOCK من ضمان الشركة المصنعة لمدة سنتين." },
    { test: /تركيب/i, answer: "يتم التركيب من طرف تقنيينا المعتمدين، مجاناً وضمن الطلب — وليس تركيباً ذاتياً أبداً. يستغرق عادة أقل من 45 دقيقة." },
    { test: /تطبيق|تويا|tuya/i, answer: "يتيح لك تطبيق **Tuya** (iOS و Android) التحكم في القفل عن بعد، والاطلاع على سجل الدخول، وتلقي تنبيهات فورية — يتطلب اتصال WiFi وBluetooth لميزات التحكم عن بعد." },
    { test: /بصمة/i, answer: "يمكن تسجيل ما يصل إلى 150 بصمة إصبع، موزعة على 10 ملفات عائلية." },
    { test: /ضيوف|مؤقت|مستأجر/i, answer: "نعم، يتيح لك التطبيق إنشاء رموز PIN مؤقتة لضيوفك أو مساعدتك المنزلية أو مستأجريك — مفيد جداً للإيجارات قصيرة المدة." },
    { test: /إكسسوار|ملحقات/i, answer: "الملحقات المتوفرة: مجموعة بطاريات طويلة الأمد (89 درهم)، لوحة تشطيب إضافية (149 درهم)، مجموعة بطاقتي RFID (99 درهم). [زيارة المتجر →](/produits)" },
    { test: /اتصال|هاتف|واتساب|بريد|عنوان|ساعات العمل/i, answer: "يمكنكم التواصل معنا عبر +212 6 68 89 88 60 (واتساب) أو عبر البريد الإلكتروني support@arinilock.ma، من الإثنين إلى الجمعة من 9 صباحاً إلى 6 مساءً. [صفحة الاتصال →](/contact)" },
    { test: /سعر|ثمن|تكلفة/i, answer: "المقبض المتصل: ابتداءً من 1590 درهم. M1 Pro (مع كاميرا): 2590 درهم. i60 (Face ID + بصمة اليد): 3490 درهم. [زيارة المتجر →](/produits)" },
    { test: /تقييم|رأي العملاء/i, answer: "يحصل ARINILOCK على تقييم متوسط 4.8/5 من أصل 312 تقييماً موثقاً، منها 86% بخمس نجوم." },
  ],
  noMatch: "لم أفهم ذلك جيداً 🙂 يرجى اختيار أحد الخيارات أدناه، أو إعادة صياغة سؤالك.",
  restartRe: /من جديد|إعادة|منتج آخر|اختيار جديد/i,
  linkRe: /رابط|وجهني|خذني/i,
  linkAnswer: (link) => `إليك الرابط: [عرض →](${link})`,
  fallbackDone: "يمكنني مساعدتك بخصوص التوصيل أو الضمان أو التركيب أو التطبيق أو ملحقاتنا. يمكنك أيضاً الضغط على «البدء من جديد» لمراجعة توصياتنا، أو زيارة [متجرنا →](/produits).",
};

const LOCALES: Record<Locale, LocaleContent> = { fr: FR, en: EN, ar: AR };

// ── Property / feature keyword matching (multilingual) ─────────────────────

function matchPropertyKeyword(text: string): string | null {
  const t = text.toLowerCase();
  if (/\bappart|شقة/.test(t)) return "appartement";
  if (/\bvilla|riad|فيلا|رياض/.test(t)) return "villa";
  if (/\bbureau|office|مكتب/.test(t)) return "bureau";
  if (/airbnb|location.*(courte|saisonni)|gite|gîte|short.?term|rental|إيجار/.test(t)) return "airbnb";
  return null;
}

function matchFeatureKeyword(text: string): string | null {
  const t = text.toLowerCase();
  if (/avanc|face ?id|reconnaissance faciale|paume|advanced|palm|متقدم|بصمة اليد/.test(t)) return "avance";
  if (/cam[ée]ra|visiophone|surveillance|écran|ecran|camera|intercom|كاميرا/.test(t)) return "camera";
  if (/simple|empreinte|pin|rfid|basique|basic|fingerprint|بسيط|بصمة/.test(t)) return "simple";
  return null;
}

export function getOptionsForStage(stage: Stage, lang: Locale | null): ChatOption[] | null {
  if (stage === "language") return LANGUAGE_OPTIONS;
  if (!lang) return null;
  if (stage === "property") return LOCALES[lang].propertyOptions;
  if (stage === "feature") return LOCALES[lang].featureOptions;
  return null;
}

export function matchFAQ(text: string, lang: Locale = "fr"): string | null {
  const locale = LOCALES[lang];
  for (const faq of locale.faqs) {
    if (faq.test.test(text)) return faq.answer;
  }
  return null;
}

export type ReplyInput =
  | { type: "option"; value: string }
  | { type: "text"; value: string };

export interface ReplyContext {
  stage: Stage;
  lang: Locale | null;
  property: string | null;
  lastProduct: string | null;
}

export interface ReplyResult {
  message: Message;
  nextStage: Stage;
  nextLang: Locale | null;
  nextProperty: string | null;
  nextLastProduct: string | null;
}

export function computeReply(input: ReplyInput, ctx: ReplyContext): ReplyResult {
  if (ctx.stage === "language") {
    const langValue = input.type === "option" ? (input.value as Locale) : matchLanguageKeyword(input.value);
    if (langValue && LOCALES[langValue]) {
      return { message: LOCALES[langValue].welcome, nextStage: "property", nextLang: langValue, nextProperty: null, nextLastProduct: null };
    }
    return { message: LANGUAGE_PROMPT, nextStage: "language", nextLang: null, nextProperty: null, nextLastProduct: null };
  }

  const lang = ctx.lang ?? "fr";
  const locale = LOCALES[lang];

  if (ctx.stage === "property") {
    const propValue = input.type === "option" ? input.value : matchPropertyKeyword(input.value);
    if (propValue) {
      return { message: locale.featureQuestion, nextStage: "feature", nextLang: lang, nextProperty: propValue, nextLastProduct: null };
    }
    if (input.type === "text") {
      const faq = matchFAQ(input.value, lang);
      if (faq) {
        return {
          message: { role: "assistant", content: `${faq}\n\n${locale.welcome.content}` },
          nextStage: "property",
          nextLang: lang,
          nextProperty: null,
          nextLastProduct: null,
        };
      }
    }
    return { message: { role: "assistant", content: locale.noMatch }, nextStage: "property", nextLang: lang, nextProperty: null, nextLastProduct: null };
  }

  if (ctx.stage === "feature") {
    const featValue = input.type === "option" ? input.value : matchFeatureKeyword(input.value);
    if (featValue) {
      const rec = locale.recommend(featValue, ctx.property);
      return { message: { role: "assistant", content: rec.content }, nextStage: "done", nextLang: lang, nextProperty: ctx.property, nextLastProduct: rec.productLink };
    }
    if (input.type === "text") {
      const faq = matchFAQ(input.value, lang);
      if (faq) {
        return {
          message: { role: "assistant", content: `${faq}\n\n${locale.featureQuestion.content}` },
          nextStage: "feature",
          nextLang: lang,
          nextProperty: ctx.property,
          nextLastProduct: null,
        };
      }
    }
    return { message: { role: "assistant", content: locale.noMatch }, nextStage: "feature", nextLang: lang, nextProperty: ctx.property, nextLastProduct: null };
  }

  // stage === "done" — free chat: FAQ, restart, link requests, or fallback
  if (input.type === "text") {
    if (locale.restartRe.test(input.value)) {
      return { message: locale.welcome, nextStage: "property", nextLang: lang, nextProperty: null, nextLastProduct: null };
    }
    if (locale.linkRe.test(input.value)) {
      const link = ctx.lastProduct ?? "/produits";
      return {
        message: { role: "assistant", content: locale.linkAnswer(link) },
        nextStage: "done",
        nextLang: lang,
        nextProperty: ctx.property,
        nextLastProduct: ctx.lastProduct,
      };
    }
    const faq = matchFAQ(input.value, lang);
    if (faq) {
      return { message: { role: "assistant", content: faq }, nextStage: "done", nextLang: lang, nextProperty: ctx.property, nextLastProduct: ctx.lastProduct };
    }
  }

  return {
    message: { role: "assistant", content: locale.fallbackDone },
    nextStage: "done",
    nextLang: lang,
    nextProperty: ctx.property,
    nextLastProduct: ctx.lastProduct,
  };
}
