import { ref } from 'vue';
import { defineStore} from 'pinia';
import service from '@/api/request';



export const useUserStore = defineStore('user', () => {
  const token = ref("");
  const user = ref({});
  let islogin=ref(false)
  const gettoken = async (data) => {
    const res = await service.post('/login', data);
    token.value = res.data.token;
    localStorage.setItem('token', res.data.token);
    return res;
  };
  const getuserinfo = async () => {
    const res = await service.get('/getInfo');
     if(res.data.code==200){
      user.value = res.data.dsUser;
       if(res.data.dsUser.userType==2){
           islogin.value=true
       }
     }

  }
  const cleartoken = () => {
    localStorage.removeItem('token');
    token.value = "";
    user.value="";
  }
  return {
    islogin,
    token,
    user,
    gettoken,
    cleartoken,
    getuserinfo
  };
}, {
  persist: true,
});