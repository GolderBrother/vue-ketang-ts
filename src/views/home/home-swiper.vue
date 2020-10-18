<template>
  <div class="home-list">
    <van-swipe
      class="my-swipe"
      v-if="sliderList.length"
      :autoplay="3000"
      indicator-color="white"
    >
      <van-swipe-item v-for="slide in sliderList" :key="slide.url">
        <img :src="slide.url" :alt="slide.url" class="slide-img" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script lang="ts">
import { IGlobalState } from "@/store";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import * as Types from "../../store/action-types";
export default defineComponent({
  async setup() {
    // 页面一家在就要获取数据
    const store = useStore<IGlobalState>();
    const sliderList = computed(() => store.state.home.sliders);
    if (sliderList.value.length === 0) {
      // 加个缓存, 如果没有数据才获取
      await store.dispatch(`home/${Types.SET_SLIDER_LIST}`);
    }
    return {
      sliderList,
    };
  },
});
</script>
<style lang="scss">
.slide-img {
  max-width: 100%;
}
</style>
