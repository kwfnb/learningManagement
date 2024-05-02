<template>
  <el-container>
    <el-header>
      <div>贺州学院社团管理系统</div>
      <div>
        <span style="margin-right: 10px">{{ userInto.userName || "" }}</span>
        <i
          style="margin-right: 10px"
          class="el-icon-switch-button"
          @click="outLogin"
        ></i>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px"><asideMenu /></el-aside>
      <div></div>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import asideMenu from "./asideMenu.vue";
export default {
  components: { asideMenu },
  data() {
    return {
      userInto: {},
    };
  },
  methods: {
    outLogin() {
      this.$confirm("退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          sessionStorage.removeItem("isLogin");
          sessionStorage.removeItem("userInto");
          this.$message({
            type: "success",
            message: "已退出登录!",
          });
          this.$router.push({ path: "/login" });
        })
        .catch(() => {});
    },
  },
  mounted() {
    let into = JSON.parse(sessionStorage.getItem("userInto"));
    if (into) {
      this.userInto = into;
    }
  },
};
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-icon-switch-button {
  cursor: pointer;
  font-size: 18px;
}
.el-header {
  padding: 0px 10px;
  background-color: #dc373e;
  color: #fff;
  /* text-align: center; */
  line-height: 60px;
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
}

.el-aside {
  background-color: #fff;
  color: #333;
  overflow-x: hidden;
  /* text-align: center; */
  /* line-height: 200px; */
}

.el-main {
  background-color: #e9eef3;
}
</style>
