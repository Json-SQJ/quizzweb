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
      <div class="registerHead">
        <span class="registerTitle">注册</span>
      </div>
      <div class="formBack">
        <div class="registerForm">
          <el-form ref="form" class="demo-ruleForm" :rules="rules" :model="form">
            <el-form-item prop="username">
              <el-input
                class="input"
                v-model="form.username"
                placeholder="请输入用户名"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                class="input"
                type="password"
                v-model="form.password"
                placeholder="请输入您的密码"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item prop="passwordRepet">
              <el-input
                class="input"
                type="password"
                v-model="form.passwordRepet"
                placeholder="请再次输入您的密码"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <p>
              <el-button class="registerButton" @click="register">注册</el-button>
            </p>
            <p>
              <span class="registerComment">若有账号，可以直接
                <router-link to="/login">登录</router-link>
              </span>
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
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        this.$axios
          .get(this.GLOBAL.URL + "/web/teacher/checkUsername?username=" + value)
          .then(function(response) {
            if (response.data.code != 200) {
              return callback(response.data.msg);
            }
          });
      }
    };
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
      } else if (value !== this.form.password) {
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
        username: "",
        password: "",
        passwordRepet: ""
      },
      rules: {
        username: [{ validator: checkAge, trigger: "blur" }],
        password: [
          { validator: validatePass, trigger: "blur" },
          { min: 6, max: 20, message: "密码长度为6-20位", trigger: "blur" }
        ],
        passwordRepet: [
          { validator: validatePass2, trigger: "blur" },
          { min: 6, max: 20, message: "密码长度为6-20位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    register() {
      if (
        this.form.username == "" ||
        this.form.password == "" ||
        this.form.passwordRepet == ""
      ) {
        alert("请正确填写注册信息！");
      } else {
        this.$axios
          .get(this.GLOBAL.URL + "/web/teacher/register", {
            params: {
              username: this.form.username,
              password: this.$md5(this.form.password+"quizz"),
              secret: this.$md5(this.form.username + "quizz")
            }
          })
          .then(
            function(response) {
              if (response.data.code == 200) {
                this.$message({
                  message: "恭喜注册成功！请登录……",
                  type: "success"
                });
                setTimeout(()=>{
                  this.$router.push({ name: "login" });
                },2000);
              } else {
                alert("注册失败！");
              }
            }.bind(this)
          )
      }
    },
    check() {
      this.visible = true;
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
  top: 42px;
  margin: 0 auto;
  position: relative;
  height: 350px;
  width: 400px;
}

.formBack {
  top: 82px;
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
</style>
