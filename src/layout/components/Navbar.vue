<template>


  <div class="navbar">
    
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <!-- 面包屑 -->
    <Breadcrumb class="breadcrumb-container" />
  
    <div class="right-menu">

      <screenfull id="screenfull" class="right-menu-item hover-effect" />
      <!-- 个人信息下拉菜单 -->
      <el-dropdown class="avatar-container">
        <div class="avatar-wrapper">
          <img
            :src="$cosImageUrl+avatar"
            class="user-avatar"
          />
          <div class="user-name">
            <span v-text="userName"></span>
            <span><i class="el-icon-caret-bottom" /></span>
          </div>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/index/userInfo">
            <el-dropdown-item > 个人信息 </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">注销登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import Screenfull from "@/components/Screenfull";
export default {
  data() {
    return {
      userinfo:{
      },
      userName: "",
      avatar:"",
    };
  },
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
  },
  created() {
    this.userName = this.$config.getUser().userName;
    this.avatar = this.$config.getUser().avatar;
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    
    async logout() {
      // this.$config.removeToken(); //清除token
      // this.$config.removeUser(); //清除登录的用户信息
      this.$config.logout(); //注销登录
      this.$store.commit("clearRoutes"); //清除vuex中的用户菜单数据
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`);
      this.$router.replace(`/login`);
    },
    
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  border-bottom: 1px solid rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 0.8rem;

      .avatar-wrapper {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .user-name {
          width: 100%;
          height: 100%;
          cursor: pointer;
          padding: 0 0.4rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .el-icon-caret-bottom {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
