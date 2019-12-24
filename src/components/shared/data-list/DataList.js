import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Table from 'react-bootstrap/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import './DataList.css'

export default class DataList extends Component {
  removeItem(item) {
    this.props.removeItem(item)
  }

  editItem(item) {
    this.props.editItem(item)
  }

  renderActions(item) {
    return this.props.showActions
      ? (
        <td className="column__actions">
          <FontAwesomeIcon icon={faEdit} id="edit-item-icon" onClick={() => this.editItem(item)} />
          <FontAwesomeIcon icon={faTrash} id="remove-item-icon" onClick={() => this.removeItem(item)} />
          {this.props.actions}
        </td>
      )
      : ''
  }

  renderFooter() {
    return this.footer
      ? (
        <tfoot>
          <tr>
            {this.props.footer}
          </tr>
        </tfoot>
      )
      : null
  }

  render() {
    return (
      <div className="DataList">
        <Table hover>

          <thead>
            <tr>
              {this.props.columns.map(column => <th key={column.name}>{column.name}</th>)}
              {this.props.showActions ? <th>Ações</th> : null}
            </tr>
          </thead>

          <tbody>
            {this.props.dataList.map(item => (
              <tr key={item.id}>
                {this.props.columns.map(column => <td key={column.name}>{item[column.value]}</td>)}
                {this.props.showActions ? this.renderActions(item) : <td />}
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              {this.props.footer}
            </tr>
          </tfoot>

        </Table>
      </div>
    )
  }
}

DataList.defaultProps = {
  editItem: () => {},
  removeItem: () => {},
  showActions: true,
  actions: [],
  footer: null,
}

DataList.propTypes = {
  showActions: PropTypes.bool,
  editItem: PropTypes.func,
  removeItem: PropTypes.func,
  columns: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
  dataList: PropTypes.arrayOf(PropTypes.any).isRequired,
  actions: PropTypes.arrayOf(PropTypes.element),
  footer: PropTypes.element,
}
