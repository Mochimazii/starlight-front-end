<template>
  <div>
    <v-card>
      <v-img
          :src="order.good.goodCover"
          height="200px"
          @click="orderDetail"
      >
        <v-app-bar
            flat
            color="rgba(0, 0, 0, 0)"
        >
          <v-toolbar-title class="text-h6 black--text pl-0">
            {{ order.good.goodName }}
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn
              color="black"
              icon
          >
            <v-icon>mdi-book</v-icon>
          </v-btn>
        </v-app-bar>

        <v-card-title class="black--text mt-14">
          <v-avatar size="40">
            <img
                alt="user"
                :src="order.good.userInfo.userAvatar"
            >
          </v-avatar>
          <p class="ml-3 mt-4">
            {{ order.good.userInfo.userName }}
          </p>
          <v-spacer/>
          <v-chip
              class="ma-2"
              color="primary"
              outlined
              pill
          >
            <v-icon left>
              mdi-credit-card
            </v-icon>
            {{ order.good.userInfo.userCredit }}
          </v-chip>
        </v-card-title>
      </v-img>

      <v-card-title class="red--text">
        <v-chip
            class="mr-3"
            v-for="tag in order.good.goodTagList"
            :key="tag.tagId"
            close-icon="mdi-close-outline"
            color="red"
            outlined
        >
          {{ tag.tagContent }}
        </v-chip>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-card-title class="red--text">
        <span class="subtitle-1">¥ </span> {{ order.orderPrice }}
        <v-spacer/>
        <span>共{{ order.orderNum }}个</span>
      </v-card-title>

    </v-card>
    <AppealDio :show-dio="showOrderDio" @outsider="showOrderDio = false" :order="order"/>
  </div>


</template>

<script>
import AppealDio from "@/components/AppealDio";
export default {
  name: "AppealCard",
  components:{
    AppealDio
  },
  data(){
    return{
      showOrderDio:false
    }
  },
  methods:{
    orderDetail(){
      this.showOrderDio = true
    }
  },
  props:{
    order:{
      type:Object,
      default(){
        return{
          "orderId": 6,
          "orderSellId": "123345",
          "orderGetId": "123345",
          "addressId": 2,
          "goodId": 1,
          "orderPrice": 12,
          "orderNum": 1,
          "orderStage": 1,
          "orderTime": null,
          "orderPicture": null,
          "address": {
            "addressId": 2,
            "addressStatus": 1,
            "addressConsignee": "黑泽朋世",
            "addressDetail": "宿舍楼1号楼，410层",
            "addressTel": "13655946416",
            "userId": "123345"
          },
          "good": {
            "goodId": 1,
            "goodName": "C++程序设计",
            "goodCover": "http://localhost:8443/api/goodpic/11.jpg",
            "goodClass": "书籍",
            "goodStore": 1,
            "goodPrice": 12,
            "goodStage": 1,
            "goodDate": "2022-04-1",
            "goodDes": "目前，小米是全球第四大智能手机制造商，在30余个国家和地区的手机市场进入了前五名，特别是在印度，连续5个季度保持手机出货量第一。通过独特的“生态链模式”，小米投资、带动了更多志同道合的创业者，同时建成了连接超过1.3亿台智能设备的IoT平台。\r\n\r\n2018年7月9日，小米成功在香港主板上市，成为了港交所首个同股不同权上市公司，创造了香港史上最大规模科技股IPO，以及当时历史上全球第三大科技股IPO。\r\n\r\n感谢您关注小米，和我们并肩投身于创造商业效率新典范，用科技改善人类生活的壮丽事业。许商业以敦厚，许科技以温暖，许大众以幸福，我们的征途是星辰大海，请和我们一起，永远相信美好的事情即将发生。",
            "userId": "123345",
            "goodTagList": [
              {
                "tagId": 3,
                "tagContent": "全新未拆",
                "goodId": 1
              }
            ],
            "userInfo": {
              "userId": "123345",
              "userName": "爱城",
              "userEmail": "597415246@qq.com",
              "userAvatar": "http://localhost:8443/api/avatar/bf1ijx.jpg",
              "userPhone": "13666861316",
              "userSchool": "清华大学",
              "userFaculty": "人工智能院",
              "userCredit": 70
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
