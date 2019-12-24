import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import CategoryList from './CategoryList'

Enzyme.configure({ adapter: new Adapter() })

describe('<CategoryList/>', () => {
  test('should be created', () => {
    const wrapper = mount(<CategoryList dataList={[]} />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should receive a registry list as props', () => {
    const dataList = []
    const wrapper = shallow(<CategoryList dataList={dataList} />)

    expect(wrapper.instance().props.dataList).toHaveLength(0)

    dataList.push({ id: 1, name: 'Some category' })

    expect(wrapper.instance().props.dataList).toHaveLength(1)
  })

  test('should show a table with a registry list', () => {
    const dataList = [
      { id: 1, name: 'Item 01' },
      { id: 1, name: 'Item 01' },
      { id: 1, name: 'Item 01' },
    ]

    const wrapper = shallow(<CategoryList dataList={dataList} />)
    expect(wrapper.find('tbody tr')).toHaveLength(3)
  })

  test('should call method removeItem on delete icon click', () => {
    const dataList = [{ id: 1, name: 'Some name' }]
    const onDeleteMock = jest.fn(() => {})

    const wrapper = shallow(<CategoryList dataList={dataList} removeItem={onDeleteMock} />)
    wrapper.find('#remove-item-icon').simulate('click')

    expect(onDeleteMock).toBeCalled()
    expect(onDeleteMock).toBeCalledWith(1)
  })

  test('should call method editItem on edit icon click', () => {
    const dataList = [{ id: 1, name: 'Some name' }]
    const onEditFunction = jest.fn(() => {})

    const wrapper = shallow(<CategoryList dataList={dataList} editItem={onEditFunction} />)
    wrapper.find('#edit-item-icon').simulate('click')

    expect(onEditFunction).toBeCalled()
    expect(onEditFunction).toBeCalledWith(1)
  })
})
