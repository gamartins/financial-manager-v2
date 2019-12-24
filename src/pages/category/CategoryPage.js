import React, { Component } from 'react'

import CategoryForm from '../../components/category-form/CategoryForm'
import CategoryList from '../../components/category-list/CategoryList'
import CategoryService from '../../services/CategoryService'

export default class CategoryPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dataList: [],
      formValues: {
        id: null,
        name: '',
      },
    }
  }

  componentDidMount() {
    this.getAll()
  }

  getAll() {
    const dataList = CategoryService.get()
    this.setState({ dataList })
  }

  setFormValue(id) {
    const index = this.state.dataList.findIndex(item => item.id === id)

    if (index === -1) {
      return
    }

    this.setState(prevState => {
      const newFormValues = prevState.dataList[index]

      return { formValues: newFormValues }
    })
  }

  resetFormValue() {
    this.setState({
      formValues: {
        id: null,
        name: '',
      },
    })
  }

  save(values) {
    return values.id ? this.edit(values) : this.add(values)
  }

  add(values) {
    this.setState(
      prevState => {
        const newDatalist = prevState.dataList
        const newItem = {
          id: Math.ceil((Math.random() * 100000)),
          name: values.name,
        }

        newDatalist.push(newItem)

        return { dataList: newDatalist }
      },
      () => {
        CategoryService.save(this.state.dataList)
        this.resetFormValue()
      },
    )

    return Promise.resolve()
  }

  edit(values) {
    const index = this.state.dataList.findIndex(item => item.id === values.id)
    const dataList = [...this.state.dataList]

    this.setState(
      prevState => {
        const newDataList = prevState.dataList
        newDataList[index] = {
          id: values.id,
          name: values.name,
        }

        return { dataList: newDataList }
      },
      () => {
        this.resetFormValue()
        CategoryService.save(dataList)
      },
    )

    return Promise.resolve()
  }

  remove(id) {
    const index = this.state.dataList.findIndex(item => item.id === id)

    if (index === -1) { return }

    this.setState(
      prevState => {
        const newDataList = prevState.dataList
        newDataList.splice(index, 1)
        return { dataList: newDataList }
      },
      () => this.resetFormValue(),
    )
  }

  render() {
    return (
      <div>
        <CategoryForm
          initialValues={this.state.formValues}
          saveItem={values => this.save(values)}
        />
        <CategoryList
          dataList={this.state.dataList}
          removeItem={id => this.remove(id)}
          editItem={item => this.setFormValue(item)}
        />
      </div>
    )
  }
}
