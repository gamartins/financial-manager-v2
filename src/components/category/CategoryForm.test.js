import React from 'react';
import { act } from 'react-dom/test-utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CategoryForm from './CategoryForm'

Enzyme.configure({ adapter: new Adapter() });

const initialValues = {
  id: null,
  name: '',
}

describe('<CategoryForm />', () => {
  test('should be created', () => {
    const wrapper = mount(<CategoryForm initialValues={initialValues} />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should call saveItem prop on save button click', async () => {
    const saveItem = jest.fn(() => Promise.resolve())
    const component = mount(<CategoryForm
      initialValues={initialValues}
      saveItem={values => saveItem(values)}/>)

    await act(async () => {
      component.find('button').simulate('submit', { preventDefault: () => {} })
    })

    expect(saveItem).toHaveBeenCalledWith(initialValues)
  })

})