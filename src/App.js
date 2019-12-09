import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'

import Container from 'react-bootstrap/Container'
import Category from './components/category/Category';
import Registry from './components/registry/Registry';
import Navigation from './components/navigation/Navigation'

library.add(
  faEdit,
  faTrash
);

export default class App extends React.Component {
  render() {

    return (
      <div>
        <Navigation />
        <BrowserRouter>
          <Container>
            <Route path="/" exact component={Registry} />
            <Route path="/category" component={Category} />
          </Container>
        </BrowserRouter>
      </div>
    );
  }
}