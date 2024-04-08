<template>
  <div class="container">
    <ag-header text="XXX平台" logo="ag-font-home">
      <template #expand>
        <span class="logout" @click="onLogout" title="退出登录"
        ><i class="if-font-ExitToAppOutlined"></i
        >退出</span>
      </template>
    </ag-header>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ElMessageBox } from "jy-element-plus";
import {useRouter} from "vue-router";

const router = useRouter();
const onLogout = () => {
  //
  ElMessageBox.confirm(`确认退出登录吗`, "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
      .then(() => {
        //删除所有信息
        localStorage.removeItem("token");
        //退出到登录页
        router.push("/login");
      })
      .catch(() => {
        //
      });
};
</script>

<style scoped lang="scss">

.logout {
  font-size: 16px;
  cursor: pointer;

  i{
    font-size: 20px;
    margin-right: 3px;
  }

  &:hover{
    color: #E6A23C;
  }
}
</style>
