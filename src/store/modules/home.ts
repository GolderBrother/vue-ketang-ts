import { CATEGORY_TYPES, IHomeState, ILessons, ISlider } from "@/typings/home";
import { Module } from "vuex";
import { IGlobalState } from "..";
import { getLessons, getSliders } from "../../api/home";
import * as Types from "../action-types";
// 首页里应该存放哪些数据
const state: IHomeState = {
  currentCategory: CATEGORY_TYPES.ALL,
  sliders: [],
  lessons: {
    hasMore: true, // 上拉加载, 有没有更多数据
    loading: false, // 默认不是正在加载
    offset: 0, // 相当于pageNo
    limit: 5, // 相当于pageSize
    list: [], // 当前已经显示到页面的课程数据有哪些
  },
};
const home: Module<IHomeState, IGlobalState> = {
  namespaced: true,
  state,
  mutations: {
    [Types.SET_CATEGORY](state, payload: CATEGORY_TYPES.ALL) {
      state.currentCategory = payload;
    },
    [Types.SET_SLIDER_LIST](state, payload: ISlider[]) {
      state.sliders = payload;
    },
    [Types.SET_LOADING](state, payload: boolean) {
      state.lessons.loading = payload;
    },
    [Types.SET_LESSON_LIST](state, payload: ILessons) {
      // 合并旧的数据
      state.lessons.list = [...state.lessons.list, ...payload.list];
      state.lessons.hasMore = payload.hasMore;
      state.lessons.offset += payload.list.length;
    },
  },
  actions: {
    async [Types.SET_SLIDER_LIST]({ commit }) {
      try {
        const sliders = await getSliders();
        commit(Types.SET_SLIDER_LIST, sliders);
      } catch (error) {
        console.error(`actions ${Types.SET_SLIDER_LIST} error`, error);
      }
    },
    async [Types.SET_LESSON_LIST]({ commit }) {
      if (state.lessons.loading) return;
      if (!state.lessons.hasMore) return;

      try {
        // 开始加载数据
        commit(Types.SET_LOADING, true);
        const lessons: ILessons = await getLessons<ILessons>(
          state.currentCategory,
          state.lessons.offset,
          state.lessons.limit
        );
        commit(Types.SET_LESSON_LIST, lessons);
        // 数据加载完毕
        commit(Types.SET_LOADING, false);
      } catch (error) {
        console.error(`actions ${Types.SET_SLIDER_LIST} error`, error);
      }
    },
  },
};
export default home;
