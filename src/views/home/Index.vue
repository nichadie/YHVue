<template>
  <div>
    <el-row>
      <el-col :span="6">
        <div id="he-plugin-standard"></div>

      </el-col>
      <el-col :span="6">
        <transition name="el-zoom-in-top">
          <el-card
            class="box-card"
            size="small"
            v-if="homeData.notices.length > 0"
          >
            <div slot="header" class="clearfix">
              <span>
                <el-tag effect="dark" color="#46bf89">最新系统公告</el-tag>
              </span>
            </div>
            <div
              v-for="(item, index) in homeData.notices"
              :key="index"
              class="text item"
            >
              {{ item.title }}
            </div>
          </el-card>
        </transition>
      </el-col>
      <el-col :span="6">
        <transition name="el-zoom-in-top">
          <el-card class="box-card" v-if="homeData.comments.length > 0">
            <div slot="header" class="clearfix">
              <span
                ><el-tag effect="dark" color="#46bf89"
                  >最新热门评论</el-tag
                ></span
              >
            </div>
            <div
              v-for="(item, index) in homeData.comments"
              :key="index"
              class="text item"
            >
              {{ item.content }}
            </div>
          </el-card>
        </transition>
      </el-col>
      <el-col :span="6">
        <transition name="el-zoom-in-top">
          <el-card class="box-card" v-if="homeData.users.length > 0">
            <div slot="header" class="clearfix">
              <span>
                <el-tag effect="dark" color="#46bf89">最新注册用户</el-tag>
              </span>
            </div>
            <div
              v-for="(item, index) in homeData.users"
              :key="index"
              class="text item"
            >
              <a>{{ item.name }}</a>
            </div>
          </el-card>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: "home",
  data() {
    return {
      homeData: {
        notices: [
          {
            content: "有前端开发的小伙子愿意学习，可以参与开发！",
            createTime: "2022-06-14 17:49:04",
            id: 6,
            isDelete: false,
            key: null,
            sysUser: null,
            title: "小程序！",
            userId: null,
            userName: null,
          },
        ],
        articles: [
          {
            createTime: "2023-04-05 14:33:25",
            id: 20191,
            isDelete: false,
            key: null,
            title:
              "Vue监听localStorage本地存储中值的更新，不使用Vuex的情况下，组件监听本地存储并且更新data值",
            userId: null,
            userName: null,
          },
        ],
        users: [
          {
            createTime: "2023-04-13 01:08:29",
            email: null,
            id: 20577,
            isDelete: false,
            key: null,
            name: "大使",
            userId: null,
            userName: "大使",
          },
        ],
        comments: [
          {
            content: "666",
            createTime: "2023-04-13 01:08:29",
            id: 13,
            isDelete: false,
            key: null,
            userId: 4,
            userName: "网络",
          },
        ],
      },
    };
  },
  created() {
    this.getHomeData();
  },

  methods: {
    getHomeData() {},
  },
};
</script>

<style scoped>
.text {
  font-size: 0.9rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item {
  padding: 9px 0;
}

.clearfix span {
  width: 100%;
  font-size: 0.9rem;
}
.el-col >>> .box-card {
  margin-right: 10px;
  min-height: 186px;
  max-height: 200px;
}
.el-col >>> .box-card {
  border-radius: 0.5rem;
}

.box-card >>> .el-card__header {
  padding: 0;
}
.box-card .el-tag {
  border-radius: 0;
}
.box-card >>> .el-card__body {
  padding: 5px 10px !important;
}
</style>