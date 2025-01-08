<script>
export default {
  name: 'StoreView',
  data() {
    return {
      products: [],
      category: '',
      leftText: 'Каталог', 
      rightText: 'Каталог',
      loading: true,
      currentSection: 'Все товары', 
      currentSubSection: 'Каталог',
    };
  },
  computed: {
    filteredProducts() { // Фильтрация товаров по категории
      if (!this.category) return this.products;
      return this.products.filter((product) => product.cathegory === this.category);
    },
  },
  methods: {
    setCategory(category) {
      this.category = category;
      const displayText = category.includes('комплекты') ? category.replace('комплекты', '').trim() : category;
      this.leftText = displayText;
      this.rightText = displayText;
      this.currentSection = category;
      this.currentSubSection = `Каталог > ${category}`;
    },
    resetCategory() {
      this.category = '';
      this.leftText = 'Каталог';
      this.rightText = 'Каталог';
      this.currentSection = 'Все товары';
      this.currentSubSection = 'Каталог';
    },
    addToCart(product) {// Добавление в корзину
      
    },
    async fetchProducts() { // Загрузка товаров с файла
      try {
        const response = await fetch('./goods.json');
        const data = await response.json();
        console.log(data);
        this.products = data.inventory;
      } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>


<template>
  <main>
    <section id="store">
      <div class="vertical-text top decor">{{ leftText }}</div>
      <div class="vertical-text bottom decor">{{ rightText }}</div>
      <div class="container flex">
        <aside id="menu">
          <span id="nameSection" @click.prevent="resetCategory">Каталог</span>
          <hr>
          <ul>
            <li>
              <span id="sub_section">Защита</span>
              <ul>
                <li><a href="#" @click.prevent="setCategory('Защита головы')">Защита головы</a></li>
                <li><a href="#" @click.prevent="setCategory('Защита тела')">Защита тела</a></li>
                <li><a href="#" @click.prevent="setCategory('Защита рук')">Защита рук</a></li>
                <li><a href="#" @click.prevent="setCategory('Защита ног')">Защита ног</a></li>
              </ul>
            </li>
            <hr>
            <li>
              <span id="sub_section">Оружие</span>
              <ul>
                <li><a href="#" @click.prevent="setCategory('Древковое')">Древковое</a></li>
                <li><a href="#" @click.prevent="setCategory('Колющее')">Колющее</a></li>
                <li><a href="#" @click.prevent="setCategory('Режущее оружие')">Режущее оружие</a></li>
                <li><a href="#" @click.prevent="setCategory('Луки')">Луки</a></li>
                <li><a href="#" @click.prevent="setCategory('Тренировочное')">Тренировочное</a></li>
              </ul>
            </li>
            <hr>
            <li>
              <span id="sub_section">Комплекты</span>
              <ul>
                <li><a href="#" @click.prevent="setCategory('Русские комплекты')">Русские комплекты</a></li>
                <li><a href="#" @click.prevent="setCategory('Азиатские комплекты')">Азиатские комплекты</a></li>
                <li><a href="#" @click.prevent="setCategory('Европейские комплекты')">Европейские комплекты</a></li>
                <li><a href="#" @click.prevent="setCategory('Арабские комплекты')">Арабские комплекты</a></li>
              </ul>
            </li>
          </ul>
        </aside>
        <section>
          <div v-if="loading">Загрузка...</div>
          <div v-else id="catalog">
            <section id="current_section">
              <span id="cur">{{ currentSection }}</span><br>
              <span id="cur_sub">{{ currentSubSection }}</span>
            </section>
            <div v-for="product in filteredProducts" :key="product.id" class="product">
              <img :src="product.main_pic" :alt="product.name" />
              <p>{{ product.name }}</p>
              <span class="descript">{{ product.description }}</span>
              <div class="prod_bottom">
              Цена: {{ product.price }} руб.
              <button @click="addToCart(product)">В корзину</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>

<style scoped lang="less">
@import "./Styles/storeStyle.less";
</style>