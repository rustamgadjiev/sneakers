<script setup>
import { useCartStore } from '@/stores/cart'
import axios from 'axios'
import { ref, watch } from 'vue'

const { item } = defineProps({
  item: Object,
})

const cart = useCartStore()

const isClicked = ref(false)

async function addToCart() {
  await axios.post('https://cc39b2aed454e8a8.mokky.dev/cart', { ...item, productId: item.id })

  cart.changeTotalPrice(cart.totalPrice + item.price)
  isClicked.value = true
}

watch(
  function () {
    return cart.cartProducts
  },
  function () {
    isClicked.value = cart.cartProducts.some((product) => product.productId === item.id)
  },
)
</script>

<template>
  <div class="card-item">
    <img class="card-item-image" :src="item.imageUrl" alt="" />
    <h2>{{ item.title }}</h2>
    <div class="price">
      <p>
        <span>Цена:</span>
        {{ item.price }} руб.
      </p>
      <button @click="addToCart" :disabled="isClicked">
        <img v-if="!isClicked" src="@/assets/images/icons/plus.svg" alt="" />
        <img v-else src="@/assets/images/icons/complete.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.card-item {
  cursor: pointer;
  padding: 32px;
  border-radius: 24px;
}
.card-item:hover {
  box-shadow:
    0 0 #0000,
    0 0 #0000,
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}
.card-item h2 {
  font-weight: normal;
  font-size: 18px;
  margin-bottom: 20px;
}
.card-item-image {
  width: 280px;
  height: 280px;
  object-fit: contain;
}
.card-item p {
  display: flex;
  flex-direction: column;
  font-weight: 700;
  gap: 5px;
}
.card-item p span {
  color: rgb(148 163 184);
  font-weight: normal;
}
.card-item .price {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
