<template>
  <v-card>
    <v-img
        :src="good.goodCover"
        height="200px"
        @click="editDio"
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
<!--    <v-card-actions>-->
<!--      <v-spacer></v-spacer>-->
<!--      <v-btn-->
<!--          color="indigo lighten-2"-->
<!--          text-->
<!--          @click.stop="edit">-->
<!--        <v-icon>-->
<!--          mdi-cog-->
<!--        </v-icon>-->
<!--        编辑-->
<!--      </v-btn>-->

<!--    </v-card-actions>-->
    <GoodSetDio :show-dio="showEditDio" @outsider="showEditDio = false" opt="update" :good="good"/>
  </v-card>
</template>

<script>
import GoodSetDio from "@/components/GoodSetDio";
export default {
  name: "GoodSettingCard",
  components:{
    GoodSetDio
  },
  data(){
    return{
      showEditDio:false,
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
          goodStage:1,
          goodDate:"2022-4-1",
          goodTag:["无任何拆修","全新正品"],
          goodPrice:25
        }
      }
    }
  },
  methods:{
    editDio(){
      console.log("编辑商品")
      this.showEditDio = true
    },
  }
}
</script>

<style scoped>

</style>
