<template>
  <div>
    <v-navigation-drawer
        v-model="drawer"
        :mini-variant="mini"
        mini-variant-width="80"
        width="260"
        app
        class="navigationDrawer"
    >
      <v-list-item class="mb-0 justify-space-between pl-3">
        <v-list-item-avatar>
          <v-img
              :src="require('@/assets/焦哥哥2.jpg')"
          />
        </v-list-item-avatar>

        <v-list-item-content class="pl-2 title">
          <v-list-item-title class="text-h5">
            星 光
          </v-list-item-title>
          <v-list-item-subtitle>
            后台管理
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="mx-3 mb-2" />

      <v-list>
        <v-list-item
            @click="logOut"
        >
          <v-list-item-icon>
            <v-icon>
              mdi-chevron-left
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="itemTitle font-weight-bold">
              退出登陆
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <template v-for="route in routes">
          <v-list-item
              v-if="!route.meta.inGroup"
              :key="route.name"
              link
              :to="{path: route.path}"
              class="listItem"
              active-class="listItemActive font-weight-bold white--text"
          >
            <v-list-item-icon
                class="listItemIcon"
            >
              <v-icon
                  v-text="route.meta.icon"
              />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="itemTitle font-weight-bold">
                {{ route.meta.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-divider />
      </v-list>

    </v-navigation-drawer>

    <v-app-bar
        height="70"
        color="transparent"
        flat
        app
    >
      <v-app-bar-nav-icon
          class="hidden-md-and-up"
          @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-btn
          class="ml-3 mr-4"
          elevation="1"
          fab
          small
          @click="mini = !mini"
      >
        <v-icon>
          {{ mini ? 'mdi-format-list-bulleted' : 'mdi-dots-vertical' }}
        </v-icon>
      </v-btn>
      <v-app-bar-title>{{ this.$route.meta.title }}</v-app-bar-title>
      <v-spacer/>

    </v-app-bar>
  </div>

</template>

<script>
export default {
  name: "AdminBar",
  data:() => ({
    drawer:true,
    mini:true,
    routes:[],
  }),

  methods:{
    search(){
      console.log("发送到发顺丰的")
    },
    logOut(){
      this.$store.dispatch('logOut')
      this.$router.push({name:'Login'})
    }
  },

  beforeMount() {
    this.routes = this.$router.options.routes.filter(el => el.category === 'admin');
  }
}
</script>

<style scoped>

</style>
