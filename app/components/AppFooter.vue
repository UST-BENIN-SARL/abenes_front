<template>
  <footer class="bg-(--primary-darkest) px-4 py-6 text-center text-sm text-white">
    <p>&copy; {{ currentYear }} ABENES SARL. {{ $t('common.footer.rights') }}</p>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
