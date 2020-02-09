import React,{Component } from 'react'
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

const {get_all_tags, get_loginout} = actions;
const {get_article_list} = FrontActions;

class Front extends Component{
    constructor(props){
        super(props);
    }

    render(){
        
        const {login, register, loginOut} = this.props;
        return(
            <div>
                <div>
                    <Banner/>
                    <Menus getArticleList={(tag)=>this.props.get_article_list(tag,1)} categories={this.props.categories} history={this.props.history}/>
                </div>
                <div className={style.container}>
                    <div className={style.contentContainer}>
                        <div className={style.content}>
                        
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/detail/:id" component={Detail}/>                                
                                <Route exact path="/tag/:id" component={Home}/>
                                <Route component={NotFound}/>
                            </Switch>
                        
                        </div>
                        <div className={`${style.loginContainer}`}>
                            {this.props.userInfo.userId ?
                                <Logined loginOut={loginOut} history={this.props.history} userInfo={this.props.userInfo}/> :
                                <Login login={login} register={register}/>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.get_all_tags();
    }
}

Front.defaultProps = {
    categories:[]
};

Front.propTypes = {
    categories:PropTypes.array.isRequired
};

function mapStateToProps(state) {
    //console.log(state);
    return {
        categories:state.admin.tags,
        userInfo: state.globalState.userInfo
    }
}
function mapDispatchToProps(dispatch) {
    return{
        get_all_tags:bindActionCreators(get_all_tags,dispatch),
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