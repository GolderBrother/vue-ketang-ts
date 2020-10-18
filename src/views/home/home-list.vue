<template>
  <div class="home-list">
    <van-card
      v-for="lesson in lessonList"
      :key="lesson.id"
      :price="lesson.price"
      :title="lesson.title"
      :thumb="lesson.poster"
    >
      <template #tags>
        <van-tag plain type="danger">
          {{ formatCategory(lesson.category) }}
        </van-tag>
      </template>
    </van-card>
    <div v-if="isLoading" class="list-footer">
      拼命加载中...
    </div>
    <div v-if="!hasMore" class="list-footer">
      ------我是有底线的------
    </div>
  </div>
</template>
<script lang="ts">
import { ILesson } from "@/typings/home";
import { computed, defineComponent, PropType } from "vue";
export default defineComponent({
  props: {
    lessonList: {
      type: Array as PropType<ILesson[]>,
    },
    hasMore: {
      type: Boolean as PropType<Boolean>,
    },
    isLoading: {
      type: Boolean as PropType<Boolean>,
    },
  },
  setup(props) {
    console.log("home-list props", props);
    // 页面一加载就要获取数据
    function formatCategory(type: number) {
      switch (type) {
        case 1:
          return "react课程";
        case 2:
          return "vue课程";
      }
    }
    return {
      formatCategory,
    };
  },
});
</script>
<style lang="scss" scoped>
.list-footer {
  text-align: center;
}
</style>
