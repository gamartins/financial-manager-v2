import React from 'react'
import { Formik } from 'formik'
import PropTypes from 'prop-types'

export default class CategoryForm extends React.Component {

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

CategoryForm.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
}
