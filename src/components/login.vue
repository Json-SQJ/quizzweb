<template>
  <el-container>
    <el-header class="header">
      <div class="logo">
        <router-link to="/">
          <img :src="logoUrl">
        </router-link>
      </div>
    </el-header>
    <el-main>
      <span class="title">
        <strong>登录</strong>
      </span>
      <el-form ref="form" :model="form" class="loginForm" @submit.native.prevent>
        <el-form-item prop="username">
          <el-input class="input" v-model="form.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input class="input"  type="password" v-model="form.password" placeholder="密码"></el-input>
        </el-form-item>
        <p>
          <el-button native-type="submit" class="loginButton" @click="login">登录</el-button>
        </p>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "login",
  data() {
    var check = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("输入不能为空,请重新输入！"));
      }
    };
    return {
      logoUrl: "./static/logo_white.png",
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    login() {
      if (this.form.username == "" || this.form.password == "") {
        this.$message.error("请正确输入用户名和密码");
      } else {
        this.$axios
          .get(this.GLOBAL.URL + "/web/teacher/login", {
            params: {
              username: this.form.username,
              password: this.$md5(this.form.password + "quizz"),
              secret: this.$md5(this.form.username + "quizz")
            }
          })
          .then(function(response) {
            if (response.data.code == 200) {
              localStorage.setItem("username", response.data.data.username);
              localStorage.setItem("userId", response.data.data.id);
              localStorage.setItem("token", response.data.data.token);
              this.$message({
                message: "登录成功！",
                type: "success"
              });
              setTimeout(() => {
                this.$router.push({ name: "mainIndex" });
              }, 2000);
            } else {
              this.$message.error("用户名或密码错误，请重新输入！");
              this.form.username = "";
              this.form.password = "";
            }
          }.bind(this));
      }
    }
  }
};
</script>



<style scoped>
.logo {
  float: left;
  position: relative;
  width: 10%;
  left: 20%;
}

.logo img {
  vertical-align: middle;
}
.main {
  position: relative;
  height: 100%;
}
.el-header {
  background-color: #29a6a6;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
  background-image: url("../../static/bg_login.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

body .el-container {
  height: 100%;
}

.login {
  position: relative;
}
.login ::before {
  position: absolute;
  right: -10px;
  top: 5px;
  content: "";
  width: 1px;
  height: 20px;
  background-color: black;
}
.title {
  position: relative;
  color: #29a6a6;
  font-family: "黑体";
  font-size: 40px;
  top: 80px;
}
.loginForm {
  position: relative;
  height: 100px;
  top: 100px;
}
.input {
  width: 300px;
}
.loginButton {
  width: 300px;
  height: 40px;
  background-color: #29a6a6;
  font-size: 15px;
}
</style>

