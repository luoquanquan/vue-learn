import Observer from './observer'

export function initState(vm) {
    const opts = vm.$options
    if (opts.data) {
        initData(vm)
    }

    if (opts.computed) {
        initComputed(vm)
    }

    if (opts.watch) {
        initWatch(vm)
    }
}

export function observe(data) {
    // 不是对象或空
    if (typeof data !== 'object' || data == null) {
        return
    }

    return new Observer(data)
}

function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[source][key]
        },
        set(newValue) {
            vm[source][key] = newValue
        }
    })
}

// 将用户传入的数据通过 Object.defineProperty 重新定义
function initData(vm) {
    let {data} = vm.$options
    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}

    for (let key in data) {
        proxy(vm, '_data', key)
    }

    observe(vm._data)
    console.log(vm.name)
}

function initComputed() {

}

// 内部也会使用 $watch 方法
const createWatcher = (vm, key, handler) => vm.$watch(key, handler)

function initWatch(vm) {
    const {watch} = vm.$options

    for (let key in watch) {
        let handler = watch[key]

        createWatcher(vm, key, handler)
    }
}