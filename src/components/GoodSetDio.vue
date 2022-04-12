<template>
  <v-dialog max-width="600px" v-model="showDio" @click:outside="$emit('outsider')">
    <v-card>
      <v-card-title>
        <h3>商品编辑</h3>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="VgoodForm">

          <v-container>
            <v-row>
              <v-col
                  cols="12"
                  md="6"
              >
                <v-text-field
                    label="商品名称"
                    :counter="15"
                    :rules="nameRules"
                    v-model="goodForm.goodName"
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
                    v-model="goodForm.goodClass"
                    :rules="[v => !!v || '商品类别是必须的']"
                    required
                ></v-select>
              </v-col>
              <v-col cols="4">
                <v-text-field
                    label="数量"
                    type="number"
                    v-model="goodForm.goodStore"
                    :rules="storeRules"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                    label="价格"
                    v-model="goodForm.goodPrice"
                    type="number"
                    :rules="[v => v > 0 || '商品价格大于0']"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                    label="上一次编辑"
                    v-model="goodForm.goodDate"
                    readonly
                    required
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
              >
                <v-file-input
                    label="封面上传"
                    filled
                    accept="image/png,image/jpg,image/jpeg"
                    prepend-icon=""
                    show-size
                    hide-details="auto"
                    @change="uploadImg($event)"
                >

                </v-file-input>
              </v-col>
              <v-col
                  cols="12"
              >
                <v-combobox
                    v-model="goodForm.goodTagList"
                    label="商品标签"
                    append-icon=""
                    hint="回车键生成标签"
                    multiple
                    chips
                    return-object
                    @input="changeTags"
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
                      <v-icon
                          small
                          @click="parent.selectItem(item)"
                      >
                        $delete
                      </v-icon>
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
                    clearable
                    v-model="goodForm.goodDes"
                    clear-icon="mdi-close-circle"
                    auto-grow
                    rows="2"
                    row-height="15"
                    :counter="320"
                    :rules="[v => v.length <= 320 || '字数不多于320字']"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                v-if="good.goodStage === 1"
                class="error mt-3"
                @click="goodDown"
            >
              下架
            </v-btn>
            <v-btn
                v-if="good.goodStage === 0"
                class="error mt-3"
                @click="goodUp"
            >
              上架
            </v-btn>
            <v-btn
                class="success mt-3"
                @click="chooseOpt"
            >
              保存商品信息
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "GoodSetDio",
  inject:["reload"],
  props:{
    showDio:Boolean,
    good: {
      type:Object,
      default(){
        return null
      }
    },
    opt:String
  },
  data(){
    return{
      tags:[],
      image:null,
      goodForm:{
        goodId:null,
        goodName:"",
        goodClass:"",
        goodStore:1,
        goodCover:"",
        goodPrice:0,
        goodStage:-1,
        goodDate:"2022-4-2",
        goodDes:"",
        userId:'',
        goodTagList:[],
      },
      nameRules: [
        v => !!v || '商品名称是必须的',
        v => v.length <= 15 || '名称必须在15个字符以下',
      ],
      storeRules: [
        v => !!v || '商品数量是必须的',
        v => v > 0 && v < 100 || '商品数量在1-99之间',
      ],
    }
  },
  mounted() {
    if(null != this.good){
      this.goodForm = this.$_.cloneDeep(this.good)
    }
  },
  methods:{
    goodDown(){
      let goodId = this.good.goodId
      console.log("商品下架",goodId)
      this.$axios.get("good/updatestage",{
        params:{
          goodId:goodId,
          goodStage:0
        }
      }).then(res => this.reload())
    },
    goodUp(){
      let goodId = this.good.goodId
      console.log("商品上架",goodId)
      this.$axios.get("good/updatestage",{
        params:{
          goodId:goodId,
          goodStage:1
        }
      }).then(res => this.reload())
    },
    changeTags(){
      console.log(this.goodForm.goodTagList)
    },
    uploadImg(file){
      console.log(file)
      this.goodForm.goodCover = file
    },
    chooseOpt(){
      if(this.opt === 'add')this.addGood()
      else this.updateGood()
    },
    addGood(){
      let goodForm = this.generateGoodForm()
      console.log("添加商品",goodForm)
      if(this.$refs.VgoodForm.validate()){
        this.$axios.post("good/create",goodForm,{
          headers:{
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          this.reload()
        })
      }
    },
    updateGood(){
      let goodForm = this.generateGoodForm()
      console.log("更新商品",goodForm)
      if(this.$refs.VgoodForm.validate()){
        this.$axios.post("good/update",goodForm,{
          headers:{
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          this.reload()
        })
      }
    },
    generateGoodForm(){
      let goodForm = new FormData()
      goodForm.append('goodName',this.goodForm.goodName)
      goodForm.append('goodClass',this.goodForm.goodClass)
      goodForm.append('goodStore',this.goodForm.goodStore)
      goodForm.append('goodPrice',this.goodForm.goodPrice)
      goodForm.append('goodDate',this.goodForm.goodDate)
      goodForm.append('goodStage',this.goodForm.goodStage)
      goodForm.append('goodDes',this.goodForm.goodDes)
      if(null != this.good){
        console.log("提醒goodId",this.good)
        goodForm.append('goodId',this.good.goodId)
      }
      //图片单独
      goodForm.append('cover',this.goodForm.goodCover)
      //Tag数组
      for (let i=0,len=this.goodForm.goodTagList.length;i<len;i++){
        let goodTag = this.goodForm.goodTagList[i]
        let goodId = this.good.goodId
        goodForm.append("goodTagList["+i+"].tagId",goodTag.tagId?goodTag.tagId:null)
        goodForm.append("goodTagList["+i+"].tagContent",goodTag.tagContent)
        goodForm.append("goodTagList["+i+"].goodId",goodId?goodId:-1)
      }
      return goodForm
    }
  },
  watch:{
    showDio:{
      handler(newValue){
        if(newValue === false && this.good !== null) {
          this.goodForm = this.$_.cloneDeep(this.good)
        }
      }
    },
    'goodForm.goodTagList':{
      handler(val,prev){
        console.log("tag变化了")
        if (val.length > 3) {
          this.$nextTick(() => this.goodForm.goodTagList.pop())
          return
        }
        if (val.length === prev.length) return
        this.goodForm.goodTagList = val.map(v => {
          let goodId = null
          if(null == this.goodForm.goodId){
            goodId = -1
          }
          if (typeof v === 'string') {
            v = {
              goodId:goodId,
              tagContent: v,
              tagId:-1,
            }
          }
          return v
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
