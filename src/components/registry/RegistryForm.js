import React from 'react'
import { Formik } from 'formik'

import Registry from './Registry'
import CategoryService from '../../services/CategoryService'

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
        <div className='mr-3'>
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Nome do item"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.name} />
        </div>
        
        <div className='mr-3'>
          <select
            className="form-control"
            name="type"
            type="number"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.type}>
            <option value={Registry.TYPE.PROVENTO}>Provento</option>
            <option value={Registry.TYPE.DESCONTO}>Desconto</option>
          </select>
        </div>

        <div className='mr-3'>
          <select
            className="form-control"
            name="category"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.category}>
            {this.categorylist.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
        </div>
        
        <div className='mr-3'>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">R$</div>
            </div>
            <input
              className="form-control"
              type="number"
              name="price"
              placeholder="Preço"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.price} />
          </div>
        </div>
        
        <button className="btn btn-primary" type="submit">Salvar</button>
      </form>
    )
  }

  render() {
    return (
      <div className="mb-4">
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
