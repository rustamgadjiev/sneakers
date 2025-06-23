<script setup>
import axios from 'axios'
import { onMounted } from 'vue'
import CartItem from '@/components/CartItem.vue'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()

onMounted(async function () {
  await axios.get('https://cc39b2aed454e8a8.mokky.dev/cart').then((resp) => {
    cart.changeTotalPrice(resp.data.reduce((ac, currentItem) => ac + currentItem.price, 0))
    cart.changeCartProducts(resp.data)
  })
})
</script>

<template>
  <h1>Корзина</h1>

  <h2 v-if="!cart.cartProducts?.length">Корзина пуста</h2>

  <div v-else>
    <div class="items" v-auto-animate>
      <CartItem
        v-for="item in cart.cartProducts"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :image-url="item.imageUrl"
        :price="item.price"
      />
    </div>
    <div class="info">
      <p>
        Итого: <b>{{ cart.totalPrice }} руб.</b>
      </p>
      <button>Заказать</button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 30px;
}
h2 {
  margin-top: 50px;
  margin-bottom: 200px;
  text-align: center;
}
.items {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 50px;
}
.info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 800px;
  margin: 0 auto;
}
button {
  padding: 15px 50px;
  background: rgb(120, 184, 26);
  border-radius: 15px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  transition-duration: 300ms;
}
button:hover {
  box-shadow:
    0 0 #0000,
    0 0 #0000,
    0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}
button:active {
  box-shadow: none;
}
</style>
