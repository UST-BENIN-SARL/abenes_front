<template>
  <section class="bg-white py-16">
    <div class="container mx-auto px-4">
      <!-- <h2 class="text-center text-sm font-semibold tracking-wide text-(--text-secondary) uppercase">
        Ils nous font confiance
      </h2> -->

      <div class="overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div class="animate-marquee flex w-max items-center gap-16">
          <NuxtImg
            v-for="(partner, index) in [...partners, ...partners]"
            :key="index"
            :src="partner.src"
            :alt="partner.name"
            class="h-14 w-auto shrink-0 object-contain"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const partners = [
  { name: 'ANTS Bénin', src: '/images/partners/ants-benin.png.webp' },
  { name: 'CNHU-HKM', src: '/images/partners/cnhu.jpg.webp' },
  { name: 'Enabel', src: '/images/partners/enabel-300x110.jpg.webp' },
  { name: 'GDIZ', src: '/images/partners/gdiz-300x168.jpg.webp' },
  { name: 'Ministère de la Santé', src: '/images/partners/ministere_de_la_sante-300x85.jpg.webp' },
  { name: 'MSH', src: '/images/partners/msh-300x180.jpg.webp' },
  { name: 'SOBAPS', src: '/images/partners/sobaps_logo-300x146.webp' },
  { name: 'UAC', src: '/images/partners/uac.jpg.webp' }
]
</script>

<style scoped>
@keyframes marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 40s linear infinite;
}

.animate-marquee:hover {
  animation-play-state: paused;
}
</style>
