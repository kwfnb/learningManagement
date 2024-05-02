<!--
 * @Descripttion: pie组件4.0
 * @Author: kongwf
 * @Date: 2022-04-01 23:36:50
 * @LastEditors: kongwf
 * @LastEditTime: 2023-01-25 06:42:15
 "id":组件id必须唯一，必传
 "opData":饼图数据 必传 {xData：横向数据数组，list：数据数组}
      =>list item: data数据列表 name对象 color颜色(可不传取默认)
      =>xData item：[]
      =>示例：opData:{list:[{value:562,name:"刘同学"},{value:680,name:"王同学"}]}
 "title":题目，可为空 必传
 "titleCenter":题目居中，可为空 可不传
 "grid":样式，有默认样式，可不传
 "toolbox":是否出现下载，默认不下载，可不传
 "legend":是否出现图例，默认否，可不传
 "bottom":是否出现在下面，默认否，可不传
 "radius":圆形大小，默认50%，可不传 数组格式为圆环 例如['40%', '70%']
 "showCenter":标签显示在中心，默认false，可不传
 "emphasis":开启动画放大倍数，默认无，可不传
 "trigger":开启切换图例，默认无，可不传
 "right":图例往右排，默认无，可不传
 "roseType":玫瑰图开启，默认无，可不传
 "border": 加间隔，默认无，可不传
-->
<template>
  <div :id="id" class="pie"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "piew",
  data() {
    return {
      myChart: null,
      initData: {
        grid: {
          left: "3%",
          right: "4%",
          bottom: "12%",
          containLabel: true,
        },
      },
    };
  },
  props: [
    "opData",
    "title",
    "grid",
    "toolbox",
    "id",
    "legend",
    "bottom",
    "radius",
    "titleCenter",
    "showCenter",
    "emphasis",
    "trigger",
    "right",
    "roseType",
    "border",
  ],
  watch: {
    opData: {
      handler: function (newValue, oldValue) {
        this.$nextTick(() => {
          this.setChartOption();
        });
      },
      deep: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.setChartOption();
    });
  },
  methods: {
    setChartOption() {
      // 基于准备好的dom，初始化echarts实例
      if (this.myChart == null) {
        this.myChart = echarts.init(document.getElementById(this.id));
      }
      let temp = [];
      let list = {
        type: "pie",
        radius: this.radius ? this.radius : "50%",
        data: this.opData.list,
        label: {
          show: this.emphasis ? false : true,
          position: this.showCenter ? "center" : "",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: this.emphasis ? this.emphasis : null,
            fontWeight: this.emphasis ? "bold" : null,
          },
        },
        roseType: this.roseType ? "area" : "",
        itemStyle: {
          borderRadius: this.border ? 10 : 0,
          borderColor: this.border ? "#fff" : "",
          borderWidth: this.border ? 2 : 0,
        },
      };
      for (let i = 0; i < this.opData.list.length; i++) {
        temp.push(this.opData.list[i].name);
      }

      let option = {
        title: {
          text: this.title,
          left: this.titleCenter ? "center" : "",
          top: this.titleCenter ? "center" : "",
        },
        tooltip: {
          trigger: this.trigger ? "item" : "",
        },
        toolbox: this.toolbox
          ? {
              feature: {
                saveAsImage: {},
              },
            }
          : {},
        legend: {
          data: this.legend ? temp : [],
          bottom: this.bottom ? 8 : "",
          orient: this.right ? "vertical" : "horizontal",
          x: this.right ? "right" : "center",
        },
        grid: this.grid ? this.grid : this.initData.grid,
        series: list,
      };

      // 绘制图表
      this.myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.pie {
  width: 100%;
  height: 100%;
}
</style>
