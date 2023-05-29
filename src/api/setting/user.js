import request from "@/utils/request"


/**
 * 获取用户分页数据列表
 * @param {*} pageIndex 
 * @param {*} pageSize 
 * @param {*} params 
 * @returns 
 */
export function getUserPageList(pageIndex,pageSize,condition){
    return request({
        url:'User/GetUserListPage?pageIndex=${pageIndex}&pageSize=${pageSize}',
        method:'get',
        params:{
            nickname:condition.nickname,
            roleid:condition.roleid,

        }
    })

}


/**
 * 查询用户数据列表
 * 
 */
export const getUserListPage = ( nickname,roleid,pageIndex = 1,ipageSize = 10) => {
    return request({
        url : '/User/GetUserListPage',
        method:'get',
        params:{
            nickname,roleid,pageIndex : 1,ipageSize : 10
        }
    
    
    })

}

export const addUser = (userform)=>{
    return request({
        url:'/User/AddUser',
        method:'post',
        params:{
            userform
        }
    
    })
}
