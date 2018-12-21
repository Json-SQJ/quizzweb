<template>
  <el-container>
    <el-header class="header">
      <div class="logo">
        <router-link to="/"><img :src="logoUrl"></router-link>
      </div>
      <div class="meun">
        <ul>
          <li class="selectLi">
            <img :src="home" class="icon iconhome">
          </li>
          <li class="selectLi title"><router-link to="/mainIndex">首页</router-link></li>
          <li class="selectLi">
            <img :src="no" class="icon iconhome">
          </li>
          <li class="selectLi title"> <router-link to="/problemBank">题库</router-link></li>
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
      <div class="start">
        <div class="qrcode">
          <p class="qrcodetext">二维码</p>
          <img :src="qrcode" class="qrcodeimg">
        </div>
        <div class="pin">
          <p class="pintext">PIN码</p>
          <div class="pincode">{{pin}}</div>
        </div>
      </div>
       <el-button type="warning" plain class="refresh" @click="startTest(testId)">刷新</el-button>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      logoUrl: "./static/logo_white.png",
      items: [
        "./static/banner1.png",
        "./static/banner2.png",
        "./static/banner3.png"
      ],
      avatar: "./static/avatar.png",
        home: "./static/home_white.png",
      no: "./static/no_white.png",
      qrcode:"",
      pin:"",
      username:"",
      token:"",
      testId:""
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
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
    startTest(testId){
      this.$axios
        .get(this.GLOBAL.URL + "/web/test/startTest", {
          headers: { userId: localStorage.getItem("userId"), token: this.token },
          params:{testId:testId}
        })
        .then(
          function(res) {
            if (res.data.code == 200) {
              this.pin = res.data.data.pin;
              this.qrcode=this.GLOBAL.URL+res.data.data.qrcode;
            }
          }.bind(this)
        );
    }
  },
  created() {
    this.username = localStorage.getItem("username");
    this.token = localStorage.getItem("token");
    this.GLOBAL.checkToken(this.token);
    this.testId = this.$route.query.id;
    this.startTest(this.testId);
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
.meun {
  color: white;
  position: relative;
  left: 18%;
  float: left;
  width: 300px;
  height: 100%;
  font-family: "黑体";
  line-height: 30px;
}
.title {
  margin-left: 2px;
}
.select {
  position: relative;
  float: right;
  right: 25%;
  width: 300px;
  height: 100%;
  font-family: "黑体";
  line-height: 30px;
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
.title {
  margin-left: 2px;
}
.el-main {
  background-color: #e9eef3;
  text-align: center;
  padding: 0px;
  background-image: url("../../static/bg4.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

body .el-container {
  height: 100%;
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

.img {
  width: 100%;
  height: 100%;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-dropdown-link {
  color: white;
  font-size: 15px;
}
.avatar {
  height: 30px;
  width: 30px;
  border-radius: 50%;
}
.start {
  display: flex;
  width: 100%;
  color: #29a6a6;
  font-size: 30px;
  font-weight: bold;
}
.qrcode {
  position: relative;
  height: 400px;
  width: 350px;
  left: 15%;
  top: 100px;
}
.pin {
  position: relative;
  height: 400px;
  width: 350px;
  left: 45%;
  top: 100px;
}
.qrcodeimg{
  height: 310px;
  width: 310px;
}
.pincode{
  position: relative;
  top: 100px;
  color:black;
  font-weight: bold;
  font-size: 60px;
}
.refresh{
  position: relative;
  top: 260px;
}
.icon {
  height: 20px;
  line-height: 100%;
}
.iconhome {
  position: relative;
  top: 5px;
}
</style>
