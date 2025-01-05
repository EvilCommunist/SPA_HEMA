<script>
export default {
name: 'TheFooter'
}
</script>


<template>
    <footer class="container flex">
      <span id="copyright_bigscreen">Золотой Грифон &copy; Все права защищены</span>
      <div class="mediaholder">
        <img src="./Assets/whatsapp.png" alt="whatsapp" class="media">
        <img src="./Assets/telegram.png" alt="telegram" class="media">
        <img src="./Assets/VK.png" alt="VK" class="media">
      </div>
      <span id="copyright_smallscreen">Золотой Грифон &copy; Все права защищены</span>
    </footer>
</template>


<style scoped lang="less">
@import "./Styles/adaptive styles.css";
@import "./Styles/main styles.less";
</style>