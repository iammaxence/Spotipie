import { describe, expect, it } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import TextLabel from '../TextLabel.vue'

let wrapper: VueWrapper<any>

const init = () => {
  wrapper = mount(TextLabel, {
    props: {
      label: 'artists',
      text: 'Guizmo'
    }
  })
}

describe('TextLabel', () => {
  it('Should exists', () => {
    // Given + When
    init()

    // Then
    expect(wrapper.get('#text').text()).toBe('artists: Guizmo')
  })
})
