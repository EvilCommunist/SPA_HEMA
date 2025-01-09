<script>
export default {
name: 'TheFooter'
}
</script>


<template>
  <!--Подвал сайта-->
    <footer class="container flex">
      <span id="copyright_bigscreen">Золотой Грифон &copy; Все права защищены</span>
      <div class="mediaholder">
        <a href="https://web.whatsapp.com/" target="_blank"><img src="./Assets/whatsapp.png" alt="whatsapp" class="media"></a>
        <a href="https://t.me/s/rgrtu" target="_blank"><img src="./Assets/telegram.png" alt="telegram" class="media"></a>
        <a href="https://vk.com/rgrty?ysclid=m5pjditk8z560423362" target="_blank"><img src="./Assets/VK.png" alt="VK" class="media"></a>
      </div>
      <span id="copyright_smallscreen">Золотой Грифон &copy; Все права защищены</span>
    </footer>
</template>


<style scoped lang="less">
@import "./Styles/adaptive styles.css";
@import "./Styles/main styles.less";
</style>