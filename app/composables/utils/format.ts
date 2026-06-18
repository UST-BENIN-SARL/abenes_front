import { useBaseUrl } from './baseUrl'

/**
 * Mappe le statut de paiement à un label et une classe de badge
 */
export function statusDisplayMap(status: string, t: (key: string) => string) {
  switch (status) {
    case 'created':
      return {
        label: t('globals.status.created'),
        value: 'created',
        badgeClass: 'bg-blue-100 text-blue-700'
      }
    case 'payment_validated':
      return {
        label: t('globals.status.payment_validated'),
        value: 'payment_validated',
        badgeClass: 'bg-green-100 text-green-500'
      }
    case 'pending_payment':
      return {
        label: t('globals.status.pending_payment'),
        value: 'pending_payment',
        badgeClass: 'bg-(--warning) text-white'
      }
    case 'cancelled':
      return {
        label: t('globals.status.cancelled'),
        value: 'cancelled',
        badgeClass: 'bg-red-100 text-red-700'
      }
    default:
      return {
        label: status,
        value: status,
        badgeClass: ''
      }
  }
}

// Locale réactive globale (pour Nuxt/Vue)
let _cachedLocaleRef: ReturnType<typeof useLocalStorage<'fr-FR' | 'en-US'>> | null = null

export function getCurrentLocale() {
  if (!_cachedLocaleRef) {
    _cachedLocaleRef = useLocalStorage<'fr-FR' | 'en-US'>('locale', 'fr-FR')
  }
  return _cachedLocaleRef
}

/**
 * Formate une date selon la locale, avec fallback si date nulle
 */
export function formatDate(
  date: string | Date | null | undefined,
  fallback: string = 'N/A'
): string {
  if (!date) return fallback
  const d = date instanceof Date ? date : new Date(date)
  if (isNaN(d.getTime())) return fallback
  return d.toLocaleDateString(getCurrentLocale().value as string, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

/**
 * Formate une date au format JJ/MM/AAAA (ex: 11/12/2026)
 */
export function formatDateDDMMYYYY(
  date: string | Date | null | undefined,
  fallback: string = 'N/A'
): string {
  if (!date) return fallback
  const d = date instanceof Date ? date : new Date(date)
  if (isNaN(d.getTime())) return fallback

  return d.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

/**
 * Formate un montant en devise locale
 */
export function formatPrice(amount: number | null | undefined, fallback: string = '-'): string {
  if (amount === null || amount === undefined) return fallback

  return new Intl.NumberFormat(getCurrentLocale().value as string, {
    style: 'currency',
    currency: 'XOF',
    maximumFractionDigits: 0
  }).format(amount)
}

/**
 * Formate une date avec l'heure selon la locale
 */
export function formatDateTime(
  date: string | Date | null | undefined,
  fallback: string = 'N/A'
): string {
  if (!date) return fallback
  const d = date instanceof Date ? date : new Date(date)
  if (isNaN(d.getTime())) return fallback

  return d.toLocaleDateString(getCurrentLocale().value as string, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Formate l'heure d'une date selon la locale
 */
export function formatTime(date: string | Date | null | undefined, fallback: string = 'N/A'): string {
  if (!date) return fallback
  const d = date instanceof Date ? date : new Date(date)
  if (isNaN(d.getTime())) return fallback

  return d.toLocaleTimeString(getCurrentLocale().value as string, {
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Retourne une durée relative ("il y a 2 heures") selon la locale courante
 */
export function getTimeAgo(date: string | Date): string {
  const d = date instanceof Date ? date : new Date(date)
  const diffInSeconds = Math.floor((Date.now() - d.getTime()) / 1000)

  const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60]
  ]

  const rtf = new Intl.RelativeTimeFormat(getCurrentLocale().value as string, { numeric: 'auto' })

  for (const [unit, seconds] of units) {
    const interval = Math.floor(diffInSeconds / seconds)
    if (interval >= 1) return rtf.format(-interval, unit)
  }

  return rtf.format(0, 'second')
}

/**
 * Vérifie si une date correspond au jour courant
 */
export function isToday(date: string | Date): boolean {
  const d = date instanceof Date ? date : new Date(date)
  return d.toDateString() === new Date().toDateString()
}

/**
 * Vérifie si une date correspond à la veille
 */
export function isYesterday(date: string | Date): boolean {
  const d = date instanceof Date ? date : new Date(date)
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return d.toDateString() === yesterday.toDateString()
}

/**
 * Formate un nombre en notation compacte selon la locale (ex: 1.2K)
 */
export function formatCompactNumber(value: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short'
  }).format(value)
}

export const formatLongWeekdayDate = (
  dateInput: Date | string | number,
  locale: string,
  options?: { timeZone?: string }
): string => {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput)
  if (Number.isNaN(date.getTime())) return ''

  const timeZone = options?.timeZone ?? 'Africa/Porto-Novo'

  return new Intl.DateTimeFormat(locale, {
    timeZone,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

/**
 * Normalize a date to GMT+1 at midnight (00:00:00)
 * This ensures the date represents the correct calendar day in GMT+1 timezone
 * Useful for date-only values like reservation dates
 */
export const normalizeToGMTPlus1Midnight = (date: Date): Date => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const gmtPlus1String = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00:00.000+01:00`

  return new Date(gmtPlus1String)
}

/**
 * Format a Date as YYYY-MM-DD representing the date in GMT+1 timezone
 * This extracts the date components as they appear in GMT+1
 */
export const formatDateToGMTPlus1 = (date: Date): string => {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Porto-Novo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })

  return formatter.format(date)
}

/**
 * Construit l'URL d'une image à partir d'un chemin
 * Utilise l'API pour les chemins relatifs, ou retourne le chemin tel quel pour les URLs absolues
 */
export const getImageUrl = (path: string | null | undefined, baseUrl?: string): string => {
  if (!path) return ''
  const base = baseUrl ?? useBaseUrl()
  return `${base}/api/files/download?path=${encodeURIComponent(path)}`
}

/**
 * Formate la taille d'un fichier en octets vers une unité lisible (B, KB, MB, GB)
 */
export function formatFileSize(bytes: number): string {
  if (!bytes) return '—'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
}

export function formatHours(time: string | null | undefined, fallback: string = 'N/A'): string {
  if (!time) return fallback

  const match = /^(\d{1,2}):(\d{2})(?::\d{2})?$/.exec(time.trim())
  if (!match) return fallback

  const hours = Number(match[1])
  const minutes = Number(match[2])
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return fallback

  const date = new Date()
  date.setHours(hours, minutes, 0, 0)

  const locale = getCurrentLocale().value as string
  const hour12 = locale.toLowerCase().startsWith('en')

  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12
  }).format(date)
}