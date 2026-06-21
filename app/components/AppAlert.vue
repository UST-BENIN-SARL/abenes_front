<template>
  <div
    v-if="visible"
    class="flex items-center justify-between gap-4 px-4 py-2 text-sm font-medium text-white"
    :class="variantClass"
    role="status"
  >
    <span><slot>{{ message }}</slot></span>

    <button
      v-if="dismissible"
      type="button"
      class="text-white/80 hover:text-white"
      :aria-label="$t('common.actions.close')"
      @click="visible = false"
    >
      <Icon name="mdi:close" />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  message?: string
  variant?: 'info' | 'success' | 'warning' | 'error'
  dismissible?: boolean
}>()

const visible = ref(true)

const variantClass = computed(() => {
  switch (props.variant) {
    case 'success':
      return 'bg-(--success)'
    case 'warning':
      return 'bg-(--warning) text-(--text-dark)'
    case 'error':
      return 'bg-(--danger)'
    default:
      return 'bg-(--primary)'
  }
})
</script>
