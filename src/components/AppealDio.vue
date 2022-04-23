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
              editable
              step="1"
          >
            商品详情
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step
              :complete="step > 2"
              editable
              step="2"
          >
            商品申诉
          </v-stepper-step>

        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <template>
              <v-alert
                  color="light-green darken-3"
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

              <v-container>
                <v-row>
                  <v-col
                      cols="12"
                      md="6"
                  >
                    <v-text-field
                        label="商品名称"
                        readonly
                        v-model="order.good.goodName"
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      md="6"
                  >
                    <v-select
                        :items="['零食', '书籍', '工具', '其他']"
                        label="商品类别"
                        v-model="order.good.goodClass"
                        readonly
                        required
                    ></v-select>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                        label="数量"
                        type="number"
                        readonly
                        v-model="order.good.goodStore"
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                        label="价格"
                        v-model="order.good.goodPrice"
                        type="number"
                        readonly
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                        label="上一次编辑"
                        v-model="order.good.goodDate"
                        readonly
                        required
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                  >
                    <v-combobox
                        v-model="order.good.goodTagList"
                        label="商品标签"
                        append-icon=""
                        multiple
                        readonly
                        chips
                        return-object
                    >
                      <template v-slot:selection="{ attrs, item, parent, selected }">
                        <v-chip
                            v-bind="attrs"
                            :input-value="selected"
                            label
                            small
                        >
                      <span class="pr-2">
                        {{ item.tagContent }}
                      </span>
                        </v-chip>
                      </template>
                    </v-combobox>
                  </v-col>
                  <v-col
                      cols="12"
                  >
                    <v-textarea
                        outlined
                        label="商品详情"
                        readonly
                        v-model="order.good.goodDes"
                        auto-grow
                        rows="2"
                        row-height="15"
                        :counter="320"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </template>

          </v-stepper-content>

          <v-stepper-content step="2">
            <template v-if="appeal.appealStage === 1">
              <v-alert
                  color="orange darken-3"
                  border="left"
                  outlined
                  icon="mdi-alert-decagram"
                  class="mb-2 text-start"
              >
                该申诉亟待解决！！
              </v-alert>
            </template>

            <template v-else>
              <v-alert
                  color="light-green darken-2"
                  border="left"
                  icon="mdi-check-decagram"
                  outlined
                  class="mb-2 text-start"
              >
                该申诉已解决
              </v-alert>
            </template>

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
                        v-model="appeal.appealDes"
                        clear-icon="mdi-close-circle"
                        auto-grow
                        rows="2"
                        readonly
                        row-height="15"
                    ></v-textarea>
                  </v-col>

                    <v-col
                        cols="12"
                        md="6"
                    >
                      <v-select
                          :items="['无争议', '买方过失', '卖方过失']"
                          label="仲裁类别"
                          v-model="appeal.appealResultClass"
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
                          v-model="appeal.appealResult"
                          auto-grow
                          :rules="[v => v.length <= 320 || '字数不多于320字']"
                          rows="2"
                          :readonly="order.appeal.appealStage === 2"
                          row-height="15"
                          :counter="320"
                      ></v-textarea>
                    </v-col>


                </v-row>
              </v-container>
            </v-form>
            <template v-if="order.appeal.appealStage === 1">
              <v-btn
                  color="success"
                  @click="receiveResult"
              >
                确认仲裁
              </v-btn>
            </template>


          </v-stepper-content>

        </v-stepper-items>
      </v-stepper>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AppealDio",
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
        appealId:'',
        appealTitle:'',
        appealDes:'',
        appealResult:'',
      }
    }
  },
  computed:{
    userId(){
      return this.$store.state.userId
    },
  },
  mounted() {
    this.appeal = this.$_.cloneDeep(this.order.appeal)
    this.step = this.order.appeal.appealStage
  },
  methods:{
    receiveResult(){
      console.log(this.appeal)
      if(this.$refs.appealForm.validate()){
        this.order.appeal = this.appeal
        let order = this.order
        let that = this
        this.$axios.post("appeal/setresult",order)
            .then(res => {
              console.log(res)
              that.order = res.data.data
              this.reload()
            })
      }

    }
  }
}
</script>

<style scoped>

</style>
