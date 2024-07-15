import { ref } from 'vue';
import { defineStore} from 'pinia';
import service from '@/api/request';



export const useUserStore = defineStore('user', () => {
  const token = ref("");
  const user = ref({})
  const gettoken = async (data) => {
    const res = await service.post('/login', data);
    token.value = res.data.token;
    localStorage.setItem('token', res.data.token);
    return res;
  };
  const getuserinfo = async () => {
    const res = await service.get('/getInfo');
     user.value = res.data.dsUser;

  }
  const cleartoken = () => {
    localStorage.removeItem('token');
    token.value = "";
  }
  return {
    token,
    user,
    gettoken,
    cleartoken,
    getuserinfo
  };
}, {
  persist: true,
});