<template>
    <div>
      <!--表单 条件-->
      <el-form inline>
        <el-button type="primary" size="small">新增角色</el-button>
      </el-form>
      <!--表格-->
      <el-table border
        :data="rolelist"
        style="width: 100%"
        height="250">
        <el-table-column
          fixed
          prop="roleName"
          label="部门"
          sortable
          width="100">
        </el-table-column>
        <el-table-column
          prop="describe"
         label="描述"
         sortable
         width="240">
        </el-table-column>
        <el-table-column
          prop="option"
         label="操作"
         width="360">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="info" size="small">查看</el-button>
          <el-button type="success" size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page.sync="page.pageIndex"
        :page-sizes="[5, 10, 20, 50]"
        :page-size.sync="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </template>
  
  <script>
  import {getRolePageList} from '@/api/setting/role'
  export default {
    data(){
      return{
        
        rolelist : [{
          roleName:'',
          describe:''
        }],
        page:{//页面数据
          pageSize:5,
          pageIndex:1,
        },
        total:0,//数据总数
        condition:{//查询条件
          rolename:'',
        },
      };
    },
    created(){
      this.GetRolePageList();
      
    },
    methods:{
      //获取列表数据
      GetRolePageList(){
        
        //调用接口获取
        getRolePageList(this.page.pageIndex,this.page.pageSize).then(res=>{
          if(res.code==-1){
            this.$message.error("获取角色列表调用接口异常!")
          }
          if(res.code==200){
            //console.log(res)
            this.rolelist = res.data.list
            this.total = res.data.total
            
            
          }
        }).catch(err=>{
          console.log(err)
        })

      },
      //改变页数大小
      handleSizeChange(val){
        this.page.pageSize = val,
        this.GetRolePageList()
      },
      //当前页改变
      handleCurrentChange(val) {
        this.page.pageIndex = val ,
        this.GetRolePageList()
      },


    },
  
  }
  </script>
  
  <style lang="scss" scoped>
  
  </style>