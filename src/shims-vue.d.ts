// 垫片文件，当引入vue文件 import 'a.vue'，表示引入一个vue文件，可以提供类型提示
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}
