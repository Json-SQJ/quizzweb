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
          <li class="selectLi title">
            <router-link to="/mainIndex">首页</router-link>
          </li>
          <li class="selectLi">
            <img :src="no" class="icon iconhome">
          </li>
          <li class="selectLi title">
            <router-link to="/problemBank">题库</router-link>
          </li>
        </ul>
      </div>
      <div class="select">
        <ul class="selectUl">
          <li class="selectLi">
            <router-link to="/createTest">
              <el-button type="warning" class="loginButton">创建测试</el-button>
            </router-link>
          </li>
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
      <el-carousel height="878px">
        <el-carousel-item v-for="(item,index) in items"  :key="index">
          <router-link :to="item.url">
            <img :src="item.pic" class="img">
          </router-link>
        </el-carousel-item>
      </el-carousel>
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
        { pic: "./static/banner1.png", url: "/mainIndex" },
        { pic: "./static/banner2.png", url: "/mainIndex" },
        { pic: "./static/banner3.png", url: "/createTest" }
      ],
      avatar: "./static/avatar.png",
      home: "./static/home_white.png",
      no: "./static/no_white.png",
      username: "",
      token: ""
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

.el-main {
  background-color: #e9eef3;
  text-align: center;
  padding: 0px;
  /* line-height: 160px; */
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
.icon {
  height: 20px;
  line-height: 100%;
}
.iconhome {
  position: relative;
  top: 5px;
}
.title {
  margin-left: 2px;
}
</style>
