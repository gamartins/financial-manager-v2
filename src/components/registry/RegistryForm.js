import React from 'react'
import { Formik } from 'formik'

import Registry from './Registry'
import CategoryService from '../../services/CategoryService'

import './RegistryForm.css'

export default class RegistryForm extends React.Component {
  
  categorylist = []

  componentDidMount() {
    this.categorylist = CategoryService.get()
  }

  onSubmit(values, actions) {
    this.props.saveItem(values).then(() => actions.resetForm())
  }

  renderForm(props) {
    return (
      <form onSubmit={props.handleSubmit} className="form-inline">
        <input
          className="form-control form-control-grow mr-3"
          type="text"
          name="name"
          placeholder="Nome do item"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.name} />
      
        <select
          className="form-control mr-3"
          name="type"
          type="number"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.type}>
          <option value={Registry.TYPE.PROVENTO}>Provento</option>
          <option value={Registry.TYPE.DESCONTO}>Desconto</option>
        </select>

        <select
          className="form-control mr-3"
          name="category"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.category}>
          {this.categorylist.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
      
        <div className="input-group mr-3">
          <div className="input-group-prepend">
            <div className="input-group-text">R$</div>
          </div>
          <input
            className="form-control"
            type="number"
            name="price"
            step="0.01"
            placeholder="Preço"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.price} />
        </div>

        <button className="btn btn-primary" type="submit">Salvar</button>
      </form>
    )
  }

  render() {
    return (
      <div className="RegistryForm mb-4">
        <Formik
          initialValues={this.props.initialValues}
          enableReinitialize={true}
          onSubmit={(values, actions) => this.onSubmit(values, actions)}>
            { props => this.renderForm(props) }
        </Formik>
      </div>
    )
  }
}
