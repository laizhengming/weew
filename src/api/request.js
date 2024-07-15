import axios from 'axios';

const service  = axios.create({
  baseURL: 'https://reg.vip.cpolar.cn/',
  timeout: 5000,
})
service.interceptors.request.use(
    config => {
      const token=localStorage.getItem('token')
      if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
      }
      // 在发送请求之前做些什么
      config.headers['Content-Type'] = 'application/json';
      return config;
    },
    error => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );
  
  // 响应拦截器
  service.interceptors.response.use(
    response => {
      // 对响应数据做点什么
      return response;
    },
    error => {
      // 对响应错误做些什么
      console.error('响应错误:', error);
      return Promise.reject(error);
    }
  );
  
  export default service ;




