<template>
  <div>
    <!-- 表单 -->
    <el-form :model="condition" class="condition-form" :inline="true">
      <el-form-item label="文章标题" prop="name">
        <el-input
          :size="this.$global.formSize"
          v-model="condition.title"
        ></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <el-input :size="this.$global.formSize" v-model="condition.content" />
      </el-form-item>
      <el-form-item label="文章分类">
        <el-select
          :size="this.$global.formSize"
          v-model="condition.classifyId"
          clearable
          placeholder="请选择文章分类"
        >
          <el-option
            v-for="(item, index) in classifyArray"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          :size="this.$global.formSize"
          type="primary"
          @click="getArticles()"
          icon="el-icon-search"
        >
          检索
        </el-button>
      </el-form-item>
    </el-form>

    <el-button-group>
      <el-button
        type="danger"
        :size="this.$global.moduleSize"
        @click="deleteRange"
        icon="el-icon-delete"
        v-if="hasPermission('article:delete')"
      >
        批量删除
      </el-button>
      <el-button
        type="primary"
        @click="getArticles()"
        :size="this.$global.moduleSize"
        icon="el-icon-refresh"
      >
        刷新数据
      </el-button>
    </el-button-group>
    <!-- 数据表格 -->
    <el-table
      size="mini"
      @select="selectCheckbox"
      v-loading="loading"
      border
      :data="articles"
      max-height="510px"
      style="width: 100%"
    >
      <el-table-column type="selection" />
      <!-- <el-table-column type="index" label="序号" width="60" /> -->
      <!-- <el-table-column prop="id" label="编号" width="60" /> -->
      <el-table-column
        prop="title"
        label="标题"
        width="240"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <a @click="checkContent(scope.row)">{{ scope.row.title }}</a>
        </template>
      </el-table-column>
      <!-- <el-table-column label="内容" width="300" show-overflow-tooltip>
        <template slot-scope="scope">
          <p>{{ scope.row.content | filterHtml }}</p>
        </template>
      </el-table-column> -->
      <el-table-column prop="classifyName" min-width="110" label="分类" />
      <el-table-column prop="userName" label="创建人" />
      <el-table-column
        prop="browseCount"
        width="110"
        sortable
        label="浏览数量"
      />
      <el-table-column
        prop="supportCount"
        width="110"
        sortable
        label="点赞数量"
      />
      <el-table-column
        prop="collectCount"
        width="110"
        sortable
        label="收藏数量"
      />
      <el-table-column
        prop="shareCount"
        width="110"
        sortable
        label="分享数量"
      />
      <el-table-column label="图片" width="130px">
        <template slot-scope="scope">
          <img
            :src="$cosImageUrl + scope.row.outerImage"
            v-if="scope.row.outerImage"
            height="40"
            alt="没有文章图片"
          />
        </template>
      </el-table-column>
      <el-table-column label="审核状态" min-width="110" sortable prop="state">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state == 0">待审核</el-tag>
          <el-tag v-else-if="scope.row.state == 1" type="success"
            >审核通过</el-tag
          >
          <el-tag v-else-if="scope.row.state == 2" type="danger"
            >审核不通过</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180" sortable prop="createTime">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | filterDateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" align="center" width="130">
        <template slot-scope="scope">
          <el-button
            :size="$global.moduleSize"
            type="warning"
            class="tab-btn-edit"
            @click="handleEdit(scope.$index, scope.row)"
            icon="el-icon-edit"
          >
            <!-- 编辑 -->
          </el-button>
          <el-popconfirm
            @confirm="handleDelete(scope.$index, scope.row)"
            title="确定删除此文章吗？"
          >
            <el-button
              type="danger"
              slot="reference"
              :size="$global.moduleSize"
              icon="el-icon-delete"
            >
              <!-- 删除 -->
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      background
      small
      layout="total, sizes, prev, pager, next, jumper"
      v-show="page.total"
      :total="page.total"
      :page-sizes="[5, 10, 30, 60, 90]"
      :page-size="page.pageSize"
      :current-page.sync="page.pageIndex"
      @next-click="page.pageIndex++"
      @prev-click="page.pageIndex--"
      @current-change="getArticles"
      @size-change="sizeChange"
    >
    </el-pagination>
    <!-- 对话框，弹出编辑文章子组件页面 -->
    <el-dialog
      v-if="editDialogVisible"
      title="编辑文章"
      :width="this.$global.dialogWidth"
      :close-on-click-modal="this.$global.isCloseModal"
      :visible.sync="editDialogVisible"
      class="showAll_dialog"
    >
      <edit-article v-on:cancel="cancel" :id="id" />
    </el-dialog>
    <el-dialog
      v-if="contentDialogVisible"
      title="查看详情"
      :width="this.$global.dialogWidth"
      :close-on-click-modal="this.$global.isCloseModal"
      :visible.sync="contentDialogVisible"
      class="showAll_dialog"
    >
      <content-details :id="id"></content-details>
    </el-dialog>
  </div>
</template>

