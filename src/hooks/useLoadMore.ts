import { IGlobalState } from "@/store";
import _ from "lodash";
import { computed, onMounted, Ref } from "vue";
import { Store } from "vuex";

export function useLoadMore(
  elementDOM: Ref<null | HTMLElement>,
  store: Store<IGlobalState>,
  actionType: string
) {
  // 滚动要做防抖优化
  let element: HTMLElement;
  console.log("elementDOM", elementDOM);
  function _loadMore() {
    // 获取可视区域高度
    const containerHeight = element.clientHeight;
    // 卷去的高度
    const scrollTop = element.scrollTop;
    // 整个高度;
    const scrollHeight = element.scrollHeight;
    const offset = 20;
    // 距离底部还有20px的时候,就加载数据
    console.log('containerHeight', containerHeight);
    console.log('scrollTop', scrollTop);
    console.log('offset', offset);
    console.log('scrollHeight', scrollHeight);
    if (containerHeight + scrollTop + offset >= scrollHeight) {
      store.dispatch(actionType);
    }
  }

  onMounted(() => {
    element = elementDOM.value as HTMLElement;
    element.addEventListener("scroll", _.debounce(_loadMore, 200));
  });

  // 是否正在加载
  const isLoading = computed(() => store.state.home.lessons.loading);

  // 是否还有更多数据
  const hasMore = computed(() => store.state.home.lessons.hasMore);

  return {
    isLoading,
    hasMore,
  };
}
