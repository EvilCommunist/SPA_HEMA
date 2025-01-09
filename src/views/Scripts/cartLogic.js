import { mapGetters, mapActions } from 'vuex';

export const cartLogic = {
  data() {
    return {
      formData: {
        fullName: '',
        phone: '',
        address: '',
        comment: '',
        paymentMethod: 'cash',
      },
      errors: {
        fullName: '',
        phone: '',
        address: '',
      },
    };
  },
  computed: {
    ...mapGetters(['cartItems', 'totalPrice']),
  },
  methods: {
    ...mapActions(['removeFromCart', 'increaseQuantity', 'decreaseQuantity', 'clearCart']),
    submitForm() { // Валидация формы заказа
      this.errors = {
        fullName: '',
        phone: '',
        address: '',
      };
      let isValid = true;
      if (!this.formData.fullName.trim()) {
        this.errors.fullName = 'Поле ФИО обязательно для заполнения';
        isValid = false;
      } else if (!/^[\p{L}\s]+$/u.test(this.formData.fullName)) {
        this.errors.fullName = 'ФИО может содержать только буквы и пробелы';
        isValid = false;
      }
      const phoneRegex = /^\+?[0-9]{10,15}$/;
      if (!this.formData.phone.trim()) {
        this.errors.phone = 'Поле номера телефона обязательно для заполнения';
        isValid = false;
      } else if (!phoneRegex.test(this.formData.phone)) {
        this.errors.phone = 'Некорректный номер телефона';
        isValid = false;
      }
      if (!this.formData.address.trim()) {
        this.errors.address = 'Поле адреса доставки обязательно для заполнения';
        isValid = false;
      }
      if (isValid) {
        this.checkout();
      }
    },
    checkout() { // Эмуляция успешного заказа
      alert(`Заказ оформлен! Способ оплаты: ${this.formData.paymentMethod}`);
      this.clearCart();
      this.formData = {
        fullName: '',
        phone: '',
        address: '',
        comment: '',
        paymentMethod: 'cash',
      };
    },
  },
};