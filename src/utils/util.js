
/**
 * 文件转换base64码
 * @param {文件} file 
 * @returns 
 */
export const fileConvertBase64 = (file, callback) => {
    setTimeout(() => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            let base64 = e.target.result;
            callback(base64);
        };
    }, 10);
}

/**
 * 根据毫秒数延迟执行
 * @param {毫秒数} ms 
 */
export const sleepVue = (ms) => {
    var unixtime_ms = new Date().getTime();
    while (new Date().getTime() < unixtime_ms + ms) {

    }
}