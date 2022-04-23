<template>
  <div class="mt-4">
    <v-row>
      <v-col v-for="order in orders" cols="12" sm="6" md="4" lg="3">
        <OrderCard :order="order"/>
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
</template>

<script>
import OrderCard from "@/components/OrderCard";
export default {
  name: "Complete",
  components:{
    OrderCard
  },
  data(){
    return{
      currentPage: 1,
      orders:{},
      page:null,
    }
  },
  created() {
    this.getOrdersPage(1,3)
  },
  methods:{
    getOrdersPage(current,orderStage){
      let character = "sold"
      this.$axios.get(`order/stage/${character}`,{
        params:{
          nextPage:current,
          orderStage:orderStage
        }
      })
          .then(res => {
            this.orders = res.data.data.records
            this.page = res.data.data

            this.orders.map(order => {
              if(this.$store.state.userId === order.orderGetId){
                if(order.orderStage === 1){
                  order.orderStageText = "待发货"
                }else if(order.orderStage === 2){
                  order.orderStageText = "待收货"
                }else if(order.orderStage === 3){
                  order.orderStageText = "可申诉"
                }else if(order.orderStage === 4){
                  order.orderStageText = "已完成"
                }
              }else if(this.$store.state.userId === order.orderSellId){
                if(order.orderStage === 1){
                  order.orderStageText = "待我发货"
                }else if(order.orderStage === 2){
                  order.orderStageText = "待买家收货"
                }else if(order.orderStage === 3){
                  order.orderStageText = "可申诉"
                }else if(order.orderStage === 4){
                  order.orderStageText = "已完成"
                }
              }
            })
          })
    },
    pageChange(currentPage){
      this.getOrdersPage(currentPage,3)
    },
    prevPage(){
      let currentPage = this.page.current
      this.getOrdersPage(currentPage,3)
    },
    nextPage(){
      let currentPage = this.page.current
      this.getOrdersPage(currentPage,3)
    },
  },
}
</script>

<style scoped>

</style>
