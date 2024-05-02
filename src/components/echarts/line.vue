<!--
 * @Descripttion: line组件4.0
 * @Author: kongwf
 * @Date: 2021-11-03 15:20:49
 * @LastEditors: kongwf
 * @LastEditTime: 2023-01-25 06:42:12
 "id":组件id必须唯一，必传
 "opData":折线数据 必传 {xData：横向数据数组，list：数据数组}
      =>list item: data数据列表 name对象 color颜色(可不传取默认)
      =>xData item：[]
      =>示例：opData:{xData:['周一','周二','周三'],list:[{data:[12,18,32],name:"刘同学",color:"red"}]}
 "title":题目，可为空 必传
 "grid":样式，有默认样式，可不传
 "tooltip":是否实现弹出框序列排序，默认不排序，可不传
 "toolbox":是否出现下载，默认不下载，可不传
 "legend":是否出现图例，默认否，可不传
 "bottom":是否出现在下面，默认否，可不传
 "smooth":是否以平滑，默认否，可不传
 "scale": y轴是否从零开始，默认从零，可不传
-->
<template>
  <div :id="id" class="line"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "linew",
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
    "tooltip",
    "toolbox",
    "id",
    "legend",
    "bottom",
    "smooth",
    "scale",
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
      let list = [];
      for (let i = 0; i < this.opData.list.length; i++) {
        temp.push(this.opData.list[i].name);
      }
      for (let i = 0; i < this.opData.list.length; i++) {
        list.push({
          name: this.opData.list[i].name,
          data: this.opData.list[i].data,
          type: "line",
          smooth: this.smooth ? true : false,
          color: this.opData.list[i].color ? this.opData.list[i].color : "",
        });
      }

      let option = {
        title: {
          text: this.title,
        },
        //弹出框信息排序
        tooltip: this.tooltip
          ? {
              trigger: "axis",
              formatter: function (params) {
                let newParams = [];
                let tooltipString = [];
                newParams = [...params];
                newParams.sort((a, b) => {
                  return b.value - a.value;
                });
                newParams.forEach((p) => {
                  const cont =
                    p.marker + " " + p.seriesName + ": " + p.value + "<br/>";
                  tooltipString.push(cont);
                });
                return tooltipString.join("");
              },
              textStyle: {
                align: "left",
              },
            }
          : {
              trigger: "axis",
              axisPointer: {
                type: "shadow",
              },
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
        },
        grid: this.grid ? this.grid : this.initData.grid,
        xAxis: {
          type: "category",
          data: this.opData.xData,
        },
        yAxis: {
          scale: this.scale ? true : false,
          type: "value",
        },
        series: list,
      };

      // 绘制图表
      this.myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.line {
  width: 100%;
  height: 100%;
}
</style>
