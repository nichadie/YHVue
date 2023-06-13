import request from "@/utils/request"

/**
 * 获取所有菜单
 * 
 * @returns 
 */
export  function getMenuPermissions(roleid){
    return request({
        url:`MenuPermissions/${roleid}`,
        method:'get',
    })

}


export function changeMenuPer(change){
    return request({
        url:`MenuPermissions/ChangePerMissionAsync`,
        method:'post',
        data:change,
    })

}
