import React, { Component } from 'react'

import Table from 'react-bootstrap/Table'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

export default class CategotyList extends Component {

  removeItem(item) {
    this.props.removeItem(item)
  }

  editItem(item) {
    this.props.editItem(item)
  }

  render() {
    return (
      <div>
        <Table hover>

          <thead>
            <tr>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {this.props.dataList.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <FontAwesomeIcon icon={faEdit} onClick={() => this.editItem(item.id)}/>
                  <FontAwesomeIcon icon={faTrash} onClick={() => this.removeItem(item.id)} />
                </td>
              </tr>
            ))}
          </tbody>

        </Table>
      </div>
    )
  }
}
