<template>
  <el-container>
    <el-aside width="200px">
      <el-aside width="200px">
        <!-- logo -->
        <div class="logo">logo</div>
        <!-- 菜单区域 -->
        <el-menu background-color="#002033"
                 text-color="#fff"
                 active-text-color="#ffd04b">
          <el-menu-item index="1">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="el-icon-setting"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="7">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang='less' >
.el-container {
  width: 100%;
  height: 100%;
  .el-container {
    width: 100%;
    height: 100%;
  }
  .el-aside {
    background-color: #002033;
    .el-menu {
      border-right: none;
    }
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url(~@/assets/logo_admin.png) no-repeat center;
      background-size: 140px auto;
    }
  }
  .el-header {
    background-color: #b3c0d1;
  }
  .el-main {
    background-color: #e9eef3;
  }
}
</style>
