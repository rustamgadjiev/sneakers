<script setup>
import FilterBlock from './FilterBlock.vue'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { onMounted, computed, reactive } from 'vue'
import CardItem from './CardItem.vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const route = useRoute()

const cart = useCartStore()

const data = reactive({
  products: [],
})

const handleSearchInput = debounce(function (event) {
  router.push({
    query: {
      searchQuery: event.target.value || route.query.searchQuery,
      sortBy: route.query.sortBy || 'title',
    },
  })
}, 300)

function handleSort(event) {
  router.push({
    query: {
      searchQuery: route.query.searchQuery || '',
      sortBy: event.target.value || route.query.sortBy,
    },
  })
}

async function fetchData() {
  try {
    await axios
      .get(`https://cc39b2aed454e8a8.mokky.dev/items`)
      .then((resp) => (data.products = resp.data))

    await axios.get('https://cc39b2aed454e8a8.mokky.dev/cart').then((resp) => {
      cart.changeTotalPrice(resp.data.reduce((ac, currentItem) => ac + currentItem.price, 0))
      cart.changeCartProducts(resp.data)
    })
  } catch (error) {
    console.error(error)
  }
}

const products = computed(function () {
  return data.products
    .filter(function (item) {
      return item.title.toLowerCase().includes((route.query.searchQuery || '').toLowerCase())
    })
    .sort(function (a, b) {
      if ((route.query.sortBy || 'title') === 'title') {
        return a.title.localeCompare(b.title)
      }
      if ((route.query.sortBy || 'title') === 'price') {
        return a.price - b.price
      }

      return b.price - a.price
    })
})

onMounted(fetchData)
</script>

<template>
  <section class="card-item-list">
    <header class="card-item-list__header">
      <h1>Все кроссовки</h1>
      <FilterBlock @handleSearchInput="handleSearchInput" @handleSort="handleSort" />
    </header>
    <div class="card-items" v-auto-animate>
      <CardItem v-for="product in products" :key="product.id" :item="product" />
    </div>
  </section>
</template>

<style scoped>
h1 {
  font-size: 30px;
}
.card-item-list__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
}
.card-items {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
</style>
