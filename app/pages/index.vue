<template>
  <div>
    <SeoManager :title="$t('pages.home.seo_title')" />

    <HeroBanner />

    <section class="bg-(--background-gray) py-14 sm:py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-center text-2xl font-extrabold text-(--primary-dark) sm:text-3xl">
          {{ $t('pages.home.activities.title') }}
        </h2>
        <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="item in activityItems" :key="item.key" class="overflow-hidden rounded-xl border border-(--border) bg-white">
            <NewsImage
              v-if="item.image"
              :src="item.image"
              :alt="$t(`pages.home.activities.items.${item.key}.title`)"
              class="aspect-video w-full"
            />
            <div v-else class="flex aspect-video items-center justify-center bg-(--accent-gray-light)">
              <component :is="item.icon" class="size-10 text-(--primary)" />
            </div>
            <div class="p-5">
              <p class="font-bold text-(--primary-dark)">{{ $t(`pages.home.activities.items.${item.key}.title`) }}</p>
              <p class="mt-1.5 text-sm text-(--text-secondary)">
                {{ $t(`pages.home.activities.items.${item.key}.description`) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-(--background-gray) py-14 sm:py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-center text-2xl font-extrabold text-(--primary-dark) sm:text-3xl">
          {{ $t('pages.home.why_us.title') }}
        </h2>
        <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="item in whyUsItems" :key="item.key" class="flex flex-col items-center gap-3 rounded-xl bg-white p-6 text-center shadow-sm">
            <div class="flex size-12 items-center justify-center rounded-full bg-(--accent-gray-light) text-(--primary)">
              <component :is="item.icon" class="size-6" />
            </div>
            <p class="font-bold text-(--primary-dark)">{{ $t(`pages.home.why_us.items.${item.key}.title`) }}</p>
            <p class="text-sm text-(--text-secondary)">{{ $t(`pages.home.why_us.items.${item.key}.description`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 py-14 sm:py-16">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 class="text-2xl font-extrabold text-(--primary-dark) sm:text-3xl">{{ $t('pages.home.products_teaser.title') }}</h2>
          <p class="mt-2 text-sm text-(--text-secondary)">{{ $t('pages.home.products_teaser.subtitle') }}</p>
        </div>
        <UiButton as-child variant="outline" class="text-(--black)">
          <NuxtLink to="/products">{{ $t('pages.home.products_teaser.cta_all') }}</NuxtLink>
        </UiButton>
      </div>
      <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ProductCard v-for="product in featuredProducts" :key="product.slug" :product="product" />
      </div>
    </section>

    <section class="bg-(--background-gray) py-14 sm:py-16">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 class="text-2xl font-extrabold text-(--primary-dark) sm:text-3xl">{{ $t('pages.home.services_teaser.title') }}</h2>
            <p class="mt-2 text-sm text-(--text-secondary)">{{ $t('pages.home.services_teaser.subtitle') }}</p>
          </div>
          <UiButton as-child variant="outline" class="text-(--black)">
            <NuxtLink to="/services">{{ $t('pages.home.services_teaser.cta_all') }}</NuxtLink>
          </UiButton>
        </div>
        <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="step in serviceSteps" :key="step.key" class="flex flex-col gap-3 rounded-xl border border-(--border) bg-white p-6">
            <div class="flex size-12 items-center justify-center rounded-full bg-(--accent-gray-light) text-(--primary)">
              <component :is="step.icon" class="size-6" />
            </div>
            <p class="font-bold text-(--primary-dark)">{{ $t(`pages.services.journey.steps.${step.key}.title`) }}</p>
            <p class="text-sm text-(--text-secondary)">{{ $t(`pages.services.journey.steps.${step.key}.description`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 py-14 sm:py-16">
      <h2 class="text-center text-2xl font-extrabold text-(--primary-dark) sm:text-3xl">
        {{ $t('pages.home.certifications.title') }}
      </h2>
      <div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div v-for="item in certificationItems" :key="item.key" class="flex flex-col items-center gap-2 rounded-xl border border-(--border) bg-white p-5 text-center">
          <component :is="item.icon" class="size-6 text-(--primary)" />
          <p class="text-sm font-bold text-(--primary-dark)">{{ $t(`pages.home.certifications.items.${item.key}.title`) }}</p>
          <p class="text-xs text-(--text-secondary)">{{ $t(`pages.home.certifications.items.${item.key}.description`) }}</p>
        </div>
      </div>

      <h3 class="mt-12 text-center text-lg font-bold text-(--primary-dark)">{{ $t('pages.home.coverage.title') }}</h3>
      <div class="mt-5 flex flex-wrap items-center justify-center gap-3">
        <span
          v-for="country in countries"
          :key="country"
          class="inline-flex items-center gap-1.5 rounded-full border border-(--border) bg-white px-4 py-2 text-sm font-medium text-(--text-dark)"
        >
          <MapPin class="size-4 text-(--primary)" />
          {{ $t(`pages.home.coverage.countries.${country}`) }}
        </span>
      </div>
    </section>

    <section class="bg-(--background-gray) py-14 sm:py-16">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 class="text-2xl font-extrabold text-(--primary-dark) sm:text-3xl">{{ $t('pages.home.news_teaser.title') }}</h2>
            <p class="mt-2 text-sm text-(--text-secondary)">{{ $t('pages.home.news_teaser.subtitle') }}</p>
          </div>
          <UiButton as-child variant="outline" class="text-(--black)">
            <NuxtLink to="/news">{{ $t('pages.home.news_teaser.cta_all') }}</NuxtLink>
          </UiButton>
        </div>
        <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <NewsCard v-for="article in recentArticles" :key="article.slug" :article="article" />
        </div>
      </div>
    </section>

    <Partners />

    <!-- <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="grid gap-6 rounded-xl bg-(--background-gray) p-8 sm:grid-cols-2 sm:items-center sm:gap-10">
          <div>
            <p class="text-lg font-bold text-(--primary-dark)">{{ $t('pages.home.newsletter_cta.title') }}</p>
            <p class="mt-1 text-sm text-(--text-secondary)">{{ $t('pages.home.newsletter_cta.description') }}</p>
          </div>
          <Newsletter />
        </div>
      </div>
    </section> -->
  </div>
</template>

<script setup lang="ts">
import {
  Award,
  BadgeCheck,
  Landmark,
  MapPin,
  MessageCircleQuestion,
  Settings2,
  ShieldCheck,
  Tag,
  Truck,
  Wind,
  Wrench
} from '@lucide/vue'

const { products } = useProducts()
const { articles } = useNews()

const countries = ['benin', 'togo', 'niger', 'burkina_faso', 'cote_d_ivoire']

const activityItems = [
  { key: 'lab_equipment', icon: undefined, image: '/images/products/microscope.jpg' },
  { key: 'medical_furniture', icon: undefined, image: '/images/products/hospital-bed-2.jpg' },
  { key: 'lab_consumables', icon: undefined, image: '/images/products/glucose-meters.jpg' },
  { key: 'environmental', icon: Wind, image: undefined }
]

const whyUsItems = [
  { key: 'delivery', icon: Truck },
  { key: 'warranty', icon: ShieldCheck },
  { key: 'consulting', icon: MessageCircleQuestion },
  { key: 'pricing', icon: Tag }
]

const serviceSteps = [
  { key: 'consulting', icon: MessageCircleQuestion },
  { key: 'supply', icon: Truck },
  { key: 'installation', icon: Settings2 },
  { key: 'maintenance', icon: Wrench }
]

const certificationItems = [
  { key: 'ce', icon: BadgeCheck },
  { key: 'iso', icon: ShieldCheck },
  { key: 'msan', icon: Landmark },
  { key: 'human', icon: Award }
]

const featuredProducts = computed(() => products.filter((product) => product.featured).slice(0, 3))
const recentArticles = computed(() =>
  [...articles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 3)
)
</script>
