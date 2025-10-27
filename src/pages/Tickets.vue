<template>
  <div class="container" style="padding-top: var(--space-xl); padding-bottom: var(--space-2xl)">
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-xl);
        flex-wrap: wrap;
        gap: var(--space-md);
      "
    >
      <h1>My Tickets</h1>
      <button @click="isFormOpen = true" class="btn">
        <Plus :size="18" style="margin-right: 8px" />
        Create Ticket
      </button>
    </div>

    <div
      style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: var(--space-md);
        margin-bottom: var(--space-xl);
      "
    >
      <div class="stat-card" style="padding: var(--space-md)">
        <div
          style="display: flex; align-items: center; gap: var(--space-xs); margin-bottom: var(--space-xs)"
        >
          <BarChart3 :size="16" style="color: var(--color-muted)" />
          <div class="stat-label" style="font-size: var(--font-size-xs)">
            Total
          </div>
        </div>
        <div class="stat-value" style="font-size: var(--font-size-2xl)">
          {{ stats.total }}
        </div>
      </div>

      <div class="stat-card" style="padding: var(--space-md)">
        <div
          style="display: flex; align-items: center; gap: var(--space-xs); margin-bottom: var(--space-xs)"
        >
          <AlertCircle :size="16" style="color: var(--leaf-olive)" />
          <div class="stat-label" style="font-size: var(--font-size-xs)">
            Open
          </div>
        </div>
        <div class="stat-value" style="font-size: var(--font-size-2xl); color: var(--leaf-olive)">
          {{ stats.open }}
        </div>
      </div>

      <div class="stat-card" style="padding: var(--space-md)">
        <div
          style="display: flex; align-items: center; gap: var(--space-xs); margin-bottom: var(--space-xs)"
        >
          <Clock :size="16" style="color: var(--accent-secondary)" />
          <div class="stat-label" style="font-size: var(--font-size-xs)">
            In Progress
          </div>
        </div>
        <div class="stat-value" style="font-size: var(--font-size-2xl); color: var(--accent-secondary)">
          {{ stats.inProgress }}
        </div>
      </div>

      <div class="stat-card" style="padding: var(--space-md)">
        <div
          style="display: flex; align-items: center; gap: var(--space-xs); margin-bottom: var(--space-xs)"
        >
          <CheckCircle2 :size="16" style="color: var(--muted-brown)" />
          <div class="stat-label" style="font-size: var(--font-size-xs)">
            Closed
          </div>
        </div>
        <div class="stat-value" style="font-size: var(--font-size-2xl); color: var(--muted-brown)">
          {{ stats.closed }}
        </div>
      </div>
    </div>

    <div
      style="
        display: flex;
        gap: var(--space-sm);
        margin-bottom: var(--space-lg);
        flex-wrap: wrap;
        padding: var(--space-md);
        background: var(--color-surface);
        border-radius: var(--radius-lg);
      "
    >
      <span style="font-size: var(--font-size-sm); font-weight: 600; color: var(--color-text-secondary)">
        Priorities:
      </span>
      <span style="font-size: var(--font-size-sm)">
        <span style="color: var(--leaf-rust); font-weight: 600">{{ stats.highPriority }}</span> High
      </span>
      <span style="font-size: var(--font-size-sm)">
        <span style="color: var(--accent-secondary); font-weight: 600">{{ stats.mediumPriority }}</span> Medium
      </span>
      <span style="font-size: var(--font-size-sm)">
        <span style="color: var(--leaf-olive); font-weight: 600">{{ stats.lowPriority }}</span> Low
      </span>
    </div>

    <div style="margin-bottom: var(--space-lg)">
      <div style="position: relative; max-width: 500px">
        <Search
          :size="18"
          style="
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--color-muted);
          "
        />
        <input
          type="search"
          placeholder="Search tickets by title, description, or priority..."
          v-model="searchQuery"
          style="
            padding-left: 40px;
            width: 100%;
          "
          aria-label="Search tickets"
        />
      </div>
    </div>

    <div style="margin-bottom: var(--space-lg)">
      <div style="display: flex; gap: var(--space-sm); flex-wrap: wrap">
        <button
          v-for="status in ['all', 'open', 'in-progress', 'closed']"
          :key="status"
          @click="filter = status"
          :class="filter === status ? 'btn' : 'btn secondary'"
          style="padding: 8px 16px"
        >
          {{ status === 'all' ? 'All' : status === 'in-progress' ? 'In Progress' : status }}
        </button>
      </div>
    </div>

    <div
      v-if="isFormOpen"
      style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: var(--space-lg);
      "
      @click="handleCloseForm"
    >
      <div @click.stop>
        <TicketForm
          :ticket="editingTicket"
          @submit="handleSubmit"
          @cancel="handleCloseForm"
        />
      </div>
    </div>

    <TicketList
      :tickets="filteredTickets"
      @edit="handleEditClick"
      @delete="handleDeleteTicket"
      @status-change="handleStatusChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Search, Plus, BarChart3, AlertCircle, CheckCircle2, Clock } from 'lucide-vue-next'
