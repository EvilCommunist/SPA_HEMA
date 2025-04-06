<template>
  <div class="auth-form">
    <button class="close-btn" @click="close">×</button>
    <h2>Регистрация</h2>
    <form @submit.prevent="submit">
      <div class="form-group">
        <label>Имя</label>
        <input type="text" v-model="name" required>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label>Пароль</label>
        <input type="password" v-model="password" required>
      </div>
      <div class="form-group">
        <label>Подтвердите пароль</label>
        <input type="password" v-model="confirmPassword" required>
      </div>
      <button type="submit" class="submit-btn">Зарегистрироваться</button>
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

<style scoped>
/* Стили такие же как у LoginForm.vue */
.auth-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.auth-form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  position: relative;
}

.close-btn {
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.submit-btn {
  width: 100%;
  padding: 10px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background: #369f6b;
}
</style>