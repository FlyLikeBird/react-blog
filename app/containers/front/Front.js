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
import { actions as AdminActions } from '../../reducers/adminManagerTags'
import connectRoute from '../connectRoute';

const { get_loginout } = actions;
const { toggle_menu_visible } = FrontActions;
const { get_all_tags } = AdminActions;

const HomeWrapped = connectRoute(Home);
const DetailWrapped = connectRoute(Detail);

class Front extends PureComponent{

    render(){
        const { history, login, register, loginOut, userInfo, currentTag, menuVisible, categories, get_all_tags, toggle_menu_visible } = this.props;
        console.log('front render()...');
        return(
            <div>
                <div>
                    <Banner/>
                    <Menus currentTag={currentTag} menuVisible={menuVisible} categories={categories} get_all_tags={get_all_tags}  toggle_menu_visible={toggle_menu_visible}/>
                </div>
                <div className={style.container}>
                    <div className={style.contentContainer}>
                        <div className={style.content}>                            
                            <Switch>
                                <Route exact path="/detail/:id" component={DetailWrapped}/>                                
                                <Route exact path="/tag/:id" component={HomeWrapped}/>
                                <Route path="/" component={HomeWrapped}/>
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

Front.propTypes = {
    userInfo:PropTypes.object.isRequired,
    categories:PropTypes.array.isRequired,
    currentTag:PropTypes.string.isRequired,
    menuVisible:PropTypes.bool.isRequired,
    login:PropTypes.func.isRequired,
    register:PropTypes.func.isRequired,
    loginOut:PropTypes.func.isRequired,
    get_all_tags:PropTypes.func.isRequired,
    toggle_menu_visible:PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        userInfo: state.globalState.userInfo,
        categories:state.admin.tags,
        currentTag:state.front.article.currentTag,
        menuVisible:state.front.article.menuVisible
    }
}

function mapDispatchToProps(dispatch) {
    return{
        get_all_tags:bindActionCreators(get_all_tags,dispatch),
        toggle_menu_visible:bindActionCreators(toggle_menu_visible, dispatch),
        login: bindActionCreators(IndexActions.get_login, dispatch),
        register: bindActionCreators(IndexActions.get_register, dispatch),
        loginOut:bindActionCreators(IndexActions.get_loginout, dispatch)
        
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Front)