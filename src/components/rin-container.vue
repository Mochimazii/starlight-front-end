<template>
  <div
    class="rin-container"
  >
    <div
      class="rin-title"
    >
      <span v-if="title">{{ title }}</span>
      <slot v-else name="title"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "rin-container",
  props:{
    title: {
      type:String,
      default:"",
    }
  }
}
</script>

<style lang="scss" scoped>
.rin-container {
  position: relative;
  padding: 40px 32px;
  margin-top: 18px;
  box-shadow: 8px 14px 38px rgba(39, 44, 49, 0.06),
  1px 3px 8px rgba(39, 44, 49, 0.03);
  background-color: #fff;
  border: none;
  border-radius: 8px;

  .rin-title {
    position: absolute;
    left: 30px;
    top: -18px;
    padding: 8px 15px;
    font-weight: bold;
    font-size: 0;
    background-color: #249ffd;
    color: #fff;
    box-shadow: 0 8px 10px rgba(36, 159, 253, 0.30196);
    border-radius: 8px;

    span {
      font-size: 17px;
      line-height: 20px;
      vertical-align: middle;
    }

  }

  @media (max-width: 1280px) {
    padding: 15px;
    &.pt {
      padding-top: 30px;
    }
    .nya-title {
      left: 20px;
    }
  }

  .nya-list {
    margin: 0;
  }
}
</style>