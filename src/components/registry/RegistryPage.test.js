import React from 'react'
import { act } from 'react-dom/test-utils'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import RegistryPage from './RegistryPage'
import RegistryService from '../../services/RegistryService'
import Registry from '../../models/Registry'
import registerIcons from '../../services/FontAwesome'

jest.mock('../../services/RegistryService')

registerIcons()

Enzyme.configure({ adapter: new Adapter() })

RegistryService.get.mockImplementation(() => [
  {
    id: 1,
    name: 'Registry 01',
    price: 2000,
    type: Registry.TYPE.PROVENTO,
    category: 1,
  },
  {
    id: 2,
    name: 'Registry 02',
    price: 69,
    type: Registry.TYPE.DESCONTO,
    category: 1,
  },
])

describe('<RegistryPage />', () => {
  test('should be created', () => {
    const wrapper = mount(<RegistryPage />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should get registry list on componentDidMount', () => {
    const wrapper = shallow(<RegistryPage />)
    expect(wrapper.instance().state.dataList).toHaveLength(2)
  })

  test('should find and set form value with item selected', () => {
    const wrapper = shallow(<RegistryPage />)
    wrapper.instance().setFormValue(2)

    expect(wrapper.instance().state.formValues).toEqual({
      id: 2,
      name: 'Registry 02',
      price: 69,
      type: Registry.TYPE.DESCONTO,
      category: 1,
    })
  })

  test('should call add when registry dont exists', () => {
    const addMock = jest.fn()
    const wrapper = shallow(<RegistryPage />)
    wrapper.instance().add = addMock

    wrapper.instance().save({
      id: null,
      name: 'Registry 02',
      price: 69,
      type: Registry.TYPE.DESCONTO,
      category: 1,
    })

    expect(addMock).toHaveBeenCalled()
  })

  test('should call edit when registry already exists', () => {
    const editMock = jest.fn()
    const wrapper = shallow(<RegistryPage />)
    wrapper.instance().edit = editMock

    wrapper.instance().save({
      id: 2,
      name: 'Registry 02',
      price: 69,
      type: Registry.TYPE.DESCONTO,
      category: 1,
    })

    expect(editMock).toHaveBeenCalled()
  })

  test('should remove one element when call remove', () => {
    const wrapper = mount(<RegistryPage />)

    expect(wrapper.instance().state.dataList).toHaveLength(2)

    wrapper.instance().remove(2)

    expect(wrapper.instance().state.dataList).toHaveLength(1)
  })

  test('should call getAll with the next month query after getNext event', () => {
    const wrapper = shallow(<RegistryPage />)
    wrapper.setState({ date: new Date(2019, 11, 18) })

    const mockCallback = jest.fn(() => {})
    RegistryService.get = mockCallback

    wrapper.instance().getNext()

    expect(mockCallback).toHaveBeenCalledWith('20200')
  })

  test('should call getAll with the next month query after getNext event', () => {
    const wrapper = shallow(<RegistryPage />)
    wrapper.setState({ date: new Date(2019, 11, 18) })

    const mockCallback = jest.fn(() => {})
    RegistryService.get = mockCallback

    wrapper.instance().getPrevious()

    expect(mockCallback).toHaveBeenCalledWith('201910')
  })

  test('should show <RegistryForm /> modal when click on new button', async () => {
    const wrapper = shallow(<RegistryPage />)
    expect(wrapper.instance().state.showModal).toBeFalsy()

    await act(async () => {
      wrapper.find('.actions #actions-add').simulate('click', { preventDefault: () => {} })
    })

    expect(wrapper.instance().state.showModal).toBeTruthy()
  })

  test('should reset form when hide modal', () => {
    const wrapper = shallow(<RegistryPage />)
    wrapper.setState({
      dataList: [],
      showModal: true,
      formValues: {
        id: null,
        name: 'Some item',
        price: 59.90,
        type: Registry.TYPE.DESCONTO,
        category: 1,
        status: Registry.STATUS.NOT_PAID,
      },
    })

    wrapper.instance().toggleModal()

    expect(wrapper.instance().state.formValues).toEqual({
      id: null,
      name: '',
      price: 0,
      type: Registry.TYPE.DESCONTO,
      category: '',
      status: Registry.STATUS.NOT_PAID,
    })
  })
})
