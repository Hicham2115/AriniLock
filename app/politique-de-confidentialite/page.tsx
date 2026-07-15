import type { Metadata } from "next";
import Link from "next/link";
import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et traitement des données personnelles d'AriniLock, conformément à la loi marocaine 09-08.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
    <CartDrawer />
    <Header />
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
            Politique de confidentialité
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
            AriniLock (ci-après « la Société ») s'engage à protéger la vie privée de ses clients et utilisateurs. La présente politique de confidentialité explique comment nous collectons, utilisons, conservons et protégeons vos données personnelles, conformément à la <strong>loi marocaine n° 09-08 relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel</strong> et à ses textes d'application.
          </p>

          <h2>1. Responsable du traitement</h2>
          <p>
            <strong>AriniLock</strong><br />
            Bd Zoulikha Nasri, Corner Office N°19, Sidi Maarouf, Casablanca, Maroc<br />
            Tél. : +212 6 68 89 88 60<br />
            E-mail : support@arinilock.ma
          </p>

          <h2>2. Données collectées</h2>
          <p>Nous collectons les catégories de données suivantes :</p>
          <ul>
            <li><strong>Données d'identification</strong> : nom complet, adresse e-mail, numéro de téléphone.</li>
            <li><strong>Données de livraison</strong> : adresse postale, ville.</li>
            <li><strong>Données de commande</strong> : détail des produits commandés, montants, référence de commande.</li>
            <li><strong>Données de navigation</strong> : adresse IP, type de navigateur, pages visitées, via des cookies (voir section 8).</li>
            <li><strong>Données de communication</strong> : messages envoyés via le formulaire de contact ou WhatsApp.</li>
          </ul>
          <p>Nous ne collectons <strong>aucune donnée biométrique</strong> (empreintes digitales) via notre site web. Les données biométriques enregistrées dans votre serrure AriniLock sont stockées localement sur le dispositif et ne sont jamais transmises à nos serveurs.</p>

          <h2>3. Finalités du traitement</h2>
          <p>Vos données sont utilisées pour :</p>
          <ul>
            <li>Traiter et expédier vos commandes (livraison à domicile).</li>
            <li>Vous contacter pour confirmer votre commande ou assurer le service après-vente.</li>
            <li>Gérer vos demandes d'information, réclamations ou demandes de garantie.</li>
            <li>Envoyer des communications commerciales (avec votre consentement).</li>
            <li>Améliorer notre site web et personnaliser votre expérience.</li>
            <li>Respecter nos obligations légales et comptables.</li>
          </ul>

          <h2>4. Base légale du traitement</h2>
          <p>Conformément à la loi 09-08, le traitement de vos données repose sur :</p>
          <ul>
            <li><strong>L'exécution d'un contrat</strong> : pour le traitement des commandes et la livraison.</li>
            <li><strong>Votre consentement</strong> : pour les communications marketing et les cookies non essentiels.</li>
            <li><strong>Notre intérêt légitime</strong> : pour l'amélioration de nos services et la prévention de la fraude.</li>
            <li><strong>Le respect d'une obligation légale</strong> : pour la conservation des documents comptables et fiscaux.</li>
          </ul>

          <h2>5. Durée de conservation</h2>
          <ul>
            <li><strong>Données de commande</strong> : conservées 10 ans (obligations comptables et fiscales marocaines).</li>
            <li><strong>Données de compte client</strong> : conservées tant que le compte est actif, puis 3 ans après la dernière interaction.</li>
            <li><strong>Données de contact et réclamations</strong> : conservées 3 ans après la clôture de la demande.</li>
            <li><strong>Données de navigation (cookies)</strong> : 13 mois maximum.</li>
          </ul>

          <h2>6. Destinataires des données</h2>
          <p>Vos données peuvent être partagées avec :</p>
          <ul>
            <li><strong>Nos prestataires logistiques</strong> (transporteurs) pour la livraison de vos commandes.</li>
            <li><strong>Nos prestataires de paiement</strong> (CMI, etc.) pour le traitement sécurisé des paiements.</li>
            <li><strong>Nos outils informatiques</strong> (hébergement, CRM, newsletter) soumis à des obligations de confidentialité.</li>
            <li><strong>Les autorités compétentes</strong> en cas d'obligation légale.</li>
          </ul>
          <p>Vos données ne sont <strong>jamais vendues</strong> à des tiers.</p>

          <h2>7. Vos droits</h2>
          <p>Conformément à la loi 09-08, vous disposez des droits suivants :</p>
          <ul>
            <li><strong>Droit d'accès</strong> : obtenir une copie de vos données personnelles.</li>
            <li><strong>Droit de rectification</strong> : corriger des données inexactes ou incomplètes.</li>
            <li><strong>Droit d'opposition</strong> : vous opposer au traitement à des fins de prospection commerciale.</li>
            <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données dans les conditions prévues par la loi.</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à : <a href="mailto:support@arinilock.ma" className="text-[#162847] underline">support@arinilock.ma</a> ou par courrier à l'adresse indiquée à l'article 1. Nous accuserons réception dans un délai de 5 jours ouvrés et traiterons votre demande dans un délai maximum de 30 jours.
          </p>
          <p>
            Vous avez également le droit d'introduire une réclamation auprès de la <strong>Commission Nationale de Contrôle de la Protection des Données à Caractère Personnel (CNDP)</strong> du Royaume du Maroc.
          </p>

          <h2>8. Cookies</h2>
          <p>Notre site utilise des cookies pour :</p>
          <ul>
            <li><strong>Cookies essentiels</strong> : fonctionnement du panier et de la session (base légale : intérêt légitime).</li>
            <li><strong>Cookies analytiques</strong> : mesure d'audience anonymisée (base légale : consentement).</li>
            <li><strong>Cookies marketing</strong> : publicité ciblée (base légale : consentement).</li>
          </ul>
          <p>Vous pouvez à tout moment paramétrer ou retirer votre consentement aux cookies via le bandeau présent sur notre site.</p>

          <h2>9. Sécurité des données</h2>
          <p>
            AriniLock met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte, altération ou divulgation : chiffrement des communications (HTTPS), accès restreint aux données, contrôles internes réguliers.
          </p>

          <h2>10. Transferts hors Maroc</h2>
          <p>
            Certains de nos prestataires techniques peuvent être établis hors du Maroc. Dans ce cas, nous nous assurons que des garanties appropriées sont mises en place (clauses contractuelles types ou équivalentes) conformément à la loi 09-08.
          </p>

          <h2>11. Modifications</h2>
          <p>
            Nous nous réservons le droit de modifier la présente politique à tout moment. La version en vigueur est celle affichée sur cette page. Toute modification substantielle vous sera notifiée par e-mail ou via une bannière sur le site.
          </p>

          <h2>12. Contact</h2>
          <p>
            Pour toute question relative à la présente politique, contactez notre délégué à la protection des données :<br />
            <a href="mailto:support@arinilock.ma" className="text-[#162847] underline">support@arinilock.ma</a>
          </p>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-8">
          <Link href="/" className="text-sm text-[#162847] hover:underline">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
