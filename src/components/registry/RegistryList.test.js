import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import RegistryList from './RegistryList'
import Registry from '../../models/Registry'
import registerIcons from '../../services/FontAwesome'

Enzyme.configure({ adapter: new Adapter() })

describe('<RegistryList/>', () => {
  beforeEach(() => {
    registerIcons()
  })

  test('should be created', () => {
    const dataList = []
    const wrapper = mount(<RegistryList dataList={dataList} />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should receive a registry list as props', () => {
    const dataList = []
    const wrapper = shallow(<RegistryList dataList={dataList} />)
    expect(wrapper.instance().props.dataList).toHaveLength(0)

    dataList.push({ id: 1 })
    expect(wrapper.instance().props.dataList).toHaveLength(1)
  })

  test('should show a table with a registry list', () => {
    const dataList = [
      { id: 1, name: 'Item 01', price: 50, type: Registry.TYPE.DESCONTO, category: 1 },
      { id: 1, name: 'Item 01', price: 50, type: Registry.TYPE.DESCONTO, category: 1 },
      { id: 1, name: 'Item 01', price: 50, type: Registry.TYPE.DESCONTO, category: 1 },
    ]

    const wrapper = shallow(<RegistryList dataList={dataList} />)
    expect(wrapper.find('tbody tr')).toHaveLength(3)
  })

  test('should call method removeItem on delete icon click', () => {
    const dataList = [{ id: 1 }]
    const onDeleteMock = jest.fn(() => {})

    const wrapper = shallow(<RegistryList dataList={dataList} removeItem={onDeleteMock} />)
    wrapper.find('#remove-item-icon').simulate('click')

    expect(onDeleteMock).toBeCalled()
    expect(onDeleteMock).toBeCalledWith(1)
  })

  test('should call method editItem on edit icon click', () => {
    const dataList = [{ id: 1 }]
    const onEditFunction = jest.fn(() => {})

    const wrapper = shallow(<RegistryList dataList={dataList} editItem={onEditFunction} />)
    wrapper.find('#edit-item-icon').simulate('click')

    expect(onEditFunction).toBeCalled()
    expect(onEditFunction).toBeCalledWith(1)
  })

  test('should show a balance based on item list', () => {
    const dataList = [
      { id: 1, name: 'Item 01', price: 1000, type: Registry.TYPE.PROVENTO, category: 1 },
      { id: 2, name: 'Item 02', price: 50, type: Registry.TYPE.DESCONTO, category: 1 },
      { id: 3, name: 'Item 03', price: 50, type: Registry.TYPE.DESCONTO, category: 1 },
    ]

    const wrapper = shallow(<RegistryList dataList={dataList} />)
    expect(wrapper.find('#cell-total').text()).toEqual('R$ 900')
  })

  test('should subtract values of Registry.TYPE.DESCONTO', () => {
    const dataList = [{ id: 1, name: 'Item 01', price: 1000, type: Registry.TYPE.PROVENTO, category: 1 }]
    const wrapper = shallow(<RegistryList dataList={dataList} />)

    expect(wrapper.find('#cell-total').text()).toEqual('R$ 1000')

    dataList.push({ id: 2, name: 'Item 02', price: 50, type: Registry.TYPE.DESCONTO, category: 1 })
    wrapper.setState({ dataList })

    expect(wrapper.find('#cell-total').text()).toEqual('R$ 950')
  })

  test('should add values of Registry.TYPE.PROVENTO', () => {
    const dataList = [{ id: 1, name: 'Item 01', price: 1000, type: Registry.TYPE.PROVENTO, category: 1 }]
    const wrapper = shallow(<RegistryList dataList={dataList} />)

    expect(wrapper.find('#cell-total').text()).toEqual('R$ 1000')

    dataList.push({ id: 2, name: 'Item 02', price: 50, type: Registry.TYPE.PROVENTO, category: 1 })
    wrapper.setState({ dataList })

    expect(wrapper.find('#cell-total').text()).toEqual('R$ 1050')
  })
})
