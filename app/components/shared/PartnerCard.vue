<template>
  <div class="group h-44 [perspective:1000px]">
    <div
      class="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
    >
      <div
        class="absolute inset-0 flex items-center justify-center rounded-xl border border-(--border) bg-white p-5 [backface-visibility:hidden]"
      >
        <NuxtImg :src="partner.logo" :alt="partner.name" class="max-h-16 w-auto object-contain" />
      </div>

      <div
        class="absolute inset-0 flex flex-col gap-2 rounded-xl border border-(--border) bg-white p-4 [backface-visibility:hidden] [transform:rotateY(180deg)]"
      >
        <p class="text-sm font-bold leading-snug text-(--primary-dark)">{{ partner.name }}</p>

        <div class="flex flex-col gap-1.5 text-xs text-(--text-secondary)">
          <p v-if="partner.address" class="flex items-start gap-1.5">
            <MapPin class="mt-0.5 size-3.5 shrink-0 text-(--primary)" />
            <span>{{ partner.address }}</span>
          </p>
          <a
            v-if="partner.phone"
            :href="`tel:${partner.phone}`"
            class="flex items-center gap-1.5 transition-colors hover:text-(--primary)"
          >
            <Phone class="size-3.5 shrink-0 text-(--primary)" />
            {{ partner.phone }}
          </a>
          <a
            v-if="partner.email"
            :href="`mailto:${partner.email}`"
            class="flex items-center gap-1.5 transition-colors hover:text-(--primary)"
          >
            <Mail class="size-3.5 shrink-0 text-(--primary)" />
            {{ partner.email }}
          </a>
          <a
            v-if="partner.website"
            :href="partner.website"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1.5 transition-colors hover:text-(--primary)"
          >
            <Globe class="size-3.5 shrink-0 text-(--primary)" />
            {{ websiteLabel }}
          </a>
          <p v-if="!hasContactInfo" class="text-(--text-secondary)">
            {{ $t('pages.partners.no_contact_info') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Globe, Mail, MapPin, Phone } from '@lucide/vue'
import type { Partner } from '~/types/partner'

const props = defineProps<{
  partner: Partner
}>()

const hasContactInfo = computed(() =>
  Boolean(props.partner.address || props.partner.email || props.partner.phone || props.partner.website)
)

const websiteLabel = computed(() => props.partner.website?.replace(/^https?:\/\//, '').replace(/\/$/, ''))
</script>
