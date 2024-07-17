<template>
  <div class="Participation">
    <div class="container">
      <el-tabs
        v-model="activeName"
        type="card"
        class="demo-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane class="message" label="填写基本信息">
          <div>
            <el-button v-show="bianji" class="bianji" type="primary"
              ><img src="../assets/img/矢量智能对象@2x(1).png" />编辑</el-button
            >
            <el-form
              ref="ruleFormRef"
              style="max-width: 600px"
              :model="ruleForm"
              :rules="rules"
              label-width="auto"
              class="demo-ruleForm"
              :size="formSize"
              status-icon
            >
              <el-form-item label="作品名称" prop="name">
                <el-input
                  v-model="rilename"
                  style="width: 440px; height: 45px"
                  placeholder="请输入"
                />
              </el-form-item>

              <el-form-item label="所属分类" prop="region">
                <el-radio-group v-model="radio">
                  <el-radio :value="0">公共基础课程</el-radio>
                  <el-radio :value="1">专业技能课程一组</el-radio>
                  <el-radio :value="2">专业技能课程二组</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="所属课程" prop="phone">
                <el-select
                  v-model="value"
                  placeholder="请选择"
                  size="large"
                  style="width: 440px"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="参赛学校" prop="phone">
                <el-select
                  v-model="value2"
                  placeholder="请选择"
                  size="large"
                  style="width: 440px"
                >
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="参赛者姓名" prop="phone">
                <el-input
                  v-model="textarea"
                  style="width: 440px"
                  :rows="2"
                  type="textarea"
                  height="50px"
                  placeholder="请输入，多人用逗号隔开"
                />
              </el-form-item>
              <el-form-item label="联系方式" prop="name">
                <el-input
                  v-model="phone"
                  style="width: 440px; height: 45px"
                  placeholder="填写一人的联系方式即可"
                />
              </el-form-item>

              <el-button
                style="
                  height: 45px;
                  width: 440px;
                  margin-left: 80px;
                  background-color: #436eff;
                "
                @click="handleClick2"
                type="primary"
                >保存</el-button
              >
              <div class="tijiao">
                <el-button
                  style="
                    height: 45px;
                    width: 212px;
                    margin-left: 80px;
                    background-color: #436eff;
                    color: #fff;
                  "
                  >保存</el-button
                >
                <el-button
                  v-show="bianji"
                  class="clear"
                  style="
                    height: 45px;
                    width: 212px;
                    margin-left: 80px;
                    background-color: #bfc5da;
                  "
                  >取消</el-button
                >
              </div>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="上传参赛作品">
          <div class="k87">
            <div class="video-upload">
              <div class="title">
                <span>*课堂实录</span>
              </div>
              <div>
                <div class="el-upload__text">
                  请上传MP4格式的视频，最多可上传4个视频，且单个视频文件大小不超过500M。
                </div>
                <el-upload
                  :on-success="handleSuccess"
                  :on-error="handleError"
                  :before-upload="beforeUpload"
                  name="videoFile"
                  :file-list="fileList"
                  :on-change="handleChange"
                  :on-remove="handleRemove"
                  list-type="picture-card"
                  :auto-upload="false"
                  limit="4"
                >
                  <el-icon><Plus /></el-icon>

                  <template #file="{ file }">
                    <div>
                      <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url"
                        alt=""
                      />
                      <span class="el-upload-list__item-actions">
                        <span
                          class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file)"
                        >
                          <el-icon><zoom-in /></el-icon>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleDownload(file)"
                        >
                          <el-icon><Download /></el-icon>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file)"
                        >
                          <el-icon><Delete /></el-icon>
                        </span>
                      </span>
                    </div>
                  </template>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                  <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>

                <div v-for="file in fileList" :key="file.uid" class="file-item">
                  <el-image :src="file.url" class="thumbnail"></el-image>
                  <div class="file-info">
                    <el-progress
                      :text-inside="true"
                      :percentage="file.percentage"
                    ></el-progress>
                  </div>
                </div>
              </div>
            </div>
            <div class="teaching">
              <div class="titlespan">
                <span>*教案</span>
                <div class="textupload">
                  <el-upload
                    :action="uploadUrl"
                    :on-progress="handleProgress"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :before-upload="beforeUpload"
                    list-type="text"
                  >
                    <el-button @click="submitUpload('report')">上传</el-button>
                    <div style="margin-top: 15px">
                      <el-progress
                        :percentage="reportProgress"
                        :status="reportStatus"
                      ></el-progress>
                    </div>
                  </el-upload>
                </div>
              </div>
            </div>
            <div class="report">
              <div class="titlespan">
                <span>*教学实施报告</span>
              </div>
            </div>
            <div class="scheme">
              <div class="titlespan">
                <span>*专业人才培养方案</span>
              </div>
            </div>
            <div class="course">
              <div class="titlespan">
                <span>*参赛报名表</span>
              </div>
            </div>
            <div class="apply">
              <div class="titlespan">
                <span>*汇总表</span>
              </div>
            </div>
            <div class="sheet">
              <div class="titlespan">
                <span>*汇总表</span>
              </div>
            </div>
            <div class="statistical">
              <div class="titlespan">
                <span>*比赛情况表</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script setup >
