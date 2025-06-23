<script setup>
import { useCartStore } from '@/stores/cart'
import axios from 'axios'

const props = defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
})

const cart = useCartStore()

function deleteCartItem() {
  axios.delete(`https://cc39b2aed454e8a8.mokky.dev/cart/${props.id}`)
  cart.changeTotalPrice(cart.totalPrice - props.price)
  cart.changeCartProducts(cart.cartProducts.filter((product) => product.id !== props.id))
}
</script>

<template>
  <div class="cart-item">
    <img :src="imageUrl" alt="" />
    <div>
      <h2>{{ title }}</h2>
      <p><span>Цена: </span> {{ price }} руб.</p>
    </div>
    <button @click="deleteCartItem">
      <img src="@/assets/images/icons/trash.svg" alt="" />
    </button>
  </div>
</template>

<style scoped>
h2 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 500px;
}
.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 800px;
  gap: 10px;
  border-radius: 32px;
  padding: 20px 50px;
  border: 1px solid rgb(226 232 240);
}
.cart-item img {
  width: 100px;
}
.cart-item button img {
  width: 30px;
}
</style>
