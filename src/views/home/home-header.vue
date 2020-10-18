<template>
  <div class="home-header">
    <img src="@/assets/logo.png" alt="" />
    <van-dropdown-menu>
      <!-- modelValue相当于v-model, 方便写多个双向绑定 -->
      <van-dropdown-item
        :modelValue="category"
        :options="options"
        @change="change"
      ></van-dropdown-item>
    </van-dropdown-menu>
  </div>
</template>
<style lang="scss">
.home-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 95%;
  height: 65px;
  background-color: #2a2a2a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2.5%;
  img {
    height: 50px;
  }
  .van-dropdown-menu__title {
    color: #fff;
  }
  .van-dropdown-menu__bar {
    background-color: #2a2a2a;
  }
}
</style>
<script lang="ts">
import { CATEGORY_TYPES } from "@/typings/home";
import { defineComponent, PropType, reactive, toRefs } from "vue";
export default defineComponent({
  props: {
    category: {
      type: Number as PropType<CATEGORY_TYPES>,
    },
  },
  // emits -> 相当于vue2的this.$emit
  // 为什么要写? 为了提示作用的
  emits: ["setCurrentCategory"],
  setup(props, context) {
    const state = reactive({
      options: [
        {
          text: "全部课程",
          value: CATEGORY_TYPES.ALL,
        },
        {
          text: "Vue",
          value: CATEGORY_TYPES.VUE,
        },
        {
          text: "React",
          value: CATEGORY_TYPES.REACT,
        },
        {
          text: "Node",
          value: CATEGORY_TYPES.NODE,
        },
      ],
    });
    function change(value: CATEGORY_TYPES) {
      context.emit("setCurrentCategory", value);
    }
    return {
      ...toRefs(state),
      change,
    };
    // toRef是处理简单类型,如果只有某个数据就用toRef,如果是多个数据,那就用reactive
  },
});
</script>
