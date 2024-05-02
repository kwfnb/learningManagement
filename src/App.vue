<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  /* height: 100%; */
}
#app {
  position: relative;
  height: 100vh;
  width: 100%;
}
div {
  box-sizing: border-box;
}
.app-container {
  padding: 15px;
  background: #fff;
  border-radius: 4px;
  height: 100%;
}
div,
span,
p {
  font-family: "PingFang SC";
  font-style: normal;
}
input {
  border: none;
  outline: none;
}
button,
input,
select,
textarea {
  font: 100% PingFangSC-Regular, PingFang SC, Microsoft YaHei;
}
.input-css {
  padding: 10px;
  height: 20px;
  min-width: 220px;
  background: #f7f9fc;
  border-radius: 4px;
  border: 1px solid rgba(227, 231, 235, 0.5);
  font-size: 14px;
  /* color: #808EA5; */
}
</style>
