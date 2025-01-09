<template>
    <!--Секция корзины с товарами-->
    <section class="store">
        <div id="cart" class="container flex">
            <section class="current_section">
                <span class="cur">Корзина</span><br>
                <span class="cur_sub">Главная > Корзина</span>
            </section>
            <div v-if="cartItems.length > 0">
        <section id="items">
            <div v-for="item in cartItems" :key="item.id" class="item">
                <img :src="item.main_pic" :alt="item.name"/>
                <div class="item_text">    
                    <p class="item_name">{{ item.name }}</p>
                    <div class="counter">
                        <button @click="decreaseQuantity(item.id)" class="minus">-</button>
                        <span class="item_count">{{ item.quantity }}</span>
                        <button @click="increaseQuantity(item.id)" class="plus">+</button>
                    </div>
                    <p class="item_price">{{ item.price * item.quantity }} руб.</p>
                </div>
            </div>
        </section>
            <hr>
        <section id="order">
            <section id="fomsection">
                <span id="finishing">Оформление заказа</span>
                
            </section>
            <section id="paysection">
                <p>Общая стоимость: {{ totalPrice }} руб.</p>
                <button @click="checkout">Оформить заказ</button>
            </section>
        </section>
    </div>
        <div v-else>
            <p>Корзина пуста</p>
        </div>
        </div>
    </section>
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
  
<style scoped lang="less">
@import "./Styles/cartStyles.less";
</style>