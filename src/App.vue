<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  html,body {
    width: 100%;
    height: 100%;
    margin: 0px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  #app {
    width: 100%;
    height: 100%;
    padding: 0px;
  }
  .el-table--small td, .el-table--small th {
    padding: 4px 0;
  }
  .tico-login {
    height: 12px;
    size: 12px;
  }
  .el-dialog__body{
    max-height: 380px;
    overflow-y: auto;
  }
</style>
