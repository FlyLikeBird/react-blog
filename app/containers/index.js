import React, {Component } from 'react'
import PropTypes from 'prop-types'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import './reset.css'
import {Detail} from './detail'
import {Home} from './home'
import Banner from "./components/banner/Banner";
import Menus from "./components/menu/Menus";
import NotFound from "../components/notFound/NotFound";
import {Loading} from "./components/loading/Loading"
import {notification} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions} from '../reducers'
import Admin from "./admin/Admin";
import Front from './front/Front'
import Usercenter from './usercenter/Usercenter';
import animationStyle from '../lib/animate.css'
import { Map, fromJS, is } from 'immutable';
import connectRoute from './connectRoute'


const NotFoundWrapped = connectRoute(NotFound);
const AdminWrapped = connectRoute(Admin);
const FrontWrapped = connectRoute(Front);

const {clear_msg, user_auth} = actions;

class AppIndex extends Component {
    constructor(props) {
        super(props);
        this.openNotification = this.openNotification.bind(this);
    }

    openNotification(type, message) {
        let that = this;
        notification[type]({
            message: message,
            onClose: () => {
                that.props.clear_msg();
            }
        });
        that.props.clear_msg();
    };

    render() {
        let {isFetching} = this.props;
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path='/404' component={NotFoundWrapped}/>
                        <Route path='/admin' component={AdminWrapped}/>
                        <Route path="/" component={FrontWrapped}/>
                        <Route path="/usercenter/:id" component={Usercenter} />
                    </Switch>
                    { isFetching && <Loading /> }
                    {this.props.notification && this.props.notification.content ?
                        (this.props.notification.type === 1 ?
                            this.openNotification('success', this.props.notification.content) :
                            this.openNotification('error', this.props.notification.content)) :
                        null}
                </div>
            </Router>
        )
    }
}



function mapStateToProps(state) {
    return {
        notification: state.globalState.msg,
        isFetching: state.globalState.isFetching
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clear_msg: bindActionCreators(clear_msg, dispatch)
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppIndex)