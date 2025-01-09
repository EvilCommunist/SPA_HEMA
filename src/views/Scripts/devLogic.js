export const devLogic = {
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
        correctPassword: import.meta.env.VITE_DEV_PASSWORD,
        accessGranted: false,
        showContent: false,
        showAdminPanel: true,
      };
    },
    computed: {
      filteredProducts() { // Фильтрация товаров
        if (!this.category) return this.products;
        return this.products.filter((product) => product.cathegory === this.category);
      },
    },
    methods: {
      checkAccess() { // Проверка доступа
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
      toggleMenu() { // Показ выпадающего меню (для маленьикх экранов)
        if (this.isMobile) {
          this.isMenuVisible = !this.isMenuVisible;
        }
      },
      handleResize() {
        this.isMobile = window.innerWidth <= 770;
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
      async fetchProducts() { // Считывание товаров с файла
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