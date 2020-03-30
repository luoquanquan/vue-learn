/**
 * 渲染
 * 计算属性
 * watch
 * ...
 */
import {pushTarget, popTarget} from './dep'
import utils from '../utils'
// 唯一标识
let id = 0
export default class Watcher {
    /**
     * @param {*} vm 当前组件实例
     * @param {*} exprOrFn 用户可能传入一个表达式, 也可能传入一个函数
     * @param {*} cb 用户传入了的回调函数 vm.$watch('name', cb)
     * @param {*} opts 其他...
     */
    constructor(vm, exprOrFn, cb = () => {}, opts = {}) {
        this.vm = vm
        this.exprOrFn = exprOrFn
        this.cb = cb
        this.opts = opts
        this.id = id++
        this.deps = []
        this.depsId = new Set([])

        if (typeof exprOrFn === 'function') {
            this.getter = exprOrFn
        } else {
            this.getter = () => utils.getValue(vm, exprOrFn)
        }

        if (opts.user) {
            this.user = true
        }

        // 创建 watcher 的时候先将表达式对应的值取出来, 作为老值
        this.value = this.get()
    }

    get() {
        // name 变化了, 需要 watcher 重新执行
        pushTarget(this)
        const value = this.getter()
        popTarget()
        return value
    }

    update() {
        this.get()
        // queueWatcher(this)
    }

    // 同一个 watcher 不能重复记忆同一个 dep
    addDep(dep) {
        const {id} = dep
        if (!this.depsId.has(id)) {
            this.depsId.add(id)
            this.deps.push(dep)
            dep.addSub(this)
        }
    }

    run() {
        const value = this.get()
        if(this.value !== value) {
            this.cb(value, this.value);
        }
    }
}