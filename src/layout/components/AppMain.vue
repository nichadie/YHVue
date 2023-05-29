<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- <router-view :key="key" /> -->
      <!-- <keep-alive :include="cachedViews"> -->
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  padding: 10px;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 90px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
