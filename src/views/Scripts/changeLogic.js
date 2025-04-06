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
      tempImages: [],
      saving: false
    };
  },
  computed: {
    allImages() {
      if (!this.product) return [];
      return [this.product.main_pic, ...(this.product.alt_pics || []).filter(img => img)];
    },
    currentImage() {
      if (this.tempImages.length === 0) return '';
      return this.tempImages[this.currentImageIndex] || '';
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
      const files = Array.from(event.target.files);
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newImages.push(file);
          this.tempImages.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
      event.target.value = '';
    },
    removeImage(index) {
      if (index === 0) {
        this.product.main_pic = '';
      } else {
        this.product.alt_pics.splice(index - 1, 1);
      }
      this.tempImages.splice(index, 1);
      this.currentImageIndex = Math.max(0, this.currentImageIndex - 1);
    },
    addCharacteristic() {
      if (!this.product.characteristics) this.product.characteristics = [];
      this.product.characteristics.push('');
    },
    removeCharacteristic(index) {
      this.product.characteristics.splice(index, 1);
    },
    async saveChanges() {
      this.saving = true;
      try {
        const formData = new FormData();
        formData.append('id', this.id);
        formData.append('name', this.product.name);
        formData.append('description', this.product.description);
        formData.append('cathegory', this.product.cathegory);
        formData.append('price', this.product.price);
        formData.append('remain', this.product.remain);
        
        this.product.characteristics.forEach((char, index) => {
          formData.append(`characteristics[${index}]`, char);
        });
        this.newImages.forEach((file, index) => {
          formData.append(`new_images[${index}]`, file);
        });
        formData.append('existing_main_pic', this.product.main_pic);
        this.product.alt_pics.forEach((pic, index) => {
          formData.append(`existing_alt_pics[${index}]`, pic);
        });

        const response = await fetch('/process_upd.php', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();
        if (result.success) {
          alert('Изменения успешно сохранены!');
          this.$router.go(-1);
        } else {
          alert(result.message || 'Ошибка при сохранении изменений');
          if (result.errors) {
            console.error('Ошибки валидации:', result.errors);
          }
        }
      } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке данных');
      } finally {
        this.saving = false;
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