import React from 'react'
import { Formik } from 'formik'
import { Modal, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

import CategoryService from '../../services/CategoryService'

import './RegistryForm.css'
import Registry from '../../models/Registry'

export default class RegistryForm extends React.Component {
  categorylist = []

  componentDidMount() {
    this.categorylist = CategoryService.get()
  }

  onSubmit(values, actions) {
    this.props.saveItem(values).then(() => actions.resetForm())
  }

  renderCategoryList() {
    return this.categorylist.map(category => {
      const option = <option key={category.id} value={category.id}>{category.name}</option>
      return option
    })
  }

  renderForm(props) {
    return (
      <Modal.Body>
        <form onSubmit={props.handleSubmit}>
          <input
            className="form-control mb-3"
            type="text"
            name="name"
            placeholder="Nome do item"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.name}
          />

          <select
            className="form-control mb-3"
            name="type"
            type="number"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.type}
          >
            <option value={Registry.TYPE.PROVENTO}>Provento</option>
            <option value={Registry.TYPE.DESCONTO}>Desconto</option>
          </select>

          <select
            className="form-control mb-3"
            name="status"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.status}
          >
            <option value="">Selecione um status</option>
            <option value={Registry.STATUS.NOT_PAID}>Não Pago</option>
            <option value={Registry.STATUS.PAID}>Pago</option>
            <option value={Registry.STATUS.PAID_FINANCIAL_CASH}>Depositar em poup</option>
            <option value={Registry.STATUS.RESERVERD_SAVINGS}>Depositado em poup</option>
          </select>

          <select
            className="form-control mb-3"
            name="category"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.category}
          >
            <option value={null}>Selecione uma categoria</option>
            {this.renderCategoryList()}
          </select>

          <div className="input-group mb-3">
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
              value={props.values.price}
            />
          </div>

          <Modal.Footer>
            <Button variant="primary" type="submit">Salvar</Button>
            <Button variant="secondary" onClick={this.props.toggleModal}>Cancelar</Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    )
  }

  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.props.toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Novo Registro</Modal.Title>
        </Modal.Header>

        <Formik
          enableReinitialize
          initialValues={this.props.initialValues}
          onSubmit={(values, actions) => this.onSubmit(values, actions)}
        >
          { props => this.renderForm(props) }
        </Formik>
      </Modal>
    )
  }
}

RegistryForm.defaultProps = {
  saveItem: () => {},
  toggleModal: () => {},
  showModal: false,
}

RegistryForm.propTypes = {
  saveItem: PropTypes.func,
  toggleModal: PropTypes.func,
  showModal: PropTypes.bool,
  initialValues: PropTypes.shape({
    id: PropTypes.any,
    name: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    type: PropTypes.oneOf([
      Registry.TYPE.DESCONTO,
      Registry.TYPE.PROVENTO,
    ]),
    status: PropTypes.oneOf([
      Registry.STATUS.NOT_PAID,
      Registry.STATUS.PAID,
      Registry.STATUS.PAID_FINANCIAL_CASH,
      Registry.STATUS.RESERVERD_SAVINGS,
    ]),
  }).isRequired,
}
