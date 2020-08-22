import React, {Component} from 'react'
import {HashRouter,Route,Switch} from 'react-router-dom'

import Login from './pages/login/login'
import Admin from './pages/admin/admin'

/**
 * 
 * 应用的根组件
 * 
 */

 export default class extends Component {

     
    render () {
        return (
            <HashRouter>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/' component={Admin}></Route>
                </Switch>
            </HashRouter>
        )
    }
 }
 