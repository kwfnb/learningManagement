<template>
  <div class="home">
    <div class="formDiv">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="球员名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age" type="number"></el-input>
        </el-form-item>
        <el-form-item label="位置">
          <el-radio-group v-model="form.position">
            <el-radio label="前锋"></el-radio>
            <el-radio label="中场"></el-radio>
            <el-radio label="后卫"></el-radio>
            <el-radio label="守门员"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="路线">
          <el-radio-group v-model="form.line">
            <el-radio label="左路"></el-radio>
            <el-radio label="中路"></el-radio>
            <el-radio label="右路"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="射门">
          <el-slider v-model="form.sho" show-input> </el-slider>
        </el-form-item>
        <el-form-item label="传球">
          <el-slider v-model="form.pas" show-input> </el-slider>
        </el-form-item>
        <el-form-item label="盘带">
          <el-slider v-model="form.dri" show-input> </el-slider>
        </el-form-item>
        <el-form-item label="速度">
          <el-slider v-model="form.pac" show-input> </el-slider>
        </el-form-item>
        <el-form-item label="防守">
          <el-slider v-model="form.def" show-input> </el-slider>
        </el-form-item>
        <el-form-item label="身体">
          <el-slider v-model="form.phy" show-input> </el-slider>
        </el-form-item>
        <el-form-item label="总评">
          {{ totalScore }}
          <!-- <el-input value="0" type="number" disabled></el-input> -->
          <!-- <el-slider v-model="form.phy" show-input> </el-slider> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="reData">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableDiv">
      <el-table width="100%" :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="球员名称"> </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="position" label="位置"> </el-table-column>
        <el-table-column prop="line" label="路线"> </el-table-column>
        <el-table-column prop="sho" label="射门"> </el-table-column>
        <el-table-column prop="pas" label="传球"> </el-table-column>
        <el-table-column prop="dri" label="盘带"> </el-table-column>
        <el-table-column prop="pac" label="速度"> </el-table-column>
        <el-table-column prop="def" label="防守"> </el-table-column>
        <el-table-column prop="phy" label="身体"> </el-table-column>
        <el-table-column label="总评">
          <template slot-scope="scope">
            {{ getTotalScore(scope.row) }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { saveObject, getObject } from "../api/league";
import { calculateOverall } from "../utils/data.js";

export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      tableData: [],
      form: {},
    };
  },
  mounted() {
    this.reData();
    this.getData();
  },
  computed: {
    totalScore() {
      return calculateOverall(this.form);
    },
  },
  methods: {
    getTotalScore(form) {
      return calculateOverall(form);
    },
    onSubmit() {
      this.saveData(this.form);
    },
    reData() {
      this.form = {
        name: "",
        sho: 50,
        pas: 50,
        dri: 50,
        pac: 50,
        def: 50,
        phy: 50,
        position: "前锋",
        line: "左路",
      };
    },
    saveData(data) {
      saveObject(data).then((res) => {
        this.reData();
        /* console.log(res); */
        this.getData();
      });
    },
    getData(data) {
      getObject().then((res) => {
        console.log(res.data);
        this.tableData = res.data;
      });
    },
  },
};
</script>
<style scoped>
.home {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.formDiv {
  min-width: 600px;
}
.tableDiv {
  width: 100%;
}
</style>
