import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => {
    return { totalPrice: 0, cartProducts: [] }
  },
  actions: {
    changeTotalPrice(totalPrice) {
      this.totalPrice = totalPrice
    },
    changeCartProducts(products) {
      this.cartProducts = products
    },
  },
})
