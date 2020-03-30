import { initState } from './observe'
import Watcher from './observe/watcher'
import {compiler} from './utils'

function Vue(otps) {
    this._init(otps)
}

// Vue 初始化
Vue.prototype._init = function _init(otps) {
    const vm = this
    vm.$options = otps

    // MVVM 原理
    // Object.defineProperty
    //data computed watch
    /**
     * 解释对象属性
     * 拦截数组方法
     */
    initState(vm)

    if (vm.$options.el) {
        vm.$mount()
    }

}

const query = el => {
    if (typeof el === 'string') {
        return document.querySelector(el)
    }

    return el
}

// 挂载组件
Vue.prototype.$mount = function () {
    const vm = this
    const { el } = vm.$options

    // vm.$el 就是即将挂载的元素
    const ele = vm.$el = query(el)

    // 渲染通过 watcher vue 2.0 组件级别更新 new Vue 产生
    // 渲染 / 更新组件
    const updateComponent = () => {
        vm._update()
    }

    // 渲染 watcher
    new Watcher(vm, updateComponent)
}

// 用用户传入的数据去更新视图
Vue.prototype._update = function() {
    const vm = this
    const el = vm.$el

    // 循环元素, 将里边的内容换成数据...
    const node = document.createDocumentFragment()
    let firstChild
    while (firstChild = el.firstChild) {
        node.appendChild(firstChild)
        // appendChild 具有移动的功能
    }

    // 对文本进行替换
    compiler(node, vm)

    el.appendChild(node)
    // 匹配双 {{}} 替换

}

Vue.prototype.$watch = function(key, handler) {
    const vm = this

    // 用户自己定义的 watcher
    // new Watcher(vm, expr, handler, {user: true})

}

export default Vue