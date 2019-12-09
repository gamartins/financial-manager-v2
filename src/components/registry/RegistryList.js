import React, { Component } from 'react'

import Table from 'react-bootstrap/Table'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import Registry from './Registry'
import CategoryService from '../../services/CategoryService'

export default class RegistryList extends Component {
  categoryList = []

  componentDidMount() {
    this.categoryList = CategoryService.get()
  }

  removeItem(item) {
    this.props.removeItem(item)
  }

  editItem(item) {
    this.props.editItem(item)
  }

  calcTotal() {
    const proventos = this.props.dataList
      .filter(item => item.type === Registry.TYPE.PROVENTO)
      .map(item => item.price)
      .reduce((acc, current) => acc + current, 0)

    const descontos = this.props.dataList
      .filter(item => item.type === Registry.TYPE.DESCONTO)
      .map(item => item.price)
      .reduce((acc, current) => acc + current, 0)

    return proventos - descontos
  }

  render() {
    return (
      <div>
        <Table hover>

          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Categoria</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {this.props.dataList.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.type === Registry.TYPE.PROVENTO ? 'Proveto' : 'Desconto' }</td>
                <td>{this.categoryList.find(category => category.id === item.category).name}</td>
                <td>R$ {item.price}</td>
                <td>
                  <FontAwesomeIcon icon={faEdit} onClick={() => this.editItem(item.id)}/>
                  <FontAwesomeIcon icon={faTrash} onClick={() => this.removeItem(item.id)} />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3">Total</td>
              <td colSpan="2">R$ {this.calcTotal()}</td>
            </tr>
          </tbody>

        </Table>
      </div>
    )
  }
}
