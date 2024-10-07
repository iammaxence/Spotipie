import { describe, expect, it } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import SongCard from '../SongCard.vue'
import TextLabel from '../TextLabel.vue'

let wrapper: VueWrapper<any>

const init = () => {
  wrapper = mount(SongCard, {
    props: {
      artists: ['Guizmo', 'Nekfeu'],
      title: 'Clash',
      albumName: 'La banquize',
      urlImage: ''
    }
  })
}

describe('SongCard', () => {
  it('Should exists', () => {
    // Given + When
    init()

    // Then
    expect(wrapper.find('.card--img')).toBeTruthy()
    expect(wrapper.findAllComponents(TextLabel)[0].props()).toEqual({
      label: 'Artiste(s)',
      text: 'Guizmo, Nekfeu'
    })
    expect(wrapper.findAllComponents(TextLabel)[1].props()).toEqual({
      label: 'Titre',
      text: 'Clash'
    })
    expect(wrapper.findAllComponents(TextLabel)[2].props()).toEqual({
      label: 'Album',
      text: 'La banquize'
    })
  })
})
