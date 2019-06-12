<template>
  <div class="store-shelf">
    <shelf-title :title="shelfCategory.title"></shelf-title>
    <scroll
      :top="0"
      :bottom="scrollBottom"
      class="store-shelf-scroll-wrapper"
      @onScroll="onScroll"
      ref="scroll"
      v-if="isShowList"
    >
      <shelf-list :top="42" :data="shelfCategory.itemList"></shelf-list>
    </scroll>
    <div class="store-shelf-empty-view" v-else>
      {{ $t("shelf.groupNone") }}
    </div>
    <shelf-footer></shelf-footer>
  </div>
</template>

<script>
import ShelfTitle from "../../components/shelf/ShelfTitle.vue";
import ShelfList from "../../components/shelf/ShelfList.vue";
import ShelfFooter from "../../components/shelf/ShelfFooter.vue";
import Scroll from "../../components/common/Scroll.vue";
import { storeShelfMixin } from "../../utils/mixin";

export default {
  mixins: [storeShelfMixin],
  components: {
    ShelfTitle,
    ShelfList,
    ShelfFooter,
    Scroll
  },
  data() {
    return {
      scrollBottom: 0
    };
  },
  computed: {
    isShowList() {
      return (
        this.shelfCategory.itemList && this.shelfCategory.itemList.length > 0
      );
    }
  },
  watch: {
    isEditMode(isEditMode) {
      this.scrollBottom = isEditMode ? 48 : 0;
      this.$nextTick(() => {
        this.$refs.scroll.refresh();
      });
    }
  },
  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY);
    }
  },
  mounted() {
    this.getCategoryList(this.$route.query.title);
    this.setCurrentType(2);
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.store-shelf {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  .store-shelf-scroll-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
  }
  .store-shelf-empty-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: px2rem(14);
    color: #333;
    @include center;
  }
}
</style>
