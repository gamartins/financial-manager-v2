import React from 'react'
import { act } from 'react-dom/test-utils'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import RegistryForm from './RegistryForm'
import Registry from '../../models/Registry'
import CategoryService from '../../services/CategoryService'

jest.mock('../../services/CategoryService')

Enzyme.configure({ adapter: new Adapter() })

const initialValues = {
  id: null,
  name: '',
  price: 0,
  type: Registry.TYPE.DESCONTO,
  category: '',
}

CategoryService.get.mockImplementation(() => [
  { id: 1, name: 'Mock category 01' },
  { id: 2, name: 'Mock category 02' },
])

describe('<RegistryForm />', () => {
  test('should be created', () => {
    const wrapper = mount(<RegistryForm initialValues={initialValues} showModal={false} />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should get a list of categories', () => {
    const wrapper = shallow(<RegistryForm initialValues={initialValues} />)
    expect(wrapper.instance().categorylist).toHaveLength(2)
  })

  test('should show a list of categories in select element', () => {
    const wrapper = mount(<RegistryForm initialValues={initialValues} showModal />)

    expect(wrapper.find('select[name="category"] option')).toHaveLength(3)
    expect(wrapper.find('select[name="category"] option').at(1).text()).toBe('Mock category 01')
  })

  test('should call saveItem prop on save button click', async () => {
    const saveItem = jest.fn(() => Promise.resolve())
    const component = mount(<RegistryForm
      initialValues={initialValues}
      showModal
      saveItem={values => saveItem(values)}
    />)

    await act(async () => {
      component.find('button[type="submit"]').simulate('submit', { preventDefault: () => {} })
    })

    expect(saveItem).toHaveBeenCalledWith(initialValues)
  })

  test('should call toggleModal on cancel button click', () => {
    const toggleModalMock = jest.fn()
    const wrapper = mount(<RegistryForm
      showModal
      toggleModal={toggleModalMock}
      initialValues={initialValues}
    />)

    wrapper.find('.modal-footer button.btn.btn-secondary').simulate('click')

    expect(toggleModalMock).toHaveBeenCalled()
  })

  test('should show form modal when pros.showModal is true', async () => {
    const wrapper = mount(<RegistryForm
      showModal={false}
      initialValues={initialValues}
    />)

    expect(wrapper.find('.modal-dialog')).toHaveLength(0)

    wrapper.setProps({ showModal: true })

    expect(wrapper.find('.modal-dialog')).toHaveLength(1)
  })
})
