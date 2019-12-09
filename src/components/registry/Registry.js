import React, { Component } from 'react'

import RegistryForm from './RegistryForm'
import RegistryList from './RegistryList'
import RegistryService from '../../services/RegistryService'

export default class Registry extends Component {

  static TYPE = {
    PROVENTO: 0,
    DESCONTO: 1,
  }

  constructor(props) {
    super(props)

    this.state = {
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
    const dataList = RegistryService.get()
    this.setState({ dataList })
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
    const dataList = [ ...this.state.dataList ]
    dataList.push({
      id: Math.ceil((Math.random() * 100000)),
      name: values.name,
      price: values.price,
      type: parseInt(values.type),
      category: parseInt(values.category),
    })

    RegistryService.save(dataList)
    this.setState({ dataList: dataList })
    this.resetFormValue()

    return Promise.resolve()
  }

  edit(values) {
    const index = this.state.dataList.findIndex(item => item.id === values.id)
    const dataList = [ ...this.state.dataList ]
    dataList[index] = {
      id: values.id,
      name: values.name,
      price: values.price,
      type: parseInt(values.type),
      category: parseInt(values.category),
    }

    RegistryService.save(dataList)
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
        <RegistryList
          dataList={this.state.dataList}
          removeItem={id => this.remove(id)}
          editItem={item => this.setFormValue(item)} />
      </div>
    )
  }
}
