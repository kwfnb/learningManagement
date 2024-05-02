<!--
 * @Descripttion: bar组件4.2
 * @Author: kongwf
 * @Date: 2021-11-04 14:49:45
 * @LastEditors: kongwf
 * @LastEditTime: 2023-01-25 07:05:08
 "id":组件id必须唯一，必传
 "opData":柱形数据 必传 {xData：横向数据数组，list：数据数组}
      =>list item: data数据列表 name对象 color颜色(可不设置即默认) realtimeSort是否以这列数据排序(可不设置即默认false) label该字段是否显示数字
      =>xData item：[]
      =>示例：opData:{xData:['周一','周二','周三'],list:[{data:[12,18,32],name:"刘同学",color:"red",realtimeSort:true,label:true}]}
 "title":题目，可为空 必传
 "titleCenter":题目居中，可为空 必传
 "titleBottom":题目出现在下面，可为空 必传
 "grid":样式，有默认样式，可不传
 "legend":是否出现图例，默认否，可不传
 "bottom":是否出现在下面，默认否，可不传
 "exchange":是否换为y轴显示，默认否，可不传
 "inverse":是否为升序，默认降，可不传
 "max":最大显示数量-1，默认无，可不传
 "axisShow":刻度线是否显示,默认是，可不传
-->
<template>
  <div :id="id" class="bar"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  data() {
    return {
      myChart: null,
      initData: {
        grid: {
          left: "3%",
          right: "4%",
          bottom: "12%",
          /* top: "12%", */
          containLabel: true,
        },
      },
    };
  },
  props: [
    "opData",
    "title",
    "grid",
    "id",
    "legend",
    "bottom",
    "exchange",
    "inverse",
    "max",
    "titleCenter",
    "titleBottom",
    "axisShow",
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
    title: {
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
          type: "bar",
          smooth: this.smooth ? true : false,
          color: this.opData.list[i].color ? this.opData.list[i].color : "",
          realtimeSort: this.opData.list[i].realtimeSort ? true : false,
          label: {
            show: this.opData.list[i].label ? true : false,
            position: "right",
            valueAnimation: true,
          },
        });
      }
      // 绘制图表
      this.myChart.setOption({
        title: {
          text: this.title,
          left: this.titleCenter ? "center" : "",
          bottom: this.titleBottom ? "5" : "",
        },
        tooltip: {
          /* trigger: "axis", */
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: this.legend ? temp : [],
          bottom: this.bottom ? 8 : "",
        },
        toolbox: {
          /* feature: {
            saveAsImage: {},
          }, */
        },
        grid: this.grid ? this.grid : this.initData.grid,
        xAxis: this.exchange
          ? {
              type: "value",
            }
          : {
              type: "category",
              data: this.opData.xData,
              inverse: this.inverse ? true : false,
              axisTick: {
                show: this.axisShow ? false : true, //不显示坐标轴刻度线
              },
              axisLine: {
                show: this.axisShow ? false : true, //不显示坐标轴线
              },
            },
        yAxis: this.exchange
          ? {
              type: "category",
              data: this.opData.xData,
              inverse: this.inverse ? true : false,
              max: this.max ? this.max : "",
              axisTick: {
                show: this.axisShow ? false : true, //不显示坐标轴刻度线
              },
              axisLine: {
                show: this.axisShow ? false : true, //不显示坐标轴线
              },
            }
          : {
              type: "value",
            },
        series: list,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.bar {
  width: 100%;
  height: 100%;
}
</style>
