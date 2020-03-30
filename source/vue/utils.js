// ?: 匹配不捕获, 不捕获当前的分组
// + 一个或多个
// ? 尽可能少匹配
const defaultRE = /\{\{((?:.|\r?\n)+?)\}\}/g

const utils = {
    getValue(vm, expr) {
        const keys = expr.split('.')
        return keys.reduce((memo, current) => {
            return memo[current]
        }, vm)
    },
    // 编译文本替换 {{}}
    compilerText(node, vm) {
        if(!node.expr) {
            // 给节点增加了一个自定义属性, 方便后续的更新操作
            node.expr = node.textContent
        }
        node.textContent = node.expr.replace(defaultRE, (...args) => {
            const [, expr] = args
            return utils.getValue(vm, expr)
        })
    }
}

export const compiler = (node, vm) => {
    const {childNodes} = node

    Array.from(childNodes).forEach(child => {
        // 元素
        if (child.nodeType === 1) {
            // 编译当前元素的孩子
            compiler(child, vm)
        }
        // 文本
        else if(child.nodeType === 3) {
            utils.compilerText(child, vm)
        }
    })
}

export default utils