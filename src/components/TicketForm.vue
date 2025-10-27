<template>
  <div class="card" style="max-width: 600px; width: 100%; padding: var(--space-xl)">
    <h2 style="margin-bottom: var(--space-lg)">{{ ticket ? 'Edit Ticket' : 'Create New Ticket' }}</h2>

    <form @submit.prevent="handleSubmit" style="display: flex; flex-direction: column; gap: var(--space-lg)">
      <div>
        <label
          for="title"
          style="
            display: block;
            margin-bottom: var(--space-sm);
            font-weight: 600;
            font-size: var(--font-size-sm);
          "
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          v-model="title"
          placeholder="Enter ticket title"
          required
          autofocus
        />
      </div>

      <div>
        <label
          for="description"
          style="
            display: block;
            margin-bottom: var(--space-sm);
            font-weight: 600;
            font-size: var(--font-size-sm);
          "
        >
          Description
        </label>
        <textarea
          id="description"
          v-model="description"
          placeholder="Describe the issue or request"
          required
          rows="4"
        />
      </div>

      <div>
        <label
          for="priority"
          style="
            display: block;
            margin-bottom: var(--space-sm);
            font-weight: 600;
            font-size: var(--font-size-sm);
          "
        >
          Priority
        </label>
        <select id="priority" v-model="priority" required>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div v-if="ticket">
        <label
          for="status"
          style="
            display: block;
            margin-bottom: var(--space-sm);
            font-weight: 600;
            font-size: var(--font-size-sm);
          "
        >
          Status
        </label>
        <select id="status" v-model="status" required>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div style="display: flex; gap: var(--space-md); margin-top: var(--space-md)">
        <button type="submit" class="btn" style="flex: 1">
          {{ ticket ? 'Update Ticket' : 'Create Ticket' }}
        </button>
        <button type="button" @click="$emit('cancel')" class="btn secondary" style="flex: 1">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ticket } from '../utils/ticketStorage'

interface Props {
  ticket?: Ticket | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  submit: [data: { title: string; description: string; priority: 'low' | 'medium' | 'high'; status?: 'open' | 'in-progress' | 'closed' }]
  cancel: []
}>()

const title = ref(props.ticket?.title || '')
const description = ref(props.ticket?.description || '')
const priority = ref<'low' | 'medium' | 'high'>(props.ticket?.priority || 'medium')
const status = ref<'open' | 'in-progress' | 'closed'>(props.ticket?.status || 'open')

watch(() => props.ticket, (newTicket) => {
  if (newTicket) {
    title.value = newTicket.title
    description.value = newTicket.description
    priority.value = newTicket.priority
    status.value = newTicket.status
  }
})

const handleSubmit = () => {
  if (props.ticket) {
    emit('submit', {
      title: title.value,
      description: description.value,
      priority: priority.value,
      status: status.value
    })
  } else {
    emit('submit', {
      title: title.value,
      description: description.value,
      priority: priority.value
    })
  }
}
</script>
