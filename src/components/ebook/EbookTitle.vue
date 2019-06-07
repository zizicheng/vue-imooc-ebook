<template>
  <transition name="slide-down">
    <div class="title-wrapper" v-show="menuVisible">
      <div class="left">
        <span class="icon-back" @click="back"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <div class="icon-shelf"></div>
        </div>
        <div class="icon-wrapper">
          <div class="icon-cart"></div>
        </div>
        <div class="icon-wrapper">
          <div class="icon-more"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from "../../utils/mixin";
export default {
  mixins: [ebookMixin],
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
.title-wrapper {
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  z-index: 120;
  width: 100%;
  height: px2rem(48);
  background-color: #fff;
  box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, 0.15);
  font-size: px2rem(20);
  .left {
    flex: 0 0 px2rem(60);
    @include left;
  }
  .right {
    flex: 1;
    display: flex;
    @include center;
    justify-content: flex-end;
    .icon-wrapper {
      flex: 0 0 px2rem(40);
      .icon-shelf {
        font-size: px2rem(22);
      }
    }
  }
}
</style>
