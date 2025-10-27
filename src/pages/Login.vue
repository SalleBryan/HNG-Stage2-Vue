<template>
  <div class="container" style="padding-top: var(--space-2xl); padding-bottom: var(--space-2xl)">
    <div style="max-width: 480px; margin: 0 auto">
      <div class="card" style="padding: var(--space-xl)">
        <h1 style="text-align: center; margin-bottom: var(--space-lg)">Welcome Back</h1>
        <p style="text-align: center; margin-bottom: var(--space-xl); color: var(--color-text-secondary)">
          Sign in to your account to continue
        </p>

        <form @submit.prevent="handleSubmit" style="display: flex; flex-direction: column; gap: var(--space-lg)">
          <div>
            <label
              for="email"
              style="
                display: block;
                margin-bottom: var(--space-sm);
                font-weight: 600;
                font-size: var(--font-size-sm);
              "
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              v-model="email"
              placeholder="you@example.com"
              required
              autocomplete="email"
            />
          </div>

          <div>
            <label
              for="password"
              style="
                display: block;
                margin-bottom: var(--space-sm);
                font-weight: 600;
                font-size: var(--font-size-sm);
              "
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              v-model="password"
              placeholder="••••••••"
              required
              autocomplete="current-password"
            />
          </div>

          <button type="submit" class="btn" :disabled="isLoading" style="width: 100%">
            {{ isLoading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <p style="text-align: center; margin-top: var(--space-lg); font-size: var(--font-size-sm)">
          Don't have an account?
          <router-link to="/auth/signup" style="color: var(--accent-primary); font-weight: 600">
            Sign up
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../composables/useAuth'
import { useToast } from '../composables/useToast'

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const { login } = useAuthStore()
const { showToast } = useToast()
const router = useRouter()

const handleSubmit = async () => {
  isLoading.value = true

  try {
    const success = await login(email.value, password.value)
    if (success) {
      showToast('Welcome back!', 'success')
      router.push('/dashboard')
    } else {
      showToast('Invalid email or password', 'error')
    }
  } catch (error) {
    showToast('An error occurred. Please try again.', 'error')
  } finally {
    isLoading.value = false
  }
}
</script>
