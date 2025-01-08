
<script>
export default {
  name: 'ProdCard',
  props: {
    id: {
      type: String, // Или Number, если id — число
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    productName: {
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
    // Все изображения для слайдера (основное + альтернативные)
    allImages() {
      return [this.product.main_pic, ...this.product.alt_pics.filter((img) => img)];
    },
    // Текущее изображение для слайдера
    currentImage() {
      return this.allImages[this.currentImageIndex];
    },
  },
  methods: {
    prevImage() {
      this.currentImageIndex =
        (this.currentImageIndex - 1 + this.allImages.length) % this.allImages.length;
    },
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.allImages.length;
    },
    addToCart() {
      this.$emit('add-to-cart', this.product);
    },
    goBackToCategory() {
      // Возврат к категории
      this.$router.push({ path: '/', query: { category: this.category } });
    },
    async fetchProduct() {
      try {
        // Загружаем данные из goods.json
        const response = await fetch('/goods.json'); // Убедитесь, что путь к файлу правильный
        const data = await response.json();

        // Ищем товар по id
        const product = data.inventory.find((p) => p.id === parseInt(this.id));

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
  },
  created() {
    this.fetchProduct();
  },
};
</script>


<template>
  <!--Вид карточки товара-->
  <div class="store">
    <div class="vertical-text top decor">Placeholder</div>
    <div class="vertical-text bottom decor">Placeholder</div>
    <div class="container flex">
      <!--Блоки с иерархией нахождения товара-->
      <span id="cur">
        {{ productName }}
      </span>
      <span id="cur_sub">
        Каталог > {{ category }} > {{ productName }}
      </span>
      <div v-if="product">
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
      <div v-else-if="loading">
        <p>Загрузка...</p>
      </div>
      <div v-else>
        <p>Товар не найден.</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "./Styles/storeStyle.less";
@import "./Styles/cardStyle.less";
</style>