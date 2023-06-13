import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import config from '@/config/config'
import router from '@/router/index.js'
import { baseApiUrl } from '@/utils/variate'

// 创建axios对象
const service = axios.create({
  baseURL: baseApiUrl, // 请求基地址
  timeout: 10000 //请求时间
})

// axios请求拦截器
service.interceptors.request.use(
  options => {
    //获取token
    const token = config.getToken();
    const refreshToken = config.getRefreshToken();
    //console.log("token：", token);
    if (token) {
      //设置token到请求头的Authorization
      options.headers.Authorization = "Bearer " + token;
      options.headers["X-Authorization"] = "Bearer " + refreshToken;
    }
    return options;
  },
  error => {
    return Promise.reject(error)
  }
)

// axios响应拦截器
service.interceptors.response.use(response => {
  const res = response.data
  // console.log(res);
  if (res.code && (res.code !== 200 || res.code == -1)) {
    if (res.message) {
      // 错误提示
      Message({
        message: res.message || '服务器返回错误异常！',
        type: 'error',
        duration: 3 * 1000
      })

      return Promise.reject(new Error(res || 'Error'))
    }
  } else {
    return res;
  }
}, error => {
  if (error.response) {
    //后端接口没有调用成功
    if (error.response.status > 500 || error.response.status == 404) {
      Message.error({ message: '服务器接口调用出现异常！' });
    } else if (error.response.status == 403) {
      Message.error({ message: '您没有权限执行该操作，请联系管理员获取权限！' });
    }
    else if (error.response.status == 429) {
      Message.error({ message: '您访问的次数过于频繁，系统繁忙！' });
    }
    else if (error.response.status == 401) {
      console.log(error.response.headers);
      console.log(error.response.headers["token-expired"]);
      // 判断是否token过期了
      if (error.response.headers && error.response.headers["token-expired"] == "true") {
        // if (true) {
        // Message.error({ message: '登录凭证过期，请重新登录用户！' });
        MessageBox.confirm('登录凭证失效了，是否刷新登录凭证或重新登录！', '登录失效提示', {
          confirmButtonText: '刷新凭证',
          cancelButtonText: '重新登录',
          type: 'warning'
        }).then(() => {
          // 请求更新token
          service.post('Auth/RefreshToken').then(res => {
            console.log("刷新token返回结果：", res);
            if (res.code == -1) {
              Message.error({ message: res.message });
              config.logout();  //注销登录
              //跳转到登录页面
              router.replace('/login');
              return;
            }

            if (res.code == 200) {
              //存储更新后的token
              config.setToken(res.data.token);
              config.setRefreshToken(res.data.refreshToken);
              // Message.warning({ message: '登录凭证失效刷新了，请刷新页面!' });
              //刷新页面
              location.reload();
              console.log("过期token已刷新成功！");
              // 继续之前的请求
              // return service(error.response.config).then(result => result.data)
              return;
            }
          }).catch(err => {
            //跳转到登录页面
            router.replace('/login');
            console.log(err);
          })
        }).catch(() => {
          config.logout();  //注销登录
          router.replace('/login');
        })
        return;
      }
      Message.error({ message: '没有权限访问该接口！' });

      return;
    }
    else {
      if (error.response.data.message) {
        Message.error({ message: error.response.data.message });
      } else {
        Message.error('响应了未知错误！');
      }
    }
  } else {
    Message.error({ message: '数据接口调用异常！' });
  }

  return Promise.reject(error)
})

export default service
