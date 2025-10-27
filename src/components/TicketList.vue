<template>
  <div v-if="tickets.length === 0" class="card" style="padding: var(--space-2xl); text-align: center">
    <p style="color: var(--color-muted); font-size: var(--font-size-lg)">No tickets found</p>
  </div>

  <div v-else style="display: flex; flex-direction: column; gap: var(--space-md)">
    <div
      v-for="ticket in tickets"
      :key="ticket.id"
      class="card ticket-item"
      style="padding: var(--space-lg)"
    >
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: var(--space-md);
          margin-bottom: var(--space-md);
        "
      >
        <div style="flex: 1">
          <div
            style="
              display: flex;
              align-items: center;
              gap: var(--space-md);
              margin-bottom: var(--space-sm);
            "
          >
            <h3 style="margin: 0; font-size: var(--font-size-xl)">{{ ticket.title }}</h3>
            <span
              :style="{
                padding: '4px 8px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: getPriorityColor(ticket.priority),
                border: `1px solid ${getPriorityColor(ticket.priority)}`,
                background: `${getPriorityColor(ticket.priority)}15`,
              }"
            >
              {{ ticket.priority }}
            </span>
          </div>
          <p style="margin: 0; color: var(--color-text-secondary)">{{ ticket.description }}</p>
          <p
            style="
              margin: 0;
              margin-top: var(--space-sm);
              font-size: var(--font-size-xs);
              color: var(--color-muted);
              display: flex;
              align-items: center;
              gap: var(--space-xs);
            "
          >
            <Calendar :size="12" />
            Created: {{ new Date(ticket.createdAt).toLocaleDateString() }}
          </p>
        </div>
        <span :class="`status-pill status-${ticket.status}`">
          {{ ticket.status === 'in-progress' ? 'In Progress' : ticket.status }}
        </span>
      </div>

      <div style="display: flex; gap: var(--space-sm); flex-wrap: wrap">
        <select
          :value="ticket.status"
          @change="$emit('status-change', ticket.id, ($event.target as HTMLSelectElement).value)"
          style="padding: 8px 12px; font-size: var(--font-size-sm)"
          aria-label="Change ticket status"
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <button @click="$emit('edit', ticket)" class="btn secondary" style="padding: 8px 16px">
          <Edit2 :size="14" style="margin-right: 6px" />
          Edit
        </button>
        <button
          @click="$emit('delete', ticket.id)"
          class="btn secondary"
          style="padding: 8px 16px; color: var(--leaf-rust)"
        >
          <Trash2 :size="14" style="margin-right: 6px" />
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Edit2, Trash2, Calendar } from 'lucide-vue-next'
import type { Ticket } from '../utils/ticketStorage'

interface Props {
  tickets: Ticket[]
}

defineProps<Props>()

defineEmits<{
  edit: [ticket: Ticket]
  delete: [id: string]
  'status-change': [id: string, status: 'open' | 'in-progress' | 'closed']
}>()

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'var(--leaf-rust)'
    case 'medium':
      return 'var(--accent-secondary)'
    case 'low':
      return 'var(--leaf-olive)'
    default:
      return 'var(--color-muted)'
  }
}
</script>
