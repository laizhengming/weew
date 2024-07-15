<template>
  <div class="workshow">
    <div class="container">
      <div class="search">
        <div class="search_input">
          <span>搜索</span>
          <el-input
            v-model="input"
            style="width: 240px"
            placeholder="搜索作品、老师"
          />
          <div class="divider-container">
            <el-divider />
          </div>
        </div>
        <div class="sort">
            
          <el-tabs
            v-model="activeName"
            class="demo-tabs"
            @tab-click="handleTabClick"
          > 

            <el-tab-pane label="全部" ></el-tab-pane>
            <el-tab-pane label="公共基础课程" ></el-tab-pane>
            <el-tab-pane label="专业技能课程一组" ></el-tab-pane>
            <el-tab-pane label="专业技能课程二组"></el-tab-pane>
       
          </el-tabs>
          <span>分类</span>
        </div>
        
        <div class="divider-container">
          <el-divider />
        </div>
  
        <div class="rank">
          <el-tabs
            v-model="activeName"
            class="demo-tabs"
            @tab-click="handleTabClick"
          >
            <el-tab-pane label="上传时间"></el-tab-pane>
            <el-tab-pane label="浏览量"></el-tab-pane>
          </el-tabs>
                <span>排序</span>
        </div>
      </div>
      <div class="works">
      <div class="container1">
        <el-card style="max-width: 280px">
          <img src="../assets/img/组 4@2x.png" />
          <div class="time">
            <span>浏览 <a>787878</a></span>
            <span>2021-12-09</span>
          </div>
        </el-card>
        <el-card style="max-width: 280px">
          <img src="../assets/img/组 4@2x.png" />
          <div class="time">
            <span>浏览 <a>787878</a></span>
            <span>2021-12-09</span>
          </div>
        </el-card>
        <el-card style="max-width: 280px">
          <img src="../assets/img/组 4@2x.png" />
          <div class="time">
            <span>浏览 <a>787878</a></span>
            <span>2021-12-09</span>
          </div>
        </el-card>
        <el-card style="max-width: 280px">
          <img src="../assets/img/组 4@2x.png" />
          <div class="time">
            <span>浏览 <a>787878</a></span>
            <span>2021-12-09</span>
          </div>
        </el-card>
        <el-card style="max-width: 280px">
          <img src="../assets/img/组 4@2x.png" />
          <div class="time">
            <span>浏览 <a>787878</a></span>
            <span>2021-12-09</span>
          </div>
        </el-card>
        <el-card style="max-width: 280px">
          <img src="../assets/img/组 4@2x.png" />
          <div class="time">
            <span>浏览 <a>787878</a></span>
            <span>2021-12-09</span>
          </div>
        </el-card>
        <el-card style="max-width: 280px">
          <img src="../assets/img/组 4@2x.png" />
          <div class="time">
            <span>浏览 <a>787878</a></span>
            <span>2021-12-09</span>
          </div>
        </el-card>
        <el-card style="max-width: 280px">
          <img src="../assets/img/组 4@2x.png" />
          <div class="time">
            <span>浏览 <a>787878</a></span>
            <span>2021-12-09</span>
          </div>
        </el-card>
      
      </div>
    </div>
    <div class="demo-pagination-block">
 
    <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
     
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="total, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const input = ref("");
const activeTab = ref("all");
console.log(activeTab);
const pagination=ref({})
const currentPage4 = ref(1);
const pageSize4 = ref(100);
const handleTabClick = (tab) => {
  console.log(tab);
};
</script>

<style lang="scss" scoped>
.workshow {
  margin-top: 2px;
  background-color: #f5f5f5;
  .container {
    width: 1200px;
    height: 100vh;
    margin: 0 auto;
    .search {
      margin-top: 27px;
      height: 150px;
      background: #fff;
    }
  }
}
.search {
  width: 1200px;
  height: 150px;
  font-size: 15px;
}
.search_input {
  color: #333;
  span {
    margin-left: 25px;
  }

  .el-input {
    width: 350px;
    height: 33px;
    margin: 10px;
  }
}
.divider-container {
  width: 1150px;
  margin: 0 auto;
}
.sort {
    position:relative;
  margin-top: 5px;
  margin-left: 85px;
  span{
    position: absolute;
    left:-60px;
    top: -30px;
    margin-top:40px;

  }
}
.rank {
    position: relative;
  margin-left: 85px;
  span{
    position: absolute;
    top:10px;
    left:-60px;

  }
}
.el-tabs {
  height: 45px;
}
:deep(.el-tabs__nav-wrap::after) {
  position: static !important;
}
:deep(.el-tabs__active-bar) {
  background-color: transparent !important;
}
.works {

   background: #f6f7f9;
    .container1 {
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    align-content: baseline;
    flex-wrap: wrap;
      .el-card {
        margin-top: 20px;
        width: 280px;
        height: 175px;
        img {
          width: 240px;
          height: 120px;
        }
        .time {
          color: #787878;
          display: flex;
          justify-content: space-between;
          span {
            margin: 5px;
          }
        }
        a {
          color: #000;
        }
      }
      .more{
  
        margin: 40px auto;
      }
    }

  }
  .demo-pagination-block{
    display: flex;
    justify-content:flex-end;
    margin-top: 60px;
  }
</style>