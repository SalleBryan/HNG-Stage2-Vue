<template>
  <header class="app-header">
    <router-link to="/" class="brand">
      <div class="logo">🍂</div>
      <span style="font-family: var(--font-heading); font-weight: 700; font-size: 20px">TicketFlow</span>
    </router-link>

    <nav>
      <!-- Added conditional rendering based on user authentication -->
      <template v-if="user">
        <router-link to="/dashboard" :class="{ active: isActive('/dashboard') }">
          <LayoutDashboard :size="18" style="margin-right: 6px" />
          Dashboard
        </router-link>
        <router-link to="/tickets" :class="{ active: isActive('/tickets') }">
          <Ticket :size="18" style="margin-right: 6px" />
          Tickets
        </router-link>
        <button @click="handleLogout" class="btn secondary" style="padding: 8px 16px">
          <LogOut :size="16" style="margin-right: 6px" />
          Logout
        </button>
      </template>
      <template v-else>
        <router-link to="/auth/login" :class="{ active: isActive('/auth/login') }">
          Login
        </router-link>
        <router-link to="/auth/signup" :class="{ active: isActive('/auth/signup') }">
          Sign Up
        </router-link>
      </template>
      <ThemeToggle />
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { LogOut, LayoutDashboard, Ticket } from 'lucide-vue-next'
import { useAuthStore } from '../composables/useAuth'
import ThemeToggle from './ThemeToggle.vue'

const { user, logout } = useAuthStore()
const router = useRouter()
const route = useRoute()

const handleLogout = () => {
  logout()
  router.push('/')
}

const isActive = (path: string) => route.path === path
</script>
