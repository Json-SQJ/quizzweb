<template>
  <div id="app" :style="'height:'+windowHeight+'px'">
  <router-view/>
</div>
</template>
<script>
export default{
 name: "App",
 data(){
   return{
     windowHeight: 0
   }
 },
 created() {
    this.windowHeight = window.innerHeight;
  }
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
}
* {
    font-family: "黑体" !important;
}
.el-input--small .el-input__inner {
    height: 40px ;
}
textarea{
  font-size: 13px !important;
}
.search .el-input__inner {
  border: 0px solid white
}
</style>
