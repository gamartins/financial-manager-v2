import React, { Component } from 'react'

import addMonths from 'date-fns/addMonths'
import { Button } from 'react-bootstrap'

import RegistryForm from './RegistryForm'
import RegistryList from './RegistryList'
import DatePagination from '../date-pagination/DatePagination'
import RegistryService from '../../services/RegistryService'
import Registry from '../../models/Registry'

import './RegistryPage.css'

export default class RegistryPage extends Component {
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
        status: Registry.STATUS.NOT_PAID,
      },
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
      state => ({ date: addMonths(state.date, 1) }),
      () => this.getAll(),
    )
  }

  getPrevious() {
    this.setState(
      state => ({ date: addMonths(state.date, -1) }),
      () => this.getAll(),
    )
  }

  setFormValue(id) {
    const index = this.state.dataList.findIndex(item => item.id === id)

    if (index === -1) {
      return
    }

    this.setState(prevState => {
      this.toggleModal()

      const newFormValues = prevState.dataList[index]

      return { formValues: newFormValues }
    })
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
      },
    })
  }

  save(values) {
    return values.id ? this.edit(values) : this.add(values)
  }

  add(values) {
    const dateQuery = `${this.state.date.getFullYear()}${this.state.date.getMonth()}`
    const item = {
      id: Math.ceil((Math.random() * 100000)),
      name: values.name,
      price: values.price,
      type: parseInt(values.type),
      category: parseInt(values.category),
      status: parseInt(values.status),
    }

    this.setState(
      prevState => ({ dataList: [...prevState, item] }),
      () => RegistryService.save(this.state.dataList, dateQuery),
    )

    this.resetFormValue()
    this.toggleModal()

    return Promise.resolve()
  }

  edit(values) {
    const dateQuery = `${this.state.date.getFullYear()}${this.state.date.getMonth()}`
    const index = this.state.dataList.findIndex(item => item.id === values.id)
    const item = {
      id: values.id,
      name: values.name,
      price: values.price,
      type: parseInt(values.type),
      category: parseInt(values.category),
      status: parseInt(values.status),
    }

    this.setState(
      prevState => {
        const modifiedList = prevState
        modifiedList[index] = item
        return { dataList: modifiedList }
      },
      () => RegistryService.save(this.state.dataList, dateQuery),
    )

    this.resetFormValue()
    this.toggleModal()

    return Promise.resolve()
  }

  remove(id) {
    const index = this.state.dataList.findIndex(item => item.id === id)

    if (index !== -1) {
      this.setState(prevState => ({ dataList: prevState.dataList.splice(index, 1) }))
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
      },
    )
  }

  render() {
    return (
      <div className="Registry">
        <RegistryForm
          showModal={this.state.showModal}
          toggleModal={() => this.toggleModal()}
          initialValues={this.state.formValues}
          saveItem={values => this.save(values)}
        />

        <div className="actions">
          <Button id="actions-add" onClick={() => this.toggleModal()}>
            Novo
          </Button>

          <DatePagination
            date={this.state.date}
            format="MMM"
            previous={() => this.getPrevious()}
            next={() => this.getNext()}
          />
        </div>

        <RegistryList
          dataList={this.state.dataList}
          removeItem={id => this.remove(id)}
          editItem={item => this.setFormValue(item)}
        />
      </div>
    )
  }
}
