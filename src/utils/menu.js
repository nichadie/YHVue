
import config from '@/config/config'
import {getSystemMenus} from '@/api/auth'
/**
 * 初始化系统菜单
 * @param {路由对象} router 
 * @param {状态管理对象} store 
 */
export const initMenus = (router, store) => {
    console.log("路由数据：", router.routes);
    //如果vuex里面没有菜单数据，就去获取菜单路由数据
    if (store.state.routes.length <= 0) {
        //获取系统菜单
        getSystemMenus().then(res => {
                if (res) {
                    console.log("获取用户的权限数据：", res);
                    //格式化route路由数据
                    let fmtRoutes = formatRoutes(res.data);
                    console.log("格式化好的路由：", fmtRoutes);
                    if (router.app.$store.state.routes.length <= 0) {
                        // 新增动态路由数据
                        router.addRoutes(fmtRoutes);
                    }
                    //将格式化好的侧边栏菜单路由数据存储到vuex里面
                    store.commit('initRoutes', fmtRoutes);
                    // 存储指令按钮操作权限
                    if (res.data.commandPermissions && res.data.commandPermissions.length > 0) {
                        config.setPermissions(res.data.commandPermissions);
                    }

                }
        }).catch(err =>{
            console.log(err);
        } )
    }
}


/**
 * 格式化路由
 * @param {*} routes 路由数据
 */
export const formatRoutes = (routes) => {
    let fmtRoutes = [];

    routes.forEach(route => {
        //格式化的路由对象
        let fmtRouter = {
            path: route.path,
            name: route.name,
            component: null,
            hidden: route.hidden,
            meta: {
                title: route.title,
                icon: route.icon,
                parentId: route.parent_Id
            },
            children: []
        }
        // 动态引入组件


        if (route.componentFolder && route.componentName) {
            fmtRouter.component = require('@/views/' + route.componentFolder + route.componentName + '.vue').default
            if (route.componentFolderPath == "home/") {
                fmtRouter.meta.affix = true;    //固定后台首页的tab项
            }
        } else if (route.componentName) {
            //主目录，Layout/Index.vue组件
            fmtRouter.component = require('@/' + route.componentName + '/').default
            
            
        }
        
        //子菜单不为空，并且类型为数组
        if (route.children instanceof Array && route.children.length > 0) {
            //递归生成子路由

            fmtRouter.children = formatRoutes(route.children);

            
        }
        
    
        //将格式化的路由数据，新增到路由数组
        fmtRoutes.push(fmtRouter);
    });


    return fmtRoutes;
}