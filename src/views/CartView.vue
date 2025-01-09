<template>
    <!--Секция корзины с товарами-->
    <section class="store">
        <div id="cart" class="container flex">
            <section class="current_section">
                <span class="cur">Корзина</span><br>
                <span class="cur_sub">Главная > Корзина</span>
            </section>
            <div v-if="cartItems.length > 0" class="make_wider">
        <section id="items">
            <div v-for="item in cartItems" :key="item.id" class="item">
                <img :src="item.main_pic" :alt="item.name"/>
                <div class="item_text">    
                    <p class="item_name">{{ item.name }}</p>
                    <div class="counter">
                        <button @click="decreaseQuantity(item.id)" class="minus">-</button>
                        <span class="item_count">{{ item.quantity }}</span>
                        <button @click="increaseQuantity(item.id)" class="plus">+</button>
                    </div>
                    <p class="item_price">{{ item.price * item.quantity }} руб.</p>
                </div>
            </div>
        </section>
            <hr>
        <section id="order">
            <section id="form_pay_section">
                <section id="formsection">
                    <span id="finishing">Оформление заказа</span>
                    <form @submit.prevent="submitForm" class="order-form">
                        <div class="form-group">
                        <label for="fullName">ФИО<span class="red_star">*</span></label>
                        <input type="text" id="fullName" v-model="formData.fullName" required />
                        <span v-if="errors.fullName" class="error">{{ errors.fullName }}</span>
                        </div>
                        <div class="form-group">
                        <label for="phone">Номер телефона<span class="red_star">*</span></label>
                        <input type="tel" id="phone" v-model="formData.phone" required />
                        <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
                        </div>
                        <div class="form-group">
                        <label for="address">Адрес доставки<span class="red_star">*</span></label>
                        <input type="text" id="address" v-model="formData.address" required />
                        <span v-if="errors.address" class="error">{{ errors.address }}</span>
                        </div>
                        <div class="form-group">
                        <label for="comment">Комментарий к заказу</label>
                        <textarea id="comment" v-model="formData.comment"></textarea>
                        </div>
                    </form>
                </section>
                <section id="paysection">
                    <div class="pay_info"><p>Итоговая стоимость заказа:</p> <p>{{ totalPrice }} руб.</p></div>
                    <div class="pay_info">
                        <p>Способ оплаты:</p>
                        <select v-model="formData.paymentMethod" required>
                        <option value="cash">Наличными при получении</option>
                        <option value="card">Онлайн-оплата картой</option>
                        <option value="bankTransfer">Банковский перевод</option>
                        <option value="SBP">СБП</option>
                        </select>
                    </div>
                    <button @click="submitForm">Оформить заказ</button>
                    <p id="alert">*После оформления заказа с вами свяжется менеджер</p>
                </section>
            </section>
        </section>
    </div>
        <div v-else>
            <p>Корзина пуста</p>
        </div>
        </div>
    </section>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
export default {
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
    submitForm() {
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
    checkout() {
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
</script>
  
<style scoped lang="less">
@import "./Styles/cartStyles.less";
</style>