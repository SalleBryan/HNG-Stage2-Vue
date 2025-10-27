"use client"

import { ref } from "vue"

interface Toast {
  id: string
  message: string
  type: "success" | "error" | "info"
}

const toasts = ref<Toast[]>([])

export function useToast() {
  const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
    const id = crypto.randomUUID()
    const newToast = { id, message, type }
    toasts.value.push(newToast)

    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id)
    }, 3000)
  }

  return {
    toasts,
    showToast,
  }
}
