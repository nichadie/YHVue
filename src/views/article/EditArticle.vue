<template>
  <div>
    <el-form ref="article" :model="article" size="small">
      <el-form-item label="标题">
        <el-input
          v-model="article.title"
          autocomplete="off"
          placeholder="请输入文章标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select
          class="el-input"
          v-model="article.classifyId"
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
      <el-form-item label="浏览量">
        <el-input
          v-model.number="article.browseCount"
          placeholder="请输入文章浏览量"
        ></el-input>
      </el-form-item>
      <el-form-item label="点赞数量">
        <el-input
          v-model.number="article.supportCount"
          placeholder="请输入文章点赞数量"
        ></el-input>
      </el-form-item>
      <el-form-item label="收藏数量">
        <el-input
          v-model.number="article.collectCount"
          placeholder="请输入文章收藏数量"
        ></el-input>
      </el-form-item>
      <el-form-item label="分享数">
        <el-input
          v-model.number="article.shareCount"
          placeholder="请输入文章分享数"
        ></el-input>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-radio-group v-model.number="article.state">
          <el-radio :label="0">待审核</el-radio>
          <el-radio :label="1">审核通过</el-radio>
          <el-radio :label="2">审核不通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否需要购买">
        <el-checkbox v-model="article.isBuy"></el-checkbox>
        <label>注意：以下三项输入框需要勾选需要购买才能输入数据！</label>
      </el-form-item>
      <el-form-item label="价格">
        <el-input-number
          v-model.number="article.price"
          :disabled="!article.isBuy"
          :precision="2"
          placeholder="请输入文章价格"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="下载链接">
        <el-input
          v-model="article.downloadLink"
          :disabled="!article.isBuy"
          placeholder="请输入下载链接"
        ></el-input>
      </el-form-item>
      <el-form-item label="隐藏内容">
        <el-input
          v-model="article.hiddenContent"
          :disabled="!article.isBuy"
          placeholder="请输入文章隐藏内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="文章封面">
        <el-upload
          class="upload-demo"
          action=""
          :show-file-list="false"
          :http-request="upload"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <!-- 提示 -->
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过1mb
          </div>
        </el-upload>
        <div>
          <img :src="showImageUrl" width="200" />
        </div>
      </el-form-item>
      <el-form-item label="文章内容"> </el-form-item>
      <el-form-item>
        <div style="border: 1px solid #ccc">
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :defaultConfig="toolbarConfig"
            :mode="mode"
          />
          <Editor
            style="height: 500px; overflow-y: hidden"
            v-model="article.content"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
          />
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel" icon="el-icon-close" size="small"
        >取 消</el-button
      >
      <el-button
        type="success"
        size="small"
        @click="saveArticle"
        icon="el-icon-check"
      >
        确 定
      </el-button>
    </div>
  </div>
</template>

<script>
import { findArticle, updateArticle } from "@/api/article";
import { fileConvertBase64 } from "@/utils/util";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
export default {
  name: "edit-article",
  props: {
    id: Number,
  },
  components: { Editor, Toolbar },
  data() {
    return {
      article: {},
      aid: this.id,
      showImageUrl: "", //图片显示路径
      classifyArray: [], //分类数据
      // 编辑器属性
      editor: null,
      // 编辑器工具栏配置
      toolbarConfig: {},
      // 编辑器配置
      editorConfig: {
        placeholder: "请输入内容...",
        MENU_CONF: {
          uploadImage: {
            // 上传图片的配置
            // server: "https://www.xywl123.cn:5656/api/upload/article/UploadEditorPicture",
            server: this.$baseApiUrl + "upload/article/UploadEditorPicture",
            // 单个文件的最大体积限制，默认为 2M
            maxFileSize: 5 * 1024 * 1024, // 1M
            // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
            allowedFileTypes: ["image/*"],
            // 小于该值就插入 base64 格式（而不上传），默认为 0
            base64LimitSize: 0, // 300kb
            headers: {
              Authorization: "Bearer " + this.$config.getToken(),
            },
            // 上传之前触发
            // onBeforeUpload(file: File) { // TS 语法
            onBeforeUpload(file) {
              // JS 语法
              // file 选中的文件，格式如 { key: file }
              return file;

              // 可以 return
              // 1. return file 或者 new 一个 file ，接下来将上传
              // 2. return false ，不上传这个 file
            },

            // 上传进度的回调函数
            // onProgress(progress: number) {
            // TS 语法
            onProgress(progress) {
              // JS 语法
              // progress 是 0-100 的数字
              console.log("progress", progress);
            },

            // 单个文件上传成功之后
            // onSuccess(file: File, res: any) {
            // TS 语法
            onSuccess(file, res) {
              // JS 语法
              // res.data.url = "https://localhost:5656/" + res.data.url;
              console.log(`${file.name} 上传成功`, res);
            },

            // 单个文件上传失败
            // onFailed(file: File, res: any) {
            // TS 语法
            onFailed(file, res) {
              // JS 语法
              console.log(`${file.name} 上传失败`, res);
            },

            // 上传错误，或者触发 timeout 超时
            // onError(file: File, err: any, res: any) {
            // TS 语法
            onError(file, err, res) {
              // JS 语法
              console.log(`${file.name} 上传出错`, err, res);
            },
          },
        },
      },
      mode: "default", // or 'simple'
    };
  },
  created() {
    this.getClassifyList();
    this.getArticle();
  },
  methods: {
    getArticle() {
      findArticle(this.aid)
        .then((result) => {
          if (result.code == 404) {
            this.$message.error(result.message);
          } else {
            this.article = result.data;
            // 图片显示路径，查出来的图片如果有值就赋值给图片显示路径
            if (result.data.outerImage)
              this.showImageUrl = this.$cosImageUrl + result.data.outerImage;
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    getClassifyList() {
      getClassifys({ key: "文章" })
        .then((result) => {
          this.classifyArray = result.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 保存文章
    saveArticle() {
      if (this.article.classifyId > 0) {
        this.article.classifyName = this.classifyArray.find(
          (f) => f.id == this.article.classifyId
        ).name;
        console.log(this.article);
      }
      updateArticle(this.article)
        .then((result) => {
          if (result.code == 200) {
            if (result.data) {
              this.$message.success(result.message);
              this.cancel(); //关闭编辑文章弹窗
            }
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
    upload(params) {
      fileConvertBase64(params.file, (base64) => {
        this.article.outerImage = base64;
        this.showImageUrl = base64; //给对应更新图片路径的变量赋值base64码
      });
    },
    // 调用父组件关闭弹窗方法
    cancel() {
      this.$emit("cancel", false);
    },
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    beforeDestroy() {
      const editor = this.editor;
      if (editor == null) return;
      editor.destroy(); // 组件销毁时，及时销毁编辑器
    },
  },
};
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped>
.dialog-footer {
  display: flex;
  justify-content: right;
  align-items: center;
  margin: 40px 0;
}
</style>