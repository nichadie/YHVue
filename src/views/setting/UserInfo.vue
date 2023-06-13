<template>
  <el-form :model="userform">
    <el-form-item label="昵称" :label-width="formLabelWidth">
        <el-input v-model="userform.nickName" autocomplete="off" class="userinfocss" disabled></el-input>
    </el-form-item>
    <el-form-item label="username" :label-width="formLabelWidth">
        <el-input v-model="userform.userName" autocomplete="off" class="userinfocss" disabled></el-input>
    </el-form-item>
    <el-form-item label="年龄" :label-width="formLabelWidth">
        <el-input v-model="userform.age" autocomplete="off" class="userinfocss"></el-input>
    </el-form-item>
    <el-form-item label="生日" :label-width="formLabelWidth">
        <el-date-picker v-model="userform.birthday" type="date" placeholder="选择日期"></el-date-picker>
    </el-form-item>
    
    <el-form-item label="电话" :label-width="formLabelWidth">
        <el-input v-model="userform.tel" autocomplete="off" class="userinfocss"></el-input>
    </el-form-item>
    <el-form-item label="E-Mail" :label-width="formLabelWidth">
        <el-input v-model="userform.email" autocomplete="off" class="userinfocss"></el-input>
    </el-form-item>
    <el-form-item label="头像" :label-width="formLabelWidth">
        <el-upload class="avatar-uploader"  action="https://localhost:7060/api/UpFiles/UploadFilesbq"   :show-file-list="false"
        :auto-upload="true" 
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="$cosImageUrl+userform.avatar" :src="$cosImageUrl+userform.avatar" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        
    </el-form-item>
    <div style="position: relative;left: 180px;">
        <el-button type="primary" @click="SaveUser">确 定</el-button>
    </div>
   </el-form>
   
   
</template>

<script>
import * as variate from '@/utils/variate';
import * as user from '@/api/setting/user'
import {formatterSex} from "@/utils/formatter"
export default {
    
    data(){
        return{
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
            redirect:'',
            formLabelWidth: '120px',
            userInfo:'',
        }
    },
    created() {
        this.GetUserInfo();
        
    },
    methods:{
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
     },
     //获取用户信息
      GetUserInfo(){
        
          user.getUserInfo().then(res=>{
            this.userform = res
        }).catch(err=>{
            console.log(err);
        })
    
    },
    //保存
     SaveUser(){
        user.updateUser(this.userform).then(res=>{

            this.$router.push({
                path: this.redirect ? this.redirect : "/index",
              });
          }).catch(err=>{
            console.log(err);
          })

      },
      
        
    }
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
    width: 180px;
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
  .userinfocss{
    width: 300px;  

  }
  </style>