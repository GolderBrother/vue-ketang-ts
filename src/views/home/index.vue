<template>
  <div class="home">
    <!-- 头部区域 -->
    <HomeHeader :category="category" @setCurrentCategory="setCurrentCategory" />
    <div class="home-container" ref="refreshElm">
      <Suspense>
        <template #default>
          <!-- 轮播区域 -->
          <HomeSwiper />
        </template>
        <template #fallback>
          <div>loading...</div>
        </template>
      </Suspense>
      <!-- 课程列表区域 -->
      <HomeList :lessonList="lessonList" :isLoading="isLoading" :hasMore="hasMore" />
    </div>
  </div>
</template>
<script lang="ts">
import { IGlobalState } from "@/store";
import { CATEGORY_TYPES } from "@/typings/home";
import { useLoadMore } from "@/hooks/useLoadMore";
import { computed, defineComponent, onMounted, ref } from "vue";
import { Store, useStore } from "vuex";
import * as Types from "../../store/action-types";
import HomeHeader from "./home-header.vue";
import HomeList from "./home-list.vue";
import HomeSwiper from "./home-swiper.vue";

// 通用逻辑抽离成hooks, 将很多功能放入到函数中
// 相当于一个函数 -> 一个模块 -> 一个功能
function useCategory(store: Store<IGlobalState>) {
  // 使用计算属性是为了这边store中的状态改变了,重新计算新的值
  const category = computed(() => store.state.home.currentCategory);
  function setCurrentCategory(category: CATEGORY_TYPES) {
    store.commit(`home/${Types.SET_CATEGORY}`, category);
  }
  return {
    category,
    setCurrentCategory,
  };
}

function useLessonList(store: Store<IGlobalState>) {
  const lessonList = computed(() => store.state.home.lessons.list);
  // 页面加载完毕,并且没有数据的时候再获取数据
  // 函数中套生命周期
  onMounted(() => {
    if (lessonList.value.length === 0) {
      store.dispatch(`home/${Types.SET_LESSON_LIST}`);
    }
  });

  return {
    lessonList,
  };
}

// 用ts来写一定要defineComponent来包裹吗？
// 不用，关键是写了有代码提示，可以自动推断类型
export default defineComponent({
  // props
  components: {
    HomeHeader,
    HomeList,
    HomeSwiper,
  },
  setup() {
    // 需要获取 vuex 中的分类状态,有个更改状态的功能
    const store = useStore<IGlobalState>();

    // 分类
    const { category, setCurrentCategory } = useCategory(store);

    // 课程获取
    const { lessonList } = useLessonList(store);

    // 获取真实dom
    const refreshElm = ref<null | HTMLElement>(null);

    // 使用 refreshElm 调用 store 的 Types.SET_LESSON_LIST 这个方法
    const { isLoading, hasMore } = useLoadMore(
      refreshElm,
      store,
      `home/${Types.SET_LESSON_LIST}`
    );

    return {
      category,
      setCurrentCategory,
      lessonList,
      refreshElm,
      isLoading,
      hasMore,
    };
  },
});
</script>
<style lang="scss">
.home-container {
  position: absolute;
  top: 65px;
  bottom: 50px;
  width: 100%;
  overflow-y: scroll;
}
</style>
