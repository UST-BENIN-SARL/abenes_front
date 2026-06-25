<template>
  <div>
    <SeoManager :title="$t('pages.about.seo_title')" />

    <section class="container mx-auto px-4 py-10 sm:py-14">
      <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 class="text-2xl font-extrabold text-(--primary-dark) sm:text-3xl">
            {{ $t('pages.about.intro.title') }}
          </h2>
          <p class="mt-4 text-sm leading-relaxed text-(--text-dark)">{{ $t('pages.about.intro.paragraph1') }}</p>
          <p class="mt-3 text-sm leading-relaxed text-(--text-dark)">{{ $t('pages.about.intro.paragraph2') }}</p>
          <p class="mt-3 text-sm leading-relaxed text-(--text-dark)">{{ $t('pages.about.intro.paragraph3') }}</p>
        </div>
        <NewsImage :src="HERO_IMAGE" :alt="$t('pages.about.intro.title')" class="aspect-video w-full rounded-xl" />
      </div>

      <div class="mt-12 grid grid-cols-2 gap-6 rounded-xl border border-(--border) bg-white p-8 sm:grid-cols-4">
        <div v-for="stat in stats" :key="stat" class="flex flex-col items-center gap-1 text-center">
          <p class="text-xl font-extrabold text-(--primary-dark)">{{ $t(`pages.about.stats.${stat}.value`) }}</p>
          <p class="text-xs text-(--text-secondary)">{{ $t(`pages.about.stats.${stat}.label`) }}</p>
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 py-14 sm:py-16">
      <div class="mx-auto max-w-2xl rounded-xl bg-(--primary-dark) p-8 text-center text-white">
        <p class="text-sm font-semibold tracking-wide text-white/70 uppercase">{{ $t('pages.about.vision.title') }}</p>
        <p class="mt-3 text-base leading-relaxed">{{ $t('pages.about.vision.text') }}</p>
      </div>

      <h2 class="mt-14 text-center text-2xl font-extrabold text-(--primary-dark) sm:text-3xl">
        {{ $t('pages.about.mission.title') }}
      </h2>
      <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div v-for="item in missionItems" :key="item.key" class="rounded-xl border border-(--border) bg-white p-6">
          <div class="flex size-12 items-center justify-center rounded-full bg-(--accent-gray-light) text-(--primary)">
            <component :is="item.icon" class="size-6" />
          </div>
          <p class="mt-4 font-bold text-(--primary-dark)">{{ $t(`pages.about.mission.items.${item.key}.title`) }}</p>
          <p class="mt-2 text-sm text-(--text-secondary)">{{ $t(`pages.about.mission.items.${item.key}.description`) }}</p>
        </div>
      </div>
    </section>

    <section class="bg-(--background-gray) py-14 sm:py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-center text-2xl font-extrabold text-(--primary-dark) sm:text-3xl">
          {{ $t('pages.about.activities.title') }}
        </h2>
        <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="item in activityItems" :key="item.key" class="overflow-hidden rounded-xl border border-(--border) bg-white">
            <NewsImage
              v-if="item.image"
              :src="item.image"
              :alt="$t(`pages.about.activities.items.${item.key}.title`)"
              class="aspect-video w-full"
            />
            <div v-else class="flex aspect-video items-center justify-center bg-(--accent-gray-light)">
              <component :is="item.icon" class="size-10 text-(--primary)" />
            </div>
            <div class="p-5">
              <p class="font-bold text-(--primary-dark)">{{ $t(`pages.about.activities.items.${item.key}.title`) }}</p>
              <p class="mt-1.5 text-sm text-(--text-secondary)">
                {{ $t(`pages.about.activities.items.${item.key}.description`) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 py-14 sm:py-16">
      <h2 class="text-center text-2xl font-extrabold text-(--primary-dark) sm:text-3xl">
        {{ $t('pages.about.values.title') }}
      </h2>
      <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div v-for="item in valueItems" :key="item.key" class="flex flex-col items-center gap-3 rounded-xl border border-(--border) bg-white p-6 text-center">
          <div class="flex size-12 items-center justify-center rounded-full bg-(--accent-gray-light) text-(--primary)">
            <component :is="item.icon" class="size-6" />
          </div>
          <p class="font-bold text-(--primary-dark)">{{ $t(`pages.about.values.items.${item.key}.title`) }}</p>
          <p class="text-sm text-(--text-secondary)">{{ $t(`pages.about.values.items.${item.key}.description`) }}</p>
        </div>
      </div>
    </section>

    <section class="bg-(--background-gray) py-14 sm:py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-center text-2xl font-extrabold text-(--primary-dark) sm:text-3xl">
          {{ $t('pages.about.certifications.title') }}
        </h2>
        <div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div v-for="item in certificationItems" :key="item.key" class="flex flex-col items-center gap-2 rounded-xl border border-(--border) bg-white p-5 text-center">
            <component :is="item.icon" class="size-6 text-(--primary)" />
            <p class="text-sm font-bold text-(--primary-dark)">{{ $t(`pages.about.certifications.items.${item.key}.title`) }}</p>
            <p class="text-xs text-(--text-secondary)">{{ $t(`pages.about.certifications.items.${item.key}.description`) }}</p>
          </div>
        </div>

        <h3 class="mt-12 text-center text-lg font-bold text-(--primary-dark)">{{ $t('pages.about.coverage.title') }}</h3>
        <div class="mt-5 flex flex-wrap items-center justify-center gap-3">
          <span
            v-for="country in countries"
            :key="country"
            class="inline-flex items-center gap-1.5 rounded-full border border-(--border) bg-white px-4 py-2 text-sm font-medium text-(--text-dark)"
          >
            <MapPin class="size-4 text-(--primary)" />
            {{ $t(`pages.about.coverage.countries.${country}`) }}
          </span>
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 py-14 sm:py-16">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-2xl font-extrabold text-(--primary-dark) sm:text-3xl">{{ $t('pages.about.team.title') }}</h2>
        <p class="mt-3 text-sm text-(--text-secondary)">{{ $t('pages.about.team.subtitle') }}</p>
      </div>

      <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="member in teamMembers"
          :key="member.key"
          class="group overflow-hidden rounded-xl border border-(--border) bg-white text-center shadow-sm transition-shadow hover:shadow-md"
        >
          <div class="aspect-square overflow-hidden bg-(--accent-gray-light)">
            <NuxtImg
              :src="member.image"
              :alt="$t(`pages.about.team.members.${member.key}.name`)"
              width="400"
              class="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div class="p-5">
            <p class="font-bold text-(--primary-dark)">{{ $t(`pages.about.team.members.${member.key}.name`) }}</p>
            <p class="mt-1 text-sm text-(--text-secondary)">{{ $t(`pages.about.team.members.${member.key}.role`) }}</p>
            <span class="mt-3 inline-block h-0.5 w-8 bg-(--primary)" />
          </div>
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 py-14 sm:py-16">
      <h2 class="text-center text-2xl font-extrabold text-(--primary-dark) sm:text-3xl">
        {{ $t('pages.about.video.title') }}
      </h2>
      <div class="mx-auto mt-8 aspect-video max-w-3xl overflow-hidden rounded-xl">
        <iframe
          class="size-full"
          src="https://www.youtube.com/embed/VyGfgJwsXXw"
          title="ABENES SARL Présentation"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  Award,
  BadgeCheck,
  Headset,
  HeartHandshake,
  Landmark,
  Lightbulb,
  MapPin,
  ShieldCheck,
  Wind,
  Zap
} from '@lucide/vue'

definePageMeta({
  pageBanner: {
    titleKey: 'pages.about.title',
    subtitleKey: 'pages.about.subtitle',
    breadcrumbKey: 'pages.about.seo_title'
  }
})

const HERO_IMAGE = '/images/news/company-anniversary.jpg'

const stats = ['experience', 'founded', 'products', 'countries']
const countries = ['benin', 'togo', 'niger', 'burkina_faso', 'cote_d_ivoire']
const teamMembers = [
  { key: 'ceo', image: '/images/team/ceo.webp' },
  { key: 'deputy', image: '/images/team/deputy.webp' },
  { key: 'technical', image: '/images/team/technical.webp' },
  { key: 'finance', image: '/images/team/finance.webp' },
  { key: 'maintenance', image: '/images/team/maintenance.webp' },
  { key: 'quality', image: '/images/team/quality.webp' }
]

const missionItems = [
  { key: 'support', icon: Headset },
  { key: 'innovation', icon: Lightbulb },
  { key: 'quality', icon: ShieldCheck }
]

const activityItems = [
  { key: 'lab_equipment', icon: undefined, image: '/images/products/microscope.jpg' },
  { key: 'medical_furniture', icon: undefined, image: '/images/products/hospital-bed-2.jpg' },
  { key: 'lab_consumables', icon: undefined, image: '/images/products/glucose-meters.jpg' },
  { key: 'environmental', icon: Wind, image: undefined }
]

const valueItems = [
  { key: 'quality', icon: BadgeCheck },
  { key: 'responsiveness', icon: Zap },
  { key: 'partnership', icon: HeartHandshake }
]

const certificationItems = [
  { key: 'ce', icon: BadgeCheck },
  { key: 'iso', icon: ShieldCheck },
  { key: 'msan', icon: Landmark },
  { key: 'human', icon: Award }
]
</script>
