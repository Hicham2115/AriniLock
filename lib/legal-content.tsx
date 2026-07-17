import type { ReactNode } from "react";
import NextLink from "next/link";
import type { Locale } from "@/stores/language-store";

const linkClass = "text-[#162847] underline";

export const privacyContent: Record<Locale, ReactNode> = {
  fr: (
    <>
      <p>
        ARINILOCK (ci-après « la Société ») s&apos;engage à protéger la vie privée de ses clients et utilisateurs. La présente politique de confidentialité explique comment nous collectons, utilisons, conservons et protégeons vos données personnelles, conformément à la <strong>loi marocaine n° 09-08 relative à la protection des personnes physiques à l&apos;égard du traitement des données à caractère personnel</strong> et à ses textes d&apos;application.
      </p>

      <h2>1. Responsable du traitement</h2>
      <p>
        <strong>ARINILOCK</strong><br />
        Bd Zoulikha Nasri, Corner Office N°19, Sidi Maarouf, Casablanca, Maroc<br />
        Tél. : <span dir="ltr">+212 6 68 89 88 60</span><br />
        E-mail : support@arinilock.ma
      </p>

      <h2>2. Données collectées</h2>
      <p>Nous collectons les catégories de données suivantes :</p>
      <ul>
        <li><strong>Données d&apos;identification</strong> : nom complet, adresse e-mail, numéro de téléphone.</li>
        <li><strong>Données de livraison</strong> : adresse postale, ville.</li>
        <li><strong>Données de commande</strong> : détail des produits commandés, montants, référence de commande.</li>
        <li><strong>Données de navigation</strong> : adresse IP, type de navigateur, pages visitées, via des cookies (voir section 8).</li>
        <li><strong>Données de communication</strong> : messages envoyés via le formulaire de contact ou WhatsApp.</li>
      </ul>
      <p>Nous ne collectons <strong>aucune donnée biométrique</strong> (empreintes digitales) via notre site web. Les données biométriques enregistrées dans votre serrure ARINILOCK sont stockées localement sur le dispositif et ne sont jamais transmises à nos serveurs.</p>

      <h2>3. Finalités du traitement</h2>
      <p>Vos données sont utilisées pour :</p>
      <ul>
        <li>Traiter et expédier vos commandes (livraison à domicile).</li>
        <li>Vous contacter pour confirmer votre commande ou assurer le service après-vente.</li>
        <li>Gérer vos demandes d&apos;information, réclamations ou demandes de garantie.</li>
        <li>Envoyer des communications commerciales (avec votre consentement).</li>
        <li>Améliorer notre site web et personnaliser votre expérience.</li>
        <li>Respecter nos obligations légales et comptables.</li>
      </ul>

      <h2>4. Base légale du traitement</h2>
      <p>Conformément à la loi 09-08, le traitement de vos données repose sur :</p>
      <ul>
        <li><strong>L&apos;exécution d&apos;un contrat</strong> : pour le traitement des commandes et la livraison.</li>
        <li><strong>Votre consentement</strong> : pour les communications marketing et les cookies non essentiels.</li>
        <li><strong>Notre intérêt légitime</strong> : pour l&apos;amélioration de nos services et la prévention de la fraude.</li>
        <li><strong>Le respect d&apos;une obligation légale</strong> : pour la conservation des documents comptables et fiscaux.</li>
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
        <li><strong>Les autorités compétentes</strong> en cas d&apos;obligation légale.</li>
      </ul>
      <p>Vos données ne sont <strong>jamais vendues</strong> à des tiers.</p>

      <h2>7. Vos droits</h2>
      <p>Conformément à la loi 09-08, vous disposez des droits suivants :</p>
      <ul>
        <li><strong>Droit d&apos;accès</strong> : obtenir une copie de vos données personnelles.</li>
        <li><strong>Droit de rectification</strong> : corriger des données inexactes ou incomplètes.</li>
        <li><strong>Droit d&apos;opposition</strong> : vous opposer au traitement à des fins de prospection commerciale.</li>
        <li><strong>Droit à l&apos;effacement</strong> : demander la suppression de vos données dans les conditions prévues par la loi.</li>
      </ul>
      <p>
        Pour exercer ces droits, contactez-nous à : <a href="mailto:support@arinilock.ma" className={linkClass}>support@arinilock.ma</a> ou par courrier à l&apos;adresse indiquée à l&apos;article 1. Nous accuserons réception dans un délai de 5 jours ouvrés et traiterons votre demande dans un délai maximum de 30 jours.
      </p>
      <p>
        Vous avez également le droit d&apos;introduire une réclamation auprès de la <strong>Commission Nationale de Contrôle de la Protection des Données à Caractère Personnel (CNDP)</strong> du Royaume du Maroc.
      </p>

      <h2>8. Cookies</h2>
      <p>Notre site utilise des cookies pour :</p>
      <ul>
        <li><strong>Cookies essentiels</strong> : fonctionnement du panier et de la session (base légale : intérêt légitime).</li>
        <li><strong>Cookies analytiques</strong> : mesure d&apos;audience anonymisée (base légale : consentement).</li>
        <li><strong>Cookies marketing</strong> : publicité ciblée (base légale : consentement).</li>
      </ul>
      <p>Vous pouvez à tout moment paramétrer ou retirer votre consentement aux cookies via le bandeau présent sur notre site.</p>

      <h2>9. Sécurité des données</h2>
      <p>
        ARINILOCK met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte, altération ou divulgation : chiffrement des communications (HTTPS), accès restreint aux données, contrôles internes réguliers.
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
        <a href="mailto:support@arinilock.ma" className={linkClass}>support@arinilock.ma</a>
      </p>
    </>
  ),
  en: (
    <>
      <p>
        ARINILOCK (hereinafter &quot;the Company&quot;) is committed to protecting the privacy of its customers and users. This privacy policy explains how we collect, use, retain and protect your personal data, in accordance with <strong>Moroccan Law No. 09-08 on the protection of individuals with regard to the processing of personal data</strong> and its implementing texts.
      </p>

      <h2>1. Data controller</h2>
      <p>
        <strong>ARINILOCK</strong><br />
        Bd Zoulikha Nasri, Corner Office N°19, Sidi Maarouf, Casablanca, Morocco<br />
        Phone: <span dir="ltr">+212 6 68 89 88 60</span><br />
        Email: support@arinilock.ma
      </p>

      <h2>2. Data we collect</h2>
      <p>We collect the following categories of data:</p>
      <ul>
        <li><strong>Identification data</strong>: full name, email address, phone number.</li>
        <li><strong>Delivery data</strong>: postal address, city.</li>
        <li><strong>Order data</strong>: details of products ordered, amounts, order reference.</li>
        <li><strong>Browsing data</strong>: IP address, browser type, pages visited, via cookies (see section 8).</li>
        <li><strong>Communication data</strong>: messages sent via the contact form or WhatsApp.</li>
      </ul>
      <p>We do <strong>not collect any biometric data</strong> (fingerprints) through our website. The biometric data enrolled on your ARINILOCK lock is stored locally on the device and is never transmitted to our servers.</p>

      <h2>3. Purposes of processing</h2>
      <p>Your data is used to:</p>
      <ul>
        <li>Process and ship your orders (home delivery).</li>
        <li>Contact you to confirm your order or provide after-sales service.</li>
        <li>Manage your information requests, complaints or warranty claims.</li>
        <li>Send you commercial communications (with your consent).</li>
        <li>Improve our website and personalize your experience.</li>
        <li>Comply with our legal and accounting obligations.</li>
      </ul>

      <h2>4. Legal basis for processing</h2>
      <p>In accordance with Law 09-08, the processing of your data is based on:</p>
      <ul>
        <li><strong>Performance of a contract</strong>: for order processing and delivery.</li>
        <li><strong>Your consent</strong>: for marketing communications and non-essential cookies.</li>
        <li><strong>Our legitimate interest</strong>: for improving our services and preventing fraud.</li>
        <li><strong>Compliance with a legal obligation</strong>: for retaining accounting and tax records.</li>
      </ul>

      <h2>5. Retention period</h2>
      <ul>
        <li><strong>Order data</strong>: retained for 10 years (Moroccan accounting and tax obligations).</li>
        <li><strong>Customer account data</strong>: retained while the account is active, then 3 years after the last interaction.</li>
        <li><strong>Contact and complaint data</strong>: retained for 3 years after the request is closed.</li>
        <li><strong>Browsing data (cookies)</strong>: 13 months maximum.</li>
      </ul>

      <h2>6. Data recipients</h2>
      <p>Your data may be shared with:</p>
      <ul>
        <li><strong>Our logistics providers</strong> (carriers) for delivery of your orders.</li>
        <li><strong>Our payment providers</strong> (CMI, etc.) for secure payment processing.</li>
        <li><strong>Our IT tools</strong> (hosting, CRM, newsletter) subject to confidentiality obligations.</li>
        <li><strong>Competent authorities</strong> where required by law.</li>
      </ul>
      <p>Your data is <strong>never sold</strong> to third parties.</p>

      <h2>7. Your rights</h2>
      <p>In accordance with Law 09-08, you have the following rights:</p>
      <ul>
        <li><strong>Right of access</strong>: obtain a copy of your personal data.</li>
        <li><strong>Right of rectification</strong>: correct inaccurate or incomplete data.</li>
        <li><strong>Right to object</strong>: object to processing for direct marketing purposes.</li>
        <li><strong>Right to erasure</strong>: request deletion of your data under the conditions provided by law.</li>
      </ul>
      <p>
        To exercise these rights, contact us at: <a href="mailto:support@arinilock.ma" className={linkClass}>support@arinilock.ma</a> or by mail to the address listed in Article 1. We will acknowledge receipt within 5 business days and process your request within a maximum of 30 days.
      </p>
      <p>
        You also have the right to lodge a complaint with the <strong>National Commission for the Control of the Protection of Personal Data (CNDP)</strong> of the Kingdom of Morocco.
      </p>

      <h2>8. Cookies</h2>
      <p>Our site uses cookies for:</p>
      <ul>
        <li><strong>Essential cookies</strong>: cart and session functionality (legal basis: legitimate interest).</li>
        <li><strong>Analytics cookies</strong>: anonymized audience measurement (legal basis: consent).</li>
        <li><strong>Marketing cookies</strong>: targeted advertising (legal basis: consent).</li>
      </ul>
      <p>You can adjust or withdraw your consent to cookies at any time via the banner on our site.</p>

      <h2>9. Data security</h2>
      <p>
        ARINILOCK implements appropriate technical and organizational measures to protect your data against unauthorized access, loss, alteration or disclosure: encrypted communications (HTTPS), restricted data access, regular internal controls.
      </p>

      <h2>10. Transfers outside Morocco</h2>
      <p>
        Some of our technical providers may be based outside Morocco. In such cases, we ensure appropriate safeguards are in place (standard contractual clauses or equivalent) in accordance with Law 09-08.
      </p>

      <h2>11. Changes</h2>
      <p>
        We reserve the right to modify this policy at any time. The version in effect is the one displayed on this page. Any substantial change will be notified to you by email or via a banner on the site.
      </p>

      <h2>12. Contact</h2>
      <p>
        For any question relating to this policy, contact our data protection officer:<br />
        <a href="mailto:support@arinilock.ma" className={linkClass}>support@arinilock.ma</a>
      </p>
    </>
  ),
  ar: (
    <>
      <p>
        تلتزم ARINILOCK (يُشار إليها فيما يلي بـ«الشركة») بحماية خصوصية عملائها ومستخدميها. توضح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحفظنا وحمايتنا لبياناتكم الشخصية، وفقًا لـ<strong>القانون المغربي رقم 09-08 المتعلق بحماية الأشخاص الذاتيين تجاه معالجة المعطيات ذات الطابع الشخصي</strong> ونصوصه التطبيقية.
      </p>

      <h2>1. المسؤول عن المعالجة</h2>
      <p>
        <strong>ARINILOCK</strong><br />
        شارع زليخة ناصري، Corner Office رقم 19، سيدي معروف، الدار البيضاء، المغرب<br />
        الهاتف: <span dir="ltr">+212 6 68 89 88 60</span><br />
        البريد الإلكتروني: support@arinilock.ma
      </p>

      <h2>2. البيانات التي نجمعها</h2>
      <p>نجمع فئات البيانات التالية:</p>
      <ul>
        <li><strong>بيانات التعريف</strong>: الاسم الكامل، البريد الإلكتروني، رقم الهاتف.</li>
        <li><strong>بيانات التوصيل</strong>: العنوان البريدي، المدينة.</li>
        <li><strong>بيانات الطلب</strong>: تفاصيل المنتجات المطلوبة، المبالغ، مرجع الطلب.</li>
        <li><strong>بيانات التصفح</strong>: عنوان IP، نوع المتصفح، الصفحات التي تمت زيارتها، عبر ملفات تعريف الارتباط (انظر القسم 8).</li>
        <li><strong>بيانات التواصل</strong>: الرسائل المُرسَلة عبر نموذج الاتصال أو واتساب.</li>
      </ul>
      <p>لا نجمع <strong>أي بيانات بيومترية</strong> (بصمات الأصابع) عبر موقعنا الإلكتروني. تُخزَّن البيانات البيومترية المسجَّلة في قفل ARINILOCK الخاص بكم محليًا على الجهاز ولا تُنقل أبدًا إلى خوادمنا.</p>

      <h2>3. أغراض المعالجة</h2>
      <p>تُستخدم بياناتكم من أجل:</p>
      <ul>
        <li>معالجة وشحن طلباتكم (التوصيل المنزلي).</li>
        <li>التواصل معكم لتأكيد طلبكم أو لضمان خدمة ما بعد البيع.</li>
        <li>معالجة طلبات المعلومات أو الشكاوى أو طلبات الضمان.</li>
        <li>إرسال اتصالات تجارية (بموافقتكم).</li>
        <li>تحسين موقعنا الإلكتروني وتخصيص تجربتكم.</li>
        <li>الامتثال لالتزاماتنا القانونية والمحاسبية.</li>
      </ul>

      <h2>4. الأساس القانوني للمعالجة</h2>
      <p>وفقًا للقانون 09-08، تستند معالجة بياناتكم إلى:</p>
      <ul>
        <li><strong>تنفيذ العقد</strong>: لمعالجة الطلبات والتوصيل.</li>
        <li><strong>موافقتكم</strong>: للاتصالات التسويقية وملفات تعريف الارتباط غير الأساسية.</li>
        <li><strong>مصلحتنا المشروعة</strong>: لتحسين خدماتنا ومنع الاحتيال.</li>
        <li><strong>الامتثال لالتزام قانوني</strong>: للاحتفاظ بالمستندات المحاسبية والضريبية.</li>
      </ul>

      <h2>5. مدة الاحتفاظ بالبيانات</h2>
      <ul>
        <li><strong>بيانات الطلبات</strong>: تُحفظ لمدة 10 سنوات (الالتزامات المحاسبية والضريبية المغربية).</li>
        <li><strong>بيانات حساب العميل</strong>: تُحفظ طوال مدة نشاط الحساب، ثم 3 سنوات بعد آخر تفاعل.</li>
        <li><strong>بيانات التواصل والشكاوى</strong>: تُحفظ لمدة 3 سنوات بعد إغلاق الطلب.</li>
        <li><strong>بيانات التصفح (ملفات تعريف الارتباط)</strong>: 13 شهرًا كحد أقصى.</li>
      </ul>

      <h2>6. الجهات المستفيدة من البيانات</h2>
      <p>يمكن مشاركة بياناتكم مع:</p>
      <ul>
        <li><strong>مزوّدي الخدمات اللوجستية</strong> (شركات النقل) لتوصيل طلباتكم.</li>
        <li><strong>مزوّدي خدمات الدفع</strong> (CMI وغيرها) لمعالجة المدفوعات بأمان.</li>
        <li><strong>أدواتنا المعلوماتية</strong> (الاستضافة، إدارة علاقات العملاء، النشرة الإخبارية) الخاضعة لالتزامات السرية.</li>
        <li><strong>السلطات المختصة</strong> في حال وجود التزام قانوني.</li>
      </ul>
      <p>لا تُباع بياناتكم <strong>أبدًا</strong> لأطراف ثالثة.</p>

      <h2>7. حقوقكم</h2>
      <p>وفقًا للقانون 09-08، تتمتعون بالحقوق التالية:</p>
      <ul>
        <li><strong>الحق في الوصول</strong>: الحصول على نسخة من بياناتكم الشخصية.</li>
        <li><strong>الحق في التصحيح</strong>: تصحيح البيانات غير الدقيقة أو الناقصة.</li>
        <li><strong>الحق في الاعتراض</strong>: الاعتراض على المعالجة لأغراض التسويق المباشر.</li>
        <li><strong>الحق في المحو</strong>: طلب حذف بياناتكم وفق الشروط التي ينص عليها القانون.</li>
      </ul>
      <p>
        لممارسة هذه الحقوق، يُرجى التواصل معنا عبر: <a href="mailto:support@arinilock.ma" className={linkClass}>support@arinilock.ma</a> أو بالبريد إلى العنوان المذكور في المادة 1. سنُقر باستلام طلبكم خلال 5 أيام عمل ونعالجه في مدة أقصاها 30 يومًا.
      </p>
      <p>
        يحق لكم أيضًا تقديم شكوى لدى <strong>اللجنة الوطنية لمراقبة حماية المعطيات ذات الطابع الشخصي (CNDP)</strong> بالمملكة المغربية.
      </p>

      <h2>8. ملفات تعريف الارتباط (Cookies)</h2>
      <p>يستخدم موقعنا ملفات تعريف الارتباط من أجل:</p>
      <ul>
        <li><strong>ملفات أساسية</strong>: تشغيل السلة والجلسة (الأساس القانوني: المصلحة المشروعة).</li>
        <li><strong>ملفات تحليلية</strong>: قياس عدد الزوار بشكل مجهول (الأساس القانوني: الموافقة).</li>
        <li><strong>ملفات تسويقية</strong>: إعلانات مستهدفة (الأساس القانوني: الموافقة).</li>
      </ul>
      <p>يمكنكم في أي وقت ضبط أو سحب موافقتكم على ملفات تعريف الارتباط عبر الشريط الظاهر على موقعنا.</p>

      <h2>9. أمن البيانات</h2>
      <p>
        تعتمد ARINILOCK تدابير تقنية وتنظيمية مناسبة لحماية بياناتكم من أي وصول غير مصرح به أو فقدان أو تغيير أو إفشاء: تشفير الاتصالات (HTTPS)، تقييد الوصول إلى البيانات، ومراقبة داخلية منتظمة.
      </p>

      <h2>10. النقل خارج المغرب</h2>
      <p>
        قد يكون بعض مزوّدي خدماتنا التقنية مقيمين خارج المغرب. في هذه الحالة، نتأكد من وجود ضمانات مناسبة (بنود تعاقدية نموذجية أو ما يعادلها) وفقًا للقانون 09-08.
      </p>

      <h2>11. التعديلات</h2>
      <p>
        نحتفظ بالحق في تعديل هذه السياسة في أي وقت. النسخة السارية هي تلك المعروضة على هذه الصفحة. سيتم إخطاركم بأي تعديل جوهري عبر البريد الإلكتروني أو عبر شريط إشعار على الموقع.
      </p>

      <h2>12. التواصل</h2>
      <p>
        لأي سؤال يتعلق بهذه السياسة، يُرجى التواصل مع مسؤول حماية البيانات لدينا:<br />
        <a href="mailto:support@arinilock.ma" className={linkClass}>support@arinilock.ma</a>
      </p>
    </>
  ),
};

