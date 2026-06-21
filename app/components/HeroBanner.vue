<template>
  <section class="relative h-[72vh] min-h-[520px] w-full overflow-hidden sm:h-[84vh]">
    <div
      v-for="(slide, index) in slides"
      :key="slide.id"
      class="absolute inset-0 transition-opacity duration-1000"
      :class="index === currentIndex ? 'opacity-100' : 'opacity-0'"
    >
      <div
        class="absolute inset-0 bg-cover bg-center"
        :class="index === currentIndex ? (index % 2 === 0 ? 'hero-zoom-in' : 'hero-zoom-out') : ''"
        :style="{ backgroundImage: `url(${slide.image})` }"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
    </div>

    <div class="relative z-10 flex h-full items-center">
      <div class="container mx-auto px-4">
        <Transition name="hero-text" mode="out-in">
          <div :key="currentIndex" class="max-w-xl text-white">
            <h1 class="text-3xl font-extrabold sm:text-5xl">{{ currentSlide.title }}</h1>
            <p class="mt-4 text-base text-white/90 sm:text-lg">{{ currentSlide.subtitle }}</p>
          </div>
        </Transition>
      </div>
    </div>

    <div class="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
      <button
        v-for="(slide, index) in slides"
        :key="slide.id"
        type="button"
        :aria-label="`Aller à la diapositive ${index + 1}`"
        class="h-2 rounded-full bg-white/50 transition-all"
        :class="index === currentIndex ? 'w-6 bg-white' : 'w-2 hover:bg-white/80'"
        @click="goTo(index)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const ROTATION_INTERVAL_MS = 6000

const slides = computed(() => [
  {
    id: 'slide-1',
    image: '/images/1.webp',
    title: t('pages.home.hero.slide1_title'),
    subtitle: t('pages.home.hero.slide1_subtitle')
  },
  {
    id: 'slide-2',
    image: '/images/2.webp',
    title: t('pages.home.hero.slide2_title'),
    subtitle: t('pages.home.hero.slide2_subtitle')
  }
])

const currentIndex = ref(0)
const currentSlide = computed(() => slides.value[currentIndex.value] ?? slides.value[0]!)
let intervalId: ReturnType<typeof setInterval> | null = null

const startRotation = () => {
  if (intervalId) clearInterval(intervalId)
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % slides.value.length
  }, ROTATION_INTERVAL_MS)
}

const goTo = (index: number) => {
  currentIndex.value = index
  startRotation()
}

onMounted(startRotation)
onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<style scoped>
@keyframes hero-zoom-in {
  from { transform: scale(1); }
  to { transform: scale(1.12); }
}

@keyframes hero-zoom-out {
  from { transform: scale(1.12); }
  to { transform: scale(1); }
}

.hero-zoom-in {
  animation: hero-zoom-in 6s ease-out forwards;
}

.hero-zoom-out {
  animation: hero-zoom-out 6s ease-out forwards;
}

.hero-text-enter-active,
.hero-text-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.hero-text-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

.hero-text-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}
</style>
