<template>
  <el-container>
    <el-header class="header">
      <div class="logo">
        <router-link to="/">
          <img :src="logoUrl">
        </router-link>
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
      <div class="test">
        <p class="formTitle">添加题目</p>
        <div class="testInfo">
          <p>测验名称:{{test.name}}</p>
          <p>测验备注:{{test.comment}}</p>
          <p>测验时间:{{test.time}}</p>
        </div>
        <div class="problems">
          <div class="problem" v-for="(problem,index) in problems">
            <div v-on:click="showProblem(index)">
              <p>
                <label>{{problem.questionName}}</label>
              </p>
              <p>
                <label>{{problem.analysis}}</label>
              </p>
            </div>
            <i class="el-icon-error icon_delete" @click="deleteQuestion(index)" :style="{display:deleteQuestionVisiable}"></i>
          </div>
          <div class="problem" @click="dialogVisible=true">
            <div>
              <img :src="plus">
            </div>
          </div>
          <div class="problem" @click="showDelete">
            <div>
              <img :src="minus">
            </div>
          </div>
        </div>
      </div>
      <div class="test-btn">
        <el-button @click="goback">返回</el-button>
        <el-button type="warning" @click="save">完成</el-button>
      </div>
    </el-main>
    <el-dialog title="添加题目" :visible.sync="dialogVisible" width="60%" :close-on-click-modal="false">
      <div>
        <div class="addProblem">
          <el-form ref="problem" :model="problem">
            <el-form-item label="题目">
              <el-input v-model="problem.title" placeholder="请输入测验名称"></el-input>
            </el-form-item>
            <el-form-item label="添加选项" class="selectTable">
              <el-table
                ref="multipleTable"
                :data="selectionTable"
                tooltip-effect="dark"
                style="width: 100%;font-size:15px"
              >
                <el-table-column width="100" label="正确选项">
                  <template slot-scope="scope">&nbsp;&nbsp;&nbsp;
                    <el-radio
                      :label="scope.$index"
                      v-model="radio"
                      @change.native="getTemplateRow(scope.$index,scope.row)"
                    >&nbsp;</el-radio>
                  </template>
                </el-table-column>
                <el-table-column prop="select" label="选项" width="100"></el-table-column>
                <el-table-column label="内容">
                  <template slot-scope="scope">
                    <el-input v-show="true" v-model="scope.row.content"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item>
              <el-button type="warning" @click="addSelection()">增加选项</el-button>
            </el-form-item>
            <el-form-item label="添加解析">
              <el-input
                type="textarea"
                v-model="problem.analysis"
                placeholder="添加该题解析及知识点"
                :rows="4"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveProblem">确 定</el-button>
      </span>
    </el-dialog>
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
      plus: "./static/plus.png",
      minus: "./static/minus.png",
      selectionIndex: 0,
      test: {
        name: "",
        comment: "",
        time: "",
        id: ""
      },
      problems: [],
      dialogVisible: false,
      problem: {
        title: "",
        answers: {},
        analysis: ""
      },
      selectionTable: [
        {
          select: this.GLOBAL.selection[0]
        }
      ],
      radio: null,
      templateSelection: {},
      username:"",
      token:"",
      deleteQuestionVisiable:'none',
    };
  },
  methods: {
    showDelete(){
      console.log(12321321321);
      this.deleteQuestionVisiable = ''
    },
    deleteQuestion(index){
      var id = this.problems[index].id
      console.log(id)
      this.$axios.get(this.GLOBAL.URL + "/web/question/deleteQuestion",{
          headers: {
            userId: localStorage.getItem("userId"),
            token: this.token
          },
          params: {
            id: id
          }
        }).then(function(res) {
          this.$router.go(0);
        }.bind(this));
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    register() {},
    addProblem() {
      this.problems.push("这是我第n个问题");
    },
    addSelection() {
      this.selectionIndex++;
      var data = { select: this.GLOBAL.selection[this.selectionIndex] };
      this.selectionTable.push(data);
    },
    getTemplateRow(index, row) {
      //获取选中数据
      this.templateSelection = row;
    },
    saveProblem() {
      if (JSON.stringify(this.templateSelection) == "{}") {
        this.$message.error("请选择一个正确选项");
      } else if(this.checkSelectionTable()){
        this.$message.error("请输入完整选项");
      }else{
        this.$axios({
          method: "post",
          headers: {
            userId: localStorage.getItem("userId"),
            token: this.token
          },
          url: this.GLOBAL.URL + "/web/question/addQuestion",
          data: {
            questionName: this.problem.title,
            questionAnswer: this.selectionTable,
            questionCorrect: this.templateSelection,
            analysis: this.problem.analysis,
            testId: this.test.id
          }
        }).then(function(res) {
          this.$router.go(0);
        }.bind(this));
      }
    },
    checkSelectionTable(){
      for(var i=0;i<this.selectionTable.length;i++){
        var s =this.selectionTable[i];
        if(s.select==null||s.content==null){
          return true;
        }
      }
      return false;
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
    save() {
      this.$router.push({ name: "problemBank" });
    },
    goback(){
      this.$router.push({name:"problemBank"})
    },
    getProblems(id) {
      this.$axios
        .get(this.GLOBAL.URL + "/web/question/getQuestionsByTestId", {
          headers: {
            userId: localStorage.getItem("userId"),
            token: this.token
          },
          params: { testId: id }
        })
        .then(
          function(res) {
            var data = res.data.data;
            for (var i = 0; i < data.length; i++) {
              var problem = {
                questionName: data[i].questionName,
                analysis: data[i].analysis,
                id: data[i].id
              };

              this.problems.push(problem);
            }
          
          }.bind(this)
        );
    },
    async getTestById(test) {
      var id = this.$route.query.id;
      if(id==undefined){
        id = localStorage.getItem("testId");
      }
      this.$axios
        .get(this.GLOBAL.URL + "/web/test/getTestById", {
          headers: {
            userId: localStorage.getItem("userId"),
            token: this.token
          },
          params: { testId: id }
        })
        .then(
          function(res) {
            if (res.data.code == 200) {
              var test = res.data.data;
              this.test.id = test.id;
              localStorage.setItem('testId',test.id);
              this.test.name = test.quizzName;
              this.test.comment = test.quizzComment==""?'未设置':test.quizzComment;
              this.test.time = test.quizzTime==null?'未设置':test.quizzTime;
              this.getProblems(test.id);
            }
          }.bind(this)
        );
    },
    showProblem(index){
      this.dialogVisible=true;
     this.$axios
        .get(this.GLOBAL.URL + "/web/question/getQuestionById", {
          headers: {
            userId: localStorage.getItem("userId"),
            token: this.token
          },
          params: { id: this.problems[index].id }
        })
        .then(
          function(res) {
            this.problem.title = res.data.data.questionName;
            console.log(res.data)
            this.problem.analysis = res.data.data.analysis;
            var answerSet = res.data.data.answerSet;
             this.selectionTable=[]
            for (var i = 0; i < answerSet.length; i++) {
              var arr = {
                select:answerSet[i].selecion,
                content:answerSet[i].selectionContent
              };
              if(answerSet[i].isCorrect==1){
                this.radio=i
              }
              this.selectionTable.push(arr);
            }
          
          }.bind(this)
        );
    }
  },
  created() {
    this.username = localStorage.getItem("username");
    this.token = localStorage.getItem("token");
    this.GLOBAL.checkToken(this.token);
    var test = this.$route.params.test;
    if (test == undefined) {
      this.getTestById(test);
    } else {
      this.test.id = test.id;
      localStorage.setItem('testId',test.id);
      this.test.name = test.quizzName;
      this.test.comment = test.quizzComment==""?'未设置':test.quizzComment;
      this.test.time = test.quizzTime==null?'未设置':test.quizzTime;
      this.getProblems(test.id);
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
.test {
  position: relative;
  width: 1000px;
  margin: 0 auto;
  top: 60px;
}
.formTitle {
  color: #29a6a6;
  font-size: 20px;
  font-family: "黑体";
}
.testInfo {
  width: 1000px;
  margin: 0 auto;
  border: 1px solid #29a6a6;
  border-radius: 10px;
}
.testInfo p {
  position: relative;
}
.problems {
  width: 1000px;
  display: flex;
  flex-grow: 3;
  flex-wrap: wrap;
  align-content: center;
}
.problem {
  position: relative;
  width: 23%;
  height: 80px;
  box-sizing: border-box;
  margin: 2% 1% 2% 1%;
  border: 1px solid #29a6a6;
  border-radius: 10px;
}
.problem div {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.test-btn {
  position: relative;
  top: 60px;
  margin-bottom: 100px;
}
.addProblem {
}
.el-form-item__content {
  font-size: 30px !important;
}
.icon_delete{
  position: relative;
  left: 110px;
  color:red;
}
</style>
