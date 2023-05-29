import request from "@/utils/request"


/**
 * 后台管理系统登录
 * @param {*} userName 
 * @param {*} password 
 */
export const adminLogin = (userName,password) => {
    return request({
        url : '/Auth/AdminLogin',
        method:'post',
        params:{
            userName,
            password
        }
    
    
    })

}
/**
 * 
 * @returns 获取系统侧边栏菜单权限
 */


export const getSystemMenus = ()=>{
    return request({
        url : '/Auth/GetSystemMenu',
        method:'get',
    })
}