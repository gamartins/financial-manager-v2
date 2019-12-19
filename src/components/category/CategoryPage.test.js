import React from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CategoryService from '../../services/CategoryService'
import CategoryPage from './CategoryPage'
import registerIcons from '../../services/FontAwesome'

jest.mock('../../services/CategoryService')

Enzyme.configure({ adapter: new Adapter() })

registerIcons()

CategoryService.get.mockImplementation(() => [
  {
    id: 1,
    name: 'Category 01',
  },
  {
    id: 2,
    name: 'Category 02',
  },
])

describe('<Category />', () => {
  test('should be created', () => {
    const wrapper = mount(<CategoryPage />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should get category list on componentDidMount', () => {
    const wrapper = shallow(<CategoryPage />)
    expect(wrapper.instance().state.dataList).toHaveLength(2)
  })

  test('should find and set form value with item selected', () => {
    const wrapper = shallow(<CategoryPage />)
    wrapper.instance().setFormValue(2)

    expect(wrapper.instance().state.formValues).toEqual({ id: 2, name: 'Category 02' })
  })

  test('should call add when category dont exists', () => {
    const addMock = jest.fn()
    const wrapper = shallow(<CategoryPage />)
    wrapper.instance().save = addMock

    wrapper.instance().save({ id: null, name: 'Category 02' })

    expect(addMock).toHaveBeenCalled()
  })

  test('should call edit when category already exists', () => {
    const editMock = jest.fn()
    const wrapper = shallow(<CategoryPage />)
    wrapper.instance().edit = editMock

    wrapper.instance().save({ id: 2, name: 'Category 02' })

    expect(editMock).toHaveBeenCalled()
  })

  test('should remove one element when call remove', () => {
    const wrapper = mount(<CategoryPage />)

    expect(wrapper.instance().state.dataList).toHaveLength(2)

    wrapper.instance().remove(2)

    expect(wrapper.instance().state.dataList).toHaveLength(1)
  })
})
