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
    addToCart() {
      // Реализация с корзиной
    },
  },
  created() {
    this.fetchProduct();
  },
};
</script>


<template>
  <div class="store">
    <!-- Проверка на наличие product -->
    <div v-if="product">
      <div class="vertical-text top decor">{{ product.cathegory }}</div>
      <div class="vertical-text bottom decor">{{ product.cathegory }}</div>
      <div class="container flex">
        <!-- Блоки с иерархией нахождения товара -->
        <section class="current_section">
          <span class="cur">
            {{ product.name }}
          </span><br>
          <span class="cur_sub">
            Каталог > {{ product.cathegory }} > {{ product.name }}
          </span>
        </section>
        <div>
          <div class="slider">
            <img :src="currentImage" :alt="product.name" />
            <button @click="prevImage" class="slider-button prev">‹</button>
            <button @click="nextImage" class="slider-button next">›</button>
          </div>
          <span id="prod_name">{{ product.name }}</span>
          <p>{{ product.description }}</p>
          <ul>
            <li v-for="(char, index) in product.characteristics" :key="index">{{ char }}</li>
          </ul>
          <button @click="addToCart">В корзину</button>
        </div>
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