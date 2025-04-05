export const addProductLogic = {
    data() {
      return {
        product: {
          id: 0,
          name: '',
          description: '',
          cathegory: '',
          price: 0,
          remain: 0,
          characteristics: [],
          main_pic: '',
          alt_pics: []
        },
        loading: false,
        currentImageIndex: 0,
        newImages: [],
        tempImages: []
      };
    },
    computed: {
      currentImage() {
        return this.tempImages[this.currentImageIndex] || '';
      }
    },
    methods: {
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
            this.tempImages = [...this.tempImages, e.target.result];
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
      async saveProduct() {
        try {
          console.log('Новый товар:', this.product);
          this.$router.go(-1);
        } catch (error) {
          console.error('Ошибка сохранения:', error);
        }
      },
      cancelEditing() {
        this.$router.go(-1);
      }
    }
  };