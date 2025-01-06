<script>
export default {
name: 'MainBody'
}
</script>


<template>
  <!--Компонент, в котором происходит смена основного содержимого сайта-->
    <section id="page">
      <router-view></router-view>
    </section>
</template>


<style scoped lang="less">
@import "./Styles/adaptive styles.css";
</style>