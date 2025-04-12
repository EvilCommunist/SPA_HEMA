export const devLogic = {
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
      accessGranted: false,
      showLoginForm: true,
      username: '',
      password: '',
      loginError: '',
      showAdminPanel: true,
      showContent: false
    };
  },
  computed: {
    filteredProducts() { // Фильтрация товаров
      if (!this.category) return this.products;
      return this.products.filter((product) => product.cathegory === this.category);
    },
  },
  methods: {
    openEditView(product) {
      this.$router.push({ name: 'edit', params: { id: product.id } });
    },
    addNewProduct() {
      this.$router.push('/create');
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
        const response = await fetch('/get_goods.php');
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
        const response = await fetch('/get_goods.php');
        const data = await response.json();
        this.products = data.inventory;
      } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
      } finally {
        this.loading = false;
      }
    },
    async checkAccess() {
      try {
          const response = await fetch('/api/check_admin.php');
          const data = await response.json();
          this.accessGranted = data.isAdmin;
          return data.isAdmin;
      } catch (error) {
          console.error('Ошибка проверки сессии:', error);
          return false;
      }
    },
    async login() {
        try {
            const response = await fetch('/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `username=${encodeURIComponent(this.username)}&password=${encodeURIComponent(this.password)}`
            });
            const data = await response.json();
            
            if (data.success) {
                this.accessGranted = true;
                this.showLoginForm = false;
                this.loginError = '';
            } else {
                this.loginError = data.message || 'Ошибка авторизации';
            }
        } catch (error) {
            this.loginError = 'Ошибка соединения';
            console.error('Ошибка входа:', error);
        }
    },
    async logout() {
        try {
            await fetch('/logout.php');
            this.accessGranted = false;
            this.showLoginForm = true;
            this.$router.push('/');
        } catch (error) {
            console.error('Ошибка выхода:', error);
        }
    },
  },
  async created() {
    await this.checkAccess();
    if (this.accessGranted) {
      await this.fetchProducts();
      const category = this.$route.query.category;
      if (category) {
        this.setCategory(category);
      }
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