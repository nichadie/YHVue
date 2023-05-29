<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import item from "./Item.vue";
import variables from "@/styles/variables.scss";

export default {
  data() {
    return {
      menus: [],
    };
  },
  components: { SidebarItem, Logo, item },
  mounted() {},
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      this.menus = [];

      //查本地项目routes里面不隐藏的路由菜单
      this.$router.options.routes.forEach((element) => {
        if (!element.meta.hidden) {
          this.menus.push(element);
        }
      });
      // 新增vuex中的菜单
      this.$store.state.routes.forEach((element) => {
        this.menus.push(element);
      });

      //根据meta下的sort属性排序
      // this.menus = this.menus.sort((a, b) => a.meta.sort - b.meta.sort);
      return this.menus;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>
