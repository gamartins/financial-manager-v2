import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Table from 'react-bootstrap/Table'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import CategoryService from '../../services/CategoryService'
import Registry from '../../models/Registry'

export default class RegistryList extends Component {
  constructor() {
    super()

    this.state = { categoryList: [] }
  }

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

  findCategory(categoryId) {
    const selectedCategory = this.state.categoryList.find(category => category.id === categoryId)

    return selectedCategory ? selectedCategory.name : 'Sem categoria'
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
              <th>Status</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {this.props.dataList.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.type === Registry.TYPE.PROVENTO ? 'Proveto' : 'Desconto' }</td>
                <td>{this.findCategory(item.category)}</td>
                <td>{Registry.getStatusString(item.status)}</td>
                <td>R$ {item.price}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faEdit}
                    id="edit-item-icon"
                    onClick={() => this.editItem(item.id)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    id="remove-item-icon"
                    onClick={() => this.removeItem(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="4">Total</td>
              <td id="cell-total" colSpan="2">
                R$ {this.calcTotal()}
              </td>
            </tr>
          </tfoot>

        </Table>
      </div>
    )
  }
}

RegistryList.defaultProps = {
  editItem: () => {},
  removeItem: () => {},
}

RegistryList.propTypes = {
  editItem: PropTypes.func,
  removeItem: PropTypes.func,
  dataList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      type: PropTypes.number,
      category: PropTypes.number,
      status: PropTypes.number,
      price: PropTypes.number,
    }),
  ).isRequired,
}
