import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conditions d'utilisation & CGV",
  description: "Conditions générales de vente et d'utilisation d'AriniLock, incluant les modalités de paiement et de livraison.",
};

export default function ConditionsUtilisationPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header band */}
      <div
        className="pt-32 pb-16"
        style={{ background: "linear-gradient(135deg, #010d1a 0%, #032245 50%, #053d7a 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
            Légal
          </p>
          <h1 className="text-4xl font-bold text-white lg:text-5xl">
            Conditions d'utilisation & CGV
          </h1>
          <p className="mt-4 text-sm text-white/50">
            Dernière mise à jour : juin 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <div className="prose prose-sm max-w-none text-gray-700 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-[#162847] [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:font-semibold [&_h3]:text-gray-800 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:mb-4 [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:list-disc [&_li]:leading-relaxed">

          <p>
            Les présentes Conditions Générales de Vente et d'Utilisation (ci-après « CGV ») régissent l'utilisation du site web <strong>arinilock.ma</strong> et les ventes conclues entre <strong>AriniLock</strong> (vendeur) et tout client (acheteur) passant commande via le site ou par tout autre canal de vente de la Société. Toute commande implique l'acceptation pleine et entière des présentes CGV.
          </p>

          <h2>1. Identification du vendeur</h2>
          <p>
            <strong>AriniLock</strong><br />
            Bd Zoulikha Nasri, Corner Office N°19, Sidi Maarouf, Casablanca, Maroc<br />
            Tél. : +212 6 68 89 88 60<br />
            E-mail : support@arinilock.ma<br />
            Horaires : Lundi au Vendredi, 9h–18h
          </p>

          <h2>2. Utilisation du site</h2>
          <p>
            Le site arinilock.ma est réservé à un usage personnel et non commercial. Il est interdit de reproduire, distribuer, modifier ou exploiter tout contenu du site sans autorisation écrite préalable d'AriniLock. L'accès au site suppose l'acceptation des présentes conditions et de notre{" "}
            <Link href="/politique-de-confidentialite" className="text-[#162847] underline">
              Politique de confidentialité
            </Link>.
          </p>

          <h2>3. Produits</h2>
          <p>
            AriniLock commercialise des serrures connectées et accessoires domotiques pour usage résidentiel et professionnel au Maroc. Les produits sont conformes aux réglementations de sécurité européenne (CE) et marocaine (ANRT). Les descriptions, photos et caractéristiques techniques sont fournies à titre indicatif et peuvent être modifiées sans préavis.
          </p>

          <h2>4. Prix</h2>
          <p>
            Les prix sont indiqués en <strong>Dirham Marocain (MAD), toutes taxes comprises (TTC)</strong>. AriniLock se réserve le droit de modifier ses prix à tout moment. Les prix applicables sont ceux en vigueur au moment de la validation de la commande. La livraison et l'installation sont <strong>offertes</strong> sur l'ensemble du territoire marocain.
          </p>

          <h2>5. Commande</h2>
          <p>
            Toute commande passée sur le site ou par téléphone constitue un contrat de vente ferme et définitif, sous réserve de disponibilité du produit. AriniLock se réserve le droit d'annuler toute commande en cas de stock indisponible, d'information erronée ou de suspicion de fraude, avec remboursement intégral si un paiement a été effectué.
          </p>
          <p>
            Un e-mail ou un SMS de confirmation de commande est envoyé après validation. Notre équipe vous contactera dans un délai de <strong>24 heures ouvrées</strong> pour confirmer les détails de livraison.
          </p>

          <h2>6. Modalités de paiement</h2>

          <h3>6.1 Paiement à la livraison (Cash on Delivery)</h3>
          <p>
            Le paiement s'effectue en espèces directement auprès du livreur, à la réception de votre commande. Aucune information bancaire n'est requise pour ce mode de paiement. Ce mode est disponible sur l'ensemble du territoire marocain.
          </p>

          <h3>6.2 Paiement par carte bancaire</h3>
          <p>
            AriniLock accepte les paiements par carte Visa, Mastercard et CMI (Centre Monétique Interbancaire). Les transactions sont sécurisées par un protocole de chiffrement SSL et traitées via une passerelle de paiement certifiée. AriniLock n'a accès à aucune donnée bancaire : celles-ci sont traitées exclusivement par l'organisme de paiement.
          </p>

          <h3>6.3 Sécurité des paiements</h3>
          <p>
            En cas de paiement en ligne, toutes les transactions sont protégées par le protocole 3D Secure. En cas de fraude avérée, AriniLock se réserve le droit d'annuler la commande et d'alerter les autorités compétentes.
          </p>

          <h2>7. Livraison et installation</h2>
          <p>
            <strong>Livraison gratuite</strong> dans toutes les villes du Maroc. Le délai de livraison est de <strong>2 à 4 jours ouvrés</strong> à compter de la confirmation de commande. L'<strong>installation est incluse et offerte</strong>, réalisée par nos techniciens certifiés.
          </p>
          <p>
            En cas d'absence lors de la livraison, un nouveau rendez-vous sera convenu avec vous. AriniLock ne saurait être tenu responsable des retards dus à des événements de force majeure.
          </p>

          <h2>8. Droit de rétractation et retours</h2>
          <p>
            Conformément à la réglementation marocaine en vigueur et à la politique commerciale d'AriniLock, le client dispose d'un délai de <strong>30 jours</strong> à compter de la réception du produit pour effectuer une demande de retour, à condition que le produit soit dans son état d'origine, non utilisé et dans son emballage d'origine.
          </p>
          <p>
            Pour initier un retour, contactez-nous à support@arinilock.ma ou par téléphone au +212 6 68 89 88 60. Les frais de retour sont à la charge du client, sauf en cas de défaut du produit constaté à la livraison.
          </p>

          <h2>9. Garantie</h2>
          <p>
            Tous les produits AriniLock bénéficient d'une <strong>garantie constructeur de 2 ans</strong> couvrant tout défaut de fabrication dans des conditions normales d'utilisation. La garantie ne couvre pas les dommages résultant d'une utilisation incorrecte, d'une usure normale ou d'une modification non autorisée du produit.
          </p>
          <p>
            Pour toute demande de garantie, contactez notre service après-vente muni de votre preuve d'achat. Notre équipe intervient 7j/7 via WhatsApp.
          </p>

          <h2>10. Responsabilité</h2>
          <p>
            AriniLock s'engage à délivrer des produits conformes aux descriptions publiées. La responsabilité d'AriniLock ne saurait être engagée en cas d'utilisation du produit non conforme aux instructions, de dommages indirects ou de perte de données. Les serrures connectées AriniLock sont conçues comme un complément de sécurité et ne remplacent pas l'ensemble des mesures de sécurité d'un domicile ou d'un établissement.
          </p>

          <h2>11. Propriété intellectuelle</h2>
          <p>
            L'ensemble des éléments du site arinilock.ma (marque, logo, textes, images, graphismes) sont la propriété exclusive d'AriniLock et sont protégés par les lois marocaines sur la propriété intellectuelle. Toute reproduction, même partielle, est interdite sans autorisation préalable.
          </p>

          <h2>12. Protection des données personnelles</h2>
          <p>
            Le traitement des données personnelles collectées lors d'une commande est régi par notre{" "}
            <Link href="/politique-de-confidentialite" className="text-[#162847] underline">
              Politique de confidentialité
            </Link>
            , conformément à la loi marocaine n° 09-08.
          </p>

          <h2>13. Droit applicable et litiges</h2>
          <p>
            Les présentes CGV sont soumises au <strong>droit marocain</strong>. En cas de litige, les parties s'engagent à rechercher une solution amiable avant tout recours judiciaire. À défaut d'accord amiable, les tribunaux compétents de <strong>Casablanca</strong> seront seuls compétents.
          </p>

          <h2>14. Modifications des CGV</h2>
          <p>
            AriniLock se réserve le droit de modifier les présentes CGV à tout moment. La version applicable est celle en vigueur à la date de la commande, accessible sur cette page.
          </p>

          <h2>15. Contact</h2>
          <p>
            Pour toute question relative aux présentes conditions :<br />
            <a href="mailto:support@arinilock.ma" className="text-[#162847] underline">support@arinilock.ma</a><br />
            Tél. : +212 6 68 89 88 60 — Lun–Ven, 9h–18h
          </p>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-8">
          <Link href="/" className="text-sm text-[#162847] hover:underline">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
