import React from 'react'

export default function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <a className="navbar-brand" href="/">FMv2</a>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/">Registros</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/category">Categorias</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
