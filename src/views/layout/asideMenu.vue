<template>
  <el-menu
    :default-active="defaultActive"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @select="handleSelect"
    router
    :default-openeds="openeds"
    @close="handleClose"
  >
    <div v-for="(item, index) in menuList" :key="index">
      <el-menu-item :index="item.path" v-if="item.path">
        <i :class="item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
      <el-submenu :index="index + ''" v-else>
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item
          v-for="(itemo, indexo) in item.itemList"
          :key="indexo"
          :index="itemo.path"
          >{{ itemo.title }}</el-menu-item
        >
      </el-submenu>
    </div>
  </el-menu>
</template>

<script>
import menuList from "../../utils/menuList.js";
export default {
  data() {
    return {
      menuList: [],
      defaultActive: "/home",
      openeds: ["0", "1", "2", "3", "4", "5"],
    };
  },
  mounted() {
    console.log(menuList);
    /* let v = sessionStorage.getItem("version"); */
    let v = 1;
    switch (this.$store.state.user.userIdentity) {
      case "管理员":
        v = 0;
        break;
      case "普通用户":
        v = 1;
        break;
    }
    console.log("v", v);
    this.menuList = menuList[v];
    let path = sessionStorage.getItem("cmp_keyPath");
    if (path) {
      this.defaultActive = path;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      /* console.log(key, keyPath); */
    },
    handleClose(key, keyPath) {
      /* console.log(key, keyPath); */
    },
    handleSelect(keyPath) {
      /* sessionStorage.setItem("cmp_keyPath", keyPath); */
    },
  },
};
</script>

<style scoped>
.el-menu-vertical-demo {
  width: 100%;
}
</style>
