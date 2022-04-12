<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-row>
          <v-col cols="4" offset="3">
            <v-img
                lazy-src="https://picsum.photos/id/11/10/6"
                height="430"
                width="430"
                :src="good.goodCover"
            ></v-img>
          </v-col>
          <v-col cols="4" class="ml-2">
            <v-row class="mt-2 text-h4 font-weight-bold" >
              {{ this.good.goodName }}
            </v-row>
            <v-row class="mt-6 text-h5 red--text" >
              ￥ {{ this.good.goodPrice }}
            </v-row>
            <v-row class="mt-6 body-1" >
              <v-avatar size="48">
                <img
                    alt="user"
                    :src="this.good.userInfo.userAvatar"
                >
              </v-avatar>
              <p class="mt-3 ml-2 subtitle-1">
                {{ this.good.userInfo.userName }}
              </p>
            </v-row>
            <v-row  class="mt-6 body-1 d-flex align-center" >
              <v-chip
                  color="green"
                  text-color="white"
              >
                {{ "地址" }}
              </v-chip>
              <p class="ml-3 mb-0">
                {{ this.good.userInfo.userSchool }}
              </p>
            </v-row>
            <v-row  class="mt-6 body-1 d-flex align-center" >
              <v-chip
                  color="green"
                  text-color="white"
              >
                {{ "标签" }}
              </v-chip>
              <p v-for="tag in good.goodTagList" class="ml-3 mb-0">
                {{ tag.tagContent }}
              </p>
            </v-row>
            <v-row  class="mt-6 body-1 d-flex align-center" >
              <v-chip
                  color="green"
                  text-color="white"
              >
                {{ "日期" }}
              </v-chip>
              <p class="ml-3 mb-0">
                {{ this.good.goodDate }}
              </p>
            </v-row>
            <v-row  class="mt-6 body-1 d-flex align-center" >
              <v-btn
                  rounded
                  x-large
                  color="success"
              >
                感兴趣
                <v-icon right>
                  mdi-arrow-right-thick
                </v-icon>
              </v-btn>
            </v-row>
<!--              <v-btn-->
<!--                  fab-->
<!--                  :color="col ? 'orange lighten-2' : 'blue-grey lighten-2'"-->
<!--                  class="ml-3"-->
<!--                  @click="col = !col"-->
<!--              >-->
<!--                <v-icon color="white">-->
<!--                  mdi-star-outline-->
<!--                </v-icon>-->
<!--              </v-btn>-->

            <v-row class="mt-6 body-1 d-flex align-center" >
              <v-btn
                  rounded
                  large
                  color="error"
              >
                立即购买
              </v-btn>
            </v-row>
          </v-col>
        </v-row>
      </v-card>

      <v-card
          elevation="5"
          class="bkop-medium pa-6 mt-6"
      >
        <h1 class="headline d-flex align-center flex-row pb-2">
          <v-icon
              left
          >
            mdi-information
          </v-icon>
          商品详情
        </h1>
        <p class="text-justify">
          {{ this.good.goodDes }}
        </p>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "GoodsDetail",
  props: {
    good:{
      type:Object,
    },
    goodsId:{
      type: Number,
    }
  },
  data () {
    return {
      col:true,
    }
  },
  created() {
    console.log(this.goodsId)
    console.log(this.good)
    if(this.good == null){
      this.getGoodById(this.goodsId)
    }
  },
  methods:{
    getGoodById(){
      let id = this.goodsId
      this.$axios.get(`/good/${id}`)
        .then(res => {
          console.log(res)
          this.good = res.data.data
        })
    }
  }
}
</script>

<style scoped>
.bkop-medium {
  background: rgba(255, 255, 255, .9) !important;
}
</style>
