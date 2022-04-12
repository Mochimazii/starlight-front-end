<template>
  <div>
    <v-container class="mt-3" style="width: 80vw">
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-row>
              <v-col cols="4" class="d-flex justify-center">
                <v-avatar
                    color="primary"
                    size="60"
                >
                  <img
                      :src="user.userAvatar"
                  >
                </v-avatar>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1" class="d-flex justify-center align-self-center">
                <span class="subtitle-1">头像:</span>
              </v-col>
              <v-col cols="2" class="d-flex justify-center align-self-center">
                <v-file-input
                  v-model="image"
                  label="头像上传"
                  filled
                  accept="image/png,image/jpg,image/jpeg"
                  rounded
                  prepend-icon=""
                  hide-details
                  prepend-inner-icon="mdi-account-circle"
                  @change="handleFile"
                >

                </v-file-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1" class="d-flex justify-center align-self-center">
                <span class="subtitle-1">用户名:</span>
              </v-col>
              <v-col cols="4" class="d-flex justify-center align-self-center">
                <v-text-field
                    :label="user.userName"
                    v-model="user.userName"
                    outlined
                    rounded
                    hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1" class="d-flex justify-center align-self-center">
                <span class="subtitle-1">邮箱:</span>
              </v-col>
              <v-col cols="4" class="d-flex justify-center align-self-center">
                <v-text-field
                    :label="user.userEmail"
                    v-model="user.userEmail"
                    outlined
                    rounded
                    hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1" class="d-flex justify-center align-self-center">
                <span class="subtitle-1">手机号:</span>
              </v-col>
              <v-col cols="4" class="d-flex justify-center align-self-center">
                <v-text-field
                    :label="user.userPhone"
                    v-model="user.userPhone"
                    outlined
                    rounded
                    hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1" class="d-flex justify-center align-self-center">
                <span class="subtitle-1">学校:</span>
              </v-col>
              <v-col cols="4" class="d-flex justify-center align-self-center">
                <v-text-field
                    :label="user.userSchool"
                    v-model="user.userSchool"
                    outlined
                    rounded
                    hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1" class="d-flex justify-center align-self-center">
                <span class="subtitle-1">学院:</span>
              </v-col>
              <v-col cols="4" class="d-flex justify-center align-self-center">
                <v-text-field
                    :label="user.userFaculty"
                    v-model="user.userFaculty"
                    outlined
                    rounded
                    hide-details
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="5" class="d-flex justify-center align-self-center">
                <v-btn
                    rounded
                    x-large
                    color="primary"
                    dark
                    @click="uploadProfile"
                >
                  资料更新
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog
      v-model="dialog"
      persistent
    >
      <v-card
        max-height="500"
      >
        <v-card
            height="360"
        >
          <VueCropper
              ref="cropper"
              :img="option.img"
              :outputSize="option.size"
              :outputType="option.outputType"
              :info="true"
              :full="option.full"
              :canMove="option.canMove"
              :canMoveBox="option.canMoveBox"
              :original="option.original"
              :autoCropWidth="option.autoCropWidth"
              :autoCropHeight="option.autoCropHeight"
              :autoCrop="option.autoCrop"
              :fixed="option.fixed"
              :fixedNumber="option.fixedNumber"
              :centerBox="option.centerBox"
              :infoTrue="option.infoTrue"
              :fixedBox="option.fixedBox"
              :maxImgSize="option.maxImgSize"
          >

          </VueCropper>

        </v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="red darken-1"
              text
              @click="cancel"
          >
            取消
          </v-btn>
          <v-btn
              color="green darken-1"
              text
              @click="uploadAvatar"
          >
            保存
          </v-btn>
        </v-card-actions>
      </v-card>


    </v-dialog>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  name: "Setting",
  components:{
    VueCropper
  },
  inject:["reload"],
  data(){
    return {
      dialog:false,
      image:null,
      user:{
        userId:0,
        userAvatar:"https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
        userName:"春色正好",
        userEmail:"597415248@qq.com",
        userPhone:"19858186829",
        userSchool:"杭州电子科技大学",
        userFaculty:"计算机学院"
      },
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 60, // 默认生成截图框宽度
        autoCropHeight: 60, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        maxImgSize:800
      },
    }
  },
  mounted() {
    //资料更新，头像更新
      this.$axios.get('user/info')
        .then(res => {
          this.user = res.data.data
        })
  },
  methods:{
    handleFile(){
      if(this.image != null){
        this.dialog = true
        let fr = new FileReader()
        fr.onload = (e) => {
          let imgBlob
          if(typeof e.target.result === 'object'){
            imgBlob = window.URL.createObjectURL(new Blob([e.target.result]))
          }else {
            imgBlob = e.target.result
          }
          this.option.img = imgBlob
          //console.log(this.option.img)
        }
        fr.readAsDataURL(this.image)
      }

    },
    cancel(){
      this.dialog = false
      this.image = null
    },
    uploadAvatar(){
      this.$refs.cropper.getCropBlob(data => {
        //console.log(data)

        let files = new window.File([data], '图片')
        let avatar = new FormData()
        avatar.append('file',files)
        console.log(files)
        this.$axios.post('user/avatar',avatar, {
          headers: {
            "Content-Type":"multipart/form-data"
          }
        }).then(res => {
          console.log("头像更新："+res.data.data)
          this.dialog = false
          this.reload()
        })
      })
    },

    uploadProfile(){
      console.log(this.user)
      this.$axios.post('user/updateInfo',this.user).then(res => {
        console.log(res.data)
        this.reload()
      })
    }
  }
}
</script>

<style scoped>

</style>
