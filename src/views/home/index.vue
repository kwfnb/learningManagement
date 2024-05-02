<template>
  <div class="app-container home">
    <div class="itemBox bd3">
      <div class="bd3-item">
        <div class="bd3-title">今日新增社团活动(次)</div>
        <div class="bd3-num">10</div>
      </div>
      <div class="bd3-item">
        <div class="bd3-title">今日活跃人数(人)</div>
        <div class="bd3-num">116</div>
      </div>
      <div class="bd3-item">
        <div class="bd3-title">预计社团活动总费用(￥)</div>
        <div class="bd3-num">12562</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      opData1: {
        xData: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        list: [
          {
            data: [5, 8, 7, 6, 4, 12, 9],
            name: "活动数",
            color: "#F2CC76",
            label: true,
          },
        ],
      },
      opData2: {
        xData: [
          "01/16",
          "01/17",
          "01/18",
          "01/19",
          "01/20",
          "01/21",
          "01/22",
          "01/23",
          "01/24",
          "01/25",
        ],
        list: [
          {
            data: [40, 64, 56, 45, 92, 72, 32, 26, 34, 41],
            name: "活跃人数",
            color: "#E87E82",
          },
        ],
      },
      opData3: {
        xData: ["01/21", "01/22", "01/23", "01/24", "01/25"],
        list: [
          {
            data: [20, 12, 54, 30, 67],
            name: "待审核活动个数",
            color: "#9ECF8E",
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
.home {
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: row;
  white-space: wrap;
  flex-wrap: wrap;
}
.itemBox {
  display: inline-block;
  width: 50%;
  height: 50%;
  padding: 10px;
}
.itemBox:nth-child(1) {
  border-bottom: 1px solid rgb(203, 203, 203);
  border-right: 1px solid rgb(203, 203, 203);
}
.itemBox:nth-child(2) {
  border-bottom: 1px solid rgb(203, 203, 203);
  border-left: 1px solid rgb(203, 203, 203);
}
.itemBox:nth-child(3) {
  border-top: 1px solid rgb(203, 203, 203);
  border-right: 1px solid rgb(203, 203, 203);
}
.itemBox:nth-child(4) {
  border-top: 1px solid rgb(203, 203, 203);
  border-left: 1px solid rgb(203, 203, 203);
}
.bd3 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  div {
    width: 100%;
    text-align: center;
    font-family: "PingFang SC";
    font-style: normal;
    font-weight: 700;
    /* font-size: 18px; */
  }
  .bd3-title {
    margin-bottom: 20px;
    font-size: 18px;
    color: #2c2c2c;
  }
  .bd3-num {
    color: #e64c3a;
    font-size: 35px;
  }
}
</style>
