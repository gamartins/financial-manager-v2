import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { format } from 'date-fns'

import './DatePagination.css'

export default class DatePagination extends Component {
  previous() {
    this.props.previous()
  }

  next() {
    this.props.next()
  }

  render() {
    return (
      <nav>
        <ul className="DatePagination pagination">
          <li id="item-previous" className="page-item">
            <button type="button" className="page-link" onClick={() => this.previous()}>
              &laquo;
            </button>
          </li>
          <li id="item-actual" className="page-item">
            <span className="page-link">
              {format(this.props.date, this.props.format)}
            </span>
          </li>
          <li id="item-next" className="page-item">
            <button type="button" className="page-link" onClick={() => this.next()}>
              &laquo;
            </button>
          </li>
        </ul>
      </nav>
    )
  }
}

DatePagination.defaultProps = {
  previous: () => {},
  next: () => {},
}

DatePagination.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  format: PropTypes.string.isRequired,
  previous: PropTypes.func,
  next: PropTypes.func,
}
