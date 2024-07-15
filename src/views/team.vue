<template>
  <div class="team">
    <div class="containerteam">
      <div class="header">
        <img src="../assets/img/组 2 拷贝@2x.png" alt="" />
        <div class="header-text">
          <span>专家评审您好！</span>
          <span
            >您评审的分类为：公共基础课程组，评审的课程为：汽车运用与维修技术</span
          >
        </div>
      </div>
      <div class="content">
        <div class="content-header">
          <span>作品名称</span>

          <el-input
            class="no-border-input"
            v-model="input"
            style="width: 240px"
            placeholder="请输入"
          />
        </div>
        <div>
          <el-select
            v-model="value"
            
            size="large"
            style="width: 240px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const input = ref("");
const value = ref('')
const options = [
  {
    value: 'Option1',
    label: '已评分',
  },
  {
    value: 'Option2',
    label: '未评分',
  }
]
</script>

<style scoped lang="scss">
.team {
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
}
.containerteam {
  width: 1200px;
  height: auto;
  margin: 0px auto;
  background: #fff;
  border-radius: 10px;
}
.header {
  position: relative;
  height: 114px;
  img {
    width: 1120px;
    height: 87px;
  }
  .header-text {
    position: absolute;
    top: 20px;
    left: 80px;
    display: flex;
    flex-direction: column;
    span:nth-child(1) {
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #fff;
    }
    span:nth-child(2) {
      color: #fff;
      margin-top: 5px;
    }
  }
}
.content-header {
  width: 306px;
  height: 40px;
  background: #fff;
  border: 1px solid #e3e5ea;
  border-radius: 5px;
  .el-input {
    width: 240px;
    height: 40px;
    border: 0;
  }
}
::v-deep .el-input__wrapper {
  border: none;
  box-shadow: none;
}
::v-deep .el-input__wrapper:focus {
  border: none;
  box-shadow: none;
}
.content{
  display: flex;
  justify-content: flex-start;
  align-items: center;
 
  padding: 20px 80px;
}
</style>