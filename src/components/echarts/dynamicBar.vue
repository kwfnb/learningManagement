<!--
 * @Descripttion: dynamicBar组件4.1
 * @Author: kongwf
 * @Date: 2022-04-03 10:14:37
 * @LastEditors: kongwf
 * @LastEditTime: 2023-01-25 06:42:10
  "id":组件id必须唯一，必传
 "opData":动态柱形数据 必传 {xData：横向数据数组，list：数据数组}
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
 "itemStyle":制定item颜色，默认色，可不传
 "axisShow":刻度线是否显示,默认是，可不传
-->
<template>
  <div :id="id" class="bar"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      theData: [],
      myChart: null,
      initData: {
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "12%",
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
      immediate: true,
      handler: function (newValue, oldValue) {
        this.$nextTick(() => {
          this.theData = newValue;
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
      this.dataSet();
    });
  },
  methods: {
    setChartOption() {
      // 基于准备好的dom，初始化echarts实例
      if (this.myChart == null) {
        this.myChart = echarts.init(document.getElementById(this.id));
      }
      var lef = this;
      let temp = [];
      let list = [];
      for (let i = 0; i < this.theData.list.length; i++) {
        temp.push(this.theData.list[i].name);
      }
      for (let i = 0; i < this.theData.list.length; i++) {
        list.push({
          name: this.theData.list[i].name,
          data: this.theData.list[i].data,
          type: "bar",
          smooth: this.smooth ? true : false,
          color: this.theData.list[i].color ? this.theData.list[i].color : "",
          realtimeSort: this.theData.list[i].realtimeSort ? true : false,
          label: {
            show: this.theData.list[i].label ? true : false,
            position: "right",
            valueAnimation: true,
          },
          itemStyle: {
            normal: {
              color: this.theData.list[i].itemStyle
                ? function (params) {
                    return lef.theData.list[i].itemStyle[params.dataIndex];
                  }
                : "",
            },
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
        legend: {
          data: this.legend ? temp : [],
          bottom: this.bottom ? 8 : "",
        },
        toolbox: {},
        grid: this.grid ? this.grid : this.initData.grid,
        xAxis: this.exchange
          ? {
              type: "value",
              show: false,
            }
          : {
              type: "category",
              data: this.theData.xData,
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
              data: this.theData.xData,
              inverse: this.inverse ? true : false,
              max: this.max ? this.max : "",
              animationDuration: 300,
              animationDurationUpdate: 300,
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
        animationDuration: 0,
        animationDurationUpdate: 5000,
        animationEasing: "linear",
        animationEasingUpdate: "linear",
      });
    },
    dataSet() {
      setInterval(() => {
        for (let i = 0; i < this.theData.list[0].data.length; i++) {
          this.theData.list[0].data[i] = Math.round(Math.random() * 2300);
        }
        this.setChartOption();
      }, 5000);
    },
  },
};
</script>

<style lang="scss" scoped>
.bar {
  width: 500px;
  height: 320px;
}
</style>
