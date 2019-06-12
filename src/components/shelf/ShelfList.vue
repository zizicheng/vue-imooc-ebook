<template>
  <div class="shelf-list" :style="{ top: shelfListTop }">
    <transition-group name="list" tag="div" id="shelf-list">
      <div class="shelf-list-item-wrapper" v-for="item in data" :key="item.id">
        <shelf-item :data="item" :style="{ height: itemHeight }"></shelf-item>
        <div class="shelf-list-title-wrapper">
          <div class="shelf-list-title title-small">{{ item.title }}</div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { storeShelfMixin } from "../../utils/mixin";
import ShelfItem from "./ShelfItem.vue";
import { realPx, px2rem } from "../../utils/utils";
export default {
  mixins: [storeShelfMixin],
  props: {
    top: {
      type: Number,
      default: 94
    },
    data: Array
  },
  components: {
    ShelfItem
  },
  computed: {
    shelfListTop() {
      return px2rem(this.top) + "rem";
    },
    itemHeight() {
      return ((window.innerWidth - realPx(120)) / 3 / 250) * 350 + "px";
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.shelf-list {
  position: absolute;
  left: 0;
  z-index: 100;
  width: 100%;
  #shelf-list {
    display: flex;
    flex-flow: row wrap;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .shelf-list-item-wrapper {
      flex: 0 0 33.33%;
      width: 33.33%;
      padding: px2rem(15);
      box-sizing: border-box;
      &.list-leave-active {
        display: none;
      }
      &.list-move {
        transition: transform 0.5s;
      }
      .shelf-list-title-wrapper {
        margin-top: px2rem(10);
        .shelf-list-title {
          font-size: px2rem(12);
          width: 100%;
          @include ellipsis2(2);
        }
      }
    }
  }
}
</style>