import { ref } from "vue";
import { useUserStore } from "../store/index";
import { ElMessage } from "element-plus";
import service from "../api/request";
const user = useUserStore();
const phone = ref("");
const textarea = ref("");
const value = ref("");
const value2 = ref("");
const fileList = ref([]);
const rilename = ref("");
const radio = ref(3);
const bianji = ref(false);

const options = [
  {
    value: "史政活动课",
    label: "史政活动课",
  },
];
const options2 = [
  {
    value: "⻘岛职业技术学院",
    label: "⻘岛职业技术学院",
  },
];

const handleClick2 = async () => {
  const res = await service.post("biz/dsitems/insert", {
    title: rilename.value, //'标题',
    subTitle: rilename.value,
    // '⼦标题'
    classOne: radio.value, //'⼀级分类 0:思政课组,1:公共基础课程组,2:专业技能课程⼀组,3:专业技能课程⼆
    school: value2.value, //'学校名称'
    teacher: textarea.value, //'参赛教师名称'
    mobile: phone.value, //'联系⽅式（⽼师）',
    userId: user.user.userId,
    //⽤户id
    dsItemSubList: [
      {
        keyWord: "video1",
        url: "/profile/upload/2024/07/02/da_20240702160943A003.mp4",
        fileType: 1,
        subTitle: "da.mp4",
      },
    ],
  });
  console.log(res);
  if (res.data.code === 200) {
    ElMessage.success("提交成功");
    bianji.value = true;
  } else {
    ElMessage.error("提交失败");
  }
};

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);

const handleRemove = (file) => {
  console.log(file);
};

const handlePictureCardPreview = (file) => {
  dialogVisible.value = true;
};

const handleDownload = (file) => {
  console.log(file);
};
</script>

<style scoped lang="scss">
.Participation {
  margin-top: 5px;
  width: 100%;
  background-color: #f5f5f5;
  padding-bottom: 20px;
}
.container {
  height: auto;
  margin: 0 auto;
  width: 1200px;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  background-color: #fff;
}
::v-deep .el-tabs__item {
  width: 560px;
  color: #000;
  height: 55px;
  font-size: 15px;
  background: #f1f1f1;
}
.el-tabs {
  padding-top: 40px;
  margin: 0 auto;
}
::v-deep .el-tabs__item:first-child {
  clip-path: polygon(96% 1%, 0 2%, 0 100%, 96% 100%, 100% 49%);
  margin-right: -25px;
}
::v-deep .el-tabs__item:last-child {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 4% 51%);
}
::v-deep .is-active {
  background: #436eff;
  color: #fff !important;
}
.el-tab-pane {
  display: flex;
  justify-content: center;
}
.tijiao {
  margin-top: 20px;
}
.clear {
  position: relative;
  right: 65px;
}
.bianji {
  position: absolute;
  top: 10px;
  right: 320px;
  background: #436eff;
  img {
    margin-right: 2px;
    width: 10px;
    height: 12px;
  }
}
.k87 {
  margin-bottom: 50px;
  margin-top: 65px;
  border: 1px solid #e9e9e9;
  border-radius: 20px;
  width: 1120px;
  height: 690px;
}
.video-upload {
  height: 220px;
  .title {
    width: 182px;
    border-right: 1px solid #e9e9e9;
    line-height: 182px;
    height: 100%;
    span {
      margin-top: 10px;
      display: block;
      margin-left: 100px;
    }
  }
}

.teaching {
  height: 66px;
  border-bottom: 1px solid #e9e9e9;
  .textupload {
    margin-left: 200px;
  }
}

.report {
  height: 66px;
  border-bottom: 1px solid #e9e9e9;
}

.scheme {
  height: 66px;
  border-bottom: 1px solid #e9e9e9;
}

.course {
  height: 66px;
  border-bottom: 1px solid #e9e9e9;
}

.apply {
  height: 66px;
  border-bottom: 1px solid #e9e9e9;
}

.sheet {
  height: 66px;
  border-bottom: 1px solid #e9e9e9;
}

.statistical {
  height: 66px;
}
.video-upload {
  display: flex;
  justify-content: first baseline;
  border-bottom: 1px solid #e9e9e9;
}

.upload-demo {
  width: 160px;
  height: 90px;
  margin-top: 20px;
}
.file-item {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.thumbnail {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
}
.file-info {
  flex-grow: 1;
}
.el-upload__text {
  color: #b9b9b9;
  margin: 20px;
}
::v-deep .el-upload {
  margin-left: 20px;
}
.titlespan {
  width: 182px;
  border-right: 1px solid #e9e9e9;
  height: 100%;
  span {
    position: relative;
    right: 10px;
    top: 25px;
    width: 100%;
    display: block;
    text-align: end;
  }
}
</style>