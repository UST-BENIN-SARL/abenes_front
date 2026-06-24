import type { Job } from '~/types/job'

// Offres d'exemple : à remplacer par les vraies offres en cours chez ABENES.
export const JOBS: Job[] = [
  {
    slug: 'technicien-biomedical-sav-cotonou',
    title: 'Technicien biomédical SAV',
    department: 'technical',
    contractType: 'cdi',
    location: 'Cotonou, Bénin',
    experienceLevel: '2 à 5 ans d’expérience',
    publishedAt: '2026-06-18',
    featured: true,
    shortDescription:
      "Installation, maintenance préventive et corrective des équipements médicaux et de laboratoire chez nos clients hospitaliers.",
    missions: [
      "Assurer l'installation et la mise en service des équipements médicaux chez les clients",
      'Réaliser les opérations de maintenance préventive et corrective sur site',
      'Diagnostiquer les pannes et effectuer les réparations dans le respect des délais contractuels',
      'Former les équipes soignantes à l’utilisation des équipements installés',
      'Rédiger les rapports d’intervention et tenir à jour l’historique de maintenance'
    ],
    requirements: [
      'Diplôme en électronique, biomédical, électrotechnique ou équivalent',
      'Expérience confirmée en maintenance d’équipements médicaux ou électroniques',
      'Permis de conduire B (déplacements fréquents à prévoir)',
      'Rigueur, autonomie et sens du service client',
      'Disponibilité pour des interventions ponctuelles hors Cotonou'
    ],
    benefits: [
      'Formations constructeur régulières (sur site et à l’étranger)',
      'Véhicule de service et outillage fourni',
      'Prime d’intervention et de déplacement',
      'Couverture santé pour le salarié et sa famille'
    ]
  },
  {
    slug: 'responsable-technico-commercial-cotonou',
    title: 'Responsable technico-commercial',
    department: 'sales',
    contractType: 'cdi',
    location: 'Cotonou, Bénin',
    experienceLevel: '3 à 6 ans d’expérience',
    publishedAt: '2026-06-10',
    featured: true,
    shortDescription:
      "Développement du portefeuille clients hospitaliers et de laboratoires, de la prospection jusqu'à la signature des contrats.",
    missions: [
      'Prospecter et développer un portefeuille de clients hospitaliers et de laboratoires privés/publics',
      'Présenter et démontrer les équipements auprès des prescripteurs (médecins, biologistes, biomédicaux)',
      'Élaborer les offres commerciales et négocier les conditions de vente',
      'Assurer le suivi des appels d’offres publics et privés',
      'Collaborer avec l’équipe technique pour le suivi après-vente des clients'
    ],
    requirements: [
      'Formation commerciale, biomédicale ou scientifique (Bac+3 minimum)',
      'Expérience en vente de matériel médical, pharmaceutique ou technique',
      'Excellent sens de la négociation et de la relation client',
      'Bonne connaissance du secteur de la santé en Afrique de l’Ouest, un atout',
      'Maîtrise des outils bureautiques et d’un CRM'
    ],
    benefits: [
      'Rémunération fixe + variable attractive sur objectifs',
      'Véhicule de fonction',
      'Téléphone et forfait professionnel',
      'Perspectives d’évolution vers un poste de responsable régional'
    ]
  },
  {
    slug: 'representant-commercial-regional',
    title: 'Représentant commercial régional',
    department: 'sales',
    contractType: 'cdi',
    location: 'Parakou, Bénin',
    experienceLevel: '1 à 3 ans d’expérience',
    publishedAt: '2026-06-05',
    shortDescription:
      "Couverture commerciale des établissements de santé du Nord-Bénin, en lien étroit avec l'équipe commerciale de Cotonou.",
    missions: [
      'Visiter régulièrement les hôpitaux, cliniques et laboratoires de la zone Nord',
      'Identifier les besoins en équipements et consommables médicaux',
      'Faire remonter les opportunités commerciales à l’équipe centrale',
      'Assurer une présence terrain régulière et un reporting hebdomadaire',
      'Participer aux salons et événements régionaux du secteur santé'
    ],
    requirements: [
      'Expérience en prospection terrain, idéalement dans le secteur médical ou pharmaceutique',
      'Très bonne connaissance de la région Nord du Bénin',
      'Autonomie, sens de l’organisation et bon relationnel',
      'Permis de conduire moto/voiture indispensable'
    ],
    benefits: [
      'Indemnités de déplacement et de carburant',
      'Prime sur objectifs commerciaux',
      'Téléphone professionnel fourni'
    ]
  },
  {
    slug: 'responsable-logistique-approvisionnement',
    title: 'Responsable logistique & approvisionnement',
    department: 'logistics',
    contractType: 'cdi',
    location: 'Cotonou, Bénin',
    experienceLevel: '3 à 5 ans d’expérience',
    publishedAt: '2026-06-01',
    shortDescription:
      "Pilotage des flux d'importation, du dédouanement et de la gestion des stocks d'équipements et de consommables médicaux.",
    missions: [
      'Planifier et suivre les commandes auprès des fournisseurs internationaux',
      'Coordonner les opérations de transport, dédouanement et livraison',
      'Gérer les stocks et optimiser les niveaux de réapprovisionnement',
      'Assurer la conformité documentaire des importations (factures, certificats, AMM)',
      'Superviser l’équipe magasin et entrepôt'
    ],
    requirements: [
      'Formation en logistique, transport international ou commerce international',
      'Expérience en gestion de la chaîne d’approvisionnement, idéalement à l’import',
      'Bonne connaissance des procédures douanières au Bénin',
      'Maîtrise d’Excel et d’un logiciel de gestion des stocks',
      'Capacité à gérer les priorités et les imprévus'
    ],
    benefits: [
      'Mutuelle santé pour le salarié et sa famille',
      'Prime annuelle sur performance',
      'Environnement de travail structuré et formateur'
    ]
  },
  {
    slug: 'comptable-cotonou',
    title: 'Comptable',
    department: 'finance',
    contractType: 'cdd',
    location: 'Cotonou, Bénin',
    experienceLevel: '2 ans d’expérience minimum',
    publishedAt: '2026-05-28',
    shortDescription:
      "Tenue comptable, suivi de la trésorerie et préparation des déclarations fiscales, en lien avec notre cabinet d'expertise.",
    missions: [
      'Assurer la saisie et la tenue de la comptabilité générale et auxiliaire',
      'Préparer les déclarations fiscales et sociales dans les délais légaux',
      'Suivre la trésorerie et les rapprochements bancaires',
      'Participer à la clôture mensuelle et annuelle des comptes',
      'Collaborer avec le cabinet d’expertise comptable externe'
    ],
    requirements: [
      'BTS/Licence en comptabilité, gestion ou finance',
      'Expérience similaire en entreprise commerciale ou cabinet',
      'Maîtrise d’un logiciel de comptabilité (Sage, Ciel ou équivalent)',
      'Rigueur, discrétion et respect des délais'
    ],
    benefits: [
      'CDD de 12 mois renouvelable, avec perspective de CDI',
      'Cadre de travail organisé avec accompagnement à la prise de poste',
      'Mutuelle santé'
    ]
  },
  {
    slug: 'stagiaire-technicien-biomedical',
    title: 'Stagiaire technicien biomédical',
    department: 'technical',
    contractType: 'stage',
    location: 'Cotonou, Bénin',
    experienceLevel: 'Étudiant(e) en fin de cycle',
    publishedAt: '2026-06-15',
    shortDescription:
      "Stage de fin d'études au sein de notre service technique : maintenance, installation et SAV des équipements médicaux.",
    missions: [
      'Accompagner les techniciens lors des interventions de maintenance et d’installation',
      'Participer aux diagnostics de panne et aux réparations sous supervision',
      'Aider à la mise à jour de la documentation technique et des fiches d’intervention',
      'Découvrir les différentes familles d’équipements médicaux et de laboratoire'
    ],
    requirements: [
      'Étudiant(e) en électronique, biomédical, électrotechnique ou équivalent',
      'Stage de fin d’études (6 mois) recherché dans le cadre du cursus',
      'Curiosité technique, sérieux et envie d’apprendre',
      'Disponibilité à temps plein'
    ],
    benefits: [
      'Indemnité de stage',
      'Encadrement par des techniciens expérimentés',
      'Possibilité d’embauche à l’issue du stage selon profil'
    ]
  },
  {
    slug: 'assistant-rh-cotonou',
    title: 'Assistant(e) Ressources Humaines',
    department: 'hr',
    contractType: 'cdi',
    location: 'Cotonou, Bénin',
    experienceLevel: '1 à 3 ans d’expérience',
    publishedAt: '2026-05-20',
    shortDescription:
      "Appui aux processus RH : recrutement, administration du personnel et suivi de la vie des collaborateurs.",
    missions: [
      'Participer au processus de recrutement (tri de CV, organisation des entretiens)',
      'Assurer la gestion administrative du personnel (contrats, dossiers, congés)',
      'Suivre les dossiers de mutuelle santé et de sécurité sociale',
      'Contribuer à l’organisation des formations internes',
      'Participer aux actions favorisant la qualité de vie au travail'
    ],
    requirements: [
      'Formation en ressources humaines, droit social ou gestion',
      'Première expérience en RH ou administration du personnel',
      'Sens de la confidentialité et de l’organisation',
      'Bon relationnel et bonne expression écrite'
    ],
    benefits: [
      'Poste polyvalent et formateur au sein d’une équipe RH à taille humaine',
      'Mutuelle santé',
      'Possibilités d’évolution vers un poste de chargé(e) RH'
    ]
  }
]
