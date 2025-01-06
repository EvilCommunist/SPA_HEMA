<script>
export default {
name: 'TheHeader',
mounted() {
    $('#bur-menu').on('click', () => {
      $('#alt-menu').toggle();
      $('#page').hide();
      $('header').hide();
      $('footer').hide();
    });

    $('#close_cross').on('click', () => {
      $('#alt-menu').hide();
      $('#page').toggle();
      $('header').toggle();
      $('footer').toggle();
    });
  },
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
            <span id="cart_counter_phone">Placeholder<br><span id="price_counter_phone">Placeholder</span></span>
            <button id="cart_phone"><img src="./Assets/cart.png" alt="cart_img" id="cart_img_phone"></button>
          </div>
        </nav>
      </div>
      <!-- Заголовочник сайта - содержит логотип, навигационное меню и корзину -->
      <header class="container flex">
        <div class="logosection">
          <img src="./Assets/goldgrif.png" alt="logo" class="logo">
          <h2 id="logo-name">Золотой<br>грифон</h2>
        </div>
        <nav>
          <ul>
            <li><router-link to="/store" class="decor">Каталог</router-link></li>
            <li><router-link to="/" class="decor">О нас</router-link></li>
            <li><router-link to="/howToOrder" class="decor">Как заказать</router-link></li>
          </ul>
        </nav>
        <div class="cartholder">
          <span id="cart_counter">Placeholder<br><span id="price_counter">Placeholder</span></span>
          <button id="cart"><img src="./Assets/cart.png" alt="cart_img" id="cart_img"></button>
        </div>
        <img src="./Assets/burger-menu.png" alt="menu" id="bur-menu">
      </header>
    </div>
</template>


<style scoped lang="less">
@import "./Styles/adaptive styles.css";
@import "./Styles/main styles.less";
</style>