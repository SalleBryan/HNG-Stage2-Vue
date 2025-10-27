<template>
  <div>
    <div class="container" style="padding-top: var(--space-xl); padding-bottom: var(--space-2xl)">
      <div class="hero">
        <div class="hero-content">
          <h1>Manage Tickets with Ease and Elegance</h1>
          <p class="text-pretty">
            A beautiful, intuitive ticket management system designed with warm autumn aesthetics. Track, organize, and
            resolve tickets efficiently while enjoying a delightful user experience.
          </p>
          <div style="display: flex; gap: var(--space-md); flex-wrap: wrap">
            <router-link to="/dashboard" class="btn" v-if="authStore.user">
              Go to Dashboard
            </router-link>
            <router-link to="/tickets" class="btn secondary" v-if="authStore.user">
              View Tickets
            </router-link>
            <router-link to="/auth/signup" class="btn" v-if="!authStore.user">
              Get Started
            </router-link>
            <router-link to="/auth/login" class="btn secondary" v-if="!authStore.user">
              Sign In
            </router-link>
          </div>
        </div>
        <div style="flex: 0 0 auto; position: relative; z-index: 1">
          <img
            src="/autumn-leaves-ticket-management-illustration.jpg"
            alt="Ticket management illustration"
            style="
              width: 100%;
              max-width: 400px;
              height: auto;
              border-radius: var(--radius-xl);
              box-shadow: var(--shadow-xl);
            "
          />
        </div>
      </div>

      <section style="margin-top: var(--space-2xl)">
        <h2 style="text-align: center; margin-bottom: var(--space-xl)">Key Features</h2>
        <div
          style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: var(--space-lg);
          "
        >
          <div class="card">
            <div
              style="
                margin-bottom: var(--space-md);
                color: var(--accent-primary);
              "
            >
              <Ticket :size="32" />
            </div>
            <h3>Intuitive Management</h3>
            <p>Create, update, and track tickets with an easy-to-use interface designed for efficiency.</p>
          </div>

          <div class="card">
            <div
              style="
                margin-bottom: var(--space-md);
                color: var(--accent-primary);
              "
            >
              <BarChart3 :size="32" />
            </div>
            <h3>Visual Dashboard</h3>
            <p>Get insights at a glance with beautiful statistics and status tracking.</p>
          </div>

          <div class="card">
            <div
              style="
                margin-bottom: var(--space-md);
                color: var(--accent-primary);
              "
            >
              <Palette :size="32" />
            </div>
            <h3>Autumn Theme</h3>
            <p>Enjoy a warm, cozy design with light and dark modes inspired by autumn colors.</p>
          </div>
        </div>
      </section>
    </div>

    <footer
      style="
        background: var(--color-surface);
        border-top: 1px solid var(--color-border);
        margin-top: var(--space-2xl);
        padding: var(--space-2xl) 0;
      "
    >
      <div class="container">
        <div
          style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: var(--space-xl);
            margin-bottom: var(--space-xl);
          "
        >
          <div>
            <div
              style="
                display: flex;
                align-items: center;
                gap: var(--space-sm);
                margin-bottom: var(--space-md);
              "
            >
              <div class="logo">🍂</div>
              <span style="font-family: var(--font-heading); font-weight: 700; font-size: 20px">TicketFlow</span>
            </div>
            <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm)">
              A beautiful ticket management system with autumn-inspired design.
            </p>
          </div>

          <div>
            <h4 style="margin-bottom: var(--space-md); font-size: var(--font-size-md)">Quick Links</h4>
            <ul
              style="
                list-style: none;
                padding: 0;
                margin: 0;
                display: flex;
                flex-direction: column;
                gap: var(--space-sm);
              "
            >
              <li>
                <router-link to="/" style="color: var(--color-text-secondary); font-size: var(--font-size-sm)">
                  Home
                </router-link>
              </li>
              <li>
                <router-link
                  to="/auth/login"
                  style="color: var(--color-text-secondary); font-size: var(--font-size-sm)"
                >
                  Login
                </router-link>
              </li>
              <li>
                <router-link
                  to="/auth/signup"
                  style="color: var(--color-text-secondary); font-size: var(--font-size-sm)"
                >
                  Sign Up
                </router-link>
              </li>
            </ul>
          </div>

          <div>
            <h4 style="margin-bottom: var(--space-md); font-size: var(--font-size-md)">Connect</h4>
            <div style="display: flex; gap: var(--space-md)">
              <a href="https://github.com/sallebryan" target="_blank" aria-label="GitHub" style="color: var(--color-text-secondary)">
                <Github :size="20" />
              </a>
              <a href="https://x.com/bryanja72423970" target="_blank" aria-label="X" style="color: var(--color-text-secondary)">
                <Twitter :size="20" />
              </a>
              <a href="https://www.linkedin.com/in/salle-yimnai-bryan-56619b322" target="_blank" aria-label="LinkedIn" style="color: var(--color-text-secondary)">
                <Linkedin :size="20" />
              </a>
            </div>
          </div>
        </div>

        <div
          style="
            border-top: 1px solid var(--color-border);
            padding-top: var(--space-lg);
            text-align: center;
          "
        >
          <p style="color: var(--color-muted); font-size: var(--font-size-sm); margin: 0">
            © {{ new Date().getFullYear() }} Salle Bryan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Ticket, BarChart3, Palette, Github, Twitter, Linkedin } from 'lucide-vue-next'
import { useAuthStore } from '../composables/useAuth'

const authStore = useAuthStore()
</script>
