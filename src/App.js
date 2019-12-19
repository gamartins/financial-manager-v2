import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import CategoryPage from './components/category/CategoryPage'
import RegistryPage from './components/registry/RegistryPage'
import Navigation from './components/navigation/Navigation'
import registerIcons from './services/FontAwesome'

registerIcons()

export default function App() {
  return (
    <div>
      <Navigation />
      <BrowserRouter>
        <Container>
          <Route path="/" exact component={RegistryPage} />
          <Route path="/category" component={CategoryPage} />
        </Container>
      </BrowserRouter>
    </div>
  )
}