<script>
import EditArticle from "@/views/article/EditArticle.vue";
import ContentDetails from "@/views/article/ContentDetails.vue";

export default {
  name: "articleManage",
  data() {
    return {
      search: "",
      // 文章检索条件
      condition: {
        title: "",
        content: "",
        classifyId: "",
      },
      page: {
        pageIndex: 1, //当前页数
        pageSize: 30, //每页显示数量
        total: 0, //文章数量
      },
      loading: true,
      articles: [
        {
          title: "这几种.NET EF Core性能调优，查询性能飙升！",
          content: '<p style="text-align: justify;"><strong>',
          classifyId: null,
          classifyName: ".NET",
          outerImage: "",
          state: 1,
          supportCount: 0,
          browseCount: 20,
          collectCount: 0,
          shareCount: 0,
          gainPerson: 0,
          sort: 0,
          isStick: 0,
          isBuy: false,
          price: 0,
          downloadLink: null,
          hiddenContent: null,
          id: 20192,
          createTime: "2023-04-07 17:54:59",
          isDelete: false,
          key: null,
          userId: 4,
          userName: "小鱼记",
        },
        {
          title:
            "Vue监听localStorage本地存储中值的更新，不使用Vuex的情况下，组件监听本地存储并且更新data值",
          content: "<p>1、创建一个eventLocalStorage.js文件，实现以下代码</",
          classifyId: null,
          classifyName: "Vue",
          outerImage: "",
          state: 1,
          supportCount: 0,
          browseCount: 23,
          collectCount: 0,
          shareCount: 1,
          gainPerson: 0,
          sort: 0,
          isStick: 0,
          isBuy: false,
          price: 0,
          downloadLink: null,
          hiddenContent: null,
          id: 20191,
          createTime: "2023-04-05 14:33:25",
          isDelete: false,
          key: null,
          userId: 4,
          userName: "小鱼记",
        },
        {
          title: "EF Core封装Repository仓储通用方法",
          content:
            "<p>为了项目快速开发，不具体讲解每一个实现了，大概就是对EF Core中间套了",
          classifyId: null,
          classifyName: "精选",
          outerImage: "",
          state: 1,
          supportCount: 0,
          browseCount: 20,
          collectCount: 0,
          shareCount: 0,
          gainPerson: 0,
          sort: 0,
          isStick: 0,
          isBuy: false,
          price: 0,
          downloadLink: null,
          hiddenContent: null,
          id: 20190,
          createTime: "2023-04-05 04:44:24",
          isDelete: false,
          key: null,
          userId: 4,
          userName: "小鱼记",
        },
        {
          title: ".NET开发API，如何使用EF Core！",
          content: '<p><span style="color: rgb(231, 95, 51);',
          classifyId: null,
          classifyName: ".NET",
          outerImage:
            "images/article/cover_images/202345/4df1f1d4-fc02-471a-bd36-16fe50992e63_min.png",
          state: 1,
          supportCount: 0,
          browseCount: 25,
          collectCount: 0,
          shareCount: 0,
          gainPerson: 0,
          sort: 0,
          isStick: 0,
          isBuy: false,
          price: 0,
          downloadLink: null,
          hiddenContent: null,
          id: 20189,
          createTime: "2023-04-05 03:36:24",
          isDelete: false,
          key: null,
          userId: 4,
          userName: "小鱼记",
        },
      ], //文章数据列表
      editDialogVisible: false,
      contentDialogVisible: false,
      id: Number,
      deleteArticles: [],
      classifyArray: [],
    };
  },
  components: { EditArticle, ContentDetails },
  mounted() {
    this.getArticles(); //获取文章数据
  },
  methods: {
    /**
     * 查询文章数据,isCondition是否需要条件
     */
    getArticles(isCondition = true) {
      this.page.total = this.articles.length; //总数量
      this.loading = false;
    },
    checkContent(row) {
      this.id = row.id;
      this.contentDialogVisible = true;
    },
    stateFormatter(row, column, cellValue, index) {
      if (cellValue == 0) return "审核中";
      else if (cellValue == 1) return "审核已通过";
      else return "审核未通过";
    },
    // 每页数据显示数量更改
    sizeChange(pageSize) {
      this.page.pageSize = pageSize; //修改每页数据显示数量
      this.getArticles();
    },
    // 批量删除文章
    deleteRange() {
      if (this.deleteArticles.length > 0) {
      } else {
        this.$message.warning("请选择您要删除的数据！");
      }
    },
    //选中行复选框触发
    selectCheckbox(selection, row) {
      this.deleteArticles.push(row);
    },
    //编辑文章
    handleEdit(index, row) {
      this.id = row.id;
      this.editDialogVisible = true;
    },
    // 删除文章
    handleDelete(index, row) {
      deleteArticle(row.id)
        .then((result) => {
          console.log(result);
          if (result.data) {
            this.$message.success(result.message);
            this.getArticles(); //刷新数据
          } else this.$message.error(result.message);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 关闭弹出窗体
    cancel(editDialogVisible) {
      this.editDialogVisible = editDialogVisible;
      this.getArticles();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/dialog.scss";
</style>