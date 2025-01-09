export const storeLogic = {
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
      };
    },
    computed: {
      filteredProducts() {
        if (!this.category) return this.products;
        return this.products.filter((product) => product.cathegory === this.category);
      },
    },
    methods: {
      setCategory(category) { // Установка фильтров (по категории)
        this.category = category;
        const displayText = category.includes('комплекты') ? category.replace('комплекты', '').trim() : category;
        this.leftText = displayText;
        this.rightText = displayText;
        this.currentSection = category;
        this.currentSubSection = `Каталог > ${category}`;
        this.isMenuVisible = false;
      },
      resetCategory() { // Сброс фильтров
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
      addToCart(product) {
        this.$store.dispatch('addToCart', product);
      },
      openProduct(product) {
        this.$router.push({
          name: 'ProdCard',
          params: {
            id: product.id,
          },
        });
      },
      async fetchProducts() { // Считывание информации об ассортименте с файла
        try {
          const response = await fetch('./goods.json');
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