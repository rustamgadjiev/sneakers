<script setup>
import Header from './components/Header.vue'
</script>

<template>
  <main>
    <Header />
    <div class="container">
      <router-view></router-view>
    </div>
  </main>
</template>

<style scoped>
.container {
  padding: 40px;
}
</style>
