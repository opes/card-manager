import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dashboard from './views/Dashboard'
import EditCard from './views/EditCard'
import './App.css'
import Header from './components/Header'

export default function App() {
  return (
    <>
      <Header />
      <Router>
        <Switch>
          <Route exact path='/'>
            <Dashboard />
          </Route>
          <Route path='/card/:id'>
            <EditCard />
          </Route>
        </Switch>
      </Router>
    </>
  )
}
