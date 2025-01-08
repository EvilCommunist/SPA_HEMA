<template>
  <div class="product-view">
    <div v-if="product">
      <div class="slider">
        <img :src="currentImage" :alt="product.name" />
        <button @click="prevImage" class="slider-button prev">‹</button>
        <button @click="nextImage" class="slider-button next">›</button>
      </div>
      <h2>{{ product.name }}</h2>
      <p>{{ product.description }}</p>
      <ul>
        <li v-for="(char, index) in product.characteristics" :key="index">{{ char }}</li>
      </ul>
      <button @click="addToCart">В корзину</button>
      <button @click="goBack">Назад</button>
    </div>
    <div v-else-if="loading">
      <p>Загрузка...</p>
    </div>
    <div v-else>
      <p>Товар не найден.</p>
      <button @click="goBack">Назад</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProdCard',
  props: {
    id: {
      type: String, // Или Number, если id — число
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
    currentImage() {
      return this.currentImageIndex === 0
        ? this.product.main_pic
        : this.product.alt_pics[this.currentImageIndex - 1];
    },
  },
  methods: {
    prevImage() {
      if (this.product.alt_pics.length > 0) {
        this.currentImageIndex =
          (this.currentImageIndex - 1 + this.product.alt_pics.length + 1) %
          (this.product.alt_pics.length + 1);
      }
    },
    nextImage() {
      if (this.product.alt_pics.length > 0) {
        this.currentImageIndex = (this.currentImageIndex + 1) % (this.product.alt_pics.length + 1);
      }
    },
    addToCart() {
      this.$emit('add-to-cart', this.product);
    },
    goBack() {
      this.$router.push('/'); // Возврат на главную страницу
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

<style scoped>
.product-view {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.slider {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto 20px;
}

.slider img {
  width: 100%;
  border-radius: 10px;
}

.slider-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 50%;
}

.slider-button.prev {
  left: 10px;
}

.slider-button.next {
  right: 10px;
}

button {
  margin: 5px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>