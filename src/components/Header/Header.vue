
<template>
  <div class="header">
    <div class="image">
      <div>
        <img src="../../assets/img/组 4@2x(3).png" alt="" />
      </div>
      <div class="navbar-container">
        <el-menu
          mode="horizontal"
          :default-active="route.fullPath"
          class="navbar"
          router="true"
          :ellipsis="false"
          @select="handleSelect"
        >
          <!-- 导航项 -->
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/game">比赛指南</el-menu-item>
          <el-menu-item index="/works">作品展示</el-menu-item>
          <el-menu-item index="/que">获奖名单</el-menu-item>
          <el-menu-item index="/Participation">我要报名</el-menu-item>
          <el-menu-item v-if="user.user.userType == 2" index="/team"
            >进入专家评审</el-menu-item
          >
        </el-menu>
      </div>
    </div>
    <div class="login">
      <el-button
        style="margin-top: 10px"
        type="primary"
        @click="dialogVisible = true"
        v-if="!user.token"
      >
        登录
      </el-button>
      <div  v-else>
        <el-avatar
          :size="35"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          style="margin-right: 10px;margin-top: 9px;"
        ></el-avatar>

        <el-dropdown style="margin-top: 15px">
          <span class="el-dropdown-link">
            {{ user.user.nickName
            }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item class="image-hover"
                ><img
                  src="../../assets/img/矢量智能对象@2x(4).png"
                  alt=""
                />修改密码</el-dropdown-item
              >
              <el-dropdown-item class="image-hover" @click="logout"
                ><img src="../../assets/img/矢量智能对象@2x(3).png" alt="" />
                退出
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <el-dialog
        v-model="dialogVisible"
        title="欢迎登录！"
        width="530"
        :before-close="handleClose"
      >
        <el-divider />
        <el-form
          ref="reflogin"
          :model="loginForm"
          label-width="120px"
          class="demo-ruleForm"
          :rules="rules"
        >
          <el-form-item label="用户名:" prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input
              v-model="loginForm.password"
              :type="pwdtype"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <div class="eyesicons">
            <img
              src="../../assets/img/矢量智能对象@2x(9).png"
              alt
              @click="changeType()"
            />
          </div>
          <div class="eyesicons2">
            <img
              src="../../assets/img/矢量智能对象@2x(10).png"
              alt
              @click="changeType2()"
            />
          </div>
          <el-form-item>
            <el-button type="primary" @click="submitForm">登录</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ArrowDown } from "@element-plus/icons-vue";
import { useUserStore } from "@/store/index";
import { ElMessage } from "element-plus";
import service from "@/api/request";
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
const user = useUserStore();
const route = useRoute();
const pwdtype = ref("password");
const menushow = ref(false);
const innerVisible = ref(false);
const dialogVisible = ref(false);
const reflogin = ref(null);
const loginForm = reactive({
  username: "",
  password: "",
});
const activeIndex = ref("/");
onMounted(() => {
  getdsitems();
});

const handleSelect = (index) => {
  activeIndex.value = index;
};
const rules = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
  ],
};
const submitForm = () => {
  reflogin.value.validate(async (valid) => {
    if (valid) {
      const res = await user.gettoken(loginForm);
      if (res.data.code == 200) {
        ElMessage.success(res.data.msg);
        user.getuserinfo();

        dialogVisible.value = false;
      } else {
        ElMessage.error(res.data.msg);
      }
    } else {
      ElMessage.error("请输入正确的用户名和密码");
    }
  });
};

const changeType = () => {
  pwdtype.value = "password";
};
const changeType2 = () => {
  pwdtype.value = "text";
};
const getdsitems = async () => {
  const res = await service.get(`biz/dsitems/info?itemId=2`);
  console.log(res);
};
const logout = () => {
  user.cleartoken();
};
</script>


<style lang="scss">
.header {
  box-shadow: 0 5px 10px -5px #e8e9eb;
  display: flex;
  background: #fff;
  justify-content: space-around;
  width: 100%;
  height: 60px;
}
.image {
  display: flex;
  justify-content: space-around;

  align-items: center;
}
.navbar-container {
  margin-left: 20px;
}
img {
  width: 287px;
  height: 40px;
}
.el-menu {
  border-bottom: none !important; /* 取消下划线 */
}
.navbar .el-menu-item {
  border-top: 2px solid transparent; /* 设置上划线为透明，以便在激活时改变颜色 */
  border-bottom: none !important; /* 取消下划线 */
}

.navbar .el-menu-item.is-active {
  border-top: 2px solid #409eff;
  /* 激活状态下的上划线颜色 */
}
.login {
  line-height: 30%;
}
.el-dialog {
  border-radius: 10px !important;
  min-height: 375px;
  .el-button {
    margin-top: 40px !important;
    width: 312px;
    height: 45px;
    display: block;
  }
  .el-input {
    width: 312px;
    margin-top: -5px;
    height: 42px;
  }
}
.el-divider {
  width: 100%;
  margin: 0 !important;
}
.el-form {
  margin-top: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
}
.el-form-item {
  margin-bottom: 20px !important ;
}
.eyesicons {
  position: absolute;
  top: 65px;
  right: 80px;

  cursor: pointer;
  width: 18px;
  height: 15px;
  img {
    width: 100%;
    height: 100%;
  }
}
.eyesicons2 {
  position: absolute;
  top: 65px;
  right: 40px;
  cursor: pointer;
  width: 18px;
  height: 15px;
  img {
    width: 100%;
    height: 100%;
  }
}
.el-dropdown-menu {
  img {
    width: 12px;
    height: 13px;
    margin-right: 10px;
  }
}
.image-hover:first-child:hover img {
  content: url("../../assets/img/矢量智能对象@2x(2).png");
}
.image-hover:last-child:hover img {
  content: url("../../assets/img/矢量智能对象@2x(5).png");
}
</style>