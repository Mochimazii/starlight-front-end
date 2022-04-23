<template>
  <div>
    <v-container class="mt-3" style="width: 80vw">
      <v-row>
        <v-col cols="12">
          <NavHeader title="商品管理"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="6" class="align-self-stretch">
          <GoodClassCard class="align-self-stretch"/>
        </v-col>
        <v-col cols="12" lg="6" class="align-self-stretch">
          <GoodSearch class="fill-height align-self-stretch" />
        </v-col>
      </v-row>

      <div class="mt-4">
        <v-row>
          <v-col v-for="good in goods" cols="12" sm="6" md="4" lg="3">
            <GoodsCard :good="good"/>
          </v-col>
        </v-row>
        <v-row v-if="this.page !== null && this.page.pages !== 0" justify="center">
          <v-col>
            <v-container class="max-width">
              <v-pagination
                  v-model="page.current"
                  :length="page.pages"
                  :total-visible="7"
                  @input="pageChange(page.current)"
                  @next="nextPage"
                  @previous="prevPage"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader";
import GoodClassCard from "@/components/GoodClassCard";
import GoodSearch from "@/components/GoodSearch";
import GoodsCard from "@/components/GoodsCard";
export default {
  name: "GoodsManager",
  components:{
    NavHeader,
    GoodClassCard,
    GoodSearch,
    GoodsCard
  },
  data(){
    return{
      currentPage: 1,
      goods:{},
      page:null,
    }
  },
  created() {
    this.getGoodsPage(1,this.goodClass,this.goodKeyWord)
  },
  methods:{
    getGoodsPage(current,goodClass,keyWord){
      this.$axios.get('good/class',{
        params:{
          nextPage:current,
          goodClass:goodClass,
          keyWord:keyWord
        }
      })
          .then(res => {
            console.log(res)
            this.goods = res.data.data.records
            this.page = res.data.data
          })
    },
    pageChange(currentPage){
      console.log("pageNum"+currentPage)
      this.getGoodsPage(currentPage,this.goodClass,this.goodKeyWord)
    },
    prevPage(){
      let currentPage = this.page.current
      this.getGoodsPage(currentPage,this.goodClass,this.goodKeyWord)
    },
    nextPage(){
      let currentPage = this.page.current
      let goodKeyWord = this.goodKeyWord
      this.getGoodsPage(currentPage,this.goodClass,goodKeyWord)
    },
  },
  computed:{
    goodClass(){
      return this.$store.state.goodClass
    },
    goodKeyWord(){
      return this.$store.state.goodKeyWord
    }
  },
  watch:{
    goodClass:{
      handler(newClass,oldClass){
        let goodKeyWord = this.goodKeyWord
        this.getGoodsPage(1,newClass,goodKeyWord)
      }
    },
    goodKeyWord:{
      handler(newKeyWord,oldKeyWord){
        console.log("监听到goodkeyword",newKeyWord)
        let goodKeyWord = this.goodKeyWord
        let goodClass = this.goodClass
        this.getGoodsPage(1,goodClass,goodKeyWord)
      }
    }
  }
}
</script>

<style scoped>

</style>
