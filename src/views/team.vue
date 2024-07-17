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
            @change="handleFilterChange"
            v-model="filterStatus"
            placeholder="请选择评分状态"
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
      <div class="jsp">
        <el-table
          :data="pagedata"
          style="width: 100%; border: 1px solid #e3e5ea"
        >
          <el-table-column label="序号" width="80">
            <!--序号-->
            <template #default="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="作品名称" width="600px">
            <template #default="scope" style="width: 50px">
              {{ pagedata[scope.$index].title }}
            </template>
          </el-table-column>
          <el-table-column label="提交时间" width="200px">
            <template #default="scope" style="width: 50px">
              {{ pagedata[scope.$index].createTime }}
            </template></el-table-column
          >
          <el-table-column label="状态" width="150px" style="color: red">
            <template #default="scope" style="width: 50px">
              <span
                :style="`color:${
                  pagedata[scope.$index].isApprove === '未评分'
                    ? 'red'
                    : 'black'
                }`"
                >{{ pagedata[scope.$index].isApprove }}</span
              >
            </template></el-table-column
          >
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                type="text"
                @click="handleEdit(scope.row, scope.$index)"
                >评分</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="params.pageSize"
          :size="size"
          :disabled="disabled"
          background
          layout="total, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  <el-dialog
    v-model="dialogVisible"
    width="1100"
    :before-close="handleClose"
  > 
  <h1 class="text-center" style="font-size: 30px;color: #000; font-weight: bold;text-align: center">承诺书</h1>
    <span>一、本人自愿加入专家评委库，并严格通守其他各项规定和纪律，客现公正地为本次大开展评审工作。</span><br/>
    <span>二、本人将严格通守大赛评选工作的保密义务，不使用或拔露，也不许可他人使用或技器在评进工作中获悉的梦费企业和国队的基本估息、观点、想法、创意、知识产权、暂力成果、技术方法、商业计划、财务信息等商业秘密。</span><br/>
    <span>三、本人将严格技服大费评选规则、规程，以严肃相学的志度，客观公正、实事水是、专业独立地参与选工作，提出评隐息见，并对评港息见的真实性、公正性负责。</span><br/>
    <span>四、本人保证设入足够的时间精力，按时参加大赛评选相关工作，并愿通过电子部件、手机信和电等方式供得大组会有关评选工作的通知信息。</span><br/>
    <span>五、本人与参赛企业或队在在利害关嘉，可能影评工作的公正、本人将及时向大赛组费会声明共提出道申通，如发现其他评委也存在相同情，本人也将及时向大赛组委会反映情况。</span><br/>
    <span>六、未经大赛组委会授权，本人不以任式与参赛企业或个人联系。</span><br/>
    <span>七、未经大赛组委会授权，本人不以大赛评要名义参与任何与大赛评选无关的活动，也不以大赛评要名义对外发表任何评论。</span><br/>
    <span>八、本人担任本次大赛的评委已经取得了应当取得的所有授权、许司、同息、批准，并不会违反对本人适用的法律、法规或本人已经签订的合同，协议或其他文件。</span><br/>
    <span>九、本人承诺只在大赛组委会授权的范国内进行评进工作，不超授权权，并且不利用职务之便为自息、他人以及所在工作机构谋得利益。</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">我已阅读且同意</el-button>
        <el-button  @click="dialogVisible = true">
          不同意
        </el-button>
      </div>
    </template>
  </el-dialog>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ElSelect, ElOption } from "element-plus";
import { ref, onMounted, computed, watch } from "vue";
import service from "@/api/request";
import { useUserStore } from "@/store/index";
const router = useRouter();
const route = useRoute();
const user = useUserStore();
console.log(user.islogin);
const currentPage = ref(1);
const selectedStatus = ref("");
const total = ref(0);
const pagedata = ref([]);
const input = ref("");
const filterStatus = ref("");
const pingjia = ref("");
const dialogVisible = ref(true)
const handleClose =(e)=>{
  console.log(e)
}
const options = [
  { value: "已评分", label: "已评分" },
  { value: "未评分", label: "未评分" },
  // 可以根据需要添加更多选项
];
const params = ref({
  pageNum: 1,
  pageSize: 10,
  isApprove: pingjia,
  title: input,
});
//序号
computed(() => {
  (currentPage.value - 1) * params.pageSize + 1;
});

onMounted(() => {
  if (user.islogin) {
    getlist();
  }
  if(user.user.readFlag===0){
    dialogVisible.value=true
  }else{
    dialogVisible.value=false
  }
});
console.log(params.value);

const getlist = async () => {
  const res = await service.post("biz/score/list", params.value);
  console.log(res);
  //修改数据中的时间
  for (let i = 0; i < res.data.data.rows.length; i++) {
    res.data.data.rows[i].createTime = res.data.data.rows[i].createTime.slice(
      0,
      10
    );
  }
  for (let i = 0; i < res.data.data.rows.length; i++) {
    if (res.data.data.rows[i].isApprove == 0) {
   
      res.data.data.rows[i].isApprove = `未评分`;
    } else {
      res.data.data.rows[i].isApprove = `已评分`;
    }
  }
  pagedata.value = res.data.data.rows;
  total.value = res.data.data.total;
};

const handleCurrentChange = (newPage) => {
  params.value.pageNum = newPage;
  getlist();
};

// 监听请求参数变化，重新请求数据
watch(
  () => params.value,
  (newParams) => {
    getlist();
  },
  { deep: true }
);
const handleFilterChange = (item) => {
  if (item == "已评分") {
    pingjia.value = 1;
  } else {
    pingjia.value = 0;
  }
  console.log(pingjia.value);
};

const handleEdit = (row, index) => {
  console.log(row.itemId);
  router.push({
    path: "/mark",
    query: { itemId: row.itemId },
  });
};
</script>

<style scoped lang="scss">
.team {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  background: #f5f5f5;
}
.containerteam {
  width: 1200px;
  height: 1000px;
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
.content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 40px;
}
.jsp {
  width: 1120px;
  height: auto;
  background: #f1f3f8;
  margin: 0px auto;
  margin-top: 20px;
}
.pagination {
  float: right;
  margin-top: 40px;
  margin-right: 40px;
}
.dialog-footer{
  display: flex;
  justify-content: center;
  align-items: center
}
</style>