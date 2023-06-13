<template>
    <div>
        <el-table border
        :data="menulist"
        style="width: 100%"
        height="250">
        <el-table-column
          fixed
          prop="title"
          label="菜单标题"
          sortable
          width="100">
        </el-table-column>
        <el-table-column
          prop="description"
         label="描述"
         sortable
         width="240">
        </el-table-column>
        <el-table-column
          prop="type_Key"
         label="菜单标识"
         sortable
         width="120">
        </el-table-column>
        <el-table-column
          prop="option"
         label="操作"
         width="120">
        <template slot-scope="scope">
            <el-switch
                v-model="scope.row.switchValue"
                @change="switchOption(scope.row)"
                active-color="#13ce66"
                inactive-color="#ff4949">
            </el-switch>
        </template>
        </el-table-column>
      </el-table>
    </div>
 
 </template>
 
 
 <script>
 import { v4 as uuidv4 } from 'uuid';
 import * as menu from '@/api/setting/menu'
 import {getRolePageList} from '@/api/setting/role'
 import {formatterTypeKey} from '@/utils/formatter'
   export default {
    props:{
        roleid:0,
    },
     data() {
       return {
        page:{//页面数据
          pageSize:10,
          pageIndex:1,
        },

        menulist:[{
            id:'',
            title:'',
            description:'',
            switchvalue:null,
            roleid:''
        }],
       };
     },

      created(){
        
        if(this.roleid<0||this.roleid==undefined){
            this.$message.error("获取参数失败")
            return;
        }
         this.getPermission(this.roleid);
        this.$watch('roleid', (newVal, oldVal) => {
          
            if (newVal !== oldVal && newVal > 0) {
                 this.getPermission(newVal);
            }
        });
       
     },

     destroyed(){
        //this.roleidWatcher();
        this.$watch('roleid', null);
    },
     methods: {
        
         //获取所有菜单数据
         getPermission(val) {
             
             menu.getMenuPermissions(val).then(res=>{
                 if(res.code==-1){
                     this.$message.error("获取菜单调用接口异常!")
                 }
                 if(res.code==200){
                    this.menulist = res.data 
                     
                    for(var i = 0;i<this.menulist.length;i++)
                    {
                        this.menulist[i].type_Key = formatterTypeKey(this.menulist[i].type_Key)
                        this.menulist[i].roleid = this.roleid
                    }
                    
             }}).catch(err=>{
                 console.log(err)
             })
 
         },
         
         //开关状态改变事件
         switchOption(val){
            console.log(val)
            menu.changeMenuPer(val).then(res=>{
                if(res.data==true){
                    this.getPermission(this.roleid);
                }
            }).catch(err=>{
                console.log(err)
            })
        }
         
       
     },
 
    
   };
 </script>
 <style>
   

</style>