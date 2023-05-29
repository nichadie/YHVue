<template>
  <div>
    <el-tooltip
      :content="isFullscreen ? '关闭全屏' : '全屏'"
      effect="dark"
      placement="bottom"
    >
      <svg-icon
        :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
        @click="click"
        title="全屏"
      />
    </el-tooltip>
  </div>
</template>

<script>
import screenfull from "screenfull";

export default {
  name: "Screenfull",
  data() {
    return {
      isFullscreen: false,
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    click() {
      if (screenfull.enabled) {
        this.$message({
          message: "您的浏览器不支持全屏显示！",
          type: "warning",
        });
        return false;
      }
      screenfull.toggle();
      this.isFullscreen = !this.isFullscreen;
    },
    change() {
      // this.$message.success("触发点击事件");
      this.isFullscreen = screenfull.isFullscreen;
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on("change", this.change);
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off("change", this.change);
      }
    },
  },
};
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
