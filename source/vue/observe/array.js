// 拦截 push pop shift unshift reverse sort splice

import { observe } from "."

// 获取老的数组方法, 并改写以上七个
const oldArrayProtoMethods = Array.prototype

export const arrayMethods = Object.create(oldArrayProtoMethods)

const methods = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice']

// 对数组中每一项进行观察
export function observerArray(inserted) {
    inserted.forEach(item => observe(item))
}

methods.forEach(method => {
    arrayMethods[method] = function(...args) {
        // 函数劫持
        // 切片编程
        const r = oldArrayProtoMethods[method].apply(this, args)

        console.log('调用了数组'+ method)

        let inserted
        switch(method) {
            case 'push':
            case 'unshift':
                inserted = args
                break
            case splice:
                inserted = args.slice(2)
                break
            default:
                break
        }

        if(inserted) {
            observerArray(inserted)
        }

        return r
    }
})