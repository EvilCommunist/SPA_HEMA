<template>
    <div class="cart">
      <h2>Корзина</h2>
      <div v-if="cartItems.length > 0">
        <ul>
          <li v-for="item in cartItems" :key="item.id">
            {{ item.name }} - {{ item.quantity }} шт. - {{ item.price * item.quantity }} руб.
            <button @click="decreaseQuantity(item.id)">-</button>
            <button @click="increaseQuantity(item.id)">+</button>
            <button @click="removeFromCart(item.id)">Удалить</button>
          </li>
        </ul>
        <p>Общая стоимость: {{ totalPrice }} руб.</p>
        <button @click="checkout">Оформить заказ</button>
      </div>
      <div v-else>
        <p>Корзина пуста</p>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters(['cartItems', 'totalPrice']),
    },
    methods: {
      ...mapActions(['removeFromCart', 'increaseQuantity', 'decreaseQuantity', 'clearCart']),
      checkout() {
        alert('Заказ оформлен!');
        this.clearCart();
      },
    },
  };
  </script>