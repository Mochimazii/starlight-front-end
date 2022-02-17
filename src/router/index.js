import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import adminIndex from "@/views/admin/adminIndex";
import Collection from "@/views/user/Collection";
import AddressManager from "@/views/user/AddressManager";
import Message from "@/views/user/Message";
import Setting from "@/views/user/Setting";
import Publish from "@/views/user/DealView/Publish";
import Purchased from "@/views/user/DealView/Purchased";
import Sold from "@/views/user/DealView/Sold";
import OverView from "@/views/admin/OverView";
import UserManager from "@/views/admin/UserManager";
import GoodsManager from "@/views/admin/GoodsManager";
import ComplaintManager from "@/views/admin/ComplaintManager";
import Shop from "@/views/user/ShopView/Shop";
import GoodsView from "@/views/user/ShopView/GoodsView";
import GoodsDetail from "@/views/user/ShopView/GoodsDetail";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias:'/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'admin',
    component: adminIndex
  },
  {
    path:'/shop',
    name:'shop',
    component: Shop,
    category:'user',
    meta:{
      icon:"mdi-basket",
      title:"二手市场",
      inGroup:false,
    },
    children:[
      {
        path:'',
        name:"GoodsView",
        component:GoodsView,
        meta:{
          title:"二手市场"
        }
      },
      {
        path:':goodsId',
        name:"GoodsDetail",
        component:GoodsDetail,
      }
    ]
  },
  {
    path:'/set',
    name:'set',
    component: Setting,
    category:'user',
    meta:{
      icon:"mdi-cog",
      title:"信息设置",
      inGroup:false,
    },
  },
  {
    path:'/collection',
    name:'collection',
    component: Collection,

    category:'user',
    meta:{
      icon:"mdi-star-box",
      title:"我的收藏",
      inGroup:false,
    },
  },
  {
    path:'/address',
    name:'address',
    component: AddressManager,
    category:'user',
    meta:{
      icon:"mdi-castle",
      title:"我的地址",
      inGroup:false,
    },
  },
  {
    path:'/message',
    name:'message',
    component: Message,
    category:'user',
    meta:{
      icon:"mdi-chat-outline",
      title:"我的消息",
      inGroup:false,
    },
  },
  {
    path:'/publish',
    name:'publish',
    component: Publish,
    category:'user',
    meta:{
      icon:"mdi-purse",
      title:"我发布的",
      inGroup:true,
    },
  },
  {
    path:'/purchased',
    name:'purchased',
    component: Purchased,
    category:'user',
    meta:{
      icon:"mdi-clipboard-check",
      title:"我购买的",
      inGroup:true,
    },
  },
  {
    path:'/sold',
    name:'sold',
    component: Sold,
    category:'user',
    meta:{
      icon:"mdi-currency-usd",
      title:"我卖出的",
      inGroup:true,
    },
  },
  {
    path: '/overview',
    name:'overview',
    component: OverView,
    category: 'admin',
    meta:{
      icon: "mdi-chess-king",
      title: "总览",
    }
  },
  {
    path: '/user',
    name:'user',
    component: UserManager,
    category: 'admin',
    meta:{
      icon: "mdi-chess-pawn",
      title: "用户管理",
    }
  },
  {
    path: '/goodsManager',
    name:'goodsManager',
    component: GoodsManager,
    category: 'admin',
    meta:{
      icon: "mdi-chess-rook",
      title: "商品管理",
    }
  },
  {
    path: '/complaintManage',
    name:'complaintManage',
    component: ComplaintManager,
    category: 'admin',
    meta:{
      icon: "mdi-chess-knight",
      title: "申诉管理",
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router