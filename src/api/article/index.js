import request from "@/utils/request"

/**
 * 获取文章分页数据
 * @param {当前页数} pageIndex 
 * @param {每页显示数} pageSize 
 * @param {条件} params 
 * @returns 
 */
export function selectArticlePaging(pageIndex, pageSize, params) {
    return request({
        url: `article/selectArticlePaging?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        method: "get",
        params
    });
}
/**
 * 查询最新热门文章
 * @param {要获取的数据行数} topCount 
 * @returns 
 */
export function selectNewArticles(topCount) {
    return request({
        url: `article/SelectNewArticles/${topCount}`,
        method: 'get'
    });
}
/**
 * 查询文章详情
 * @param {编号} id 
 * @returns 
 */
export function findArticle(id) {
    return request({
        url: 'article/' + id,
        method: 'get'
    });
}
/**
 * 新增文章数据
 * @param {*} data 文章数据
 * @returns 
 */
export function addArticle(data) {
    return request({
        url: `article`,
        method: "post",
        data
    });
}
/**
 * 删除文章数据
 * @param {*} id 编号
 */
export function deleteArticle(id) {
    return request({
        url: `article/${id}`,
        method: 'delete'
    });
}

/**
 * 更新文章数据
 * @param {*} data 文章数据
 * @returns 
 */
export function updateArticle(data) {
    return request({
        url: 'article',
        method: 'put',
        data
    })
}