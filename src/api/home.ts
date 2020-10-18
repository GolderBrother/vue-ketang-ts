import { CATEGORY_TYPES } from "@/typings/home";
import axios from ".";

/**
 * 获取轮播图数据
 */
export function getSliders<T>() {
  return axios.get<T, T>("/slider/list");
}
// getSliders<ISlider>().then(data => {
// data.url
// })

/**
 * 获取课程列表
 * @param category 课程分类
 * @param offset 请求页码
 * @param limit 请求条数
 */
export function getLessons<T>(
  category: CATEGORY_TYPES,
  offset: number = 0,
  limit: number = 5
) {
  return axios.get<T, T>(
    `/lesson/list?category=${category}&offset=${offset}&limit=${limit}`
  );
}

