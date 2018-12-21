<template>
  <el-container>
    <el-header class="header">
      <div class="logo">
       <router-link to="/"> <img :src="logoUrl"></router-link>
      </div>
      <div class="meun">
        <ul>
          <li class="selectLi">
            <img :src="home" class="icon iconhome">
          </li>
          <li class="selectLi title">
            <router-link to="/mainIndex">首页</router-link>
          </li>
          <li class="selectLi">
            <img :src="no" class="icon iconhome">
          </li>
          <li class="selectLi title"><router-link to="/problemBank">题库</router-link></li>
        </ul>
      </div>
      <div class="select">
        <ul class="selectUl">
          <li class="selectLi">
            <img class="avatar" :src="avatar">
          </li>
          <li class="selectLi">
            <el-dropdown>
              <span class="el-dropdown-link">
                {{username}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link to="/changePwd">修改密码</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span @click="logout">退出登录</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </div>
    </el-header>
    <el-main>
      <div class="registerHead">
        <span class="registerTitle">修改密码</span>
      </div>
      <div class="formBack">
        <div class="registerForm">
          <el-form ref="form" :rules="rules" :model="form" class="demo-ruleForm">
            <el-form-item prop="passwordBefore">
              <el-input
                class="input"
                type="password"
                v-model="form.passwordBefore"
                placeholder="请输入您的原密码"
              ></el-input>
            </el-form-item>
            <el-form-item prop="passwordNew">
              <el-input
                class="input"
                type="password"
                v-model="form.passwordNew"
                placeholder="请输入您的密码"
              ></el-input>
            </el-form-item>
            <el-form-item prop="passwordNewRepeat">
              <el-input
                class="input"
                type="password"
                v-model="form.passwordNewRepeat"
                placeholder="请再次输入您的密码"
              ></el-input>
            </el-form-item>
            <p>
              <el-button class="registerButton" @click="changePwd">修改</el-button>
            </p>
            <p>
              <span class="registerComment">修改后请用新密码登陆</span>
            </p>
          </el-form>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "index",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.passwordNew) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      logoUrl: "./static/logo.png",
      picUrl: "./static/pic.png",
      titleUrl: "./static/title.png",
      form: {
        passwordBefore: "",
        passwordNew: "",
        passwordNewRepeat: ""
      },
      avatar: "./static/avatar.png",
      home: "./static/home_green.png",
      no: "./static/no_green.png",
      username: "",
      token: "",
      rules: {
        passwordNew: [
          { validator: validatePass, trigger: "blur" },
          { min: 6, max: 20, message: "密码长度为6-20位", trigger: "blur" }
        ],
        passwordNewRepeat: [
          { validator: validatePass2, trigger: "blur" },
          { min: 6, max: 20, message: "密码长度为6-20位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    logout() {
      this.$axios
        .get(this.GLOBAL.URL + "/web/teacher/logout", {
          headers: { userId: localStorage.getItem("userId"), token: this.token }
        })
        .then(
          function(res) {
            if (res.data.code == 200) {
              this.$message({
                message: "退出登录成功……",
                type: "success"
              });
              localStorage.removeItem("username");
              localStorage.removeItem("userId");
              localStorage.removeItem("token");
              setTimeout(() => {
                this.$router.push({ name: "index" });
              }, 2000);
            }
          }.bind(this)
        );
    },
    changePwd() {
      var username = localStorage.getItem("username");
      this.$axios
        .get(this.GLOBAL.URL + "/web/teacher/changePwd", {
          headers: {
            userId: localStorage.getItem("userId"),
            token: this.token
          },
          params: {
            username: username,
            passwordBefore: this.$md5(this.form.passwordBefore + "quizz"),
            password: this.$md5(this.form.passwordNew + "quizz")
          }
        })
        .then(
          function(res) {
            if (res.data.code == 200) {
              this.$message({
                message: "密码修改成功，请重新登录！",
                type: "success"
              });
              localStorage.removeItem("username");
              localStorage.removeItem("userId");
              localStorage.removeItem("token");
              setTimeout(() => {
                this.$router.push({ name: "login" });
              }, 2000);
            } else {
              this.$message.error("原密码错误！请重新输入……");
            }
          }.bind(this)
        );
    }
  },
  created() {
    this.username = localStorage.getItem("username");
    this.token = localStorage.getItem("token");
    this.GLOBAL.checkToken(this.token);
  }
};
</script>


<style scoped>
.select {
  position: relative;
  float: right;
  right: 25%;
  width: 300px;
  height: 100%;
  font-family: "黑体";
  line-height: 30px;
}
.meun {
  color: #29a6a6;
  position: relative;
  left: 18%;
  float: left;
  width: 300px;
  height: 100%;
  font-family: "黑体";
  line-height: 30px;
}
.logo {
  float: left;
  position: relative;
  width: 10%;
  left: 20%;
}

.logo img {
  vertical-align: middle;
}

.el-header {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  color: #333;
  background-image: url("../../static/bg_login.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

body .el-container {
  height: 100%;
}

.registerHead {
  top: 100px;
  margin: 0 auto;
  position: relative;
  background-color: #29a6a6;
  height: 86px;
  width: 1000px;
}

.registerTitle {
  line-height: 86px;
  color: white;
  font-size: 24px;
}
.registerForm {
  top: 40px;
  margin: 0 auto;
  position: relative;
  height: 350px;
  width: 400px;
}
.formBack {
  top: 100px;
  margin: 0 auto;
  position: relative;
  background-color: white;
  height: 350px;
  width: 1000px;
}

.registerButton {
  position: relative;
  width: 300px;
  height: 40px;
  top: 40px;
  background-color: #29a6a6;
  color: white;
  font-size: 16px;
}
.registerComment {
  position: relative;
  width: 300px;
  height: 40px;
  top: 40px;
  font-size: 10px;
  font-family: "黑体";
}

.selectLi {
  list-style: none;
  float: left;
  margin-left: 20px;
}
.selectUl {
  position: relative;
  vertical-align: middle;
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

.avatar {
  height: 30px;
  width: 30px;
  border-radius: 50%;
}
.iconhome {
  position: relative;
  top: 5px;
}
.title {
  margin-left: 2px;
}
.icon {
  height: 20px;
  line-height: 100%;
}
</style>
