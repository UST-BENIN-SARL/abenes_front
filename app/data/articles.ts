import type { Article } from '~/types/article'

const IMAGES = '/images/news'
const PRODUCT_IMAGES = '/images/products'

// Articles d'exemple : à remplacer par les vraies actualités d'ABENES.
// Les photos sont des images libres (Wikimedia Commons, licence CC) choisies
// pour illustrer le thème de chaque article en attendant les vraies photos
// des événements ABENES.
export const ARTICLES: Article[] = [
  {
    slug: 'abenes-10-ans-engagement-sante',
    title: 'ABENES SARL fête 10 ans d’engagement au service de la santé',
    category: 'company',
    author: 'Équipe ABENES',
    publishedAt: '2026-06-20',
    featured: true,
    excerpt:
      "Depuis sa création en 2016, ABENES accompagne hôpitaux, cliniques et laboratoires d'Afrique de l'Ouest. Retour sur dix années d'engagement.",
    image: `${IMAGES}/company-anniversary.jpg`,
    keywords: ['ABENES', 'Anniversaire', 'Vie de l’entreprise', 'Afrique de l’Ouest'],
    body: [
      "En 2026, ABENES SARL célèbre dix années d'activité au service des professionnels de santé d'Afrique de l'Ouest. Depuis nos débuts à Cotonou, notre mission est restée la même : permettre l'accès à des équipements médicaux et de laboratoire fiables, et accompagner nos clients sur toute la durée de vie de leurs équipements.",
      "Au fil des années, notre catalogue s'est élargi : diagnostic, mobilier médical, équipement de laboratoire, réactifs et consommables. Notre service technique s'est structuré pour offrir une maintenance préventive et corrective réactive, partout où nos clients en ont besoin.",
      "Cet anniversaire est aussi l'occasion de remercier nos partenaires institutionnels, nos fournisseurs et surtout les équipes soignantes qui nous font confiance au quotidien. Les dix prochaines années s'annoncent tout aussi engagées, avec de nouveaux projets d'équipement d'hôpitaux et de laboratoires dans la région.",
      "Toute l'équipe ABENES tient à remercier ses clients, partenaires et collaborateurs pour ce dixième anniversaire, et reste pleinement mobilisée pour les années à venir."
    ]
  },
  {
    slug: 'nouvelle-gamme-lits-medicalises-abya',
    title: 'Notre gamme de lits médicalisés électriques ABYA s’agrandit',
    category: 'products',
    author: 'Équipe ABENES',
    publishedAt: '2026-06-15',
    featured: true,
    excerpt:
      "De nouveaux modèles de lits médicalisés électriques rejoignent notre catalogue, pensés pour le confort des patients et l'ergonomie des équipes soignantes.",
    image: `${PRODUCT_IMAGES}/hospital-bed-1.png`,
    keywords: ['Lit médicalisé', 'Mobilier médical', 'Gamme ABYA', 'Nouveauté'],
    body: [
      "Notre gamme de lits médicalisés électriques ABYA continue de s'enrichir, avec de nouveaux modèles destinés aux services de long séjour, de soins continus et au maintien à domicile.",
      "Ces lits intègrent un réglage électrique de la hauteur, du relève-buste et du relève-jambes, des panneaux latéraux amovibles et des roulettes freinées centralement, pour une utilisation simple et sécurisée par les équipes soignantes.",
      "Comme pour l'ensemble de notre catalogue, chaque modèle est accompagné d'une fiche technique détaillée et d'un service de maintenance assuré par nos techniciens biomédicaux. N'hésitez pas à consulter notre page produits pour découvrir l'ensemble de la gamme et demander un devis adapté à vos besoins."
    ]
  },
  {
    slug: 'abenes-salon-international-sante-cotonou',
    title: 'ABENES présent au Salon international de la santé de Cotonou',
    category: 'events',
    author: 'Équipe ABENES',
    publishedAt: '2026-06-05',
    excerpt:
      "Notre équipe commerciale et technique a présenté une sélection d'équipements de diagnostic et de laboratoire lors du salon santé de Cotonou.",
    image: `${PRODUCT_IMAGES}/ecg-machine.jpg`,
    keywords: ['Salon', 'Événement', 'Cotonou', 'Diagnostic'],
    body: [
      "ABENES a participé cette année au Salon international de la santé de Cotonou, un rendez-vous incontournable pour les professionnels de santé d'Afrique de l'Ouest.",
      "Sur notre stand, les visiteurs ont pu découvrir une sélection d'équipements de diagnostic, de mobilier médical et de solutions de laboratoire, avec des démonstrations assurées par notre équipe technique.",
      "Ce type d'événement est aussi l'occasion d'échanger directement avec les équipes soignantes sur leurs besoins du quotidien, et d'affiner notre accompagnement technique et commercial. Merci à toutes les personnes qui sont venues à notre rencontre durant ces trois jours."
    ]
  },
  {
    slug: 'partenariat-renforce-ministere-sante-benin',
    title: 'ABENES renforce sa collaboration avec le Ministère de la Santé du Bénin',
    category: 'partnerships',
    author: 'Équipe ABENES',
    publishedAt: '2026-05-28',
    excerpt:
      "Un nouvel accord-cadre vient renforcer notre collaboration de longue date avec le Ministère de la Santé, pour l'équipement de plusieurs structures publiques.",
    image: `${IMAGES}/partnership-ministry.jpg`,
    keywords: ['Partenariat', 'Ministère de la Santé', 'Bénin', 'Secteur public'],
    body: [
      "ABENES entretient depuis plusieurs années une collaboration étroite avec le Ministère de la Santé du Bénin, dans le cadre de l'équipement de structures de santé publiques.",
      "Un nouvel accord-cadre vient renforcer cette collaboration, avec pour objectif d'équiper plusieurs centres de santé en matériel de diagnostic et de laboratoire, ainsi que d'assurer la maintenance de ces équipements sur le long terme.",
      "Cette collaboration illustre notre engagement à accompagner durablement les acteurs publics de la santé, au-delà de la simple fourniture d'équipement."
    ]
  },
  {
    slug: 'journee-mondiale-don-sang-2026',
    title: 'Journée mondiale du don de sang : ABENES sensibilise ses équipes',
    category: 'health',
    author: 'Équipe ABENES',
    publishedAt: '2026-06-12',
    excerpt:
      "À l'occasion de la Journée mondiale du don de sang, nos équipes se sont mobilisées pour sensibiliser et encourager le don dans nos locaux de Cotonou.",
    keywords: ['Don de sang', 'Santé publique', 'Sensibilisation', 'Cotonou'],
    body: [
      "Chaque année, la Journée mondiale du don de sang est l'occasion de rappeler l'importance de ce geste simple et essentiel pour les systèmes de santé.",
      "Cette année, les équipes ABENES se sont mobilisées en interne pour sensibiliser les collaborateurs à l'importance du don de sang, en lien avec les centres de transfusion locaux.",
      "En tant qu'acteur du secteur de la santé, il nous tient à cœur de soutenir ce type d'initiative qui contribue directement à sauver des vies à travers la région."
    ]
  },
  {
    slug: 'formation-continue-techniciens-biomedicaux',
    title: 'Formation continue : nos techniciens biomédicaux montent en compétence',
    category: 'company',
    author: 'Équipe ABENES',
    publishedAt: '2026-06-01',
    excerpt:
      "Nos techniciens biomédicaux ont suivi une nouvelle session de formation constructeur, afin d'assurer une maintenance toujours plus réactive et qualifiée.",
    image: `${IMAGES}/technician-training.jpg`,
    keywords: ['Formation', 'Technicien biomédical', 'Maintenance', 'Service technique'],
    body: [
      "La qualité de notre service après-vente repose avant tout sur l'expertise de nos techniciens biomédicaux. C'est pourquoi nous investissons régulièrement dans leur formation continue.",
      "Cette session portait sur la maintenance préventive et corrective de plusieurs familles d'équipements de notre catalogue, avec des ateliers pratiques animés par nos partenaires fabricants.",
      "Cet investissement dans les compétences de nos équipes techniques se traduit directement par un service plus rapide et plus fiable pour nos clients hospitaliers et laboratoires."
    ]
  },
  {
    slug: 'suivi-glycemie-conseils-prevention',
    title: 'Suivi de la glycémie : pourquoi un contrôle régulier change tout',
    category: 'health',
    author: 'Équipe ABENES',
    publishedAt: '2026-05-20',
    featured: true,
    excerpt:
      "Le suivi régulier de la glycémie reste l'un des gestes de prévention les plus efficaces. Quelques repères simples pour mieux comprendre son intérêt.",
    image: `${PRODUCT_IMAGES}/glucose-meters.jpg`,
    keywords: ['Glycémie', 'Diabète', 'Prévention', 'Santé publique'],
    body: [
      "Le suivi de la glycémie est un geste de prévention essentiel, en particulier pour les personnes diabétiques ou à risque. Un contrôle régulier permet de détecter rapidement un déséquilibre et d'ajuster le traitement ou les habitudes de vie.",
      "Les lecteurs de glycémie et bandelettes réactives disponibles aujourd'hui permettent un résultat fiable en quelques secondes, avec un faible volume de sang nécessaire, facilitant un suivi au quotidien.",
      "ABENES propose une gamme de dispositifs de diagnostic et de consommables associés, à destination des professionnels de santé comme des structures de dépistage communautaire.",
      "Comme toujours, ce type de suivi doit s'inscrire dans un accompagnement médical global, en lien avec un professionnel de santé."
    ]
  },
  {
    slug: 'equipement-bloc-operatoire-cnhu-hkm',
    title: 'ABENES accompagne l’équipement d’un bloc opératoire au CNHU-HKM',
    category: 'partnerships',
    author: 'Équipe ABENES',
    publishedAt: '2026-05-10',
    excerpt:
      "Dans le cadre de notre partenariat avec le CNHU-HKM, ABENES a participé à l'équipement et à la mise en service d'un nouveau bloc opératoire.",
    image: `${IMAGES}/operating-room.jpg`,
    keywords: ['CNHU-HKM', 'Bloc opératoire', 'Partenariat', 'Équipement hospitalier'],
    body: [
      "Le Centre National Hospitalier et Universitaire Hubert Koutoukou Maga (CNHU-HKM) fait partie des établissements partenaires avec lesquels ABENES collabore depuis plusieurs années.",
      "Dans le cadre de ce partenariat, notre équipe a participé à la fourniture et à la mise en service d'équipements pour un nouveau bloc opératoire, en lien étroit avec les équipes biomédicales de l'hôpital.",
      "Cette mission illustre le rôle d'ABENES non seulement comme fournisseur d'équipements, mais aussi comme partenaire technique tout au long des projets d'équipement hospitalier."
    ]
  },
  {
    slug: 'abenes-recrute-postes-techniques-commerciaux',
    title: 'ABENES recrute : plusieurs postes techniques et commerciaux à pourvoir',
    category: 'company',
    author: 'Équipe ABENES',
    publishedAt: '2026-06-22',
    excerpt:
      "ABENES renforce ses équipes techniques et commerciales pour accompagner sa croissance. Découvrez nos offres d'emploi actuellement ouvertes.",
    keywords: ['Recrutement', 'Carrières', 'Emploi', 'Équipe'],
    body: [
      "Pour accompagner sa croissance, ABENES SARL renforce actuellement ses équipes techniques et commerciales sur plusieurs villes du Bénin.",
      "Techniciens biomédicaux, responsables technico-commerciaux, profils logistique ou administratifs : plusieurs postes sont ouverts dès à présent, en CDI, CDD ou stage selon les opportunités.",
      "Consultez notre page Carrières pour découvrir l'ensemble de nos offres en cours et déposer votre candidature en ligne, CV à l'appui."
    ]
  },
  {
    slug: 'microscope-binoculaire-precision-confort',
    title: 'Notre microscope binoculaire de laboratoire : précision et confort',
    category: 'products',
    author: 'Équipe ABENES',
    publishedAt: '2026-04-28',
    excerpt:
      "Zoom sur notre microscope binoculaire de laboratoire, pensé pour l'observation quotidienne en analyses médicales et en enseignement.",
    image: `${PRODUCT_IMAGES}/microscope.jpg`,
    keywords: ['Microscope', 'Laboratoire', 'Diagnostic', 'Produits'],
    body: [
      "Parmi les équipements les plus demandés par nos clients laboratoires figure notre microscope binoculaire, apprécié pour sa robustesse et son confort d'utilisation au quotidien.",
      "Tête binoculaire inclinée à 30°, revolver à quatre objectifs et éclairage LED à intensité réglable : cet équipement convient aussi bien aux laboratoires d'analyses médicales qu'aux structures d'enseignement.",
      "Comme pour l'ensemble de notre gamme de laboratoire, ce microscope est accompagné d'une fiche technique détaillée et d'un service après-vente assuré par nos techniciens."
    ]
  },
  {
    slug: 'centrifugeuses-laboratoire-bien-choisir',
    title: 'Centrifugeuses de laboratoire : bien choisir son équipement',
    category: 'products',
    author: 'Équipe ABENES',
    publishedAt: '2026-04-15',
    excerpt:
      "Vitesse, capacité, niveau sonore... quelques critères utiles pour choisir la centrifugeuse de laboratoire la mieux adaptée à votre activité.",
    image: `${PRODUCT_IMAGES}/centrifuge.jpg`,
    keywords: ['Centrifugeuse', 'Laboratoire', 'Équipement', 'Conseils'],
    body: [
      "Le choix d'une centrifugeuse de laboratoire dépend avant tout du volume d'échantillons traités au quotidien et du type d'analyses réalisées.",
      "Capacité du rotor, vitesse maximale, durée de fonctionnement et niveau sonore sont autant de critères à prendre en compte avant l'achat, au même titre que la disponibilité d'un service de maintenance local.",
      "Notre équipe technique reste disponible pour vous conseiller sur le modèle le plus adapté à votre laboratoire, en fonction de votre activité et de votre budget."
    ]
  }
]
