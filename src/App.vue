<script>
import { RouterView } from 'vue-router'
import Headers from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'

//注册页面
export default {
  components: { Headers, Footer, RouterView },

}

</script>

<template>
  <Headers />
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view/>
  <Footer />
</template>

<style lang="scss">

</style>
