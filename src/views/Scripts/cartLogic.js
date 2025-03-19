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
    /*(itemCountStyle() {
      return (quantity) => {
        return {
          paddingRight: quantity >= 10 ? '32px' : '28px',
        };
      };
    },*/
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
    async checkout() {
      try {
        const cartItemIds = this.cartItems.map(item => item.id);
    
        const orderData = {
          ...this.formData,
          cartItems: cartItemIds, 
        };
    
        console.log("Order data:", orderData); // Отладочный вывод
    
        const response = await fetch('/process_form.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });
    
        const responseText = await response.text();
        console.log("Response from server:", responseText);
    
        if (!response.ok) {
          throw new Error('Ошибка при отправке данных');
        }
    
        const result = JSON.parse(responseText);
        if (result.success) {
          alert(`Заказ оформлен! Способ оплаты: ${this.formData.paymentMethod}`);
          this.clearCart();
          this.formData = {
            fullName: '',
            phone: '',
            address: '',
            comment: '',
            paymentMethod: 'cash',
          };
        } else {
          throw new Error(result.message || 'Ошибка при обработке заказа');
        }
      } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте ещё раз.');
      }
    },
  },
};