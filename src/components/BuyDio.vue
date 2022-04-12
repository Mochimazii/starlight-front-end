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
          this.addressList.forEach((ad) => {
            if(ad.addressStatus === 1){
              this.selectedAddress = ad
            }
          })
        })
  },
  methods:{
    pay(){
      console.log("pay")

    },
  }
}
</script>

<style scoped>

</style>
