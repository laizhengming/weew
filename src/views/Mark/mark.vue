<template>
  <div class="mark">
    <div class="breadcrumb">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>专家评审</el-breadcrumb-item>
        <el-breadcrumb-item>{{ tableData.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="containermark">
      <h1>{{ tableData.title }}</h1>
      <ul class="title">
        <li>所属分类：{{ tableData.classOne }}</li>
        <li>所属课程：{{ tableData.classOneName }}</li>
        <li>提交时间：{{ tableData.createTime }}</li>
      </ul>
      <div class="content">
        <el-table :data="tableData2" border style="width: 1150px">
          <el-table-column
            prop="category"
            width="150"
      
          ></el-table-column>
          <el-table-column>
            <!-- 定义一个插槽，名为scope -->
            <template v-slot="scope">
              <!-- 如果scope.row.type等于'video' -->
              {{scope.row.data[0]}}
              <div v-if="scope.row.data.subTitle == 'da.mp4'">
                <!-- 显示视频缩略图 -->
                <img
                  :src="scope.row.data.url"
                  alt="video thumbnail"
                  style="width: 100px; height: 60px"
                />
                <p></p>
              </div>
              <!-- 否则 -->
              <div v-else>
                <!-- 显示链接 -->
                <el-link :href="scope.row.data.url" target="_blank" type="primary">{{
                  scope.row.title
                }}</el-link>
                <!-- 如果scope.row.preview为真，显示预览文本 -->
                <span v-if="scope.row.preview" class="preview-text"
                  >点击文件，可预览</span
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column width="100">
            <template v-slot="scope">
              <el-button
                v-if="scope.row.downloadable"
                type="primary"
                icon="el-icon-download"
                @click="downloadFile(scope.row.url)"
              >
                下载
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="meeting">
      <h1>评审</h1>
      <ul>
        <li style="width: 160px">
          <span>一级指标</span>
          <p>xxxxxxxxxxxxx评分参考指标（100分）</p>
        </li>
        <li style="width: 160px">
          <span>二级指标</span
          ><span class="zhibiao">教学设计<br />（30分）</span
          ><span class="zhibiao">教学实施<br />（30分）</span
          ><span class="zhibiao">教学效果<br />（20分）</span
          ><span class="zhibiao">特色创新<br />（15分）</span>
        </li>
        <li style="width: 500px">
          <span>评审标准</span>
          <span class="zhibiao" style="font-size: 13px; line-height: 25px"
            >教学目标明确、主题实出、内客合理、策略得当，符合学习者认知特点和人才培养要求；充分、合理运用信息技术、数字资源和信息化教学设施，系统优化敦学过程：数案完整、规范。</span
          ><span class="zhibiao" style="font-size: 13px; line-height: 25px"
            >教学实施与教学方案相符：教学组织与方法得当，教学内容与呈现准确，致学坏节与过渡流畅，做到信息技术与数学的有机融合、突出以生为本“；
            教师教学态度认真、教学严谨、表达规范、技术娴熟。</span
          ><span class="zhibiao" style="font-size: 13px; line-height: 25px"
            >运用信息技术有效完成教学任务，切实解决教学重点和难点问题，促进学习者学习兴趣和学习能力的提高：作品短小节悍，图像洁晰、声音清楚、技术规范、制作美观。</span
          ><span class="zhibiao" style="font-size: 13px; line-height: 25px"
            >理合先进，设计新颖，技实用，具有较强的示范性 与应用性。</span
          >
        </li>
        <li style="width: 150px">
          <span>各项得分</span>
          <span class="zhibiao"
            ><el-input
              type="number"
              v-model.number="input1"
              style="width: 87px; margin-top: 25px"
              :max="30" /></span
          ><span class="zhibiao"
            ><el-input
              type="number"
              v-model.number="input2"
              style="width: 87px; margin-top: 25px"
              :max="30" /></span
          ><span class="zhibiao"
            ><el-input
              type="number"
              v-model.number="input3"
              style="width: 87px; margin-top: 25px"
              :max="20" /></span
          ><span class="zhibiao"
            ><el-input
              type="number"
              v-model.number="input4"
              style="width: 87px; margin-top: 25px"
              :max="15"
          /></span>
        </li>
        <li style="width: 150px">
          <span>总得分</span
          ><el-input
            type="number"
            v-model="sum"
            style="width: 87px; margin-top: 145px; margin-left: 30px"
          />
        </li>
      </ul>

      <div class="idea">
        <h1>评审意见</h1>
        <div style="margin-top: 40px">
          <el-input
            v-model="textarea1"
            style="width: 1100px; height: 120px"
            autosize
            type="textarea"
            placeholder="请输入"
          />
        </div>
      </div>
      <div class="button2">
        <el-button @click="tijiao" type="primary">保存</el-button>
        <el-button type="primary">评审下一个</el-button>
      </div>
    </div>
  </div>
</template>


<script setup>
import service from "@/api/request";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
import { ArrowRight } from "@element-plus/icons-vue";
const input1 = ref(0);
const input2 = ref(0);
const input3 = ref(0);
const input4 = ref(0);
const sum = computed(
  () => input1.value + input2.value + input3.value + input4.value
);
const textarea1 = ref("");

const tableData = ref([]);
// 表格数据
const tableData2 = ref([
  {
    category: "课程实录",
    data:[]
   
  },
  {
    category: "教案",
    data:[]
  },
  {
    category: "教学实施报告",
    data:[]
  },
  {
    category: "专业人才培养方案",
    data:[]
  },
  // 继续添加其他行
]);
onMounted(() => {
  getdata();
});
const getdata = async () => {
  const res = await service.get(
    "biz/dsitems/info?itemId=" + route.query.itemId
  );
  //修改数据中的时间
  res.data.data.createTime = res.data.data.createTime.slice(0, 10);
  //修改分类
  if (res.data.data.classOne == 0) {
    res.data.data.classOne = "思政课组";
  } else if (res.data.data.classOne == 1) {
    res.data.data.classOne = "公共基础课程组";
  } else if (res.data.data.classOne == 2) {
    res.data.data.classOne = "专业技能课程一组";
  } else if (res.data.data.classOne == 3) {
    res.data.data.classOne = "专业技能课程二组";
  }
  tableData.value = res.data.data;
  tableData.value.dsItemSubList.forEach((item) => {
    if (item.category != 0) {
      tableData2.value[0].data.push(item);
      tableData2.value[1].data.push(item);
      tableData2.value[2].data.push(item);
      tableData2.value[3].data.push(item);
    }
  });

     
 
  console.log(tableData.value.dsItemSubList)
  console.log(tableData2.value);
};
const tijiao = async () => {
  const res =await service.post("biz/score/add",  {
  itemId: route.query.itemId,
  mark: textarea1.value,
  dimension1: input1.value,
  dimension2: input2.value,
  dimension3: input3.value,
  dimension4: input4.value,
  dimension5: "8",
  dimension6: "4",
});
console.log(res.data)
  if(res.data.code==200){
    alert("提交成功")
  }else{
    alert(res.data.msg)
  }
};
// 下载文件
const downloadFile = (url) => {
  window.open(url, "_blank");
};
</script>
<style scoped lang="scss">
.mark {
  position: relative;
  height: 1524px;
  background-color: #f1f2f5;
}
.containermark {
  position: relative;
  top: 30px;
  margin: 0 auto;
  width: 1200px;
  height: auto;
  background-color: #fff;
  h1 {
    position: relative;
    top: 20px;
    left: 60px;
    font-size: 28px;
    font-weight: bold;
    color: #333;
  }
  ul {
    //清楚圆圈
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: flex-start;
    padding: 20px;
    li {
      margin-left: 40px;
      font-size: 14px;

      color: #999;
    }
  }
}
.breadcrumb {
  position: absolute;
  top: 10px;
  left: 140px;
}
::v-deep .el-table--border {
  margin: 0 auto;
}
.evaluation-container {
  max-width: 800px;
  margin: 20px auto;
}

.evaluation-card {
  width: 100%;
}

.evaluation-content {
  padding: 20px;
}

.indicators {
  display: flex;
  flex-direction: column;
}

.indicator {
  margin-bottom: 15px;
}

.indicator h3 {
  margin: 0 0 5px;
}

.indicator p {
  margin: 0 0 10px;
  font-size: 14px;
  color: #666;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}
.meeting {
  position: relative;
  top: 40px;
  width: 1200px;
  height: 800px;
  background-color: #fff;
  margin: 0 auto;
  h1 {
    position: relative;
    top: 20px;
    left: 40px;
    font-size: 20px;
    font-weight: bold;
    color: #333;
  }
  ul {
    margin-top: 40px;
    list-style: none;
    display: flex;
    border-radius: 10px;
    li {
      border: 1px solid #e9e9e9;
      overflow: hidden;
      height: 420px;
      span {
        display: block;
        width: 100%;
        height: 60px;
        background: #fafafa;
        border: 1px solid #e9e9e9;
        text-align: center;
        line-height: 60px;
      }
      p {
        display: block;
        width: 100%;
        margin-top: 150px;
        font-size: 12px;
        text-align: center;
      }
      .zhibiao {
        height: 88px;
        background: #fff;
        line-height: 40px;
      }
    }
  }
}
.idea {
  width: 1100px;
  margin: 0 auto;

  h1 {
    font-size: 15px;
    position: relative;
    left: 10px;
  }
}
::v-deep .el-textarea__inner {
  height: 120px !important;
}
.button2 {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
</style>