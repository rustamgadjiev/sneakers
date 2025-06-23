<script setup>
import { useRoute } from 'vue-router'

const emit = defineEmits(['handleSearchInput', 'handleSort'])

const route = useRoute()
</script>

<template>
  <div>
    <label>
      <select :value="route.query.sortBy || 'title'" @change="(event) => emit('handleSort', event)">
        <option value="title">По названию</option>
        <option value="price">По цене (дешевые)</option>
        <option value="-price">По цене (дорогие)</option>
      </select>
      <img src="@/assets/images/icons/arrow.svg" alt="" />
    </label>
    <label>
      <img src="@/assets/images/icons/search.svg" alt="" />
      <input
        :value="route.query.searchQuery || ''"
        type="text"
        placeholder="Поиск..."
        @input="(event) => emit('handleSearchInput', event)"
      />
    </label>
  </div>
</template>

<style scoped>
input {
  outline: none;
  border: 1px solid rgb(226 232 240);
  padding: 8px 16px 8px 44px;
  border-radius: 6px;
  font-size: 16px;
}
input:focus {
  border: 1px solid rgb(151, 156, 161);
}
label {
  position: relative;
}
label img {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 16px;
}
label:nth-child(1) img {
  left: auto;
  right: 16px;
}
div {
  display: flex;
  align-items: center;
  gap: 10px;
}
select {
  outline: none;
  border: 1px solid rgb(226 232 240);
  padding: 8px 44px 8px 16px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  -webkit-appearance: none;
}
</style>
