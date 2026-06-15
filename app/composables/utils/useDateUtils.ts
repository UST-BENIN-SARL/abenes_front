export const useDateUtils = () => {
  const formatLocalDate = (dateString: string, options?: Intl.DateTimeFormatOptions) => {
    const date = new Date(dateString)

    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }

    return date.toLocaleDateString('fr-FR', { ...defaultOptions, ...options })
  }

  const formatDateTime = (dateString: string) => {
    return formatLocalDate(dateString, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    const intervals = {
      année: 31536000,
      mois: 2592000,
      semaine: 604800,
      jour: 86400,
      heure: 3600,
      minute: 60
    }

    for (const [unit, seconds] of Object.entries(intervals)) {
      const interval = Math.floor(diffInSeconds / seconds)
      if (interval >= 1) {
        return `Il y a ${interval} ${unit}${interval > 1 ? 's' : ''}`
      }
    }

    return "À l'instant"
  }

  const isToday = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isYesterday = (dateString: string) => {
    const date = new Date(dateString)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return date.toDateString() === yesterday.toDateString()
  }

  return {
    formatDate: formatLocalDate,
    formatDateTime,
    formatTime,
    getTimeAgo,
    isToday,
    isYesterday
  }
}
