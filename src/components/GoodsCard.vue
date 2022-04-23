<template>
  <v-card>
    <v-img
        :src="good.goodCover"
        height="200px"
        @click="goToDetail"
    >
      <v-app-bar
          flat
          color="rgba(0, 0, 0, 0)"
      >
        <v-toolbar-title class="text-h6 black--text pl-0">
          {{ good.goodName }}
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn
            color="white"
            icon
        >
          <v-icon>mdi-book</v-icon>
        </v-btn>
      </v-app-bar>

      <v-card-title class="black--text mt-14">
        <v-avatar size="40">
          <img
              alt="user"
              :src="good.userInfo.userAvatar"
          >
        </v-avatar>
        <p class="ml-3 mt-4">
          {{ good.userInfo.userName }}
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
          {{ good.userInfo.userCredit }}
        </v-chip>
      </v-card-title>
    </v-img>

    <v-card-title class="red--text">
      <v-chip
          class="mr-3"
          v-for="tag in good.goodTagList"
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
      <span class="subtitle-1">¥ </span> {{ good.goodPrice }}
      <v-spacer/>
      <span>还剩{{ good.goodStore }}个</span>
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          color="indigo lighten-2"
          text
          @click.stop="WantIt"
          v-if="userRight === 'user'"
      >
        <v-icon>
          mdi-hand-back-right-outline
        </v-icon>
        想要
      </v-btn>

      <v-btn
          color="indigo lighten-2"
          text
          @click.stop="DownIt"
          v-else
      >
        <v-icon>
          mdi-wrench-outline
        </v-icon>
        下架
      </v-btn>

    </v-card-actions>

    <v-dialog max-width="800px" v-model="confirmDown">
      <v-card>
        <v-alert
            border="left"
            outlined
            color="orange darken-3"
            class="text-start mb-0"
        >
          <v-row align="center">
            <v-col class="grow">
              确定要下架商品<strong>{{good.goodName}}</strong>吗？
            </v-col>
            <v-col class="shrink">
              <v-btn
                  color="success"
                  @click="downConfirm"
              >
                确认
              </v-btn>
            </v-col>
          </v-row>
        </v-alert>
      </v-card>

    </v-dialog>

    <BuyDio :show-dio="showBuyDio" @outsider="showBuyDio = false" :good="this.good"/>
  </v-card>

</template>

<script>
import BuyDio from "@/components/BuyDio";
export default {
  name: "GoodsCard",
  inject:["reload"],
  components:{
    BuyDio,

  },
  data(){
    return{
      showBuyDio:false,
      confirmDown:false,
    }
  },
  props: {
    good:{
      type:Object,
      default(){
        return{
          goodId:"123456",
          goodName:"从入门到入土",
          goodCover:"https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
          goodClass:"书籍",
          goodOwnerAvatar:"https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg",
          goodOwnerName:"神乐光",
          goodTag:["无任何拆修","全新正品"],
          goodPrice:25
        }
      }
    }
  },
  methods:{
    goToDetail(){
      console.log(this.good)
      if(this.userRight === "user"){
        this.$router.push({name:'GoodsDetail',params:{ goodsId:this.good.goodId ,good:this.good}})
      }

    },
    WantIt(){
      console.log("我想要")
      this.showBuyDio = true
    },
    DownIt(){
      console.log("下架这个商品")
      this.confirmDown = true
    },
    downConfirm(){
      let goodId = this.good.goodId
      this.$axios.get("good/updatestage",{
        params:{
          goodId:goodId,
          goodStage:0
        }
      }).then(res => this.reload())
    }
  },
  computed:{
    userRight(){
      return this.$store.state.userRight
    }
  }
}
</script>

<style scoped>

</style>
