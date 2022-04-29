<template>
  <div>
    <v-container class="mt-3" style="width: 80vw">
      <v-row>
        <v-col cols="12">
          <v-card
              class="mx-auto text-center"
              color="green"
              dark
          >
            <v-card-title>
              销售统计一览
            </v-card-title>
            <v-card-text>
              <v-sheet color="rgba(0, 0, 0, .12)">
                <v-sparkline
                    :labels="labels"
                    :value="value"
                    color="rgba(255, 255, 255, .7)"
                    height="100"
                    padding="24"
                    stroke-linecap="round"
                    smooth
                >

                </v-sparkline>
              </v-sheet>
            </v-card-text>

            <v-card-text>
              <v-select
                  :items="items"
                  v-model="cate"
                  outlined
                  @change="handleCateChange"
              ></v-select>
            </v-card-text>

          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>
export default {
  name: "OverView",
  data(){
    return{
      cate:'1天内销售状况',
      value: [
        423,
        446,
        675,
        510,
      ],
      labels: [
        '零食',
        '书籍',
        '工具',
        '其他',
      ],
      originLabels:[
        '零食',
        '书籍',
        '工具',
        '其他',
      ],
      items: ['1天内销售状况', '3天内销售状况', '7天内销售状况'],
    }
  },
  created() {
    this.handleCateChange()
  },
  methods:{
    handleCateChange(){
      console.log(this.cate)
      let duration
      if(this.cate === '1天内销售状况'){
        duration = 1
      }else if(this.cate === '3天内销售状况'){
        duration = 3
      }else if(this.cate === '7天内销售状况'){
        duration = 7
      }
      this.$axios.get("order/chart",{
        params:{
          duration:duration
        }
      }).then(res => {
        console.log(res)
        this.value = res.data.data
        for(let i=0;i<this.originLabels.length;i++){
          this.labels[i] = this.originLabels[i] + this.value[i] + "单"
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
