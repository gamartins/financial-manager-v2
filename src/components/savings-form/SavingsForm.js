import React, { Component } from 'react'
import { Formik } from 'formik'
import { Modal, Button } from 'react-bootstrap'

export default class SavingsForm extends Component {
  onSubmit(values, actions) {
    this.props.saveItem(values).then(() => actions.resetForm())
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

          <input
            className="form-control mb-3"
            type="text"
            name="account"
            placeholder="Conta bancária"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.account}
          />

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <div className="input-group-text">R$</div>
            </div>
            <input
              className="form-control"
              type="number"
              name="value"
              step="0.01"
              placeholder="Preço"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.value}
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
          <Modal.Title>Nova Poupança</Modal.Title>
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
