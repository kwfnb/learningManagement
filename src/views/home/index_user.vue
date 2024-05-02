<template>
  <div class="app-container home">
    亲爱的{{ username }}：你好，欢迎来到足球数据模拟器
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
    };
  },
  mounted() {
    let into = JSON.parse(sessionStorage.getItem("userInto"));
    this.username = into.username;
  },
};
</script>

<style scoped>
.home {
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 45px;
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 700;
}
</style>
