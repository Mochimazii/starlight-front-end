<template>
  <v-card :to="{name:'GoodsDetail',params:{ goodsId:good.goodId }}">
    <v-img
        :src="good.goodCover"
        height="200px"
    >
      <v-app-bar
          flat
          color="rgba(0, 0, 0, 0)"
      >
        <v-toolbar-title class="text-h6 white--text pl-0">
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

      <v-card-title class="white--text mt-14">
        <v-avatar size="40">
          <img
              alt="user"
              :src="good.goodOwnerAvatar"
          >
        </v-avatar>
        <p class="ml-3 mt-4">
          {{ good.goodOwnerName }}
        </p>
      </v-card-title>
    </v-img>

    <v-card-title class="red--text">
      <v-chip
          class="mr-3"
          v-for="tag in good.goodTag"
          :key="tag"
          close-icon="mdi-close-outline"
          color="red"
          outlined
      >
        {{ tag }}
      </v-chip>
    </v-card-title>
    <v-divider class="mx-4"></v-divider>
    <v-card-title class="red--text"><span class="subtitle-1">¥ </span> {{ good.goodPrice }}</v-card-title>
    <v-card-actions>
      <v-btn
          text
          color="orange lighten-1"
          @click.stop="addToCart(good)"
      >
        <v-icon>
          mdi-star-outline
        </v-icon>
        收藏
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
          color="indigo lighten-2"
          text
          @click="setAddress(good)">
        <v-icon>
          mdi-hand-back-right-outline
        </v-icon>
        想要
      </v-btn>

    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "GoodsCard",
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
    dian(){

    }
  }
}
</script>

<style scoped>

</style>
