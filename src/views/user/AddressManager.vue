<template>
  <div>
    <v-container class="mt-3" style="width: 80vw">
      <v-row>
        <v-col cols="12">
          <rin-container
              title="地址操作"
              class="d-flex"
          >
            <v-btn
                color="error"
                @click.stop="alertAddressDio('add')"
            >
              新增地址
            </v-btn>
          </rin-container>
        </v-col>
      </v-row>
      <v-row>
        <v-card class="ma-4" v-for="address in addressList" :key="address.addressId">
          <v-card-title>
            <v-icon
                large
                left
            >
              mdi-account-circle-outline
            </v-icon>
            <span class="title font-weight-light">{{address.addressConsignee}}</span>
            <v-chip
                class="ma-2"
                color="orange"
                text-color="white"
                v-if="address.addressStatus === 1"
            >
              默认地址
            </v-chip>
          </v-card-title>
          <v-card-text>
            <div class="my-1 d-inline-block mr-3">地址 : <span class="text--primary">{{address.addressDetail}} </span></div>
            <div class="my-1 d-inline-block">手机 : <span class="text--primary">{{address.addressTel}} </span></div>
          </v-card-text>
          <v-card-actions>
            <v-btn
                color="cyan"
                class="white--text"
                @click.stop="alertAddressDio('update',address)"
            >
              修改
            </v-btn>
            <v-btn
                color="red"
                class="white--text"
                @click="deleteAddress(address.addressId)"
            >
              删除
            </v-btn>
            <v-btn
                color="orange"
                class="white--text"
                @click="setDefault(address.addressId)"
                v-if="address.addressStatus === 0"
            >
              设为默认地址
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>

    <v-dialog max-width="600px" v-model="dialog" ref="form">
      <v-card>
        <v-card-title>
          <h3>地址操作</h3>
        </v-card-title>
        <v-card-text>
          <v-form class="px-3" ref="form">
            <v-text-field label="收货人" v-model="address.addressConsignee" :rules="inputRules"></v-text-field>
            <v-text-field label="地址" v-model="address.addressDetail" :rules="inputRules"></v-text-field>
            <v-text-field label="手机" v-model="address.addressTel" :rules="inputRules"></v-text-field>
            <v-btn v-if="opt === 'add'" text class="success mx-0 mt-3" @click="addAddress">保存收货地址</v-btn>
            <v-btn v-else text class="success mx-0 mt-3" @click="updateAddress">保存收货地址</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import rinContainer from '@/components/rin-container'
export default {
  name: "AddressManager",
  inject:["reload"],
  components:{
    rinContainer,
  },
  data(){
    return{
      address:{
        addressId:null,
        addressStatus:1,
        addressConsignee:"",
        addressDetail:"",
        addressTel:""
      },
      addressTemp:{},
      addressList:[],
      dialog:false,
      opt:'',
      inputRules:[
        v => v != null && v.length >= 1 || '不可为空'
      ],
    }
  },
  created() {
    this.$axios.get("address/list")
        .then(res => {
          this.addressList = res.data.data
        })
  },
  methods:{
    alertAddressDio(opt,address){
      this.opt = opt
      if(opt === "update"){
        this.address.addressId = address.addressId
        this.address.addressStatus = address.addressStatus
        this.address.addressConsignee = address.addressConsignee
        this.address.addressDetail = address.addressDetail
        this.address.addressTel = address.addressTel
        this.address.userId = address.userId
      }
      this.dialog = true
    },
    addAddress(){
      let address = this.address
      address.addressStatus = 0
      console.log(address)
      this.$axios.post("address/insert",address)
          .then(res => {
        this.reload()
      })
    },
    updateAddress(){
      let address = this.address
      console.log(address)
      this.$axios.post("address/update",address)
          .then(res => {
            this.reload()
      })
    },
    deleteAddress(addressId){
      console.log(addressId)
      this.$axios.get("address/delete",{
        params:{
          addressId:addressId
        }
      })
          .then(res => {
            this.reload()
          })
    },
    setDefault(addressId){
      console.log(addressId)
      this.$axios.get("address/setdefault",{
        params:{
          addressId:addressId
        }
      }).then(res =>{
        this.reload()
      })
    }
  }
}
</script>

<style scoped>

</style>
