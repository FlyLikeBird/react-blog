import React from 'react'
import style from './style.css'
import {Button} from 'antd'

export const Logined = (props) => (
    <div className={style.container}>

        <img src={require('./timg.jpeg')}/>
        <p>用户：{props.userInfo.username}</p>
        
        {props.userInfo.userType === 'admin' ?
            <Button onClick={() => props.history.push('/admin')} type="primary">管理页面</Button> : null}
            <Button onClick={()=>props.loginOut()}style={{marginTop:'4px'}}>退出登录</Button>
    </div>
);