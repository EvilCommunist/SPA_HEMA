export const addProductLogic = {
  data() {
    return {
      product: {
        name: '',
        description: '',
        cathegory: '',
        price: 0,
        remain: 0,
        characteristics: [],
        main_pic: null, 
        alt_pics: []
      },
      tempImages: [],
      currentImageIndex: 0,
      loading: false
    };
  },
  computed: {
    currentImage() {
      if (this.tempImages.length === 0) return '';
      return this.tempImages[this.currentImageIndex] || '';
    }
  },
  methods: {
    changeImage(index) {
      this.currentImageIndex = index;
    },
    handleImageUpload(event) {
      const files = Array.from(event.target.files);
      if (files.length > 0) { // Первое изображение - основное
        this.product.main_pic = files[0];
        this.readAndAddImage(files[0]);
        
        if (files.length > 1) {
          this.product.alt_pics = files.slice(1);
          files.slice(1).forEach(file => this.readAndAddImage(file));
        }
      }
      event.target.value = '';
    },
    readAndAddImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.tempImages.push(e.target.result);
      };
      reader.readAsDataURL(file);
    },
    removeImage(index) {
      if (index === 0) {
        this.product.main_pic = null;
      } else {
        this.product.alt_pics.splice(index - 1, 1);
      }
      this.tempImages.splice(index, 1);
      this.currentImageIndex = Math.max(0, this.currentImageIndex - 1);
    },
    addCharacteristic() {
      this.product.characteristics.push('');
    },
    removeCharacteristic(index) {
      this.product.characteristics.splice(index, 1);
    },
    async saveProduct() {
      this.loading = true;
      try {
        const formData = new FormData();
        formData.append('name', this.product.name);
        formData.append('description', this.product.description);
        formData.append('cathegory', this.product.cathegory);
        formData.append('price', this.product.price);
        formData.append('remain', this.product.remain);
        this.product.characteristics.forEach((char, index) => {
          formData.append(`characteristics[${index}]`, char);
        });
        if (this.product.main_pic) {
          formData.append('main_pic', this.product.main_pic);
        }
        this.product.alt_pics.forEach((pic, index) => {
          formData.append(`alt_pics[${index}]`, pic);
        });
        const response = await fetch('/process_creation.php', {
          method: 'POST',
          body: formData
        });
        const result = await response.json();
        if (result.success) {
          alert('Товар успешно добавлен!');
          this.$router.go(-1);
        } else {
          alert(result.message || 'Ошибка при сохранении товара');
          if (result.errors) {
            console.error('Ошибки валидации:', result.errors);
          }
        }
      } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке данных');
      } finally {
        this.loading = false;
      }
    },
    cancelEditing() {
      this.$router.go(-1);
    }
  }
};