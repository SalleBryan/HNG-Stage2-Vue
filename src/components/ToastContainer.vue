<template>
  <div
    style="
      position: fixed;
      bottom: var(--space-lg);
      right: var(--space-lg);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    "
  >
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="toast"
      :style="{
        borderLeft: `4px solid ${getToastColor(toast.type)}`,
        minWidth: '300px',
      }"
    >
      <p style="margin: 0; font-weight: 600">{{ toast.message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '../composables/useToast'

const { toasts } = useToast()

const getToastColor = (type: string) => {
  switch (type) {
    case 'success':
      return 'var(--leaf-olive)'
    case 'error':
      return 'var(--leaf-rust)'
    default:
      return 'var(--accent-primary)'
  }
}
</script>
