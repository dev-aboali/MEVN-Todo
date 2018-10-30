<template>
  <div id="app">
    <app-header></app-header>
    <home></home>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Home from './components/Home.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'app',
  components: {
    Home,
    AppHeader: Header,
    AppFooter: Footer,
  },
};
</script>

<style lang="scss">
@import '../node_modules/animate.css/animate.min.css';


</style>
