<template>
  <v-container class="mt-3" style="width: 80vw">
    <v-row>
      <v-col cols="12">
        <JwChat-index
            :config="config"
            :showRightBox='false'
            scrollType="noscroll"
            :taleList="taleList"
            @enter="bindEnter"
            v-model="inputMsg"
            :toolConfig="tool"
            :winBarConfig="winBarConfig"
        />

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Message",
  inject:['reload'],
  data () {
    return {
      inputMsg: '',
      sessionCode:'',
      taleList: [
        {
          date: "2020/04/25 21:19:07",
          text: { "text": "起床不" },
          mine: false,
          name: "留恋人间不羡仙",
          img: "http://localhost:8443/api/avatar/bf1ijx.jpg"
        },
        {
          date: "2020/04/25 21:19:07",
          text: { "text": "<img data-src=http://localhost:8443/api/avatar/bf1ijx.jpg/>" },
          mine: false,
          name: "只盼流星不盼雨",
          img: "http://localhost:8443/api/avatar/bf1ijx.jpg"
        },
      ],
      tool: {
        show: ['file'],
        showEmoji: false,
        callback: this.toolEvent
      },
      config: {
        img: 'http://localhost:8443/api/avatar/vi0jg4.jpg',
        name: 'JwChat',
        dept: '???????',
        callback: this.bindCover,
        historyConfig:{
          show: true,
          tip: '加载更多',
          callback: this.bindLoadHistory,
        },
      },
      winBarConfig: {
        active: 'win00',
        width: '160px',
        listHeight: '60px',
        list: [ {
          id: 'win00',
          img: 'http://localhost:8443/api/avatar/vi0jg4.jpg',
          name: 'JwChat',
          dept: '最简单、最便捷',
          readNum: 99
        },
          {
            id: 'win01',
            img: 'http://localhost:8443/api/avatar/bf1ijx.jpg',
            name: '阳光明媚爱万物',
            dept: '沙拉黑油',
            readNum: 12
          },
          {
            id: 'win02',
            img: '..//image/two.jpeg',
            name: '只盼流星不盼雨',
            dept: '最后说的话'
          },
          {
            id: 'win03',
            img: '..//image/one.jpeg',
            name: '留恋人间不羡仙',
            dept: '这里可以放万物'
          },
          {
            id: 'win04',
            img: '..//image/three.jpeg',
            name: '阳光明媚爱万物',
            dept: '官方客服'
          }],
        callback: this.bindWinBar,

      }
    }
  },
  methods: {
    bindEnter () {
      const msg = this.inputMsg
      if (!msg) return;

      let form = new FormData
      form.append('sessionCode',this.sessionCode)
      form.append('userId',this.userId)
      form.append('text',JSON.stringify({text:msg}))
      const message = {
        text:{text:msg},
        sessionCode:this.sessionCode,
        userId:this.userId
      }
      this.$axios.post('message/inserttext',message).then(res => {
        let msg = {...res.data.data,mine:true}
        this.taleList.push(msg)
      })
    },
    /**
     * @description:
     * @param {*} type 当前点击的按钮
     * @param {*} payload 附加文件或者需要处理的数据
     * @return {*}
     */
    toolEvent (type, payload) {
      console.log('tools', type, payload)
      console.log(payload[0])

      let form = new FormData
      form.append('sessionCode',this.sessionCode)
      form.append('userId',this.userId)
      form.append('picture',payload[0])
      this.$axios.post('message/insert',form,{
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        let msg = {...res.data.data,mine:true}
        this.taleList.push(msg)
      })
    },
    /**
     * @description: 点击加载更多的回调函数
     * @param {*}
     * @return {*}
     */
    bindLoadHistory () {
      const history = new Array(3).fill().map((i, j) => {
        return {
          "date": "2020/05/20 23:19:07",
          "text": { "text": j + new Date() },
          "mine": true,
          "name": "JwChat",
          "img": "image/three.jpeg"
        }
      })
      let list = history.concat(this.list)
      this.list = list
      console.log('加载历史', list, history)
    },
    bindCover (type) {
      console.log('header', type)
    },
    bindWinBar (play = {}) {
      const {type, data={}} = play
      console.log("winBar",data);
      if(type==='winBar'){
        const { id, dept, name, img,sessionCode } = data
        this.winBarConfig.active = id
        this.changeTarget(data)
        this.getTaleListBySession(sessionCode)
        this.sessionCode = sessionCode
      }else if(data.type === 'remove'){
        const id = data.target.id
        this.winBarConfig.list = this.winBarConfig.list.filter(item => {
          return item.id !== id
        })
        this.$axios.post("winbar/close",data.target).then(res => console.log(res))
      }
    },
    changeTarget(userInfo){
      this.config.img = userInfo.img
      this.config.name = userInfo.name
      this.config.dept = userInfo.dept
    },
    getTaleListBySession(sessionCode){
      this.$axios.get(`message/session`,{
        params:{
          sessionCode:sessionCode
        }
      }).then(res => {
        console.log("message/session",res)
        this.taleList = res.data.data
        this.taleList = this.taleList.map(tale => {
          if(tale.userId === this.userId){
            let mine = true
            return  {...tale,mine}
          }else {
            let mine = false
            return {...tale,mine}
          }
        })
      })
    },
    initDom(dom){
      dom.style.margin = 0
      dom.style.padding = 0
      dom.style.textOverflow = "ellipsis"
      dom.style.overflow = "hidden"
      dom.style.textAlign = "left"
      dom.style.whiteSpace = "nowrap"
      dom.style.fontSize = "13px"
      dom.style.cursor = "pointer"
    },
    refreshDom(){
      let infoDom = document.getElementsByClassName('info')
      for (let i=0, len=infoDom.length; i<len; i=i+1) {
        infoDom[i].style.backgroundColor = "transparent"
        infoDom[i].style.display = "flex"
        infoDom[i].style.flexDirection = "column"
        infoDom[i].style.justifyContent = "center"
        for(let j=0, len1=infoDom[i].children.length; j<len1;j++){
          this.initDom(infoDom[i].children[j])
        }
        infoDom[i].classList.remove("info")
        i--
      }
    },

  },
  computed:{
    userId(){
      return this.$store.state.userId
    }
  },
  created() {
    let userId = this.userId
    let sessionCode
    this.$axios.get(`winbar/${userId}`).then(res => {
      this.winBarConfig.list = res.data.data
      this.winBarConfig.active = res.data.data[0].id
      sessionCode = res.data.data[0].sessionCode
      this.sessionCode = sessionCode
      this.config.img = res.data.data[0].img
      this.config.name = res.data.data[0].name
      this.config.dept = res.data.data[0].dept
    }).then(res => {
      this.getTaleListBySession(sessionCode)
    })
  },
  mounted() {
      let infoDom = document.getElementsByClassName('info')
      for (let i=0, len=infoDom.length; i<len; i=i+1) {
        infoDom[i].style.backgroundColor = "transparent"
        infoDom[i].style.display = "flex"
        infoDom[i].style.flexDirection = "column"
        infoDom[i].style.justifyContent = "center"
        for(let j=0, len1=infoDom[i].children.length; j<len1;j++){
          this.initDom(infoDom[i].children[j])
        }
        infoDom[i].classList.remove("info")
        i--
      }
  },
  watch:{
    sessionCode:{
      handler(newVal){
        if(this.timer != null){
          window.clearInterval(this.timer)
        }
        this.timer = window.setInterval(() => {
          window.setTimeout(this.getTaleListBySession(newVal), 0)
        }, 1000)

        //使用$once(eventName, eventHandler)一次性监听事件
        this.$once('hook:boforeDestory', () => {
          window.clearInterval(this.timer)
        })
      }
    }
  },
  destroyed() {
    window.clearInterval(this.timer)
  }
}
</script>

<style scoped>

</style>
