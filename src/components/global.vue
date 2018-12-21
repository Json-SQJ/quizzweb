<script >
export default{
    // URL:'https://www.crenative.cn/quizz',
    URL:'http://127.0.0.1:8080',
    selection:["A","B","C","D","E","F","G","H","I","J","K","L"],
    checkToken,
    logout
}
function checkToken(token) {
    if(token==null ||token==""){
        window.location.href="/";
    }

}
function logout(){
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
     window.location.href="/";
}
</script>
