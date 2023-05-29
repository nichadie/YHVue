import Vue from "vue";
import config from '@/config/config'

export const hasPermission = (permission) => {
    const rolePermissions = config.getPermissions();
    return rolePermissions.indexOf(permission) > -1;
}