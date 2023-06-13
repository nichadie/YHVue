<template>
    <div>
      <!--表单 条件-->
      <el-form inline>
        <el-dialog title="角色" :visible.sync="dialogFormVisible" :before-close="closeDialog">
          <el-form :model="roleform">
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input v-model="roleform.roleName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="描述" :label-width="formLabelWidth">
              <el-input v-model="roleform.describe" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false,closeDialog()">取 消</el-button>
            <el-button type="primary" @click="SaveRole">确 定</el-button>
          </div>
        </el-dialog>
        <el-button type="primary" size="small" @click="dialogFormVisible=true,addstatus=0">新增角色</el-button>
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
          <el-button @click="lookClick(scope.row),dialogFormVisible=true" type="info" size="small">查看</el-button>
          <el-button type="success" size="small" @click="dialogMenuVisible=true,showMenu(scope.row) ">菜单权限</el-button>
          <el-button type="danger" size="small" @click="deleteButton(scope.row)">删除</el-button>
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
      <el-dialog title="菜单权限" :visible.sync = "dialogMenuVisible"  :destroy-on-close="true" :close="closeMenu" :width="'50%'" >
         <MenuManage :roleid="roleid" ></MenuManage>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import * as role from '@/api/setting/role'
  import MenuManage from './MenuManage.vue';
  export default {
    components:{
      MenuManage
    },
    data(){
      return{
        dialogFormVisible: false,//弹窗
        dialogMenuVisible:false,
        dialogImageUrl: '',
        dialogVisible: false,
        formLabelWidth: '120px',
        rolelist : [{
          roleName:'',
          describe:''
        }],
        page:{//页面数据
          pageSize:5,
          pageIndex:1,
        },
        total:0,//数据总数
        roleform:{
          roleName:'',
          describe:'',
        },
        roleform1:{
          roleName:'',
          describe:'',
        },
        roleid:'',
        addstatus:1,
      };
    },
    created(){
      this.GetRolePageList();
      
    },
    methods:{
      //打开弹窗赋值
      showMenu(val){
        this.roleid = val.id
      },
      closeMenu(){
        this.roleid = 0;
      },
      //获取列表数据
      GetRolePageList(){
        
        //调用接口获取
        role.getRolePageList(this.page.pageIndex,this.page.pageSize).then(res=>{
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
      //保存
      SaveRole(){
        if(this.addstatus==0){
          role.addRole(this.roleform).then(res=>{
          //this.closeDialog(done);
            this.dialogFormVisible = false,
            this.GetRolePageList();
            
          }).catch(err=>{
            console.log(err);
          })
        }else{
          this.roleform = this.roleform1,
          this.dialogFormVisible = false,
          this.GetRolePageList();
        
        }
      },
      //弹窗关闭事件
      closeDialog(done){
        this.roleform = this.roleform1
        this.GetRolePageList();
        done()
      },
      //查看按钮事件
      lookClick(val){
        this.roleform = val;
      },
      //删除按钮事件
      deleteButton(val){
        this.$confirm('是否确定删除？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '放弃'
        })
          .then(() => {
            role.deleteRole(val).then(res=>{
              this.dialogFormVisible = false;
              this.$message({
               type: 'info',
                message: '删除成功'
              });
             //
              this.GetRolePageList();
              this.GetUserPageList();
              //this.userform = this.userform1
            }).catch(err=>{
              console.log(err);
            })
            
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: action === 'cancel'
                ? '放弃删除'
                : ''
            })
          });
        console.log("删除")
        
      },

    },
  
  }
  </script>
  
  <style lang="scss" scoped>
  
  </style>