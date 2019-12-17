import React from 'react'
import Registry from './Registry'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

jest.mock('../../services/RegistryService');
import RegistryService from '../../services/RegistryService';

Enzyme.configure({ adapter: new Adapter() });

RegistryService.get.mockImplementation(() => [
    {
        id: 1,
        name: 'Registry 01',
        price: 2000,
        type: Registry.TYPE.PROVENTO,
        category: 1
    },
    {
        id: 2,
        name: 'Registry 02',
        price: 69,
        type: Registry.TYPE.DESCONTO,
        category: 1
    },
])

describe('<Registry />' ,() => {
    test('should be created', () => {
        const wrapper = mount(<Registry />)
        expect(wrapper).toMatchSnapshot()
    })

    test('should get registry list on componentDidMount', () => {
        const wrapper = shallow(<Registry />)
        expect(wrapper.instance().state.dataList).toHaveLength(2)
    })

    test('should find and set form value with item selected', () => {
        const wrapper = shallow(<Registry />)
        wrapper.instance().setFormValue(2)

        expect(wrapper.instance().state.formValues).toEqual({
            id: 2,
            name: 'Registry 02',
            price: 69,
            type: Registry.TYPE.DESCONTO,
            category: 1
        })
    })

    test('should call add when registry dont exists', () => {
        const wrapper = shallow(<Registry />)
        const addMock = wrapper.instance().add = jest.fn()
        wrapper.instance().save({
            id: null,
            name: 'Registry 02',
            price: 69,
            type: Registry.TYPE.DESCONTO,
            category: 1
        })

        expect(addMock).toHaveBeenCalled()
    })

    test('should call edit when registry already exists', () => {
        const wrapper = shallow(<Registry />)
        const editMock = wrapper.instance().edit = jest.fn()
        wrapper.instance().save({
            id: 2,
            name: 'Registry 02',
            price: 69,
            type: Registry.TYPE.DESCONTO,
            category: 1
        })

        expect(editMock).toHaveBeenCalled()
    })

    test('should remove one element when call remove', () => {
        const wrapper = mount(<Registry />)

        expect(wrapper.instance().state.dataList).toHaveLength(2)

        wrapper.instance().remove(2)

        expect(wrapper.instance().state.dataList).toHaveLength(1)
    })
})