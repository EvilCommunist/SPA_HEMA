<script>
import { cardLogic } from './Scripts/cardLogic';

export default {
  name: 'ProdCard',
  ...cardLogic,
};
</script>


<template>
  <!--Секция карточки товара-->
  <div class="store">
    <div v-if="product">
      <div class="vertical-text top decor">{{ displayCategory }}</div>
      <div class="vertical-text bottom decor">{{ displayCategory }}</div>
      <div class="container flex">
        <!-- Блоки с иерархией нахождения товара и слайдером -->
      <section id="product_view">
        <section class="current_section">
          <span class="cur">
            {{ product.name }}
          </span><br>
          <span class="cur_sub">
            Каталог > {{ product.cathegory }} > {{ product.name }}
          </span>
        </section>
        <div class="slider">
          <!-- Основное изображение -->
          <div class="main-image">
            <img :src="currentImage" :alt="product.name" />
          </div>
          <!-- Миниатюры -->
          <div class="thumbnails">
            <div
              v-for="(image, index) in allImages"
              :key="index"
              class="thumbnail"
              :class="{ active: currentImageIndex === index }"
              @click="changeImage(index)"
            >
              <img :src="image" :alt="`Thumbnail ${index + 1}`" />
            </div>
          </div>
        </div>
      </section>
      <!-- Блоки с характеристиками и кнопкой добавления в корзину -->
      <section id="character_and_cart">
        <section id="character">
          <span id="cha">Характеристики</span>
          <ul>
            <li v-for="(char, index) in product.characteristics" :key="index"><span class="marker">></span> {{ char }}</li>
          </ul>
        </section>
        <button @click="addToCart(product)">В корзину</button>
      </section>
      </div>
    </div>
    <div v-else-if="loading">
      <p>Загрузка...</p>
    </div>
    <div v-else>
      <p>Товар не найден.</p>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "./Styles/storeStyle.less";
@import "./Styles/cardStyle.less";
</style>