<script>
import { RouterView } from "vue-router";
import Headers from "./components/Header/Header.vue";
import Footer from "./components/Footer/Footer.vue";

//注册页面
export default {
  components: { Headers, Footer, RouterView },
};
</script>

<template>
  <div>
    <div class="container">
      <div class="header">
        <Headers />
      </div>
      <div class="main"><router-view /></div>

      <div class="footer"><Footer /></div>
    </div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
  </div>
</template>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .main {
    flex: 1;
  }

  max-width: 100%;
  min-width: 1200px;
}
</style>
