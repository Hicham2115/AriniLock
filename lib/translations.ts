import type { Locale } from "@/stores/language-store";

const fr = {
  dir: "ltr" as "ltr" | "rtl",
  keyBadges: [
    "Prix à partir de 1 590 DH",
    "Certifié ANRT · Agréé Maroc",
    "Livraison & installation offertes",
  ] as [string, string, string],
  nav: {
    shop: "Boutique",
    features: "Fonctionnalités",
    reviews: "Avis",
    faq: "FAQ",
    contact: "Contact",
    cart: "Panier",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    favorites: "Favoris",
    language: "Langue",
    menu: "Menu",
    mainMenu: "Menu principal",
    close: "Fermer",
    cartAria: (n: number) => `Panier (${n} article${n !== 1 ? "s" : ""})`,
    shopLink: "Notre boutique",
    categories: [
      {
        label: "Solutions pour bureau",
        subs: [
          "Contrôle d'accès employés",
          "Codes temporaires visiteurs",
          "Historique des accès",
        ],
      },
      {
        label: "Solutions pour Airbnb",
        subs: [
          "Codes d'accès temporaires",
          "Gestion à distance (app)",
          "Visiophone & caméra",
        ],
      },
      {
        label: "Solutions pour promoteurs",
        subs: [
          "Installation multi-logements",
          "Offres pour projets immobiliers",
          "Devis sur mesure",
        ],
      },
      {
        label: "Solutions pour hôtels",
        subs: ["Gestion multi-chambres", "Cartes RFID", "Contrôle centralisé"],
      },
      {
        label: "Solutions pour villas & apparts",
        subs: [
          "Visiophone & vision nocturne",
          "Serrure biométrique",
          "Sécurité résidentielle",
        ],
      },
    ] as { label: string; subs: [string, string, string] }[],
    links: [
      "Fonctionnalités",
      "Comment ça marche",
      "Avis clients",
      "FAQ",
      "Contact & Support",
    ] as string[],
  },
  hero: {
    buy: "Commander",
    discover: "Découvrir les fonctionnalités",
    trust: [
      "À partir de 1 590 DH",
      "Certifié ANRT",
      "Livraison & install. offertes",
    ] as [string, string, string],
    headline1: "Votre",
    headline2: "Porte.",
    tagline: "Réinventée.",
    editionLabel: "Édition de lancement · Maroc",
    countryLabel: "Maroc",
    brandLine: "Marque marocaine",
    brandSlug: "// ARINILOCK",
    bottomLine: "Maison connectée · Conçu pour le Maroc",
  },
  product: {
    addToCart: "Ajouter au panier",
    adding: "Ajout…",
    brand: "ARINILOCK",
    promo: "Promo",
    readMore: "Lire la suite",
    readLess: "Réduire",
    relatedTitle: "Vous aimerez aussi",
    finish: "Finition",
    reviews: "avis",
    addedMsg: "ajouté",
    currencyLabel: "MAD",
    accordion: [
      {
        value: "specs",
        trigger: "Spécifications techniques",
        content:
          "Empreintes : jusqu'à 150 · Codes PIN : jusqu'à 50 (6 chiffres) · Autonomie : 12-18 mois (4× AA) · Protocole : Bluetooth 5.0 + Wi-Fi (optionnel) · Certifications : IP65, EN 1634 · Dimensions : 245 × 70 × 28 mm",
      },
      {
        value: "certifications",
        trigger: "Certifications",
        content:
          "Produits certifiés CE (conformité européenne — sécurité électrique), RoHS (sans substances dangereuses) et ISO 9001 (système de management qualité). Agréés par l'ANRT.",
      },
      {
        value: "warranty",
        trigger: "Garantie & retours",
        content:
          "Garantie constructeur 2 ans sur tous les produits, couvrant tout défaut de fabrication. Retours acceptés sous 30 jours si le produit est dans son état d'origine. Assistance 7j/7 par WhatsApp.",
      },
    ],
    specsLabel: "Fiche technique",
    specsTitle: "Caractéris­tiques",
    infoLabel: "À savoir",
    infoTitle: "Infos pratiques",
    specs: [
      { label: "Méthodes d'accès", value: "Empreinte, PIN, App, RFID, Clé" },
      { label: "Empreintes max", value: "150" },
      { label: "Connectivité", value: "WiFi + Bluetooth" },
      { label: "Alimentation", value: "4 piles AA" },
      { label: "Autonomie", value: "12-18 mois" },
      { label: "Installation", value: "45 min" },
      { label: "Garantie", value: "2 ans" },
      { label: "Compatibilité", value: "Portes bois & métal standard" },
      { label: "Finitions", value: "Noir Mat · Argent · Or" },
      { label: "Alertes", value: "Intrusion en temps réel" },
    ],
  },
  cart: {
    title: "Votre panier",
    empty: "Votre panier est vide.",
    subtotal: "Sous-total",
    shippingNote: "Livraison calculée à l'étape suivante.",
    checkout: "Passer commande",
    remove: "Retirer cet article",
    decrease: "Réduire la quantité",
    increase: "Augmenter la quantité",
    loadError: "Impossible de charger votre panier. Veuillez réessayer.",
  },
  favorites: {
    title: "Favoris",
    empty: "Aucun produit sauvegardé.",
    add: "Ajouter aux favoris",
    remove: "Retirer des favoris",
    removeBtn: "Retirer",
    srDescription: "Vos produits ARINILOCK enregistrés",
  },
  breadcrumb: {
    home: "Accueil",
    shop: "Boutique",
  },
  legalPage: {
    badge: "Légal",
    privacyTitle: "Politique de confidentialité",
    termsTitle: "Conditions d'utilisation & CGV",
    backHome: "← Retour à l'accueil",
  },
  trust: {
    delivery: "Livraison 2–4 jours",
    deliverySub: "Partout au Maroc",
    warranty: "Garantie 2 ans",
    warrantySub: "Constructeur",
    install: "Installation < 45 min",
    installSub: "Installation rapide",
  },
  checkout: {
    title: "Finaliser la commande",
    subtitle: "Paiement à la livraison — aucune carte requise",
    summary: "Récapitulatif",
    qty: "Qté",
    freeShipping: "Gratuite",
    shipping: "Livraison",
    total: "Total",
    subtotal: "Sous-total",
    cod: "💳 Paiement à la livraison — vous payez uniquement à la réception de votre commande.",
    submit: "Confirmer la commande",
    submitting: "Envoi…",
    successTitle: "Commande confirmée",
    successRef: "Référence :",
    successNote:
      "Notre équipe vous contactera sous 24h pour confirmer la livraison.",
    backHome: "Retour à l'accueil",
    emptyCart: "Votre panier est vide.",
    seeProducts: "Voir les produits",
    fields: {
      personal: "Informations personnelles",
      delivery: "Adresse de livraison",
      name: "Nom complet",
      phone: "Téléphone",
      city: "Ville",
      cityPlaceholder: "Choisir une ville…",
      address: "Adresse complète",
      addressPlaceholder: "N° rue, quartier, immeuble…",
      notes: "Notes (optionnel)",
      notesPlaceholder: "Étage, code d'entrée, instructions particulières…",
      namePlaceholder: "Mohammed Alami",
      phonePlaceholder: "0612 345 678",
    },
    errors: {
      name: "Nom complet requis",
      phone: "Numéro marocain invalide (ex: 0612345678)",
      city: "Veuillez choisir une ville",
      address: "Adresse complète requise",
      failed: "Erreur lors de la commande. Veuillez réessayer.",
    },
  },
  errors: {
    loadProducts: "Impossible de charger les produits",
    loadProductsDesc: "Vérifiez votre connexion et réessayez.",
    loadError: "Une erreur est survenue lors du chargement des produits.",
    loadAccessories: "Impossible de charger les accessoires.",
    retry: "Réessayer",
    notFound: "Produit introuvable.",
    backToShop: "Retour à la boutique",
  },
  newsletter: {
    placeholder: "Votre adresse email",
    submit: "S'inscrire",
    submitting: "Envoi…",
  },
  contact: {
    heroPre: "ARINILOCK · Service client",
    heroTitle: "Parlons-nous.",
    heroSub:
      "Une question sur votre commande, l'installation ou le produit ? Notre équipe est là pour vous.",
    hours: "Disponible Lun–Ven · 9h–18h",
    address: "Bd Zoulikha Nasri, Corner Office N°19, Sidi Maarouf, Casablanca",
    channels: [
      {
        label: "WhatsApp",
        value: "+212 6 68 89 88 60",
        sub: "Réponse en moins d'1 heure",
      },
      {
        label: "Téléphone",
        value: "+212 6 68 89 88 60",
        sub: "Lun–Ven · 9h–18h",
      },
      {
        label: "Téléphone 2",
        value: "+212 6 60 64 81 95",
        sub: "Lun–Ven · 9h–18h",
      },
      {
        label: "Email",
        value: "support@arinilock.ma",
        sub: "Réponse sous 24h",
      },
    ],
    formPre: "Formulaire",
    formTitle: "Envoyer un\nmessage",
    labelName: "Nom complet",
    labelEmail: "Email",
    labelPhone: "Téléphone",
    optional: "(optionnel)",
    labelMessage: "Message",
    placeholderName: "Ahmed Benali",
    placeholderEmail: "ahmed@exemple.ma",
    placeholderPhone: "+212 6 68 89 88 60",
    placeholderMessage: "Décrivez votre demande…",
    sending: "Envoi en cours…",
    send: "Envoyer le message",
    addressTitle: "Adresse",
    faqTitle: "Questions fréquentes",
    faqLink: "Voir toutes les questions",
    whatsappTitle: "Chat WhatsApp",
    whatsappSub: "Réponse immédiate · 7j/7",
    errorRequired: "Veuillez remplir tous les champs obligatoires.",
    successMsg: "Message envoyé ! Nous vous répondrons sous 24h.",
    faqs: [
      {
        q: "Livrez-vous partout au Maroc ?",
        a: "Oui, dans toutes les villes avec paiement à la livraison.",
      },
      {
        q: "Comment installer ARINILOCK ?",
        a: "En moins de 45 minutes. Un guide illustré est inclus.",
      },
      {
        q: "Quelle est la durée de garantie ?",
        a: "2 ans constructeur couvrant tout défaut de fabrication.",
      },
    ],
  },
  marquee:
    "Livraison et installation gratuite ✦ Livraison et installation gratuite ✦ Livraison et installation gratuite ✦ Livraison et installation gratuite ✦",
  sections: {
    stats: {
      label: "01 — En chiffres",
      right: "Snapshot — Édition lancement",
      headline: ["Pourquoi nous", "choisir."] as [string, string],
      items: [
        {
          value: "150",
          unit: "",
          label: "Empreintes",
          sub: "enregistrées max",
        },
        { value: "7", unit: "", label: "Méthodes", sub: "d'accès" },
        {
          value: "12–18",
          unit: " mois",
          label: "Autonomie",
          sub: "de batterie",
        },
        { value: "2", unit: "ans", label: "Garantie", sub: "constructeur" },
      ],
      details: [
        {
          title: "EMPREINTE",
          body: "Jusqu'à 150 empreintes. Reconnaissance en moins d'une seconde. Jusqu'à 10 profils familiaux.",
        },
        {
          title: "CODE PIN",
          body: "Code à 6 chiffres. Modifiable depuis l'app. Codes temporaires pour invités.",
        },
        {
          title: "APPLICATION",
          body: "Contrôle à distance. Historique des accès. Notifications en temps réel.",
        },
        {
          title: "RFID",
          body: "Cartes NFC rapides. Accès instantané. Fonctionne hors connexion.",
        },
        {
          title: "CLÉ DE SECOURS",
          body: "Clé physique fournie avec chaque serrure. Toujours utilisable en cas de panne.",
        },
        {
          title: "FACE ID",
          body: "Reconnaissance faciale 3D. Anti-usurpation. Fonctionne de nuit grâce aux capteurs infrarouges.",
        },
        {
          title: "PAUME DE MAIN",
          body: "Lecture de paume sans contact. Hygiénique et ultra-rapide. Pratique quand vous avez les mains prises (courses, clés, enfant dans les bras).",
        },
      ],
    },
    features: {
      label: "03 — Fonctionnalités",
      right: "Sécurité nouvelle génération",
      headline: ["Sept", "façons", "d'entrer."] as [string, string, string],
      items: [
        {
          title: "Empreinte digitale",
          description:
            "Jusqu'à 150 empreintes enregistrées. Déverrouillage en moins d'une seconde, même avec les mains légèrement humides.",
        },
        {
          title: "Code PIN",
          description:
            "Code personnel à 6 chiffres, modifiable depuis l'app. Codes temporaires pour invités, femme de ménage ou livreur.",
        },
        {
          title: "Application mobile",
          description:
            "Verrouillez, déverrouillez et consultez l'historique complet de votre porte, où que vous soyez dans le monde.",
        },
        {
          title: "Carte RFID",
          description:
            "Badges NFC ultra-rapides pour un accès instantané. Compatible avec la plupart des cartes existantes. Fonctionne sans connexion internet.",
        },
        {
          title: "Clé physique de secours",
          description:
            "Une clé mécanique fournie avec chaque serrure — pour toute urgence : batterie épuisée, panne de téléphone ou coupure réseau.",
        },
        {
          title: "Face ID",
          description:
            "Reconnaissance faciale 3D pour un accès instantané et sécurisé. Fonctionne de jour comme de nuit grâce aux capteurs infrarouges.",
        },
        {
          title: "Paume de main",
          description:
            "Poignée intégrée ergonomique permettant d'ouvrir la porte d'un seul geste, même quand vous avez les mains prises.",
        },
      ],
    },
    howItWorks: {
      label: "04 — Mise en service",
      right: "Cycle : 0 → 1 en 45 min",
      headline: ["Installée en moins de", "45 minutes."] as [string, string],
      steps: [
        {
          title: "Installation par nos techniciens",
          description:
            "Nos techniciens certifiés posent la serrure directement sur votre porte existante et effectuent tous les réglages nécessaires, sans l'endommager.",
        },
        {
          title: "Connexion à l'application",
          description:
            "Votre serrure est associée à l'application Tuya via Bluetooth. Le technicien configure avec vous votre code PIN principal et vos premières empreintes.",
        },
        {
          title: "Ajoutez vos accès",
          description:
            "Créez ensuite des accès permanents ou temporaires pour votre famille, vos invités ou votre aide à domicile.",
        },
      ],
    },
    faq: {
      label: "06 — FAQ",
      right: "Questions fréquentes",
      headline: ["Tout ce", "qu'il faut", "savoir."] as [
        string,
        string,
        string,
      ],
      items: [
        {
          q: "ARINILOCK est-elle compatible avec toutes les portes ?",
          a: "ARINILOCK s'adapte à la majorité des portes intérieures et d'entrée standards en bois et métal. Contactez notre équipe avant l'achat pour vérifier la compatibilité avec votre porte.",
        },
        {
          q: "Que se passe-t-il en cas de coupure de courant ou de panne ?",
          a: "ARINILOCK fonctionne sur piles et reste utilisable (empreinte, code PIN, carte RFID) indépendamment du réseau électrique, tant que les piles sont chargées. Le déverrouillage à distance via l'application nécessite en revanche que la serrure soit connectée à internet (4G) : sans connexion, seuls les accès locaux restent disponibles. En cas de panne complète des piles, une clé physique de secours fournie avec votre serrure permet toujours d'ouvrir la porte.",
        },
        {
          q: "Combien de temps dure la batterie ?",
          a: "Avec un usage quotidien moyen, les 4 piles AA tiennent environ 12 à 18 mois. L'autonomie restante est visible à tout moment dans l'application, qui vous alerte avant épuisement.",
        },
        {
          q: "Puis-je l'installer moi-même ?",
          a: "Non, nous recommandons de laisser nos techniciens certifiés s'en charger : l'installation est gratuite, incluse avec chaque commande, et prend généralement moins de 45 minutes.",
        },
        {
          q: "Livrez-vous partout au Maroc ?",
          a: "Oui, nous livrons dans toutes les villes du Maroc, avec paiement à la livraison disponible. Le délai moyen est de 2 à 4 jours ouvrés.",
        },
      ],
    },
    offer: {
      label: "07 — Offre de lancement",
      right: "Offre limitée",
      discount: "-30%",
      headline: ["L'offre se", "termine dans"],
      unitLabels: ["Jours", "Heures", "Min", "Sec"] as [
        string,
        string,
        string,
        string,
      ],
      description:
        "Inscrivez-vous pour recevoir les offres exclusives en avant-première et être alerté à chaque baisse de prix.",
      details: [
        "À partir de 1 590 DH",
        "Certifié ANRT",
        "Livraison & install. offertes",
        "Paiement à la livraison",
      ],
      cta: "Commander maintenant",
      collapse: "Réduire",
    },
    reviews: {
      label: "05 — Avis clients",
      right: "Vérifié · 312 foyers",
      headline: ["Nos", "avis clients."],
      count: "312 avis vérifiés",
      testimonials: [
        {
          title: "Installation propre et rapide",
          body: "Le technicien est venu à l'heure convenue et a tout installé en moins d'une heure. L'empreinte digitale fonctionne bien et rapidement au quotidien.",
          author: "Salma B.",
          city: "Casablanca",
        },
        {
          title: "Service pro du début à la fin",
          body: "Commande passée un vendredi, technicien chez moi le lendemain matin. Installation soignée, explications claires sur l'application.",
          author: "Youssef A.",
          city: "Marrakech",
        },
        {
          title: "Plus tranquille pour fermer la porte",
          body: "La serrure se verrouille automatiquement, ça évite d'oublier de fermer à clé en sortant. Simple à utiliser pour toute la famille.",
          author: "Karim M.",
          city: "Rabat",
        },
        {
          title: "Pratique quand je ne suis pas chez moi",
          body: "Je peux ouvrir la porte à distance depuis l'application quand je suis en déplacement, pour laisser entrer quelqu'un de confiance.",
          author: "Nadia E.",
          city: "Agadir",
        },
        {
          title: "Utile pour la location courte durée",
          body: "Je gère un appartement en location courte durée. Je crée un code temporaire pour chaque locataire et je le supprime à son départ.",
          author: "Hassan T.",
          city: "Fès",
        },
        {
          title: "Simple même pour mes parents",
          body: "Mes parents craignaient que ce soit compliqué. En réalité l'empreinte digitale est plus simple à utiliser qu'une clé classique.",
          author: "Imane R.",
          city: "Tanger",
        },
      ],
    },
    footer: {
      tagline: "Maison connectée · Casablanca, Maroc",
      designedFor: "Conçu pour le foyer marocain",
      blurb:
        "La serrure connectée qui s'ouvre par empreinte, code ou smartphone. Sécurité intelligente, sans compromis sur le style.",
      taglineShort:
        "Des serrures intelligentes fiables et d'une qualité irréprochable, conçues pour durer.",
      serviceTitle: "ARINILOCK à votre service",
      helpLink: "Besoin d'aide ?",
      paymentLabel: "Moyens de paiement",
      legalLinks: {
        terms: "CGV & Conditions d'utilisation",
        privacy: "Politique de confidentialité",
      },
      legal: [
        "CGV",
        "Mentions légales",
        "Politique de confidentialité",
        "Cookies",
      ] as [string, string, string, string],
      selectionCol: {
        title: "Nos sélections",
        links: [
          { href: "/produits", label: "Collections" },
          { href: "/produits", label: "Promotions" },
          { href: "/produits", label: "Nouveautés" },
        ],
      },
      cols: [
        {
          title: "Produit",
          links: [
            { href: "#produit", label: "Poignée connectée" },
            { href: "#fonctionnalites", label: "Fonctionnalités" },
            { href: "#avis", label: "Avis clients" },
          ],
        },
        {
          title: "Aide",
          links: [
            { href: "#faq", label: "FAQ" },
            { href: "/conditions-utilisation", label: "Livraison & retours" },
            { href: "/conditions-utilisation", label: "Garantie" },
            { href: "/contact", label: "Contact" },
          ],
        },
      ],
      copyright: "ARINILOCK. Tous droits réservés.",
      payment: ["CMI", "Visa", "Mastercard", "Paiement livraison"],
      closing: ["La porte", "qui vous", "reconnaît."] as [
        string,
        string,
        string,
      ],
      closingCta: "Voir le produit",
    },
    photoBreak: {
      stat: "312",
      statLabel: "foyers",
      line: "font déjà confiance à ARINILOCK",
      cta: "Commander maintenant",
    },
    produits: {
      title: "Nos\nProduits.",
      collection: "Collection",
      models: (n: number) => `${n} modèle${n !== 1 ? "s" : ""}`,
      delivery: "Livraison partout au Maroc",
      trust: [
        { label: "Livraison partout au Maroc", sub: "2–4 jours ouvrés" },
        {
          label: "Paiement à la livraison",
          sub: "Disponible sur tout le Maroc",
        },
        { label: "Garantie 2 ans", sub: "Constructeur" },
        { label: "Installation", sub: "En moins de 45 minutes" },
      ],
      searchPlaceholder: "Rechercher…",
      colorLabel: "Couleur",
      reset: "Réinitialiser",
      noResults: "Aucun produit ne correspond à vos filtres.",
      priceRanges: [
        { label: "Tous les prix", min: 0, max: Infinity },
        { label: "Moins de 500 MAD", min: 0, max: 500 },
        { label: "500 – 1 500 MAD", min: 500, max: 1500 },
        { label: "1 500 – 3 000 MAD", min: 1500, max: 3000 },
        { label: "Plus de 3 000 MAD", min: 3000, max: Infinity },
      ],
    },
    bestSellers: {
      label: "Meilleures ventes",
      title: "Nos best-sellers",
      cta: "Voir tout",
    },
    showcase: {
      label: "04 — Le produit",
      right: "ARINILOCK — Édition Signature",
      productTitle: "Poignée connectée",
      rating: "4.8 / 5 —",
      launchBadge: "Offre de lancement",
      specs: [
        { label: "Connectivité", value: "Wifi + Bluetooth" },
        { label: "Alimentation", value: "4× piles AA · ~12-18 mois" },
        { label: "Matériaux", value: "Alliage de zinc, finition anti-traces" },
        { label: "Installation", value: "portes standards" },
        { label: "Garantie", value: "2 ans" },
      ],
    },
  },
  orderForm: {
    fields: {
      prenom: "Prénom",
      telephone: "Téléphone",
      adresse: "Adresse",
      ville: "Ville",
    },
    placeholders: {
      prenom: "Votre prénom",
      telephone: "06 XX XX XX XX",
      adresse: "Rue, numéro, quartier…",
      ville: "Choisissez votre ville",
    },
    errors: {
      prenomRequired: "Prénom obligatoire",
      telephoneRequired: "Numéro obligatoire",
      telephoneInvalid: "Numéro marocain invalide (ex: 06 XX XX XX XX)",
      adresseRequired: "Adresse obligatoire",
      villeRequired: "Veuillez choisir une ville",
    },
    submitLabel: (price: string) => `Terminez votre achat — ${price}`,
    submitting: "Envoi en cours…",
    successTitle: "Commande envoyée !",
    successDesc:
      "Notre équipe vous contactera sous 24h pour confirmer votre commande.",
    footer:
      "Paiement à la livraison · Livraison partout au Maroc · Garantie 2 ans",
    whatsappNewOrder: "Nouvelle commande",
    whatsappPrice: "Prix",
    whatsappFooter: "Commande passée via arinilock.ma",
  },
  m1pro: {
    heroBadge: "Visiophone · Reconnaissance Faciale · WiFi",
    heroDesc:
      'Serrure connectée premium avec écran HD 4,5", visiophone bidirectionnel et caméra vision nocturne. 6 modes de déverrouillage, gestion via Tuya Smart — idéale pour villas, riads et locations Airbnb haut de gamme.',
    heroRating: "389 avis vérifiés",
    heroCta: "Commander maintenant",
    heroCtaSecondary: "Voir les fonctionnalités",
    heroImageAlt: "Photo produit M1 Pro — Vue principale",
    heroTrust: [
      "Livraison 48h gratuite",
      "Garantie 2 ans",
      "Paiement à la livraison",
    ] as [string, string, string],
    ticker: [
      'Écran HD 4,5"',
      "Visiophone HD",
      "6 modes d'accès",
      "WiFi 2,4 GHz",
      "200 utilisateurs",
      "Garantie 2 ans",
    ],
    unlockSection: "02 — Méthodes d'accès",
    unlockTitle: "Six façons\nd'entrer.",
    unlockMethods: [
      {
        label: "Empreinte digitale",
        desc: "Ultra-rapide < 1 seconde · jusqu'à 100 empreintes",
      },
      {
        label: "Code PIN tactile",
        desc: "Anti-espionnage · code virtuel intégré",
      },
      {
        label: "Carte RFID",
        desc: "Accès instantané · sans connexion internet",
      },
      {
        label: "Application Tuya / Smart Life",
        desc: "WiFi 2,4 GHz · iOS & Android",
      },
      {
        label: "Mot de passe temporaire",
        desc: "Invités & locations courte durée",
      },
      {
        label: "Clé mécanique de secours",
        desc: "2 clés fournies · noyau classe C",
      },
    ],
    features: [
      {
        tag: "Visiophone",
        title: "Voyez.\nParlez.\nSans ouvrir.",
        body: "L'écran HD couleur 4,5\" intégré vous permet de visualiser vos visiteurs de jour comme de nuit. La caméra grand angle avec vision nocturne, le visiophone bidirectionnel et les notifications instantanées vous donnent un contrôle total — même à distance via Tuya / Smart Life.",
        detail: "Caméra HD grand angle · vision nocturne · capture automatique",
      },
      {
        tag: "Application",
        title: "Votre porte,\npartout dans\nle monde.",
        body: "Gérez jusqu'à 200 utilisateurs, consultez l'historique détaillé des accès, déverrouillez à distance et créez des codes temporaires pour vos visiteurs ou livreurs. Notifications push instantanées, album photo intégré et compatibilité Alexa & Google Home inclus.",
        detail: "Compatible Alexa · Google Home · Tuya Smart / Smart Life",
      },
      {
        tag: "Sécurité",
        title: "Alarmes.\nAlertés.\nProtégés.",
        body: "Le M1 Pro intègre un système d'alarmes multi-niveaux : alerte batterie faible, alarme anti-effraction en cas de forçage, blocage après 5 codes erronés consécutifs et code virtuel anti-espionnage. Le bouton anti-lock intérieur protège également les enfants.",
        detail: "Noyau classe C · alarme intrusion · anti-verrouillage enfants",
      },
    ],
    stats: [
      { l: "Modes de déverrouillage", suffix: "" },
      { l: "Utilisateurs max", suffix: "" },
      { l: "Écran HD intérieur", suffix: "po" },
      { l: "Garantie", suffix: " ans" },
    ],
    gallerySection: "06 — Galerie",
    galleryTitle: "Design\nd'exception.",
    specsSection: "07 — Spécifications",
    specsTitle: "Conçu\npour\ndurer.",
    specsDesc:
      "Chaque composant du M1 Pro est sélectionné pour garantir une fiabilité maximale sur le long terme.",
    specs: [
      { label: "Modèle", value: "ARINILOCK M1 Pro" },
      {
        label: "Matériau",
        value: "Alliage d'aluminium haute résistance · noir mat",
      },
      { label: "Dimensions", value: "380 × 75 mm" },
      { label: "Écran", value: '4,5" HD couleur' },
      { label: "Caméra", value: "HD grand angle · vision nocturne" },
      { label: "Noyau de serrure", value: "Classe C (haute sécurité)" },
      {
        label: "Épaisseur de porte",
        value: "40 à 120 mm · poignée réversible gauche/droite",
      },
      { label: "Capacité", value: "Jusqu'à 200 utilisateurs" },
      {
        label: "Méthodes d'accès",
        value: "Empreinte · PIN · RFID · App · Temporaire · Clé",
      },
      { label: "Alimentation", value: "4 piles AA + port Type-C de secours" },
      { label: "Température", value: "-15 °C à +60 °C" },
      { label: "Connectivité", value: "WiFi 2,4 GHz" },
      {
        label: "Application",
        value: "Tuya Smart / Smart Life (iOS & Android)",
      },
      { label: "Compatibilité vocale", value: "Amazon Alexa & Google Home" },
      { label: "Garantie", value: "2 ans pièces & service" },
      {
        label: "Livraison",
        value: "Express · partout au Maroc · installation incluse",
      },
    ],
    reviewsSection: "08 — Avis clients",
    reviewsTitle: "389 clients\nsatisfaits.",
    reviewsRating: "Note moyenne 4,9 / 5",
    reviews: [
      {
        name: "Youssef K.",
        city: "Casablanca",
        body: "L'écran LCD intérieur est net, la caméra HD reconnaît les visages même de nuit. J'ai essayé de le forcer pour tester — l'alarme s'est déclenchée en 3 secondes et j'ai reçu une notif immédiatement. Qualité vraiment sérieuse.",
      },
      {
        name: "Salma R.",
        city: "Marrakech",
        body: "J'ai trois riads sur Airbnb. L'équipe ARINILOCK a installé les trois serrures en une journée, tout était parfaitement configuré. Je génère les codes depuis l'app en 30 secondes. Le gain de temps est énorme.",
      },
      {
        name: "Mehdi A.",
        city: "Rabat",
        body: "La finition argent est magnifique sur ma porte en bois. Le mécanisme Push-Pull est très fluide, rien à voir avec ce qu'on trouve ailleurs. Ça fait 7 mois, aucun problème, aucun bug. Le SAV a répondu en 20 minutes quand j'avais une question.",
      },
    ],
    faqSection: "09 — FAQ",
    faqTitle: "Tout ce qu'il\nfaut savoir.",
    faqs: [
      {
        q: "Avec quels types de portes est-il compatible ?",
        a: "L'ARINILOCK M1 Pro est compatible avec les portes en bois, acier, aluminium, inox et portes blindées — simples ou doubles battants, d'une épaisseur de 40 à 120 mm. En cas de doute, notre équipe vérifie la compatibilité gratuitement sur photo avant l'achat.",
      },
      {
        q: "Que se passe-t-il si la batterie est vide ?",
        a: "L'application vous alerte automatiquement dès que la batterie passe sous 20 %. En cas d'urgence, un port Type-C de secours permet une charge rapide pour ouvrir la porte. Les 2 clés mécaniques fournies restent toujours disponibles.",
      },
      {
        q: "Comment fonctionne le visiophone à distance ?",
        a: "Via l'application Tuya Smart / Smart Life, vous recevez une notification photo dès que quelqu'un sonne. Vous pouvez voir, parler et déverrouiller depuis n'importe où dans le monde via WiFi 2,4 GHz.",
      },
      {
        q: "Puis-je créer des accès temporaires pour Airbnb ?",
        a: "Oui — c'est l'une des forces du M1 Pro. Créez des codes PIN à durée limitée pour vos locataires sans jamais partager votre code principal. Idéal pour les villas, riads et locations courte durée.",
      },
      {
        q: "L'installation est-elle incluse ?",
        a: "Oui. Notre équipe de techniciens qualifiés effectue l'installation à domicile partout au Maroc. Un kit de pose complet et une notice d'installation sont également fournis dans la boîte.",
      },
    ],
    orderSection: "10 — Commander",
    orderTitle: "Prêt à sécuriser votre porte ?",
    orderDesc:
      "Remplissez le formulaire et notre équipe vous contacte sous 24h pour confirmer votre commande. Paiement à la livraison, partout au Maroc.",
    orderBullets: [
      "Livraison gratuite partout au Maroc",
      "Installation incluse (Casablanca & Rabat)",
      "Garantie 2 ans — SAV réactif",
      "Paiement à la livraison",
    ],
    orderFormTitle:
      "Pour une commande rapide, veuillez remplir ce formulaire et nous vous contacterons plus tard !",
    ctaBadge:
      "Livraison gratuite · Installation incluse · Paiement à la livraison",
    ctaTitle: "Prêt à passer\nau niveau Pro ?",
    ctaDesc:
      "Commandez votre ARINILOCK M1 Pro et recevez-le sous 48h partout au Maroc — avec installation professionnelle offerte.",
    ctaButton: "Commander maintenant",
    ctaContact: "Nous contacter",
    stickyReviews: "389 avis",
    stickyButton: "Commander",
  },
  i60: {
    heroBadge: "Face 3D · Paume · Empreinte · Push-Pull",
    heroDesc:
      "Serrure connectée 7-en-1 avec reconnaissance faciale 3D, lecture de paume sans contact et design Push-Pull exclusif. Caméra HD nocturne, batterie lithium rechargeable USB-C — pour une sécurité maximale sans compromis.",
    heroRating: "256 avis vérifiés",
    heroCta: "Commander maintenant",
    heroCtaSecondary: "Comment ça marche ?",
    heroImageAlt: "Photo produit I 60 — Vue principale",
    heroTrust: [
      "Livraison 48h gratuite",
      "Garantie 2 ans",
      "Paiement à la livraison",
    ] as [string, string, string],
    ticker: [
      "Face 3D · Paume · Empreinte",
      "7 modes d'accès",
      "Caméra HD nocturne",
      "Push-Pull premium",
      "Cylindre classe C",
      "Garantie 2 ans",
    ],
    unlockSection: "02 — Méthodes d'accès",
    unlockTitle: "Sept façons\nd'entrer.",
    unlockMethods: [
      {
        label: "Reconnaissance faciale 3D",
        desc: "Anti-usurpation · ultra-rapide",
      },
      { label: "Paume de la main", desc: "Sans contact · hygiénique" },
      { label: "Empreinte digitale", desc: "< 0,5 seconde · haute précision" },
      {
        label: "Code PIN sécurisé",
        desc: "Anti-espionnage · codes temporaires",
      },
      { label: "Carte RFID / NFC", desc: "Accès instantané · incluses" },
      { label: "Application Tuya Smart", desc: "WiFi · iOS & Android" },
      { label: "Clé mécanique", desc: "2 clés · noyau classe C" },
    ],
    features: [
      {
        tag: "Biométrie",
        title: "Visage.\nPaume.\nEmpreinte.",
        body: "L'i60 intègre trois modes biométriques avancés : reconnaissance faciale 3D avec technologie anti-usurpation, lecture de paume sans contact, et empreinte digitale haute précision en moins de 0,5 seconde. Le tout sans jamais toucher de clé.",
        detail: "Reconnaissance faciale 3D · anti-usurpation · < 0,5s",
      },
      {
        tag: "Visiophone",
        title: "Voyez vos\nvisiteurs.\nSans ouvrir.",
        body: "La caméra HD grand angle avec vision nocturne infrarouge et l'écran LCD couleur intérieur vous permettent de voir et de parler à vos visiteurs en temps réel. Notifications instantanées sur votre smartphone et historique des accès dans l'app Tuya Smart.",
        detail: "Caméra HD · vision nocturne · sonnette vidéo connectée",
      },
      {
        tag: "Sécurité",
        title: "Verrouillage\nautomatique.\nAlertes immédiates.",
        body: "La serrure se verrouille automatiquement après chaque fermeture. Alarme anti-effraction, blocage après codes erronés, notification batterie faible et détection des tentatives d'ouverture forcée — vous êtes alerté instantanément sur votre téléphone.",
        detail: "Cylindre classe C · alarme intrusion · verrouillage auto",
      },
    ],
    stats: [
      { l: "Modes d'accès", suffix: "" },
      { l: "Déverrouillage", suffix: "s" },
      { l: "Empreintes max", suffix: "" },
      { l: "Garantie", suffix: " ans" },
    ],
    installSection: "06 — Installation",
    installTitle: "En 45\nminutes,\nc'est fait.",
    installDesc:
      "sans technicien, sans stress. Juste votre téléphone et le guide inclus.",
    steps: [
      {
        num: "01",
        title: "Retirez l'ancienne serrure",
        description:
          "Dévissez les quatre vis de fixation de votre porte existante — aucun outil spécial requis.",
      },
      {
        num: "02",
        title: "Posez le panneau extérieur",
        description:
          "Installez le panneau Push-Pull avec caméra et clavier tactile. La mortaise multipoints 6068 est fournie.",
      },
      {
        num: "03",
        title: "Fixez le panneau intérieur",
        description:
          "Glissez l'écran LCD intérieur et connectez les deux panneaux via le câble fourni dans le kit.",
      },
      {
        num: "04",
        title: "Configurez via Tuya Smart",
        description:
          "Connectez via WiFi, enregistrez vos données biométriques et invitez votre famille en quelques secondes.",
      },
    ],
    gallerySection: "07 — Galerie",
    galleryTitle: "Simple\net élégant.",
    specsSection: "08 — Spécifications",
    specsTitle: "Tout ce\nqu'il faut\nsavoir.",
    specs: [
      { label: "Modèle", value: "ARINILOCK i60" },
      {
        label: "Matériau",
        value:
          "Alliage d'aluminium haute densité · panneau acrylique anti-rayures",
      },
      {
        label: "Design",
        value: "Push-Pull moderne · réversible gauche/droite",
      },
      {
        label: "Méthodes d'accès",
        value: "Face 3D · Paume · Empreinte · PIN · RFID · App · Clé",
      },
      { label: "Écran intérieur", value: "LCD couleur 3,5 à 4 pouces" },
      { label: "Caméra", value: "Grand angle · vision nocturne infrarouge" },
      { label: "Batterie", value: "Lithium rechargeable 4 200–5 000 mAh" },
      { label: "Recharge urgence", value: "Port USB-C" },
      { label: "Connectivité", value: "WiFi via Tuya Smart (iOS & Android)" },
      { label: "Cylindre", value: "Classe C haute sécurité" },
      { label: "Épaisseur porte", value: "40 à 120 mm" },
      { label: "Mortaise", value: "Multipoints 6068 incluse" },
      {
        label: "Capacité",
        value: "100 empreintes · plusieurs profils faciaux",
      },
      { label: "Garantie", value: "2 ans constructeur" },
      {
        label: "Livraison",
        value: "Express · partout au Maroc · installation incluse",
      },
    ],
    reviewsSection: "09 — Avis clients",
    reviewsTitle: "256 clients\nsatisfaits.",
    reviewsRating: "Note moyenne 4,8 / 5",
    reviews: [
      {
        name: "Hamid B.",
        city: "Rabat",
        body: "La reconnaissance faciale 3D fonctionne dans le noir complet grâce aux capteurs infrarouges — testé et approuvé à 2h du matin. Le design Push-Pull est d'une fluidité remarquable, rien à voir avec les serrures classiques. Je recommande les yeux fermés.",
      },
      {
        name: "Nadia T.",
        city: "Casablanca",
        body: "Je rentre souvent les mains chargées de courses — la reconnaissance de paume sans contact est vraiment pratique. L'écran intérieur est clair, la caméra HD excellente. L'équipe d'installation était ponctuelle et très professionnelle.",
      },
      {
        name: "Karim O.",
        city: "Fès",
        body: "J'avais des doutes sur la solidité, mais l'alliage aluminium est vraiment costaud. La serrure se verrouille seule à chaque fermeture. Le service client m'a rappelé le jour même pour s'assurer que tout fonctionnait bien. Rare de voir ça.",
      },
    ],
    orderSection: "10 — Commander",
    orderTitle: "Prêt à sécuriser votre porte ?",
    orderDesc:
      "Remplissez le formulaire et notre équipe vous contacte sous 24h pour confirmer votre commande. Paiement à la livraison, partout au Maroc.",
    orderBullets: [
      "Livraison gratuite partout au Maroc",
      "Installation incluse (Casablanca & Rabat)",
      "Garantie 2 ans — SAV réactif",
      "Paiement à la livraison",
    ],
    orderFormTitle:
      "Pour une commande rapide, veuillez remplir ce formulaire et nous vous contacterons plus tard !",
    ctaBadge:
      "Livraison gratuite · Installation incluse · Paiement à la livraison",
    ctaTitle: "Simplifiez\nvotre quotidien.",
    ctaDesc:
      "Commandez votre ARINILOCK I 60 et recevez-le sous 48h partout au Maroc — avec installation professionnelle offerte.",
    ctaButton: "Commander maintenant",
    ctaContact: "Nous contacter",
    stickyReviews: "256 avis",
    stickyButton: "Commander",
  },
};