export const termsContent: Record<Locale, ReactNode> = {
  fr: (
    <>
      <p>
        Les présentes Conditions Générales de Vente et d&apos;Utilisation (ci-après « CGV ») régissent l&apos;utilisation du site web <strong>www.arinilock.ma</strong> et les ventes conclues entre <strong>ARINILOCK</strong> (vendeur) et tout client (acheteur) passant commande via le site ou par tout autre canal de vente de la Société. Toute commande implique l&apos;acceptation pleine et entière des présentes CGV.
      </p>

      <h2>1. Identification du vendeur</h2>
      <p>
        <strong>ARINILOCK</strong><br />
        Bd Zoulikha Nasri, Corner Office N°19, Sidi Maarouf, Casablanca, Maroc<br />
        Tél. : <span dir="ltr">+212 6 68 89 88 60</span><br />
        E-mail : support@arinilock.ma<br />
        Horaires : Lundi au Vendredi, 9h–18h
      </p>

      <h2>2. Utilisation du site</h2>
      <p>
        Le site www.arinilock.ma est réservé à un usage personnel et non commercial. Il est interdit de reproduire, distribuer, modifier ou exploiter tout contenu du site sans autorisation écrite préalable d&apos;ARINILOCK. L&apos;accès au site suppose l&apos;acceptation des présentes conditions et de notre{" "}
        <NextLink href="/politique-de-confidentialite" className={linkClass}>
          Politique de confidentialité
        </NextLink>.
      </p>

      <h2>3. Produits</h2>
      <p>
        ARINILOCK commercialise des serrures connectées et accessoires domotiques pour usage résidentiel et professionnel au Maroc. Les produits sont conformes aux réglementations de sécurité européenne (CE) et marocaine (ANRT). Les descriptions, photos et caractéristiques techniques sont fournies à titre indicatif et peuvent être modifiées sans préavis.
      </p>

      <h2>4. Prix</h2>
      <p>
        Les prix sont indiqués en <strong>Dirham Marocain (MAD), toutes taxes comprises (TTC)</strong>. ARINILOCK se réserve le droit de modifier ses prix à tout moment. Les prix applicables sont ceux en vigueur au moment de la validation de la commande. La livraison et l&apos;installation sont <strong>offertes</strong> sur l&apos;ensemble du territoire marocain.
      </p>

      <h2>5. Commande</h2>
      <p>
        Toute commande passée sur le site ou par téléphone constitue un contrat de vente ferme et définitif, sous réserve de disponibilité du produit. ARINILOCK se réserve le droit d&apos;annuler toute commande en cas de stock indisponible, d&apos;information erronée ou de suspicion de fraude, avec remboursement intégral si un paiement a été effectué.
      </p>
      <p>
        Un e-mail ou un SMS de confirmation de commande est envoyé après validation. Notre équipe vous contactera dans un délai de <strong>24 heures ouvrées</strong> pour confirmer les détails de livraison.
      </p>

      <h2>6. Modalités de paiement</h2>

      <h3>6.1 Paiement à la livraison (Cash on Delivery)</h3>
      <p>
        Le paiement s&apos;effectue en espèces directement auprès du livreur, à la réception de votre commande. Aucune information bancaire n&apos;est requise pour ce mode de paiement. Ce mode est disponible sur l&apos;ensemble du territoire marocain.
      </p>

      <h3>6.2 Paiement par carte bancaire</h3>
      <p>
        ARINILOCK accepte les paiements par carte Visa, Mastercard et CMI (Centre Monétique Interbancaire). Les transactions sont sécurisées par un protocole de chiffrement SSL et traitées via une passerelle de paiement certifiée. ARINILOCK n&apos;a accès à aucune donnée bancaire : celles-ci sont traitées exclusivement par l&apos;organisme de paiement.
      </p>

      <h3>6.3 Sécurité des paiements</h3>
      <p>
        En cas de paiement en ligne, toutes les transactions sont protégées par le protocole 3D Secure. En cas de fraude avérée, ARINILOCK se réserve le droit d&apos;annuler la commande et d&apos;alerter les autorités compétentes.
      </p>

      <h2>7. Livraison et installation</h2>
      <p>
        <strong>Livraison gratuite</strong> dans toutes les villes du Maroc. Le délai de livraison est de <strong>2 à 4 jours ouvrés</strong> à compter de la confirmation de commande. L&apos;<strong>installation est incluse et offerte</strong>, réalisée par nos techniciens certifiés.
      </p>
      <p>
        En cas d&apos;absence lors de la livraison, un nouveau rendez-vous sera convenu avec vous. ARINILOCK ne saurait être tenu responsable des retards dus à des événements de force majeure.
      </p>

      <h2>8. Droit de rétractation et retours</h2>
      <p>
        Conformément à la réglementation marocaine en vigueur et à la politique commerciale d&apos;ARINILOCK, le client dispose d&apos;un délai de <strong>30 jours</strong> à compter de la réception du produit pour effectuer une demande de retour, à condition que le produit soit dans son état d&apos;origine, non utilisé et dans son emballage d&apos;origine.
      </p>
      <p>
        Pour initier un retour, contactez-nous à support@arinilock.ma ou par téléphone au <span dir="ltr">+212 6 68 89 88 60</span>. Les frais de retour sont à la charge du client, sauf en cas de défaut du produit constaté à la livraison.
      </p>

      <h2>9. Garantie</h2>
      <p>
        Tous les produits ARINILOCK bénéficient d&apos;une <strong>garantie constructeur de 2 ans</strong> couvrant tout défaut de fabrication dans des conditions normales d&apos;utilisation. La garantie ne couvre pas les dommages résultant d&apos;une utilisation incorrecte, d&apos;une usure normale ou d&apos;une modification non autorisée du produit.
      </p>
      <p>
        Pour toute demande de garantie, contactez notre service après-vente muni de votre preuve d&apos;achat. Notre équipe intervient 7j/7 via WhatsApp.
      </p>

      <h2>10. Responsabilité</h2>
      <p>
        ARINILOCK s&apos;engage à délivrer des produits conformes aux descriptions publiées. La responsabilité d&apos;ARINILOCK ne saurait être engagée en cas d&apos;utilisation du produit non conforme aux instructions, de dommages indirects ou de perte de données. Les serrures connectées ARINILOCK sont conçues comme un complément de sécurité et ne remplacent pas l&apos;ensemble des mesures de sécurité d&apos;un domicile ou d&apos;un établissement.
      </p>

      <h2>11. Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des éléments du site www.arinilock.ma (marque, logo, textes, images, graphismes) sont la propriété exclusive d&apos;ARINILOCK et sont protégés par les lois marocaines sur la propriété intellectuelle. Toute reproduction, même partielle, est interdite sans autorisation préalable.
      </p>

      <h2>12. Protection des données personnelles</h2>
      <p>
        Le traitement des données personnelles collectées lors d&apos;une commande est régi par notre{" "}
        <NextLink href="/politique-de-confidentialite" className={linkClass}>
          Politique de confidentialité
        </NextLink>
        , conformément à la loi marocaine n° 09-08.
      </p>

      <h2>13. Droit applicable et litiges</h2>
      <p>
        Les présentes CGV sont soumises au <strong>droit marocain</strong>. En cas de litige, les parties s&apos;engagent à rechercher une solution amiable avant tout recours judiciaire. À défaut d&apos;accord amiable, les tribunaux compétents de <strong>Casablanca</strong> seront seuls compétents.
      </p>

      <h2>14. Modifications des CGV</h2>
      <p>
        ARINILOCK se réserve le droit de modifier les présentes CGV à tout moment. La version applicable est celle en vigueur à la date de la commande, accessible sur cette page.
      </p>

      <h2>15. Contact</h2>
      <p>
        Pour toute question relative aux présentes conditions :<br />
        <a href="mailto:support@arinilock.ma" className={linkClass}>support@arinilock.ma</a><br />
        Tél. : <span dir="ltr">+212 6 68 89 88 60</span> — Lun–Ven, 9h–18h
      </p>
    </>
  ),
  en: (
    <>
      <p>
        These Terms of Sale and Use (hereinafter the &quot;Terms&quot;) govern the use of the website <strong>www.arinilock.ma</strong> and sales concluded between <strong>ARINILOCK</strong> (seller) and any customer (buyer) placing an order via the site or any other sales channel of the Company. Any order implies full acceptance of these Terms.
      </p>

      <h2>1. Seller identification</h2>
      <p>
        <strong>ARINILOCK</strong><br />
        Bd Zoulikha Nasri, Corner Office N°19, Sidi Maarouf, Casablanca, Morocco<br />
        Phone: <span dir="ltr">+212 6 68 89 88 60</span><br />
        Email: support@arinilock.ma<br />
        Hours: Monday to Friday, 9am–6pm
      </p>

      <h2>2. Use of the site</h2>
      <p>
        The www.arinilock.ma site is reserved for personal, non-commercial use. Reproducing, distributing, modifying or exploiting any content of the site without ARINILOCK&apos;s prior written authorization is prohibited. Access to the site implies acceptance of these terms and of our{" "}
        <NextLink href="/politique-de-confidentialite" className={linkClass}>
          Privacy Policy
        </NextLink>.
      </p>

      <h2>3. Products</h2>
      <p>
        ARINILOCK markets connected locks and home-automation accessories for residential and professional use in Morocco. Products comply with European (CE) and Moroccan (ANRT) safety regulations. Descriptions, photos and technical specifications are provided for guidance only and may be changed without notice.
      </p>

      <h2>4. Prices</h2>
      <p>
        Prices are shown in <strong>Moroccan Dirham (MAD), all taxes included</strong>. ARINILOCK reserves the right to change its prices at any time. Applicable prices are those in effect at the time the order is confirmed. Delivery and installation are <strong>free</strong> throughout Moroccan territory.
      </p>

      <h2>5. Orders</h2>
      <p>
        Any order placed on the site or by phone constitutes a firm and final sales contract, subject to product availability. ARINILOCK reserves the right to cancel any order in the event of unavailable stock, incorrect information, or suspected fraud, with a full refund if payment has already been made.
      </p>
      <p>
        A confirmation email or SMS is sent after validation. Our team will contact you within <strong>24 business hours</strong> to confirm delivery details.
      </p>

      <h2>6. Payment methods</h2>

      <h3>6.1 Cash on Delivery</h3>
      <p>
        Payment is made in cash directly to the delivery agent upon receipt of your order. No banking information is required for this payment method. It is available throughout Moroccan territory.
      </p>

      <h3>6.2 Card payment</h3>
      <p>
        ARINILOCK accepts payment by Visa, Mastercard and CMI (Centre Monétique Interbancaire). Transactions are secured by SSL encryption and processed through a certified payment gateway. ARINILOCK has no access to any banking data: this is processed exclusively by the payment provider.
      </p>

      <h3>6.3 Payment security</h3>
      <p>
        For online payments, all transactions are protected by the 3D Secure protocol. In the event of proven fraud, ARINILOCK reserves the right to cancel the order and alert the competent authorities.
      </p>

      <h2>7. Delivery and installation</h2>
      <p>
        <strong>Free delivery</strong> in all cities of Morocco. Delivery time is <strong>2 to 4 business days</strong> from order confirmation. <strong>Installation is included and free</strong>, carried out by our certified technicians.
      </p>
      <p>
        If you are unavailable at the time of delivery, a new appointment will be arranged with you. ARINILOCK cannot be held liable for delays due to events of force majeure.
      </p>

      <h2>8. Right of withdrawal and returns</h2>
      <p>
        In accordance with applicable Moroccan regulations and ARINILOCK&apos;s commercial policy, the customer has <strong>30 days</strong> from receipt of the product to request a return, provided the product is in its original condition, unused and in its original packaging.
      </p>
      <p>
        To initiate a return, contact us at support@arinilock.ma or by phone at <span dir="ltr">+212 6 68 89 88 60</span>. Return costs are borne by the customer, except in the event of a product defect noted upon delivery.
      </p>

      <h2>9. Warranty</h2>
      <p>
        All ARINILOCK products come with a <strong>2-year manufacturer warranty</strong> covering any manufacturing defect under normal conditions of use. The warranty does not cover damage resulting from incorrect use, normal wear, or unauthorized modification of the product.
      </p>
      <p>
        For any warranty claim, contact our after-sales service with proof of purchase. Our team is available 7 days a week via WhatsApp.
      </p>

      <h2>10. Liability</h2>
      <p>
        ARINILOCK undertakes to deliver products consistent with their published descriptions. ARINILOCK cannot be held liable for use of the product that does not comply with the instructions, indirect damages, or data loss. ARINILOCK connected locks are designed as a security enhancement and do not replace the full set of security measures for a home or premises.
      </p>

      <h2>11. Intellectual property</h2>
      <p>
        All elements of the www.arinilock.ma site (brand, logo, text, images, graphics) are the exclusive property of ARINILOCK and are protected by Moroccan intellectual property law. Any reproduction, even partial, is prohibited without prior authorization.
      </p>

      <h2>12. Personal data protection</h2>
      <p>
        The processing of personal data collected when placing an order is governed by our{" "}
        <NextLink href="/politique-de-confidentialite" className={linkClass}>
          Privacy Policy
        </NextLink>
        , in accordance with Moroccan Law No. 09-08.
      </p>

      <h2>13. Applicable law and disputes</h2>
      <p>
        These Terms are governed by <strong>Moroccan law</strong>. In the event of a dispute, the parties agree to seek an amicable solution before any legal action. Failing an amicable agreement, the competent courts of <strong>Casablanca</strong> shall have sole jurisdiction.
      </p>

      <h2>14. Changes to these Terms</h2>
      <p>
        ARINILOCK reserves the right to modify these Terms at any time. The applicable version is the one in effect on the date of the order, accessible on this page.
      </p>

      <h2>15. Contact</h2>
      <p>
        For any question relating to these terms:<br />
        <a href="mailto:support@arinilock.ma" className={linkClass}>support@arinilock.ma</a><br />
        Phone: <span dir="ltr">+212 6 68 89 88 60</span> — Mon–Fri, 9am–6pm
      </p>
    </>
  ),
  ar: (
    <>
      <p>
        تحكم هذه الشروط العامة للبيع والاستخدام (يُشار إليها فيما يلي بـ«الشروط العامة») استخدام الموقع الإلكتروني <strong>www.arinilock.ma</strong> والمبيعات المُبرَمة بين <strong>ARINILOCK</strong> (البائع) وأي عميل (المشتري) يقوم بطلب عبر الموقع أو عبر أي قناة بيع أخرى تابعة للشركة. يعني أي طلب القبول الكامل والتام لهذه الشروط العامة.
      </p>

      <h2>1. تعريف البائع</h2>
      <p>
        <strong>ARINILOCK</strong><br />
        شارع زليخة ناصري، Corner Office رقم 19، سيدي معروف، الدار البيضاء، المغرب<br />
        الهاتف: <span dir="ltr">+212 6 68 89 88 60</span><br />
        البريد الإلكتروني: support@arinilock.ma<br />
        ساعات العمل: من الاثنين إلى الجمعة، من 9 صباحًا إلى 6 مساءً
      </p>

      <h2>2. استخدام الموقع</h2>
      <p>
        موقع www.arinilock.ma مخصص للاستخدام الشخصي وغير التجاري. يُمنع نسخ أو توزيع أو تعديل أو استغلال أي محتوى من الموقع دون إذن كتابي مسبق من ARINILOCK. يفترض الوصول إلى الموقع قبول هذه الشروط وسياسة{" "}
        <NextLink href="/politique-de-confidentialite" className={linkClass}>
          الخصوصية
        </NextLink>{" "}
        الخاصة بنا.
      </p>

      <h2>3. المنتجات</h2>
      <p>
        تسوّق ARINILOCK أقفالًا ذكية وملحقات منزلية ذكية للاستخدام السكني والمهني في المغرب. المنتجات مطابقة للوائح الأمنية الأوروبية (CE) والمغربية (ANRT). الأوصاف والصور والمواصفات التقنية مقدَّمة على سبيل الإرشاد فقط وقد تتغير دون إشعار مسبق.
      </p>

      <h2>4. الأسعار</h2>
      <p>
        تُعرض الأسعار بـ<strong>الدرهم المغربي (MAD)، شاملة جميع الضرائب</strong>. تحتفظ ARINILOCK بالحق في تعديل أسعارها في أي وقت. الأسعار المعمول بها هي تلك السارية وقت تأكيد الطلب. التوصيل والتركيب <strong>مجانيان</strong> في جميع أنحاء التراب المغربي.
      </p>

      <h2>5. الطلب</h2>
      <p>
        يشكّل أي طلب يُقدَّم عبر الموقع أو عبر الهاتف عقد بيع نهائيًا وملزمًا، رهنًا بتوفر المنتج. تحتفظ ARINILOCK بالحق في إلغاء أي طلب في حال نفاد المخزون أو وجود معلومات خاطئة أو الاشتباه في احتيال، مع استرداد كامل للمبلغ في حال تم الدفع.
      </p>
      <p>
        يُرسَل بريد إلكتروني أو رسالة نصية لتأكيد الطلب بعد التحقق منه. سيتواصل معكم فريقنا خلال <strong>24 ساعة عمل</strong> لتأكيد تفاصيل التوصيل.
      </p>

      <h2>6. طرق الدفع</h2>

      <h3>6.1 الدفع عند الاستلام</h3>
      <p>
        يتم الدفع نقدًا مباشرة لمندوب التوصيل عند استلام طلبكم. لا تُطلب أي معلومات بنكية لهذه الطريقة. وهي متاحة في جميع أنحاء التراب المغربي.
      </p>

      <h3>6.2 الدفع بالبطاقة البنكية</h3>
      <p>
        تقبل ARINILOCK الدفع عبر بطاقات Visa وMastercard وCMI (المركز النقدي البيني البنكي). العمليات مؤمَّنة بواسطة بروتوكول تشفير SSL وتُعالَج عبر بوابة دفع معتمدة. لا تصل ARINILOCK إلى أي بيانات بنكية، إذ تُعالَج حصريًا من طرف مزوّد خدمة الدفع.
      </p>

      <h3>6.3 أمن المدفوعات</h3>
      <p>
        بالنسبة للدفع عبر الإنترنت، تخضع جميع العمليات لحماية بروتوكول 3D Secure. في حال ثبوت الاحتيال، تحتفظ ARINILOCK بالحق في إلغاء الطلب وإخطار السلطات المختصة.
      </p>

      <h2>7. التوصيل والتركيب</h2>
      <p>
        <strong>توصيل مجاني</strong> إلى جميع مدن المغرب. مدة التوصيل تتراوح بين <strong>2 و4 أيام عمل</strong> ابتداءً من تأكيد الطلب. <strong>التركيب مشمول ومجاني</strong>، ويُنجَز من طرف تقنيّينا المعتمدين.
      </p>
      <p>
        في حال غيابكم وقت التوصيل، سيتم الاتفاق معكم على موعد جديد. لا تتحمل ARINILOCK مسؤولية أي تأخير ناتج عن ظروف قاهرة.
      </p>

      <h2>8. الحق في التراجع والإرجاع</h2>
      <p>
        وفقًا للتنظيم المغربي الساري وللسياسة التجارية لـ ARINILOCK، يتوفر العميل على مهلة <strong>30 يومًا</strong> ابتداءً من استلام المنتج لتقديم طلب إرجاع، شريطة أن يكون المنتج في حالته الأصلية وغير مستعمل وفي تغليفه الأصلي.
      </p>
      <p>
        لبدء عملية الإرجاع، يُرجى التواصل معنا عبر support@arinilock.ma أو عبر الهاتف على <span dir="ltr">+212 6 68 89 88 60</span>. تكون مصاريف الإرجاع على عاتق العميل، إلا في حال ثبوت عيب في المنتج عند التوصيل.
      </p>

      <h2>9. الضمان</h2>
      <p>
        تستفيد جميع منتجات ARINILOCK من <strong>ضمان البائع لمدة سنتين</strong> يغطي أي عيب في التصنيع ضمن ظروف الاستخدام العادية. لا يغطي الضمان الأضرار الناتجة عن استخدام غير صحيح أو تآكل عادي أو تعديل غير مصرح به للمنتج.
      </p>
      <p>
        لأي طلب ضمان، يُرجى التواصل مع خدمة ما بعد البيع مصحوبًا بإثبات الشراء. فريقنا متاح 7 أيام في الأسبوع عبر واتساب.
      </p>

      <h2>10. المسؤولية</h2>
      <p>
        تلتزم ARINILOCK بتسليم منتجات مطابقة للأوصاف المنشورة. لا يمكن تحميل ARINILOCK المسؤولية في حال استخدام المنتج بشكل مخالف للتعليمات، أو الأضرار غير المباشرة، أو فقدان البيانات. صُمِّمت أقفال ARINILOCK الذكية كعنصر إضافي للأمان ولا تُغني عن مجمل تدابير الأمان في المنزل أو المنشأة.
      </p>

      <h2>11. الملكية الفكرية</h2>
      <p>
        جميع عناصر موقع www.arinilock.ma (العلامة، الشعار، النصوص، الصور، التصاميم) هي ملكية حصرية لـ ARINILOCK ومحمية بموجب القوانين المغربية المتعلقة بالملكية الفكرية. يُمنع أي نسخ، ولو جزئي، دون إذن مسبق.
      </p>

      <h2>12. حماية المعطيات الشخصية</h2>
      <p>
        تخضع معالجة المعطيات الشخصية المجموعة عند تقديم الطلب لسياسة{" "}
        <NextLink href="/politique-de-confidentialite" className={linkClass}>
          الخصوصية
        </NextLink>{" "}
        الخاصة بنا، وفقًا للقانون المغربي رقم 09-08.
      </p>

      <h2>13. القانون المعمول به والنزاعات</h2>
      <p>
        تخضع هذه الشروط العامة <strong>للقانون المغربي</strong>. في حال نشوء نزاع، يلتزم الطرفان بالسعي لإيجاد حل ودّي قبل أي لجوء قضائي. وفي حال تعذّر الاتفاق الودّي، تكون المحاكم المختصة في <strong>الدار البيضاء</strong> هي وحدها المختصة.
      </p>

      <h2>14. تعديل الشروط العامة</h2>
      <p>
        تحتفظ ARINILOCK بالحق في تعديل هذه الشروط العامة في أي وقت. النسخة المعمول بها هي تلك السارية بتاريخ الطلب، والمتاحة على هذه الصفحة.
      </p>

      <h2>15. التواصل</h2>
      <p>
        لأي سؤال يتعلق بهذه الشروط:<br />
        <a href="mailto:support@arinilock.ma" className={linkClass}>support@arinilock.ma</a><br />
        الهاتف: <span dir="ltr">+212 6 68 89 88 60</span> — الاثنين–الجمعة، 9 صباحًا–6 مساءً
      </p>
    </>
  ),
};
