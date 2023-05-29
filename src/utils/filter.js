/**
 * 过滤内容中的html标签
 * @param {*} val 过滤的值
 * @returns 过滤后的值
 */
export const filterHtml = val => {
    return val.replace(/<[^>]*>/g, '');
}

/**
 * 过滤日期时间中的T字符
 * @param {*} val 过滤的日期时间
 * @returns 过滤后的日期时间
 */
export const filterDateTime = val => {
    // console.log(val);
    if (val != null) {

        let datetime = val.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
        let number = datetime.lastIndexOf('.');
        if (number != -1) {
            datetime = datetime.substring(0, number);
        }

        return datetime;
    } else {

        return "";
    }

    // return val.replace(/T/g, ' ').replace(/Z/g, '');
}