<template>
  <el-container class="main-layout">
    <el-aside class="main-layout-nav" :width="nav.width">
      <div class="logo"><h1>{{nav.collapsed ? 'Jay' : 'Jay Blog'}}</h1></div>
      <el-menu :collapse="nav.collapsed" :default-active="$route.path"
        unique-opened router class="menu">
       <template v-for="(item, index) in navList" v-if="!item.hidden">
          <el-menu-item v-if="item.children.length == 1" :index="item.children[0].path" :key="index">
            <i :class="item.icon" /> <span slot="title">{{ item.title }}</span>
          </el-menu-item>
          <el-submenu v-else :key="item.path"  :index="item.path">
            <template slot="title">
              <i :class="item.icon" /> <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="child in item.children"> 
              <el-menu-item v-if="!child.hidden" :key="child.path" :index="child.path">{{ child.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>
    <el-container style="overflow-y: auto;">
      <el-header height="64px">
        <el-row>
          <el-col :span="12" style="padding-top: 20px;">
            <i :class="navIconCls" @click="collapse"></i>
          </el-col>
          <el-col :span="12" style="padding-top: 20px; text-align: right;">
            <span class="nav-user">
              您好，{{userName}}
              <i class="iconfont icon-tuichudenglu" style="color: #409EFF;font-size: 20px;cursor: pointer" title="退出" @click="handleLogout" />
            </span>
          </el-col>
        </el-row>
      </el-header>
     
      <main class="main-layout-content">
        <aside class="nav-link" >
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item, index) in $route.matched" :key = index  :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </aside>
        <div class="main">
          <router-view>
          </router-view>
        </div>
      </main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      navList: [
        {
          path: '/banner',
          title: 'Banner',
          name: 'Banner',
          icon: 'iconfont icon-banner',
          children: [
            { path: '/banner/list', name: 'Banner list', title: 'Banner List'},
          ]
        },
        {
          path: '/music',
          title: 'Music',
          name: 'Music',
          icon: 'iconfont icon-yinle',
          children: [
            { path: '/music/list', name: 'Music list', title: 'Music List'},
          ]
        },
        {
          path: '/blog',
          title: 'Blog',
          name: 'Blog',
          icon: 'iconfont icon-huanyingqiapian',
          children: [
            { path: '/blog/list', name: 'Blog list', title: 'Blog List'},
          ]
        },
        {
          path: '/setting',
          title: 'Setting',
          name: 'Setting',
          icon: 'iconfont icon-mzicon-setting',
          children: [
            { path: '/setting/blogTypeList', name: 'BlogType list', title: 'BlogType List'},
            { hidden: true }
          ]
        },
      ],
      nav: {
        width: '250px',
        collapsed: false
      },
    }
  },
  computed: {
    navIconCls() {
      return ['nav-icon iconfont', this.nav.collapsed ? 'icon-menufold-right': 'icon-menufold']
    },
    ...mapState({
      userName: state => state.userBasic.userName
    })
  },
  created() {
    // this.navList = this.$router.options.routes
    let _userBasic = window.localStorage.getItem('userBasic')
    let userBasic =_userBasic? JSON.parse(_userBasic): {}
    this.setBasicInfo(userBasic)
  },
  methods: {
    ...mapMutations(['setBasicInfo']),
    collapse() {
      this.nav.collapsed = !this.nav.collapsed
      this.nav.width = this.nav.collapsed ? '64px' : '250px'
    },
    handleLogout() {
      this.$confirm('用户将退出登录,您确退出登录?', '退出登录', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('----> 用户退出登录')
          this.$router.push('/login')
        })
    }
  }
}
</script>
<style lang="scss">
  @import "@/assets/style/Layout.scss";
</style>
<style lang="scss">
  .main-layout{
    .main-layout-nav{
        overflow-x: hidden!important;
    }
    .main-layout-content{
        padding: 20px;
        flex:1;
        .nav-link{
            padding: 10px 0 15px 15px;
            background: #F0F2F5;
        }
    .main{
        padding: 30px 30px 50px 30px!important;
        .main-header{
          display: flex;
          justify-content: space-between;
          h3{
              font-weight:400;
          }
          .el-button{
            height: 36px;
            margin-top: 12px;
          }
        }
      }
    }
  }
</style>
