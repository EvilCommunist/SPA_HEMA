<script>
export default {
  name: 'StoreView',
  props: {
    password: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      products: [],
      category: '',
      leftText: 'Каталог', 
      rightText: 'Каталог',
      loading: true,
      currentSection: 'Все товары', 
      currentSubSection: 'Каталог',
      isMenuVisible: false, 
      isMobile: window.innerWidth < 600,
      correctPassword: import.meta.env.VITE_DEV_PASSWORD, // Пароль для режима администрирования
      accessGranted: false,
      showContent: false, showAdminPanel: true,
    };
  },
  computed: {
    filteredProducts() { // Фильтрация товаров по категории
      if (!this.category) return this.products;
      return this.products.filter((product) => product.cathegory === this.category);
    },
  },
  methods: {
    checkAccess() {
      return this.password === String(this.correctPassword);
    },
    setCategory(category) {
      this.category = category;
      const displayText = category.includes('комплекты') ? category.replace('комплекты', '').trim() : category;
      this.leftText = displayText;
      this.rightText = displayText;
      this.currentSection = category;
      this.currentSubSection = `Каталог > ${category}`;
      this.isMenuVisible = false;
    },
    resetCategory() {
      this.category = '';
      this.leftText = 'Каталог';
      this.rightText = 'Каталог';
      this.currentSection = 'Все товары';
      this.currentSubSection = 'Каталог';
      this.isMenuVisible = false;
    },
    toggleMenu() {
      if (this.isMobile) { 
        this.isMenuVisible = !this.isMenuVisible;
      }
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 770;
    },
    addToCart(product) {// Добавление в корзину
      
    },
    openProduct(product) {
      this.$router.push({
      name: 'ProdCard',
      params: {
        id: product.id,
      },
    });
    },
    increaseQuantity(product) {
        product.remain += 1;
        this.updateProductInJson(product);
    },
    decreaseQuantity(product) {
        if (product.remain > 0) {
        product.remain -= 1;
        this.updateProductInJson(product);
        }
    },
    async updateProductInJson(product) {
        try {
        const response = await fetch('/goods.json');
        const data = await response.json();
        const updatedInventory = data.inventory.map((p) =>
            p.id === product.id ? { ...p, remain: product.remain } : p
        );
        data.inventory = updatedInventory;
        console.log('Товар обновлен:', product);
        } catch (error) {
        console.error('Ошибка при обновлении товара:', error);
        }
    },
    async fetchProducts() { // Загрузка товаров с файла
      try {
        const response = await fetch('/goods.json');
        const data = await response.json();
        this.products = data.inventory;
      } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
      } finally {
        this.loading = false;
      }
    },
  },
  async created() {
    await this.fetchProducts();
    const category = this.$route.query.category;
    if (category) {
      this.setCategory(category);
    }
  },
  mounted() {
    this.fetchProducts();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>


<template>
  <main>
<div v-if="showAdminPanel">
    <div v-if="!checkAccess()">
    <!-- Контент для администрирования -->
    <h1>В доступе отказано!</h1>
  </div>
  <div v-else>
    <h1>Добро пожаловать в admin секцию!</h1>
    <p>Это страница для администрирования магазина.</p>
    <button @click="showContent = true; showAdminPanel=false">Начать</button>
  </div>
</div>
<div v-if="showContent">
    <section class="store">
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
            <section class="current_section">
              <span class="cur">{{ currentSection }}</span><br>
              <span class="cur_sub" @click="toggleMenu">{{ currentSubSection }}</span>
              <div v-if="isMenuVisible && isMobile" class="dropdown-menu">
                <ul>
                  <li><a href="#" @click.prevent="resetCategory">Весь ассортимент</a></li>
                  <li>
                    <span class="sub_section">Защита</span>
                    <ul>
                      <li><a href="#" @click.prevent="setCategory('Защита головы')">Защита головы</a></li>
                      <li><a href="#" @click.prevent="setCategory('Защита тела')">Защита тела</a></li>
                      <li><a href="#" @click.prevent="setCategory('Защита рук')">Защита рук</a></li>
                      <li><a href="#" @click.prevent="setCategory('Защита ног')">Защита ног</a></li>
                    </ul>
                  </li>
                  <li>
                    <span class="sub_section">Оружие</span>
                    <ul>
                      <li><a href="#" @click.prevent="setCategory('Древковое')">Древковое</a></li>
                      <li><a href="#" @click.prevent="setCategory('Колющее')">Колющее</a></li>
                      <li><a href="#" @click.prevent="setCategory('Режущее оружие')">Режущее оружие</a></li>
                      <li><a href="#" @click.prevent="setCategory('Луки')">Луки</a></li>
                      <li><a href="#" @click.prevent="setCategory('Тренировочное')">Тренировочное</a></li>
                    </ul>
                  </li>
                  <li>
                    <span class="sub_section">Комплекты</span>
                    <ul>
                      <li><a href="#" @click.prevent="setCategory('Русские комплекты')">Русские комплекты</a></li>
                      <li><a href="#" @click.prevent="setCategory('Азиатские комплекты')">Азиатские комплекты</a></li>
                      <li><a href="#" @click.prevent="setCategory('Европейские комплекты')">Европейские комплекты</a></li>
                      <li><a href="#" @click.prevent="setCategory('Арабские комплекты')">Арабские комплекты</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </section>
            <div v-for="product in filteredProducts" :key="product.id" class="product">
              <img :src="product.main_pic" :alt="product.name" @click="openProduct(product)" />
              <p>{{ product.name }}</p>
              <span class="descript">{{ product.description }}</span>
              <div class="prod_bottom">
                <button class="plus" @click="increaseQuantity(product)">+</button>
                На складе: {{ product.remain }} шт.
                <button class="minus" @click="decreaseQuantity(product)">-</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
</div>
  </main>
</template>

<style scoped lang="less">
@import "./Styles/adminStyles.less";
</style>