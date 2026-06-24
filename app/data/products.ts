import type { Product } from '~/types/product'

const IMAGES = '/images/products'

// Fiche technique générique d'exemple, partagée par tout le catalogue tant
// qu'aucune vraie fiche PDF par produit n'a été fournie par ABENES.
const SAMPLE_DATASHEET = '/documents/fiches/fiche-technique-exemple.pdf'

// Catalogue d'exemple : à remplacer par les vrais produits, photos et fiches
// techniques d'ABENES. Les photos dans public/images/products/ sont des
// images libres (Wikimedia Commons, licence CC) choisies pour illustrer
// chaque catégorie en attendant les vraies photos du fabricant/distributeur.
export const PRODUCTS: Product[] = [
  {
    slug: 'assistance-assis-debout-abmk-at01',
    name: 'Assistance assis-debout ABMK-AT01',
    brand: 'ErgoCare',
    category: 'furniture',
    availability: 'in_stock',
    featured: true,
    shortDescription: 'Verticalisateur électrique pour le transfert et la mise en position debout des patients à mobilité réduite.',
    description:
      "Le verticalisateur ABMK-AT01 facilite le transfert et la mise en position debout des patients à mobilité réduite, en réduisant l'effort physique du personnel soignant et le risque de chute. Sangle de soutien thoracique réglable, base élargie et roulettes freinées pour une utilisation sécurisée en établissement comme à domicile.",
    highlights: [
      "Vérin électrique silencieux, commande filaire à 2 boutons",
      'Base à ouverture manuelle pour passer sous les fauteuils et lits',
      'Sangle de soutien thoracique réglable en hauteur',
      '4 roulettes pivotantes, 2 freinées'
    ],
    specs: [
      { label: 'Charge maximale', value: '150 kg' },
      { label: 'Hauteur de levage', value: '60 - 130 cm' },
      { label: 'Largeur de base (ouverte)', value: '92 cm' },
      { label: 'Alimentation', value: 'Batterie rechargeable 24V' },
      { label: 'Garantie', value: '2 ans pièces et main d’œuvre' }
    ],
    images: [`${IMAGES}/patient-lift.jpg`],
    datasheetUrl: SAMPLE_DATASHEET
  },
  {
    slug: 'fauteuil-inclinable-abya-ds-r03',
    name: 'Fauteuil inclinable ABYA-DS-R03',
    brand: 'ErgoCare',
    category: 'furniture',
    availability: 'in_stock',
    featured: true,
    shortDescription: "Fauteuil médicalisé inclinable pour salle de soins, dialyse ou repos prolongé, avec repose-jambes intégré.",
    description:
      "Conçu pour les séances de soins prolongées (dialyse, perfusion, repos post-opératoire), ce fauteuil médicalisé offre une inclinaison progressive du dossier et du repose-jambes pour un confort optimal du patient et un accès facilité pour le personnel soignant.",
    highlights: [
      'Inclinaison dossier et repose-jambes synchronisée',
      'Accoudoirs relevables pour faciliter les transferts',
      'Assise et dossier déhoussables, tissu lavable',
      'Roulettes freinées pour un déplacement sécurisé'
    ],
    specs: [
      { label: 'Charge maximale', value: '160 kg' },
      { label: 'Inclinaison dossier', value: '0° à 170°' },
      { label: 'Largeur d’assise', value: '58 cm' },
      { label: 'Habillage', value: 'Simili cuir médical, ignifugé' },
      { label: 'Garantie', value: '2 ans' }
    ],
    images: [`${IMAGES}/recliner-chair.jpg`],
    datasheetUrl: SAMPLE_DATASHEET
  },
  {
    slug: 'lit-de-sejour-electrique-abya-dh5-3',
    name: 'Lit de long séjour électrique ABYA-DH5-3',
    brand: 'ErgoCare',
    category: 'furniture',
    availability: 'on_order',
    featured: true,
    shortDescription: "Lit médicalisé électrique 3 fonctions pour le long séjour hospitalier ou le maintien à domicile.",
    description:
      "Lit médicalisé à hauteur variable électrique, pensé pour le confort du patient en long séjour et l'ergonomie du personnel soignant. Relève-buste et relève-jambes motorisés, panneaux de tête et de pied amovibles, sommier à lattes renforcé.",
    highlights: [
      'Réglage électrique : hauteur, relève-buste, relève-jambes',
      'Panneaux latéraux amovibles des deux côtés',
      'Roulettes 360° freinées centralement',
      'Télécommande filaire patient à 4 fonctions'
    ],
    specs: [
      { label: 'Dimensions hors tout', value: '210 x 100 cm' },
      { label: 'Charge maximale', value: '180 kg' },
      { label: 'Hauteur réglable', value: '40 - 80 cm' },
      { label: 'Structure', value: 'Acier époxy + panneaux bois stratifié' },
      { label: 'Garantie', value: '2 ans' }
    ],
    images: [`${IMAGES}/hospital-bed-1.png`, `${IMAGES}/hospital-bed-2.jpg`],
    datasheetUrl: SAMPLE_DATASHEET
  },
  {
    slug: 'table-examen-gynecologique-electrique',
    name: 'Table d’examen gynécologique électrique',
    brand: 'MedoTech',
    category: 'furniture',
    availability: 'on_order',
    shortDescription: "Table d'examen électrique avec étriers escamotables, pour cabinets de gynécologie et maternités.",
    description:
      "Table d'examen à hauteur variable électrique, conçue pour les consultations de gynécologie et d'obstétrique. Plateau articulé en 3 sections, étriers escamotables et tiroir de rangement intégré pour le matériel de consultation.",
    highlights: [
      'Hauteur électrique réglable au pied',
      'Étriers gynécologiques escamotables',
      'Plateau capitonné déhoussable',
      'Tiroir de rangement intégré'
    ],
    specs: [
      { label: 'Dimensions', value: '170 x 60 cm' },
      { label: 'Charge maximale', value: '180 kg' },
      { label: 'Hauteur réglable', value: '55 - 90 cm' },
      { label: 'Alimentation', value: 'Secteur 220V' }
    ],
    images: [`${IMAGES}/exam-table.jpg`],
    datasheetUrl: SAMPLE_DATASHEET
  },
  {
    slug: 'electrocardiographe-numerique-12-pistes',
    name: 'Électrocardiographe numérique 12 pistes',
    brand: 'DiagPro',
    category: 'diagnostic',
    availability: 'in_stock',
    featured: true,
    shortDescription: "ECG portable 12 pistes avec écran couleur, interprétation automatique et impression intégrée.",
    description:
      "Électrocardiographe numérique 12 pistes destiné aux services de cardiologie, urgences et cabinets médicaux. Acquisition simultanée des 12 dérivations, interprétation automatique assistée et impression thermique intégrée pour un compte-rendu immédiat.",
    highlights: [
      'Acquisition simultanée des 12 dérivations',
      'Écran couleur tactile 7″',
      'Imprimante thermique intégrée',
      'Export USB et connectivité Wi-Fi'
    ],
    specs: [
      { label: 'Nombre de pistes', value: '12 pistes simultanées' },
      { label: 'Écran', value: '7″ couleur tactile' },
      { label: 'Connectivité', value: 'USB, Wi-Fi' },
      { label: 'Alimentation', value: 'Secteur + batterie lithium' },
      { label: 'Garantie', value: '2 ans' }
    ],
    images: [`${IMAGES}/ecg-machine.jpg`],
    datasheetUrl: SAMPLE_DATASHEET
  },
  {
    slug: 'tensiometre-electronique-brassard',
    name: 'Tensiomètre électronique avec brassard',
    brand: 'DiagPro',
    category: 'diagnostic',
    availability: 'in_stock',
    shortDescription: "Tensiomètre automatique de bras pour cabinet médical, avec détection d'arythmie et mémoire patients.",
    description:
      "Tensiomètre électronique de bras destiné à un usage professionnel en cabinet ou en établissement de santé. Mesure automatique de la pression artérielle et du pouls, détection d'irrégularités du rythme cardiaque, mémoire multi-patients.",
    highlights: [
      'Détection d’irrégularité du rythme cardiaque',
      'Brassard universel 22-42 cm inclus',
      'Mémoire de 2 x 99 mesures',
      'Arrêt automatique, faible consommation'
    ],
    specs: [
      { label: 'Plage de mesure', value: '0 - 280 mmHg' },
      { label: 'Précision', value: '± 3 mmHg' },
      { label: 'Brassard', value: '22 - 42 cm (universel)' },
      { label: 'Alimentation', value: '4 piles AA / adaptateur secteur' }
    ],
    images: [`${IMAGES}/blood-pressure-1.jpg`, `${IMAGES}/blood-pressure-2.jpg`],
    datasheetUrl: SAMPLE_DATASHEET
  },
  {
    slug: 'microscope-binoculaire-laboratoire',
    name: 'Microscope binoculaire de laboratoire',
    brand: 'LabExpert',
    category: 'laboratory',
    availability: 'in_stock',
    shortDescription: "Microscope optique binoculaire 4 objectifs pour laboratoires d'analyses médicales et d'enseignement.",
    description:
      "Microscope binoculaire robuste destiné aux laboratoires d'analyses médicales, de biologie et d'enseignement. Tête binoculaire inclinée 30°, revolver 4 objectifs et éclairage LED réglable pour une observation confortable et précise.",
    highlights: [
      'Tête binoculaire inclinée 30°, rotation 360°',
      'Revolver porte-objectifs quadruple',
      'Éclairage LED à intensité réglable',
      'Platine mécanique avec vernier'
    ],
    specs: [
      { label: 'Grossissements', value: '40x à 1000x' },
      { label: 'Objectifs', value: '4x / 10x / 40x / 100x' },
      { label: 'Éclairage', value: 'LED 1W réglable' },
      { label: 'Alimentation', value: 'Secteur 220V' },
      { label: 'Garantie', value: '1 an' }
    ],
    images: [`${IMAGES}/microscope.jpg`],
    datasheetUrl: SAMPLE_DATASHEET
  },
  {
    slug: 'centrifugeuse-laboratoire-12-places',
    name: 'Centrifugeuse de laboratoire 12 places',
    brand: 'LabExpert',
    category: 'laboratory',
    availability: 'on_order',
    shortDescription: "Centrifugeuse de table 12 places pour tubes, vitesse réglable jusqu'à 4000 tr/min.",
    description:
      "Centrifugeuse de table destinée à la préparation d'échantillons sanguins en laboratoire d'analyses. Rotor 12 places pour tubes standards, vitesse et durée programmables, couvercle de sécurité avec verrouillage automatique.",
    highlights: [
      'Rotor 12 places, tubes 10-15 mL',
      'Vitesse réglable jusqu’à 4000 tr/min',
      'Minuterie programmable jusqu’à 60 min',
      'Verrouillage de sécurité du couvercle'
    ],
    specs: [
      { label: 'Capacité', value: '12 tubes' },
      { label: 'Vitesse max', value: '4000 tr/min' },
      { label: 'Minuterie', value: '0 - 60 min' },
      { label: 'Niveau sonore', value: '< 60 dB' }
    ],
    images: [`${IMAGES}/centrifuge.jpg`],
    datasheetUrl: SAMPLE_DATASHEET
  },
  {
    slug: 'bandelettes-reactives-glycemie-50',
    name: 'Bandelettes réactives glycémie (boîte de 50)',
    brand: 'GlucoCare',
    category: 'reagents',
    availability: 'in_stock',
    featured: true,
    shortDescription: "Bandelettes de test pour lecteur de glycémie, résultat en 5 secondes, boîte de 50 unités.",
    description:
      "Bandelettes réactives compatibles avec les principaux lecteurs de glycémie du marché. Technologie électrochimique pour un résultat fiable en 5 secondes, avec un faible volume de sang capillaire requis.",
    highlights: [
      'Résultat en 5 secondes',
      'Faible volume de sang requis (0,5 µL)',
      'Conservation 18 mois avant ouverture',
      'Compatible lecteurs standards du marché'
    ],
    specs: [
      { label: 'Conditionnement', value: 'Boîte de 50 bandelettes' },
      { label: 'Temps de résultat', value: '5 secondes' },
      { label: 'Volume sanguin requis', value: '0,5 µL' },
      { label: 'Conservation', value: '2 - 30 °C, à l’abri de la lumière' }
    ],
    images: [`${IMAGES}/glucose-meters.jpg`],
    datasheetUrl: SAMPLE_DATASHEET
  },
  {
    slug: 'sonde-urinaire-hydrophile-unisexe',
    name: 'Sonde urinaire hydrophile unisexe',
    brand: 'UroSoft',
    category: 'reagents',
    availability: 'in_stock',
    shortDescription: "Sonde de sondage intermittent prête à l'emploi, revêtement hydrophile, usage unique.",
    description:
      "Sonde urinaire à usage unique avec revêtement hydrophile pré-activé, prête à l'emploi sans manipulation supplémentaire. Surface lisse et lubrifiée réduisant le risque d'irritation lors du sondage intermittent.",
    highlights: [
      'Revêtement hydrophile pré-activé, prête à l’emploi',
      'Usage unique, stérile',
      'Embout atraumatique',
      'Disponible en plusieurs charrières (CH 10 à CH 18)'
    ],
    specs: [
      { label: 'Type', value: 'Sondage intermittent, hydrophile' },
      { label: 'Charrières disponibles', value: 'CH 10, 12, 14, 16, 18' },
      { label: 'Conditionnement', value: 'Boîte de 30 unités' },
      { label: 'Stérilité', value: 'Stérile, usage unique' }
    ],
    images: [`${IMAGES}/catheter.jpg`],
    datasheetUrl: SAMPLE_DATASHEET
  },
  {
    slug: 'kit-pieces-detachees-lits-medicalises',
    name: 'Kit de pièces détachées pour lits médicalisés',
    brand: 'ErgoCare',
    category: 'parts',
    availability: 'on_order',
    shortDescription: "Kit de roulettes, sangles et télécommande de rechange compatible avec la gamme de lits ABYA.",
    description:
      "Kit de pièces détachées pour l'entretien et la réparation des lits médicalisés électriques de la gamme ABYA : roulettes freinées, sangles de relevage et télécommande filaire de remplacement.",
    highlights: [
      '4 roulettes freinées compatibles gamme ABYA',
      'Télécommande filaire de remplacement',
      'Sangles de relevage renforcées',
      'Notice de montage incluse'
    ],
    specs: [
      { label: 'Compatibilité', value: 'Gamme de lits ABYA' },
      { label: 'Contenu du kit', value: '4 roulettes, 1 télécommande, 2 sangles' },
      { label: 'Garantie', value: '1 an' }
    ],
    images: [`${IMAGES}/hospital-bed-1.png`],
    datasheetUrl: SAMPLE_DATASHEET
  },
  {
    slug: 'kit-maintenance-preventive-lits',
    name: 'Kit de maintenance préventive pour lits médicalisés',
    brand: 'ErgoCare',
    category: 'maintenance',
    availability: 'quote_only',
    shortDescription: "Kit de contrôle et de lubrification annuel pour prolonger la durée de vie des lits électriques.",
    description:
      "Kit de maintenance préventive recommandé une fois par an pour les lits médicalisés électriques : lubrifiants pour vérins, checklist de contrôle des points de sécurité et visserie de remplacement.",
    highlights: [
      'Checklist de contrôle des points de sécurité',
      'Lubrifiant spécial vérins électriques',
      'Visserie et fixations de remplacement',
      'Compatible avec la plupart des lits électriques'
    ],
    specs: [
      { label: 'Fréquence recommandée', value: '1 fois par an' },
      { label: 'Contenu', value: 'Lubrifiant, checklist, visserie' }
    ],
    images: [`${IMAGES}/hospital-bed-2.jpg`],
    datasheetUrl: SAMPLE_DATASHEET
  }
]
