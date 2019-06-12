<template>
  <div
    class="shelf-item"
    :class="{ 'shelf-item-shadow': data.type === 1 || data.type === 2 }"
    @click="onItemClick"
  >
    <component
      :is="oneOfComponent"
      :data="data"
      class="shelf-item-comp"
      :class="{ 'is-edit': isEditMode && data.type == 2 }"
    ></component>
    <div
      class="icon-selected"
      :class="{ 'is-selected': data.selected }"
      v-show="isEditMode && data.type === 1"
    ></div>
  </div>
</template>

<script>
import { storeShelfMixin } from "../../utils/mixin";
import { gotoStoreHome } from "../../utils/store";
import ShelfBook from "./ShelfItemBook.vue";
import ShelfCategory from "./ShelfItemCategory.vue";
import ShelfAdd from "./ShelfItemAdd.vue";

export default {
  mixins: [storeShelfMixin],
  props: {
    data: Object
  },
  data() {
    return {
      book: ShelfBook,
      category: ShelfCategory,
      add: ShelfAdd
    };
  },
  computed: {
    oneOfComponent() {
      let component = null;
      switch (this.data.type) {
        case 1:
          component = this.book;
          break;
        case 2:
          component = this.category;
          break;
        default:
          component = this.add;
          break;
      }
      return component;
    }
  },
  methods: {
    onItemClick() {
      if (this.isEditMode) {
        this.data.selected = !this.data.selected;
        if (
          this.data.selected &&
          this.shelfSelected.indexOf(this.data) === -1 &&
          this.data.type === 1
        ) {
          this.shelfSelected.push(this.data);
        } else if (!this.data.selected) {
          this.setShelfSelected(
            this.shelfSelected.filter(item => item.id !== this.data.id)
          );
        }
      } else {
        if (this.data.type === 1) {
          this.showBookDetail(this.data);
        } else if (this.data.type === 2) {
          this.$router.push({
            path: "/store/category",
            query: {
              title: this.data.title
            }
          });
        } else {
          gotoStoreHome(this);
        }
      }
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.shelf-item {
  position: relative;
  width: 100%;
  height: 100%;
  &.shelf-item-shadow {
    box-shadow: px2rem(2) px2rem(2) px2rem(6) px2rem(2) rgba(200, 200, 200, 3);
  }
  .shelf-item-comp {
    opacity: 1;
    &.is-edit {
      opacity: 0.5;
    }
  }
  .icon-selected {
    position: absolute;
    bottom: px2rem(2);
    right: px2rem(2);
    font-size: px2rem(18);
    color: rgba(0, 0, 0, 0.4);
    &.is-selected {
      color: $color-blue;
    }
  }
}
</style>
