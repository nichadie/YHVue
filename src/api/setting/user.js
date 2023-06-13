import request from "@/utils/request"

/**
 * 获取用户信息
 * @param {*} user 
 */
export function getUserInfo() {
    return new Promise((resolve, reject) => {
      request({
        url: 'Auth/GetUserInfoAsync',
        method: 'get'
      }).then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error);
      })
    });
  }

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
 * 添加用户
 * @param {*} user 
 * @returns 
 */
export function addUser(user){
    return request({
        url:`User/AddUser`,
        method:'post',
        data:user
    
    })
}

/**
 * 更改用户
 * @param {*} user 
 * @returns 
 */
export async function  updateUser(user){
    return request({
        url:`User/UpdateUser`,
        method:'post',
        data:user
    
    })
}

/**
 * 删除用户
 * @param {*} user 
 * @returns 
 */
export function deleteUser(user){
    return request({
        url:`User/DeleteUser`,
        method:'post',
        data:user
    
    })
}

