<template>
  <div>
    <SeoManager :title="$t('pages.home.seo_title')" />

    <HeroBanner />

    <Partners />

    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="grid gap-6 rounded-xl bg-(--background-gray) p-8 sm:grid-cols-2 sm:items-center sm:gap-10">
          <div>
            <p class="text-lg font-bold text-(--primary-dark)">{{ $t('pages.home.newsletter_cta.title') }}</p>
            <p class="mt-1 text-sm text-(--text-secondary)">{{ $t('pages.home.newsletter_cta.description') }}</p>
          </div>
          <Newsletter />
        </div>
      </div>
    </section>
  </div>
</template>
