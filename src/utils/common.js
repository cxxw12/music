// 截流函数
export function debounce (func, delay) {
  let timer = null
  return function () {
    let context = this;
    let args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(context, args)
    }, delay)
  }
}
