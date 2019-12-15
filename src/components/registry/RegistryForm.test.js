import React from 'react';
import { act } from 'react-dom/test-utils';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import RegistryForm from './RegistryForm';
import Registry from './Registry';

jest.mock('../../services/CategoryService')
import CategoryService from '../../services/CategoryService'

Enzyme.configure({ adapter: new Adapter() });

const initialValues = {
  id: null,
  name: '',
  price: 0,
  type: Registry.TYPE.DESCONTO,
  category: ''
}

CategoryService.get.mockImplementation(() => [
  { id: 1, name: 'Mock category 01' },
  { id: 2, name: 'Mock category 02' },
])

describe('<RegistryForm />', () => {
  test('should be created', () => {
    const wrapper = mount(<RegistryForm initialValues={initialValues} />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should get a list of categories', () => {
    const wrapper = shallow(<RegistryForm initialValues={initialValues} />)
    expect(wrapper.instance().categorylist).toHaveLength(2)
  })

  test('should show a list of categories in select element', () => {
    const wrapper = mount(<RegistryForm initialValues={initialValues} />)

    expect(wrapper.find('select[name="category"] option')).toHaveLength(2)
    expect(wrapper.find('select[name="category"] option:first-child').text()).toBe('Mock category 01')
  })

  test('should call saveItem prop on save button click', async () => {
    const saveItem = jest.fn(() => Promise.resolve())
    const component = mount(<RegistryForm
      initialValues={initialValues}
      saveItem={values => saveItem(values)}/>)

    await act(async () => {
      component.find('button').simulate('submit', { preventDefault: () => {} })
    })

    expect(saveItem).toHaveBeenCalledWith(initialValues)
  })

})