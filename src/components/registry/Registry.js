import React, { Component } from 'react'

import addMonths from 'date-fns/addMonths'
import { Button } from 'react-bootstrap'

import RegistryForm from './RegistryForm'
import RegistryList from './RegistryList'
import DatePagination from '../date-pagination/DatePagination'
import RegistryService from '../../services/RegistryService'

import './Registry.css'

export default class Registry extends Component {

  static TYPE = {
    PROVENTO: 0,
    DESCONTO: 1,
  }

  static STATUS = {
    NOT_PAID: 0,
    PAID: 1,
    PAID_FINANCIAL_CASH: 2,
    RESERVERD_SAVINGS: 3, 
  }

  constructor(props) {
    super(props)

    this.state = {
      date: new Date(),
      dataList: [],
      showModal: false,
      formValues: {
        id: null,
        name: '',
        price: 0,
        type: Registry.TYPE.DESCONTO,
        category: '',
        status: Registry.STATUS.NOT_PAID
      }
    }
  }

  componentDidMount() {
    this.getAll()
  }

  getAll() {
    const dateQuery = `${this.state.date.getFullYear()}${this.state.date.getMonth()}`

    const dataList = RegistryService.get(dateQuery) || []
    
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
    this.toggleModal()
  }

  resetFormValue() {
    this.setState({
      formValues: {
        id: null,
        name: '',
        price: 0,
        type: Registry.TYPE.DESCONTO,
        category: '',
        status: Registry.STATUS.NOT_PAID,
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
      status: parseInt(values.status),
    })

    RegistryService.save(dataList, dateQuery)
    this.setState({ dataList: dataList })
    this.resetFormValue()
    this.toggleModal()

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
      status: parseInt(values.status),
    }

    RegistryService.save(dataList, dateQuery)
    this.setState({ dataList: dataList })
    this.resetFormValue()
    this.toggleModal()

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

  toggleModal() {
    this.setState(
      state => ({ showModal: !state.showModal }),
      () => {
        if (!this.state.showModal) {
          this.resetFormValue()
        }
      })
  }

  render() {
    return (
      <div className="Registry">
        <RegistryForm
          showModal={this.state.showModal}
          toggleModal={() => this.toggleModal()}
          initialValues={this.state.formValues}
          saveItem={values => this.save(values)} />

        <div className="actions">
          <Button id="actions-add" onClick={() => this.toggleModal()}>
            Novo
          </Button>

          <DatePagination
            date={this.state.date}
            format={'MMM'}
            previous={() => this.getPrevious()}
            next={() => this.getNext()}/>
        </div>

        <RegistryList
          dataList={this.state.dataList}
          removeItem={id => this.remove(id)}
          editItem={item => this.setFormValue(item)} />
      </div>
    )
  }
}
