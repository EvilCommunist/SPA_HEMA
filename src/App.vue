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

<style>
</style>
