<template>
    <div>
      <!--表单 条件-->
      <el-form inline>
        <el-form-item label="昵称">
          <el-input placeholder="昵称" v-model="condition.nickname"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="condition.roleid" :clearable="true">
            <el-option
              v-for="(item,index) in classifyList" :key="index"
              :label="item.roleName" v-model="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="GetUserPageList">查询</el-button>
        <el-form-item></el-form-item>
        <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
          <el-form :model="userform">
            <el-form-item label="昵称" :label-width="formLabelWidth">
              <el-input v-model="userform.nickname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-select v-model="userform.sex" placeholder="请选择性别">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="username" :label-width="formLabelWidth">
              <el-input v-model="userform.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="生日" :label-width="formLabelWidth">
              <el-date-picker v-model="userform.birthday" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="年龄" :label-width="formLabelWidth">
              <el-input v-model="userform.age" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
              <el-input v-model="userform.tel" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="E-Mail" :label-width="formLabelWidth">
              <el-input v-model="userform.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="userform.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="头像" :label-width="formLabelWidth">
              <el-upload class="avatar-uploader"  action ="https://localhost:7060/api/File/AddFile" :on-preview="handlePictureCardPreview"  :before-upload="beforeAvatarUpload"
               :on-remove="handleRemove"  :show-file-list="true"  :on-success="handleAvatarSuccess">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <el-dialog :visible.sync="dialogVisible">
                <img width="80%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="ShowUser">确 定</el-button>
          </div>
        </el-dialog>
        <el-button type="success" size="small" @click="dialogFormVisible = true">新增人员</el-button>
      </el-form>
      <!--表格-->
      <el-table border
        :data="userform"
        style="width: 100%"
        height="250">
        
        <el-table-column
          prop="nickName"
         label="昵称"
         sortable
         width="120">
        </el-table-column>
        <el-table-column
          prop="avatar"
          label="头像"
          width="240">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="120">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="240">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="120">
          <template slot-scope="scope">
            <el-tag
            :type="scope.row.status == '正常' ? 'success' : scope.row.status == '弃用'?'danger':'primary'"
            disable-transitions>{{scope.row.status}}</el-tag>
          </template>
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
        :page-sizes="[10, 20, 50, 100]"
        :page-size.sync="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </template>
  
  <script>
  import {getUserPageList} from "@/api/setting/user"
  import * as formatter from "@/utils/formatter"
  import {getRolePageList} from '@/api/setting/role'
  export default {
    data(){
      return{
        roleID : null,//分类

        page:{//页面数据
          pageSize:10,
          pageIndex:1,
        },
        condition:{//查询条件
          nickname:'',
          roleid:null
        },
        total:0,//数据总数
        classifyList:[{  // 分类表 角色
          id:'',
          roleName:'',
        }],
        userform:[{
          nickname:'',
          roleID:'',
          rolename:'',
          age:'',
          sex:'',
          username:'',
          tel:'',
          avatar:'',
          birthday:'',
          password:'',
          email:'',
        }],
        file:{
        url:'',
        },
        dialogFormVisible: false,
        dialogImageUrl: '',
        dialogVisible: false,
        formLabelWidth: '120px'
      };
    },
    created(){
      this.GetRolePageList();
      this.GetUserPageList();
      
    },
    methods:{
      //获取列表数据
      GetUserPageList(){
        
        //调用接口获取
        getUserPageList(this.page.pageIndex,this.page.pageSize,this.condition).then(res=>{
          if(res.code==-1){
            this.$message.error("获取查询角色列表调用接口异常!")
          }
          if(res.code==200){
            //console.log(res)
            this.userform = res.data.list
            this.total = res.data.total
            //格式化性别 格式化状态
            for(var i = 0;i<this.userform.length;i++){
              this.userform[i].sex = formatter.formatterSex(this.userform[i].sex)
              this.userform[i].status = formatter.formatterStatus(this.userform[i].status,1)
              
             
            }
            
            
          }
        }).catch(err=>{
          console.log(err)
        })

      },
      //获取角色分类数据（表头查询条件）
        GetRolePageList(){
        //调用接口获取
        getRolePageList(this.page.pageIndex,this.page.pageSize).then(res=>{
          if(res.code==-1){
            this.$message.error("获取用户列表调用接口异常!")
          }
          if(res.code==200){
            //console.log("角色",res)
            this.classifyList = res.data.list
          }
        }).catch(err=>{
          console.log(err)
        })

      },
      //改变页数大小
      handleSizeChange(val){
        this.page.pageSize = val,
        this.GetUserPageList()
      },
      //当前页改变
      handleCurrentChange(val) {
        this.page.pageIndex = val ,
        this.GetUserPageList()
      },
      //弹出窗口新增/修改
      ShowUser(){
        
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleAvatarSuccess(res, file) {
        console.log(res)
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        console.log(file)
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }





    },
  
  }
  </script>
  
  <style lang="scss" scoped>
  .el-icon-plus{
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar-uploader{
    border: 1px dashed #1a0e0e;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  </style>