const en: typeof fr = {
  dir: "ltr",
  keyBadges: [
    "From 1 590 MAD",
    "ANRT certified · Morocco approved",
    "Free delivery & installation",
  ],
  nav: {
    shop: "Shop",
    features: "Features",
    reviews: "Reviews",
    faq: "FAQ",
    contact: "Contact",
    cart: "Cart",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    favorites: "Favorites",
    language: "Language",
    menu: "Menu",
    mainMenu: "Main menu",
    close: "Close",
    cartAria: (n: number) => `Cart (${n} item${n !== 1 ? "s" : ""})`,
    shopLink: "Our shop",
    categories: [
      {
        label: "Office solutions",
        subs: [
          "Employee access control",
          "Temporary visitor codes",
          "Access history",
        ],
      },
      {
        label: "Airbnb solutions",
        subs: [
          "Temporary access codes",
          "Remote management (app)",
          "Video doorbell & camera",
        ],
      },
      {
        label: "Developer solutions",
        subs: [
          "Multi-unit installation",
          "Real estate project offers",
          "Custom quotes",
        ],
      },
      {
        label: "Hotel solutions",
        subs: ["Multi-room management", "RFID cards", "Centralized control"],
      },
      {
        label: "Villa & apartment solutions",
        subs: [
          "Video doorbell & night vision",
          "Biometric lock",
          "Residential security",
        ],
      },
    ] as { label: string; subs: [string, string, string] }[],
    links: [
      "Features",
      "How it works",
      "Customer reviews",
      "FAQ",
      "Contact & Support",
    ] as string[],
  },
  hero: {
    buy: "Order now",
    discover: "Discover features",
    trust: ["From 1 590 MAD", "ANRT certified", "Free delivery & install"],
    headline1: "Your",
    headline2: "Door.",
    tagline: "Reinvented.",
    editionLabel: "Launch Edition · Morocco",
    countryLabel: "Morocco",
    brandLine: "Moroccan brand",
    brandSlug: "// ARINILOCK",
    bottomLine: "Connected home · Designed for Morocco",
  },
  product: {
    addToCart: "Add to cart",
    adding: "Adding…",
    brand: "ARINILOCK",
    promo: "Sale",
    readMore: "Read more",
    readLess: "Collapse",
    relatedTitle: "You may also like",
    finish: "Finish",
    reviews: "reviews",
    addedMsg: "added",
    currencyLabel: "MAD",
    accordion: [
      {
        value: "specs",
        trigger: "Technical specifications",
        content:
          "Fingerprints: up to 150 · PIN codes: up to 50 (6 digits) · Battery life: 12-18 months (4× AA) · Protocol: Bluetooth 5.0 + Wi-Fi (optional) · Certifications: IP65, EN 1634 · Dimensions: 245 × 70 × 28 mm",
      },
      {
        value: "certifications",
        trigger: "Certifications",
        content:
          "Every product is CE certified (European electrical safety compliance), RoHS certified (free of hazardous substances) and ISO 9001 certified (quality management system). Approved by ANRT.",
      },
      {
        value: "warranty",
        trigger: "Warranty & returns",
        content:
          "2-year manufacturer warranty on all products, covering all manufacturing defects. Returns accepted within 30 days if the product is in its original condition. Support 7 days a week via WhatsApp.",
      },
    ],
    specsLabel: "Technical sheet",
    specsTitle: "Specifica­tions",
    infoLabel: "Good to know",
    infoTitle: "Practical info",
    specs: [
      { label: "Access methods", value: "Fingerprint, PIN, App, RFID, Key" },
      { label: "Max fingerprints", value: "150" },
      { label: "Connectivity", value: "WiFi + Bluetooth" },
      { label: "Power", value: "4 AA batteries" },
      { label: "Battery life", value: "12-18 months" },
      { label: "Installation", value: "45 min" },
      { label: "Warranty", value: "2 years" },
      { label: "Compatibility", value: "Standard wood & metal doors" },
      { label: "Finishes", value: "Matte Black · Silver · Gold" },
      { label: "Alerts", value: "Real-time intrusion" },
    ],
  },
  cart: {
    title: "Your cart",
    empty: "Your cart is empty.",
    subtotal: "Subtotal",
    shippingNote: "Shipping calculated at next step.",
    checkout: "Checkout",
    remove: "Remove item",
    decrease: "Decrease quantity",
    increase: "Increase quantity",
    loadError: "Unable to load your cart. Please try again.",
  },
  favorites: {
    title: "Favorites",
    empty: "No saved products yet.",
    add: "Add to favorites",
    remove: "Remove from favorites",
    removeBtn: "Remove",
    srDescription: "Your saved ARINILOCK products",
  },
  breadcrumb: {
    home: "Home",
    shop: "Shop",
  },
  legalPage: {
    badge: "Legal",
    privacyTitle: "Privacy Policy",
    termsTitle: "Terms of Use & Conditions of Sale",
    backHome: "← Back to home",
  },
  trust: {
    delivery: "Delivery 2–4 days",
    deliverySub: "Across Morocco",
    warranty: "2-year warranty",
    warrantySub: "Manufacturer",
    install: "Install < 45 min",
    installSub: "Quick install",
  },
  checkout: {
    title: "Complete your order",
    subtitle: "Cash on delivery — no card required",
    summary: "Order summary",
    qty: "Qty",
    freeShipping: "Free",
    shipping: "Shipping",
    total: "Total",
    subtotal: "Subtotal",
    cod: "💳 Cash on delivery — you pay only upon receiving your order.",
    submit: "Confirm order",
    submitting: "Sending…",
    successTitle: "Order confirmed",
    successRef: "Reference:",
    successNote: "Our team will contact you within 24h to confirm delivery.",
    backHome: "Back to home",
    emptyCart: "Your cart is empty.",
    seeProducts: "View products",
    fields: {
      personal: "Personal information",
      delivery: "Delivery address",
      name: "Full name",
      phone: "Phone",
      city: "City",
      cityPlaceholder: "Choose a city…",
      address: "Full address",
      addressPlaceholder: "Street number, district, building…",
      notes: "Notes (optional)",
      notesPlaceholder: "Floor, door code, special instructions…",
      namePlaceholder: "Mohammed Alami",
      phonePlaceholder: "0612 345 678",
    },
    errors: {
      name: "Full name required",
      phone: "Invalid Moroccan number (e.g. 0612345678)",
      city: "Please choose a city",
      address: "Full address required",
      failed: "Order failed. Please try again.",
    },
  },
  errors: {
    loadProducts: "Unable to load products",
    loadProductsDesc: "Check your connection and try again.",
    loadError: "An error occurred while loading products.",
    loadAccessories: "Unable to load accessories.",
    retry: "Retry",
    notFound: "Product not found.",
    backToShop: "Back to shop",
  },
  newsletter: {
    placeholder: "Your email address",
    submit: "Subscribe",
    submitting: "Sending…",
  },
  contact: {
    heroPre: "ARINILOCK · Customer support",
    heroTitle: "Let's talk.",
    heroSub:
      "A question about your order, installation, or the product? Our team is here for you.",
    hours: "Available Mon–Fri · 9am–6pm",
    address: "Bd Zoulikha Nasri, Corner Office N°19, Sidi Maarouf, Casablanca",
    channels: [
      {
        label: "WhatsApp",
        value: "+212 6 68 89 88 60",
        sub: "Response in under 1 hour",
      },
      { label: "Phone", value: "+212 6 68 89 88 60", sub: "Mon–Fri · 9am–6pm" },
      {
        label: "Phone 2",
        value: "+212 6 60 64 81 95",
        sub: "Mon–Fri · 9am–6pm",
      },
      {
        label: "Email",
        value: "support@arinilock.ma",
        sub: "Response within 24h",
      },
    ],
    formPre: "Form",
    formTitle: "Send us a\nmessage",
    labelName: "Full name",
    labelEmail: "Email",
    labelPhone: "Phone",
    optional: "(optional)",
    labelMessage: "Message",
    placeholderName: "Ahmed Benali",
    placeholderEmail: "ahmed@example.ma",
    placeholderPhone: "+212 6 00 00 00 00",
    placeholderMessage: "Describe your request…",
    sending: "Sending…",
    send: "Send message",
    addressTitle: "Address",
    faqTitle: "Frequently asked questions",
    faqLink: "See all questions",
    whatsappTitle: "WhatsApp chat",
    whatsappSub: "Immediate reply · 7 days a week",
    errorRequired: "Please fill in all required fields.",
    successMsg: "Message sent! We'll reply within 24h.",
    faqs: [
      {
        q: "Do you deliver everywhere in Morocco?",
        a: "Yes, to all cities with cash on delivery.",
      },
      {
        q: "How do I install ARINILOCK?",
        a: "In under 45 minutes. An illustrated guide is included.",
      },
      {
        q: "What is the warranty period?",
        a: "2-year manufacturer warranty covering all defects.",
      },
    ],
  },
  marquee:
    "Free delivery & installation ✦ Free delivery & installation ✦ Free delivery & installation ✦ Free delivery & installation ✦",
  sections: {
    stats: {
      label: "01 — By the numbers",
      right: "Snapshot — Launch edition",
      headline: ["Why choose", "us."],
      items: [
        { value: "150", unit: "", label: "Fingerprints", sub: "max stored" },
        { value: "7", unit: "", label: "Methods", sub: "of access" },
        { value: "12–18", unit: " mo", label: "Battery", sub: "life" },
        { value: "2", unit: "yr", label: "Warranty", sub: "manufacturer" },
      ],
      details: [
        {
          title: "FINGERPRINT",
          body: "Up to 150 fingerprints. Recognition in under one second. Up to 10 family profiles.",
        },
        {
          title: "PIN CODE",
          body: "6-digit code. Changeable from the app. Temporary codes for guests.",
        },
        {
          title: "APP",
          body: "Remote control. Access history. Real-time notifications.",
        },
        {
          title: "RFID",
          body: "Ultra-fast NFC cards. Instant access. Works offline.",
        },
        {
          title: "BACKUP KEY",
          body: "Physical key included with every lock. Always works, even during an outage.",
        },
        {
          title: "FACE ID",
          body: "3D facial recognition. Anti-spoofing. Works at night via infrared sensors.",
        },
        {
          title: "PALM READER",
          body: "Contactless palm reading. Hygienic and ultra-fast. Handy when your hands are full (groceries, keys, a child in your arms).",
        },
      ],
    },
    features: {
      label: "03 — Features",
      right: "Next-generation security",
      headline: ["Seven", "ways", "to enter."],
      items: [
        {
          title: "Fingerprint",
          description:
            "Up to 150 stored fingerprints. Unlocks in under a second, even with slightly damp hands.",
        },
        {
          title: "PIN code",
          description:
            "Personal 6-digit code, changeable from the app. Temporary codes for guests, cleaners or delivery staff.",
        },
        {
          title: "Mobile app",
          description:
            "Lock, unlock, and view your full door history from anywhere in the world.",
        },
        {
          title: "RFID card",
          description:
            "Ultra-fast NFC badges for instant access. Works with most existing cards. No internet required.",
        },
        {
          title: "Physical key",
          description:
            "A mechanical key shipped with every lock — for any emergency: dead battery, lost phone, or network outage.",
        },
        {
          title: "Face ID",
          description:
            "3D facial recognition for instant, secure access. Works day and night thanks to infrared sensors.",
        },
        {
          title: "Palm Recognition",
          description:
            "Integrated ergonomic handle — open the door in one gesture, even when your hands are full.",
        },
      ],
    },
    howItWorks: {
      label: "04 — Setup",
      right: "0 → 1 in 45 min",
      headline: ["Installed in under", "45 minutes."],
      steps: [
        {
          title: "Installed by our technicians",
          description:
            "Our certified technicians mount the lock directly on your existing door and make all the necessary adjustments, without damaging it.",
        },
        {
          title: "App pairing",
          description:
            "Your lock is paired with the Tuya app via Bluetooth. The technician sets up your main PIN code and first fingerprints with you.",
        },
        {
          title: "Add your access",
          description:
            "Then create permanent or temporary access for your family, guests, or household staff.",
        },
      ],
    },
    faq: {
      label: "06 — FAQ",
      right: "Common questions",
      headline: ["Everything", "you need", "to know."],
      items: [
        {
          q: "Is ARINILOCK compatible with all doors?",
          a: "ARINILOCK fits most standard interior and entrance doors in wood and metal. Contact our team before purchase to check compatibility with your door.",
        },
        {
          q: "What happens in a power cut or failure?",
          a: "ARINILOCK runs on batteries and stays usable (fingerprint, PIN code, RFID card) independently of the electrical grid, as long as the batteries have charge. Remote unlocking via the app, however, requires the lock to be connected to the internet (4G) — without a connection, only local access methods work. In a complete battery failure, the physical backup key included with your lock always opens the door.",
        },
        {
          q: "How long does the battery last?",
          a: "With average daily use, the 4 AA batteries last about 12 to 18 months. Remaining battery life is visible at any time in the app, which alerts you before they run out.",
        },
        {
          q: "Can I install it myself?",
          a: "No, we recommend leaving it to our certified technicians: installation is free, included with every order, and generally takes under 45 minutes.",
        },
        {
          q: "Do you deliver across Morocco?",
          a: "Yes, we deliver to all cities in Morocco, with cash on delivery available. Average lead time is 2 to 4 business days.",
        },
      ],
    },
    offer: {
      label: "07 — Launch offer",
      right: "Limited offer",
      discount: "-30%",
      headline: ["This offer", "ends in"],
      unitLabels: ["Days", "Hours", "Min", "Sec"],
      description:
        "Subscribe to receive exclusive offers first and be notified of every price drop.",
      details: [
        "From 1 590 MAD",
        "ANRT certified",
        "Free delivery & install",
        "Cash on delivery",
      ],
      cta: "Order now",
      collapse: "Collapse",
    },
    reviews: {
      label: "05 — Customer reviews",
      right: "Verified · 312 households",
      headline: ["Our customer", "reviews."],
      count: "312 verified reviews",
      testimonials: [
        {
          title: "Clean, quick installation",
          body: "The technician arrived on time and had everything installed in under an hour. The fingerprint reader is fast and reliable day to day.",
          author: "Salma B.",
          city: "Casablanca",
        },
        {
          title: "Professional from start to finish",
          body: "Ordered on a Friday, technician at my door the next morning. Tidy installation and clear explanations about the app.",
          author: "Youssef A.",
          city: "Marrakech",
        },
        {
          title: "One less thing to worry about",
          body: "The lock locks itself automatically, so I no longer worry about forgetting to lock up. Easy for the whole family to use.",
          author: "Karim M.",
          city: "Rabat",
        },
        {
          title: "Useful when I'm not home",
          body: "I can unlock the door remotely from the app when I'm away, to let someone I trust in.",
          author: "Nadia E.",
          city: "Agadir",
        },
        {
          title: "Good fit for short-term rental",
          body: "I manage a short-term rental apartment. I create a temporary code for each guest and delete it once they leave.",
          author: "Hassan T.",
          city: "Fès",
        },
        {
          title: "Simple even for my parents",
          body: "My parents were worried it would be complicated. In practice the fingerprint is simpler to use than a regular key.",
          author: "Imane R.",
          city: "Tanger",
        },
      ],
    },
    footer: {
      tagline: "Connected home · Casablanca, Morocco",
      designedFor: "Designed for the Moroccan home",
      blurb:
        "The connected lock that opens by fingerprint, code or smartphone. Smart security without compromising on style.",
      taglineShort:
        "Reliable smart locks built with genuinely great quality, made to last.",
      serviceTitle: "ARINILOCK at your service",
      helpLink: "Need help?",
      paymentLabel: "Payment methods",
      legalLinks: {
        terms: "Terms & Conditions of use",
        privacy: "Privacy policy",
      },
      legal: ["Terms", "Legal notice", "Privacy policy", "Cookies"] as [
        string,
        string,
        string,
        string,
      ],
      selectionCol: {
        title: "Our picks",
        links: [
          { href: "/produits", label: "Collections" },
          { href: "/produits", label: "Promotions" },
          { href: "/produits", label: "New arrivals" },
        ],
      },
      cols: [
        {
          title: "Product",
          links: [
            { href: "#produit", label: "Smart handle" },
            { href: "#fonctionnalites", label: "Features" },
            { href: "#avis", label: "Customer reviews" },
          ],
        },
        {
          title: "Help",
          links: [
            { href: "#faq", label: "FAQ" },
            { href: "/conditions-utilisation", label: "Shipping & returns" },
            { href: "/conditions-utilisation", label: "Warranty" },
            { href: "/contact", label: "Contact" },
          ],
        },
      ],
      copyright: "ARINILOCK. All rights reserved.",
      payment: ["CMI", "Visa", "Mastercard", "Cash on delivery"],
      closing: ["The door", "that knows", "you."] as [string, string, string],
      closingCta: "View the product",
    },
    photoBreak: {
      stat: "312",
      statLabel: "homes",
      line: "already trust ARINILOCK",
      cta: "Order now",
    },
    produits: {
      title: "Our\nProducts.",
      collection: "Collection",
      models: (n: number) => `${n} model${n !== 1 ? "s" : ""}`,
      delivery: "Delivery across Morocco",
      trust: [
        { label: "Delivery across Morocco", sub: "2–4 business days" },
        { label: "Cash on delivery", sub: "Available everywhere in Morocco" },
        { label: "2-year warranty", sub: "Manufacturer" },
        { label: "Quick installation", sub: "In under 45 minutes" },
      ],
      searchPlaceholder: "Search…",
      colorLabel: "Color",
      reset: "Reset",
      noResults: "No products match your filters.",
      priceRanges: [
        { label: "All prices", min: 0, max: Infinity },
        { label: "Under 500 MAD", min: 0, max: 500 },
        { label: "500 – 1,500 MAD", min: 500, max: 1500 },
        { label: "1,500 – 3,000 MAD", min: 1500, max: 3000 },
        { label: "Over 3,000 MAD", min: 3000, max: Infinity },
      ],
    },
    bestSellers: {
      label: "Best sellers",
      title: "Our best sellers",
      cta: "View all",
    },
    showcase: {
      label: "04 — The product",
      right: "ARINILOCK — Signature Edition",
      productTitle: "Smart door lock",
      rating: "4.8 / 5 —",
      launchBadge: "Launch offer",
      specs: [
        { label: "Connectivity", value: "WiFi + Bluetooth" },
        { label: "Power", value: "4× AA batteries · ~12-18 months" },
        {
          label: "Materials",
          value: "Zinc alloy, fingerprint-resistant finish",
        },
        { label: "Installation", value: "Standard doors" },
        { label: "Warranty", value: "2 years" },
      ],
    },
  },
  orderForm: {
    fields: {
      prenom: "First name",
      telephone: "Phone",
      adresse: "Address",
      ville: "City",
    },
    placeholders: {
      prenom: "Your first name",
      telephone: "06 XX XX XX XX",
      adresse: "Street, number, district…",
      ville: "Choose your city",
    },
    errors: {
      prenomRequired: "First name required",
      telephoneRequired: "Phone number required",
      telephoneInvalid: "Invalid Moroccan number (e.g. 06 XX XX XX XX)",
      adresseRequired: "Address required",
      villeRequired: "Please choose a city",
    },
    submitLabel: (price: string) => `Complete your purchase — ${price}`,
    submitting: "Sending…",
    successTitle: "Order sent!",
    successDesc:
      "Our team will contact you within 24 hours to confirm your order.",
    footer: "Cash on delivery · Delivery across Morocco · 2-year warranty",
    whatsappNewOrder: "New order",
    whatsappPrice: "Price",
    whatsappFooter: "Order placed via arinilock.ma",
  },
  m1pro: {
    heroBadge: "Video Doorbell · Face Recognition · WiFi",
    heroDesc:
      'Premium smart lock with 4.5" HD screen, two-way video doorbell and night-vision camera. 6 unlock modes, managed via Tuya Smart — ideal for villas, riads and high-end Airbnb rentals.',
    heroRating: "389 verified reviews",
    heroCta: "Order now",
    heroCtaSecondary: "Explore features",
    heroImageAlt: "M1 Pro product photo — main view",
    heroTrust: ["Free 48h delivery", "2-year warranty", "Cash on delivery"] as [
      string,
      string,
      string,
    ],
    ticker: [
      '4.5" HD Screen',
      "HD Doorbell",
      "6 access modes",
      "Wi-Fi 2.4 GHz",
      "200 users",
      "2-year warranty",
    ],
    unlockSection: "02 — Access methods",
    unlockTitle: "Six ways\nto enter.",
    unlockMethods: [
      {
        label: "Fingerprint",
        desc: "Ultra-fast < 1 second · up to 100 fingerprints",
      },
      {
        label: "Touchscreen PIN code",
        desc: "Anti-peeping · built-in virtual code",
      },
      { label: "RFID card", desc: "Instant access · no internet required" },
      { label: "Tuya / Smart Life app", desc: "Wi-Fi 2.4 GHz · iOS & Android" },
      { label: "Temporary password", desc: "Guests & short-term rentals" },
      {
        label: "Backup mechanical key",
        desc: "2 keys included · Class C lock cylinder",
      },
    ],
    features: [
      {
        tag: "Doorbell",
        title: "See.\nSpeak.\nWithout opening.",
        body: 'The built-in 4.5" HD colour screen lets you see visitors day and night. The wide-angle night-vision camera, two-way doorbell and instant notifications give you full control — even remotely via Tuya / Smart Life.',
        detail: "Wide-angle HD camera · night vision · automatic capture",
      },
      {
        tag: "App",
        title: "Your door,\nanywhere in\nthe world.",
        body: "Manage up to 200 users, review detailed access history, unlock remotely and create temporary codes for visitors or delivery drivers. Instant push notifications, built-in photo album and Alexa & Google Home compatibility included.",
        detail: "Compatible with Alexa · Google Home · Tuya Smart / Smart Life",
      },
      {
        tag: "Security",
        title: "Alarms.\nAlerted.\nProtected.",
        body: "The M1 Pro features a multi-level alarm system: low battery alert, anti-tamper alarm on forced entry, lockout after 5 wrong codes and virtual anti-spy code. The interior anti-lock button also protects children.",
        detail: "Class C cylinder · intrusion alarm · child lock",
      },
    ],
    stats: [
      { l: "Unlock modes", suffix: "" },
      { l: "Max users", suffix: "" },
      { l: "HD screen", suffix: "in" },
      { l: "Warranty", suffix: " yrs" },
    ],
    gallerySection: "06 — Gallery",
    galleryTitle: "Exceptional\ndesign.",
    specsSection: "07 — Specifications",
    specsTitle: "Built\nto\nlast.",
    specsDesc:
      "Every component of the M1 Pro is selected to guarantee maximum long-term reliability.",
    specs: [
      { label: "Model", value: "ARINILOCK M1 Pro" },
      {
        label: "Material",
        value: "High-resistance aluminium alloy · matte black",
      },
      { label: "Dimensions", value: "380 × 75 mm" },
      { label: "Screen", value: '4.5" HD colour' },
      { label: "Camera", value: "Wide-angle HD · night vision" },
      { label: "Lock cylinder", value: "Class C (high security)" },
      {
        label: "Door thickness",
        value: "40–120 mm · reversible left/right handle",
      },
      { label: "Capacity", value: "Up to 200 users" },
      {
        label: "Access methods",
        value: "Fingerprint · PIN · RFID · App · Temp code · Key",
      },
      { label: "Power", value: "4× AA batteries + Type-C emergency port" },
      { label: "Temperature", value: "-15 °C to +60 °C" },
      { label: "Connectivity", value: "Wi-Fi 2.4 GHz" },
      { label: "App", value: "Tuya Smart / Smart Life (iOS & Android)" },
      { label: "Voice assistant", value: "Amazon Alexa & Google Home" },
      { label: "Warranty", value: "2 years parts & service" },
      {
        label: "Delivery",
        value: "Express · across Morocco · installation included",
      },
    ],
    reviewsSection: "08 — Customer reviews",
    reviewsTitle: "389 happy\ncustomers.",
    reviewsRating: "Average rating 4.9 / 5",
    reviews: [
      {
        name: "Youssef K.",
        city: "Casablanca",
        body: "The LCD interior screen is sharp and the HD camera picks up faces clearly even at night. I tested the tamper resistance myself — the alarm triggered in 3 seconds and I got a notification instantly. This is seriously built hardware.",
      },
      {
        name: "Salma R.",
        city: "Marrakech",
        body: "I have three riads on Airbnb. The ARINILOCK team installed all three locks in one day, everything perfectly configured. I generate codes from the app in 30 seconds. The time saving is huge.",
      },
      {
        name: "Mehdi A.",
        city: "Rabat",
        body: "The silver finish looks stunning on my wooden door. The Push-Pull mechanism is incredibly smooth — nothing like standard locks. 7 months in, zero issues, zero bugs. Support replied in 20 minutes when I had a question.",
      },
    ],
    faqSection: "09 — FAQ",
    faqTitle: "Everything\nyou need to know.",
    faqs: [
      {
        q: "Which door types is it compatible with?",
        a: "The ARINILOCK M1 Pro is compatible with wooden, steel, aluminium, stainless steel and armoured doors — single or double leaf, 40–120 mm thick. If in doubt, our team will check compatibility for free via photo before purchase.",
      },
      {
        q: "What happens if the battery dies?",
        a: "The app automatically alerts you when the battery drops below 20%. In an emergency, a Type-C emergency port allows a quick charge to open the door. The 2 mechanical keys provided are always available.",
      },
      {
        q: "How does the remote doorbell work?",
        a: "Via the Tuya Smart / Smart Life app, you receive a photo notification every time someone rings. You can see, talk and unlock from anywhere in the world via Wi-Fi 2.4 GHz.",
      },
      {
        q: "Can I create temporary codes for Airbnb?",
        a: "Yes — this is one of the M1 Pro's strengths. Create time-limited PIN codes for your tenants without ever sharing your main code. Ideal for villas, riads and short-term rentals.",
      },
      {
        q: "Is installation included?",
        a: "Yes. Our team of qualified technicians installs at home across Morocco. A complete installation kit and instruction manual are also included in the box.",
      },
    ],
    orderSection: "10 — Order",
    orderTitle: "Ready to secure your door?",
    orderDesc:
      "Fill in the form and our team will contact you within 24 hours to confirm your order. Cash on delivery, across Morocco.",
    orderBullets: [
      "Free delivery across Morocco",
      "Installation included (Casablanca & Rabat)",
      "2-year warranty — responsive after-sales",
      "Cash on delivery",
    ],
    orderFormTitle:
      "For a quick order, fill in this form and we'll contact you shortly!",
    ctaBadge: "Free delivery · Installation included · Cash on delivery",
    ctaTitle: "Ready to go\nPro?",
    ctaDesc:
      "Order your ARINILOCK M1 Pro and receive it within 48 hours anywhere in Morocco — with professional installation included.",
    ctaButton: "Order now",
    ctaContact: "Contact us",
    stickyReviews: "389 reviews",
    stickyButton: "Order",
  },
  i60: {
    heroBadge: "Face 3D · Palm · Fingerprint · Push-Pull",
    heroDesc:
      "7-in-1 smart lock with 3D facial recognition, contactless palm reading and exclusive Push-Pull design. HD night camera, rechargeable lithium battery USB-C — maximum security without compromise.",
    heroRating: "256 verified reviews",
    heroCta: "Order now",
    heroCtaSecondary: "How does it work?",
    heroImageAlt: "I 60 product photo — main view",
    heroTrust: ["Free 48h delivery", "2-year warranty", "Cash on delivery"] as [
      string,
      string,
      string,
    ],
    ticker: [
      "Face 3D · Palm · Fingerprint",
      "7 access modes",
      "HD night camera",
      "Push-Pull premium",
      "Class C cylinder",
      "2-year warranty",
    ],
    unlockSection: "02 — Access methods",
    unlockTitle: "Seven ways\nto enter.",
    unlockMethods: [
      { label: "3D Face recognition", desc: "Anti-spoofing · ultra-fast" },
      { label: "Palm reading", desc: "Contactless · hygienic" },
      { label: "Fingerprint", desc: "< 0.5 second · high precision" },
      { label: "Secure PIN code", desc: "Anti-peeping · temporary codes" },
      { label: "RFID / NFC card", desc: "Instant access · included" },
      { label: "Tuya Smart app", desc: "Wi-Fi · iOS & Android" },
      { label: "Mechanical key", desc: "2 keys · Class C cylinder" },
    ],
    features: [
      {
        tag: "Biometrics",
        title: "Face.\nPalm.\nFingerprint.",
        body: "The i60 integrates three advanced biometric modes: 3D facial recognition with anti-spoofing technology, contactless palm reading, and high-precision fingerprint in under 0.5 seconds. All without ever touching a key.",
        detail: "3D face recognition · anti-spoofing · < 0.5s",
      },
      {
        tag: "Doorbell",
        title: "See your\nvisitors.\nWithout opening.",
        body: "The wide-angle HD camera with infrared night vision and the interior colour LCD screen let you see and talk to visitors in real time. Instant smartphone notifications and access history in the Tuya Smart app.",
        detail: "HD camera · night vision · connected video doorbell",
      },
      {
        tag: "Security",
        title: "Automatic\nlocking.\nImmediate alerts.",
        body: "The lock automatically locks after each closing. Anti-tamper alarm, lockout after wrong codes, low battery notification and detection of forced opening attempts — you are instantly alerted on your phone.",
        detail: "Class C cylinder · intrusion alarm · auto-lock",
      },
    ],
    stats: [
      { l: "Access modes", suffix: "" },
      { l: "Unlock speed", suffix: "s" },
      { l: "Max prints", suffix: "" },
      { l: "Warranty", suffix: " yrs" },
    ],
    installSection: "06 — Installation",
    installTitle: "In 45\nminutes,\nyou're done.",
    installDesc:
      "No technician needed, no stress. Just your phone and the included guide.",
    steps: [
      {
        num: "01",
        title: "Remove the old lock",
        description:
          "Unscrew the four mounting screws from your existing door — no special tools required.",
      },
      {
        num: "02",
        title: "Fit the outer panel",
        description:
          "Install the Push-Pull panel with camera and touchpad. The 6068 multipoint mortice is included.",
      },
      {
        num: "03",
        title: "Attach the inner panel",
        description:
          "Slide in the interior LCD screen and connect both panels via the cable included in the kit.",
      },
      {
        num: "04",
        title: "Set up via Tuya Smart",
        description:
          "Connect via Wi-Fi, register your biometric data and invite your family in seconds.",
      },
    ],
    gallerySection: "07 — Gallery",
    galleryTitle: "Simple\nand elegant.",
    specsSection: "08 — Specifications",
    specsTitle: "Everything\nyou need\nto know.",
    specs: [
      { label: "Model", value: "ARINILOCK i60" },
      {
        label: "Material",
        value: "High-density aluminium alloy · scratch-resistant acrylic panel",
      },
      { label: "Design", value: "Modern Push-Pull · reversible left/right" },
      {
        label: "Access methods",
        value: "Face 3D · Palm · Fingerprint · PIN · RFID · App · Key",
      },
      { label: "Interior screen", value: "Colour LCD 3.5–4 inches" },
      { label: "Camera", value: "Wide-angle · infrared night vision" },
      { label: "Battery", value: "Rechargeable lithium 4,200–5,000 mAh" },
      { label: "Emergency charge", value: "USB-C port" },
      { label: "Connectivity", value: "Wi-Fi via Tuya Smart (iOS & Android)" },
      { label: "Cylinder", value: "Class C high security" },
      { label: "Door thickness", value: "40–120 mm" },
      { label: "Mortice", value: "6068 multipoint included" },
      {
        label: "Capacity",
        value: "100 fingerprints · multiple facial profiles",
      },
      { label: "Warranty", value: "2-year manufacturer warranty" },
      {
        label: "Delivery",
        value: "Express · across Morocco · installation included",
      },
    ],
    reviewsSection: "09 — Customer reviews",
    reviewsTitle: "256 happy\ncustomers.",
    reviewsRating: "Average rating 4.8 / 5",
    reviews: [
      {
        name: "Hamid B.",
        city: "Rabat",
        body: "The 3D facial recognition works in complete darkness thanks to the infrared sensors — tested at 2am, works perfectly. The Push-Pull mechanism is remarkably smooth. I'd recommend this to anyone without hesitation.",
      },
      {
        name: "Nadia T.",
        city: "Casablanca",
        body: "I often come home with both hands full of shopping — the contactless palm recognition is incredibly practical. The interior screen is bright and clear. The installation team was punctual and very professional.",
      },
      {
        name: "Karim O.",
        city: "Fès",
        body: "I had doubts about the durability but the aluminium alloy is rock solid. The lock auto-secures on every close. The support team called me back the same day to make sure everything was working. Rarely see that level of service.",
      },
    ],
    orderSection: "10 — Order",
    orderTitle: "Ready to secure your door?",
    orderDesc:
      "Fill in the form and our team will contact you within 24 hours to confirm your order. Cash on delivery, across Morocco.",
    orderBullets: [
      "Free delivery across Morocco",
      "Installation included (Casablanca & Rabat)",
      "2-year warranty — responsive after-sales",
      "Cash on delivery",
    ],
    orderFormTitle:
      "For a quick order, fill in this form and we'll contact you shortly!",
    ctaBadge: "Free delivery · Installation included · Cash on delivery",
    ctaTitle: "Simplify\nyour daily life.",
    ctaDesc:
      "Order your ARINILOCK I 60 and receive it within 48 hours anywhere in Morocco — with professional installation included.",
    ctaButton: "Order now",
    ctaContact: "Contact us",
    stickyReviews: "256 reviews",
    stickyButton: "Order",
  },
};

