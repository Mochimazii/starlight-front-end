<template>
  <v-dialog max-width="800px" v-model="showDio" @click:outside="$emit('outsider')">
    <v-card>
      <v-card-title
          class="grey lighten-3"
      >
        {{ order.good.goodName }}
      </v-card-title>
      <v-card-subtitle
          class="pt-2 grey lighten-3 text-start"
      >
        {{ "共"+order.orderNum+"个" }}
      </v-card-subtitle>
      <v-stepper
        v-model="step"
      >
        <v-stepper-header>
          <v-stepper-step
              :complete="step > 1"
              step="1"
          >
            待发货
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
              :complete="step > 2"
              step="2"
          >
            待收货
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
              step="3"
              :complete="step > 3"
          >
            已完成
          </v-stepper-step>

          <template v-if="order.orderHaveAppeal === 2">
            <v-divider></v-divider>

            <v-stepper-step step="4">
              商品申诉
            </v-stepper-step>
          </template>


        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <template v-if="userId === order.orderSellId">
              <v-alert
                  color="orange darken-3"
                  border="left"
                  outlined
                  class="mb-2 text-start"
              >

                <ul>
                  <li><p class="mb-0 font-weight-bold d-inline-block">收货人：</p>{{order.address.addressConsignee}}</li>
                  <li><p class="mb-0 font-weight-bold d-inline-block">详细地址：</p>{{order.address.addressDetail}}</li>
                  <li><p class="mb-0 font-weight-bold d-inline-block">联系电话：</p>{{order.address.addressTel}}</li>
                </ul>
              </v-alert>

              <v-file-input
                  ref="fileInput"
                  v-model="orderPicture"
                  filled
                  label="送货照片"
                  persistent-hint
                  class="image-input my-4"
                  counter
                  show-size
                  :rules="[ v => !!v || '送达截图是必须的',]"
                  accept="image/*"
                  prepend-icon="mdi-image"
                  @change="handleFile"
              >
              </v-file-input>

              <v-img
                  contain
                  max-height="350"
                  :src="this.orderPictureUrl"
                  class="mb-4"
                  lazy-src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
              ></v-img>

              <v-btn
                  color="success"
                  @click="sendedConfirm"
              >
                确认送达
              </v-btn>
            </template>

            <template v-else>
              <v-alert
                  color="orange darken-3"
                  border="left"
                  outlined
                  icon="mdi-bicycle-cargo"
                  class="mb-2 text-start"
              >
                您的商品正在加急运送中！！
              </v-alert>
            </template>

          </v-stepper-content>

          <v-stepper-content step="2">
            <template v-if="this.userId === this.order.orderGetId">
              <v-alert
                  color="light-green darken-2"
                  border="left"
                  outlined
                  class="mb-2 text-start"
              >
                <ul>
                  <li><p class="mb-0 font-weight-bold d-inline-block">收货人：</p>{{order.address.addressConsignee}}</li>
                  <li><p class="mb-0 font-weight-bold d-inline-block">详细地址：</p>{{order.address.addressDetail}}</li>
                  <li><p class="mb-0 font-weight-bold d-inline-block">联系电话：</p>{{order.address.addressTel}}</li>
                </ul>
              </v-alert>

              <v-img
                  contain
                  max-height="350"
                  :src="this.order.orderPicture"
                  class="mb-4"
                  :lazy-src="this.orderPictureUrl"
              ></v-img>

              <v-btn
                  color="success"
                  @click="receiveConfirm"
              >
                确认收货
              </v-btn>
            </template>

            <template v-else>
              <v-alert
                  color="light-green darken-2"
                  border="left"
                  icon="mdi-alert-decagram"
                  outlined
                  class="mb-2 text-start"
              >
                正在等待买家收货！！
              </v-alert>
            </template>

          </v-stepper-content>

          <v-stepper-content step="3">
            <template v-if="userId === this.order.orderGetId">
              <v-alert
                  color="light-green darken-2"
                  border="left"
                  outlined
                  icon="mdi-check-decagram"
                  class="mb-2 text-start"
              >
                本次交易已经完成，如果有质量问题，您可以在<strong>{{order.orderOverTime}}</strong>前申诉
              </v-alert>

              <v-form ref="appealForm">
                <v-container>
                  <v-row>
                    <v-col
                        cols="12"
                        md="6"
                    >
                      <v-text-field
                          label="申诉标题"
                          v-model="appeal.appealTitle"
                          :counter="15"
                          :rules="[v => (v.length <= 15)&&(v.length > 0) || '标题必须在15个字符以下']"
                          required
                          :disabled="!beforeLimit"
                      ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                    >
                      <v-textarea
                          outlined
                          label="申诉内容"
                          clearable
                          v-model="appeal.appealDes"
                          clear-icon="mdi-close-circle"
                          auto-grow
                          rows="2"
                          :disabled="!beforeLimit"
                          row-height="15"
                          :counter="320"
                          :rules="[v => (v.length <= 240)&&(v.length > 0) || '字数不多于240字']"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>

                <v-btn
                    color="error"
                    class="mx-2"
                    @click="$emit('outsider')"
                >
                  取消
                </v-btn>

                <v-btn
                    class="mx-2"
                    color="success"
                    @click="sendAppeal"
                >
                  确认申诉
                </v-btn>
              </v-form>
            </template>

            <template v-else>
              <v-alert
                  color="light-green darken-2"
                  border="left"
                  outlined
                  icon="mdi-check-decagram"
                  class="mb-2 text-start"
              >
                本次交易已经完成，如果有质量问题，用户会在<strong>{{order.orderOverTime}}</strong>前申诉
              </v-alert>
            </template>

          </v-stepper-content>

          <v-stepper-content step="4">
            <template v-if="null != order.appeal && order.appeal.appealStage === 1">
              <v-alert
                  color="orange darken-3"
                  border="left"
                  outlined
                  icon="mdi-alert-circle"
                  class="mb-2 text-start"
              >
                该商品正在申诉中！！
              </v-alert>

              <v-form ref="appealReadForm">
                <v-container>
                  <v-row>
                    <v-col
                        cols="12"
                        md="6"
                    >
                      <v-text-field
                          label="申诉标题"
                          v-model="order.appeal.appealTitle"
                          :counter="15"
                          required
                          readonly
                      ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                    >
                      <v-textarea
                          outlined
                          label="申诉内容"
                          v-model="order.appeal.appealDes"
                          clear-icon="mdi-close-circle"
                          auto-grow
                          rows="2"
                          readonly
                          row-height="15"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </template>

            <template v-else>
              <v-alert
                  color="green darken-3"
                  border="left"
                  outlined
                  icon="mdi-alert-circle"
                  class="mb-2 text-start"
              >
                {{ "申诉处理完成" }}
              </v-alert>
              <template v-if="order.appeal !== null">
                <v-container>
                  <v-row>

                    <v-col
                        cols="12"
                        md="6"
                    >
                      <v-select
                          :items="['无争议', '买方过失', '卖方过失']"
                          label="仲裁类别"
                          v-model="order.appeal.appealResultClass"
                          :rules="[v => !!v || '仲裁类别是必须的']"
                          :readonly="order.appeal.appealStage === 2"
                          required
                      ></v-select>
                    </v-col>

                    <v-col
                        cols="12"
                    >
                      <v-textarea
                          outlined
                          label="申诉结果"
                          v-model="order.appeal.appealResult"
                          auto-grow
                          rows="2"
                          :readonly="order.appeal.appealStage === 2"
                          row-height="15"
                          :counter="320"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </template>

            </template>

              <v-btn
                  color="error"
                  class="mx-2"
                  @click="$emit('outsider')"
              >
                确认
              </v-btn>


          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "OrderDio",
  inject:["reload"],
  props:{
    showDio:Boolean,
    order:Object
  },
  data(){
    return{
      step:1,
      orderPicture:null,
      orderPictureUrl:'',
      appeal:{
        appealTitle:'',
        appealDes:'',
      }
    }
  },
  computed:{
    userId(){
      return this.$store.state.userId
    },
    beforeLimit(){
      let now = this.dayjs()
      let limit = this.dayjs(this.order.orderOverTime,"YYYY-MM-DD")
      return now.isSameOrBefore(limit, 'day');
    }
  },
  mounted() {
    console.log(this.order)
    this.step = this.order.orderStage
    if(this.order.orderHaveAppeal === 2){
      this.step = 4
    }
  },
  methods:{
    handleFile(){
      console.log("handleFile",this.orderPicture)
      const fr = new FileReader()
      let that = this
      fr.readAsDataURL(this.orderPicture)
      fr.addEventListener('load', function() {
        that.orderPictureUrl = fr.result
      })
    },
    sendedConfirm(){
      if(this.$refs.fileInput.validate()){
        console.log("合法")
        let orderForm = new FormData()
        orderForm.append('orderPic',this.orderPicture)
        orderForm.append('orderStage',2)
        orderForm.append('orderId',this.order.orderId)
        this.$axios.post("order/update",orderForm).then(res => {
          console.log(res)
          this.order = res.data.data
          this.step = res.data.data.orderStage
        })

      }

    },
    receiveConfirm(){
      console.log("确认收货",this.order)
      let orderForm = new FormData()
      orderForm.append('orderStage',3)
      orderForm.append('orderId',this.order.orderId)
      orderForm.append('orderPrice',this.order.orderPrice)
      orderForm.append('orderSellId',this.order.orderSellId)
      orderForm.append('orderGetId',this.order.orderGetId)
      this.$axios.post("order/update",orderForm).then(res => {
        console.log(res)
        this.order = res.data.data
        this.step = res.data.data.orderStage
      })
    },
    sendAppeal(){
      this.order.appeal = this.appeal
      let order = this.order
      if(this.$refs.appealForm.validate()){
        this.$axios.post("appeal/create",order).then(res => {
          console.log(res)
          this.order = res.data.data
          this.reload()
        })
      }
    },

  }
}
</script>

<style scoped>

</style>
