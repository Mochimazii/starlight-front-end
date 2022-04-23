<template>
  <div>
    <v-container class="mt-3" style="width: 80vw">
      <v-row>
        <v-col cols="12">
          <v-tabs
              v-model="tab"
              background-color="transparent"
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
      <router-view/>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Purchased",
  data(){
    return{
      tab:null,
      routes:[
        {
          name:"待发货",
          to:"Sending"
        },
        {
          name:"待收货",
          to:"Receiving"
        },
        {
          name:"已完成",
          to:"Done"
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
