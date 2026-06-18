export const useAppStore = defineStore('app', () => {
  const sidebarOpen = ref(true)
  const isPageLoading = ref(false)

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const setPageLoading = (value: boolean) => {
    isPageLoading.value = value
  }

  return { sidebarOpen, isPageLoading, toggleSidebar, setPageLoading }
})
