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
    async submit() {
      try {
        if (!this.validateName(this.name)) {
          alert('ФИО введено некорректно!');
          return;
        }
        if (!this.validatePhone(this.phone)) {
          alert('ФИО введено некорректно!');
          return;
        }
        const response = await fetch('/process_reg.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            phone: this.phone,
            password: this.password,
            confirmPassword: this.confirmPassword
          })
        });  
        const data = await response.json();
        if (data.success) {
          alert('Регистрация успешна!');
          this.$router.push('/login');
        } else {
          if (data.errors) {
            for (const error in data.errors) {
              alert(data.errors[error]);
            }
          } else {
            alert(data.message || 'Ошибка регистрации');
          }
        }
      } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при регистрации');
      }
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