<script>
import { headerLogic } from './Scripts/HeaderLogic';
export default {
  name: 'TheHeader',
  ...headerLogic,
}
</script>


<template>
    <div>
      <!-- Альтернативное навигационное меню для работы на маленьком экране/экране телефона -->
      <div id="alt-menu">
        <button id="close_cross"><img id="close_cross_img" src="./Assets/close-cross.png" alt="close"></button>
        <nav class="container flex">
          <router-link to="/store" class="decor">Каталог</router-link><br><router-link to="/" class="decor">О нас</router-link>
          <br><router-link to="/howToOrder" class="decor">Как заказать</router-link>
          <div class="cartholder">
            <span id="cart_counter_phone">{{ totalItems }} товаров<br><span id="price_counter_phone">{{ totalPrice }} рублей</span></span>
            <button id="cart_phone">
              <router-link to="/cart"><img src="./Assets/cart.png" alt="cart_img" id="cart_img_phone"></router-link>
            </button>
          </div>
        </nav>
      </div>
      <!-- Заголовочник сайта - содержит логотип, навигационное меню и корзину -->
      <header class="container flex">
        <div class="logosection">
          <router-link to="/"><img src="./Assets/goldgrif.png" alt="logo" class="logo"></router-link>
          <router-link to="/"><h2 id="logo-name">Золотой<br>грифон</h2></router-link>
        </div>
        <nav>
          <ul>
            <li><router-link to="/store" class="decor">Каталог</router-link></li>
            <li><router-link to="/" class="decor">О нас</router-link></li>
            <li><router-link to="/howToOrder" class="decor">Как заказать</router-link></li>
          </ul>
        </nav>
        <div class="cartholder">
          <span id="cart_counter">{{ totalItems }} товаров<br><span id="price_counter">{{ totalPrice }} рублей</span></span>
          <button id="cart">
            <router-link to="/cart"><img src="./Assets/cart.png" alt="cart_img" id="cart_img"></router-link>
          </button>
        </div>
        <img src="./Assets/burger-menu.png" alt="menu" id="bur-menu">
      </header>
    </div>
</template>


<style scoped lang="less">
@import "./Styles/adaptive styles.css";
@import "./Styles/main styles.less";
</style>