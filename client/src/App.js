import { hot } from 'react-hot-loader'
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/header'
import ProjectMenu from './components/projectMenu'
import Resizer from './components/resizer'

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Header />
        <ProjectMenu />
        <Resizer />
      </div>
      <Switch>
        <Route path='Home' />
        <Route path='Login' />
        <Route path='Register' />
        <Route path='' />
      </Switch>
    </Router>
  )
}

export default hot(module)(App)
