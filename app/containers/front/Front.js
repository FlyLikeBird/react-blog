import React,{ PureComponent } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Detail} from '../detail'
import {Home} from '../home'
import style from './front.style.css'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import Banner from "../components/banner/Banner";
import Menus from "../components/menu/Menus";
import NotFound from "../../components/notFound/NotFound";
import {bindActionCreators} from 'redux'
import {actions} from '../../reducers/adminManagerTags'
import {actions as FrontActions} from '../../reducers/frontReducer'
import Login from "../home/components/login/Login";
import {Logined} from "../home/components/logined/Logined";
import {actions as IndexActions} from '../../reducers/index'
import connectRoute from '../connectRoute';

const {get_loginout} = actions;
const {get_article_list} = FrontActions;

const HomeWrapped = connectRoute(Home);
const DetailWrapped = connectRoute(Detail);

class Front extends PureComponent{
    constructor(props){
        super(props);
    }

    render(){
        const {login, register, loginOut, userInfo } = this.props;
        console.log('front render()...');
        return(
            <div>
                <div>
                    <Banner/>
                    <Menus/>
                </div>
                <div className={style.container}>
                    <div className={style.contentContainer}>
                        <div className={style.content}>                            
                            <Switch>
                                <Route exact path="/" component={HomeWrapped}/>
                                <Route exact path="/detail/:id" component={DetailWrapped}/>                                
                                <Route exact path="/tag/:id" component={HomeWrapped}/>
                                <Route component={NotFound}/>
                            </Switch>                           
                        </div>
                        <div className={`${style.loginContainer}`}>
                            { userInfo.userId ?
                                <Logined loginOut={loginOut} history={this.props.history} userInfo={userInfo}/> :
                                <Login login={login} register={register}/>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userInfo: state.globalState.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return{
        get_article_list:bindActionCreators(get_article_list,dispatch),
        login: bindActionCreators(IndexActions.get_login, dispatch),
        register: bindActionCreators(IndexActions.get_register, dispatch),
        loginOut:bindActionCreators(IndexActions.get_loginout, dispatch)
        
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Front)