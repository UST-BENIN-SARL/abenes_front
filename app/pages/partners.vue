<template>
  <div class="container mx-auto px-4 py-12">
    <SeoManager title="Partenaires" />

    <h1 class="text-2xl font-bold text-(--text-title)">Nos partenaires</h1>
    <p class="mt-2 max-w-2xl text-sm text-(--text-secondary)">
      ABENES SARL collabore avec des fabricants reconnus pour proposer aux professionnels de santé des
      équipements médicaux et de laboratoire fiables.
    </p>

    <div class="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
      <div
        v-for="partner in partners"
        :key="partner.name"
        class="flex h-24 items-center justify-center rounded-lg border border-(--border) bg-white px-4 text-center font-bold text-(--primary-dark)"
      >
        {{ partner.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const partners = [
  { name: 'Human' },
  { name: 'HumaSens2.0' },
  { name: 'Finecare' }
]
</script>
