
module.exports = {
    /**
     * 注销登录
     */
    logout() {
        this.removeToken();
        this.removeRefreshToken();
        this.removeUser();
        this.removePermissions();
        
    },
    /**
     * 验证用户是否登录
     * @returns 登录=true，未登录=false
     */
    isLogin() {
        const token = this.getToken();
        const refreshToken = this.getRefreshToken();
        const user = this.getUser();
        if (token && user && refreshToken)
            return true;
        return false;
    },
    getToken() {
        return localStorage.getItem("Token");
    },
    setToken(token) {
        localStorage.setItem("Token", token);
    },
    removeToken() {
        // console.log("清除token!");
        localStorage.removeItem("Token");
    },
    getRefreshToken() {
        return localStorage.getItem("RefreshToken");
    },
    setRefreshToken(refreshToken) {
        localStorage.setItem("RefreshToken", refreshToken);
    },
    removeRefreshToken() {
        // console.log("清除RefreshToken!");
        localStorage.removeItem("RefreshToken");
    },
    getUser() {
        const user = localStorage.getItem("User");
        return user ? JSON.parse(user) : "";
    },
    setUser(user) {
        
        if (user) {
            localStorage.setItem("User", JSON.stringify(user));
        }
    },
    removeUser() {
        localStorage.removeItem("User");
    },
    // 获取权限
    getPermissions() {
        const permissions = localStorage.getItem("Permissions");
        return permissions ? JSON.parse(permissions) : "";
    },
    //设置权限
    setPermissions(permissions) {
        if (permissions) {
            localStorage.setItem("Permissions", JSON.stringify(permissions));
        }
    },
    //删除权限集合
    removePermissions() {
        localStorage.removeItem("Permissions");
    }
}