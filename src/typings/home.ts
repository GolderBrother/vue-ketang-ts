/**
 * 用来声明公共类型
 */
export enum CATEGORY_TYPES {
  ALL,
  VUE,
  REACT,
  NODE,
}
export interface ILesson {
  title: string;
  video: string;
  poster: string;
  price: number;
  category?: string; // 可选
}
export interface ISliders {}
export interface ILessons {
  hasMore: boolean; // 上拉加载, 有没有更多数据
  loading: boolean; // 默认不是正在加载
  offset: number; // 相当于pageNo
  limit: number; // 相当于pageSize
  list: ILesson[]; // 当前已经显示到页面的课程数据有哪些
}
export interface IHomeState {
  currentCategory: CATEGORY_TYPES.ALL;
  sliders: ISliders[];
  lessons: ILessons;
}
export interface ISlider {
  url: string; 
}