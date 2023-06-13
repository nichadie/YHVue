import request from '@/utils/request'

export function uploadimage(formData){
    return request({
        url:`UpFiles/UploadFiles`,
        method:'post',
        data:formData


    })

}

/**
 * 上传文件转换base64码
 * @param {*} formData 
 */
export function FileConvertBase64(formData) {
    return request({
        url: 'Upload/FileConvertBase64',
        method: 'post',
        data: formData,
        // headers: {
        //     // 'Access-Control-Allow-Origin': '*',
        //     // 'Content-Type': 'multipart/form-data'
        // }
    })
}
/**
 * 上传图片转换base64码
 * @param {*} formData 
 */
export function ImageConvertBase64(formData) {
    return request({
        // url: 'http://localhost:5656/api/Upload/ImageConvertBase64',
        // url: 'http://localhost:5959/api/Upload/FileConvertBase64',
        // url: 'http://106.55.35.165:5959/api/Upload/FileConvertBase64',
        url: 'Upload/ImageConvertBase64',
        method: 'post',
        data: formData,
        // headers: {
        //     // 'Access-Control-Allow-Origin': '*',
        //     // 'Content-Type': 'multipart/form-data'
        // }
    })
}