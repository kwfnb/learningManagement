<template>
  <div class="box">
    <div class="loginBox" v-loading="isLoading">
      <div class="context" v-if="showLogin">
        <p class="title">账号登录</p>
        <input
          class="inputType"
          v-model="form.username"
          type="text"
          placeholder="请输入账号"
        />
        <input
          class="inputType"
          v-model="form.password"
          @keyup.enter="submitForm()"
          type="password"
          placeholder="请输入密码"
        />
        <!-- <div style="width: 510px; margin-top: 20px; text-align: right">
          <span
            class="text"
            style="cursor: pointer; color: #707070"
            @click="isUser = !isUser"
            >{{ isUser ? "用户身份" : "管理员身份" }}</span
          >
        </div> -->
        <div class="bottom">
          <div class="loginbtn" @click="submitForm()">
            {{ isUser ? "用户登录" : "管理员登录" }}
          </div>
          <div v-if="isUser">
            <span class="text" style="color: #707070">没有账号？</span>
            <span
              class="text"
              @click="switchLogin()"
              style="
                color: #dc373e;
                cursor: pointer;
                border-bottom: 1px solid #dc373e;
              "
              >去注册</span
            >
          </div>
        </div>
      </div>
      <div class="context" v-else>
        <p class="title">注册</p>
        <input
          class="inputType"
          v-model="register.username"
          type="text"
          placeholder="请输入名字"
        />
        <input
          class="inputType"
          v-model="register.password"
          @keyup.enter="submitForm()"
          type="password"
          placeholder="请输入密码，长度为5~12个字符"
        />
        <input
          class="inputType"
          v-model="register.password_t"
          @keyup.enter="submitForm()"
          type="password"
          placeholder="请输入确认密码"
        />
        <div class="bottom">
          <div class="loginbtn" @click="registerForm()">注册</div>
          <div>
            <span class="text" style="color: #707070">{{
              showLogin ? "没有账号？" : "已有账号？"
            }}</span>
            <span
              class="text"
              @click="switchLogin()"
              style="
                color: #dc373e;
                cursor: pointer;
                border-bottom: 1px solid #dc373e;
              "
              >{{ showLogin ? "去注册" : "去登录" }}</span
            >
          </div>
        </div>
      </div>
      <div class="login_logo">
        <img src="../../assets/login_logo.png" />
      </div>
    </div>
  </div>
</template>

<script>
import { userLogin } from "../../api/user.js";
/* import { selectAdminByName } from "../../api/admin.js";
import { selectUserByName,createUser } from "../../api/user.js";
import { generationCode } from "../../util/index.js";
import { sendMail } from "../../api/mail.js"; */
export default {
  name: "login",
  data() {
    return {
      isUser: true,
      isLoading: false,
      showLogin: true,
      disabled: false,
      SMSma: "",
      timeNum: 60,
      timer: null,
      form: {
        username: "",
        password: "",
      },
      register: {
        username: "",
        mail: "",
        password: "",
        SMSma: "",
        password_t: "",
      },
    };
  },
  methods: {
    registerForm() {
      if (
        this.register.mail != "" &&
        this.register.password != "" &&
        this.register.SMSma != ""
      ) {
        let regCN =
          /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (!regCN.test(this.register.mail)) {
          this.$message.error("请输入正确的邮箱格式");
          return;
        }
        if (
          this.register.password.length < 5 ||
          this.register.password.length > 12
        ) {
          this.$message.error("密码长度错误，长度为5~12个字符");
          return;
        }
        if (this.register.SMSma == this.SMSma) {
          if (this.register.password == this.register.password_t) {
            let datas = {
              userName: this.register.username,
              userPassword: this.register.password,
              userMail: this.register.mail,
            };
            createUser(datas)
              .then((res) => {
                this.$message.success("注册成功,请重新输入登录!");
                this.showLogin = !this.showLogin;
                clearTimeout(this.timer);
                this.timer = null;
                this.register = {
                  mail: "",
                  password: "",
                  SMSma: "",
                  password_t: "",
                };
              })
              .catch((err) => {
                this.$message.error(err);
              });
          } else {
            this.$message.error("确认密码不一致");
          }
        } else {
          this.$message.error("验证码错误");
        }
      } else {
        this.$message.error("请输入完整");
      }
    },
    SMSon() {
      this.SMSma = generationCode();
      sendMail({
        userEmail: "1648026562@qq.com",
        to: this.register.mail,
        subject: "验证码",
        text: `您的验证码是：${this.SMSma}，有效时间为1分钟`,
      }).then((res) => {
        /* this.timeNum = 60 */
        /* this.loading = true; */
        this.disabled = true;
        this.$toast("发送成功");
      });
      this.timer = setTimeout(() => {
        this.SMSma = "";
        this.disabled = false;
        this.$message("验证码失效，请重新发送");
      }, 60000);
    },
    upSMS() {
      if (this.disabled) {
        return;
      }
      let regCN =
        /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
      if (!regCN.test(this.register.mail)) {
        this.$message.error("请输入正确的邮箱格式");
      } else {
        this.SMSon();
      }
    },
    submitForm() {
      if (this.form.username != "" && this.form.password != "") {
        this.isLoading = true;
        userLogin({
          username: this.form.username,
          password: this.form.password,
        })
          .then((res) => {
            this.isLoading = false;
            let data = res.data.data;
            sessionStorage.setItem("isLogin", true);
            sessionStorage.setItem("cmp_keyPath", "/homeUser");
            sessionStorage.setItem("userInto", JSON.stringify(data));
            this.$store.dispatch("setUserInto", data);
            this.$message.success(res.data.msg);
            this.$router.push({ path: "/homeUser" });
          })
          .catch((err) => {
            console.log(err);
            this.$message.error(err.response.data.msg);
          })
          .finally(() => {
            this.isLoading = false;
          });
      } else {
        this.$message.error("请输入账号和密码");
        return false;
      }
    },
    switchLogin() {
      this.showLogin = !this.showLogin;
    },
  },
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
  background: url("../../assets/login_bg.jpg") no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loginBox {
  width: 1070px;
  height: 530px;
  background: #fff;
  /* border-radius: 15px; */
  /* box-shadow: 10px 10px rgba(75, 75, 75, 0.3); */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* padding: 15px; */
}
.box_title {
  color: #000;
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  padding-bottom: 15px;
  height: 60px;
}
.context {
  flex: 1;
  height: 100%;
  /* border: 1px solid #000; */
  background: transparent;
  padding: 80px 0px 0px 60px;
  .title {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 18px;
    font-weight: 500;
  }
  .inputType {
    width: 510px;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    height: 30px;
    padding-top: 25px;
    font-size: 100%;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  .SMSType {
    width: 348px;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    height: 30px;
    padding-top: 25px;
    font-size: 100%;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  .SMSBtn {
    color: #dc373e;
    border: 1px solid #dc373e;
    width: 130px;
    height: 30px;
    line-height: 30px;
    background: none;
    border-radius: 6px;
    margin-left: 20px;
    cursor: pointer;
  }
  /* input:focus{
            border: none;
            outline: none;
        } */
  .text {
    font-size: 14px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    user-select: none;
  }
}

.login_logo {
  width: 420px;
  height: 100%;
}
.bottom {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  width: 510px;
  .loginbtn {
    background: #dc373e;
    height: 40px;
    line-height: 40px;
    width: 160px;
    text-align: center;
    font-size: 16px;
    color: #fff;
    font-weight: 400;
    cursor: pointer;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
}
</style>
