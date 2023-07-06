import Inputmask from 'inputmask'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('inputmask', {
    mounted(el, binding) {
      const inputs = el.getElementsByTagName('INPUT')
      let input = inputs[0]
      if (inputs.length > 1) {
        input = inputs[inputs.length - 1]
      }
      new Inputmask(binding.value).mask(input)
    }
  })
})
