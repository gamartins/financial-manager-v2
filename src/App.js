import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container'

import registerIcons from './services/FontAwesome'
import Navigation from './components/navigation/Navigation'

import CategoryPage from './pages/category/CategoryPage'
import RegistryPage from './pages/registry/RegistryPage'
import SavingsPage from './pages/savings/SavingsPage'

registerIcons()

export default function App() {
  return (
    <div>
      <Navigation />
      <BrowserRouter>
        <Container>
          <Route path="/" exact component={RegistryPage} />
          <Route path="/category" component={CategoryPage} />
          <Route path="/savings" component={SavingsPage} />
        </Container>
      </BrowserRouter>
    </div>
  )
}
