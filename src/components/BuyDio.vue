<template>
  <v-dialog max-width="600px" v-model="showDio" @click:outside="$emit('outsider')" ref="form">
    <v-card>
      <v-card-title>
        <h3>选择地址</h3>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">

          <v-select
              :items="addressList"
              v-model="selectedAddress"
              label="地址预设"
              item-text="addressDetail"
              :hint="`${selectedAddress.addressConsignee},${selectedAddress.addressTel}`"
              outlined
              persistent-hint
              return-object
          >
          </v-select>
          <v-text-field outlined hide-details label="收货人" readonly v-model="selectedAddress.addressConsignee"></v-text-field>
          <v-text-field outlined hide-details class="mt-3" readonly label="详细地址" v-model="selectedAddress.addressDetail"></v-text-field>
          <v-text-field outlined hide-details class="mt-3" readonly label="联系电话" v-model="selectedAddress.addressTel"></v-text-field>
          <v-text-field outlined class="mt-3" type="number" label="购买数量" v-model="buyNum" :rules="buyNumRules"></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                class="success mt-3"
                @click="pay"
            >付款</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>

    <v-snackbar
        v-model="snackbar"
    >
      {{ text }}

      <template v-if="this.userId !== this.good.userId" v-slot:action="{ attrs }">
        <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="goToAddressManager"
        >
          确认
        </v-btn>
      </template>
    </v-snackbar>
  </v-dialog>
</template>

<script>
export default {
  name: "BuyDio",
  props:{
    showDio:Boolean,
    good:Object
  },
  data(){
    return{
      addressList:[],
      snackbar:false,
      text:"",
      selectedAddress:{},
      buyNum:1,
      buyNumRules:[
          value => value <= this.good.goodStore && value > 0 ? true : "商品数量不正确"
      ]
    }
  },
  created() {

    this.$axios.get("address/list")
        .then(res => {
          this.addressList = res.data.data
          if(this.addressList.length === 0){
            this.snackbar = true
            this.text = "先前往地址管理界面添加地址"
          }else {
            this.addressList.forEach((ad) => {
              if(ad.addressStatus === 1){
                this.selectedAddress = ad
              }
            })
          }

        })
  },
  methods:{
    pay(){
      if(this.good.userId === this.userId ){
        this.text = "无法购买自己的商品"
        this.snackbar = true
      }else if(!this.$_.isEmpty(this.selectedAddress)){
        let good = this.good
        let address = this.selectedAddress
        let order = {
          addressId:address.addressId,
          goodId:good.goodId,
          orderNum:this.buyNum,
          orderPrice:this.buyNum * good.goodPrice,
          orderStage:1,
          orderSellId:good.userInfo.userId
        }
        console.log(address)
        this.$axios.post("order/create",order)
            .then(res => {
              console.log(res)
              this.$router.push({name: "Sending"})
            })
      }
    },
    goToAddressManager(){
      this.$router.push({name:'address'})
    }
  },
  computed:{
    userId(){
      return this.$store.state.userId
    }
  }
}
</script>

<style scoped>

</style>
