<template>
  <div class="container" style="padding-top: var(--space-2xl); padding-bottom: var(--space-2xl)">
    <div style="max-width: 480px; margin: 0 auto">
      <div class="card" style="padding: var(--space-xl)">
        <h1 style="text-align: center; margin-bottom: var(--space-lg)">Create Account</h1>
        <p style="text-align: center; margin-bottom: var(--space-xl); color: var(--color-text-secondary)">
          Join us to start managing your tickets
        </p>

        <form @submit.prevent="handleSubmit" style="display: flex; flex-direction: column; gap: var(--space-lg)">
          <div>
            <label
              for="name"
              style="
                display: block;
                margin-bottom: var(--space-sm);
                font-weight: 600;
                font-size: var(--font-size-sm);
              "
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              v-model="name"
              @input="handleNameChange"
              placeholder="John Doe"
              required
              autocomplete="name"
              :aria-invalid="!!errors.name"
              :aria-describedby="errors.name ? 'name-error' : undefined"
            />
            <div
              v-if="errors.name"
              id="name-error"
              style="
                display: flex;
                align-items: center;
                gap: var(--space-xs);
                margin-top: var(--space-xs);
                color: var(--leaf-rust);
                font-size: var(--font-size-sm);
              "
            >
              <AlertCircle :size="14" />
              <span>{{ errors.name }}</span>
            </div>
          </div>

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
              @input="handleEmailChange"
              placeholder="you@example.com"
              required
              autocomplete="email"
              :aria-invalid="!!errors.email"
              :aria-describedby="errors.email ? 'email-error' : undefined"
            />
            <div
              v-if="errors.email"
              id="email-error"
              style="
                display: flex;
                align-items: center;
                gap: var(--space-xs);
                margin-top: var(--space-xs);
                color: var(--leaf-rust);
                font-size: var(--font-size-sm);
              "
            >
              <AlertCircle :size="14" />
              <span>{{ errors.email }}</span>
            </div>
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
              @input="handlePasswordChange"
              placeholder="••••••••"
              required
              autocomplete="new-password"
              minlength="6"
              :aria-invalid="!!errors.password"
              :aria-describedby="errors.password ? 'password-error' : undefined"
            />
            <div
              v-if="errors.password"
              id="password-error"
              style="
                display: flex;
                align-items: center;
                gap: var(--space-xs);
                margin-top: var(--space-xs);
                color: var(--leaf-rust);
                font-size: var(--font-size-sm);
              "
            >
              <AlertCircle :size="14" />
              <span>{{ errors.password }}</span>
            </div>
          </div>

          <div>
            <label
              for="confirmPassword"
              style="
                display: block;
                margin-bottom: var(--space-sm);
                font-weight: 600;
                font-size: var(--font-size-sm);
              "
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              v-model="confirmPassword"
              @input="handleConfirmPasswordChange"
              placeholder="••••••••"
              required
              autocomplete="new-password"
              minlength="6"
              :aria-invalid="!!errors.confirmPassword"
              :aria-describedby="errors.confirmPassword ? 'confirm-password-error' : undefined"
            />
            <div
              v-if="errors.confirmPassword"
              id="confirm-password-error"
              style="
                display: flex;
                align-items: center;
                gap: var(--space-xs);
                margin-top: var(--space-xs);
                color: var(--leaf-rust);
                font-size: var(--font-size-sm);
              "
            >
              <AlertCircle :size="14" />
              <span>{{ errors.confirmPassword }}</span>
            </div>
          </div>

          <button type="submit" class="btn" :disabled="isLoading" style="width: 100%">
            {{ isLoading ? 'Creating account...' : 'Create Account' }}
          </button>
        </form>

        <p style="text-align: center; margin-top: var(--space-lg); font-size: var(--font-size-sm)">
          Already have an account?
          <router-link to="/auth/login" style="color: var(--accent-primary); font-weight: 600">
            Sign in
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { AlertCircle } from 'lucide-vue-next'
import { useAuthStore } from '../composables/useAuth'
import { useToast } from '../composables/useToast'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)

const errors = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const { signup } = useAuthStore()
const { showToast } = useToast()
const router = useRouter()

const validateName = (value: string) => {
  if (!value.trim()) {
    return 'Name is required'
  }
  if (value.trim().length < 2) {
    return 'Name must be at least 2 characters'
  }
  return ''
}

const validateEmail = (value: string) => {
  if (!value.trim()) {
    return 'Email is required'
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) {
    return 'Please enter a valid email address'
  }
  return ''
}

const validatePassword = (value: string) => {
  if (!value) {
    return 'Password is required'
  }
  if (value.length < 6) {
    return 'Password must be at least 6 characters'
  }
  return ''
}

const validateConfirmPassword = (value: string, passwordValue: string) => {
  if (!value) {
    return 'Please confirm your password'
  }
  if (value !== passwordValue) {
    return 'Passwords do not match'
  }
  return ''
}

const handleNameChange = () => {
  errors.name = validateName(name.value)
}

const handleEmailChange = () => {
  errors.email = validateEmail(email.value)
}

const handlePasswordChange = () => {
  errors.password = validatePassword(password.value)
  if (confirmPassword.value) {
    errors.confirmPassword = validateConfirmPassword(confirmPassword.value, password.value)
  }
}

const handleConfirmPasswordChange = () => {
  errors.confirmPassword = validateConfirmPassword(confirmPassword.value, password.value)
}

const handleSubmit = async () => {
  // Validate all fields
  const nameError = validateName(name.value)
  const emailError = validateEmail(email.value)
  const passwordError = validatePassword(password.value)
  const confirmPasswordError = validateConfirmPassword(confirmPassword.value, password.value)

  errors.name = nameError
  errors.email = emailError
  errors.password = passwordError
  errors.confirmPassword = confirmPasswordError

  if (nameError || emailError || passwordError || confirmPasswordError) {
    return
  }

  isLoading.value = true

  try {
    const success = await signup(name.value, email.value, password.value)
    if (success) {
      showToast('Account created successfully!', 'success')
      router.push('/dashboard')
    } else {
      showToast('Email already exists', 'error')
    }
  } catch (error) {
    showToast('An error occurred. Please try again.', 'error')
  } finally {
    isLoading.value = false
  }
}
</script>
