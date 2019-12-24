import React from 'react'

import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addMonths } from 'date-fns'
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'

import DatePagination from '../../components/shared/date-pagination/DatePagination'
import DataList from '../../components/shared/data-list/DataList'
import SavingsService from '../../services/SavingsService'

import './SavingsPage.css'
import SavingsForm from '../../components/savings-form/SavingsForm'

export default class SavingsPage extends React.Component {
  columns = [
    { name: 'Nome', value: 'name' },
    { name: 'Conta', value: 'account' },
    { name: 'Valor', value: 'value' },
  ]

  constructor() {
    super()

    this.state = {
      date: new Date(),
      showModal: false,
      dataList: [],
      formValues: {
        id: null,
        name: '',
        account: '',
        value: 0,
      },
    }
  }

  componentDidMount() {
    this.getAll()
  }

  getAll() {
    const dateQuery = `${this.state.date.getFullYear()}${this.state.date.getMonth()}`

    const dataList = SavingsService.get(dateQuery) || []

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

    this.setState(
      prevState => ({ formValues: prevState.dataList[index] }),
      () => this.toggleModal(),
    )
  }

  resetFormValue() {
    this.setState({
      formValues: {
        id: null,
        name: '',
        account: '',
        value: 0,
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
      account: values.account,
      value: values.value,
    }

    this.setState(
      prevState => ({ dataList: [...prevState.dataList, item] }),
      () => SavingsService.save(this.state.dataList, dateQuery),
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
      account: values.account,
      value: parseInt(values.value),
    }

    this.setState(
      prevState => {
        const modifiedList = prevState
        modifiedList[index] = item
        return { dataList: modifiedList }
      },
      () => SavingsService.save(this.state.dataList, dateQuery),
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
      <div className="Savings">
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

        <SavingsForm
          showModal={this.state.showModal}
          initialValues={this.state.formValues}
          saveItem={values => this.save(values)}
          toggleModal={() => this.toggleModal()}
        />

        <DataList
          dataList={this.state.dataList}
          columns={this.columns}
          editItem={item => this.setFormValue(item.id)}
          removeItem={item => this.remove(item.id)}
        />
      </div>
    )
  }
}
