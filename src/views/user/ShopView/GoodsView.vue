<template>
  <v-row>
    <v-col cols="12" sm="6" md="4" lg="3">
      <GoodsCard/>
    </v-col>
  </v-row>
</template>

<script>
import GoodsCard from "@/components/GoodsCard";
export default {
  name: "GoodsView",
  components:{
    GoodsCard,
  }
}
</script>

<style scoped>

</style>
