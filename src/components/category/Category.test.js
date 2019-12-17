import React from 'react'
import Category from './Category'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

jest.mock('../../services/CategoryService');
import CategoryService from '../../services/CategoryService';

Enzyme.configure({ adapter: new Adapter() });

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

describe('<Category />' ,() => {
    test('should be created', () => {
        const wrapper = mount(<Category />)
        expect(wrapper).toMatchSnapshot()
    })

    test('should get category list on componentDidMount', () => {
        const wrapper = shallow(<Category />)
        expect(wrapper.instance().state.dataList).toHaveLength(2)
    })

    test('should find and set form value with item selected', () => {
        const wrapper = shallow(<Category />)
        wrapper.instance().setFormValue(2)

        expect(wrapper.instance().state.formValues).toEqual({ id: 2, name: 'Category 02' })
    })

    test('should call add when category dont exists', () => {
        const wrapper = shallow(<Category />)
        const addMock = wrapper.instance().add = jest.fn()
        wrapper.instance().save({ id: null, name: 'Category 02' })

        expect(addMock).toHaveBeenCalled()
    })

    test('should call edit when category already exists', () => {
        const wrapper = shallow(<Category />)
        const editMock = wrapper.instance().edit = jest.fn()
        wrapper.instance().save({ id: 2, name: 'Category 02' })

        expect(editMock).toHaveBeenCalled()
    })

    test('should remove one element when call remove', () => {
        const wrapper = mount(<Category />)

        expect(wrapper.instance().state.dataList).toHaveLength(2)

        wrapper.instance().remove(2)

        expect(wrapper.instance().state.dataList).toHaveLength(1)
    })
})