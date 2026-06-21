<template>
  <Transition name="fade" mode="out-in">
    <div
      v-if="currentAlert"
      :key="currentAlert.id"
      :class="variants[currentAlert.variant ?? 'info'].bg"
      role="status"
    >
      <div class="container mx-auto flex items-center gap-2 px-4 py-2 text-sm">
        <component
          :is="variants[currentAlert.variant ?? 'info'].icon"
          class="size-4 shrink-0"
        />
        <span class="font-bold"
          >{{
            currentAlert.title ?? variants[currentAlert.variant ?? "info"].title
          }}
          :</span
        >
        <span class="flex-1">{{ currentAlert.message }}</span>

        <UiButton
          variant="ghost"
          size="icon-xs"
          class="shrink-0 text-current hover:text-current"
          :aria-label="$t('common.actions.close')"
          @click="dismiss(currentAlert.id)"
        >
          <X class="size-4" />
        </UiButton>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "@lucide/vue";

export interface AlertItem {
  id: string | number;
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  message: string;
}

const ROTATION_INTERVAL_MS = 10000;

const alerts: AlertItem[] = [
  {
    id: "renovation",
    variant: "warning",
    message:
      "En raison de travaux de rénovation, certains services sont momentanément indisponibles.",
  },
  {
    id: "maintenance",
    variant: "info",
    message:
      "Une mise à jour du site est prévue ce week-end, certaines pages peuvent être temporairement indisponibles.",
  },
  {
    id: "devis-envoye",
    variant: "success",
    message:
      "Votre demande de devis a bien été envoyée, notre équipe vous recontactera sous 48h.",
  },
  {
    id: "paiement-echec",
    variant: "error",
    message:
      "Une erreur est survenue lors du traitement de votre demande, veuillez réessayer.",
  },
];

const variants = {
  info: { bg: "bg-(--primary) text-white", icon: Info, title: "Info" },
  success: { bg: "bg-(--success) text-white", icon: CheckCircle2, title: "Succès" },
  warning: {
    bg: "bg-(--warning) text-(--text-dark)",
    icon: AlertTriangle,
    title: "Alertes infos",
  },
  error: { bg: "bg-(--danger) text-white", icon: XCircle, title: "Erreur" },
};

const dismissedIds = ref(new Set<AlertItem["id"]>());
const currentIndex = ref(0);
let intervalId: ReturnType<typeof setInterval> | null = null;

const visibleAlerts = computed(() =>
  alerts.filter((alert) => !dismissedIds.value.has(alert.id))
);
const currentAlert = computed(() => {
  if (!visibleAlerts.value.length) return null;
  return visibleAlerts.value[currentIndex.value % visibleAlerts.value.length];
});

const startRotation = () => {
  if (intervalId) clearInterval(intervalId);
  if (visibleAlerts.value.length <= 1) return;

  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % visibleAlerts.value.length;
  }, ROTATION_INTERVAL_MS);
};

const dismiss = (id: AlertItem["id"]) => {
  dismissedIds.value.add(id);
};

watch(visibleAlerts, () => {
  currentIndex.value = 0;
  startRotation();
});

onMounted(startRotation);
onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
