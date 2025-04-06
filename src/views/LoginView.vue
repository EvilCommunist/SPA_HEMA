<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    close() {
      window.location.href = '/';
    },
    submit() {
      // Здесь будет логика входа
      console.log('Login attempt with:', this.email, this.password);
      this.close();
    }
  }
}
</script>

<template>
  <div id="form" class="container flex">
      <form @submit.prevent="submit">
        <div class="auth">
          <label>Email (логин)</label><br>
          <input type="email" v-model="email" required>
        </div>
        <div class="auth">
          <label>Пароль</label><br>
          <input type="password" v-model="password" required>
        </div>
        <button type="submit">Войти</button>
      </form>
  </div>
</template>

<style scoped lang="less">
@import "./Styles/formStyles.less";
</style>