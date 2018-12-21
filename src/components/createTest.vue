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
      <div>
        <p class="formTitle">创建测试</p>
        <div class="form">
          <el-form ref="form" :model="form" :rules="rules">
            <el-form-item label="测验名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入测验名称"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="comment">
              <el-input type="textarea" v-model="form.comment" placeholder="请输入该测验备注" :rows="4"></el-input>
            </el-form-item>
            <el-form-item label="是否设置该测验答题时间" prop="setTime">
              <el-switch v-model="form.setTime" active-color="#29a6a6"></el-switch>
            </el-form-item>
            <el-form-item label="答题时间（min）" prop="time">
              <el-input
                v-model="form.time"
                placeholder="请输入答题时间（min）"
                :disabled="form.setTime==true?false:true"
              ></el-input>
            </el-form-item>
            <br>
            <br>
            <br>
            <el-form-item>
              <el-button @click="goBack">返回</el-button>
              <el-button type="primary" @click="saveAdd">保存并添加题目</el-button>
              <el-button type="warning" @click="save">保存测验</el-button>
            </el-form-item>
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
    return {
      logoUrl: "./static/logo_white.png",
      items: [
        "./static/banner1.png",
        "../static/banner2.png",
        "../static/banner3.png"
      ],
      avatar: "./static/avatar.png",
      home: "./static/home_white.png",
      no: "./static/no_white.png",
      form: {
        name: "",
        comment: "",
        setTime: true,
        time: "",
        id:""
      },
      username: "",
      token: "",
      rules: {
        name: [{ required: true, message: "测验名称不能为空", trigger: "blur" }]
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
    goBack() {
      this.$router.push("/mainIndex");
    },
    saveAdd() {
      console.log(this.check())
      if (this.check()) {
        this.saveTest("saveAdd");
      } else {
        this.$message.error("请正确填写测验信息……");
      }
    },
    save() {
      if (this.check()) {
        this.saveTest("save");
      } else {
        this.$message.error("请正确填写测验信息……");
      }
    },
    saveTest(title) {
      this.$axios({
        method: "post",
        url: this.GLOBAL.URL + "/web/test/addTest",
        data: {
          quizzName: this.form.name,
          quizzComment: this.form.comment,
          quizzTime: this.form.time,
          id:this.form.id
        },
        headers: { userId: localStorage.getItem("userId"), token: this.token }
      }).then(
        function(res) {
          if (res.data.code == 200) {
            console.log(res.data.data)
            if (title == "save") {
              this.$message({
                message: "保存成功……",
                type: "success"
              });
              setTimeout(() => {
                this.$router.push({ name: "problemBank" });
              }, 2000);
            } else if (title == "saveAdd") {
              this.$message({
                message: "保存成功……开始添加题目……",
                type: "success"
              });
              setTimeout(() => {
                this.$router.push({ name: "problem",params:{test:res.data.data} });
              }, 2000);
            }
          }
        }.bind(this)
      );
    },
    check() {
      if (
        this.form.name == "" 
      ) {
        return false;
      }else{
        return true;
      }
    },
    async getTestById(testId) {
      this.$axios
        .get(this.GLOBAL.URL + "/web/test/getTestById", {
          headers: {
            userId: localStorage.getItem("userId"),
            token: this.token
          },
          params: { testId: testId }
        })
        .then(
          function(res) {
            if (res.data.code == 200) {
              var test = res.data.data;
              this.form.name = test.quizzName;
              this.form.comment = test.quizzComment;
              this.form.setTime = test.setTime;
              this.form.quizzTime = test.quizzTime;
              this.form.id = test.id;
            }
          }.bind(this)
        );
    }
  },
  created() {
    this.username = localStorage.getItem("username");
    this.token = localStorage.getItem("token");
    this.GLOBAL.checkToken(this.token);
    var testId = this.$route.query.id;
    this.getTestById(testId)
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
  background-image: url("../../static/bg3.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
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
.formTitle {
  top: 40px;
  position: relative;
  color: #29a6a6;
  font-size: 20px;
  font-family: "黑体";
}
.form {
  position: relative;
  top: 60px;
  margin: 0 auto;
  width: 800px;
  color: #29a6a6;
}
.el-form-item__content {
  margin-left: 0;
}
.el-form-item--small .el-form-item__label {
  color: #29a6a6 !important;
}
.el-textarea__inner {
  font-size: 20px;
  font-family: "黑体";
}
</style>
