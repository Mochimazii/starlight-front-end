<template>
  <v-card
      elevation="5"
      class="d-flex flex-column align-center justify-center bkop-medium pa-6"
  >
    <h1
        class="headline d-flex align-center flex-row mb-4"
    >
      <v-icon
          left
      >
        mdi-magnify
      </v-icon>

      {{ "找点喜欢的" }}
    </h1>

    <v-text-field
        v-model="KeyWord"
        placeholder="搜索..."
        hint="键入物品名称后 Enter键搜索"
        persistent-hint
        solo
        full-width
        rounded
        class="search-input-bar transition-background"
        prepend-inner-icon="mdi-magnify"
        autocomplete="off"
        style="flex-shrink: 0;width: 100%;"
        clearable
        @blur="search"
        @keyup.enter="search"
    >

    </v-text-field>

  </v-card>
</template>

<script>
export default {
  name: "GoodSearch",
  data(){
    return {
      KeyWord:''
    }
  },
  created() {
    this.KeyWord = this.$store.state.goodKeyWord
  },
  methods:{
    search(){
      this.$store.commit('SET_GoodKeyWord',this.KeyWord)
    }
  },
  computed:{
    goodKeyWord(){
      return this.$store.state.goodKeyWord
    }
  },
}
</script>

<style lang="scss" scoped>
.bkop-medium {
  background: rgba(255, 255, 255, .9) !important;
}

.search-input-bar {
::v-deep.v-input__slot {
  transition: all .225s cubic-bezier(0.165, 0.84, 0.44, 1) !important;
  box-shadow: 0 0 5px rgba(0, 0, 0, .4), 0 0 0 1px rgba(255, 255, 255, .9) !important;
}

::v-deep.v-messages__wrapper {
  text-align: center;
  letter-spacing: 0.05rem !important;
  margin-top: 4px;
}

&.v-input--is-focused ::v-deep.v-input__slot {
   box-shadow: 0 0 1px 3px rgba(255, 255, 255, .6), 0 0 0 1px rgba(255, 255, 255, .9) !important
 }
&.search__no-result ::v-deep.v-input__slot {
   background: rgba(255, 82, 82, .4) !important
 }

&.theme--light {
&.search-input-bar ::v-deep.v-input__slot {
   box-shadow: 0 0 5px rgba(0, 0, 0, .4) !important
 }
&.search-input-bar.v-input--is-focused ::v-deep.v-input__slot {
   box-shadow: 0 0 0 3px rgba(0, 0, 0, .4) !important
 }
}
}
.v-card > *:last-child:not(.v-btn):not(.v-chip):not(.v-avatar){
  border-bottom-left-radius:28px;
  border-bottom-right-radius: 28px;
}
.v-input {
  flex: inherit;
}
</style>
