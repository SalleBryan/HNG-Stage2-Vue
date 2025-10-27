<template>
  <div class="container" style="padding-top: var(--space-xl); padding-bottom: var(--space-2xl)">
    <div style="margin-bottom: var(--space-xl)">
      <h1>Welcome back, {{ user.name }}! 👋</h1>
      <p style="color: var(--color-text-secondary)">Here's an overview of your ticket management</p>
    </div>

    <div
      style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: var(--space-lg);
        margin-bottom: var(--space-2xl);
      "
    >
      <div class="stat-card">
        <div class="stat-value">{{ stats.total }}</div>
        <div class="stat-label">Total Tickets</div>
      </div>

      <div class="stat-card">
        <div class="stat-value" style="color: var(--leaf-olive)">
          {{ stats.open }}
        </div>
        <div class="stat-label">Open</div>
      </div>

      <div class="stat-card">
        <div class="stat-value" style="color: var(--accent-secondary)">
          {{ stats.inProgress }}
        </div>
        <div class="stat-label">In Progress</div>
      </div>

      <div class="stat-card">
        <div class="stat-value" style="color: var(--muted-brown)">
          {{ stats.closed }}
        </div>
        <div class="stat-label">Closed</div>
      </div>
    </div>

    <div class="card">
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-lg);
        "
      >
        <h2 style="margin: 0">Recent Tickets</h2>
        <router-link to="/tickets" class="btn secondary" style="padding: 8px 16px">
          View All
        </router-link>
      </div>

      <div v-if="recentTickets.length === 0" style="text-align: center; padding: var(--space-2xl)">
        <p style="color: var(--color-muted); margin-bottom: var(--space-lg)">
          No tickets yet. Create your first ticket to get started!
        </p>
        <router-link to="/tickets" class="btn">
          Create Ticket
        </router-link>
      </div>
      <div v-else style="display: flex; flex-direction: column; gap: var(--space-md)">
        <div
          v-for="ticket in recentTickets"
          :key="ticket.id"
          class="card"
          style="
            padding: var(--space-md);
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: var(--space-md);
          "
        >
          <div style="flex: 1">
            <h3 style="margin: 0; margin-bottom: var(--space-xs); font-size: var(--font-size-lg)">
              {{ ticket.title }}
            </h3>
            <p style="margin: 0; color: var(--color-muted); font-size: var(--font-size-sm)">
              {{ ticket.description.substring(0, 100) }}{{ ticket.description.length > 100 ? '...' : '' }}
            </p>
          </div>
          <span :class="`status-pill status-${ticket.status}`">
            {{ ticket.status === 'in-progress' ? 'In Progress' : ticket.status }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../composables/useAuth'
import { type Ticket, getTickets } from '../utils/ticketStorage'

const { user } = useAuthStore()
const tickets = ref<Ticket[]>([])

onMounted(() => {
  tickets.value = getTickets(user.id)
})

const stats = computed(() => ({
  total: tickets.value.length,
  open: tickets.value.filter((t) => t.status === 'open').length,
  inProgress: tickets.value.filter((t) => t.status === 'in-progress').length,
  closed: tickets.value.filter((t) => t.status === 'closed').length,
}))

const recentTickets = computed(() => tickets.value.slice(0, 5))
</script>
