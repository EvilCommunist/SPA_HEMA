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
        <input type="email" v-model="email" required>
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

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    submit() {
      if (this.password !== this.confirmPassword) {
        alert('Пароли не совпадают!');
        return;
      }
      // Здесь будет логика регистрации
      console.log('Register attempt with:', this.name, this.email, this.password);
      this.close();
    }
  }
}
</script>

<style scoped lang="less">
@import "./Styles/formStyles.less";
</style>