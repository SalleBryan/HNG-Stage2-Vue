<template>
  <div class="app">
    <Header />
    <main>
      <router-view />
    </main>
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import ToastContainer from './components/ToastContainer.vue'
</script>
