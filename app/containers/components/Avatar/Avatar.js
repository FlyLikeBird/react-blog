import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../reducers/usercenter'
import { Tabs, Popover, Button } from 'antd'
import InfoModal from './components/InfoModal'

import style from './Avatar.style.css'

const { follow_user, check_follow } = actions;

class Avatar extends PureComponent {

    render() {
        var { data, user, checkFollow, onFollow, onCheckFollow } = this.props;
        return (
            <Popover trigger="click" content={<InfoModal userInfo={data} user={user} checkFollow={checkFollow} onFollow={onFollow} onCheckFollow={onCheckFollow}/>}>
                <div className={style['img-container']} style={{backgroundImage:`url(${data.userImage})`}}></div>
            </Popover>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        checkFollow:state.front.usercenter.checkFollow,
        user:state.globalState.userInfo.userId
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        onFollow:bindActionCreators(follow_user, dispatch),
        onCheckFollow:bindActionCreators(check_follow, dispatch)
    }
}

export default Avatar = connect(mapStateToProps, mapDispatchToProps)(Avatar);

