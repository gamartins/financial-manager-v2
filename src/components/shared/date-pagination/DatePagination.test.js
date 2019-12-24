import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { format } from 'date-fns'

import DatePagination from './DatePagination'
import registerIcons from '../../../services/FontAwesome'

jest.mock('../../../services/CategoryService')

Enzyme.configure({ adapter: new Adapter() })

registerIcons()

describe('<DatePagination />', () => {
  test('should be created', () => {
    const wrapper = shallow(<DatePagination date={new Date()} format="MMM" />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should call previous on page-item previous clicked', () => {
    const mockPrevious = jest.fn(() => {})
    const wrapper = shallow(<DatePagination
      date={new Date()}
      format="MMM"
      next={() => {}}
      previous={mockPrevious}
    />)

    wrapper.find('#item-previous button').simulate('click')

    expect(mockPrevious).toHaveBeenCalled()
  })

  test('should call previous on page-item next clicked', () => {
    const mockNext = jest.fn(() => {})
    const wrapper = shallow(<DatePagination
      date={new Date()}
      format="MMM"
      next={mockNext}
      previous={() => {}}
    />)

    wrapper.find('#item-next button').simulate('click')

    expect(mockNext).toHaveBeenCalled()
  })

  test('should show as defined in format', () => {
    const date = new Date()
    const patern = 'MMM'

    const wrapper = shallow(<DatePagination
      date={date}
      format={patern}
      next={() => {}}
      previous={() => {}}
    />)

    const formatedDate = format(date, patern)
    const componentFormatedDate = wrapper.find('#item-actual').text()

    expect(componentFormatedDate).toBe(formatedDate)
  })
})
