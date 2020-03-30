/**
 * 收集依赖
 */
let id = 0
let stack = []
export default class Dep {
    constructor() {
        this.id = id++
        this.sub = []
    }

    // 订阅
    addSub(watcher) {
        this.sub.push(watcher)
    }

    // 发布
    notify() {
        this.sub.forEach(watcher => watcher.update())
    }

    depend() {
        if(Dep.target){
            // Dep.target 是一个渲染 watcher
            // 两者相互依赖
            Dep.target.addDep(this)
        }
    }
}

export const pushTarget = watcher => {
    Dep.target = watcher
    stack.push(watcher)
}

export const popTarget = watcher => {
    stack.pop()
    Dep.target = stack[stack.length - 1]
}