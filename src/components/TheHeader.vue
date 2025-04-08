<script>
import { headerLogic } from './Scripts/HeaderLogic';
export default {
  name: 'TheHeader',
  ...headerLogic
}
</script>

<template>
    <div>
      <!-- Mobile menu -->
      <div id="alt-menu">
        <button id="close_cross">
          <img id="close_cross_img" src="./Assets/close-cross.png" alt="Close menu">
        </button>
        <nav class="container flex">
          <a @click="handleCatalogNavigation" class="decor">Каталог</a>
          <br>
          <router-link to="/" class="decor">О нас</router-link>
          <br>
          <router-link to="/howToOrder" class="decor">Как заказать</router-link>
          <div class="cartholder">
            <span id="cart_counter_phone">
              {{ totalItems }} товаров<br>
              <span id="price_counter_phone">{{ totalPrice }} рублей</span>
            </span>
            <button id="cart_phone">
              <router-link to="/cart">
                <img src="./Assets/cart.png" alt="Cart" id="cart_img_phone">
              </router-link>
            </button>
          </div>
        </nav>
      </div>

      <!-- Main header -->
      <header class="container flex">
        <div class="logosection">
          <router-link to="/">
            <img src="./Assets/goldgrif.png" alt="Logo" class="logo">
          </router-link>
          <router-link to="/">
            <h2 id="logo-name">Золотой<br>грифон</h2>
          </router-link>
        </div>

        <nav>
          <ul>
            <li><a @click="handleCatalogNavigation" class="decor">Каталог</a></li>
            <li><router-link to="/" class="decor">О нас</router-link></li>
            <li><router-link to="/howToOrder" class="decor">Как заказать</router-link></li>
          </ul>
        </nav>

        <div id="cart_and_prof">
          <div class="cartholder">
            <span id="cart_counter">
              {{ totalItems }} товаров<br>
              <span id="price_counter">{{ totalPrice }} рублей</span>
            </span>
            <button id="cart">
              <router-link to="/cart">
                <img src="./Assets/cart.png" alt="Cart" id="cart_img">
              </router-link>
            </button>
          </div>

          <div class="profile" @click.stop="toggleProfileMenu">
            <img src="./Assets/profile-svgrepo-com.svg" alt="Profile" id="prof_pic">
            <div v-if="showProfileDropdown" class="profile-dropdown">
              <router-link 
                to="/login" 
                class="dropdown-item" 
                @click="closeProfileMenu"
              >
                Войти
              </router-link>
              <router-link 
                to="/auth" 
                class="dropdown-item" 
                @click="closeProfileMenu"
              >
                Зарегистрироваться
              </router-link>
            </div>
          </div>
        </div>

        <img src="./Assets/burger-menu.png" alt="Menu" id="bur-menu">
      </header>
    </div>
</template>

<style scoped lang="less">
@import "./Styles/adaptive styles.css";
@import "./Styles/main styles.less";
</style>