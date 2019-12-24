import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import registerIcons from '../../../services/FontAwesome'
import DataList from './DataList'

Enzyme.configure({ adapter: new Adapter() })

describe('<DataList/>', () => {
  beforeEach(() => {
    registerIcons()
  })

  test('should be created', () => {
    const dataList = []
    const columns = []
    const wrapper = mount(<DataList dataList={dataList} columns={columns} />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should receive a registry list as props', () => {
    const dataList = []
    const columns = []
    const wrapper = shallow(<DataList dataList={dataList} columns={columns} />)
    expect(wrapper.instance().props.dataList).toHaveLength(0)

    dataList.push({ id: 1 })
    expect(wrapper.instance().props.dataList).toHaveLength(1)
  })

  test('should render the column names as passed in props', () => {
    const dataList = [
      { id: 1, name: 'Item 01', price: 20 },
      { id: 2, name: 'Item 02', price: 20 },
      { id: 3, name: 'Item 03', price: 20 },
    ]
    const columns = [
      { name: 'Item', value: 'name' },
      { name: 'Valor', value: 'price' },
    ]

    const wrapper = mount(<DataList
      dataList={dataList}
      columns={columns}
      showActions={false}
    />)

    expect(wrapper.find('th')).toHaveLength(2)
    expect(wrapper.find('th').at(0).text()).toBe('Item')
    expect(wrapper.find('th').at(1).text()).toBe('Valor')
  })

  test('should render the columns fields as passed in props', () => {
    const dataList = [
      { id: 1, name: 'Item 01', price: 20 },
      { id: 2, name: 'Item 02', price: 20 },
      { id: 3, name: 'Item 03', price: 20 },
    ]
    const columns = [
      { name: 'Item', value: 'name' },
      { name: 'Valor', value: 'price' },
    ]

    const wrapper = mount(<DataList
      dataList={dataList}
      columns={columns}
      showActions={false}
    />)

    expect(wrapper.find('tbody tr')).toHaveLength(3)
    expect(wrapper.find('tbody tr:first-child td')).toHaveLength(3)
    expect(wrapper.find('tbody tr:first-child td').at(0).text()).toBe('Item 01')
    expect(wrapper.find('tbody tr:first-child td').at(1).text()).toBe('20')
  })

  test('should show a table with a registry list', () => {
    const dataList = [
      { id: 1, name: 'Item 01' },
      { id: 1, name: 'Item 01' },
      { id: 1, name: 'Item 01' },
    ]
    const columns = [
      { name: 'Name', value: 'name' },
    ]

    const wrapper = shallow(<DataList dataList={dataList} columns={columns} />)
    expect(wrapper.find('tbody tr')).toHaveLength(3)
  })

  test('should call method removeItem on delete icon click', () => {
    const dataList = [{ id: 1 }]
    const columns = []
    const onDeleteMock = jest.fn(() => {})
    const wrapper = shallow(<DataList
      dataList={dataList}
      columns={columns}
      removeItem={onDeleteMock}
    />)

    wrapper.find('#remove-item-icon').simulate('click')

    expect(onDeleteMock).toBeCalled()
    expect(onDeleteMock).toBeCalledWith({ id: 1 })
  })

  test('should call method editItem on edit icon click', () => {
    const dataList = [{ id: 1 }]
    const columns = []
    const onEditFunction = jest.fn(() => {})

    const wrapper = shallow(<DataList
      dataList={dataList}
      columns={columns}
      editItem={onEditFunction}
    />)
    wrapper.find('#edit-item-icon').simulate('click')

    expect(onEditFunction).toBeCalled()
    expect(onEditFunction).toBeCalledWith({ id: 1 })
  })

  test('should render a footer when passed as props', () => {
    const dataList = []
    const columns = []
    const footer = <td><h1>This is a test footer</h1></td>
    const wrapper = mount(<DataList
      dataList={dataList}
      columns={columns}
      footer={footer}
    />)

    expect(wrapper.find('tfoot tr td').getElement()).toEqual(footer)
  })

  test('should render extra actions when passed in props', () => {
    const dataList = [{ id: 1, name: 'Nome' }]
    const columns = [{ name: 'Nome', value: 'name' }]
    const actions = [<span key={1} id="generic-item-icon01">&raquo;</span>]
    const wrapper = mount(<DataList dataList={dataList} columns={columns} actions={actions} />)

    expect(wrapper.find('.column__actions #generic-item-icon01')).toBeDefined()
  })
})
