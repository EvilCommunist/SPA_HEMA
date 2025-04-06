<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async submit() {
    try {
      const response = await fetch('/process_login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      });
      
      const data = await response.json();
      if (data.success) {
        //localStorage.setItem('authToken', data.token);
        this.$router.push('/');
      } else {
        alert(data.message || 'Ошибка входа');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при входе');
    }
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