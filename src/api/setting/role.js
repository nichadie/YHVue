import request from "@/utils/request"
/**
 * 
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