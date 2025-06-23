<script setup>
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
</script>

<template>
  <header class="header">
    <nav>
      <ul>
        <li>
          <RouterLink to="/">
            <img src="@/assets/images/icons/home.svg" alt="" />
            <b>Главная</b>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/cart">
            <img src="@/assets/images/icons/cart.svg" alt="" />
            <b>{{ cart.totalPrice }} руб.</b>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header {
  padding: 40px 70px;
  border-bottom: 1px solid rgb(226 232 240);
}
a {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgb(107 114 128);
}
a:hover {
  color: rgb(76, 81, 92);
}
img {
  width: 30px;
}
ul {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  width: 100%;
}
</style>
