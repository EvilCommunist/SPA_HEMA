export const changeLogic = {
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        product: null,
        loading: true,
        error: null,
        currentImageIndex: 0,
        newImages: [],
        tempImages: []
      };
    },
    computed: {
      allImages() {
        if (!this.product) return [];
        return [this.product.main_pic, ...(this.product.alt_pics || []).filter(img => img)];
      },
      currentImage() {
        return this.allImages[this.currentImageIndex] || '';
      },
      displayCategory() {
        if (!this.product) return '';
        return this.product.cathegory?.replace('комплекты', '').trim() || '';
      }
    },
    methods: {
      async fetchProduct() {
        try {
          const response = await fetch('/goods.json');
          if (!response.ok) throw new Error('Ошибка при загрузке данных');
          
          const data = await response.json();
          const product = data.inventory.find(p => p.id === parseInt(this.id));
          
          if (!product) {
            this.error = 'Товар не найден';
            return;
          }
  
          this.product = JSON.parse(JSON.stringify(product));
          this.tempImages = [...this.allImages];
        } catch (error) {
          this.error = 'Ошибка при загрузке данных';
          console.error('Ошибка:', error);
        } finally {
          this.loading = false;
        }
      },
      changeImage(index) {
        this.currentImageIndex = index;
      },
      handleImageUpload(event) {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.newImages.push(e.target.result);
            if (this.currentImageIndex === 0) {
              this.product.main_pic = e.target.result;
            } else {
              if (!this.product.alt_pics) this.product.alt_pics = [];
              this.product.alt_pics[this.currentImageIndex - 1] = e.target.result;
            }
          };
          reader.readAsDataURL(files[i]);
        }
      },
      removeImage(index) {
        if (index === 0) {
          this.product.main_pic = '';
        } else {
          this.product.alt_pics.splice(index - 1, 1);
        }
        this.tempImages.splice(index, 1);
        if (this.currentImageIndex >= this.tempImages.length) {
          this.currentImageIndex = Math.max(0, this.tempImages.length - 1);
        }
      },
      addCharacteristic() {
        if (!this.product.characteristics) this.product.characteristics = [];
        this.product.characteristics.push('');
      },
      removeCharacteristic(index) {
        this.product.characteristics.splice(index, 1);
      },
      async saveChanges() {
        try {
          // Здесь должна быть логика сохранения
          console.log('Сохранение товара:', this.product);
          this.$router.go(-1); // Возвращаемся назад после сохранения
        } catch (error) {
          console.error('Ошибка сохранения:', error);
        }
      },
      cancelEditing() {
        this.$router.go(-1);
      }
    },
    created() {
      this.fetchProduct();
    }
  };