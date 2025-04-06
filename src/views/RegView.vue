<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    close() {
      window.location.href = '/';
    },
    validateName(name) {
      const nameRegex = /^([А-ЯЁа-яёA-Za-z]+(?:-[А-ЯЁа-яёA-Za-z]+)*\s){1,}[А-ЯЁа-яёA-Za-z]+(?:-[А-ЯЁа-яёA-Za-z]+)*$/;
      return nameRegex.test(name);
    },
    validatePhone(phone) {
      const phoneRegex = /^(\+7|8)\d{10}$/;
      return phoneRegex.test(phone);
    },
    submit() {
      if (!this.validateName(this.name)) {
        alert('ФИО введено некорректно!');
        return;
      }
      if (!this.validatePhone(this.phone)) {
        alert('Номер телефона должен соответствовать формату (пример: 89007775544 или +79007775544)');
        return;
      }
      if (this.password !== this.confirmPassword) {
        alert('Пароли не совпадают!');
        return;
      }
      
      // Здесь будет логика регистрации
      console.log('Register attempt with:', this.name, this.email, this.phone, this.password);
      this.close();
    }
  }
}
</script>

<template>
  <div id="form" class="container flex">
    <form @submit.prevent="submit">
      <div class="auth">
        <label>ФИО</label><br>
        <input type="text" v-model="name" required>
      </div>
      <div class="auth">
        <label>Email (логин)</label><br>
        <input type="email" v-model="email" required>
      </div>
      <div class="auth">
        <label>Номер телефона (пример: 89007775544)</label><br>
        <input type="tel" v-model="phone" required>
      </div>
      <div class="auth">
        <label>Пароль</label><br>
        <input type="password" v-model="password" required>
      </div>
      <div class="auth">
        <label>Подтвердите пароль</label><br>
        <input type="password" v-model="confirmPassword" required>
      </div>
      <button type="submit" id="reg">Зарегистрироваться</button>
    </form>
  </div>
</template>

<style scoped lang="less">
@import "./Styles/formStyles.less";
</style>