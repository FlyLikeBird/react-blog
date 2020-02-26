import React from 'react'
import IndexApp from './containers'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {AppContainer} from 'react-hot-loader'
import configureStore from './configureStore'
import Perf from 'react-addons-perf'

window.Perf = Perf;

let div = document.createElement('div');
div.setAttribute('id', 'app');
document.body.appendChild(div);

const mountNode = document.getElementById('app');
const store = configureStore();

render(
    <AppContainer>
        <Provider store={store}>
            <IndexApp/>
        </Provider>
    </AppContainer>
    ,
    mountNode
);
