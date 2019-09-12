import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import App from '../app'
import ListItemPage from '../list-item-page'

const AppRouter = () => {
    return (
        <Router>
        <CssBaseline/>
            <Switch>
                <Route exact path='/' component={App} />
                <Route path='/todoitem/:id' component={ListItemPage} />
            </Switch>
        </Router>
    )

}

export default AppRouter