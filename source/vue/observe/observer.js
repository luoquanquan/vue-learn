import {observe} from './index'
import {arrayMethods, observerArray} from './array'
import Dep from './dep'
// 定义响应式的数据变化
export function defineReactive(data, key, value) {

    // 如果 value 仍然是一个对象的话需要深度观察(递归)
    observe(value)
    const dep = new Dep()
    Object.defineProperty(data, key, {
        get() {
            if(Dep.target) {
                // dep 中存 watcher, watcher 中存 dep ====> 多对多
                dep.depend()
            }

            console.log(`当前时间 ${Date.now()}: 代码走到了这里 获取`)
            return value
        },
        set(newValue) {
            if(newValue === value) return
            console.log(`当前时间 ${Date.now()}: 代码走到了这里 设置`)
            value = newValue
            observe(value)
            dep.notify()
        },

    })
}

export default class Observer {
    constructor(data) {
        // data 就是 vm._data

        // 数组, 重写各种方法
        if(Array.isArray(data)) {
            data.__proto__ = arrayMethods
            observerArray(data)
        } else {
            this.walk(data)
        }
    }

    walk(data) {
        const keys = Object.keys(data)

        keys.forEach(curKey => {
            const curValue = data[curKey]
            defineReactive(data, curKey, curValue)
        })
    }
}