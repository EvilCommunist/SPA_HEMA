<script>
export default {
  name: 'ProdCard',
  props: {
    id: {
      type: String, 
      required: true,
    },
  },
  data() {
    return {
      product: null,
      loading: true,
      error: null,
      currentImageIndex: 0,
      autoSlideInterval: null,
    };
  },
  computed: {
    allImages() {
    if (!this.product) return []; // Возвращаем пустой массив, если product не загружен
    return [this.product.main_pic, ...(this.product.alt_pics || []).filter((img) => img)];
  },
  currentImage() {
    if (!this.product) return ''; // Возвращаем пустую строку, если product не загружен
    return this.allImages[this.currentImageIndex];
  },
  displayCategory() {
    if (!this.product) return '';
    return this.product.cathegory.replace('комплекты', '').trim();
  },
  },
  methods: {
    async fetchProduct() {
      try {
      const response = await fetch('/goods.json');
      if (!response.ok) {
        throw new Error('Ошибка при загрузке данных');
      }
      const data = await response.json();
      const product = data.inventory.find((p) => p.id == parseInt(this.id)); // Поиск товара по идентификатору
      console.log(product);
      if (product) {
        this.product = product;
      } else {
        this.error = 'Товар не найден';
      }
    } catch (error) {
      this.error = 'Ошибка при загрузке данных';
      console.error('Ошибка при загрузке товара:', error);
    } finally {
      this.loading = false;
    }
    },
    prevImage() {
      this.currentImageIndex =
        (this.currentImageIndex - 1 + this.allImages.length) % this.allImages.length;
    },
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.allImages.length;
    },
    addToCart(product) {
      this.$store.dispatch('addToCart', product);
    },
    startAutoSlide() {
      this.autoSlideInterval = setInterval(() => {
        this.nextImage();
      }, 3000); 
    },
    stopAutoSlide() {
      if (this.autoSlideInterval) {
        clearInterval(this.autoSlideInterval);
        this.autoSlideInterval = null;
      }
    },
  },
  created() {
    this.fetchProduct();
  },
  mounted() {
    this.startAutoSlide(); 
  },
  beforeUnmount() {
    this.stopAutoSlide(); 
  },
};
</script>


<template>
  <div class="store">
    <!-- Проверка на наличие product -->
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