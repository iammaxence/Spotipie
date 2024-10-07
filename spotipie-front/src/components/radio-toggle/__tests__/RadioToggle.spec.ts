import { describe, expect, it } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import RadioToggle from '@/components/radio-toggle/RadioToggle.vue'

let wrapper: VueWrapper<any>

const init = () => {
  wrapper = mount(RadioToggle, {})
}

describe('RadioToggle', () => {
  it('Should exists', () => {
    // Given + When
    init()

    // Then
    expect(wrapper.findAll('.radio--wrapper').length).toBe(3)
  })
})
