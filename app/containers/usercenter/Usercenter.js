import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tabs } from 'antd'
import { actions } from '../../reducers/usercenter';
import style from './usercenter.style.css'
import { Loading } from '../components/loading/Loading'
import UserArticleContainer from './UserArticleContainer';
import UserList from './UserList/UserList'

const { TabPane } = Tabs;
const { get_userInfo, toggle_visible } = actions;

class Usercenter extends PureComponent {

    componentDidMount(){
        this.props.get_userInfo(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps){
        if (this.props.match.params.id != nextProps.match.params.id){
            this.props.get_userInfo(nextProps.match.params.id);
        }
    }

    render() {
        var { user, userInfo, match, userFollows, userFans, userCollects, isFetching, visible, userArticles, toggle_visible } = this.props;
        var isSelf = match.params.id === user.userId ? true : false ;
        var { username, _id, userImage, userCover, description } = userInfo;
        console.log('usercenter render()..');
        return (
            
            isFetching 
            ?
            <Loading/>
            :
            <div className={style.container}>
                <div className={style.header} style={{backgroundImage:`url(${userCover})`}}>
                    <div className={style['img-container']}><img src={userImage}/></div>
                </div>
                <div className={style.content}>
                    <Tabs defaultActiveKey="0">
                        <TabPane tab={isSelf ? '我的博客':'TA的博客'} key="0">
                            <UserArticleContainer isSelf={isSelf} visible={visible} userArticles={userArticles} toggle_visible={toggle_visible} />
                        </TabPane>
                        <TabPane tab={isSelf ? '我的关注':'TA的关注'} key="1">
                            <UserList data={userFollows} text="follow" />
                        </TabPane>
                        <TabPane tab={isSelf ? '我的粉丝':'TA的粉丝'} key="2">
                            <UserList data={userFans} text="fans" />
                        </TabPane>
                        <TabPane tab={isSelf ? '我的收藏':'TA的收藏'} key="3">
                            my cllect
                        </TabPane>
                    </Tabs>
                </div>
            </div>
            
        )
    }
}

Usercenter.propTypes = {
    userInfo:PropTypes.object.isRequired,
    user:PropTypes.object.isRequired,
    userFollows:PropTypes.array.isRequired,
    userFans:PropTypes.array.isRequired,
    userCollects:PropTypes.array.isRequired,
    isFetching:PropTypes.bool.isRequired,
    visible:PropTypes.bool.isRequired,
    userArticles:PropTypes.array.isRequired,
    get_userInfo:PropTypes.func.isRequired,
    toggle_visible:PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        userInfo:state.front.usercenter.userInfo,
        user:state.globalState.userInfo,
        userFollows:state.front.usercenter.userFollows,
        userFans:state.front.usercenter.userFans,
        userCollects:state.front.usercenter.userCollects,
        isFetching: state.front.usercenter.isFetching,
        visible:state.front.usercenter.visible,
        userArticles:state.front.usercenter.userArticles
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_userInfo:bindActionCreators(get_userInfo, dispatch),
        toggle_visible:bindActionCreators(toggle_visible, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Usercenter);