const ar: typeof fr = {
  dir: "rtl",
  keyBadges: [
    "ابتداءً من ⁦1 590⁩ درهم",
    "مرخص من طرف ANRT",
    "توصيل وتركيب مجاني",
  ],
  nav: {
    shop: "المتجر",
    features: "المميزات",
    reviews: "التقييمات",
    faq: "الأسئلة الشائعة",
    contact: "اتصل بنا",
    cart: "السلة",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    favorites: "المفضلة",
    language: "اللغة",
    menu: "القائمة",
    mainMenu: "القائمة الرئيسية",
    close: "إغلاق",
    cartAria: (n: number) => `السلة (${n} منتج)`,
    shopLink: "متجرنا",
    categories: [
      {
        label: "حلول للمكاتب",
        subs: ["التحكم في دخول الموظفين", "رموز مؤقتة للزوار", "سجل الدخول"],
      },
      {
        label: "حلول للإيجار القصير",
        subs: [
          "رموز دخول مؤقتة",
          "الإدارة عن بعد (التطبيق)",
          "جرس الباب بالفيديو والكاميرا",
        ],
      },
      {
        label: "حلول للمطورين العقاريين",
        subs: [
          "تركيب لعدة وحدات",
          "عروض للمشاريع العقارية",
          "عروض أسعار مخصصة",
        ],
      },
      {
        label: "حلول للفنادق",
        subs: ["إدارة عدة غرف", "بطاقات RFID", "تحكم مركزي"],
      },
      {
        label: "حلول للفلل والشقق",
        subs: ["جرس فيديو ورؤية ليلية", "قفل بصمة", "أمان سكني"],
      },
    ] as { label: string; subs: [string, string, string] }[],
    links: [
      "المميزات",
      "كيف يعمل",
      "آراء العملاء",
      "الأسئلة الشائعة",
      "التواصل والدعم",
    ] as string[],
  },
  hero: {
    buy: "اطلب الآن",
    discover: "اكتشف المميزات",
    trust: ["من ⁦1 590⁩ درهم", "معتمد ANRT", "توصيل وتركيب مجاني"],
    headline1: "بابك",
    headline2: "أُعيد",
    tagline: "ابتكاره.",
    editionLabel: "إصدار الإطلاق · المغرب",
    countryLabel: "المغرب",
    brandLine: "علامة مغربية",
    brandSlug: "// ARINILOCK",
    bottomLine: "المنزل المتصل · مصنوع للمغرب",
  },
  product: {
    addToCart: "أضف إلى السلة",
    adding: "جارٍ الإضافة…",
    brand: "ARINILOCK",
    promo: "تخفيض",
    readMore: "اقرأ المزيد",
    readLess: "طي النص",
    relatedTitle: "قد يعجبك أيضًا",
    finish: "اللمسة",
    reviews: "تقييم",
    addedMsg: "أُضيف",
    currencyLabel: "درهم",
    accordion: [
      {
        value: "specs",
        trigger: "المواصفات التقنية",
        content:
          "البصمات: حتى 150 · أرقام PIN: حتى 50 (6 أرقام) · عمر البطارية: 12-18 شهرًا (4× AA) · البروتوكول: Bluetooth 5.0 + Wi-Fi (اختياري) · الشهادات: IP65, EN 1634 · الأبعاد: 245 × 70 × 28 ملم",
      },
      {
        value: "certifications",
        trigger: "الشهادات",
        content:
          "جميع منتجاتنا حاصلة على شهادة CE (مطابقة أوروبية — السلامة الكهربائية)، وشهادة RoHS (خالية من المواد الخطرة)، وشهادة ISO 9001 (نظام إدارة الجودة). كما أنها معتمدة من طرف ANRT.",
      },
      {
        value: "warranty",
        trigger: "الضمان والإرجاع",
        content:
          "ضمان البائع لمدة سنتين على جميع المنتجات يشمل جميع عيوب التصنيع. الإرجاع مقبول خلال 30 يومًا إذا كان المنتج في حالته الأصلية. دعم 7 أيام في الأسبوع عبر واتساب.",
      },
    ],
    specsLabel: "الورقة التقنية",
    specsTitle: "المواصفات",
    infoLabel: "معلومات مفيدة",
    infoTitle: "معلومات عملية",
    specs: [
      { label: "طرق الوصول", value: "بصمة، رمز سري، تطبيق، RFID، مفتاح" },
      { label: "الحد الأقصى للبصمات", value: "150" },
      { label: "الاتصال", value: "واي فاي + بلوتوث" },
      { label: "الطاقة", value: "4 بطاريات" },
      { label: "عمر البطارية", value: "12-18 شهرًا" },
      { label: "التركيب", value: "45 دقيقة" },
      { label: "الضمان", value: "سنتان" },
      { label: "التوافق", value: "أبواب خشب ومعدن " },
      { label: "التشطيبات", value: "أسود · فضي · ذهبي" },
      { label: "التنبيهات", value: "اقتحام في الوقت الفعلي" },
    ],
  },
  cart: {
    title: "سلتك",
    empty: "سلتك فارغة.",
    subtotal: "المجموع الفرعي",
    shippingNote: "يُحسب الشحن في الخطوة التالية.",
    checkout: "إتمام الطلب",
    remove: "إزالة المنتج",
    decrease: "تقليل الكمية",
    increase: "زيادة الكمية",
    loadError: "تعذّر تحميل سلتك. يرجى المحاولة مجددًا.",
  },
  favorites: {
    title: "المفضلة",
    empty: "لا توجد منتجات محفوظة بعد.",
    add: "أضف إلى المفضلة",
    remove: "إزالة من المفضلة",
    removeBtn: "إزالة",
    srDescription: "منتجات ARINILOCK المحفوظة لديك",
  },
  breadcrumb: {
    home: "الرئيسية",
    shop: "المتجر",
  },
  legalPage: {
    badge: "قانوني",
    privacyTitle: "سياسة الخصوصية",
    termsTitle: "شروط الاستخدام والشروط العامة للبيع",
    backHome: "→ العودة إلى الرئيسية",
  },
  trust: {
    delivery: "التوصيل 2–4 أيام",
    deliverySub: "في جميع أنحاء المغرب",
    warranty: "ضمان سنتين",
    warrantySub: " البائع",
    install: "التركيب < 45 دقيقة",
    installSub: "تركيب سريع",
  },
  checkout: {
    title: "إتمام الطلب",
    subtitle: "الدفع عند الاستلام — بدون بطاقة",
    summary: "ملخص الطلب",
    qty: "الكمية",
    freeShipping: "مجاني",
    shipping: "الشحن",
    total: "الإجمالي",
    subtotal: "المجموع الفرعي",
    cod: "💳 الدفع عند الاستلام — تدفع فقط عند استلام طلبك.",
    submit: "تأكيد الطلب",
    submitting: "جارٍ الإرسال…",
    successTitle: "تم تأكيد الطلب",
    successRef: "المرجع:",
    successNote: "سيتصل بك فريقنا خلال 24 ساعة لتأكيد التوصيل.",
    backHome: "العودة للرئيسية",
    emptyCart: "سلتك فارغة.",
    seeProducts: "تصفح المنتجات",
    fields: {
      personal: "المعلومات الشخصية",
      delivery: "عنوان التوصيل",
      name: "الاسم الكامل",
      phone: "الهاتف",
      city: "المدينة",
      cityPlaceholder: "اختر مدينة…",
      address: "العنوان الكامل",
      addressPlaceholder: "رقم الشارع، الحي، العمارة…",
      notes: "ملاحظات (اختياري)",
      notesPlaceholder: "الطابق، رمز الباب، تعليمات خاصة…",
      namePlaceholder: "محمد العلمي",
      phonePlaceholder: "0612 345 678",
    },
    errors: {
      name: "الاسم الكامل مطلوب",
      phone: "رقم مغربي غير صالح (مثال: 0612345678)",
      city: "يرجى اختيار مدينة",
      address: "العنوان الكامل مطلوب",
      failed: "فشل الطلب. يرجى المحاولة مرة أخرى.",
    },
  },
  errors: {
    loadProducts: "تعذّر تحميل المنتجات",
    loadProductsDesc: "تحقق من اتصالك وحاول مجددًا.",
    loadError: "حدث خطأ أثناء تحميل المنتجات.",
    loadAccessories: "تعذّر تحميل الملحقات.",
    retry: "إعادة المحاولة",
    notFound: "المنتج غير موجود.",
    backToShop: "العودة للمتجر",
  },
  newsletter: {
    placeholder: "بريدك الإلكتروني",
    submit: "اشترك",
    submitting: "جارٍ الإرسال…",
  },
  contact: {
    heroPre: "·خدمة العملاء ARINILOCK ",
    heroTitle: "تحدّث إلينا.",
    heroSub:
      "هل لديك أي استفسار حول طلبك أو عملية التركيب أو أحد منتجاتنا؟ فريقنا هنا لمساعدتك والإجابة عن جميع أسئلتك.",
    hours: "متاح الاثنين–الجمعة · 9h–18h",
    address: "Bd Zoulikha Nasri, Corner Office N°19, Sidi Maarouf, Casablanca",
    channels: [
      {
        label: "واتساب",
        value: "+212 6 68 89 88 60",
        sub: "رد في أقل من ساعة",
      },
      {
        label: "الهاتف",
        value: "+212 6 68 89 88 60",
        sub: "الاثنين–الجمعة · 9h–18h",
      },
      {
        label: "الهاتف 2",
        value: "+212 6 60 64 81 95",
        sub: "الاثنين–الجمعة · 9h–18h",
      },
      {
        label: "البريد",
        value: "support@arinilock.ma",
        sub: "رد خلال 24 ساعة",
      },
    ],
    formPre: "استمارة",
    formTitle: "أرسل لنا\nرسالة",
    labelName: "الاسم الكامل",
    labelEmail: "البريد الإلكتروني",
    labelPhone: "الهاتف",
    optional: "(اختياري)",
    labelMessage: "الرسالة",
    placeholderName: "محمد العلمي",
    placeholderEmail: "ahmed@example.ma",
    placeholderPhone: "+212 6 68 89 88 60",
    placeholderMessage: "صِف طلبك…",
    sending: "جارٍ الإرسال…",
    send: "ارسل الرسال",
    addressTitle: "العنوان",
    faqTitle: "الأسئلة الشائعة",
    faqLink: "عرض جميع الأسئلة",
    whatsappTitle: "دردشة واتساب",
    whatsappSub: "رد فوري · 7 أيام في الأسبوع",
    errorRequired: "يرجى ملء جميع الحقول الإلزامية.",
    successMsg: "تم إرسال رسالتك! سنرد عليك خلال 24 ساعة.",
    faqs: [
      {
        q: "هل توصّلون لجميع أنحاء المغرب؟",
        a: "نعم، لجميع المدن مع الدفع عند الاستلام.",
      },
      { q: "كيف أركّب ARINILOCK؟", a: "في أقل من 45 دقيقة. يُرفق دليل مصوّر." },
      {
        q: "ما مدة الضمان؟",
        a: "ضمان البائع لمدة سنتين يشمل جميع عيوب التصنيع.",
      },
    ],
  },
  marquee:
    "توصيل وتركيب مجاني ✦ توصيل وتركيب مجاني ✦ توصيل وتركيب مجاني ✦ توصيل وتركيب مجاني ✦",
  sections: {
    stats: {
      label: "01 — بالأرقام",
      right: "لمحة — إصدار الإطلاق",
      headline: ["لماذا", "تختارنا."],
      items: [
        { value: "150", unit: "", label: "بصمة", sub: "كحد اقصى" },
        { value: "7", unit: "", label: "طرق", sub: "للدخول" },
        { value: "12–18", unit: " شهرًا", label: "عمر", sub: "البطارية" },
        { value: "2", unit: "سنتان", label: "ضمان", sub: "البائع" },
      ],
      details: [
        {
          title: "البصمة",
          body: "تخزين حتى 150 بصمة. تعرف في أقل من ثانية. حتى 10 ملفات عائلية.",
        },
        {
          title: "الرمز السري",
          body: "رمز من 6 أرقام. قابل للتغيير من التطبيق. رموز مؤقتة للضيوف.",
        },
        { title: "التطبيق", body: "تحكم عن بُعد. سجل الدخول. إشعارات فورية." },
        {
          title: "RFID",
          body: "بطاقات NFC سريعة. وصول فوري. يعمل دون إنترنت.",
        },
        {
          title: "مفتاح احتياطي",
          body: "مفتاح مادي مرفق مع كل قفل. يعمل دائمًا حتى عند انقطاع البطارية.",
        },
        {
          title: "التعرف على الوجه",
          body: "تعرف ثلاثي الأبعاد على الوجه. مضاد للانتحال. يعمل ليلاً عبر أجهزة الاستشعار.",
        },
        {
          title: "راحة اليد",
          body: "قراءة راحة اليد دون تلامس. صحي وسريع. مفيد حين تكون يداك مشغولتين (أكياس، مفاتيح، طفل بين ذراعيك).",
        },
      ],
    },
    features: {
      label: "03 — المميزات",
      right: "أمان الجيل القادم",
      headline: ["سبع", "طرق", "للدخول."],
      items: [
        {
          title: "البصمة الرقمية",
          description:
            "تخزين حتى 150 بصمة. فتح في أقل من ثانية حتى مع اليدين المبللتين قليلًا.",
        },
        {
          title: "الرمز السري",
          description:
            "رمز شخصي من 6 أرقام، قابل للتغيير من التطبيق. رموز مؤقتة للضيوف ولعمال المنزل.",
        },
        {
          title: "التطبيق المحمول",
          description:
            "اغلق أو افتح الباب واطّلع على السجل الكامل من أي مكان في العالم.",
        },
        {
          title: "بطاقة RFID",
          description:
            "بطاقات NFC فائقة السرعة للوصول الفوري. تعمل بدون إنترنت.",
        },
        {
          title: "مفتاح احتياطي",
          description:
            "مفتاح ميكانيكي مرفق مع كل قفل — في حالة أي عطل طارئ: بطارية فارغة أو هاتف معطل أو انقطاع الشبكة.",
        },
        {
          title: " التعرف على الوجه (Face ID)",
          description:
            "التعرف على الوجه ثلاثي الأبعاد للوصول الفوري والآمن. يعمل ليلًا ونهارًا بفضل أجهزة الاستشعار بالأشعة تحت الحمراء.",
        },
        {
          title: "راحة اليد",
          description:
            "تصميم يناسب راحة اليد، يتيح فتح الباب بسهولة بحركة واحدة حتى عندما تكون يداك مشغولتين.",
        },
      ],
    },
    howItWorks: {
      label: "04 — التركيب",
      right: "من 0 إلى 1 في 45 دقيقة",
      headline: ["يُركَّب في أقل من", "45 دقيقة."],
      steps: [
        {
          title: " التركيب بواسطة فريقنا المتخصص",
          description:
            "يقوم فريقنا المتخصص بتركيب القفل مباشرةً على بابك الحالي وضبط جميع الإعدادات اللازمة، دون إتلاف الباب.",
        },
        {
          title: "الاتصال بالتطبيق",
          description:
            "يتصل قفلك بتطبيق Tuya عبر البلوتوث. يقوم التقني بضبط رمزك السري الرئيسي وأول بصماتك معك.",
        },
        {
          title: "أضف صلاحيات الدخول",
          description:
            "أنشئ بعد ذلك صلاحيات دائمة أو مؤقتة لعائلتك وضيوفك و لعمال المنزل.",
        },
      ],
    },
    faq: {
      label: "06 — الأسئلة الشائعة",
      right: "أسئلة شائعة",
      headline: ["كل ما", "تحتاج", "معرفته."],
      items: [
        {
          q: "هل ARINILOCK متوافق مع جميع الأبواب؟",
          a: "تتوافق أقفال ARINILOCK مع معظم الأبواب الخشبية والمعدنية. إذا كنت غير متأكد من توافقها مع بابك، تواصل مع فريقنا قبل الشراء وسنساعدك في اختيار الموديل المناسب.",
        },
        {
          q: "ماذا يحدث عند انقطاع الكهرباء أو العطل؟",
          a: "تعمل أقفال ARINILOCK بالبطارية، لذلك يمكنك فتح الباب بالبصمة أو الرمز السري أو بطاقة RFID حتى في حال انقطاع الكهرباء، ما دامت البطارية مشحونة. أما التحكم وفتح القفل عن بُعد عبر التطبيق، فيتطلب اتصال القفل بالإنترنت. وفي حال نفاد البطارية بالكامل، يمكنك دائمًا استخدام المفتاح الاحتياطي المرفق لفتح الباب بأمان.",
        },
        {
          q: "كم تدوم البطارية؟",
          a: "تعمل أقفال ARINILOCK بأربع بطاريات AA، وتدوم عادةً من 12 إلى 18 شهرًا حسب معدل الاستخدام. كما يمكنك متابعة مستوى شحن البطارية في أي وقت عبر التطبيق، مع إشعارات تنبيه تُرسل إليك قبل نفادها، لتتمكن من استبدالها في الوقت المناسب.",
        },
        {
          q: "هل يمكنني التركيب بنفسي؟",
          a: "ننصح بأن يتم تركيب قفل ARINILOCK بواسطة فريقنا المختص لضمان أفضل أداء وأعلى مستوى من الأمان. خدمة التركيب مجانية ومشمولة مع كل طلب، ولا تستغرق عادةً أكثر من 45 دقيقة.",
        },
        {
          q: "هل توصّلون إلى جميع مدن المغرب؟",
          a: "نعم، نوفر خدمة التوصيل إلى جميع مدن المغرب، مع إمكانية الدفع عند الاستلام. تصل طلباتكم عادةً خلال 2 إلى 4 أيام عمل.",
        },
      ],
    },
    offer: {
      label: "07 — عرض الإطلاق",
      right: "عرض محدود",
      discount: "-30%",
      headline: ["ينتهي العرض", "خلال"],
      unitLabels: ["يوم", "ساعة", "دقيقة", "ثانية"],
      description:
        "اشترك لتصل إليك العروض الحصرية أولًا وتُخطَر بكل تخفيض في الأسعار.",
      details: [
        "من ⁦1 590⁩ درهم",
        "معتمد ANRT",
        "توصيل وتركيب مجاني",
        "الدفع عند الاستلام",
      ],
      cta: "اطلب الآن",
      collapse: "تصغير",
    },
    reviews: {
      label: "05 — آراء العملاء",
      right: "موثّق · 312 منزل",
      headline: ["آراء", "عملائنا."],
      count: "312 تقييم موثّق",
      testimonials: [
        {
          title: "تركيب نظيف وسريع",
          body: "وصل الفني في الموعد المحدد وأنهى التركيب في أقل من ساعة. البصمة تعمل بسرعة وموثوقية في الاستخدام اليومي.",
          author: "سلمى ب.",
          city: "الدار البيضاء",
        },
        {
          title: "خدمة احترافية من البداية للنهاية",
          body: "طلبت يوم الجمعة، وكان الفني عندي في صباح اليوم التالي. تركيب مرتب وشرح واضح حول التطبيق.",
          author: "يوسف .",
          city: "مراكش",
        },
        {
          title: "أقل قلقًا بشأن إغلاق الباب",
          body: "يُقفل الباب تلقائيًا، فلم أعد أقلق من نسيان إغلاقه عند الخروج. سهل الاستخدام لكل أفراد العائلة.",
          author: "كريم .",
          city: "الرباط",
        },
        {
          title: "مفيد عندما لا أكون في المنزل",
          body: "يمكنني فتح الباب عن بُعد من التطبيق عندما أكون خارج المنزل، للسماح بدخول شخص أثق به.",
          author: "نادية .",
          city: "أكادير",
        },
        {
          title: "مناسب للإيجار القصير",
          body: "أدير شقة للإيجار القصير. أنشئ رمزًا مؤقتًا لكل مستأجر وأحذفه بعد مغادرته.",
          author: "حسن .",
          city: "فاس",
        },
        {
          title: "سهل حتى لوالديّ",
          body: "كان والداي قلقين من أن يكون الأمر معقدًا. في الواقع البصمة أسهل استخدامًا من المفتاح التقليدي.",
          author: "إيمان .",
          city: "طنجة",
        },
      ],
    },
    footer: {
      tagline: "المنزل المتصل · الدار البيضاء، المغرب",
      designedFor: "مصمم للمنزل المغربي",
      blurb:
        "القفل الذكي الذي يفتح بالبصمة أو الرمز أو الهاتف. أمان ذكي دون المساس بالأناقة.",
      taglineShort: "منتجاتنا موثوقة وبجودة عالية، ومصممة لتدوم طويلاً.",
      serviceTitle: "ARINILOCK في خدمتك",
      helpLink: "هل تحتاج مساعدة؟",
      paymentLabel: "وسائل الدفع",
      legalLinks: {
        terms: "الشروط العامة وشروط الاستخدام",
        privacy: "سياسة الخصوصية",
      },
      legal: [
        "الشروط العامة",
        "الإشعار القانوني",
        "سياسة الخصوصية",
        "الكوكيز",
      ] as [string, string, string, string],
      selectionCol: {
        title: "اختياراتنا",
        links: [
          { href: "/produits", label: "المجموعات" },
          { href: "/produits", label: "العروض" },
          { href: "/produits", label: "الجديد" },
        ],
      },
      cols: [
        {
          title: "المنتج",
          links: [
            { href: "#produit", label: "المقبض الذكي" },
            { href: "#fonctionnalites", label: "المميزات" },
            { href: "#avis", label: "آراء العملاء" },
          ],
        },
        {
          title: "المساعدة",
          links: [
            { href: "#faq", label: "الأسئلة الشائعة" },
            { href: "/conditions-utilisation", label: "الشحن والإرجاع" },
            { href: "/conditions-utilisation", label: "الضمان" },
            { href: "/contact", label: "تواصل معنا" },
          ],
        },
      ],
      copyright: "ARINILOCK. جميع الحقوق محفوظة.",
      payment: ["CMI", "Visa", "Mastercard", "الدفع عند الاستلام"],
      closing: ["الباب", "الذي", "يعرفك."] as [string, string, string],
      closingCta: "عرض المنتج",
    },
    photoBreak: {
      stat: "312",
      statLabel: "منزلًا",
      line: "يثق بـ ARINILOCK",
      cta: "اطلب الآن",
    },
    produits: {
      title: "منتجاتنا.",
      collection: "المجموعة",
      models: (n: number) => `${n} طراز`,
      delivery: "توصيل في جميع أنحاء المغرب",
      trust: [
        { label: "توصيل في جميع أنحاء المغرب", sub: "2–4 أيام عمل" },
        { label: "الدفع عند الاستلام", sub: "متاح في كل المغرب" },
        { label: "ضمان سنتين", sub: "البائع" },
        { label: "تركيب", sub: "في أقل من 45 دقيقة" },
      ],
      searchPlaceholder: "بحث…",
      colorLabel: "اللون",
      reset: "إعادة الضبط",
      noResults: "لا توجد منتجات تطابق عوامل التصفية.",
      priceRanges: [
        { label: "كل الأسعار", min: 0, max: Infinity },
        { label: "أقل من 500 درهم", min: 0, max: 500 },
        { label: "500 – 1500 درهم", min: 500, max: 1500 },
        { label: "1500 – 3000 درهم", min: 1500, max: 3000 },
        { label: "أكثر من 3000 درهم", min: 3000, max: Infinity },
      ],
    },
    bestSellers: {
      label: "منتجاتنا المميزة",
      title: "الأكثر مبيعاً",
      cta: "عرض الكل",
    },
    showcase: {
      label: "04 — المنتج",
      right: "ARINILOCK — الإصدار المميز",
      productTitle: "مقبض ذكي",
      rating: "4.8 / 5 —",
      launchBadge: "عرض الإطلاق",
      specs: [
        { label: "الاتصال", value: "واي فاي + بلوتوث" },
        { label: "الطاقة", value: "4 بطاريات · ~12-18 شهرًا" },
        { label: "المواد", value: "سبيكة الزنك، تشطيب مقاوم للبصمات" },
        { label: "التركيب", value: "أبواب قياسية" },
        { label: "الضمان", value: "سنتان" },
      ],
    },
  },
  orderForm: {
    fields: {
      prenom: "الاسم",
      telephone: "الهاتف",
      adresse: "العنوان",
      ville: "المدينة",
    },
    placeholders: {
      prenom: "اسمك الأول",
      telephone: "06 XX XX XX XX",
      adresse: "الشارع، الرقم، الحي…",
      ville: "اختر مدينتك",
    },
    errors: {
      prenomRequired: "الاسم مطلوب",
      telephoneRequired: "رقم الهاتف مطلوب",
      telephoneInvalid: "رقم مغربي غير صالح (مثال: 06 XX XX XX XX)",
      adresseRequired: "العنوان مطلوب",
      villeRequired: "يرجى اختيار مدينة",
    },
    submitLabel: (price: string) => `أتمّ طلبك — ${price}`,
    submitting: "جارٍ الإرسال…",
    successTitle: "تم إرسال الطلب!",
    successDesc: "سيتصل بك فريقنا خلال 24 ساعة لتأكيد طلبك.",
    footer: "الدفع عند الاستلام · توصيل في جميع أنحاء المغرب · ضمان سنتان",
    whatsappNewOrder: "طلب جديد",
    whatsappPrice: "السعر",
    whatsappFooter: "تم إرسال الطلب عبر arinilock.ma",
  },
  m1pro: {
    heroBadge: "كاميرا الباب · التعرف على الوجه · واي فاي",
    heroDesc:
      "قفل ذكي متميز بشاشة HD ملونة 4.5 بوصة، جرس باب بالفيديو ثنائي الاتجاه وكاميرا رؤية ليلية. 6 أوضاع فتح تُدار عبر Tuya Smart — مثالية للفلل والرياضات وإيجارات Airbnb.",
    heroRating: "389 تقييم موثق",
    heroCta: "اطلب الآن",
    heroCtaSecondary: "استكشف المميزات",
    heroImageAlt: "صورة منتج M1 Pro — العرض الرئيسي",
    heroTrust: [
      "توصيل مجاني خلال 48 ساعة",
      "ضمان سنتان",
      "الدفع عند الاستلام",
    ] as [string, string, string],
    ticker: [
      'شاشة HD 4.5"',
      "جرس فيديو HD",
      "6 أوضاع وصول",
      "واي فاي 2.4 GHz",
      "200 مستخدم",
      "ضمان سنتان",
    ],
    unlockSection: "02 — طرق الوصول",
    unlockTitle: "ستة طرق\nللدخول.",
    unlockMethods: [
      { label: "بصمة الإصبع", desc: "أقل من ثانية · حتى 100 بصمة" },
      { label: "رمز PIN اللمسي", desc: "مضاد للتجسس · رمز افتراضي" },
      { label: "بطاقة RFID", desc: "وصول فوري · بدون إنترنت" },
      {
        label: "تطبيق Tuya Smart Life",
        desc: "واي فاي 2.4 GHz · iOS وAndroid",
      },
      { label: "كلمة مرور مؤقتة", desc: "الضيوف والإيجارات القصيرة" },
      { label: "مفتاح ميكانيكي احتياطي", desc: "مفتاحان · أسطوانة درجة C" },
    ],
    features: [
      {
        tag: "جرس الباب",
        title: "رؤية.\nحديث.\nبدون فتح.",
        body: "تتيح لك الشاشة الملونة HD المدمجة بحجم 4.5 بوصة مراقبة الزوار ليلاً ونهاراً. كاميرا واسعة الزاوية مع رؤية ليلية وجرس فيديو ثنائي الاتجاه وإشعارات فورية تمنحك السيطرة الكاملة — حتى عن بُعد عبر Tuya Smart.",
        detail: "كاميرا HD · رؤية ليلية · التقاط تلقائي",
      },
      {
        tag: "التطبيق",
        title: "بابك\nفي أي مكان\nفي العالم.",
        body: "أدر حتى 200 مستخدم، اطّلع على سجل الدخول، افتح الباب عن بُعد وأنشئ رموزاً مؤقتة للزوار أو عمال التوصيل. إشعارات فورية وألبوم صور وتوافق مع Alexa وGoogle Home.",
        detail: "Alexa · Google Home · Tuya Smart",
      },
      {
        tag: "الأمان",
        title: "إنذارات.\nتنبيهات.\nحماية.",
        body: "يحتوي M1 Pro على نظام إنذار متعدد المستويات: تنبيه البطارية المنخفضة، إنذار الاقتحام، قفل بعد 5 رموز خاطئة متتالية ورمز مضاد للتجسس. كما يوفر زر القفل الداخلي حماية للأطفال.",
        detail: "أسطوانة C · إنذار اقتحام · قفل أطفال",
      },
    ],
    stats: [
      { l: "طرق الفتح", suffix: "" },
      { l: "مستخدمون", suffix: "" },
      { l: "شاشة HD", suffix: " بوصة" },
      { l: "الضمان", suffix: " سنة" },
    ],
    gallerySection: "06 — معرض الصور",
    galleryTitle: "تصميم\naستثنائي.",
    specsSection: "07 — المواصفات",
    specsTitle: "مُصنَّع\nليدوم\nطويلاً.",
    specsDesc: "كل مكوّن في M1 Pro مختار لضمان أقصى موثوقية على المدى الطويل.",
    specs: [
      { label: "الموديل", value: "ARINILOCK M1 Pro" },
      { label: "المادة", value: "سبيكة ألومينيوم عالية المقاومة · أسود مطفأ" },
      { label: "الأبعاد", value: "380 × 75 ملم" },
      { label: "الشاشة", value: '4.5" HD ملونة' },
      { label: "الكاميرا", value: "HD زاوية واسعة · رؤية ليلية" },
      { label: "الأسطوانة", value: "درجة C (أمان عالٍ)" },
      { label: "سماكة الباب", value: "40–120 ملم · مقبض قابل للعكس" },
      { label: "الطاقة الاستيعابية", value: "حتى 200 مستخدم" },
      {
        label: "طرق الوصول",
        value: "بصمة · PIN · RFID · تطبيق · مؤقت · مفتاح",
      },
      { label: "الطاقة", value: "4 بطاريات + منفذ Type-C احتياطي" },
      { label: "درجة الحرارة", value: "-15 °C إلى +60 °C" },
      { label: "الاتصال", value: "واي فاي 2.4 GHz" },
      { label: "التطبيق", value: "Tuya Smart / Smart Life (iOS وAndroid)" },
      { label: "المساعد الصوتي", value: "Amazon Alexa وGoogle Home" },
      { label: "الضمان", value: "سنتان — قطع غيار وخدمة" },
      {
        label: "التوصيل",
        value: "سريع · في جميع أنحاء المغرب · التركيب مشمول",
      },
    ],
    reviewsSection: "08 — آراء العملاء",
    reviewsTitle: "389 عميل\nراضٍ.",
    reviewsRating: "متوسط التقييم 4.9 / 5",
    reviews: [
      {
        name: "يوسف ك.",
        city: "الدار البيضاء",
        body: "شاشة LCD الداخلية واضحة وحادة، والكاميرا HD تُظهر الوجوه بجلاء حتى ليلًا. جرّبت مقاومته للفتح القسري — الإنذار انطلق خلال 3 ثوانٍ ووصلني الإشعار فورًا. منتج بجودة جدية فعلًا.",
      },
      {
        name: "سلمى ر.",
        city: "مراكش",
        body: "عندي ثلاثة رياضات على Airbnb. فريق ARINILOCK ركّب الأقفال الثلاثة في يوم واحد وضبط كل شيء. أولّد الرموز من التطبيق في 30 ثانية. توفير الوقت هائل.",
      },
      {
        name: "مهدي أ.",
        city: "الرباط",
        body: "اللون الفضي رائع على بابي الخشبي. آلية Push-Pull سلسة جدًا لا تُقارن بالأقفال العادية. 7 أشهر ولا مشكلة واحدة. فريق الدعم ردّ في 20 دقيقة حين سألت.",
      },
    ],
    faqSection: "09 — الأسئلة الشائعة",
    faqTitle: "كل ما تحتاج\nمعرفته.",
    faqs: [
      {
        q: "ما أنواع الأبواب المتوافقة معه؟",
        a: "ARINILOCK M1 Pro متوافق مع أبواب الخشب والصلب والألومينيوم والفولاذ المقاوم للصدأ والأبواب المدرعة — مفردة أو مزدوجة، بسماكة 40–120 ملم. في حال الشك، يتحقق فريقنا من التوافق مجاناً عبر صورة قبل الشراء.",
      },
      {
        q: "ماذا يحدث إذا نفدت البطارية؟",
        a: "يُنبّهك التطبيق تلقائياً عندما تنخفض البطارية عن 20%. في حالة الطوارئ، يتيح منفذ Type-C الاحتياطي شحناً سريعاً لفتح الباب. المفتاحان الميكانيكيان المرفقان متاحان دائماً.",
      },
      {
        q: "كيف يعمل جرس الفيديو عن بُعد؟",
        a: "عبر تطبيق Tuya Smart، تصلك إشعارات صور فور قرع الجرس. يمكنك الرؤية والتحدث وفتح الباب من أي مكان في العالم عبر واي فاي 2.4 GHz.",
      },
      {
        q: "هل يمكنني إنشاء رموز مؤقتة لـ Airbnb؟",
        a: "نعم — هذه إحدى أبرز مزايا M1 Pro. أنشئ رموز PIN محدودة المدة للمستأجرين دون مشاركة رمزك الرئيسي. مثالي للفلل والرياضات والإيجارات القصيرة.",
      },
      {
        q: "هل التركيب مشمول؟",
        a: "نعم. يقوم فريق تقنيينا المؤهلين بالتركيب في المنزل في جميع أنحاء المغرب. طقم تركيب كامل ودليل تثبيت مرفقان أيضاً في الصندوق.",
      },
    ],
    orderSection: "10 — الطلب",
    orderTitle: "هل أنت مستعد لتأمين بابك؟",
    orderDesc:
      "أكمل النموذج وسيتصل بك فريقنا خلال 24 ساعة لتأكيد طلبك. الدفع عند الاستلام في جميع أنحاء المغرب.",
    orderBullets: [
      "توصيل مجاني في جميع أنحاء المغرب",
      "التركيب مشمول (الدار البيضاء والرباط)",
      "ضمان سنتان — خدمة ما بعد البيع",
      "الدفع عند الاستلام",
    ],
    orderFormTitle: "للطلب السريع، يرجى ملء هذا النموذج وسنتواصل معك قريباً!",
    ctaBadge: "توصيل مجاني · التركيب مشمول · الدفع عند الاستلام",
    ctaTitle: "هل أنت مستعد\nللانتقال إلى Pro؟",
    ctaDesc:
      "اطلب ARINILOCK M1 Pro واستلمه خلال 48 ساعة في أي مكان بالمغرب — مع تركيب احترافي مجاني.",
    ctaButton: "اطلب الآن",
    ctaContact: "تواصل معنا",
    stickyReviews: "389 تقييم",
    stickyButton: "اطلب",
  },
  i60: {
    heroBadge: "وجه ثلاثي الأبعاد · راحة اليد · بصمة · Push-Pull",
    heroDesc:
      "قفل ذكي 7-في-1 بتقنية التعرف على الوجه ثلاثي الأبعاد وقراءة راحة اليد اللاتلامسية وتصميم Push-Pull حصري. كاميرا HD ليلية وبطارية ليثيوم قابلة للشحن عبر USB-C — لأقصى درجات الأمان.",
    heroRating: "256 تقييم موثق",
    heroCta: "اطلب الآن",
    heroCtaSecondary: "كيف يعمل؟",
    heroImageAlt: "صورة منتج I 60 — العرض الرئيسي",
    heroTrust: [
      "توصيل مجاني خلال 48 ساعة",
      "ضمان سنتان",
      "الدفع عند الاستلام",
    ] as [string, string, string],
    ticker: [
      "وجه ثلاثي الأبعاد · راحة اليد · بصمة",
      "7 طرق وصول",
      "كاميرا HD ليلية",
      "Push-Pull متميز",
      "أسطوانة درجة C",
      "ضمان سنتان",
    ],
    unlockSection: "02 — طرق الوصول",
    unlockTitle: "سبعة طرق\nللدخول.",
    unlockMethods: [
      {
        label: "التعرف على الوجه ثلاثي الأبعاد",
        desc: "مضاد انتحال · فائق السرعة",
      },
      { label: "قراءة راحة اليد", desc: "لاتلامسي · صحي" },
      { label: "بصمة الإصبع", desc: "أقل من 0.5 ثانية · دقة عالية" },
      { label: "رمز PIN آمن", desc: "مضاد للتجسس · رموز مؤقتة" },
      { label: "بطاقة RFID / NFC", desc: "وصول فوري · مضمّنة" },
      { label: "تطبيق Tuya Smart", desc: "واي فاي · iOS وAndroid" },
      { label: "مفتاح ميكانيكي", desc: "مفتاحان · أسطوانة C" },
    ],
    features: [
      {
        tag: "البيومتري",
        title: "الوجه.\nراحة اليد.\nالبصمة.",
        body: "يدمج i60 ثلاثة أوضاع بيومترية متقدمة: التعرف على الوجه ثلاثي الأبعاد بتقنية مضادة لانتحال الهوية، وقراءة راحة اليد اللاتلامسية، وبصمة إصبع دقيقة في أقل من 0.5 ثانية. كل هذا دون لمس مفتاح قط.",
        detail: "وجه ثلاثي الأبعاد · مضاد الانتحال · أقل من 0.5 ثانية",
      },
      {
        tag: "جرس الباب",
        title: "شاهد زوارك.\nبدون فتح.",
        body: "تتيح لك كاميرا HD واسعة الزاوية مع رؤية ليلية بالأشعة تحت الحمراء وشاشة LCD الداخلية الملونة رؤية الزوار والتحدث معهم في الوقت الفعلي. إشعارات فورية على هاتفك وسجل وصول في تطبيق Tuya Smart.",
        detail: "كاميرا HD · رؤية ليلية · جرس فيديو متصل",
      },
      {
        tag: "الأمان",
        title: "قفل تلقائي.\nتنبيهات فورية.",
        body: "يُقفل القفل تلقائياً بعد كل إغلاق. إنذار اقتحام، قفل بعد رموز خاطئة، تنبيه انخفاض البطارية وكشف محاولات الفتح القسري — يُنبَّه على هاتفك فوراً.",
        detail: "أسطوانة C · إنذار اقتحام · قفل تلقائي",
      },
    ],
    stats: [
      { l: "طرق الوصول", suffix: "" },
      { l: "سرعة الفتح", suffix: " ث" },
      { l: "بصمات", suffix: "" },
      { l: "الضمان", suffix: " سنة" },
    ],
    installSection: "06 — التركيب",
    installTitle: "في 45\nدقيقة،\nالأمر تم.",
    installDesc: "بدون تقني، بدون توتر. فقط هاتفك والدليل المرفق.",
    steps: [
      {
        num: "01",
        title: "انزع القفل القديم",
        description:
          "افكّ المسامير الأربعة من بابك الحالي — لا تحتاج أدوات خاصة.",
      },
      {
        num: "02",
        title: "ركّب اللوحة الخارجية",
        description:
          "ركّب لوحة Push-Pull مع الكاميرا ولوحة المفاتيح اللمسية. الميزاب 6068 متعدد النقاط مرفق.",
      },
      {
        num: "03",
        title: "ثبّت اللوحة الداخلية",
        description:
          "أدخل شاشة LCD الداخلية وصل اللوحتين عبر الكابل المرفق في الطقم.",
      },
      {
        num: "04",
        title: "اضبط عبر Tuya Smart",
        description:
          "اتصل عبر واي فاي، سجّل بياناتك البيومترية وادعُ عائلتك في ثوانٍ.",
      },
    ],
    gallerySection: "07 — معرض الصور",
    galleryTitle: "بسيط\nوأنيق.",
    specsSection: "08 — المواصفات",
    specsTitle: "كل ما\nتحتاج\nمعرفته.",
    specs: [
      { label: "الموديل", value: "ARINILOCK i60" },
      {
        label: "المادة",
        value: "سبيكة ألومينيوم عالية الكثافة · لوح أكريليك مضاد للخدش",
      },
      { label: "التصميم", value: "Push-Pull حديث · قابل للعكس" },
      {
        label: "طرق الوصول",
        value: "وجه 3D · راحة يد · بصمة · PIN · RFID · تطبيق · مفتاح",
      },
      { label: "الشاشة الداخلية", value: "LCD ملونة 3.5–4 بوصة" },
      {
        label: "الكاميرا",
        value: "زاوية واسعة · رؤية ليلية بالأشعة تحت الحمراء",
      },
      { label: "البطارية", value: "ليثيوم قابلة للشحن 4200–5000 mAh" },
      { label: "شحن الطوارئ", value: "منفذ USB-C" },
      { label: "الاتصال", value: "واي فاي عبر Tuya Smart (iOS وAndroid)" },
      { label: "الأسطوانة", value: "درجة C أمان عالٍ" },
      { label: "سماكة الباب", value: "40–120 ملم" },
      { label: "الميزاب", value: "6068 متعدد النقاط مرفق" },
      {
        label: "الطاقة الاستيعابية",
        value: "100 بصمة · ملفات تعريف وجه متعددة",
      },
      { label: "الضمان", value: "سنتان من الشركة البائع" },
      { label: "التوصيل", value: "سريع · جميع أنحاء المغرب · التركيب مشمول" },
    ],
    reviewsSection: "09 — آراء العملاء",
    reviewsTitle: "256 عميل\nراضٍ.",
    reviewsRating: "متوسط التقييم 4.8 / 5",
    reviews: [
      {
        name: "حميد ب.",
        city: "الرباط",
        body: "التعرف على الوجه ثلاثي الأبعاد يعمل في الظلام التام بفضل أجهزة الاستشعار بالأشعة تحت الحمراء — جرّبته في الساعة الثانية صباحًا ونجح. آلية Push-Pull سلاسة مدهشة. أنصح به بلا تردد.",
      },
      {
        name: "نادية ت.",
        city: "الدار البيضاء",
        body: "أعود كثيرًا ويداي ممتلئتان بالمشتريات — قراءة راحة اليد دون تلامس عملية جدًا. الشاشة الداخلية مضيئة وواضحة. فريق التركيب جاء في الوقت المحدد وكان محترفًا جدًا.",
      },
      {
        name: "كريم أ.",
        city: "فاس",
        body: "كنت أشك في المتانة لكن سبيكة الألومينيوم صلبة جدًا. القفل يُغلق وحده بعد كل إغلاق للباب. فريق الدعم اتصل بي في نفس اليوم للتأكد من أن كل شيء يعمل. نادرًا ما أرى هذا المستوى من الخدمة.",
      },
    ],
    orderSection: "10 — الطلب",
    orderTitle: "هل أنت مستعد لتأمين بابك؟",
    orderDesc:
      "أكمل النموذج وسيتصل بك فريقنا خلال 24 ساعة لتأكيد طلبك. الدفع عند الاستلام في جميع أنحاء المغرب.",
    orderBullets: [
      "توصيل مجاني في جميع أنحاء المغرب",
      "التركيب مشمول (الدار البيضاء والرباط)",
      "ضمان سنتان — خدمة ما بعد البيع",
      "الدفع عند الاستلام",
    ],
    orderFormTitle: "للطلب السريع، يرجى ملء هذا النموذج وسنتواصل معك قريباً!",
    ctaBadge: "توصيل مجاني · التركيب مشمول · الدفع عند الاستلام",
    ctaTitle: "بسّط\nحياتك اليومية.",
    ctaDesc:
      "اطلب ARINILOCK I 60 واستلمه خلال 48 ساعة في أي مكان بالمغرب — مع تركيب احترافي مجاني.",
    ctaButton: "اطلب الآن",
    ctaContact: "تواصل معنا",
    stickyReviews: "256 تقييم",
    stickyButton: "اطلب",
  },
};

export const translations: Record<Locale, typeof fr> = { fr, en, ar };

export type Translations = typeof fr;
