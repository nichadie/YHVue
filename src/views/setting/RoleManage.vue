<template>
    <div>
      <!--表单 条件-->
      <el-form inline>
        <el-button type="primary" size="small">新增部门</el-button>
      </el-form>
      <!--表格-->
      <el-table border
        :data="tableData"
        style="width: 100%"
        height="250">
        <el-table-column
          fixed
          prop="name"
          label="部门"
          sortable
          width="100">
        </el-table-column>
        <el-table-column
          prop="describe"
         label="描述"
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
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"

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
        roleID : null,//分类
        tableData : [],
        total:0,//数据总数
        classifyList:[// 分类表 测试
        {ID:1,Name:"a"},
        {ID:2,Name:"b"}
      ],
      };
    },
    onLoad(){

    },
    methods:{
      


    },
  
  }
  </script>
  
  <style lang="scss" scoped>
  
  </style>