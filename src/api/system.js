import request from '@/utils/request'

/**
 * 获取系统首页展示数据
 * @param {取多少数据} topTotal 
 * @returns 
 */
export const getAdminHomeData = (topTotal) => {
    return request({
        url: `System/GetAdminHomeData`,
        method: `GET`,
        params: {
            topTotal
        }
    });
}