import { useAuthStore } from '../composables/useAuth'
import { useToast } from '../composables/useToast'
import { type Ticket, getTickets, createTicket, updateTicket, deleteTicket } from '../utils/ticketStorage'
import TicketForm from '../components/TicketForm.vue'
import TicketList from '../components/TicketList.vue'

const { user } = useAuthStore()
const { showToast } = useToast()

const tickets = ref<Ticket[]>([])
const isFormOpen = ref(false)
const editingTicket = ref<Ticket | null>(null)
const filter = ref<'all' | 'open' | 'in-progress' | 'closed'>('all')
const searchQuery = ref('')

onMounted(() => {
  loadTickets()
})

const loadTickets = () => {
  if (user.value) {
    tickets.value = getTickets(user.value.id)
  }
}

const handleSubmit = (data: { title: string; description: string; priority: 'low' | 'medium' | 'high'; status?: 'open' | 'in-progress' | 'closed' }) => {
  if (!user.value) return

  if (editingTicket.value) {
    const updated = updateTicket(user.value.id, editingTicket.value.id, {
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: data.status
    })
    if (updated) {
      loadTickets()
      editingTicket.value = null
      isFormOpen.value = false
      showToast('Ticket updated successfully!', 'success')
    }
  } else {
    const newTicket = createTicket(user.value.id, data.title, data.description, data.priority)
    tickets.value = [newTicket, ...tickets.value]
    isFormOpen.value = false
    showToast('Ticket created successfully!', 'success')
  }
}

const handleDeleteTicket = (id: string) => {
  if (!user.value) return

  if (window.confirm('Are you sure you want to delete this ticket?')) {
    const deleted = deleteTicket(user.value.id, id)
    if (deleted) {
      loadTickets()
      showToast('Ticket deleted successfully!', 'success')
    }
  }
}

const handleEditClick = (ticket: Ticket) => {
  editingTicket.value = ticket
  isFormOpen.value = true
}

const handleStatusChange = (id: string, status: 'open' | 'in-progress' | 'closed') => {
  if (!user.value) return
  updateTicket(user.value.id, id, { status })
  loadTickets()
}

const handleCloseForm = () => {
  isFormOpen.value = false
  editingTicket.value = null
}

const filteredTickets = computed(() => {
  let result = tickets.value

  if (filter.value !== 'all') {
    result = result.filter((t) => t.status === filter.value)
  }

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      (t) =>
        t.title.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.priority.toLowerCase().includes(query)
    )
  }

  return result
})

const stats = computed(() => ({
  total: tickets.value.length,
  open: tickets.value.filter((t) => t.status === 'open').length,
  inProgress: tickets.value.filter((t) => t.status === 'in-progress').length,
  closed: tickets.value.filter((t) => t.status === 'closed').length,
  highPriority: tickets.value.filter((t) => t.priority === 'high').length,
  mediumPriority: tickets.value.filter((t) => t.priority === 'medium').length,
  lowPriority: tickets.value.filter((t) => t.priority === 'low').length,
}))
</script>
