<template>
  <div class="div_content">
    <pre v-html="article.content" class="pre"></pre>
  </div>
</template>

<script>
import { findArticle } from "@/api/article";
export default {
  name: "contentDetails",
  props: {
    id: Number,
  },
  data() {
    return {
      article: {},
    };
  },
  created() {
    this.getArticle();
  },
  methods: {
    getArticle: function () {
      findArticle(this.id)
        .then((result) => {
          console.log(result);
          if (result.code == 404) {
            this.$message.error(result.message);
          } else {
            this.article = result.data;
          }
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
// .div_content {
//   height: calc(100% - 44px);
//   border-radius: 0.6rem;
//   padding: 0 15px;
//   box-shadow: 0 0 10px 0 lightsalmon;
//   margin-top: 0.5rem;
//   overflow: scroll;
// }
</style>