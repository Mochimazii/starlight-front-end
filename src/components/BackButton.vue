<template>
  <v-card
      flat
      class="d-inline-flex my-1 back-button back-button__light"
      :class="{'back-button__active cursor-pointer': active }"
      :hover="active"
      :ripple="false"
      @click="$emit('back')"
  >
    <v-card-title
        class="py-1 pl-1 pr-3 subtitle-1"
    >
      <v-icon
          class="back-button--icon"
      >
        mdi-chevron-left
      </v-icon>

      <span
          :class="{'headline font-weight-bold': !active, 'btn-text-spacing subtitle-1': active}"
          class="back-button--text"
      >
        {{ name }}
      </span>

    </v-card-title>
  </v-card>
</template>

<script>


export default {
  name: 'BackButton',

  props: {
    /** active == true means the component will now display a button style **/
    active: {
      type: Boolean,
      default: () => true
    },
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.back-button {
  transition: all 375ms cubic-bezier(0.165, 0.84, 0.44, 1) !important;
  user-select: none;
  background: transparent !important;
  cursor: default;
  margin-left: -12px;
}
.back-button__active {
  cursor: pointer;
  margin-left: 4px;
  /*elevation-2*/
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
}


.back-button__active.back-button:hover {
  transform: translateY(-0.5px);
  /*v-card--hover:hover*/
  box-shadow: 0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)
}

.back-button__active.back-button:active {
  transform: translateY(0.5px);
  transition: none!important;
  box-shadow: 0 0 3px rgba(0, 0, 0, .5);
  background: rgba(255, 255, 255, .15) !important;
}

.back-button__active.back-button__light {
  border: 1px solid rgba(32, 32, 32, 0.95) !important;
}
.back-button__active.back-button__dark {
  border: 1px solid rgba(224, 224, 224, 0.95) !important;
}

.back-button--icon {
  opacity: 0;
  position: absolute !important;
  transform: translateX(-16px) scale(0.8);
  transform-origin: center center;
}
.back-button__active .back-button--icon {
  opacity: 1;
  transform: translateX(0px) scale(1);
}

.theme--light .back-button--icon {
  color: black;
  text-shadow: 0 0 2px rgba(255, 255, 255, .3);
}

.back-button--text {
  transition: all 375ms cubic-bezier(0.165, 0.84, 0.44, 1) !important;
  padding-left: 10px;
}

.back-button__active .back-button--text {
  padding-left: 28px;
}

</style>

<style>
.v-card--link:before {
  display: none !important;
}
.v-card__title > .btn-text-spacing {
  letter-spacing: .0892857143em !important;
}
</style>
