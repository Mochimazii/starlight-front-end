import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import adminIndex from "@/views/admin/adminIndex";
import AddressManager from "@/views/user/AddressManager";
import Message from "@/views/user/Message";
import Setting from "@/views/user/Setting";
import Publish from "@/views/user/DealView/PublishView/Publish";
import Selling from "@/views/user/DealView/PublishView/Selling";
import Pulled from "@/views/user/DealView/PublishView/Pulled";
import Purchased from "@/views/user/DealView/PurchasedView/Purchased";
import Sold from "@/views/user/DealView/SoldView/Sold";
import OverView from "@/views/admin/OverView";
import UserManager from "@/views/admin/UserManager";
import Complaining from "@/views/admin/ComplaintView/Complaining";
import Complained from "@/views/admin/ComplaintView/Complained";
import GoodsManager from "@/views/admin/GoodsManager";
import ComplaintManager from "@/views/admin/ComplaintView/ComplaintManager";
import Shop from "@/views/user/ShopView/Shop";
import GoodsView from "@/views/user/ShopView/GoodsView";
import GoodsDetail from "@/views/user/ShopView/GoodsDetail";
import Sending from "@/views/user/DealView/PurchasedView/Sending";
import Receiving from "@/views/user/DealView/PurchasedView/Receiving";
import Done from "@/views/user/DealView/PurchasedView/Done";
import WaitReceive from "@/views/user/DealView/SoldView/WaitReceive";
import WaitSend from "@/views/user/DealView/SoldView/WaitSend";
import Complete from "@/views/user/DealView/SoldView/Complete";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias:'/login',
    name: 'Login',
    component: Login
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   component: adminIndex
  // },
  {
    path:'/shop',
    name:'shop',
    component: Shop,
    category:'user',
    meta:{
      icon:"mdi-basket",
      title:"二手市场",
      inGroup:false,
      category: 'user',
    },
    children:[
      {
        path:'',
        name:"GoodsView",
        category:'user',
        component:GoodsView,
        meta:{
          title:"二手市场",
          category: 'user',
        }
      },
      {
        path:':goodsId',
        category:'user',
        name:"GoodsDetail",
        component:GoodsDetail,
        props:true,
        meta: {
          category: 'user',
        }
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
      category: 'user'
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
      category: 'user',
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
      category: 'user',
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
      category: 'user',
      inGroup:true,
    },
    children: [
      {
        path: '',
        name: "SellingGoods",
        category:'user',
        component: Selling,
        meta: {
          category: 'user',
        }
      },
      {
        path: 'pulled',
        category:'user',
        name: "PulledGoods",
        component: Pulled,
        meta: {
          category: 'user',
        }
      },
    ]
  },
  {
    path:'/purchased',
    name:'purchased',
    component: Purchased,
    category:'user',
    meta:{
      icon:"mdi-clipboard-check",
      title:"我购买的",
      category:'user',
      inGroup:true,
    },
    children: [
      {
        path: '',
        name: "Sending",
        category:'user',
        component: Sending,
        meta: {
          category: 'user',
        }
      },
      {
        path: 'receive',
        name: "Receiving",
        category:'user',
        component: Receiving,
        meta: {
          category: 'user',
        }
      },
      {
        path:'done',
        name: "Done",
        category:'user',
        component: Done,
        meta: {
          category: 'user',
        }
      }
    ]
  },
  {
    path:'/sold',
    name:'sold',
    component: Sold,
    category:'user',
    meta:{
      icon:"mdi-currency-usd",
      title:"我卖出的",
      category: 'user',
      inGroup:true,
    },
    children: [
      {
        path: '',
        name: "WaitSend",
        category:'user',
        component: WaitSend,
        meta: {
          category: 'user',
        }
      },
      {
        path: 'waitreceive',
        name: "WaitReceive",
        category:'user',
        component: WaitReceive,
        meta: {
          category: 'user',
        }
      },
      {
        path:'complete',
        name: "Complete",
        category:'user',
        component: Complete,
        meta: {
          category: 'user',
        }
      }
    ]
  },
  {
    path: '/overview',
    name:'overview',
    component: OverView,
    category: 'admin',
    meta:{
      icon: "mdi-chess-king",
      category: 'admin',
      title: "总览",
    }
  },
  // {
  //   path: '/user',
  //   name:'user',
  //   component: UserManager,
  //   category: 'admin',
  //   meta:{
  //     icon: "mdi-chess-pawn",
  //     title: "用户管理",
  //   }
  // },
  {
    path: '/goodsManager',
    name:'goodsManager',
    component: GoodsManager,
    category: 'admin',
    meta:{
      icon: "mdi-chess-rook",
      category: 'admin',
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
      category: 'admin',
      title: "申诉管理",
    },
    children: [
      {
        path: '',
        name: 'Complaining',
        component: Complaining,
        meta: {
          category: 'admin',
        }
      },
      {
        path: 'complained',
        name: 'Complained',
        component: Complained,
        meta: {
          category: 'admin',
        }
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
