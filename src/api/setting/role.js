import request from "@/utils/request"
/**
 * 获取角色列表
 * @param {*} pageIndex 
 * @param {*} pageSize 
 * @returns 
 */
export  function getRolePageList(pageIndex,pageSize){
    return request({
        url:`Role/GetRoleListPage?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        method:'get',
    })

}
/**
 * 添加角色
 * @param {*} user 
 * @returns 
 */
export function addRole(role){
    return request({
        url:`Role/AddRoleAsync`,
        method:'post',
        data:role
    
    })
}


/**
 * 删除角色
 * @param {*} user 
 * @returns 
 */
export function deleteRole(role){
    return request({
        url:`Role/DeleteRoleAsync`,
        method:'post',
        data:role
    
    })
}
