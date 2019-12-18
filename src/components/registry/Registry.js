import React, { Component } from 'react'

import addMonths from 'date-fns/addMonths'

import RegistryForm from './RegistryForm'
import RegistryList from './RegistryList'
import DatePagination from '../date-pagination/DatePagination'
import RegistryService from '../../services/RegistryService'

export default class Registry extends Component {

  static TYPE = {
    PROVENTO: 0,
    DESCONTO: 1,
  }

  constructor(props) {
    super(props)

    this.state = {
      date: new Date(),
      dataList: [],
      formValues: {
        id: null,
        name: '',
        price: 0,
        type: Registry.TYPE.DESCONTO,
        category: ''
      }
    }
  }

  componentDidMount() {
    this.getAll()
  }

  getAll() {
    const dateQuery = `${this.state.date.getFullYear()}${this.state.date.getMonth()}`

    const dataList = RegistryService.get(dateQuery)
    
    this.setState({ dataList })
  }

  getNext() {
    this.setState(
      (state) => ({ date: addMonths(state.date, 1) }),
      () => this.getAll())
  }

  getPrevious() {
    this.setState(
      (state) => ({ date: addMonths(state.date, -1) }),
      () => this.getAll())
  }

  setFormValue(id) {
    const index = this.state.dataList.findIndex(item => item.id === id)

    if (index === -1) {
      return
    }

    const newFormValues = { ...this.state.dataList[index] }
    
    this.setState({ formValues: newFormValues })
  }

  resetFormValue() {
    this.setState({
      formValues: {
        id: null,
        name: '',
        price: 0,
        type: Registry.TYPE.DESCONTO,
        category: '',
      }
    })
  }

  save(values) {
    return values.id ? this.edit(values) : this.add(values)
  }

  add(values) {
    const dateQuery = `${this.state.date.getFullYear()}${this.state.date.getMonth()}`
    const dataList = [ ...this.state.dataList ]
    dataList.push({
      id: Math.ceil((Math.random() * 100000)),
      name: values.name,
      price: values.price,
      type: parseInt(values.type),
      category: parseInt(values.category),
    })

    RegistryService.save(dataList, dateQuery)
    this.setState({ dataList: dataList })
    this.resetFormValue()

    return Promise.resolve()
  }

  edit(values) {
    const dateQuery = `${this.state.date.getFullYear()}${this.state.date.getMonth()}`
    const index = this.state.dataList.findIndex(item => item.id === values.id)
    const dataList = [ ...this.state.dataList ]
    dataList[index] = {
      id: values.id,
      name: values.name,
      price: values.price,
      type: parseInt(values.type),
      category: parseInt(values.category),
    }

    RegistryService.save(dataList, dateQuery)
    this.setState({ dataList: dataList })
    this.resetFormValue()

    return Promise.resolve()
  }

  remove(id) {
    const index = this.state.dataList.findIndex(item => item.id === id)

    if (index !== -1) {
      this.state.dataList.splice(index, 1)
      this.setState({ dataList: this.state.dataList })
      this.resetFormValue()
    }    
  }

  render() {
    return (
      <div>
        <RegistryForm
          initialValues={this.state.formValues}
          saveItem={values => this.save(values)} />
        <DatePagination
          date={this.state.date}
          format={'MMM'}
          previous={() => this.getPrevious()}
          next={() => this.getNext()}/>
        <RegistryList
          dataList={this.state.dataList}
          removeItem={id => this.remove(id)}
          editItem={item => this.setFormValue(item)} />
      </div>
    )
  }
}
