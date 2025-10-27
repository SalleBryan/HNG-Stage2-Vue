<template>
  <button
    @click="toggleTheme"
    class="btn secondary"
    style="padding: 8px 16px; font-size: 18px"
    :aria-label="`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`"
  >
    {{ theme === 'light' ? '🌙' : '☀️' }}
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const theme = ref<'light' | 'dark'>('light')

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
  theme.value = initialTheme
  document.documentElement.setAttribute('data-theme', initialTheme)
})

const toggleTheme = () => {
  const newTheme = theme.value === 'light' ? 'dark' : 'light'
  theme.value = newTheme
  document.documentElement.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
}
</script>
