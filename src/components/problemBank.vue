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
      <div class="search">
        <el-input v-model="input" placeholder="搜索测验关键词" style="height:32px"></el-input>
        <el-button @click="searchList"></el-button>
      </div>
      <div>
        <div class="test" v-for="test in tests">
          <div class="testBox">
            <router-link class="testName" :to="{path:'/createTest',query:{id:test.id}}">{{test.quizzName}}</router-link>
            <span class="testAction" @click='deleteTest(test.id)'>删除</span>
            <router-link class="testAction" :to="{path:'/problem',query:{id:test.id}}">添加题目</router-link>
            <router-link class="testAction" :to="{path:'/start',query:{id:test.id}}">开始测验</router-link>
            <label class="testAction">{{test.time}}</label>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "problemBank",
  data() {
    return {
      logoUrl: "./static/logo_white.png",
      items: [
        "./static/banner1.png",
        "./static/banner2.png",
        "./static/banner3.png"
      ],
      username: "",
      token: "",
      avatar: "./static/avatar.png",
      home: "./static/home_white.png",
      no: "./static/no_white.png",
      nogreen: "./static/no_green.png",
      search: "./static/search.png",
      input: "",
      tests: []
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
   getTest(id){
     console.log(id);
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
    getTests(userId) {
      this.$axios
        .get(this.GLOBAL.URL + "/web/test/listTest", {
          headers: { userId: localStorage.getItem("userId"), token: this.token }
        })
        .then(
          function(res) {
            if (res.data.code == 200) {
              this.tests = res.data.data;
            }
          }.bind(this)
        );
    },
    deleteTest(id) {
      this.$confirm('确认删除','提示',{
        confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(()=>{
        this.$axios
        .get(this.GLOBAL.URL + "/web/test/deleteTestById", {
          headers: { userId: localStorage.getItem("userId"), token: this.token },
          params:{testId:id}
        })
        .then(
          function(res) {
            if (res.data.code == 200) {
              this.$message({
            type: 'success',
            message: '删除成功!'
          });
            }
          }.bind(this)
        );
      })
    },
    searchList(){
      this.$axios
        .get(this.GLOBAL.URL + "/web/test/listTest", {
          headers: { userId: localStorage.getItem("userId"), token: this.token },
          params:{search:this.input}
        })
        .then(
          function(res) {
            if (res.data.code == 200) {
              this.tests = res.data.data;
            }
          }.bind(this)
        );
    }
  },
  created() {
    this.username = localStorage.getItem("username");
    this.token = localStorage.getItem("token");
    this.GLOBAL.checkToken(this.token);
    this.getTests();
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
.search {
  position: relative;
  height: 47px;
  width: 870px;
  margin: 0 auto;
  top: 80px;
  background-image: url("../../static/search.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.el-input {
  width: 816px;
  /* top: 2px; */
  position: relative;
  /* right: 10px; */
  border-width: 0;
}
.search .el-button {
  height: 38px;
  width: 40px;
  background: transparent;
  border-width: 0;
}
.test {
  position: relative;
  margin: 0 auto;
  height: 80px;
  width: 816px;
  border: 1px solid #29a6a6;
  top: 100px;
  margin-top: 15px;
  border-radius: 10px;
}
.testBox {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.testName {
  position: relative;
  left: -200px;
}
.testAction {
  position: relative;
  left: 160px;
  margin-left: 5px;
}
</style>
