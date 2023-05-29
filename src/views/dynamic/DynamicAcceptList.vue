<template>
  <div>
    <!--表单 条件-->
    <el-form inline>
      <el-form-item label="标题筛选条件">
        <el-input placeholder="标题筛选条件"></el-input>
      </el-form-item>
      <el-form-item label="内容筛选条件">
        <el-input placeholder="内容筛选条件"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="classifyID" :clearable="true">
          <el-option
            v-for="(item,index) in classifyList" :key="index"
            :label="item.Name" :value="item.ID"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary">查询</el-button>
    </el-form>
    <!--表格-->
    <el-table border
      :data="tableData"
      style="width: 100%"
      height="250">
      <el-table-column
        fixed
        prop="date"
        label="日期"
        sortable
        width="150">
      </el-table-column>
      <el-table-column
        prop="CustomerID"
       label="发表人ID"
       width="120">
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        width="360">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        prop="option"
       label="操作"
       width="120">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">通过</el-button>
        <el-button type="text" size="small">驳回</el-button>
      </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data(){
    return{
      classifyID : null,//分类
      tableData : [],
      total:0,//数据总数
      classifyList:[// 分类表 测试
      {ID:1,Name:"a"},
      {ID:2,Name:"b"}
    ],
    };
  },

}
</script>

<style lang="scss" scoped>

</style>