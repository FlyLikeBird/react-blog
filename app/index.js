import React from 'react'
import IndexApp from './containers'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
//import { hot } from 'react-hot-loader/root'
import configureStore from './configureStore'

const mountNode = document.getElementById('root');
const store = configureStore();

const renderApp = Component =>{
    render(
        <Provider store={store}>
            <Component/>
        </Provider>,
        mountNode
    )
}

renderApp(IndexApp);

if(module.hot){
    module.hot.accept();
}
