//性别格式化
export const formatterSex = (sexNumber) => {
    return sexNumber == 1 ? "男" : "女";
}

/**
 * 状态格式化
 * @param {*} status  状态数
 * @param {*} type 类型
 * @returns 
 */
export const formatterStatus = (status,type) => {
    if(type==0){// 0 通过 1 不通过 2 待审
        return status == 0?"通过" : status == 1?"不通过" :"待审"
    
    }
    if(type==1){// 0 正常 1 弃用 2 待审
        return status == 0?"正常" : status == 1?"弃用" :"待审"
    }
}

export const formatterTypeKey = (typekey) =>{
    return typekey =="0"?"目录": typekey =="1"?"菜单":"按钮"
}

