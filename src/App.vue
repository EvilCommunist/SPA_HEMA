<script>
import Header from './components/TheHeader.vue';
import MainContent from './components/MainBody.vue';
import Footer from './components/TheFooter.vue';

export default {
  name: 'App',
  components: {
    Header,
    MainContent,
    Footer
  }
}
</script>

<template>
  <div id="app">
    <Header />
    <MainContent />
    <Footer />
  </div>
</template>

<style scoped>
*{/*Объявление общих стилей*/
    margin: 0; padding: 0;
    font-family: 'Tahoma';
}
h1, h2, h3, h4, h5, h6, .decor{font-family: 'Cormorant'; font-weight: normal;}
header, nav, section, footer, article, aside{display: block;}
ul {list-style-type: none;}
</style>
