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
        url:`User/GetUserListPage?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        method:'get',
        params:{
            nickname:condition.nickname,
            roleid:condition.roleid,

        }
    })

}

/**
 * 增加用户
 * @param {*} userform 
 * @returns 
 */
export const addUser = (userform)=>{
    return request({
        url:'/User/AddUser',
        method:'post',
        params:{
            userform
        }
    
    })
}
