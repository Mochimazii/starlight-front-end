<template>
  <div>
    <v-container class="mt-3" style="width: 80vw">
      <v-row>
        <v-col cols="12">
          <v-tabs
              v-model="tab"
              background-color="transparent"
              color="basil"
              grow
          >
            <v-tab
                v-for="route in routes"
                :key="route.name"
                :to="{name:route.to}"
                link
            >
              {{ route.name }}
            </v-tab>
          </v-tabs>
        </v-col>
      </v-row>
      <v-row v-if="this.$route.name !== 'PulledGoods'">
        <v-col cols="12" class="align-self-stretch">
          <rin-container
            title="商品操作"
            class="d-flex"
          >
            <v-btn
                color="error"
                @click.stop="showEditDio = true"
            >
              发布商品
            </v-btn>
          </rin-container>
        </v-col>
      </v-row>
      <router-view/>
      <GoodSetDio :show-dio="showEditDio" @outsider="showEditDio = false" opt="add"/>
    </v-container>

  </div>
</template>

<script>
import RinContainer from "@/components/rin-container";
import GoodSetDio from "@/components/GoodSetDio";
export default {
  name: "Publish",
  components: {
    RinContainer,
    GoodSetDio
  },
  data () {
    return {
      showEditDio:false,
      tab: null,
      routes: [
        {
          name:"在卖的",
          to:"SellingGoods"
        },
        {
          name:"已下架",
          to:"PulledGoods"
        }
      ],
    }
  },
}
</script>

<style scoped>
.basil {
  background-color: #FFFBE6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>
