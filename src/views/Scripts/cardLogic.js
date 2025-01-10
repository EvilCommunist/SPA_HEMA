export const cardLogic = {
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
    computed: {// Логика работы слайдера
      allImages() {
        if (!this.product) return [];
        return [this.product.main_pic, ...(this.product.alt_pics || []).filter((img) => img)];
      },
      currentImage() {
        if (!this.product) return '';
        return this.allImages[this.currentImageIndex];
      },
      displayCategory() {
        if (!this.product) return '';
        return this.product.cathegory.replace('комплекты', '').trim();
      },
    },
    methods: {
      async fetchProduct() { // Считывание информации о товаре из файла
        try {
          const response = await fetch('/goods.json');
          if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
          }
          const data = await response.json();
          const product = data.inventory.find((p) => p.id == parseInt(this.id));
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
      changeImage(index) {
        this.currentImageIndex = index;
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