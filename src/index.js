import Vue from 'vue'


const vm = new Vue({
    el: '#app',
    data() {
        return {
            name: 'quanquan',
            info: {
                sex: 'male',
                age: 27
            },
            like: ['fe', 'manong', 'diaosi']
        }
    },
    watch: {
        // msg(newValue, oldValue) {
        //     console.log(newValue, oldValue)
        // }
    }
})

console.log(vm.like.push('12'))
console.log(vm)
window.vm = vm

setTimeout(() => {
    vm.name = 'ganglie'
}, 1e3);