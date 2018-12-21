<template>
<el-container>
  <el-header class="header">
    <div class="logo">
      <router-link to="/"><img :src=logoUrl></router-link>
    </div>
    <div class="selectLogin" v-if="islogin">
       <ul class="selectUl">
         <li class="login selectLi"><router-link to="/login">登录</router-link></li>
         <li class="selectLi"><router-link to="/register">注册</router-link></li>
       </ul>
    </div>
    <div class="selectUser" v-else="islogin">
        <ul class="selectUl">
          <li class="selectLi">
            <router-link to="/createTest">
              <el-button type="warning">创建测试</el-button>
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
    <div >
      <img :src=titleUrl class="title">
    </div>
    <div>
      <span class="contentOne">趣问答是一个趣味性的学习答题平台，用于教师和课下练习。注册以创建，体验各种主题的测试!</span>
    </div>
   <div>
     <img :src=picUrl class="pic">
   </div>
   <div>
      <strong class="contentTwo">免费供教师和个人使用</strong>
   </div>
    <div>
      <span class="contentThree">打破僵局，增强知识，可以创建自己的测试！</span>
   </div>
   <div>
     <router-link to="/register"><el-button type="warning" class="loginButton">免费注册</el-button></router-link>
   </div>
  </el-main>
</el-container>
</template>

<script>
export default {
  name:"index",
  data() {
    return {
      logoUrl: "./static/logo.png",
      picUrl: "./static/pic.png",
      titleUrl: "./static/title.png",
            avatar: "./static/avatar.png",
      islogin:false,
      username:""
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
  },
  created(){
    this.username = localStorage.getItem("username");
    if(this.username==undefined || this.username==null){
      this.islogin = true
    }else{
      this.islogin=false
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
.selectUser{
  position: relative;
  float: right;
  right: 25%;
  width: 300px;
  height: 100%;
  font-family: "黑体";
  line-height: 30px;
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
.avatar {
  height: 30px;
  width: 30px;
  border-radius: 50%;
}
.selectLogin {
  position: relative;
  float: right;
  right: 25%;
  width: 160px;
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
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
  background-image: url("../../static/bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

body .el-container {
  height: 100%;
}

/* li {
  list-style: none;
  float: left;
  margin-left: 20px;
}
ul {
  position: relative;
  vertical-align: middle;
} */
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
  top: 60px;
  height: 70px;
  left: -250px;
}

.pic {
  position: relative;
  top: 100px;
  height: 330px;
}
.contentOne {
  position: relative;
  top: 80px;
  font-size: 14px;
  left: -118px;
  color: white;
  font-family: "黑体";
}
.contentTwo {
  position: relative;
  top: 115px;
  font-size: 18px;
  left: -320px;
  color: white;
  font-family: "黑体";
}
.contentThree {
  position: relative;
  top: 130px;
  font-size: 14px;
  left: -270px;
  color: white;
  font-family: "黑体";
}
.loginButton {
  position: relative;
  top: 150px;
  left: 370px;
}
</style>
