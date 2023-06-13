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
        <el-dialog title="用户" :visible.sync="dialogFormVisible" :before-close="closeDialog">
          <el-form :model="userform">
            <el-form-item label="*角色" :label-width="formLabelWidth">
              <el-select v-model="userform.roleID" :clearable="true">
            <el-option
              v-for="(item,index) in classifyList" :key="index"
              :label="item.roleName" v-model="item.id"
            ></el-option>
          </el-select>
            </el-form-item>
            <el-form-item label="*昵称" :label-width="formLabelWidth">
              <el-input v-model="userform.nickName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-select v-model="userform.sex" placeholder="请选择性别">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="*username" :label-width="formLabelWidth">
              <el-input v-model="userform.userName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="年龄" :label-width="formLabelWidth">
              <el-input v-model="userform.age" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="*生日" :label-width="formLabelWidth">
              <el-date-picker v-model="userform.birthday" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            
            <el-form-item label="电话" :label-width="formLabelWidth">
              <el-input v-model="userform.tel" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="E-Mail" :label-width="formLabelWidth">
              <el-input v-model="userform.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="*密码" :label-width="formLabelWidth">
              <el-input v-model="userform.password" show-password autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="editstatus==1" label="状态" :label-width="formLabelWidth">
              <el-radio-group v-model="userform.status">
                <el-radio :label="0">正常</el-radio>
                <el-radio :label="1">弃用</el-radio>
                <el-radio :label="2">待审</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="头像" :label-width="formLabelWidth">
              <el-upload class="avatar-uploader"  action="https://localhost:7060/api/UpFiles/UploadFilesbq"   :show-file-list="false"
                :auto-upload="true" 
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="userform.photo" :src="userform.photo" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false,closeDialog()">取 消</el-button>
            <el-button type="primary" @click="SaveUser">确 定</el-button>
          </div>
        </el-dialog>
        <el-button type="success" size="small" @click="editstatus=0,dialogFormVisible = true">新增人员</el-button>
      </el-form>
      <!--表格-->
      <el-table border
        :data="userformtable"
        style="width: 100% , height:100%"
        >
        
        <el-table-column
          prop="nickName"
         label="昵称"
         sortable
         width="120">
        </el-table-column>
        <el-table-column
          
          label="头像"
          width="120">
          <template slot-scope="scope">
            <img v-if="scope.row.photo" :src="scope.row.photo" class="tableavatar">
          </template>
        </el-table-column>
        <el-table-column
          prop="sexlabel"
          label="性别"
          width="120">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="240">
        </el-table-column>
        <el-table-column
          prop="statuslabel"
          label="状态"
          width="120">
          <template slot-scope="scope">
            <el-tag
            :type="scope.row.statuslabel == '正常' ? 'success' : scope.row.statuslabel == '弃用'?'danger':'primary'"
            disable-transitions>{{scope.row.statuslabel}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="option"
         label="操作"
         width="360">
        <template slot-scope="scope">
          
          <el-button type="success" size="small" @click="editstatus=1,dialogFormVisible = true,editButton(scope.row)">编辑</el-button>
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
        :page-sizes="[10, 20, 50, 100]"
        :page-size.sync="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </template>
  
  <script>
  import * as user from "@/api/setting/user"
  import * as formatter from "@/utils/formatter"
  import {getRolePageList} from '@/api/setting/role'
  import { fileConvertBase64 } from '@/utils/util';
  import {uploadimage} from '@/api/upload'
import { cosImageUrl } from '@/utils/variate';
  export default {
    data(){
      return{
        page:{//页面数据
          pageSize:10,
          pageIndex:1,
        },
        editstatus:null,
        condition:{//查询条件
          nickname:'',
          roleid:null
        },
        total:0,//数据总数
        classifyList:[{  // 分类表 角色
          id:'',
          roleName:'',
        }],
        userform:{
          nickName:'',
          roleID:'',
          rolename:'',
          age:'',
          sex:'',
          userName:'',
          tel:'',
          avatar:'',
          photo:'',
          birthday:'',
          password:'',
          email:'',
          status:2
        },
        userform1:{
          nickName:'',
          roleID:'',
          rolename:'',
          age:'',
          sex:'',
          userName:'',
          tel:'',
          avatar:'',
          photo:'',
          birthday:'',
          password:'',
          email:'',
          status:2
        },
        userformtable:[{
          nickName:'',
          roleID:'',
          rolename:'',
          age:'',
          sex:'',
          sexlabel:'',
          statuslabel:'',
          status:null,
          userName:'',
          tel:'',
          avatar:'',
          photo:'',
          birthday:'',
          password:'',
          email:'',
        }],
        imageUrl:'',
        dialogFormVisible: false,//弹窗
        dialogImageUrl: '',
        dialogVisible: false,
        formLabelWidth: '120px',
        files:'',
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
 
        user.getUserPageList(this.page.pageIndex,this.page.pageSize,this.condition).then(res=>{
          if(res.code==-1){
            this.$message.error("获取查询角色列表调用接口异常!")
          }
          if(res.code==200){
            //console.log(res)
            this.userformtable = res.data.list
            this.total = res.data.total
            //console.log(cosImageUrl)
            //格式化性别 格式化状态
            for(var i = 0;i<this.userformtable.length;i++){
              this.userformtable[i].sexlabel = formatter.formatterSex(this.userformtable[i].sex)
              this.userformtable[i].statuslabel = formatter.formatterStatus(this.userformtable[i].status,1)
              this.userformtable[i].photo = `${cosImageUrl}${this.userformtable[i].avatar}`;
              
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
      SaveUser(){
        //console.log("status",this.editstatus)
        if(this.editstatus==0){//新增
          
          user.addUser(this.userform).then(res=>{
          //this.closeDialog(done);
            this.dialogFormVisible = false,
            this.userform = this.userform1,
            this.GetRolePageList();
            this.GetUserPageList();
          }).catch(err=>{
            console.log(err);
          })
        }
        if(this.editstatus==1){//编辑
          
          user.updateUser(this.userform).then(res=>{
          //this.closeDialog(done);
            this.dialogFormVisible = false;
            this.userform = this.userform1;
            
            this.GetRolePageList();
            this.GetUserPageList();
          }).catch(err=>{
            console.log(err);
          })
        }

      },
      //弹窗关闭事件
      closeDialog(done){
        this.userform = this.userform1;
        //
        this.GetRolePageList();
        this.GetUserPageList();
        //console.log("close",this.userform)
        done()
      },
      //编辑按钮事件
      editButton(val){
        this.userform = val;
        this.userform.sexlabel = formatter.formatterSex(this.userform.sex)
      },
      //删除按钮事件
      deleteButton(val){
        this.$confirm('是否确定删除？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '放弃'
        })
          .then(() => {
            user.deleteUser(val).then(res=>{
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
      //上传头像
      // uploadavatar(param){
      //   console.log("上传",param)
      //   // fileConvertBase64(param.file,(base64)=>{
      //   //   this.userform.avatar = base64;
      //   // });
      //   uploadimage(param).then(res=>{
      //     console.log("上传success");
      //   }).catch(err=>{
      //     console.log(err);
      //   })
      // },
      //头像显示
      showAvatar(){
        
      },
      //上传头像成功事件
      handleAvatarSuccess(response, uploadFile, uploadFiles) {
        if (response.code==200) {

          console.log("response.data:" + response.data)
          this.userform.photo = `${cosImageUrl}${response.data}`;//到时候配置成url
          this.userform.avatar = response.data
        }
      },
      beforeAvatarUpload(file) {
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
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .tableavatar{
    width: 80px;
    height: 80px;
    display: block;
  }
  </style>