<template>
  <div class="container mx-auto px-4 py-12">
    <SeoManager :title="$t('pages.partners.seo_title')" />

    <div class="flex flex-col gap-12">
      <section v-for="group in groupedPartners" :key="group.category">
        <h2 class="text-xl font-bold text-(--primary-dark)">{{ group.category }}</h2>

        <div class="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          <PartnerCard v-for="partner in group.items" :key="partner.name" :partner="partner" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Partner } from '~/types/partner'

definePageMeta({
  pageBanner: {
    titleKey: 'pages.partners.title',
    subtitleKey: 'pages.partners.subtitle',
    breadcrumbKey: 'pages.partners.seo_title'
  }
})

// `category` is shown as-is on the page: add as many categories as needed by
// simply giving partners below any category label, no extra setup required.
const partners: Partner[] = [
  {
    name: 'Ministère de la Santé du Bénin',
    logo: '/images/partners/ministere_de_la_sante-300x85.jpg.webp',
    category: 'Ils nous font confiance',
    address: 'Cotonou, Bénin',
    phone: '+229 21 30 01 01',
    email: 'contact@sante.gouv.bj',
    website: 'https://sante.gouv.bj'
  },
  {
    name: 'CNHU-HKM',
    logo: '/images/partners/cnhu.jpg.webp',
    category: 'Ils nous font confiance',
    address: 'Cotonou, Bénin',
    phone: '+229 21 30 01 02',
    email: 'contact@cnhu-hkm.bj',
    website: 'https://cnhu-hkm.bj'
  },
  {
    name: 'Université d’Abomey-Calavi (UAC)',
    logo: '/images/partners/uac.jpg.webp',
    category: 'Ils nous font confiance',
    address: 'Abomey-Calavi, Bénin',
    phone: '+229 21 30 01 03',
    email: 'contact@uac.bj',
    website: 'https://www.uac.bj'
  },
  {
    name: 'Zone Industrielle de Glo-Djigbé (GDIZ)',
    logo: '/images/partners/gdiz-300x168.jpg.webp',
    category: 'Ils nous font confiance',
    address: 'Glo-Djigbé, Bénin',
    phone: '+229 21 30 01 04',
    email: 'contact@gdiz.bj',
    website: 'https://gdiz.bj'
  },
  {
    name: 'Enabel',
    logo: '/images/partners/enabel-300x110.jpg.webp',
    category: 'Nos partenaires institutionnels',
    address: 'Cotonou, Bénin',
    phone: '+229 21 30 02 01',
    email: 'benin@enabel.be',
    website: 'https://www.enabel.be'
  },
  {
    name: 'Management Sciences for Health (MSH)',
    logo: '/images/partners/msh-300x180.jpg.webp',
    category: 'Nos partenaires institutionnels',
    address: 'Cotonou, Bénin',
    phone: '+229 21 30 02 02',
    email: 'contact@msh.org',
    website: 'https://www.msh.org'
  },
  {
    name: 'ANTS Bénin',
    logo: '/images/partners/ants-benin.png.webp',
    category: 'Nos partenaires institutionnels',
    address: 'Cotonou, Bénin',
    phone: '+229 21 30 02 03',
    email: 'contact@ants.bj',
    website: 'https://ants.bj'
  },
  {
    name: 'SOBAPS',
    logo: '/images/partners/sobaps_logo-300x146.webp',
    category: 'Nos partenaires institutionnels',
    address: 'Cotonou, Bénin',
    phone: '+229 21 30 02 04',
    email: 'contact@sobaps.bj',
    website: 'https://sobaps.bj'
  }
]

const groupedPartners = computed(() => {
  const categories: string[] = []
  for (const partner of partners) {
    if (!categories.includes(partner.category)) categories.push(partner.category)
  }

  return categories.map((category) => ({
    category,
    items: partners.filter((partner) => partner.category === category)
  }))
})
</script>
